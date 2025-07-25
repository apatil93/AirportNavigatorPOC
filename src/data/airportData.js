// Airport Services Data
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
      orderUrl: "https://skydiner.airport.com/order",
      menu: ["Burgers", "Steaks", "Salads", "Breakfast"],
      image: "/images/sky-diner.jpg",
      description: "Classic American dining with a view of the runway"
    },
    {
      id: 2,
      name: "Milano Pizza Express",
      category: "restaurants",
      type: "Italian",
      location: "Terminal B, Gate B22",
      hours: "7:00 AM - 11:00 PM",
      rating: 4.5,
      orderUrl: "https://milano.airport.com/order",
      menu: ["Pizza", "Pasta", "Coffee", "Desserts"],
      image: "/images/milano-pizza.jpg",
      description: "Authentic Italian flavors for travelers"
    },
    {
      id: 3,
      name: "Sushi Express",
      category: "restaurants",
      type: "Japanese",
      location: "Terminal C, Gate C8",
      hours: "8:00 AM - 9:00 PM",
      rating: 4.3,
      orderUrl: "https://sushiexpress.airport.com/order",
      menu: ["Sushi", "Ramen", "Bento", "Green Tea"],
      image: "/images/sushi-express.jpg",
      description: "Fresh sushi and Japanese cuisine"
    }
  ],

  cafeterias: [
    {
      id: 4,
      name: "Coffee & Co",
      category: "cafeterias",
      type: "Coffee Shop",
      location: "Terminal A, Main Concourse",
      hours: "5:00 AM - 11:00 PM",
      rating: 4.1,
      orderUrl: "https://coffeeandco.airport.com/order",
      menu: ["Espresso", "Cappuccino", "Latte", "Pastries", "Sandwiches"],
      image: "/images/coffee-co.jpg",
      description: "Premium coffee and light bites"
    },
    {
      id: 5,
      name: "Terminal Brew",
      category: "cafeterias",
      type: "Cafe",
      location: "Terminal B, Gate B5",
      hours: "6:00 AM - 10:00 PM",
      rating: 4.0,
      orderUrl: "https://terminalbrew.airport.com/order",
      menu: ["Coffee", "Tea", "Smoothies", "Muffins", "Bagels"],
      image: "/images/terminal-brew.jpg",
      description: "Quick coffee and breakfast on the go"
    },
    {
      id: 6,
      name: "Starbucks Airport",
      category: "cafeterias",
      type: "Coffee Chain",
      location: "Terminal C, Gate C15",
      hours: "5:30 AM - 11:30 PM",
      rating: 4.4,
      orderUrl: "https://starbucks.airport.com/order",
      menu: ["Frappuccino", "Pike Place", "Breakfast Sandwiches", "Cake Pops"],
      image: "/images/starbucks.jpg",
      description: "Your favorite Starbucks drinks and snacks"
    }
  ],

  giftShops: [
    {
      id: 7,
      name: "Sky Souvenirs",
      category: "giftShops",
      type: "Souvenir Shop",
      location: "Terminal A, Main Hall",
      hours: "7:00 AM - 10:00 PM",
      rating: 4.0,
      orderUrl: "https://skysouvenirs.airport.com/shop",
      products: ["T-shirts", "Keychains", "Mugs", "Local Crafts", "Postcards"],
      image: "/images/sky-souvenirs.jpg",
      description: "Local souvenirs and travel essentials"
    },
    {
      id: 8,
      name: "Travel Treasures",
      category: "giftShops",
      type: "Gift Store",
      location: "Terminal B, Gate B18",
      hours: "8:00 AM - 9:00 PM",
      rating: 4.2,
      orderUrl: "https://traveltreasures.airport.com/shop",
      products: ["Jewelry", "Perfumes", "Chocolates", "Books", "Electronics"],
      image: "/images/travel-treasures.jpg",
      description: "Premium gifts and luxury items"
    },
    {
      id: 9,
      name: "Duty Free Plus",
      category: "giftShops",
      type: "Duty Free",
      location: "Terminal C, International Gates",
      hours: "24/7",
      rating: 4.3,
      orderUrl: "https://dutyfreeplus.airport.com/shop",
      products: ["Alcohol", "Tobacco", "Cosmetics", "Watches", "Sunglasses"],
      image: "/images/duty-free.jpg",
      description: "Tax-free shopping for international travelers"
    }
  ],

  clothing: [
    {
      id: 10,
      name: "Airport Fashion",
      category: "clothing",
      type: "Fashion Store",
      location: "Terminal A, Shopping Area",
      hours: "9:00 AM - 8:00 PM",
      rating: 4.1,
      orderUrl: "https://airportfashion.airport.com/shop",
      products: ["Business Attire", "Casual Wear", "Accessories", "Shoes", "Bags"],
      image: "/images/airport-fashion.jpg",
      description: "Professional and casual clothing for travelers"
    },
    {
      id: 11,
      name: "Travel Style",
      category: "clothing",
      type: "Apparel",
      location: "Terminal B, Level 2",
      hours: "10:00 AM - 7:00 PM",
      rating: 3.9,
      orderUrl: "https://travelstyle.airport.com/shop",
      products: ["Travel Gear", "Comfortable Clothing", "Luggage", "Travel Pillows"],
      image: "/images/travel-style.jpg",
      description: "Comfort and style for your journey"
    }
  ],

  lounges: [
    {
      id: 12,
      name: "Sky Club Lounge",
      category: "lounges",
      type: "Premium Lounge",
      location: "Terminal A, Level 3",
      hours: "5:00 AM - 11:00 PM",
      rating: 4.7,
      orderUrl: "https://skyclublounge.airport.com/access",
      amenities: ["Free WiFi", "Complimentary Food", "Showers", "Quiet Zones", "Business Center"],
      accessFee: "$45",
      image: "/images/sky-club.jpg",
      description: "Premium lounge with excellent amenities"
    },
    {
      id: 13,
      name: "Executive Lounge",
      category: "lounges",
      type: "Business Lounge",
      location: "Terminal B, Gate B30",
      hours: "6:00 AM - 10:00 PM",
      rating: 4.5,
      orderUrl: "https://executivelounge.airport.com/access",
      amenities: ["Free Drinks", "Workstations", "Phone Booths", "Magazines", "Snacks"],
      accessFee: "$35",
      image: "/images/executive-lounge.jpg",
      description: "Perfect for business travelers"
    },
    {
      id: 14,
      name: "Comfort Zone",
      category: "lounges",
      type: "Family Lounge",
      location: "Terminal C, Family Area",
      hours: "7:00 AM - 9:00 PM",
      rating: 4.2,
      orderUrl: "https://comfortzone.airport.com/access",
      amenities: ["Kids Play Area", "Family Rooms", "Baby Changing", "Free Snacks", "Entertainment"],
      accessFee: "$25",
      image: "/images/comfort-zone.jpg",
      description: "Family-friendly lounge with kids facilities"
    }
  ]
};

// Search keywords mapping
export const searchKeywords = {
  coffee: ["cafeterias"],
  food: ["restaurants", "cafeterias"],
  eat: ["restaurants", "cafeterias"],
  drink: ["cafeterias", "lounges"],
  shopping: ["giftShops", "clothing"],
  clothes: ["clothing"],
  gifts: ["giftShops"],
  souvenirs: ["giftShops"],
  lounge: ["lounges"],
  relax: ["lounges"],
  wifi: ["lounges"],
  business: ["lounges", "clothing"],
  family: ["lounges"],
  duty: ["giftShops"],
  alcohol: ["giftShops"],
  perfume: ["giftShops"],
  starbucks: ["cafeterias"],
  pizza: ["restaurants"],
  sushi: ["restaurants"],
  italian: ["restaurants"],
  japanese: ["restaurants"],
  american: ["restaurants"]
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

// Search function
export const searchServices = (query) => {
  const allServices = getAllServices();
  const lowerQuery = query.toLowerCase();
  
  // Direct keyword matching
  const matchedCategories = [];
  Object.keys(searchKeywords).forEach(keyword => {
    if (lowerQuery.includes(keyword)) {
      matchedCategories.push(...searchKeywords[keyword]);
    }
  });
  
  // Filter by categories or search in names/descriptions
  return allServices.filter(service => {
    return matchedCategories.includes(service.category) ||
           service.name.toLowerCase().includes(lowerQuery) ||
           service.description.toLowerCase().includes(lowerQuery) ||
           (service.menu && service.menu.some(item => item.toLowerCase().includes(lowerQuery))) ||
           (service.products && service.products.some(item => item.toLowerCase().includes(lowerQuery))) ||
           (service.amenities && service.amenities.some(item => item.toLowerCase().includes(lowerQuery)));
  });
};

// Get services by category
export const getServicesByCategory = (category) => {
  return airportData[category] || [];
};
