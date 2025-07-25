// Real Airport Data from AirportDataJSON.json
// Transformed for Airport Assistant Application

export const realAirportData = [
  {
    id: "atl_popeyes",
    name: "Popeyes Louisiana Kitchen",
    category: "restaurants",
    type: "Fast Food",
    airport: "Hartsfield-Jackson Atlanta International Airport (ATL)",
    terminal: "South Terminal",
    location: "Concourse A, Gate A15",
    hours: "5:00 AM - 10:00 PM",
    contact: "(404) 123-4567",
    rating: 4.2,
    priceRange: "$",
    description: "Famous Louisiana-style fried chicken and seafood with bold, authentic flavors.",
    specialties: ["Fried Chicken", "Seafood", "Cajun Spices"],
    takeaway: true,
    delivery: false,
    wifi: true,
    orderUrl: "https://www.popeyes.com/store-locator"
  },
  {
    id: "atl_chickfila",
    name: "Chick-fil-A",
    category: "restaurants",
    type: "Fast Food",
    airport: "Hartsfield-Jackson Atlanta International Airport (ATL)",
    terminal: "Concourse B",
    location: "Near Gate B20",
    hours: "5:30 AM - 9:30 PM",
    contact: "(404) 234-5678",
    rating: 4.5,
    priceRange: "$",
    description: "Original chicken sandwich with exceptional customer service and quality ingredients.",
    specialties: ["Chicken Sandwich", "Nuggets", "Milkshakes"],
    takeaway: true,
    delivery: false,
    wifi: true,
    mobile_order: true,
    orderUrl: "https://www.chick-fil-a.com"
  },
  {
    id: "atl_oneflewsouth",
    name: "One Flew South",
    category: "restaurants",
    type: "Fine Dining",
    airport: "Hartsfield-Jackson Atlanta International Airport (ATL)",
    terminal: "International Terminal (Concourse E)",
    location: "Near Gate E33",
    hours: "11:00 AM - 9:00 PM",
    contact: "(404) 345-6789",
    rating: 4.7,
    priceRange: "$$$",
    description: "Upscale sushi and contemporary American cuisine in an elegant airport setting.",
    specialties: ["Sushi", "Contemporary American", "Craft Cocktails"],
    takeaway: false,
    delivery: false,
    wifi: true,
    reservations: true,
    orderUrl: "https://oneflewsouth.com"
  },
  {
    id: "atl_starbucks",
    name: "Starbucks",
    category: "cafeterias",
    type: "Café/Coffee Shop",
    airport: "Hartsfield-Jackson Atlanta International Airport (ATL)",
    terminal: "Multiple Terminals",
    location: "Various locations, e.g., Concourse T, Gate T8",
    hours: "24/7 (select locations)",
    contact: "(404) 456-7890",
    rating: 4.3,
    priceRange: "$$",
    description: "World's leading coffee company offering premium coffee, tea, and light refreshments.",
    specialties: ["Coffee", "Espresso", "Pastries", "Sandwiches"],
    takeaway: true,
    delivery: false,
    wifi: true,
    mobile_order: true,
    orderUrl: "https://www.starbucks.com"
  },
  {
    id: "atl_dutyfree",
    name: "Duty Free Americas",
    category: "giftShops",
    type: "Duty-Free",
    airport: "Hartsfield-Jackson Atlanta International Airport (ATL)",
    terminal: "International Terminal (Concourse F)",
    location: "Main Hall",
    hours: "6:00 AM - 11:00 PM",
    contact: "(404) 567-8901",
    rating: 4.1,
    priceRange: "$$",
    description: "Tax-free shopping for international travelers featuring luxury goods, spirits, and souvenirs.",
    products: ["Perfumes", "Liquor", "Chocolates", "Souvenirs", "Electronics"],
    delivery: true,
    wifi: true,
    orderUrl: "https://www.dutyfreeamericas.com"
  },
  {
    id: "atl_books",
    name: "Books & More",
    category: "giftShops",
    type: "Books & News",
    airport: "Hartsfield-Jackson Atlanta International Airport (ATL)",
    terminal: "Concourse D",
    location: "Near Gate D25",
    hours: "6:00 AM - 9:00 PM",
    contact: "(404) 678-9012",
    rating: 4.0,
    priceRange: "$",
    description: "Complete bookstore with bestsellers, magazines, travel guides, and reading accessories.",
    products: ["Books", "Magazines", "Travel Guides", "Reading Accessories"],
    delivery: false,
    wifi: true,
    orderUrl: "https://example.com/books"
  },
  {
    id: "atl_travelers",
    name: "Traveler's Express",
    category: "clothingStores",
    type: "Travel Essentials",
    airport: "Hartsfield-Jackson Atlanta International Airport (ATL)",
    terminal: "Concourse C",
    location: "Near Gate C12",
    hours: "4:00 AM - 11:00 PM",
    contact: "(404) 789-0123",
    rating: 3.9,
    priceRange: "$$",
    description: "Essential travel items, clothing, and accessories for the modern traveler.",
    products: ["Travel Accessories", "Clothing", "Electronics", "Personal Care"],
    delivery: false,
    wifi: true,
    orderUrl: "https://example.com/travelers"
  },
  {
    id: "atl_xpresspa",
    name: "XpresSpa",
    category: "lounges",
    type: "Spas/Wellness",
    airport: "Hartsfield-Jackson Atlanta International Airport (ATL)",
    terminal: "Concourse A",
    location: "Near Gate A18",
    hours: "7:00 AM - 9:00 PM",
    contact: "(404) 890-1234",
    rating: 4.4,
    priceRange: "$$$",
    description: "Premium spa services including massages, facials, and wellness treatments.",
    amenities: ["Massages", "Facials", "Manicures", "Relaxation"],
    accessFee: "$50-150 per service",
    wifi: true,
    reservations: true,
    orderUrl: "https://www.xpresspa.com"
  },
  {
    id: "atl_deltaclub",
    name: "Delta Sky Club",
    category: "lounges",
    type: "Lounges (Airline/Priority Pass)",
    airport: "Hartsfield-Jackson Atlanta International Airport (ATL)",
    terminal: "Multiple Terminals",
    location: "Concourse T, A, B, C, D, E, F",
    hours: "5:00 AM - Last Departure",
    contact: "(800) 221-1212",
    rating: 4.6,
    priceRange: "$$$",
    description: "Premium airline lounge with complimentary food, drinks, and business amenities.",
    amenities: ["Complimentary Food", "Premium Bar", "WiFi", "Business Center", "Showers"],
    accessFee: "$59 day pass or membership",
    wifi: true,
    orderUrl: "https://www.delta.com/skyclub"
  },
  {
    id: "dfw_shakeshack",
    name: "Shake Shack",
    category: "restaurants",
    type: "Casual Dining",
    airport: "Dallas/Fort Worth International Airport (DFW)",
    terminal: "Terminal C",
    location: "Near Gate C6",
    hours: "6:00 AM - 10:00 PM",
    contact: "(972) 111-2222",
    rating: 4.4,
    priceRange: "$$",
    description: "Modern day 'roadside' burger stand serving premium burgers, fries, and shakes.",
    specialties: ["ShackBurger", "Crinkle Fries", "Shakes", "Concrete Desserts"],
    takeaway: true,
    delivery: false,
    wifi: true,
    mobile_order: true,
    orderUrl: "https://www.shakeshack.com"
  },
  {
    id: "dfw_texasmarket",
    name: "Texas Marketplace",
    category: "giftShops",
    type: "Souvenirs/Gifts",
    airport: "Dallas/Fort Worth International Airport (DFW)",
    terminal: "Terminal A",
    location: "Pre-security",
    hours: "5:00 AM - 9:00 PM",
    contact: "(972) 222-3333",
    rating: 4.2,
    priceRange: "$$",
    description: "Authentic Texas souvenirs, local crafts, and regional specialty items.",
    products: ["Texas Souvenirs", "Local Crafts", "Western Wear", "Local Foods"],
    delivery: false,
    wifi: true,
    orderUrl: "https://example.com/texas-marketplace"
  },
  {
    id: "dfw_inmotion",
    name: "InMotion Entertainment",
    category: "giftShops",
    type: "Electronics",
    airport: "Dallas/Fort Worth International Airport (DFW)",
    terminal: "Terminal D",
    location: "Near Gate D15",
    hours: "6:00 AM - 10:00 PM",
    contact: "(972) 333-4444",
    rating: 4.1,
    priceRange: "$$",
    description: "Latest electronics, headphones, chargers, and entertainment accessories.",
    products: ["Headphones", "Chargers", "Tablets", "Accessories", "Gaming"],
    delivery: false,
    wifi: true,
    orderUrl: "https://www.inmotionusa.com"
  },
  {
    id: "dfw_centurion",
    name: "Centurion Lounge",
    category: "lounges",
    type: "Lounges (Airline/Priority Pass)",
    airport: "Dallas/Fort Worth International Airport (DFW)",
    terminal: "Terminal D",
    location: "Near Gate D12",
    hours: "5:30 AM - 10:00 PM",
    contact: "(800) 525-3355",
    rating: 4.8,
    priceRange: "$$$",
    description: "Premium lounge with chef-prepared cuisine, craft cocktails, and luxury amenities.",
    amenities: ["Chef Cuisine", "Craft Cocktails", "Spa Services", "Business Center", "Family Room"],
    accessFee: "AmEx Platinum or $75 day pass",
    wifi: true,
    reservations: false,
    orderUrl: "https://www.americanexpress.com/centurion-lounges"
  },
  {
    id: "den_newbelgium",
    name: "New Belgium Brewing Co.",
    category: "restaurants",
    type: "Bar/Pub",
    airport: "Denver International Airport (DEN)",
    terminal: "Concourse B",
    location: "Near Gate B30",
    hours: "7:00 AM - 9:00 PM",
    contact: "(303) 111-2222",
    rating: 4.5,
    priceRange: "$$",
    description: "Craft brewery offering locally-brewed beers and pub-style food.",
    specialties: ["Craft Beer", "Pub Food", "Local Brews"],
    takeaway: true,
    delivery: false,
    wifi: true,
    orderUrl: "https://www.newbelgium.com"
  },
  {
    id: "den_tattered",
    name: "Tattered Cover Bookstore",
    category: "giftShops",
    type: "Books & News",
    airport: "Denver International Airport (DEN)",
    terminal: "Concourse A",
    location: "Center Atrium",
    hours: "5:00 AM - 10:00 PM",
    contact: "(303) 222-3333",
    rating: 4.3,
    priceRange: "$",
    description: "Independent bookstore with curated selection of books, magazines, and local authors.",
    products: ["Books", "Local Authors", "Magazines", "Colorado Guides"],
    delivery: false,
    wifi: true,
    orderUrl: "https://www.tatteredcover.com"
  },
  {
    id: "ord_tortas",
    name: "Tortas Frontera by Rick Bayless",
    category: "restaurants",
    type: "Casual Dining",
    airport: "Chicago O'Hare International Airport (ORD)",
    terminal: "Terminal 1",
    location: "Concourse B, Gate B10",
    hours: "6:00 AM - 9:00 PM",
    contact: "(773) 111-2222",
    rating: 4.6,
    priceRange: "$$",
    description: "Authentic Mexican tortas and fresh ingredients by celebrity chef Rick Bayless.",
    specialties: ["Mexican Tortas", "Fresh Salsas", "Authentic Mexican"],
    takeaway: true,
    delivery: false,
    wifi: true,
    orderUrl: "https://www.tortasfrontera.com"
  },
  {
    id: "lax_urth",
    name: "Urth Caffé",
    category: "cafeterias",
    type: "Café/Coffee Shop",
    airport: "Los Angeles International Airport (LAX)",
    terminal: "Terminal 1",
    location: "Pre-security",
    hours: "5:00 AM - 9:00 PM",
    contact: "(310) 111-2222",
    rating: 4.4,
    priceRange: "$$",
    description: "Organic coffee and tea with fresh, healthy food options and California-style cuisine.",
    specialties: ["Organic Coffee", "Healthy Food", "Fresh Juices", "Salads"],
    takeaway: true,
    delivery: false,
    wifi: true,
    mobile_order: true,
    orderUrl: "https://www.urthcaffe.com"
  },
  {
    id: "lax_pfchangs",
    name: "P.F. Chang's",
    category: "restaurants",
    type: "Casual Dining",
    airport: "Los Angeles International Airport (LAX)",
    terminal: "Terminal 4",
    location: "Near Gate 48",
    hours: "10:00 AM - 10:00 PM",
    contact: "(310) 777-8888",
    rating: 4.3,
    priceRange: "$$",
    description: "Asian-inspired cuisine with fresh ingredients and bold flavors.",
    specialties: ["Asian Fusion", "Lettuce Wraps", "Orange Chicken", "Pad Thai"],
    takeaway: true,
    delivery: false,
    wifi: true,
    reservations: true,
    orderUrl: "https://www.pfchangs.com"
  },
  {
    id: "sea_pikeplace",
    name: "Pike Place Market Food Hall",
    category: "restaurants",
    type: "Casual Dining",
    airport: "Seattle-Tacoma International Airport (SEA)",
    terminal: "Central Terminal",
    location: "Pre-security",
    hours: "5:00 AM - 9:00 PM",
    contact: "(206) 111-2222",
    rating: 4.5,
    priceRange: "$$",
    description: "Famous Seattle market featuring local vendors, fresh seafood, and Pacific Northwest specialties.",
    specialties: ["Fresh Seafood", "Local Vendors", "Pacific Northwest", "Artisan Foods"],
    takeaway: true,
    delivery: false,
    wifi: true,
    orderUrl: "https://pikeplacemarket.org"
  },
  {
    id: "sea_starbucks",
    name: "Starbucks Reserve",
    category: "cafeterias",
    type: "Café/Coffee Shop",
    airport: "Seattle-Tacoma International Airport (SEA)",
    terminal: "Central Terminal",
    location: "Near Checkpoint 3",
    hours: "5:00 AM - 10:00 PM",
    contact: "(206) 555-6666",
    rating: 4.7,
    priceRange: "$$",
    description: "Premium Starbucks experience with rare coffee varieties and artisanal brewing methods.",
    specialties: ["Reserve Coffee", "Artisanal Brewing", "Premium Pastries"],
    takeaway: true,
    delivery: false,
    wifi: true,
    mobile_order: true,
    orderUrl: "https://www.starbucksreserve.com"
  },
  {
    id: "jfk_shakeshack",
    name: "Shake Shack",
    category: "restaurants",
    type: "Casual Dining",
    airport: "John F. Kennedy International Airport (JFK)",
    terminal: "Terminal 4",
    location: "Near Gate B37",
    hours: "6:00 AM - 11:00 PM",
    contact: "(718) 111-2222",
    rating: 4.4,
    priceRange: "$$",
    description: "Modern day 'roadside' burger stand serving premium burgers, fries, and shakes.",
    specialties: ["ShackBurger", "Crinkle Fries", "Shakes", "Concrete Desserts"],
    takeaway: true,
    delivery: false,
    wifi: true,
    mobile_order: true,
    orderUrl: "https://www.shakeshack.com"
  },
  {
    id: "bos_legal",
    name: "Legal Sea Foods",
    category: "restaurants",
    type: "Casual Dining",
    airport: "Boston Logan International Airport (BOS)",
    terminal: "Terminal A, B, C, E",
    location: "Various locations",
    hours: "10:00 AM - 9:00 PM",
    contact: "(617) 111-2222",
    rating: 4.5,
    priceRange: "$$$",
    description: "Boston's famous seafood restaurant serving fresh fish and New England classics.",
    specialties: ["Fresh Seafood", "Clam Chowder", "Lobster Roll", "Fish & Chips"],
    takeaway: true,
    delivery: false,
    wifi: true,
    reservations: true,
    orderUrl: "https://www.legalseafoods.com"
  }
];

// Organize data by categories for easy access
export const organizedAirportData = {
  restaurants: realAirportData.filter(item => item.category === 'restaurants'),
  cafeterias: realAirportData.filter(item => item.category === 'cafeterias'),
  giftShops: realAirportData.filter(item => item.category === 'giftShops'),
  clothingStores: realAirportData.filter(item => item.category === 'clothingStores'),
  lounges: realAirportData.filter(item => item.category === 'lounges'),
  services: realAirportData.filter(item => item.category === 'services'),
  electronics: realAirportData.filter(item => item.category === 'electronics'),
  healthBeauty: realAirportData.filter(item => item.category === 'healthBeauty'),
  specialtyRetail: realAirportData.filter(item => item.category === 'specialtyRetail')
};

// Search function for real airport data
export const searchRealAirportServices = (query, dataset = realAirportData) => {
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.trim().length > 0);
  console.log('🔍 Searching for:', searchTerms.join(', '), 'in', dataset.length, 'services');
  
  const results = dataset.filter(service => {
    // Convert service data to searchable text
    const searchableText = [
      service.name,
      service.type,
      service.category,
      service.description,
      service.airport,
      service.terminal,
      service.location,
      ...(service.specialties || []),
      ...(service.products || []),
      ...(service.amenities || [])
    ].join(' ').toLowerCase();
    
    // Check if any search term matches
    return searchTerms.some(term => searchableText.includes(term));
  });
  
  console.log('📋 Found', results.length, 'matching services');
  return results;
};

// Get services by category
export const getRealServicesByCategory = (category) => {
  return organizedAirportData[category] || [];
};

// Generate contextual responses for real data
export const generateRealContextualResponse = (query, results) => {
  const lowerQuery = query.toLowerCase();
  const resultCount = results.length;
  
  if (resultCount === 0) {
    return `Sorry, I couldn't find any services matching "${query}". Try searching for "coffee", "food", "shopping", "lounge", or specific airport codes like "ATL", "DFW", "LAX".`;
  }
  
  // Group results by airport for better organization
  const airportGroups = results.reduce((groups, service) => {
    const airportCode = service.airport.match(/\(([^)]+)\)/)?.[1] || service.airport;
    if (!groups[airportCode]) groups[airportCode] = [];
    groups[airportCode].push(service);
    return groups;
  }, {});
  
  const airportCount = Object.keys(airportGroups).length;
  
  let response = `Found ${resultCount} service${resultCount === 1 ? '' : 's'} matching "${query}"`;
  
  if (airportCount > 1) {
    response += ` across ${airportCount} airports`;
  }
  
  response += ":";
  
  // Add specific context based on query type
  if (lowerQuery.includes('coffee') || lowerQuery.includes('starbucks')) {
    response += "\n\n☕ **Coffee Options Found:**";
  } else if (lowerQuery.includes('food') || lowerQuery.includes('restaurant') || lowerQuery.includes('dining')) {
    response += "\n\n🍽️ **Dining Options Found:**";
  } else if (lowerQuery.includes('shop') || lowerQuery.includes('gift') || lowerQuery.includes('buy')) {
    response += "\n\n🛍️ **Shopping Options Found:**";
  } else if (lowerQuery.includes('lounge') || lowerQuery.includes('relax')) {
    response += "\n\n🛋️ **Lounge Access Found:**";
  } else {
    response += "\n\n✈️ **Airport Services Found:**";
  }
  
  return response;
};

// Enhanced conversational responses
export const conversationalResponses = {
  greetings: [
    "Hello! Welcome to the airport! 🛫 I'm your Airport Assistant. How can I help you today?",
    "Hi there! 👋 Ready for your journey? I can help you find restaurants, coffee, shops, and more!",
    "Welcome! ✈️ I'm here to make your airport experience smoother. What are you looking for?",
    "Good day, traveler! 🌟 I know all the best spots in the airport. What can I help you find?"
  ],
  
  coffee_responses: [
    "☕ Perfect timing for coffee! Here are some great options:",
    "Need that caffeine boost? ☕ I've got you covered:",
    "Coffee coming right up! ☕ Here are the best spots:",
    "Great choice! ☕ These coffee places will definitely wake you up:"
  ],
  
  food_responses: [
    "🍽️ Hungry? Excellent! Here are some delicious dining options:",
    "Time to eat! 🍴 These restaurants will satisfy your cravings:",
    "Food is the best part of travel! 🍽️ Check out these options:",
    "Perfect timing for a meal! 🍴 Here's what's available:"
  ],
  
  shopping_responses: [
    "🛍️ Ready for some shopping? Here are the best stores:",
    "Shopping time! 🛒 These places have exactly what you need:",
    "Love to shop? 🛍️ You'll find great options here:",
    "Let's go shopping! 🛒 Here are the must-visit stores:"
  ],
  
  lounge_responses: [
    "✨ Need to relax? These lounges offer the perfect escape:",
    "Time to unwind! 🛋️ Here are some comfortable lounge options:",
    "Looking for comfort? ✨ These lounges will take care of you:",
    "Ready to relax in style? 🛋️ Check out these amazing lounges:"
  ],
  
  no_results: [
    "🤔 Hmm, I couldn't find exactly what you're looking for. Could you try being more specific?",
    "😅 I'm not sure about that one. Try asking for restaurants, coffee, shopping, or lounges!",
    "🧐 That's a tricky one! Can you rephrase? I'm great with food, drinks, shopping, and relaxation spots!",
    "🤷‍♂️ I didn't quite catch that. Ask me about dining, coffee, shopping, or lounge access!"
  ],
  
  help_suggestions: [
    "Here are some things you can ask me:",
    "Try these popular requests:",
    "Some ideas for what I can help with:",
    "Popular ways to ask me for help:"
  ],
  
  specific_requests: {
    "quick_bite": "🏃‍♂️ Need something quick? Here are fast food options:",
    "healthy_food": "🥗 Looking for healthy options? These places focus on fresh, nutritious meals:",
    "breakfast": "🌅 Good morning! Here are great breakfast spots:",
    "late_night": "🌙 Up late? These places are still serving:",
    "family_friendly": "👨‍👩‍👧‍👦 Traveling with family? These spots are perfect for everyone:",
    "business_meeting": "💼 Need a professional setting? These locations are ideal for business:",
    "vegetarian": "🌱 Looking for vegetarian options? These places have great plant-based meals:",
    "luxury": "💎 Want something special? These premium options will impress:",
    "budget": "💰 Watching your budget? These affordable options are still delicious:",
    "wifi": "📶 Need internet access? These spots offer free WiFi:"
  }
};

// Get random response from array
export const getRandomResponse = (responseArray) => {
  return responseArray[Math.floor(Math.random() * responseArray.length)];
};

// Airport layout and directions
export const airportLayout = {
  terminals: {
    "A": {
      gates: "A1-A30",
      services: ["Starbucks", "Popeyes Louisiana Kitchen", "XpresSpa", "Delta Sky Club"],
      amenities: ["Free WiFi", "Charging Stations", "Family Restrooms", "Information Desk"]
    },
    "B": {
      gates: "B1-B35", 
      services: ["Chick-fil-A", "Starbucks", "Delta Sky Club", "American Airlines Admirals Club"],
      amenities: ["Free WiFi", "Charging Stations", "Business Center", "Baggage Storage"]
    },
    "C": {
      gates: "C1-C25",
      services: ["Traveler's Express", "Starbucks", "Delta Sky Club"],
      amenities: ["Free WiFi", "Charging Stations", "Kids Play Area", "Medical Center"]
    }
  },
  
  transportation: {
    between_terminals: "Free shuttle service every 5 minutes",
    parking: "Short-term and long-term parking available",
    public_transport: "Metro station connected to Terminal A"
  }
};

// Help and FAQ responses
export const helpResponses = {
  general_help: [
    "I can help you find restaurants, coffee shops, gift stores, clothing shops, and lounges throughout the airport!",
    "Just tell me what you need! I know about dining, shopping, relaxation spots, and airport services.",
    "I'm your personal airport guide! Ask me about food, drinks, shopping, or places to relax.",
    "Need directions? Want food recommendations? Looking for shops? I've got all the airport intel!"
  ],
  
  examples: [
    "• 'I need coffee' - Find coffee shops",
    "• 'Show me restaurants' - Browse dining options", 
    "• 'Where can I buy gifts?' - Find gift shops",
    "• 'I need a place to work' - Find business lounges",
    "• 'Quick food near gate B15' - Location-specific search",
    "• 'Vegetarian restaurants' - Dietary-specific options"
  ]
};

// Airport location data with coordinates for location detection
export const airportLocations = [
  {
    code: "ATL",
    name: "Hartsfield-Jackson Atlanta International Airport",
    city: "Atlanta",
    state: "GA",
    country: "USA",
    coordinates: { lat: 33.6407, lng: -84.4277 },
    timezone: "America/New_York"
  },
  {
    code: "DFW", 
    name: "Dallas/Fort Worth International Airport",
    city: "Dallas",
    state: "TX", 
    country: "USA",
    coordinates: { lat: 32.8998, lng: -97.0403 },
    timezone: "America/Chicago"
  },
  {
    code: "DEN",
    name: "Denver International Airport", 
    city: "Denver",
    state: "CO",
    country: "USA",
    coordinates: { lat: 39.8617, lng: -104.6737 },
    timezone: "America/Denver"
  },
  {
    code: "ORD",
    name: "Chicago O'Hare International Airport",
    city: "Chicago", 
    state: "IL",
    country: "USA",
    coordinates: { lat: 41.9742, lng: -87.9073 },
    timezone: "America/Chicago"
  },
  {
    code: "LAX",
    name: "Los Angeles International Airport",
    city: "Los Angeles",
    state: "CA", 
    country: "USA",
    coordinates: { lat: 33.9425, lng: -118.4081 },
    timezone: "America/Los_Angeles"
  },
  {
    code: "SEA",
    name: "Seattle-Tacoma International Airport",
    city: "Seattle",
    state: "WA",
    country: "USA", 
    coordinates: { lat: 47.4502, lng: -122.3088 },
    timezone: "America/Los_Angeles"
  },
  {
    code: "JFK",
    name: "John F. Kennedy International Airport",
    city: "New York",
    state: "NY",
    country: "USA",
    coordinates: { lat: 40.6413, lng: -73.7781 },
    timezone: "America/New_York"
  },
  {
    code: "BOS", 
    name: "Boston Logan International Airport",
    city: "Boston",
    state: "MA",
    country: "USA",
    coordinates: { lat: 42.3656, lng: -71.0096 },
    timezone: "America/New_York"
  },
  {
    code: "LAS",
    name: "McCarran International Airport",
    city: "Las Vegas", 
    state: "NV",
    country: "USA",
    coordinates: { lat: 36.0840, lng: -115.1537 },
    timezone: "America/Los_Angeles"
  },
  {
    code: "MIA",
    name: "Miami International Airport",
    city: "Miami",
    state: "FL", 
    country: "USA",
    coordinates: { lat: 25.7959, lng: -80.2870 },
    timezone: "America/New_York"
  },
  {
    code: "SFO",
    name: "San Francisco International Airport", 
    city: "San Francisco",
    state: "CA",
    country: "USA",
    coordinates: { lat: 37.6213, lng: -122.3790 },
    timezone: "America/Los_Angeles"
  },
  {
    code: "LGA",
    name: "LaGuardia Airport",
    city: "New York", 
    state: "NY",
    country: "USA",
    coordinates: { lat: 40.7769, lng: -73.8740 },
    timezone: "America/New_York"
  }
];

// Location services utilities
export const getAvailableAirports = () => {
  return airportLocations.map(airport => ({
    code: airport.code,
    name: airport.name,
    city: airport.city,
    state: airport.state,
    displayName: `${airport.code} - ${airport.city}, ${airport.state}`,
    fullName: `${airport.name} (${airport.code})`
  }));
};

export const findNearestAirport = (userLat, userLng) => {
  let nearestAirport = null;
  let minDistance = Infinity;

  airportLocations.forEach(airport => {
    const distance = calculateDistance(
      userLat, userLng, 
      airport.coordinates.lat, airport.coordinates.lng
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      nearestAirport = {
        ...airport,
        distance: Math.round(distance * 100) / 100 // Round to 2 decimal places
      };
    }
  });

  return nearestAirport;
};

export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 3959; // Radius of Earth in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance;
};

export const getAirportByCode = (code) => {
  return airportLocations.find(airport => 
    airport.code.toLowerCase() === code.toLowerCase()
  );
};

export const filterServicesByAirport = (airportCode) => {
  if (!airportCode) return realAirportData;
  console.log('🏢 Filtering services for airport:', airportCode);
  
  const filtered = realAirportData.filter(service => 
    service.airport.includes(`(${airportCode.toUpperCase()})`)
  );
  
  console.log('📊 Filtered services:', filtered.length, 'found for', airportCode);
  return filtered;
};

// Get facilities available at a specific airport
export const getAirportFacilities = (airportCode) => {
  if (!airportCode) return [];
  
  const airportServices = filterServicesByAirport(airportCode);
  const facilities = new Map();
  
  airportServices.forEach(service => {
    const category = service.category;
    const type = service.type;
    
    if (!facilities.has(category)) {
      facilities.set(category, {
        category: category,
        types: new Set(),
        count: 0,
        icon: getCategoryIcon(category),
        displayName: getCategoryDisplayName(category)
      });
    }
    
    const facility = facilities.get(category);
    facility.types.add(type);
    facility.count++;
  });
  
  return Array.from(facilities.values()).map(facility => ({
    ...facility,
    types: Array.from(facility.types)
  }));
};

// Get icon for facility category
export const getCategoryIcon = (category) => {
  const icons = {
    'restaurants': '🍽️',
    'cafeterias': '☕',
    'giftShops': '🛍️',
    'clothingStores': '👕',
    'lounges': '🛋️',
    'electronics': '📱',
    'pharmacy': '💊',
    'atm': '💰',
    'services': '🔧',
    'transportation': '🚗',
    'parking': '🅿️'
  };
  return icons[category] || '🏢';
};

// Get display name for facility category
export const getCategoryDisplayName = (category) => {
  const names = {
    'restaurants': 'Restaurants',
    'cafeterias': 'Coffee & Cafés',
    'giftShops': 'Shopping',
    'clothingStores': 'Clothing',
    'lounges': 'Lounges',
    'electronics': 'Electronics',
    'pharmacy': 'Pharmacy',
    'atm': 'ATM',
    'services': 'Services',
    'transportation': 'Transportation',
    'parking': 'Parking'
  };
  return names[category] || category;
};

// Get quick stats for an airport
export const getAirportStats = (airportCode) => {
  if (!airportCode) return null;
  
  const services = filterServicesByAirport(airportCode);
  const facilities = getAirportFacilities(airportCode);
  
  return {
    totalServices: services.length,
    totalCategories: facilities.length,
    restaurants: services.filter(s => s.category === 'restaurants').length,
    cafes: services.filter(s => s.category === 'cafeterias').length,
    shops: services.filter(s => s.category === 'giftShops' || s.category === 'clothingStores').length,
    lounges: services.filter(s => s.category === 'lounges').length,
    facilities: facilities
  };
};

export default {
  realAirportData,
  organizedAirportData,
  searchRealAirportServices,
  getRealServicesByCategory,
  generateRealContextualResponse,
  conversationalResponses,
  getRandomResponse,
  airportLayout,
  helpResponses,
  airportLocations,
  getAvailableAirports,
  findNearestAirport,
  calculateDistance,
  getAirportByCode,
  filterServicesByAirport,
  getAirportFacilities,
  getCategoryIcon,
  getCategoryDisplayName,
  getAirportStats
};
