import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe
} from 'firebase/firestore';
import { firestore } from './firebase';
import { Message } from '../types';

export interface SyncedProfile {
  name: string;
  age: number;
  location: string;
  interests: string[];
  bio: string;
  relationshipGoal: string;
  isSubscribed: boolean;
  latitude?: number;
  longitude?: number;
  gpsEnabled?: boolean;
  searchRadiusMiles?: number;
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

    const payload: any = {
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

    if (profile.latitude !== undefined && profile.latitude !== null) {
      payload.latitude = Number(profile.latitude);
    }
    if (profile.longitude !== undefined && profile.longitude !== null) {
      payload.longitude = Number(profile.longitude);
    }
    if (profile.gpsEnabled !== undefined) {
      payload.gpsEnabled = Boolean(profile.gpsEnabled);
    }
    if (profile.searchRadiusMiles !== undefined) {
      payload.searchRadiusMiles = Number(profile.searchRadiusMiles);
    }

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
        latitude: data.latitude !== undefined && data.latitude !== null ? Number(data.latitude) : undefined,
        longitude: data.longitude !== undefined && data.longitude !== null ? Number(data.longitude) : undefined,
        gpsEnabled: data.gpsEnabled !== undefined ? Boolean(data.gpsEnabled) : undefined,
        searchRadiusMiles: data.searchRadiusMiles !== undefined ? Number(data.searchRadiusMiles) : undefined,
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

/**
 * Derives conversation document ID based on user and companion match ID.
 * Examples: "qyuan_sam_gmail_com_meiling", "sam_abc_com_arthur"
 */
export function getConversationDocId(emailOrUid: string, matchId: string): string {
  const userKey = getProfileDocId(emailOrUid);
  const matchKey = (matchId || "companion").toLowerCase().replace(/[^a-z0-9]/g, "_");
  return `${userKey}_${matchKey}`;
}

/**
 * Saves an individual chat message to Firebase Cloud Firestore.
 * Updates both the parent conversation metadata and the subcollection message document.
 */
export async function saveMessageToFirestore(
  emailOrUid: string,
  matchId: string,
  message: Message
): Promise<{ success: boolean; error?: string }> {
  try {
    const convId = getConversationDocId(emailOrUid, matchId);
    const convDocRef = doc(firestore, 'conversations', convId);
    const msgDocRef = doc(firestore, 'conversations', convId, 'messages', message.id);
    const nowIso = message.timestamp || new Date().toISOString();

    // 1. Update parent conversation document metadata
    await setDoc(
      convDocRef,
      {
        userId: emailOrUid,
        matchId: matchId,
        lastUpdated: nowIso,
        lastMessageText: message.text,
        lastSenderId: message.senderId,
        serverTimestamp: serverTimestamp()
      },
      { merge: true }
    );

    // 2. Write the individual message document into subcollection
    await setDoc(msgDocRef, {
      id: message.id,
      senderId: message.senderId,
      text: message.text,
      timestamp: nowIso,
      serverTimestamp: serverTimestamp()
    });

    return { success: true };
  } catch (err: any) {
    console.error(`[Firestore] saveMessageToFirestore failed for ${matchId}:`, err);
    return { success: false, error: err?.message || "Failed to save message to Firestore" };
  }
}

/**
 * Fetches the entire message history directly from Firebase Cloud Firestore.
 * Automatically ordered chronologically by timestamp.
 */
export async function fetchMessagesFromFirestore(
  emailOrUid: string,
  matchId: string
): Promise<{ success: boolean; messages: Message[]; error?: string }> {
  try {
    const convId = getConversationDocId(emailOrUid, matchId);
    const messagesCollRef = collection(firestore, 'conversations', convId, 'messages');
    const q = query(messagesCollRef, orderBy('timestamp', 'asc'));
    const snapshot = await getDocs(q);

    const messages: Message[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      messages.push({
        id: data.id || docSnap.id,
        senderId: data.senderId || 'user',
        text: data.text || '',
        timestamp: data.timestamp || new Date().toISOString()
      });
    });

    // Fallback: If 0 messages found and user has alias (e.g. sam@abc.com vs qyuan.sam@gmail.com), check alias
    if (messages.length === 0) {
      const aliasKey = emailOrUid.includes("qyuan") ? "sam_abc_com" : "qyuan_sam_gmail_com";
      const aliasConvId = `${aliasKey}_${(matchId || "").toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
      if (aliasConvId !== convId) {
        const aliasColl = collection(firestore, 'conversations', aliasConvId, 'messages');
        const aliasQ = query(aliasColl, orderBy('timestamp', 'asc'));
        const aliasSnap = await getDocs(aliasQ);
        aliasSnap.forEach((docSnap) => {
          const data = docSnap.data();
          messages.push({
            id: data.id || docSnap.id,
            senderId: data.senderId || 'user',
            text: data.text || '',
            timestamp: data.timestamp || new Date().toISOString()
          });
        });
      }
    }

    return { success: true, messages };
  } catch (err: any) {
    console.error(`[Firestore] fetchMessagesFromFirestore failed for ${matchId}:`, err);
    return { success: false, messages: [], error: err?.message || "Failed to load messages from Firestore" };
  }
}

/**
 * Subscribes to real-time message changes for a given match in Firestore.
 * Works seamlessly across web and mobile without manual polling.
 */
export function subscribeToMessagesFromFirestore(
  emailOrUid: string,
  matchId: string,
  onUpdate: (messages: Message[]) => void
): Unsubscribe {
  const convId = getConversationDocId(emailOrUid, matchId);
  const messagesCollRef = collection(firestore, 'conversations', convId, 'messages');
  const q = query(messagesCollRef, orderBy('timestamp', 'asc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const loaded: Message[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        loaded.push({
          id: data.id || docSnap.id,
          senderId: data.senderId || 'user',
          text: data.text || '',
          timestamp: data.timestamp || new Date().toISOString()
        });
      });
      if (loaded.length > 0) {
        onUpdate(loaded);
      }
    },
    (err) => {
      console.warn(`[Firestore] onSnapshot listener warning for ${matchId}:`, err);
    }
  );
}

/**
 * Personalized offline companion reply generator used when backend server is offline or unreachable.
 * Ensures the mobile experience remains lively, supportive, and permanently persisted to Firestore.
 */
export function generateOfflineCompanionReply(
  matchId: string,
  userMessage: string,
  companionName?: string
): string {
  const name = companionName || "Mei-ling";
  const lower = userMessage.toLowerCase();

  if (matchId === "meiling" || name.toLowerCase().includes("mei-ling")) {
    if (lower.includes("garden") || lower.includes("orchid") || lower.includes("flower")) {
      return "The delicate scent of orchids in the morning always brings such serenity to my spirit. Working in the garden teaches me patience and gentle care. Do you enjoy spending quiet time in nature as well?";
    }
    if (lower.includes("food") || lower.includes("cook") || lower.includes("eat") || lower.includes("tea") || lower.includes("coffee")) {
      return "Sharing a warm meal or tea is one of the most comforting rituals in life. I love preparing home-cooked dishes with fresh herbs. What is a favorite meal that reminds you of home?";
    }
    if (lower.includes("singapore") || lower.includes("travel") || lower.includes("place")) {
      return "Singapore has so many lovely, peaceful corners—especially during early evening strolls by the botanical gardens. I'd love to learn what places in the world feel most comforting to you.";
    }
    return `Your words carry such kindness and sincerity. In this next chapter of life, finding someone with whom conversation flows naturally is truly a blessing. Tell me more about what brings you joy these days.`;
  }

  if (matchId === "arthur" || name.toLowerCase().includes("arthur")) {
    if (lower.includes("book") || lower.includes("read") || lower.includes("history")) {
      return "There is nothing quite like holding an old leather-bound volume and losing yourself in the wisdom of bygone eras. What books have shaped how you view the world?";
    }
    return "I appreciate your thoughtful thoughts very much. Slow, meaningful dialogue over a warm cup of Earl Grey is one of life's greatest pleasures. How has your week been treating you?";
  }

  if (matchId === "evelyn" || name.toLowerCase().includes("evelyn")) {
    return "The morning light over the bay today had such incredible warmth—much like your message! Making art and baking fresh bread reminds me to savor each simple gift. What creative joys make you smile?";
  }

  return `Thank you for sharing that with me! In this chapter of life, genuine and warm conversations mean everything. I am looking forward to getting to know you better.`;
}

export const COMPANION_WELCOME_PROMPTS: Record<string, string> = {
  meiling: "The sweet fragrance of orchids always puts me in a peaceful mood! I have over twenty varieties in my garden here. What's the most exotic dish you've ever tasted on your travels?",
  arthur: "Greetings, my friend. I've just sat down with a warm cup of Earl Grey. I was reading a quiet biography about old Chicago botanists, and I found myself thinking about our shared fondness for museum strolls. How was your morning?",
  evelyn: "Hello! Sourdough came out of the wood oven perfectly golden today. I took a sketch board down to the Sausalito bay and watched the gulls. It is a stunning canvas today. What have you been creating or seeking this fine weekend?",
  frank: "Ahoy there! Just finished polishing the brass dials on my vintage sailboat. The Georgia winds are feeling beautifully gentle today. Have you ever spent a night looking at stars over the open river water? It is a wonderful peace.",
  miriam: "Happy afternoon! Our community theater is doing final rehearsals for our soft summer comedy play, and I am baking a wild raspberry tart for the crew. Tell me, do you love the creative thrill of live performances, or do you prefer quiet corner reading?",
  diana: "Greetings. I am sitting on the mountain cabin porch watching a family of deer. Boulder morning streams run beautifully clear right now. What nature sounds or outdoor scenes make you feel most grounded?",
  clara: "Just as every seedling takes its time to root, meaningful companionship grows step-by-step. I'd love to sketch flowers with you. What colors represent your current chapter of life?",
  eleanor: "A beautiful violin concerto requires patience and alignment. I find the same is true for conversations that touch the soul. What is your go-to comfort read?",
  grace: "Nothing beats the crackling crust of a freshly baked sourdough! I'd love to bake a fresh loaf for us to share. What's your favorite way to stay active?",
  takashi: "In traditional architecture, we design spaces that let the natural world breathe. I think relationships should be the same. Tell me, what brings peace to your mind?",
  sanjay: "Ayurveda teaches us that wellness comes from natural alignment with the seasons. Mindful companionship is a major part of that wellness. How do you like to start your mornings?",
  leo: "Hello! Just finished pressing our autumn Syrah, and now I'm spinning some gentle acoustic guitar vinyl. The sunset over the vineyard hills is quite a picture today. What kind of simple music or views help you unwind after a long day?",
  elena: "Hi there! I've just set down my cello bow after practicing a Bach suite. The aroma of a fresh sourdough loaf is filling the kitchen. Do you have a favorite comfort routine or cozy activity to ground your weekends?",
  marcus: "Greetings. I'm sitting in the woodshop with a cup of fresh-roasted espresso, looking at some reclaimed pine timbers. It's a rainy Seattle morning, perfect for slow-paced plans. What kind of shared adventures make you feel most alive?"
};

export function getCompanionWelcomeMessage(matchId: string): string {
  const key = (matchId || "").toLowerCase();
  return COMPANION_WELCOME_PROMPTS[key] || "Hello! It is lovely to connect with you. I am eager to share stories and quiet moments in this next beautiful chapter.";
}

