import { Message, Profile } from "../types";

export interface CompanionLetter {
  companionId: string;
  email: string;
  subject: string;
  defaultMessage: string;
  timeOffsetMs: number; // Offset from current time to stagger across Today, Yesterday, This Week, and Earlier
}

export const COMPANION_LETTERS: Record<string, CompanionLetter> = {
  arthur: {
    companionId: "arthur",
    email: "arthur.pendelton@nextchapter.dating",
    subject: "Re: Morning Earl Grey & Antique Bookstores",
    defaultMessage: "Greetings, my friend. I've just sat down with a warm cup of Earl Grey. I was reading a quiet biography about old Chicago botanists, and I found myself thinking about our shared fondness for museum strolls. How was your morning?",
    timeOffsetMs: 34 * 60 * 1000 // 34 minutes ago (Today)
  },
  evelyn: {
    companionId: "evelyn",
    email: "evelyn.vance@nextchapter.dating",
    subject: "Re: Golden Morning Sourdough & Bay Canvases",
    defaultMessage: "Hello! Sourdough came out of the wood oven perfectly golden today. I took a sketch board down to the Sausalito bay and watched the gulls. It is a stunning canvas today. What have you been creating or seeking this fine weekend?",
    timeOffsetMs: 2.2 * 3600 * 1000 // 2.2 hours ago (Today)
  },
  sanjay: {
    companionId: "sanjay",
    email: "sanjay.patel@nextchapter.dating",
    subject: "Re: Fresh Ginger Chai & Mindful Reflections",
    defaultMessage: "Namaste! Brewing a warm pot of spiced ginger chai while listening to morning rain. Mindful conversations are where lifelong connections begin. What simple ritual brought you joy today?",
    timeOffsetMs: 5.5 * 3600 * 1000 // 5.5 hours ago (Today)
  },
  eleanor: {
    companionId: "eleanor",
    email: "eleanor.wright@nextchapter.dating",
    subject: "Re: Violin Concertos & The Solace of Great Books",
    defaultMessage: "A beautiful violin concerto requires patience and alignment. I find the same is true for conversations that touch the soul. What is your go-to comfort read?",
    timeOffsetMs: 21 * 3600 * 1000 // 21 hours ago (Yesterday)
  },
  takashi: {
    companionId: "takashi",
    email: "takashi.yamamoto@nextchapter.dating",
    subject: "Re: Harmonious Spaces & Kyoto Tea Ceremonies",
    defaultMessage: "In traditional architecture, we design spaces that let the natural world breathe. I think relationships should be the same. Tell me, what brings peace to your mind?",
    timeOffsetMs: 28 * 3600 * 1000 // 28 hours ago (Yesterday)
  },
  meiling: {
    companionId: "meiling",
    email: "meiling.chen@nextchapter.dating",
    subject: "Re: Orchid Blossoms & Culinary Discoveries",
    defaultMessage: "The sweet fragrance of orchids always puts me in a peaceful mood! I have over twenty varieties in my garden here. What's the most exotic dish you've ever tasted on your travels?",
    timeOffsetMs: 40 * 3600 * 1000 // 40 hours ago (Yesterday)
  },
  frank: {
    companionId: "frank",
    email: "frank.holloway@nextchapter.dating",
    subject: "Re: Stargazing over Gentle Coastal Waters",
    defaultMessage: "Ahoy there! Just finished polishing the brass dials on my vintage sailboat. The Georgia winds are feeling beautifully gentle today. Have you ever spent a night looking at stars over the open river water? It is a wonderful peace.",
    timeOffsetMs: 52 * 3600 * 1000 // ~2 days ago (This Week)
  },
  diana: {
    companionId: "diana",
    email: "diana.sterling@nextchapter.dating",
    subject: "Re: Morning Streams & Rocky Mountain Wildlife",
    defaultMessage: "Greetings. I am sitting on the mountain cabin porch watching a family of deer. Boulder morning streams run beautifully clear right now. What nature sounds or outdoor scenes make you feel most grounded?",
    timeOffsetMs: 76 * 3600 * 1000 // ~3 days ago (This Week)
  },
  miriam: {
    companionId: "miriam",
    email: "miriam.gold@nextchapter.dating",
    subject: "Re: Fresh Raspberry Tarts & Theater Rehearsals",
    defaultMessage: "Happy afternoon! Our community theater is doing final rehearsals for our soft summer comedy play, and I am baking a wild raspberry tart for the crew. Tell me, do you love the creative thrill of live performances, or do you prefer quiet corner reading?",
    timeOffsetMs: 98 * 3600 * 1000 // ~4 days ago (This Week)
  },
  clara: {
    companionId: "clara",
    email: "clara.thorne@nextchapter.dating",
    subject: "Re: Sketching Wildflowers & Patient New Chapters",
    defaultMessage: "Just as every seedling takes its time to root, meaningful companionship grows step-by-step. I'd love to sketch flowers with you. What colors represent your current chapter of life?",
    timeOffsetMs: 124 * 3600 * 1000 // ~5 days ago (This Week)
  },
  leo: {
    companionId: "leo",
    email: "leo.valenti@nextchapter.dating",
    subject: "Re: Vintage Jazz Vinyl & Small-Batch Vineyards",
    defaultMessage: "Hey there! Testing some small-batch pinot noir while listening to vintage jazz vinyl. Life is best enjoyed at an unhurried tempo with good conversation. What's your favorite way to spend a quiet evening?",
    timeOffsetMs: 160 * 3600 * 1000 // ~6 days ago (This Week)
  },
  elena: {
    companionId: "elena",
    email: "elena.rostova@nextchapter.dating",
    subject: "Re: Morning Kayaks & Cello Melodies",
    defaultMessage: "Hello! Finished a morning cello practice before heading out for a misty kayak on the lake. What music or melodies have accompanied you through your most memorable life moments?",
    timeOffsetMs: 200 * 3600 * 1000 // ~8 days ago (Earlier)
  },
  marcus: {
    companionId: "marcus",
    email: "marcus.lindqvist@nextchapter.dating",
    subject: "Re: Handcrafted Cedar Benches & PNW Forests",
    defaultMessage: "Greetings from the Pacific Northwest! Just finished restoring a 1920s craftsman cedar bench. There's real warmth in things made with patience and care. What crafts or hobbies make time stand still for you?",
    timeOffsetMs: 245 * 3600 * 1000 // ~10 days ago (Earlier)
  },
  liwei: {
    companionId: "liwei",
    email: "liwei.tan@nextchapter.dating",
    subject: "Re: Roasted Nanyang Arabica & Heritage Shophouses",
    defaultMessage: "Good day! Just pulled a fresh roast of artisan Nanyang Liberica coffee. Watching the morning sunlight spill across the shophouse tiles always inspires me. What travel or culture memory brings you the fondest smile?",
    timeOffsetMs: 290 * 3600 * 1000 // ~12 days ago (Earlier)
  },
  ananya: {
    companionId: "ananya",
    email: "ananya.sharma@nextchapter.dating",
    subject: "Re: Classical Ragas & Balcony Herb Gardens",
    defaultMessage: "Warm hello from Bangalore! Spending the afternoon tending to my balcony herb garden and listening to Indian classical ragas. Life is sweet when shared with a kind soul. What brings you peace on quiet days?",
    timeOffsetMs: 340 * 3600 * 1000 // ~14 days ago (Earlier)
  },
  grace: {
    companionId: "grace",
    email: "grace.becker@nextchapter.dating",
    subject: "Re: Sourdough Loaves & Active Morning Walks",
    defaultMessage: "Nothing beats the crackling crust of a freshly baked sourdough! I'd love to bake a fresh loaf for us to share. What's your favorite way to stay active?",
    timeOffsetMs: 400 * 3600 * 1000 // ~16 days ago (Earlier)
  }
};

/**
 * Returns the companion letter configuration or generates a graceful fallback.
 */
export function getCompanionLetter(companion: Profile): CompanionLetter {
  const normId = companion.id.toLowerCase().replace(/^companion-/, "");
  if (COMPANION_LETTERS[normId]) {
    return COMPANION_LETTERS[normId];
  }

  // Graceful fallback for custom or new companions
  const cleanFirst = companion.name.split(" ")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
  return {
    companionId: companion.id,
    email: `${cleanFirst}@nextchapter.dating`,
    subject: companion.chapterTheme ? `Re: ${companion.chapterTheme}` : `Re: Warm Greetings from ${companion.name}`,
    defaultMessage: `Hello, I saw your profile and deeply appreciated your thoughts on ${companion.relationshipGoal || "meaningful companionship"}. I would love to begin a conversation with you.`,
    timeOffsetMs: 3 * 3600 * 1000
  };
}

export interface EmailInboxItemData {
  companion: Profile;
  lastMessage: Message | null;
  subject: string;
  senderEmail: string;
  previewText: string;
  timestamp: string; // ISO date string
  timestampMs: number;
  isUserLastSender: boolean;
  dateCategory: "Today" | "Yesterday" | "This Week" | "Earlier";
  formattedTime: string;
  formattedDate: string;
  formattedDisplay: string;
}

/**
 * Resolves full email metadata for a companion, incorporating active conversation history or realistic baseline correspondence.
 */
export function resolveCompanionEmailData(
  companion: Profile,
  conversations: Record<string, Message[]>,
  now: number = Date.now()
): EmailInboxItemData {
  const letter = getCompanionLetter(companion);
  const history = conversations[companion.id] || [];
  const lastMsg = history.length > 0 ? history[history.length - 1] : null;

  let timestampStr: string;
  let timestampMs: number;
  let previewText: string;
  let isUserLastSender = false;
  let subject = letter.subject;

  if (lastMsg) {
    timestampStr = lastMsg.timestamp;
    timestampMs = new Date(lastMsg.timestamp).getTime();
    if (isNaN(timestampMs)) {
      timestampMs = now - letter.timeOffsetMs;
      timestampStr = new Date(timestampMs).toISOString();
    }
    previewText = lastMsg.text;
    isUserLastSender = lastMsg.senderId === "user";
  } else {
    timestampMs = now - letter.timeOffsetMs;
    timestampStr = new Date(timestampMs).toISOString();
    previewText = letter.defaultMessage;
  }

  const dateObj = new Date(timestampMs);
  const nowDate = new Date(now);

  const isToday =
    dateObj.getDate() === nowDate.getDate() &&
    dateObj.getMonth() === nowDate.getMonth() &&
    dateObj.getFullYear() === nowDate.getFullYear();

  const yesterdayDate = new Date(now);
  yesterdayDate.setDate(nowDate.getDate() - 1);
  const isYesterday =
    dateObj.getDate() === yesterdayDate.getDate() &&
    dateObj.getMonth() === yesterdayDate.getMonth() &&
    dateObj.getFullYear() === yesterdayDate.getFullYear();

  let dateCategory: "Today" | "Yesterday" | "This Week" | "Earlier";
  if (isToday) {
    dateCategory = "Today";
  } else if (isYesterday) {
    dateCategory = "Yesterday";
  } else {
    const diffDays = Math.floor((now - timestampMs) / (24 * 3600 * 1000));
    if (diffDays <= 7) {
      dateCategory = "This Week";
    } else {
      dateCategory = "Earlier";
    }
  }

  const timeStr = dateObj.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  const isSameYear = dateObj.getFullYear() === nowDate.getFullYear();
  const dateStr = dateObj.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    ...(isSameYear ? {} : { year: "numeric" })
  });

  let formattedDisplay: string;
  if (isToday) {
    formattedDisplay = timeStr;
  } else if (isYesterday) {
    formattedDisplay = `Yesterday, ${timeStr}`;
  } else {
    formattedDisplay = `${dateStr}, ${timeStr}`;
  }

  return {
    companion,
    lastMessage: lastMsg,
    subject,
    senderEmail: letter.email,
    previewText,
    timestamp: timestampStr,
    timestampMs,
    isUserLastSender,
    dateCategory,
    formattedTime: timeStr,
    formattedDate: dateStr,
    formattedDisplay
  };
}
