// Enhanced Airport Assistant Data with Conversational Responses
export const airportData = {
  restaurants: [
    {
      id: 1,
      name: "Sky Diner",
      category: "restaurants",
      type: "American Cuisine",
      location: "Terminal A, Gate A15",
      hours: "6:00 AM - 10:00 PM",
      rating: 4.2,
      priceRange: "$15-25",
      orderUrl: "https://skydiner.airport.com/order",
      menu: ["Classic Burgers", "Grilled Steaks", "Caesar Salad", "All-Day Breakfast", "Craft Beer"],
      image: "/images/sky-diner.jpg",
      description: "Classic American dining with a spectacular runway view. Perfect for a relaxing meal before your flight.",
      specialties: ["Signature Sky Burger", "24-hour Breakfast"],
      waitTime: "10-15 minutes",
      delivery: true,
      takeaway: true
    },
    {
      id: 2,
      name: "Milano Pizza Express",
      category: "restaurants",
      type: "Italian",
      location: "Terminal B, Gate B22",
      hours: "7:00 AM - 11:00 PM",
      rating: 4.5,
      priceRange: "$12-20",
      orderUrl: "https://milano.airport.com/order",
      menu: ["Margherita Pizza", "Carbonara Pasta", "Espresso", "Tiramisu", "Antipasto"],
      image: "/images/milano-pizza.jpg",
      description: "Authentic Italian flavors made fresh daily. Our wood-fired pizzas are a traveler favorite!",
      specialties: ["Wood-fired Pizza", "Fresh Pasta"],
      waitTime: "8-12 minutes",
      delivery: true,
      takeaway: true
    },
    {
      id: 3,
      name: "Sushi Express",
      category: "restaurants",
      type: "Japanese",
      location: "Terminal C, Gate C8",
      hours: "8:00 AM - 9:00 PM",
      rating: 4.3,
      priceRange: "$18-30",
      orderUrl: "https://sushiexpress.airport.com/order",
      menu: ["Salmon Sashimi", "California Roll", "Chicken Teriyaki", "Miso Soup", "Green Tea"],
      image: "/images/sushi-express.jpg",
      description: "Fresh sushi and authentic Japanese cuisine prepared by master chefs.",
      specialties: ["Fresh Sashimi", "Traditional Ramen"],
      waitTime: "12-18 minutes",
      delivery: false,
      takeaway: true
    },
    {
      id: 4,
      name: "Taco Terminal",
      category: "restaurants",
      type: "Mexican",
      location: "Terminal A, Food Court",
      hours: "10:00 AM - 9:00 PM",
      rating: 4.1,
      priceRange: "$8-15",
      orderUrl: "https://tacoterminal.airport.com/order",
      menu: ["Fish Tacos", "Chicken Quesadilla", "Guacamole", "Nachos", "Margaritas"],
      image: "/images/taco-terminal.jpg",
      description: "Fresh Mexican street food with bold flavors and quick service.",
      specialties: ["Fish Tacos", "Fresh Guacamole"],
      waitTime: "5-8 minutes",
      delivery: true,
      takeaway: true
    },
    {
      id: 5,
      name: "Bangkok Bites",
      category: "restaurants",
      type: "Thai",
      location: "Terminal C, Gate C20",
      hours: "11:00 AM - 10:00 PM",
      rating: 4.4,
      priceRange: "$14-22",
      orderUrl: "https://bangkokbites.airport.com/order",
      menu: ["Pad Thai", "Green Curry", "Tom Yum Soup", "Spring Rolls", "Thai Iced Tea"],
      image: "/images/bangkok-bites.jpg",
      description: "Authentic Thai cuisine with the perfect balance of sweet, sour, salty, and spicy.",
      specialties: ["Pad Thai", "Authentic Curries"],
      waitTime: "10-15 minutes",
      delivery: true,
      takeaway: true
    }
  ],

  cafeterias: [
    {
      id: 6,
      name: "Coffee & Co",
      category: "cafeterias",
      type: "Coffee Shop",
      location: "Terminal A, Main Concourse",
      hours: "5:00 AM - 11:00 PM",
      rating: 4.1,
      priceRange: "$3-8",
      orderUrl: "https://coffeeandco.airport.com/order",
      menu: ["Espresso", "Cappuccino", "Latte", "Croissants", "Breakfast Sandwiches"],
      image: "/images/coffee-co.jpg",
      description: "Premium coffee and light bites to fuel your journey. Free WiFi available!",
      specialties: ["Single-origin Coffee", "Fresh Pastries"],
      waitTime: "3-5 minutes",
      delivery: false,
      takeaway: true,
      wifi: true,
      outlets: true
    },
    {
      id: 7,
      name: "Terminal Brew",
      category: "cafeterias",
      type: "Cafe",
      location: "Terminal B, Gate B5",
      hours: "6:00 AM - 10:00 PM",
      rating: 4.0,
      priceRange: "$4-10",
      orderUrl: "https://terminalbrew.airport.com/order",
      menu: ["Cold Brew", "Herbal Tea", "Smoothies", "Blueberry Muffins", "Avocado Toast"],
      image: "/images/terminal-brew.jpg",
      description: "Quick coffee and healthy breakfast options for travelers on the go.",
      specialties: ["Cold Brew", "Healthy Smoothies"],
      waitTime: "2-4 minutes",
      delivery: false,
      takeaway: true,
      wifi: true,
      outlets: false
    },
    {
      id: 8,
      name: "Starbucks Airport",
      category: "cafeterias",
      type: "Coffee Chain",
      location: "Terminal C, Gate C15",
      hours: "5:30 AM - 11:30 PM",
      rating: 4.4,
      priceRange: "$4-12",
      orderUrl: "https://starbucks.airport.com/order",
      menu: ["Frappuccino", "Pike Place Roast", "Breakfast Wraps", "Cake Pops", "Protein Boxes"],
      image: "/images/starbucks.jpg",
      description: "Your favorite Starbucks drinks and snacks, now at the airport!",
      specialties: ["Frappuccinos", "Seasonal Drinks"],
      waitTime: "4-7 minutes",
      delivery: false,
      takeaway: true,
      wifi: true,
      outlets: true,
      mobile_order: true
    },
    {
      id: 9,
      name: "Juice Junction",
      category: "cafeterias",
      type: "Juice Bar",
      location: "Terminal B, Health Zone",
      hours: "7:00 AM - 8:00 PM",
      rating: 4.2,
      priceRange: "$6-14",
      orderUrl: "https://juicejunction.airport.com/order",
      menu: ["Green Smoothies", "Fresh Juices", "Acai Bowls", "Protein Shakes", "Energy Bars"],
      image: "/images/juice-junction.jpg",
      description: "Fresh, healthy options to keep you energized during travel.",
      specialties: ["Cold-pressed Juices", "Superfood Bowls"],
      waitTime: "5-8 minutes",
      delivery: false,
      takeaway: true,
      wifi: false,
      outlets: false
    }
  ],

  giftShops: [
    {
      id: 10,
      name: "Sky Souvenirs",
      category: "giftShops",
      type: "Souvenir Shop",
      location: "Terminal A, Main Hall",
      hours: "7:00 AM - 10:00 PM",
      rating: 4.0,
      priceRange: "$5-50",
      orderUrl: "https://skysouvenirs.airport.com/shop",
      products: ["City T-shirts", "Airplane Keychains", "Coffee Mugs", "Local Crafts", "Postcards", "Snow Globes"],
      image: "/images/sky-souvenirs.jpg",
      description: "Local souvenirs and travel essentials. Perfect for last-minute gifts!",
      specialties: ["Local Artisan Items", "City-themed Merchandise"],
      delivery: false,
      shipping: true
    },
    {
      id: 11,
      name: "Travel Treasures",
      category: "giftShops",
      type: "Gift Store",
      location: "Terminal B, Gate B18",
      hours: "8:00 AM - 9:00 PM",
      rating: 4.2,
      priceRange: "$15-200",
      orderUrl: "https://traveltreasures.airport.com/shop",
      products: ["Designer Jewelry", "Premium Perfumes", "Luxury Chocolates", "Travel Books", "Electronics", "Watches"],
      image: "/images/travel-treasures.jpg",
      description: "Premium gifts and luxury items for the discerning traveler.",
      specialties: ["Luxury Goods", "Premium Electronics"],
      delivery: false,
      shipping: true
    },
    {
      id: 12,
      name: "Duty Free Plus",
      category: "giftShops",
      type: "Duty Free",
      location: "Terminal C, International Gates",
      hours: "24/7",
      rating: 4.3,
      priceRange: "$20-500",
      orderUrl: "https://dutyfreeplus.airport.com/shop",
      products: ["Premium Spirits", "Fine Wines", "Tobacco Products", "Luxury Cosmetics", "Designer Watches", "Sunglasses"],
      image: "/images/duty-free.jpg",
      description: "Tax-free shopping for international travelers. Save up to 30% on luxury items!",
      specialties: ["Tax-free Savings", "Luxury Brands"],
      delivery: false,
      shipping: false,
      international_only: true
    },
    {
      id: 13,
      name: "Tech Hub",
      category: "giftShops",
      type: "Electronics Store",
      location: "Terminal A, Tech Corner",
      hours: "8:00 AM - 10:00 PM",
      rating: 4.1,
      priceRange: "$10-300",
      orderUrl: "https://techhub.airport.com/shop",
      products: ["Phone Chargers", "Headphones", "Power Banks", "Travel Adapters", "Tablets", "Cameras"],
      image: "/images/tech-hub.jpg",
      description: "Essential electronics and travel accessories for the modern traveler.",
      specialties: ["Travel Electronics", "Emergency Chargers"],
      delivery: false,
      shipping: true
    }
  ],

  clothing: [
    {
      id: 14,
      name: "Airport Fashion",
      category: "clothing",
      type: "Fashion Store",
      location: "Terminal A, Shopping Area",
      hours: "9:00 AM - 8:00 PM",
      rating: 4.1,
      priceRange: "$25-150",
      orderUrl: "https://airportfashion.airport.com/shop",
      products: ["Business Suits", "Casual Wear", "Accessories", "Dress Shoes", "Handbags", "Belts"],
      image: "/images/airport-fashion.jpg",
      description: "Professional and casual clothing for business travelers and tourists alike.",
      specialties: ["Business Attire", "Professional Accessories"],
      delivery: false,
      shipping: true,
      alterations: true
    },
    {
      id: 15,
      name: "Travel Style",
      category: "clothing",
      type: "Apparel",
      location: "Terminal B, Level 2",
      hours: "10:00 AM - 7:00 PM",
      rating: 3.9,
      priceRange: "$20-100",
      orderUrl: "https://travelstyle.airport.com/shop",
      products: ["Comfortable Jeans", "Travel Hoodies", "Lightweight Jackets", "Sneakers", "Travel Pillows", "Eye Masks"],
      image: "/images/travel-style.jpg",
      description: "Comfort and style for your journey. Featuring wrinkle-free and travel-friendly clothing.",
      specialties: ["Travel-friendly Fabrics", "Comfort Wear"],
      delivery: false,
      shipping: true,
      alterations: false
    },
    {
      id: 16,
      name: "Athletic Gear",
      category: "clothing",
      type: "Sportswear",
      location: "Terminal C, Fitness Zone",
      hours: "9:00 AM - 8:00 PM",
      rating: 4.3,
      priceRange: "$30-200",
      orderUrl: "https://athleticgear.airport.com/shop",
      products: ["Running Shoes", "Workout Clothes", "Sports Bags", "Water Bottles", "Fitness Trackers", "Yoga Mats"],
      image: "/images/athletic-gear.jpg",
      description: "High-quality athletic wear and fitness accessories for active travelers.",
      specialties: ["Performance Wear", "Travel Fitness Gear"],
      delivery: false,
      shipping: true,
      alterations: false
    }
  ],

  lounges: [
    {
      id: 17,
      name: "Sky Club Lounge",
      category: "lounges",
      type: "Premium Lounge",
      location: "Terminal A, Level 3",
      hours: "5:00 AM - 11:00 PM",
      rating: 4.7,
      priceRange: "$45 day pass",
      orderUrl: "https://skyclublounge.airport.com/access",
      amenities: ["Free High-Speed WiFi", "Complimentary Gourmet Food", "Premium Showers", "Quiet Work Zones", "Business Center", "Concierge Service"],
      accessFee: "$45",
      image: "/images/sky-club.jpg",
      description: "Premium lounge with exceptional amenities and personalized service. Perfect for business travelers.",
      specialties: ["Gourmet Dining", "Premium Service"],
      capacity: 200,
      reservations: true,
      membership_available: true
    },
    {
      id: 18,
      name: "Executive Lounge",
      category: "lounges",
      type: "Business Lounge",
      location: "Terminal B, Gate B30",
      hours: "6:00 AM - 10:00 PM",
      rating: 4.5,
      priceRange: "$35 day pass",
      orderUrl: "https://executivelounge.airport.com/access",
      amenities: ["Free Premium Drinks", "Private Workstations", "Phone Booths", "International Magazines", "Light Snacks", "Meeting Rooms"],
      accessFee: "$35",
      image: "/images/executive-lounge.jpg",
      description: "Ideal for business travelers needing a productive space before their flight.",
      specialties: ["Business Facilities", "Meeting Spaces"],
      capacity: 150,
      reservations: false,
      membership_available: true
    },
    {
      id: 19,
      name: "Comfort Zone",
      category: "lounges",
      type: "Family Lounge",
      location: "Terminal C, Family Area",
      hours: "7:00 AM - 9:00 PM",
      rating: 4.2,
      priceRange: "$25 day pass",
      orderUrl: "https://comfortzone.airport.com/access",
      amenities: ["Kids Play Area", "Family Rest Rooms", "Baby Changing Stations", "Free Snacks", "Children's Entertainment", "Nursing Areas"],
      accessFee: "$25",
      image: "/images/comfort-zone.jpg",
      description: "Family-friendly lounge designed for travelers with children. Safe and comfortable environment.",
      specialties: ["Child-friendly Facilities", "Family Services"],
      capacity: 100,
      reservations: true,
      membership_available: false
    },
    {
      id: 20,
      name: "Zen Retreat",
      category: "lounges",
      type: "Wellness Lounge",
      location: "Terminal B, Wellness Wing",
      hours: "6:00 AM - 10:00 PM",
      rating: 4.6,
      priceRange: "$40 day pass",
      orderUrl: "https://zenretreat.airport.com/access",
      amenities: ["Meditation Rooms", "Massage Chairs", "Aromatherapy", "Healthy Food Options", "Yoga Mats", "Relaxation Pods"],
      accessFee: "$40",
      image: "/images/zen-retreat.jpg",
      description: "Wellness-focused lounge for travelers seeking relaxation and rejuvenation.",
      specialties: ["Wellness Services", "Relaxation Therapy"],
      capacity: 80,
      reservations: true,
      membership_available: true
    }
  ]
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

// Enhanced search keywords mapping
export const searchKeywords = {
  // Food & Drink
  coffee: ["cafeterias"],
  starbucks: ["cafeterias"],
  cafe: ["cafeterias"],
  espresso: ["cafeterias"],
  latte: ["cafeterias"],
  cappuccino: ["cafeterias"],
  juice: ["cafeterias"],
  smoothie: ["cafeterias"],
  
  food: ["restaurants", "cafeterias"],
  eat: ["restaurants", "cafeterias"],
  hungry: ["restaurants", "cafeterias"],
  restaurant: ["restaurants"],
  dining: ["restaurants"],
  meal: ["restaurants"],
  breakfast: ["restaurants", "cafeterias"],
  lunch: ["restaurants"],
  dinner: ["restaurants"],
  
  pizza: ["restaurants"],
  sushi: ["restaurants"],
  italian: ["restaurants"],
  japanese: ["restaurants"],
  american: ["restaurants"],
  mexican: ["restaurants"],
  thai: ["restaurants"],
  chinese: ["restaurants"],
  burger: ["restaurants"],
  taco: ["restaurants"],
  
  // Shopping
  shopping: ["giftShops", "clothing"],
  shop: ["giftShops", "clothing"],
  store: ["giftShops", "clothing"],
  buy: ["giftShops", "clothing"],
  gift: ["giftShops"],
  souvenir: ["giftShops"],
  clothes: ["clothing"],
  clothing: ["clothing"],
  fashion: ["clothing"],
  shirt: ["clothing"],
  shoes: ["clothing"],
  bag: ["clothing", "giftShops"],
  electronics: ["giftShops"],
  tech: ["giftShops"],
  charger: ["giftShops"],
  duty: ["giftShops"],
  
  // Lounges & Comfort
  lounge: ["lounges"],
  relax: ["lounges"],
  rest: ["lounges"],
  wifi: ["lounges", "cafeterias"],
  business: ["lounges", "clothing"],
  meeting: ["lounges"],
  work: ["lounges"],
  family: ["lounges"],
  kids: ["lounges"],
  shower: ["lounges"],
  quiet: ["lounges"],
  
  // Special requests
  quick: ["cafeterias"],
  fast: ["cafeterias"],
  healthy: ["cafeterias", "restaurants"],
  vegetarian: ["restaurants"],
  vegan: ["restaurants"],
  luxury: ["lounges", "giftShops"],
  premium: ["lounges", "giftShops"],
  cheap: ["cafeterias"],
  budget: ["cafeterias"],
  expensive: ["restaurants", "lounges", "giftShops"]
};

// Enhanced search function with better natural language processing
export const searchServices = (query) => {
  const allServices = getAllServices();
  const lowerQuery = query.toLowerCase();
  
  // Direct keyword matching
  const matchedCategories = new Set();
  Object.keys(searchKeywords).forEach(keyword => {
    if (lowerQuery.includes(keyword)) {
      searchKeywords[keyword].forEach(cat => matchedCategories.add(cat));
    }
  });
  
  // Filter by categories or search in names/descriptions
  const results = allServices.filter(service => {
    return matchedCategories.has(service.category) ||
           service.name.toLowerCase().includes(lowerQuery) ||
           service.description.toLowerCase().includes(lowerQuery) ||
           service.type.toLowerCase().includes(lowerQuery) ||
           (service.menu && service.menu.some(item => item.toLowerCase().includes(lowerQuery))) ||
           (service.products && service.products.some(item => item.toLowerCase().includes(lowerQuery))) ||
           (service.amenities && service.amenities.some(item => item.toLowerCase().includes(lowerQuery))) ||
           (service.specialties && service.specialties.some(item => item.toLowerCase().includes(lowerQuery)));
  });
  
  // Sort by relevance (exact matches first, then partial matches)
  return results.sort((a, b) => {
    const aExact = a.name.toLowerCase().includes(lowerQuery) ? 1 : 0;
    const bExact = b.name.toLowerCase().includes(lowerQuery) ? 1 : 0;
    return bExact - aExact || b.rating - a.rating;
  });
};

// Get all services
export const getAllServices = () => {
  return [
    ...airportData.restaurants,
    ...airportData.cafeterias,
    ...airportData.giftShops,
    ...airportData.clothing,
    ...airportData.lounges
  ];
};

// Get services by category
export const getServicesByCategory = (category) => {
  return airportData[category] || [];
};

// Get random response from array
export const getRandomResponse = (responseArray) => {
  return responseArray[Math.floor(Math.random() * responseArray.length)];
};

// Generate contextual response based on query
export const generateContextualResponse = (query, results) => {
  const lowerQuery = query.toLowerCase();
  
  if (results.length === 0) {
    return getRandomResponse(conversationalResponses.no_results);
  }
  
  // Specific responses based on query content
  if (lowerQuery.includes('coffee') || lowerQuery.includes('caffeine')) {
    return getRandomResponse(conversationalResponses.coffee_responses);
  }
  
  if (lowerQuery.includes('food') || lowerQuery.includes('eat') || lowerQuery.includes('hungry') || lowerQuery.includes('restaurant')) {
    return getRandomResponse(conversationalResponses.food_responses);
  }
  
  if (lowerQuery.includes('shop') || lowerQuery.includes('buy') || lowerQuery.includes('gift')) {
    return getRandomResponse(conversationalResponses.shopping_responses);
  }
  
  if (lowerQuery.includes('lounge') || lowerQuery.includes('relax') || lowerQuery.includes('rest')) {
    return getRandomResponse(conversationalResponses.lounge_responses);
  }
  
  // Check for specific request types
  for (const [key, response] of Object.entries(conversationalResponses.specific_requests)) {
    if (lowerQuery.includes(key.replace('_', ' ')) || lowerQuery.includes(key)) {
      return response;
    }
  }
  
  // Default response
  return `Great! I found ${results.length} option${results.length === 1 ? '' : 's'} for you:`;
};

// Airport layout and directions
export const airportLayout = {
  terminals: {
    "A": {
      gates: "A1-A30",
      services: ["Sky Diner", "Coffee & Co", "Sky Souvenirs", "Airport Fashion", "Sky Club Lounge", "Tech Hub"],
      amenities: ["Free WiFi", "Charging Stations", "Family Restrooms", "Information Desk"]
    },
    "B": {
      gates: "B1-B35", 
      services: ["Milano Pizza Express", "Terminal Brew", "Travel Treasures", "Travel Style", "Executive Lounge", "Juice Junction", "Zen Retreat"],
      amenities: ["Free WiFi", "Charging Stations", "Business Center", "Baggage Storage"]
    },
    "C": {
      gates: "C1-C25",
      services: ["Sushi Express", "Starbucks Airport", "Duty Free Plus", "Athletic Gear", "Comfort Zone", "Bangkok Bites"],
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
