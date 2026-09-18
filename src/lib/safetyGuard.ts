/**
 * Anti-Leakage & Safety Guardrail for Next Chapter Dating
 * Protects mature singles against romance scams, malicious links, and platform leakage
 * (e.g. Telegram handles, WhatsApp redirects, phone numbers, and external social media).
 */

export interface SafetyCheckResult {
  isLeak: boolean;
  category?: 'telegram' | 'whatsapp' | 'phone' | 'email' | 'social' | 'external_url' | 'messaging_app';
  label?: string;
  reason?: string;
  matchSnippet?: string;
}

export function detectPlatformLeakage(input: string): SafetyCheckResult {
  if (!input || typeof input !== 'string') {
    return { isLeak: false };
  }

  const text = input.trim();
  const lower = text.toLowerCase();

  // 1. TELEGRAM DETECTION
  // e.g. "t.me/username", "telegram.me/...", "telegram: ...", "tg: @username", "@username" with telegram context
  const telegramUrlRegex = /(?:https?:\/\/)?(?:t\.me|telegram\.me|telegram\.dog)\/[a-zA-Z0-9_]{3,}/i;
  const telegramMentionRegex = /(?:telegram|tg|tele)\s*(?:is|:|@|\s)\s*@?([a-zA-Z0-9_]{4,32})/i;
  if (telegramUrlRegex.test(text)) {
    const match = text.match(telegramUrlRegex);
    return {
      isLeak: true,
      category: 'telegram',
      label: 'Telegram Link',
      matchSnippet: match ? match[0] : undefined,
      reason: 'Sharing Telegram channels or direct handles is blocked to protect members from off-platform romance scams and unmonitored messaging.'
    };
  }
  if (telegramMentionRegex.test(text)) {
    const match = text.match(telegramMentionRegex);
    return {
      isLeak: true,
      category: 'telegram',
      label: 'Telegram Handle',
      matchSnippet: match ? match[0] : undefined,
      reason: 'Sharing Telegram handles is blocked to prevent off-platform scams and ensure a secure, accountable community.'
    };
  }

  // 2. WHATSAPP DETECTION
  // e.g. "wa.me/...", "api.whatsapp.com", "whatsapp: +1...", "whats app"
  const whatsappUrlRegex = /(?:https?:\/\/)?(?:wa\.me|api\.whatsapp\.com|chat\.whatsapp\.com)\/[a-zA-Z0-9_]+/i;
  const whatsappWordRegex = /(?:whatsapp|whats\s*app|wa\s*(?:no|num|number)?)\s*[:=\-]?\s*([+0-9\s\-()]{6,})/i;
  if (whatsappUrlRegex.test(text)) {
    const match = text.match(whatsappUrlRegex);
    return {
      isLeak: true,
      category: 'whatsapp',
      label: 'WhatsApp Link',
      matchSnippet: match ? match[0] : undefined,
      reason: 'Directing conversations to WhatsApp is prohibited to safeguard your privacy and prevent off-platform scams.'
    };
  }
  if (whatsappWordRegex.test(text)) {
    const match = text.match(whatsappWordRegex);
    return {
      isLeak: true,
      category: 'whatsapp',
      label: 'WhatsApp Contact',
      matchSnippet: match ? match[0] : undefined,
      reason: 'Sharing WhatsApp contacts is not permitted. Please keep conversations within Next Chapter Dialogue.'
    };
  }

  // 3. OTHER THIRD-PARTY MESSAGING APPS (WeChat, LINE, Signal, Viber, Snapchat)
  const messagingAppsRegex = /\b(?:wechat|weixin|line\s*id|signal\s*app|viber|snapchat|kik)\b\s*[:=\-]?\s*@?([a-zA-Z0-9_.\-]{3,})/i;
  if (messagingAppsRegex.test(text)) {
    const match = text.match(messagingAppsRegex);
    return {
      isLeak: true,
      category: 'messaging_app',
      label: 'External Messaging App',
      matchSnippet: match ? match[0] : undefined,
      reason: 'Moving conversations to external messaging apps is restricted to protect our members from impersonation and disintermediation.'
    };
  }

  // 4. EMAIL ADDRESSES
  const emailRegex = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/;
  if (emailRegex.test(text)) {
    const match = text.match(emailRegex);
    return {
      isLeak: true,
      category: 'email',
      label: 'Email Address',
      matchSnippet: match ? match[0] : undefined,
      reason: 'Posting email addresses publicly or in unverified chats is blocked to prevent spam and phishing.'
    };
  }

  // 5. SOCIAL MEDIA PLATFORMS (Facebook, Instagram, TikTok, Twitter/X)
  const socialRegex = /(?:facebook\.com|fb\.com|fb\.me|instagram\.com\/|tiktok\.com\/|twitter\.com\/|x\.com\/|(?:ig|insta|fb)\s*:\s*@?[a-zA-Z0-9_.\-]+)/i;
  if (socialRegex.test(text)) {
    const match = text.match(socialRegex);
    return {
      isLeak: true,
      category: 'social',
      label: 'Social Media Handle/Link',
      matchSnippet: match ? match[0] : undefined,
      reason: 'Posting personal social media profiles is blocked to protect community privacy and keep interactions focused.'
    };
  }

  // 6. EXTERNAL URLS / DOMAINS
  const urlRegex = /(?:https?:\/\/|www\.)[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/i;
  const rawDomainRegex = /\b[a-zA-Z0-9\-]+\.(?:com|org|net|io|co|me|xyz|top|site|app|link|cc|ru|cn)\b(?:\/[^\s]*)?/i;
  if (urlRegex.test(text)) {
    const match = text.match(urlRegex);
    return {
      isLeak: true,
      category: 'external_url',
      label: 'External Web Link',
      matchSnippet: match ? match[0] : undefined,
      reason: 'External web links are disabled in the community lounge to prevent malware, phishing, and commercial promotion.'
    };
  }
  if (rawDomainRegex.test(text)) {
    const match = text.match(rawDomainRegex);
    return {
      isLeak: true,
      category: 'external_url',
      label: 'External Web Domain',
      matchSnippet: match ? match[0] : undefined,
      reason: 'External web links are disabled in the community lounge to prevent malware, phishing, and commercial promotion.'
    };
  }

  // 7. PHONE NUMBERS & OBFUSCATED DIGITS
  // Exclude simple years like 1950, 1968, 2024, 2026, or times like 7:30
  // Look for 7 to 15 digits sequence with optional spaces/hyphens/dots/brackets
  const phonePattern = /(?:\+?\d{1,3}[\s\-.]?)?\(?\d{2,4}\)?[\s\-.]?\d{3,4}[\s\-.]?\d{3,5}/g;
  const phoneMatches = text.match(phonePattern);
  if (phoneMatches) {
    for (const match of phoneMatches) {
      const digitsOnly = match.replace(/\D/g, '');
      // Ensure it has at least 7 digits and is not an ISO date like 2026-07-06
      const isDate = /^\d{4}[-\s.]\d{2}[-\s.]\d{2}$/.test(match.trim());
      if (digitsOnly.length >= 7 && digitsOnly.length <= 15 && !isDate) {
        return {
          isLeak: true,
          category: 'phone',
          label: 'Phone Number',
          matchSnippet: match,
          reason: 'Sharing phone numbers in public community areas is blocked for personal safety and privacy.'
        };
      }
    }
  }

  // Check for intentional call/text phrases with numbers: e.g. "call me 91234567", "text me at 8123 4567"
  const callIntentRegex = /(?:call\s*(?:me)?|text\s*(?:me)?|reach\s*me|ring\s*me|cell|mobile|phone\s*(?:num)?)\s*(?:at|on|is|:)?\s*([0-9\s\-()]{5,})/i;
  const callMatch = callIntentRegex.exec(text);
  if (callMatch && callMatch[1]) {
    const digits = callMatch[1].replace(/\D/g, '');
    if (digits.length >= 5) {
      return {
        isLeak: true,
        category: 'phone',
        label: 'Phone/Direct Contact',
        matchSnippet: callMatch[0],
        reason: 'Sharing direct phone numbers is blocked to maintain a protected and verified environment.'
      };
    }
  }

  return { isLeak: false };
}

/**
 * Curated Daily Prompts for mature singles
 * High-intent, slow-paced reflective prompts that foster meaningful 1-on-1 dialogue
 */
export interface CuratedDailyPrompt {
  id: string;
  category: 'Morning Reflection' | 'Cherished Memories' | 'Life Philosophy' | 'Passions & Arts' | 'Travel & Sanctuary';
  title: string;
  subtitle: string;
  themeColor: string;
  icon: string;
  companionResponses: {
    companionId: string;
    companionName: string;
    companionAge: number;
    companionLocation: string;
    avatarColor: string;
    avatarEmoji: string;
    reflection: string;
    publishedTime: string;
    likes: number;
  }[];
}

export const CURATED_DAILY_PROMPTS: CuratedDailyPrompt[] = [
  {
    id: 'prompt-morning-peace',
    category: 'Morning Reflection',
    title: 'What simple morning ritual brings you the deepest sense of peace?',
    subtitle: 'From grinding fresh Ethiopian coffee to watching garden birds or gentle dawn walks.',
    themeColor: 'from-amber-600 to-rose-600',
    icon: '🌅',
    companionResponses: [
      {
        companionId: '1',
        companionName: 'Eleanor',
        companionAge: 52,
        companionLocation: 'Portland, OR',
        avatarColor: 'from-rose-400 to-amber-300',
        avatarEmoji: '🌸',
        reflection: 'Stepping onto my deck at 6:45 AM before the neighborhood wakes, mug of jasmine green tea warm in both hands, listening to the cedar waxwings. It reminds me that life in this chapter doesn’t need to be rushed.',
        publishedTime: 'Today at 7:15 AM',
        likes: 14
      },
      {
        companionId: '2',
        companionName: 'Marcus',
        companionAge: 58,
        companionLocation: 'Seattle, WA',
        avatarColor: 'from-amber-600 to-emerald-600',
        avatarEmoji: '🪵',
        reflection: 'Hand-sanding reclaimed pine in my woodshop while jazz plays softly on an old FM receiver. When the sun breaks through the mist, there is nothing more grounding.',
        publishedTime: 'Today at 8:02 AM',
        likes: 19
      },
      {
        companionId: '3',
        companionName: 'Clara',
        companionAge: 61,
        companionLocation: 'San Francisco, CA',
        avatarColor: 'from-violet-400 to-rose-300',
        avatarEmoji: '🎨',
        reflection: 'Sketching the morning fog shifting over the bay with fresh watercolor washes. Every dawn is a brand-new palette waiting to be noticed.',
        publishedTime: 'Today at 8:40 AM',
        likes: 11
      }
    ]
  },
  {
    id: 'prompt-cherished-melody',
    category: 'Cherished Memories',
    title: 'Which song or melody immediately transports you to a treasured memory?',
    subtitle: 'A vinyl track from youth, a classic concert under the stars, or a gentle waltz.',
    themeColor: 'from-purple-600 to-indigo-600',
    icon: '🎵',
    companionResponses: [
      {
        companionId: '4',
        companionName: 'Arthur',
        companionAge: 64,
        companionLocation: 'Boston, MA',
        avatarColor: 'from-blue-600 to-amber-600',
        avatarEmoji: '⛵',
        reflection: 'Dave Brubeck’s "Take Five" on vinyl. My late uncle played it on Sunday afternoons after sailing in Marblehead harbor. The smell of cedar smoke and brass.',
        publishedTime: 'Yesterday',
        likes: 22
      },
      {
        companionId: '5',
        companionName: 'Vivian',
        companionAge: 55,
        companionLocation: 'Denver, CO',
        avatarColor: 'from-emerald-500 to-teal-400',
        avatarEmoji: '🌿',
        reflection: 'Vivaldi’s Four Seasons (Autumn). My father used to hum the movement while harvesting heritage apples in upstate New York.',
        publishedTime: 'Yesterday',
        likes: 16
      }
    ]
  },
  {
    id: 'prompt-sanctuary-place',
    category: 'Travel & Sanctuary',
    title: 'Which place that you traveled to felt surprisingly like home, and why?',
    subtitle: 'A quiet coastal village, a mountain cabin library, or an old cobblestone tea shop.',
    themeColor: 'from-emerald-600 to-teal-700',
    icon: '🗺️',
    companionResponses: [
      {
        companionId: '6',
        companionName: 'Julian',
        companionAge: 59,
        companionLocation: 'Austin, TX',
        avatarColor: 'from-amber-700 to-rose-500',
        avatarEmoji: '☕',
        reflection: 'A stone guesthouse in Kyoto overlooking a moss garden in November. No television, just the sound of rain on cedar roof tiles and warm houjicha tea.',
        publishedTime: '2 days ago',
        likes: 25
      },
      {
        companionId: '7',
        companionName: 'Beatrice',
        companionAge: 57,
        companionLocation: 'Chicago, IL',
        avatarColor: 'from-rose-500 to-pink-400',
        avatarEmoji: '📚',
        reflection: 'A small second-hand bookstore in Edinburgh with worn leather wingback armchairs and the smell of paper and peat smoke. I could have stayed forever.',
        publishedTime: '2 days ago',
        likes: 18
      }
    ]
  }
];
