/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Profile } from "../types";
import { calculateDistance } from "../lib/locationService";

export const INITIAL_MATCH_PROFILES: Profile[] = [
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
    height: 73, // 6'1"
    weight: 190,
    gender: "Male",
    latitude: 47.6062,
    longitude: -122.3321
  }
];

/**
 * Augments list of profiles with calculated distances based on the user's GPS coordinates
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
    if (p.latitude !== undefined && p.longitude !== undefined) {
      const { miles, km } = calculateDistance(userLat, userLon, p.latitude, p.longitude);
      return {
        ...p,
        distanceMiles: miles,
        distanceKm: km
      };
    }
    return p;
  });
}
