/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Profile, VoiceGreeting, CuratedIntroduction } from "../types.ts";
import { calculateDistance, POPULAR_CITY_PRESETS } from "../lib/locationService.ts";

export const COMPANION_VOICE_GREETINGS: Record<string, VoiceGreeting> = {
  meiling: {
    profileId: "meiling",
    durationSeconds: 16,
    transcript: "Warm greetings! Mei-Ling here. My greenhouse is blooming with sweet orchids, and there's fresh sourdough on the counter. I'm hoping to share gentle laughs, tea, and morning walks with someone kind.",
    accent: "Gentle Singapore English"
  },
  arthur: {
    profileId: "arthur",
    durationSeconds: 18,
    transcript: "Hello there. Arthur here. If you enjoy quiet conversations on history, tending heirloom tomatoes, or savoring an afternoon Earl Grey, I would be delighted to make your acquaintance.",
    accent: "Warm Midwestern Academic"
  },
  evelyn: {
    profileId: "evelyn",
    durationSeconds: 17,
    transcript: "Hi, I'm Evelyn! To me, this chapter of life is an open canvas with vibrant watercolors. Let's take a coastal drive, wander an art gallery, and celebrate the small joys together.",
    accent: "Bright Coastal Californian"
  },
  frank: {
    profileId: "frank",
    durationSeconds: 18,
    transcript: "Ahoy there, Frank here from Savannah. After a career in the cockpit, I love the slow rhythm of the river, classic jazz, and good barbecue. Looking for a warm first mate for this season.",
    accent: "Southern Maritime Drawl"
  },
  miriam: {
    profileId: "miriam",
    durationSeconds: 16,
    transcript: "Hello! Miriam here. When I'm not directing local plays, I love cozy bookshops, baking berry tarts, and sharing heartfelt conversation. Looking forward to hearing your story.",
    accent: "Expressive Pacific Northwest"
  },
  diana: {
    profileId: "diana",
    durationSeconds: 17,
    transcript: "Good day. Diana here. The crisp mountain air and birdwatching keep my soul steady. I'm looking for an outdoor companion who cherishes quiet mornings and campfire acoustic tunes.",
    accent: "Calm Colorado Naturalist"
  },
  clara: {
    profileId: "clara",
    durationSeconds: 15,
    transcript: "Hello darling, Clara here from Charleston. Life is sweet when shared with someone gentle who appreciates porch breezes, magnolia blooms, and heartfelt melodies.",
    accent: "Gracious Southern Belle"
  },
  eleanor: {
    profileId: "eleanor",
    durationSeconds: 17,
    transcript: "Greetings, Eleanor here. Life in the high desert of Santa Fe has taught me the elegance of quiet skies and adobe sunsets. I welcome someone sincere to share music and dinner.",
    accent: "Refined Southwestern"
  },
  grace: {
    profileId: "grace",
    durationSeconds: 16,
    transcript: "Warm hello from Sedona. I spend my afternoons painting red rock vistas and playing cello. I value presence, open-hearted listening, and laughter under star-filled skies.",
    accent: "Gentle Arizona Artist"
  },
  takashi: {
    profileId: "takashi",
    durationSeconds: 17,
    transcript: "Konnichiwa, Takashi here. In my Kyoto pottery studio, every piece embraces quiet imperfection. I hope to find a patient companion to share garden tea and peaceful evenings.",
    accent: "Reflective Japanese Art Master"
  },
  sanjay: {
    profileId: "sanjay",
    durationSeconds: 18,
    transcript: "Namaste, Sanjay here. Stillness, ancient temple architecture, and warm cardamom chai bring me joy. I look forward to meaningful dialogues and discovering new horizons together.",
    accent: "Warm Indian Scholar"
  },
  leo: {
    profileId: "leo",
    durationSeconds: 16,
    transcript: "Ciao, Leo here. Between stone sculpture and olive groves, I believe passion only deepens with age. Let's share a glass of Chianti and talk about the things that truly matter.",
    accent: "Warm Tuscan Accent"
  },
  elena: {
    profileId: "elena",
    durationSeconds: 17,
    transcript: "Hola, Elena here. Costa Rica's cloud forests taught me the art of slowing down. Looking for a companion who appreciates early morning coffee and the symphony of rain.",
    accent: "Gentle Costa Rican"
  },
  marcus: {
    profileId: "marcus",
    durationSeconds: 18,
    transcript: "Good day, Marcus here from the Scottish Highlands. The heather hills and single malt whiskies are best enjoyed with someone honest, humorous, and open-hearted.",
    accent: "Warm Scottish Brogue"
  },
  liwei: {
    profileId: "liwei",
    durationSeconds: 17,
    transcript: "Hello, Li-Wei here. Mountain mist, vintage pu-erh tea, and classical calligraphy teach me stillness. I hope to meet someone who values gentle wisdom and quiet companionship.",
    accent: "Reflective Taiwanese"
  },
  ananya: {
    profileId: "ananya",
    durationSeconds: 16,
    transcript: "Sawasdee, Ananya here from Bangkok. Weaving fine silk taught me patience and gratitude. I would love to cook a fragrant meal and share sincere smiles with a kind partner.",
    accent: "Gracious Thai"
  }
};

export const CURATED_CONCIERGE_PROFILES: Record<string, CuratedIntroduction> = {
  arthur: {
    companionId: "arthur",
    handpickedDate: "This Weekend",
    matchScore: 96,
    conciergeRationale: "Arthur and you both cherish quiet intellectual depth, value gentle patience, and appreciate organic gardening. At 68, he shares your desire for heartfelt conversation over Earl Grey rather than hasty small talk.",
    suggestedRendezvous: "A calm Sunday morning stroll through the Chicago Botanic Gardens, followed by warm Earl Grey tea at The English Room.",
    highlightThemes: ["Organic Gardening", "Intellectual Leisure", "Quiet Walks", "Earl Grey Tea"]
  },
  evelyn: {
    companionId: "evelyn",
    handpickedDate: "This Weekend",
    matchScore: 94,
    conciergeRationale: "Evelyn's artistic vibrancy and passion for sourdough baking and coastal walks aligns seamlessly with your love for cultural exploration and creative pursuits in this rich life chapter.",
    suggestedRendezvous: "A Saturday afternoon visit to a quiet watercolor exhibit, followed by an oceanfront walk and artisan bakery treats.",
    highlightThemes: ["Seaside Walks", "Creative Expression", "Independent Film", "Sourdough Baking"]
  },
  meiling: {
    companionId: "meiling",
    handpickedDate: "This Weekend",
    matchScore: 93,
    conciergeRationale: "Mei-Ling's warm hospitality, orchid botanist expertise, and culinary mastery make her an ideal partner for peaceful morning Tai Chi and weekend farmers' market discoveries.",
    suggestedRendezvous: "A visit to the greenhouse orchid pavilion, followed by sampling fresh artisan cardamom pastries at a sunny courtyard café.",
    highlightThemes: ["Horticulture", "Gourmet Dessert Baking", "Morning Tai Chi", "Vibrant Hospitality"]
  },
  frank: {
    companionId: "frank",
    handpickedDate: "This Weekend",
    matchScore: 91,
    conciergeRationale: "Frank's grounding maritime humor, deep appreciation for live jazz, and honorable nature offer steady, comforting companionship for sunset dinners.",
    suggestedRendezvous: "An evening stroll along the river marina with live jazz drifting from the patio, followed by smoked artisanal seafood.",
    highlightThemes: ["Sailing & Maritime", "Live Jazz", "Simple Rhythms", "Honorable Warmth"]
  }
};

export function getCuratedIntroduction(companionId: string, companionName: string): CuratedIntroduction {
  if (CURATED_CONCIERGE_PROFILES[companionId]) {
    return CURATED_CONCIERGE_PROFILES[companionId];
  }
  return {
    companionId,
    handpickedDate: "This Weekend",
    matchScore: 92,
    conciergeRationale: `Selected by NextChapter Concierge for shared life values, calm maturity, and resonant lifestyle preferences with ${companionName}.`,
    suggestedRendezvous: `A leisurely afternoon coffee or tea at a scenic, quiet local café, followed by a light garden stroll.`,
    highlightThemes: ["Shared Life Values", "Mellow Conversation", "Local Proximity"]
  };
}

export const RAW_INITIAL_MATCH_PROFILES: Profile[] = [
  {
    id: "meiling",
    name: "Mei-Ling",
    age: 58,
    location: "Singapore",
    occupation: "Retired Pastry Chef & Orchid Botanist",
    relationshipGoal: "Friendship & Culinary Adventures",
    chapterTheme: "Sweet Vanilla & Orchid Greenhouse",
    interests: ["Horticulture", "Gourmet Dessert Baking", "Tai Chi", "Farmers' Markets", "Kayaking"],
    values: ["Warm hospitality", "Generosity", "Lifelong vitality", "Vibrant colors"],
    bio: "I spent my life in busy Singapore kitchens, but now my sanctuary is my greenhouse filled with rare orchids. I still bake daily—there's always sourdough or cardamom buns on the counter. Looking for an active, enthusiastic partner to travel, try exotic street foods, and practice peaceful Tai Chi with on sunny mornings.",
    avatarEmoji: "🌸",
    avatarColor: "from-pink-100 to-rose-200 text-rose-950",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80",
    height: 62, // 5'2"
    weight: 122,
    gender: "Female",
    latitude: 1.3521,
    longitude: 103.8198
  },
  {
    id: "arthur",
    name: "Arthur",
    age: 68,
    location: "Oakwood Hills, IL",
    occupation: "Retired History Professor",
    relationshipGoal: "Companionship & Conversation",
    chapterTheme: "Intellectual Leisure & Gardening",
    interests: ["Classical Music", "Biographies", "Organic Gardening", "Museum Strolls", "Afternoon Tea"],
    values: ["Intellectual curiosity", "Gentle patience", "Lifelong learning", "Quiet walks"],
    bio: "After 35 years in the classroom, I'm enjoying a slower pace. I spend my mornings growing heirloom tomatoes and my afternoons reading near the window. Widowed four years ago, I find myself missing deep, thoughtful conversation over Earl Grey, museum strolls, and a companion to share the quiet beauty of this season.",
    avatarEmoji: "👨‍🏫",
    avatarColor: "from-amber-100 to-amber-200 text-amber-800",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80",
    height: 71, // 5'11"
    weight: 175,
    gender: "Male",
    latitude: 42.2314,
    longitude: -88.2570
  },
  {
    id: "evelyn",
    name: "Evelyn",
    age: 62,
    location: "Sausalito, CA",
    occupation: "Contemporary Art Curator",
    relationshipGoal: "Romance & Shared Creativity",
    chapterTheme: "Passionate Expression & Coast Road Trips",
    interests: ["Watercolor Painting", "Coastal Hiking", "Independent Film", "Foreign Languages", "Baking Sourdough", "Yoga & Stretching", "Kayaking"],
    values: ["Self-expression", "Spontaneity", "Empathy", "Vibrancy"],
    bio: "Life's next chapter isn't a retirement from passion; it's a blank canvas! I curate art exhibits and paint seaside landscapes. I love spontaneous coastal drives, farmers' markets, indie cinemas, and sharing laughter over a glass of Pinot Noir. Seeking someone open-minded, ready for new trails, and looking to paint a vivid chapter together.",
    avatarEmoji: "🎨",
    avatarColor: "from-rose-100 to-rose-200 text-rose-800",
    photoUrl: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=1000&q=80",
    height: 66, // 5'6"
    weight: 132,
    gender: "Female",
    latitude: 37.8591,
    longitude: -122.4853
  },
  {
    id: "frank",
    name: "Frank",
    age: 74,
    location: "Savannah, GA",
    occupation: "Retired Airline Captain & Navy Veteran",
    relationshipGoal: "Companion for Travel & Good Food",
    chapterTheme: "Sunsets & Slow Sailing",
    interests: ["Sailing", "Woodworking", "Jazz Classics", "Wood-fired Cooking", "Local History", "Golf outings", "Fly Fishing"],
    values: ["Honor", "Humor in all things", "Active lifestyle", "Simple moments"],
    bio: "I spent my life in the skies, but now my feet are firmly planted on the dock. I restore vintage sailboats and smoke a mean brisket for neighbors. I appreciate live jazz, a well-placed joke, and warm Savannah nights. Looking for a warm, caring companion to share the captain's bench—both on the river and in simple daily rhythms.",
    avatarEmoji: "⛵",
    avatarColor: "from-blue-100 to-blue-200 text-blue-800",
    photoUrl: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=1000&q=80",
    height: 73, // 6'1"
    weight: 195,
    gender: "Male",
    latitude: 32.0809,
    longitude: -81.0912
  },
  {
    id: "miriam",
    name: "Miriam",
    age: 59,
    location: "Portland, OR",
    occupation: "High-School Drama Director",
    relationshipGoal: "Deep Friendship & Cultural Outings",
    chapterTheme: "Community, Theater & Tea Houses",
    interests: ["Local Playhouses", "Cozy Bookstores", "Horticulture", "Farmers' Markets", "Gourmet Dessert Baking", "Tai Chi", "Swimming laps"],
    values: ["Community care", "Creative laughter", "Family-centric life", "Warm hearth"],
    bio: "I teach students how to find their true voices on stage. Outside of school, I have a deep passion for horticulture, cozy tea shops, and community theater. I love baking tarts and cuddling with my golden retriever. Looking for a genuine, kind person who enjoys local plays, acoustic guitar, and believes kindness is the best currency.",
    avatarEmoji: "🎭",
    avatarColor: "from-purple-100 to-purple-200 text-purple-800",
    photoUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=1000&q=80",
    height: 64, // 5'4"
    weight: 140,
    gender: "Female",
    latitude: 45.5152,
    longitude: -122.6784
  },
  {
    id: "diana",
    name: "Diana",
    age: 65,
    location: "Boulder, CO",
    occupation: "Retired Wildlife Veterinarian",
    relationshipGoal: "Outdoor Companion & Slow Living",
    chapterTheme: "Nature Healing & Photography",
    interests: ["Wildlife Photography", "Snowshoeing", "Cabin Retreats", "Botanical Pressing", "Acoustic Folk", "Bicycle Rides", "Yoga & Stretching"],
    values: ["Environmental stewardship", "Peace of mind", "Kindness to creatures", "Simplicity"],
    bio: "I retired from caring for boulder's local wildlife, but nature remains my sanctuary. You can usually find me with a telephoto lens tracking birds or pressing botanical specimens. I live simply, cherish morning silence, and listen to acoustic guitar. Seeking a partner who loves fresh mountain air, quiet road trips, and cozy evenings near a woodstove.",
    avatarEmoji: "🦉",
    avatarColor: "from-emerald-100 to-emerald-200 text-emerald-800",
    photoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1000&q=80",
    height: 67, // 5'7"
    weight: 135,
    gender: "Female",
    latitude: 40.0150,
    longitude: -105.2705
  },
  {
    id: "clara",
    name: "Clara",
    age: 56,
    location: "Sausalito, CA",
    occupation: "Landscape Architect & Botanist",
    relationshipGoal: "Companionship & Shared Outings",
    chapterTheme: "Early Coastal Mists & Flora Designs",
    interests: ["Horticulture", "Watercolor Painting", "Kayaking", "Yoga & Stretching", "Bicycle Rides", "Fly Fishing"],
    values: ["Patience", "Nature alignment", "Kindness", "Serenity"],
    bio: "Designing gardens has taught me that the finest blooms take patience. I'm Clara, looking for someone who loves early morning coastal mist, light hikes, and sharing quiet laughter. Let's design our next vibrant landscape together.",
    avatarEmoji: "🌿",
    avatarColor: "from-teal-100 to-emerald-200 text-emerald-900",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    height: 65, // 5'5"
    weight: 125,
    gender: "Female",
    latitude: 37.8591,
    longitude: -122.4853
  },
  {
    id: "eleanor",
    name: "Eleanor",
    age: 71,
    location: "Oakwood Hills, IL",
    occupation: "Retired Symphony Violinist",
    relationshipGoal: "Intellectual Depth & Conversation",
    chapterTheme: "Chamber Melodies & Warm Herbal Teas",
    interests: ["Classical Music", "Acoustic Folk", "Museum Strolls", "Tai Chi", "Cozy Bookstores"],
    values: ["Harmony", "Cultural preservation", "Deep listening", "Polite wisdom"],
    bio: "After a lifetime of playing concertos, I appreciate the beautiful spaces between the notes. I love intimate chamber concerts, herbal tea, and discussing local history. Hoping to find a kindred spirit for thoughtful morning chats.",
    avatarEmoji: "🎻",
    avatarColor: "from-fuchsia-100 to-purple-250 text-purple-900",
    photoUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
    height: 63, // 5'3"
    weight: 118,
    gender: "Female",
    latitude: 42.2314,
    longitude: -88.2570
  },
  {
    id: "grace",
    name: "Grace",
    age: 67,
    location: "Portland, OR",
    occupation: "Organic Bakery Owner",
    relationshipGoal: "Romance & Shared Travels",
    chapterTheme: "Sweet Aromas & Active Court Sports",
    interests: ["Baking Sourdough", "Gourmet Dessert Baking", "Farmers' Markets", "Swimming laps", "Pickleball"],
    values: ["Honesty", "Vitality", "Nourishment", "Joyful activity"],
    bio: "Sweet smells and warm ovens make a house a home. I spend my days baking healthy artisanal breads and playing doubles pickleball. I'm searching for an active partner who enjoys foodie adventures, travel, and honest, warm connections.",
    avatarEmoji: "🥐",
    avatarColor: "from-amber-100 to-orange-200 text-amber-950",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=80",
    height: 68, // 5'8"
    weight: 145,
    gender: "Female",
    latitude: 45.5152,
    longitude: -122.6784
  },
  {
    id: "takashi",
    name: "Takashi",
    age: 63,
    location: "Kyoto, Japan",
    occupation: "Retired Traditional Architect & Bonsai Master",
    relationshipGoal: "Slow Life & Shared Journeys",
    chapterTheme: "Stone Gardens & Pine Trimming",
    interests: ["Bonsai Cultivation", "Watercolor Painting", "Classical Music", "Tea Ceremonies", "Cozy Bookstores"],
    values: ["Harmony", "Quiet discipline", "Minimalism", "Respect for nature"],
    bio: "After decades of restoring wooden temples in Kyoto, I now spend my time cultivating miniature bonsai pines and practicing traditional calligraphy. I cherish structured silence, hot sencha tea, and gentle bike rides. Seeking an open-hearted companion to enjoy the quiet transition of seasons, poetry, and occasional travels.",
    avatarEmoji: "🪴",
    avatarColor: "from-emerald-100 to-teal-100 text-teal-900",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
    height: 66, // 5'6"
    weight: 140,
    gender: "Male",
    latitude: 35.0116,
    longitude: 135.7681
  },
  {
    id: "sanjay",
    name: "Sanjay",
    age: 65,
    location: "Mumbai, India",
    occupation: "Retired Ayurvedic Wellness Consultant",
    relationshipGoal: "Spiritual Connection & Shared Living",
    chapterTheme: "Warm Spices & Mindful Mornings",
    interests: ["Yoga & Stretching", "Acoustic Folk", "Biographies", "Organic Gardening", "Museum Strolls"],
    values: ["Mindfulness", "Inner peace", "Holistic health", "Compassion"],
    bio: "Having spent forty years helping people find inner balance, I am enjoying my own quiet days of morning pranayama, nurturing my terrace herb garden, and reading biographies. I listen to classical instrumental tunes and enjoy making spiced chai from scratch. Seeking a kind, conscious partner for walks, travels, and soulful conversations.",
    avatarEmoji: "🧘‍♂️",
    avatarColor: "from-amber-100 to-yellow-250 text-amber-950",
    photoUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=1000&q=80",
    height: 69, // 5'9"
    weight: 158,
    gender: "Male",
    latitude: 19.0760,
    longitude: 72.8777
  },
  {
    id: "leo",
    name: "Leo",
    age: 42,
    location: "Napa Valley, CA",
    occupation: "Creative Director & Organic Vineyard Owner",
    relationshipGoal: "Vibrant Romance & Cozy Adventures",
    chapterTheme: "Rich Soil & Sunset Melodies",
    interests: ["Wine Making", "Coastal Hiking", "Independent Film", "Wood-fired Cooking", "Acoustic Folk", "Yoga & Stretching", "Watercolor Painting"],
    values: ["Authenticity", "Creative growth", "Spontaneity", "Empathy"],
    bio: "A former city designer who decided to swap concrete for vineyards. I love making small-batch wines, coastal trail runs, and the crackle of vintage vinyl records on a rainy evening. Seeking a warm-hearted companion to co-write our life's next beautiful chapter of spontaneous road trips and quiet sunset laughter.",
    avatarEmoji: "🍇",
    avatarColor: "from-purple-200 to-indigo-300 text-indigo-900",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80",
    height: 71, // 5'11"
    weight: 172,
    gender: "Male",
    latitude: 38.2975,
    longitude: -122.2869
  },
  {
    id: "elena",
    name: "Elena",
    age: 38,
    location: "Austin, TX",
    occupation: "Pediatrician & Amateur Cellist",
    relationshipGoal: "Deep Connection & Creative Rhythms",
    chapterTheme: "Cello Melodies & Morning Mists",
    interests: ["Classical Music", "Kayaking", "Baking Sourdough", "Cozy Bookstores", "Coastal Hiking", "Bicycle Rides", "Yoga & Stretching"],
    values: ["Compassion", "Lifelong learning", "Elegance", "Kindness"],
    bio: "Caring for children keeps me young, and playing the cello keeps my soul grounded. When I'm not at the clinic, I'm baking artisan sourdough, browsing old bookstores, or kayaking on the lake. Looking for a kind, active partner who appreciates good laughs, classic music, and quiet morning conversations.",
    avatarEmoji: "🎻",
    avatarColor: "from-rose-100 to-orange-200 text-rose-900",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
    height: 66, // 5'6"
    weight: 128,
    gender: "Female",
    latitude: 30.2672,
    longitude: -97.7431
  },
  {
    id: "marcus",
    name: "Marcus",
    age: 48,
    location: "Seattle, WA",
    occupation: "Architectural Restorer & Furniture Crafter",
    relationshipGoal: "Honest Companionship & Shared Exploring",
    chapterTheme: "Handcrafted Timbers & Coffee Aromas",
    interests: ["Woodworking", "Sailing", "Biographies", "Cozy Bookstores", "Fly Fishing", "Classical Music"],
    values: ["Patience", "Integrity", "Simplicity", "Honor"],
    bio: "I restore historic timber homes and craft custom wood furniture. I start my mornings roasting fresh coffee beans and love getting lost in Pacific Northwest forests. Seeking an honest, thoughtful partner for hiking, sailing, and sharing simple moments by a crackling fireplace.",
    avatarEmoji: "🪵",
    avatarColor: "from-amber-200 to-stone-300 text-stone-900",
    photoUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80",
    height: 73, // 6'1"
    weight: 190,
    gender: "Male",
    latitude: 47.6062,
    longitude: -122.3321
  },
  {
    id: "liwei",
    name: "Li Wei",
    age: 61,
    location: "Kuala Lumpur, MY",
    occupation: "Heritage Architect & Nanyang Coffee Roaster",
    relationshipGoal: "Companion for Travel & Sincere Chats",
    chapterTheme: "Old Shophouses & Roasted Arabica",
    interests: ["Architecture Sketching", "Afternoon Tea", "Tai Chi", "Cozy Bookstores", "Museum Strolls"],
    values: ["Cultural preservation", "Integrity", "Gentle patience", "Sincere friendship"],
    bio: "I spent my career restoring pre-war shophouses across Malaysia. Now, I roast artisan Nanyang Liberica beans, sketch tropical greenery, and enjoy quiet mornings with a good book. Looking for a warm-hearted companion to travel regionally, share street food discoveries, and appreciate life's peaceful moments.",
    avatarEmoji: "☕",
    avatarColor: "from-amber-100 to-amber-250 text-amber-950",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80",
    height: 68, // 5'8"
    weight: 154,
    gender: "Male",
    latitude: 3.1390,
    longitude: 101.6869
  },
  {
    id: "ananya",
    name: "Ananya",
    age: 57,
    location: "Bangkok, TH",
    occupation: "Traditional Silk Artisan & Botanical Cook",
    relationshipGoal: "Companionship & Shared Outings",
    chapterTheme: "River Morning Mists & Woven Silks",
    interests: ["Organic Gardening", "Watercolor Painting", "Gourmet Dessert Baking", "Yoga & Stretching", "Farmers' Markets"],
    values: ["Kindness", "Creativity", "Mindful living", "Joyful laughter"],
    bio: "Weaving Thai silk by hand taught me to appreciate the beauty of each single thread coming together. I love cooking fragrant herb-infused dishes for close friends, painting lotus ponds at dawn, and walking through floral markets. Seeking a sincere, kind partner for genuine smiles and shared weekend adventures.",
    avatarEmoji: "🌺",
    avatarColor: "from-rose-100 to-orange-100 text-rose-950",
    photoUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1000&q=80",
    height: 63, // 5'3"
    weight: 121,
    gender: "Female",
    latitude: 13.7563,
    longitude: 100.5018
  }
];

export const INITIAL_MATCH_PROFILES: Profile[] = RAW_INITIAL_MATCH_PROFILES.map((p) => ({
  ...p,
  voiceGreeting: COMPANION_VOICE_GREETINGS[p.id] || {
    profileId: p.id,
    durationSeconds: 16,
    transcript: `Hello there, I'm ${p.name}. In this chapter of my life, I treasure simple warmth, good company, and heartfelt conversation. I hope to hear your story soon.`,
    accent: "Warm & Reflective"
  }
}));

/**
 * Augments list of profiles with calculated distances based on the user's GPS coordinates.
 * Robustly falls back to preset companion coordinates or city presets if latitude/longitude is not present on the profile record.
 */
export function augmentProfilesWithDistance(
  profiles: Profile[],
  userLat?: number,
  userLon?: number
): Profile[] {
  if (userLat === undefined || userLon === undefined) {
    return profiles;
  }

  return profiles.map((p) => {
    let pLat = p.latitude;
    let pLon = p.longitude;

    if (pLat === undefined || pLon === undefined) {
      const match = INITIAL_MATCH_PROFILES.find((m) => m.id === p.id);
      if (match && match.latitude !== undefined && match.longitude !== undefined) {
        pLat = match.latitude;
        pLon = match.longitude;
      } else if (p.location) {
        const cityMatch = POPULAR_CITY_PRESETS.find((c) =>
          p.location.toLowerCase().includes(c.name.toLowerCase()) ||
          c.name.toLowerCase().includes(p.location.toLowerCase())
        );
        if (cityMatch) {
          pLat = cityMatch.latitude;
          pLon = cityMatch.longitude;
        }
      }
    }

    if (pLat !== undefined && pLon !== undefined) {
      const { miles, km } = calculateDistance(userLat, userLon, pLat, pLon);
      return {
        ...p,
        latitude: pLat,
        longitude: pLon,
        distanceMiles: miles,
        distanceKm: km
      };
    }
    return p;
  });
}

export interface CompanionFilterCriteria {
  searchGender?: string;
  searchAgeMin?: number;
  searchAgeMax?: number;
  searchHeightMin?: number;
  searchHeightMax?: number;
  searchWeightMin?: number;
  searchWeightMax?: number;
  searchSelectedHobbies?: string[];
  searchKeyword?: string;
  compassFocus?: "all" | "intellectual" | "sports" | "cozy" | "romance" | string;
  onlyShowNearby?: boolean;
  nearbyRadiusMiles?: number;
  sortByDistance?: boolean;
}

export function filterCompanions(
  matches: Profile[],
  criteria: CompanionFilterCriteria
): Profile[] {
  const {
    searchGender,
    searchAgeMin = 35,
    searchAgeMax = 85,
    searchHeightMin = 54,
    searchHeightMax = 78,
    searchWeightMin = 100,
    searchWeightMax = 240,
    searchSelectedHobbies = [],
    searchKeyword = "",
    compassFocus = "all",
    onlyShowNearby = false,
    nearbyRadiusMiles = 50,
    sortByDistance = false
  } = criteria;

  let filtered = matches.filter((companion) => {
    // 1. Gender Filter
    if (searchGender && searchGender !== "All" && companion.gender !== searchGender) {
      return false;
    }

    // 2. Proximity / Nearby filter
    if (onlyShowNearby && nearbyRadiusMiles && nearbyRadiusMiles > 0) {
      if (companion.distanceMiles === undefined || companion.distanceMiles > nearbyRadiusMiles) {
        return false;
      }
    }

    // 3. Compass Focus Filter
    if (compassFocus && compassFocus !== "all") {
      const interestsStr = (companion.interests || []).join(" ").toLowerCase();
      const bioStr = (companion.bio || "").toLowerCase();
      const combined = `${interestsStr} ${bioStr}`;

      if (compassFocus === "intellectual") {
        const keywords = ["classical", "museum", "history", "philosophy", "reading", "art", "bookstore", "astronomy", "architecture", "writing", "chess", "theatre"];
        if (!keywords.some((k) => combined.includes(k))) return false;
      } else if (compassFocus === "sports") {
        const keywords = ["trail", "hiking", "pickleball", "tennis", "cycling", "sailing", "ballroom", "dancing", "golf", "swim", "walking", "outdoor"];
        if (!keywords.some((k) => combined.includes(k))) return false;
      } else if (compassFocus === "cozy") {
        const keywords = ["tea", "baking", "sourdough", "gardening", "bookstore", "vinyl", "coffee", "pottery", "cooking", "jazz", "cozy", "quiet"];
        if (!keywords.some((k) => combined.includes(k))) return false;
      } else if (compassFocus === "romance") {
        const keywords = ["travel", "sunset", "dinner", "romance", "wine", "poetry", "photography", "road trip", "strolls", "heart"];
        if (!keywords.some((k) => combined.includes(k))) return false;
      }
    }

    // 3. Keyword Search
    if (searchKeyword && searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase().trim();
      const nameMatch = companion.name?.toLowerCase().includes(keyword) || false;
      const bioMatch = companion.bio?.toLowerCase().includes(keyword) || false;
      const occMatch = companion.occupation?.toLowerCase().includes(keyword) || false;
      const locMatch = companion.location?.toLowerCase().includes(keyword) || false;
      const themeMatch = companion.chapterTheme?.toLowerCase().includes(keyword) || false;
      const goalMatch = companion.relationshipGoal?.toLowerCase().includes(keyword) || false;
      const interestMatch = companion.interests?.some((i) => i.toLowerCase().includes(keyword)) || false;
      const valueMatch = companion.values?.some((v) => v.toLowerCase().includes(keyword)) || false;

      if (!nameMatch && !bioMatch && !occMatch && !locMatch && !themeMatch && !goalMatch && !interestMatch && !valueMatch) {
        return false;
      }
    }

    // 4. Age Filter
    if (companion.age !== undefined) {
      if (searchAgeMin !== undefined && companion.age < searchAgeMin) return false;
      if (searchAgeMax !== undefined && companion.age > searchAgeMax) return false;
    }

    // 5. Height Filter
    if (companion.height && companion.height > 0) {
      if (searchHeightMin !== undefined && companion.height < searchHeightMin) return false;
      if (searchHeightMax !== undefined && companion.height > searchHeightMax) return false;
    }

    // 6. Weight Filter
    if (companion.weight && companion.weight > 0) {
      if (searchWeightMin !== undefined && companion.weight < searchWeightMin) return false;
      if (searchWeightMax !== undefined && companion.weight > searchWeightMax) return false;
    }

    // 7. Selected Hobbies
    if (searchSelectedHobbies && searchSelectedHobbies.length > 0) {
      const matchesAny = searchSelectedHobbies.some((selectedHobby) => {
        const normSelected = selectedHobby.toLowerCase().trim();
        const tokens = normSelected.split(/&|,|\/|\s+and\s+/).map((t) => t.trim()).filter((t) => t.length >= 3);

        return companion.interests?.some((userInterest) => {
          const normInterest = userInterest.toLowerCase().trim();
          if (normInterest.includes(normSelected) || normSelected.includes(normInterest)) return true;
          return tokens.some((token) => normInterest.includes(token) || token.includes(normInterest));
        });
      });
      if (!matchesAny) return false;
    }

    return true;
  });

  if (sortByDistance) {
    filtered.sort((a, b) => {
      const distA = a.distanceMiles !== undefined ? a.distanceMiles : 999999;
      const distB = b.distanceMiles !== undefined ? b.distanceMiles : 999999;
      return distA - distB;
    });
  }

  return filtered;
}

