// Comprehensive Travel Data for Airport Assistant

export const flightData = {
  // Current/Upcoming Flights
  userFlights: [
    {
      id: "UA1234",
      airline: "United Airlines",
      flightNumber: "UA 1234",
      departure: {
        airport: "LAX",
        city: "Los Angeles",
        terminal: "7",
        gate: "A15",
        time: "08:30 AM",
        date: "2025-07-10"
      },
      arrival: {
        airport: "JFK",
        city: "New York",
        terminal: "4",
        gate: "B22",
        time: "05:15 PM",
        date: "2025-07-10"
      },
      duration: "5h 45m",
      status: "On Time",
      aircraft: "Boeing 787-9",
      seat: "12A",
      class: "Business",
      bookingReference: "ABC123",
      checkInStatus: "Completed",
      baggage: {
        checkedBags: 1,
        carryOn: 1,
        personal: 1
      }
    },
    {
      id: "DL5678",
      airline: "Delta Air Lines",
      flightNumber: "DL 5678",
      departure: {
        airport: "JFK",
        city: "New York",
        terminal: "4",
        gate: "C18",
        time: "02:45 PM",
        date: "2025-07-15"
      },
      arrival: {
        airport: "LHR",
        city: "London",
        terminal: "3",
        gate: "A12",
        time: "01:30 AM+1",
        date: "2025-07-16"
      },
      duration: "7h 45m",
      status: "Boarding",
      aircraft: "Airbus A350-900",
      seat: "8F",
      class: "Premium Economy",
      bookingReference: "DEF456",
      checkInStatus: "Available",
      baggage: {
        checkedBags: 2,
        carryOn: 1,
        personal: 1
      }
    },
    {
      id: "AA9012",
      airline: "American Airlines",
      flightNumber: "AA 9012",
      departure: {
        airport: "LHR",
        city: "London",
        terminal: "3",
        gate: "B8",
        time: "11:20 AM",
        date: "2025-07-22"
      },
      arrival: {
        airport: "LAX",
        city: "Los Angeles",
        terminal: "B",
        gate: "A25",
        time: "02:55 PM",
        date: "2025-07-22"
      },
      duration: "11h 35m",
      status: "Scheduled",
      aircraft: "Boeing 777-300ER",
      seat: "25K",
      class: "Economy",
      bookingReference: "GHI789",
      checkInStatus: "Not Available",
      baggage: {
        checkedBags: 1,
        carryOn: 1,
        personal: 1
      }
    }
  ],

  // Flight Search Results
  flightSearchResults: [
    {
      id: "search1",
      route: "LAX → SFO",
      departure: "09:15 AM",
      arrival: "10:45 AM",
      duration: "1h 30m",
      airline: "Alaska Airlines",
      flightNumber: "AS 1501",
      price: "$189",
      aircraft: "Boeing 737-800",
      class: "Economy"
    },
    {
      id: "search2", 
      route: "LAX → SEA",
      departure: "01:20 PM",
      arrival: "04:05 PM",
      duration: "2h 45m",
      airline: "Southwest Airlines",
      flightNumber: "WN 2847",
      price: "$245",
      aircraft: "Boeing 737 MAX 8",
      class: "Economy"
    },
    {
      id: "search3",
      route: "LAX → DEN",
      departure: "06:40 PM",
      arrival: "09:25 PM",
      duration: "2h 45m",
      airline: "United Airlines",
      flightNumber: "UA 3456",
      price: "$298",
      aircraft: "Airbus A320",
      class: "Economy"
    }
  ]
};

export const travelItineraries = [
  {
    id: "trip1",
    title: "Business Trip to New York",
    dates: "July 10-15, 2025",
    status: "Active",
    type: "Business",
    destinations: ["Los Angeles", "New York"],
    flights: [
      {
        segment: "Outbound",
        flightId: "UA1234",
        date: "July 10, 2025",
        route: "LAX → JFK",
        time: "8:30 AM - 5:15 PM"
      }
    ],
    hotels: [
      {
        name: "The Plaza Hotel",
        address: "768 5th Ave, New York, NY 10019",
        checkIn: "July 10, 2025 - 3:00 PM",
        checkOut: "July 15, 2025 - 11:00 AM",
        confirmationNumber: "PLZ789456"
      }
    ],
    activities: [
      {
        date: "July 11, 2025",
        time: "9:00 AM",
        activity: "Business Meeting",
        location: "Empire State Building, 34th Floor"
      },
      {
        date: "July 12, 2025",
        time: "2:00 PM",
        activity: "Client Lunch",
        location: "Le Bernardin Restaurant"
      },
      {
        date: "July 13, 2025",
        time: "10:00 AM",
        activity: "Conference",
        location: "Jacob K. Javits Convention Center"
      }
    ]
  },
  {
    id: "trip2",
    title: "European Vacation",
    dates: "July 15-30, 2025",
    status: "Upcoming",
    type: "Leisure",
    destinations: ["New York", "London", "Paris", "Rome"],
    flights: [
      {
        segment: "Transatlantic",
        flightId: "DL5678",
        date: "July 15, 2025",
        route: "JFK → LHR",
        time: "2:45 PM - 1:30 AM+1"
      }
    ],
    hotels: [
      {
        name: "The Langham London",
        address: "1C Portland Pl, London W1B 1JA, UK",
        checkIn: "July 16, 2025 - 2:00 PM",
        checkOut: "July 20, 2025 - 12:00 PM",
        confirmationNumber: "LNG123789"
      },
      {
        name: "Hotel Plaza Athénée",
        address: "25 Av. Montaigne, 75008 Paris, France",
        checkIn: "July 20, 2025 - 3:00 PM",
        checkOut: "July 25, 2025 - 11:00 AM",
        confirmationNumber: "ATH456123"
      }
    ],
    activities: [
      {
        date: "July 17, 2025",
        time: "10:00 AM",
        activity: "Tower of London Tour",
        location: "Tower of London, London"
      },
      {
        date: "July 21, 2025",
        time: "9:00 AM",
        activity: "Louvre Museum Visit",
        location: "Louvre Museum, Paris"
      },
      {
        date: "July 22, 2025",
        time: "2:00 PM",
        activity: "Eiffel Tower Experience",
        location: "Eiffel Tower, Paris"
      }
    ]
  }
];

export const travelServices = [
  {
    id: "ts1",
    name: "Airport Transportation",
    category: "Ground Transport",
    services: [
      {
        type: "Taxi",
        provider: "Yellow Cab",
        estimatedTime: "35-45 mins to downtown",
        estimatedCost: "$65-85",
        availability: "24/7",
        bookingRequired: false
      },
      {
        type: "Ride Share",
        provider: "Uber/Lyft",
        estimatedTime: "30-40 mins to downtown",
        estimatedCost: "$45-65",
        availability: "24/7",
        bookingRequired: false
      },
      {
        type: "Airport Shuttle",
        provider: "SuperShuttle",
        estimatedTime: "45-60 mins to downtown",
        estimatedCost: "$25-35",
        availability: "5:00 AM - 11:00 PM",
        bookingRequired: true
      },
      {
        type: "Public Transit",
        provider: "Metro Rail",
        estimatedTime: "60-75 mins to downtown",
        estimatedCost: "$1.75",
        availability: "5:00 AM - 12:00 AM",
        bookingRequired: false
      }
    ]
  },
  {
    id: "ts2",
    name: "Currency Exchange",
    category: "Financial Services",
    services: [
      {
        type: "Currency Exchange",
        provider: "Travelex",
        location: "Terminal B, Level 2",
        hours: "6:00 AM - 10:00 PM",
        currencies: ["EUR", "GBP", "JPY", "CAD", "AUD", "CHF"],
        fees: "3-5% exchange fee"
      },
      {
        type: "ATM",
        provider: "Bank of America",
        location: "Multiple locations",
        hours: "24/7",
        fees: "$3.00 withdrawal fee",
        currencies: ["USD"]
      }
    ]
  },
  {
    id: "ts3",
    name: "Travel Insurance",
    category: "Insurance",
    services: [
      {
        type: "Trip Protection",
        provider: "Allianz Travel",
        coverage: "Trip cancellation, medical, baggage",
        cost: "4-8% of trip cost",
        lastMinuteAvailable: true
      },
      {
        type: "Medical Insurance",
        provider: "World Nomads",
        coverage: "Emergency medical, evacuation",
        cost: "$50-150 per week",
        lastMinuteAvailable: true
      }
    ]
  },
  {
    id: "ts4",
    name: "Lost & Found",
    category: "Airport Services",
    services: [
      {
        type: "Lost Baggage",
        location: "Baggage Claim Area",
        phone: "+1-310-646-5252",
        hours: "24/7",
        process: "Report immediately, provide claim number"
      },
      {
        type: "Lost Items",
        location: "Terminal B, Security Office",
        phone: "+1-310-646-7911",
        hours: "6:00 AM - 10:00 PM",
        process: "Describe item, provide contact information"
      }
    ]
  }
];

export const weatherData = {
  destinations: {
    "Los Angeles": {
      current: {
        temperature: "75°F",
        condition: "Sunny",
        humidity: "65%",
        windSpeed: "8 mph"
      },
      forecast: [
        { day: "Today", high: "78°F", low: "68°F", condition: "Sunny" },
        { day: "Tomorrow", high: "76°F", low: "66°F", condition: "Partly Cloudy" },
        { day: "Friday", high: "79°F", low: "69°F", condition: "Sunny" }
      ]
    },
    "New York": {
      current: {
        temperature: "68°F",
        condition: "Cloudy",
        humidity: "78%",
        windSpeed: "12 mph"
      },
      forecast: [
        { day: "Today", high: "72°F", low: "62°F", condition: "Cloudy" },
        { day: "Tomorrow", high: "70°F", low: "60°F", condition: "Light Rain" },
        { day: "Friday", high: "74°F", low: "64°F", condition: "Partly Cloudy" }
      ]
    },
    "London": {
      current: {
        temperature: "59°F",
        condition: "Light Rain",
        humidity: "85%",
        windSpeed: "15 mph"
      },
      forecast: [
        { day: "Today", high: "63°F", low: "55°F", condition: "Light Rain" },
        { day: "Tomorrow", high: "61°F", low: "53°F", condition: "Cloudy" },
        { day: "Friday", high: "65°F", low: "57°F", condition: "Partly Cloudy" }
      ]
    }
  }
};

export const travelTips = [
  {
    category: "Security",
    tips: [
      "Arrive at the airport 2 hours early for domestic flights, 3 hours for international",
      "Have your ID and boarding pass ready at security checkpoints",
      "Pack liquids in containers 3.4 oz or smaller in a clear quart-sized bag",
      "Remove electronics larger than a cell phone from carry-on bags",
      "Wear easily removable shoes and minimal jewelry"
    ]
  },
  {
    category: "Packing",
    tips: [
      "Check airline baggage restrictions before packing",
      "Pack essential medications in carry-on luggage",
      "Bring a change of clothes in your carry-on for long trips",
      "Use packing cubes to organize and maximize space",
      "Keep important documents in an easily accessible pocket"
    ]
  },
  {
    category: "Health & Safety",
    tips: [
      "Check vaccination requirements for international destinations",
      "Bring hand sanitizer and wear masks when recommended",
      "Stay hydrated during flights",
      "Get travel insurance for international trips",
      "Register with your embassy when traveling abroad"
    ]
  },
  {
    category: "Money & Documents",
    tips: [
      "Notify your bank of travel plans to avoid card blocks",
      "Make copies of important documents and store separately",
      "Check passport expiration dates (6+ months validity required)",
      "Research local currency and exchange rates",
      "Consider getting a travel-friendly credit card with no foreign fees"
    ]
  }
];

export const airportAmenities = [
  {
    category: "WiFi & Connectivity",
    amenities: [
      {
        name: "Free Airport WiFi",
        description: "Complimentary high-speed internet throughout terminals",
        location: "All terminals",
        timeLimit: "Unlimited",
        password: "Not required"
      },
      {
        name: "Charging Stations",
        description: "USB and power outlets at gates and common areas",
        location: "Throughout all terminals",
        availability: "24/7"
      }
    ]
  },
  {
    category: "Comfort & Relaxation",
    amenities: [
      {
        name: "Quiet Zones",
        description: "Designated peaceful areas for rest and relaxation",
        location: "Terminal A (Gate 15), Terminal B (Gate 22)",
        features: ["Reduced noise", "Comfortable seating", "Dim lighting"]
      },
      {
        name: "Sleep Pods",
        description: "Private sleeping pods for rent",
        location: "Terminal B, Level 3",
        cost: "$25/hour",
        features: ["Privacy", "Charging ports", "Climate control"]
      }
    ]
  },
  {
    category: "Family Services",
    amenities: [
      {
        name: "Family Restrooms",
        description: "Spacious restrooms with baby changing facilities",
        location: "All terminals",
        features: ["Baby changing tables", "Family-sized stalls", "Step stools"]
      },
      {
        name: "Kids Play Areas",
        description: "Interactive play spaces for children",
        location: "Terminal A (Gate 8), Terminal C (Gate 18)",
        ageRange: "2-12 years",
        features: ["Soft play equipment", "Interactive games", "Seating for parents"]
      }
    ]
  }
];

// Sample travel-related conversations for the chatbot
export const travelConversations = [
  {
    id: "travel_conv_1",
    title: "Flight Status Inquiry",
    messages: [
      {
        sender: "user",
        text: "What's the status of my flight UA 1234?",
        timestamp: "2025-07-10 07:45 AM"
      },
      {
        sender: "assistant",
        text: "Your United Airlines flight UA 1234 from LAX to JFK is currently on time! ✈️\n\n**Flight Details:**\n• Departure: 8:30 AM from Terminal 7, Gate A15\n• Arrival: 5:15 PM at JFK Terminal 4, Gate B22\n• Duration: 5h 45m\n• Aircraft: Boeing 787-9\n• Your seat: 12A (Business Class)\n\nYou should head to your gate by 7:30 AM for boarding. Have a great flight!",
        timestamp: "2025-07-10 07:45 AM"
      }
    ]
  },
  {
    id: "travel_conv_2",
    title: "Transportation Options",
    messages: [
      {
        sender: "user",
        text: "How can I get to downtown from the airport?",
        timestamp: "2025-07-10 09:15 AM"
      },
      {
        sender: "assistant",
        text: "Here are your transportation options to downtown:\n\n🚕 **Taxi**: $65-85, 35-45 mins (available 24/7)\n🚗 **Uber/Lyft**: $45-65, 30-40 mins (available 24/7)\n🚐 **Airport Shuttle**: $25-35, 45-60 mins (5 AM-11 PM, booking required)\n🚇 **Metro Rail**: $1.75, 60-75 mins (5 AM-12 AM)\n\nFor the fastest option, I'd recommend Uber or Lyft. Would you like me to help you with anything else?",
        timestamp: "2025-07-10 09:15 AM"
      }
    ]
  },
  {
    id: "travel_conv_3",
    title: "Weather Check",
    messages: [
      {
        sender: "user",
        text: "What's the weather like in New York today?",
        timestamp: "2025-07-10 10:30 AM"
      },
      {
        sender: "assistant",
        text: "Here's the current weather in New York:\n\n🌤️ **Current Conditions:**\n• Temperature: 68°F\n• Condition: Cloudy\n• Humidity: 78%\n• Wind: 12 mph\n\n**Today's Forecast:**\n• High: 72°F, Low: 62°F\n• Cloudy conditions expected\n\nYou might want to bring a light jacket when you arrive. The weather should be pleasant for walking around the city!",
        timestamp: "2025-07-10 10:30 AM"
      }
    ]
  }
];

export default {
  flightData,
  travelItineraries,
  travelServices,
  weatherData,
  travelTips,
  airportAmenities,
  travelConversations
};
