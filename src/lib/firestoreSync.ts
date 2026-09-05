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
  updatedAt?: any;
}

/**
 * Derives a clean document key based on user email or user ID
 */
export function getProfileDocId(emailOrUid: string): string {
  if (!emailOrUid) return "default-user";
  return emailOrUid.toLowerCase().trim().replace(/[^a-z0-9]/g, "_");
}

/**
 * Saves a user profile directly to Firebase Cloud Firestore.
 * Works seamlessly across Web and Native Mobile without needing Cloud Run deployment or server cookies.
 */
export async function saveProfileToFirestore(
  emailOrUid: string,
  profile: SyncedProfile
): Promise<{ success: boolean; error?: string }> {
  try {
    const docId = getProfileDocId(emailOrUid);
    const userDocRef = doc(firestore, 'user_profiles', docId);

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
      updatedAt: new Date().toISOString(),
      serverTimestamp: serverTimestamp()
    };

    await setDoc(userDocRef, payload, { merge: true });
    return { success: true };
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
): Promise<{ success: boolean; profile?: SyncedProfile; error?: string }> {
  try {
    const docId = getProfileDocId(emailOrUid);
    const userDocRef = doc(firestore, 'user_profiles', docId);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const loaded: SyncedProfile = {
        name: data.name || "",
        age: data.age !== null && data.age !== undefined ? Number(data.age) : 50,
        location: data.location || "",
        interests: Array.isArray(data.interests) ? data.interests : [],
        bio: data.bio || "",
        relationshipGoal: data.relationshipGoal || "Companionship & Shared Outings",
        isSubscribed: Boolean(data.isSubscribed)
      };
      return { success: true, profile: loaded };
    } else {
      return { success: false, error: "No profile document found in Firestore" };
    }
  } catch (err: any) {
    console.error("[Firestore] fetchProfileFromFirestore error:", err);
    return { success: false, error: err?.message || "Failed to fetch profile from Firestore" };
  }
}
