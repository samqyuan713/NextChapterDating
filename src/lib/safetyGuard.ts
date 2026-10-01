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
        companionId: 'eleanor',
        companionName: 'Eleanor',
        companionAge: 71,
        companionLocation: 'Oakwood Hills, IL',
        avatarColor: 'from-fuchsia-100 to-purple-200 text-purple-900',
        avatarEmoji: '🎻',
        reflection: 'Stepping onto my deck at 6:45 AM before the neighborhood wakes, mug of jasmine green tea warm in both hands, listening to the morning birds. It reminds me that life in this chapter doesn’t need to be rushed.',
        publishedTime: 'Today at 7:15 AM',
        likes: 5
      },
      {
        companionId: 'marcus',
        companionName: 'Marcus',
        companionAge: 65,
        companionLocation: 'Scottish Highlands, UK',
        avatarColor: 'from-emerald-100 to-teal-200 text-teal-900',
        avatarEmoji: '🏔️',
        reflection: 'Tending the hearth woodstove while gentle acoustic tunes play softly in the cabin. When the morning sun breaks through the loch mist, there is nothing more grounding.',
        publishedTime: 'Today at 8:02 AM',
        likes: 7
      },
      {
        companionId: 'clara',
        companionName: 'Clara',
        companionAge: 56,
        companionLocation: 'Sausalito, CA',
        avatarColor: 'from-teal-100 to-emerald-200 text-emerald-900',
        avatarEmoji: '🌿',
        reflection: 'Sketching the morning coastal fog shifting over the bay with fresh watercolor washes. Every dawn is a brand-new palette waiting to be noticed.',
        publishedTime: 'Today at 8:40 AM',
        likes: 4
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
        companionId: 'arthur',
        companionName: 'Arthur',
        companionAge: 68,
        companionLocation: 'Oak Park, IL',
        avatarColor: 'from-amber-100 to-stone-200 text-amber-900',
        avatarEmoji: '📚',
        reflection: 'Dave Brubeck’s "Take Five" on vinyl. Playing it on Sunday afternoons while binding old botanical folios. The smell of cedar smoke and aged paper always brings comfort.',
        publishedTime: 'Yesterday',
        likes: 8
      },
      {
        companionId: 'evelyn',
        companionName: 'Evelyn',
        companionAge: 62,
        companionLocation: 'Carmel-by-the-Sea, CA',
        avatarColor: 'from-rose-100 to-amber-100 text-rose-900',
        avatarEmoji: '🎨',
        reflection: 'Vivaldi’s Four Seasons (Autumn). My father used to hum the movement while harvesting heritage apples in upstate orchards.',
        publishedTime: 'Yesterday',
        likes: 6
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
        companionId: 'takashi',
        companionName: 'Takashi',
        companionAge: 63,
        companionLocation: 'Kyoto, Japan',
        avatarColor: 'from-emerald-100 to-teal-100 text-teal-900',
        avatarEmoji: '🪴',
        reflection: 'A stone pavilion overlooking a quiet moss garden in November. No noise, just the sound of rain on cedar roof tiles and a steaming bowl of hot sencha tea.',
        publishedTime: '2 days ago',
        likes: 7
      },
      {
        companionId: 'meiling',
        companionName: 'Mei-Ling',
        companionAge: 62,
        companionLocation: 'Singapore',
        avatarColor: 'from-emerald-100 to-teal-200 text-teal-950',
        avatarEmoji: '🌺',
        reflection: 'A small second-hand bookstore in Edinburgh with worn leather wingback armchairs and the aroma of old paper and Earl Grey tea. I could have stayed forever.',
        publishedTime: '2 days ago',
        likes: 6
      }
    ]
  },
  {
    id: 'prompt-quiet-passions',
    category: 'Passions & Arts',
    title: 'What creative endeavor or craft makes time completely slip away for you?',
    subtitle: 'From restoring antique woodwork to watercolor painting, pottery, or heirloom cooking.',
    themeColor: 'from-orange-600 to-amber-700',
    icon: '🎨',
    companionResponses: [
      {
        companionId: 'frank',
        companionName: 'Frank',
        companionAge: 71,
        companionLocation: 'Savannah, GA',
        avatarColor: 'from-sky-100 to-blue-200 text-blue-900',
        avatarEmoji: '⚓',
        reflection: 'A wooden dock at sunset on Tybee Island listening to the marsh tides roll in with a cup of black coffee. Reminds me of decades flying over open oceans.',
        publishedTime: '3 days ago',
        likes: 5
      },
      {
        companionId: 'miriam',
        companionName: 'Miriam',
        companionAge: 64,
        companionLocation: 'Victoria, BC',
        avatarColor: 'from-rose-100 to-orange-100 text-rose-900',
        avatarEmoji: '🎭',
        reflection: 'The quiet backstage greenroom right before the curtains rise on an opening night. Smells like pine rosin, old velvet, and shared nervous laughter.',
        publishedTime: '3 days ago',
        likes: 4
      },
      {
        companionId: 'diana',
        companionName: 'Diana',
        companionAge: 65,
        companionLocation: 'Boulder, CO',
        avatarColor: 'from-emerald-100 to-emerald-200 text-emerald-800',
        avatarEmoji: '🦉',
        reflection: 'A secluded aspen clearing near Rocky Mountain National Park at dawn with my camera tripod. Watching elk graze in the frost mist.',
        publishedTime: '3 days ago',
        likes: 6
      },
      {
        companionId: 'grace',
        companionName: 'Grace',
        companionAge: 67,
        companionLocation: 'Portland, OR',
        avatarColor: 'from-amber-100 to-orange-200 text-amber-950',
        avatarEmoji: '🥐',
        reflection: 'Our neighborhood community sourdough kitchen at 5:00 AM. The warm hearth and the smell of toasted caraway rye always feels like family.',
        publishedTime: '4 days ago',
        likes: 5
      }
    ]
  },
  {
    id: 'prompt-life-wisdom',
    category: 'Life Philosophy',
    title: 'What truth about love or friendship do you understand much better in this chapter of life?',
    subtitle: 'On presence, patient listening, authentic comfort, and quiet shared laughter.',
    themeColor: 'from-teal-600 to-blue-700',
    icon: '✨',
    companionResponses: [
      {
        companionId: 'sanjay',
        companionName: 'Sanjay',
        companionAge: 66,
        companionLocation: 'San Jose, CA',
        avatarColor: 'from-amber-100 to-orange-100 text-amber-900',
        avatarEmoji: '🧘',
        reflection: 'Early morning yoga on the ghats of Rishikesh as the temple bells echo across the misty river. True companionship is comfortable silence where no words are needed.',
        publishedTime: '4 days ago',
        likes: 7
      },
      {
        companionId: 'leo',
        companionName: 'Leo',
        companionAge: 59,
        companionLocation: 'Florence, IT',
        avatarColor: 'from-amber-100 to-stone-200 text-stone-900',
        avatarEmoji: '🍷',
        reflection: 'An outdoor table under wild olive trees in Greve in Chianti with vintage vinyl playing from the open window. Slow food and genuine company.',
        publishedTime: '4 days ago',
        likes: 6
      },
      {
        companionId: 'elena',
        companionName: 'Elena',
        companionAge: 60,
        companionLocation: 'San José, CR',
        avatarColor: 'from-emerald-100 to-teal-100 text-emerald-950',
        avatarEmoji: '🌿',
        reflection: 'A quiet rain shower over the cloud forest in Monteverde while playing cello on the veranda. Nature provides the sweetest harmonics.',
        publishedTime: '5 days ago',
        likes: 5
      },
      {
        companionId: 'liwei',
        companionName: 'Li-Wei',
        companionAge: 68,
        companionLocation: 'Taipei, TW',
        avatarColor: 'from-emerald-100 to-amber-100 text-teal-950',
        avatarEmoji: '🍵',
        reflection: 'Brewing 20-year aged pu-erh tea with spring mountain water. Watching the amber liquid settle reminds me to enjoy the slow passage of time.',
        publishedTime: '5 days ago',
        likes: 6
      },
      {
        companionId: 'ananya',
        companionName: 'Ananya',
        companionAge: 57,
        companionLocation: 'Bangkok, TH',
        avatarColor: 'from-rose-100 to-orange-100 text-rose-950',
        avatarEmoji: '🌺',
        reflection: 'The flower market along the Chao Phraya river before sunrise, selecting fresh jasmine and lotus blooms for traditional garlands. Kindness is a quiet bloom.',
        publishedTime: '5 days ago',
        likes: 5
      }
    ]
  }
];

export interface CompanionPromptReflectionResult {
  promptId: string;
  promptTitle: string;
  promptCategory: string;
  promptIcon: string;
  reflection: string;
  companionName: string;
  companionAge: number;
  companionLocation: string;
  avatarEmoji: string;
  avatarColor: string;
}

/**
 * Returns a companion's authentic prompt reflection for 1-on-1 icebreakers and profile discovery.
 */
export function getCompanionPromptReflection(companionId: string): CompanionPromptReflectionResult | null {
  const normId = companionId.toLowerCase().replace(/^companion-/, "");
  for (const prompt of CURATED_DAILY_PROMPTS) {
    const found = prompt.companionResponses.find(
      (r) => r.companionId.toLowerCase() === normId || r.companionName.toLowerCase() === normId
    );
    if (found) {
      return {
        promptId: prompt.id,
        promptTitle: prompt.title,
        promptCategory: prompt.category,
        promptIcon: prompt.icon,
        reflection: found.reflection,
        companionName: found.companionName,
        companionAge: found.companionAge,
        companionLocation: found.companionLocation,
        avatarEmoji: found.avatarEmoji,
        avatarColor: found.avatarColor
      };
    }
  }

  // Graceful fallback for any dynamic custom companion
  return {
    promptId: 'prompt-morning-peace',
    promptTitle: 'What simple morning ritual brings you the deepest sense of peace?',
    promptCategory: 'Morning Reflection',
    promptIcon: '🌅',
    reflection: 'Quietly enjoying an early morning brew and listening to the sunrise birds. Taking life at a comfortable pace is the greatest blessing.',
    companionName: normId.charAt(0).toUpperCase() + normId.slice(1),
    companionAge: 60,
    companionLocation: 'Nearby',
    avatarEmoji: '☕',
    avatarColor: 'from-amber-100 to-rose-100 text-amber-900'
  };
}
