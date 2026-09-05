import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from './firebase';

export interface SyncedProfile {
  name: string;
  age: number;
  location: string;
  interests: string[];
  bio: string;
  relationshipGoal: string;
  isSubscribed: boolean;
  updatedAt?: string;
}

/**
 * Derives a clean document key based on user email or user ID.
 * Consistent across web and mobile by normalizing email to lowercase alphanumeric.
 */
export function getProfileDocId(emailOrUid: string): string {
  if (!emailOrUid || emailOrUid.trim() === "") return "qyuan_sam_gmail_com";
  let clean = emailOrUid.toLowerCase().trim();
  // Strip any sandbox prefixes so sandbox-uid-sam-abc-com maps cleanly to sam_abc_com
  clean = clean
    .replace(/^sandbox-uid-/, "")
    .replace(/^sandbox_uid_/, "")
    .replace(/^sandbox-token-/, "");
  return clean.replace(/[^a-z0-9]/g, "_");
}

/**
 * Saves a user profile directly to Firebase Cloud Firestore.
 * Works seamlessly across Web and Native Mobile without needing Cloud Run deployment or server cookies.
 */
export async function saveProfileToFirestore(
  emailOrUid: string,
  profile: SyncedProfile
): Promise<{ success: boolean; error?: string; updatedAt?: string; docId?: string }> {
  try {
    const docId = getProfileDocId(emailOrUid);
    const userDocRef = doc(firestore, 'user_profiles', docId);
    const nowIso = new Date().toISOString();

    const payload = {
      name: profile.name || "",
      age: profile.age !== undefined && profile.age !== null ? Number(profile.age) : 50,
      location: profile.location || "",
      interests: Array.isArray(profile.interests) ? profile.interests : [],
      bio: profile.bio || "",
      relationshipGoal: profile.relationshipGoal || "Companionship & Shared Outings",
      isSubscribed: Boolean(profile.isSubscribed),
      userId: emailOrUid,
      email: emailOrUid,
      updatedAt: nowIso,
      serverTimestamp: serverTimestamp()
    };

    await setDoc(userDocRef, payload, { merge: true });

    // Also mirror to legacy sandbox_uid_${docId} so any older mobile builds stay in sync
    const legacyDocRef = doc(firestore, 'user_profiles', `sandbox_uid_${docId}`);
    setDoc(legacyDocRef, payload, { merge: true }).catch(() => {});

    return { success: true, updatedAt: nowIso, docId };
  } catch (err: any) {
    console.error("[Firestore] saveProfileToFirestore error:", err);
    return { success: false, error: err?.message || "Failed to save profile to Firestore" };
  }
}

/**
 * Fetches a user profile directly from Firebase Cloud Firestore.
 */
export async function fetchProfileFromFirestore(
  emailOrUid: string
): Promise<{ success: boolean; profile?: SyncedProfile; error?: string; docId?: string }> {
  try {
    const docId = getProfileDocId(emailOrUid);
    const userDocRef = doc(firestore, 'user_profiles', docId);
    let docSnap = await getDoc(userDocRef);

    // Fallback: If not found under normalized key, check legacy sandbox_uid_ prefix
    if (!docSnap.exists()) {
      const legacyDocId = `sandbox_uid_${docId}`;
      const legacyDocRef = doc(firestore, 'user_profiles', legacyDocId);
      const legacySnap = await getDoc(legacyDocRef);
      if (legacySnap.exists()) {
        docSnap = legacySnap;
        // Migrate to clean normalized key in background
        const data = legacySnap.data();
        setDoc(userDocRef, data, { merge: true }).catch(() => {});
      }
    }

    if (docSnap.exists()) {
      const data = docSnap.data();
      const loaded: SyncedProfile = {
        name: data.name || "",
        age: data.age !== null && data.age !== undefined ? Number(data.age) : 50,
        location: data.location || "",
        interests: Array.isArray(data.interests) ? data.interests : [],
        bio: data.bio || "",
        relationshipGoal: data.relationshipGoal || "Companionship & Shared Outings",
        isSubscribed: Boolean(data.isSubscribed),
        updatedAt: data.updatedAt || undefined
      };
      return { success: true, profile: loaded, docId: docSnap.id };
    } else {
      return { success: false, error: "No profile document found in Firestore" };
    }
  } catch (err: any) {
    console.error("[Firestore] fetchProfileFromFirestore error:", err);
    return { success: false, error: err?.message || "Failed to fetch profile from Firestore" };
  }
}
