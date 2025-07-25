// Sample conversations and dummy interaction data for testing
export const sampleConversations = [
  {
    id: 1,
    title: "Coffee Hunt",
    messages: [
      { sender: "user", text: "I really need coffee before my 8am flight" },
      { sender: "bot", text: "☕ Perfect timing for coffee! Here are some great options:\n\n**1. Coffee & Co** ⭐ 4.1/5\n📍 Terminal A, Main Concourse\n🕒 Open: 5:00 AM - 11:00 PM\n💰 Price Range: $3-8\n✨ Specialties: Single-origin Coffee, Fresh Pastries\n⏱️ Wait Time: 3-5 minutes\n📶 Free WiFi • 🥡 Takeaway\n📝 Premium coffee and light bites to fuel your journey. Free WiFi available!\n\n**2. Starbucks Airport** ⭐ 4.4/5\n📍 Terminal C, Gate C15\n🕒 Open: 5:30 AM - 11:30 PM\n💰 Price Range: $4-12\n✨ Specialties: Frappuccinos, Seasonal Drinks\n⏱️ Wait Time: 4-7 minutes\n📶 Free WiFi • 🥡 Takeaway • 📱 Mobile Order\n📝 Your favorite Starbucks drinks and snacks, now at the airport!" }
    ],
    timestamp: "2024-01-15T07:30:00Z"
  },
  {
    id: 2,
    title: "Quick Lunch",
    messages: [
      { sender: "user", text: "I have 30 minutes between flights, need something quick to eat" },
      { sender: "bot", text: "🏃‍♂️ Need something quick? Here are fast food options:\n\n**1. Taco Terminal** ⭐ 4.1/5\n📍 Terminal A, Food Court\n🕒 Open: 10:00 AM - 9:00 PM\n💰 Price Range: $8-15\n✨ Specialties: Fish Tacos, Fresh Guacamole\n⏱️ Wait Time: 5-8 minutes\n🚚 Delivery Available • 🥡 Takeaway\n📝 Fresh Mexican street food with bold flavors and quick service.\n\n💡 Pro tip: For quick meals, try the food court in Terminal A. For sit-down dining, check out Sky Diner!" }
    ],
    timestamp: "2024-01-15T12:45:00Z"
  },
  {
    id: 3,
    title: "Gift Shopping",
    messages: [
      { sender: "user", text: "I need to buy souvenirs for my kids" },
      { sender: "bot", text: "🛍️ Ready for some shopping? Here are the best stores:\n\n**1. Sky Souvenirs** ⭐ 4.0/5\n📍 Terminal A, Main Hall\n🕒 Open: 7:00 AM - 10:00 PM\n💰 Price Range: $5-50\n✨ Specialties: Local Artisan Items, City-themed Merchandise\n🛍️ Products: City T-shirts, Airplane Keychains, Coffee Mugs...\n📝 Local souvenirs and travel essentials. Perfect for last-minute gifts!\n\n**Want to narrow it down?** Ask about specific terminals, gate areas, or age preferences!" },
      { sender: "user", text: "What about something for teenagers?" },
      { sender: "bot", text: "Great question! For teenagers, I'd recommend:\n\n**Tech Hub** - They have cool electronics like headphones, phone accessories, and power banks that teens love!\n**Travel Treasures** - Premium items like jewelry and designer accessories.\n**Athletic Gear** - Trendy sportswear and fitness accessories.\n\nTech Hub is probably your best bet for teen-friendly gifts! 📱✨" }
    ],
    timestamp: "2024-01-15T16:20:00Z"
  }
];

// Dummy user preferences and history
export const userPreferences = {
  favoriteCategories: ["cafeterias", "lounges"],
  dietaryRestrictions: ["vegetarian"],
  preferredTerminals: ["Terminal A", "Terminal B"],
  budgetRange: "medium",
  frequentlyAsked: [
    "coffee near gate A15",
    "vegetarian restaurants",
    "business lounge with WiFi",
    "quick food options"
  ]
};

// Analytics data for admin/demo purposes
export const analyticsData = {
  popularSearches: [
    { query: "coffee", count: 1250 },
    { query: "restaurants", count: 890 },
    { query: "WiFi", count: 670 },
    { query: "lounge", count: 550 },
    { query: "gift shop", count: 445 },
    { query: "bathroom", count: 380 },
    { query: "starbucks", count: 320 },
    { query: "vegetarian", count: 285 },
    { query: "charging station", count: 255 },
    { query: "duty free", count: 220 }
  ],
  
  categoryPopularity: {
    cafeterias: 35,
    restaurants: 28,
    lounges: 18,
    giftShops: 12,
    clothing: 7
  },
  
  peakHours: [
    { hour: 6, searches: 120 },
    { hour: 7, searches: 340 },
    { hour: 8, searches: 450 },
    { hour: 9, searches: 380 },
    { hour: 12, searches: 420 },
    { hour: 15, searches: 290 },
    { hour: 18, searches: 380 },
    { hour: 21, searches: 180 }
  ]
};

// Common user intents and responses
export const userIntents = {
  location_specific: {
    patterns: ["near gate", "in terminal", "close to", "around"],
    response: "I can help you find services near specific gates or terminals! Just tell me which gate or terminal you're interested in."
  },
  
  dietary_preferences: {
    patterns: ["vegetarian", "vegan", "gluten free", "halal", "kosher", "healthy"],
    response: "I'll make sure to highlight options that match your dietary preferences!"
  },
  
  time_sensitive: {
    patterns: ["quick", "fast", "hurry", "minutes", "rushing", "late"],
    response: "No problem! I'll prioritize quick service options with minimal wait times."
  },
  
  budget_conscious: {
    patterns: ["cheap", "affordable", "budget", "inexpensive", "save money"],
    response: "I'll focus on budget-friendly options that give you great value!"
  },
  
  premium_seeking: {
    patterns: ["luxury", "premium", "best", "high-end", "exclusive"],
    response: "Looking for the finest options? I'll show you our premium services!"
  }
};

// Error handling and fallback responses
export const fallbackResponses = {
  technical_error: "Oops! Something went wrong on my end. Please try again, or ask me about restaurants, coffee, shopping, or lounges!",
  
  unclear_request: [
    "I'm not quite sure what you're looking for. Could you be more specific?",
    "Can you rephrase that? I'm great with questions about food, drinks, shopping, and airport services!",
    "Hmm, I didn't catch that. Try asking about specific services like 'coffee', 'restaurants', or 'gift shops'!"
  ],
  
  no_services_available: "Unfortunately, I don't see any services matching your request in that area. Would you like me to suggest similar options nearby?",
  
  maintenance_mode: "Some services might be temporarily unavailable. Let me show you what's currently open and accessible!"
};

// Tips and helpful information
export const helpfulTips = [
  "💡 Most coffee shops open early (5:30-6:00 AM) for early morning flights!",
  "💡 Duty Free stores offer significant savings on luxury items for international travelers.",
  "💡 Many restaurants offer delivery to your gate for orders over $50.",
  "💡 Lounge day passes can be worth it if you have a long layover (3+ hours).",
  "💡 Terminal A has the most dining options, while Terminal C has the best shopping.",
  "💡 Free WiFi is available throughout the airport, but lounges offer faster speeds.",
  "💡 Mobile ordering is available at Starbucks and several restaurants to skip lines.",
  "💡 Family lounges in Terminal C have dedicated kids' areas and baby facilities.",
  "💡 Look for charging stations near every gate - no need to buy portable chargers!",
  "💡 The wellness lounge in Terminal B offers massage chairs and meditation rooms."
];

export default {
  sampleConversations,
  userPreferences,
  analyticsData,
  userIntents,
  fallbackResponses,
  helpfulTips
};
