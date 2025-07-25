import React, { useState, useRef, useEffect } from 'react';
import '../styles/Chat.css';
import '../styles/IntelligentInput.css';
import '../styles/LocationService.css';
import '../styles/AirportFacilities.css';
import '../styles/AIIntelligentInput.css';
import IntelligentInput from '../components/IntelligentInput';
import AIIntelligentInput from '../components/AIIntelligentInput';
import LocationService from '../components/LocationService';
import AirportFacilities from '../components/AirportFacilities';
import { aiEngine } from '../components/AIConversationEngine';
import {
  searchRealAirportServices,
  getRealServicesByCategory,
  generateRealContextualResponse,
  realAirportData,
  filterServicesByAirport,
  getAirportByCode
} from '../data/realAirportData';
import {
  getRandomResponse,
  conversationalResponses,
  helpResponses,
  airportLayout
} from '../data/enhancedAirportData';
import {
  flightData,
  travelItineraries,
  travelServices,
  weatherData,
  travelTips,
  airportAmenities
} from '../data/travelData';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome to Airport Assistant! 🛫\n\n🔒 **FIRST STEP: Select Your Airport Location**\n\nPlease use the location selector below to choose your airport before we can start chatting.\n\n✅ **Once you've selected your location, I can help you with:**\n\n🏢 **Airport Services:**\n☕ **Dining & Coffee** - Restaurants, cafes, and quick bites\n🛍️ **Shopping** - Gifts, electronics, and travel essentials\n🛋️ **Lounges** - Relax and work in comfort\n\n✈️ **Travel Information:**\n📅 **Flight Status** - Check gates and schedules\n🌤️ **Weather Updates** - Current conditions and forecasts\n🚗 **Transportation** - Airport to downtown options\n💡 **Travel Tips** - Security, packing, and safety advice\n\n� **Please select your airport location first to unlock all features!**",
      sender: 'bot',
      isJson: false
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isJsonMode, setIsJsonMode] = useState(false); // Defaulting to natural language mode
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [currentAirport, setCurrentAirport] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [hasUserInteraction, setHasUserInteraction] = useState(false);
  const [useAIMode, setUseAIMode] = useState(true); // Enable AI mode by default
  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const locationServiceRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Check if user has scrolled up from bottom
  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 100; // 100px threshold
      setShowScrollDown(!isAtBottom);
    }
  };

  // Auto-scroll on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle airport selection
  const handleAirportSelect = (airport) => {
    setCurrentAirport(airport);
    setHasUserInteraction(true); // Track that user has selected an airport

    if (airport) {
      // Add a system message about airport selection
      const airportMessage = {
        id: Date.now(),
        text: `📍 **Location Set:** ${airport.name} (${airport.code})\n\n✅ Perfect! I'm now showing services and information specifically for ${airport.city}, ${airport.state}. \n\n🎯 **You can now ask me about:**\n• Restaurants and dining options\n• Coffee shops and cafes\n• Shopping and gift stores\n• Lounges and relaxation areas\n• Specific terminal or gate locations\n\n💬 **Try asking:** "Find Starbucks" or "Show me restaurants in Terminal B"`,
        sender: 'bot',
        isJson: false
      };

      setMessages(prev => [...prev, airportMessage]);
    }
  };

  // Handle facility click to trigger search
  const handleFacilityClick = (searchQuery) => {
    console.log('🔍 Facility clicked with query:', searchQuery);
    setHasUserInteraction(true); // Track facility clicks as user interaction
    setInputValue(''); // Clear input field after sending
    handleSendMessage(searchQuery);
  };

  // Handle clear chat history
  const handleClearHistory = () => {
    console.log('🧹 Clear history button clicked, hasUserInteraction:', hasUserInteraction);
    setShowClearConfirm(true);
  };

  // Confirm clear chat history
  const confirmClearHistory = () => {
    console.log('✅ Confirming clear chat history');
    // Reset to initial welcome message
    const welcomeMessage = {
      id: 1,
      text: "Welcome to Airport Assistant! 🛫\n\nI'm your comprehensive travel companion. To get started, **please select your airport location** using the location selector below.\n\nOnce you've set your location, I can help you with:\n\n🏢 **Airport Services:**\n☕ **Dining & Coffee** - Restaurants, cafes, and quick bites\n🛍️ **Shopping** - Gifts, electronics, and travel essentials\n🛋️ **Lounges** - Relax and work in comfort\n\n✈️ **Travel Information:**\n📅 **Flight Status** - Check gates and schedules\n🌤️ **Weather Updates** - Current conditions and forecasts\n🚗 **Transportation** - Airport to downtown options\n💡 **Travel Tips** - Security, packing, and safety advice\n\n💬 **Just ask me naturally!** Try saying:\n• \"Find coffee near gate B15\"\n• \"Show me restaurants in Terminal C\"\n• \"Where can I buy electronics?\"\n• \"What lounges are available?\"",
      sender: 'bot',
      isJson: false
    };

    // Clear all chat data completely
    setMessages([welcomeMessage]);
    setInputValue('');
    setIsJsonMode(false); // Reset to natural language mode
    setShowScrollDown(false); // Hide scroll down button
    setShowClearConfirm(false); // Close confirmation dialog
    setHasUserInteraction(false); // Reset user interaction flag
    setCurrentAirport(null); // Clear selected airport location

    // Clear localStorage for location data using LocationService function
    if (locationServiceRef.current) {
      locationServiceRef.current.clearSavedAirport();
      console.log('🗑️ Cleared location data via LocationService');
    } else {
      // Fallback: Clear localStorage manually if ref is not available
      try {
        localStorage.removeItem('userSelectedAirport');
        localStorage.removeItem('airportSelectionTimestamp');
        localStorage.removeItem('hasAskedLocation');
        console.log('🗑️ Cleared location data from localStorage (fallback)');
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
    }

    // Auto-scroll to bottom after clearing
    setTimeout(() => {
      scrollToBottom();
    }, 100);

    // Show success feedback in console
    console.log('✅ All data cleared successfully - Complete fresh start!');
    console.log('🔄 hasUserInteraction reset to false, clear button will be disabled until next interaction');
    console.log('📍 Location cleared - user needs to select airport again');
    console.log('🗑️ localStorage cleared - no saved preferences remain');
  };

  // Cancel clear confirmation
  const cancelClearHistory = () => {
    console.log('❌ Clear chat history cancelled');
    setShowClearConfirm(false);
  };

  // Function to validate and parse JSON
  const isValidJson = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Smart query processing and interpretation
  const processIntelligentQuery = (query) => {
    const lowerQuery = query.toLowerCase().trim();

    // Extract airport codes
    const airportCodeMatch = lowerQuery.match(/\b([a-z]{3})\b/g);
    const airportCodes = airportCodeMatch ? airportCodeMatch.map(code => code.toUpperCase()) : [];

    // Extract gate/terminal information
    const gateMatch = lowerQuery.match(/gate\s+([a-z]\d+)/i);
    const terminalMatch = lowerQuery.match(/terminal\s+([a-z])/i);
    const concourseMatch = lowerQuery.match(/concourse\s+([a-z])/i);

    // Smart query expansion
    let expandedQuery = query;

    // Add airport context if gate/terminal mentioned without airport
    if ((gateMatch || terminalMatch || concourseMatch) && airportCodes.length === 0) {
      expandedQuery += " airport services";
    }

    // Suggest specific airports for common queries
    if (lowerQuery.includes('near me') || lowerQuery.includes('closest')) {
      expandedQuery = expandedQuery.replace(/near me|closest/g, 'ATL LAX ORD JFK');
    }

    // Handle common misspellings and abbreviations
    const corrections = {
      'starbux': 'starbucks',
      'chickfila': 'chick-fil-A',
      'mcd': 'mcdonalds',
      'resturant': 'restaurant',
      'loung': 'lounge',
      'shopp': 'shopping',
      'coffe': 'coffee',
      'atm machine': 'ATM',
      'money machine': 'ATM',
      'cash machine': 'ATM'
    };

    Object.keys(corrections).forEach(mistake => {
      if (lowerQuery.includes(mistake)) {
        expandedQuery = expandedQuery.replace(new RegExp(mistake, 'gi'), corrections[mistake]);
      }
    });

    return {
      originalQuery: query,
      processedQuery: expandedQuery,
      airportCodes: airportCodes,
      location: {
        gate: gateMatch ? gateMatch[1].toUpperCase() : null,
        terminal: terminalMatch ? terminalMatch[1].toUpperCase() : null,
        concourse: concourseMatch ? concourseMatch[1].toUpperCase() : null
      },
      hasLocationContext: !!(gateMatch || terminalMatch || concourseMatch)
    };
  };

  // Enhanced airport response with intelligent processing
  const generateEnhancedAirportResponse = (query) => {
    console.log('🔍 generateEnhancedAirportResponse called with:', query);
    console.log('📍 Current airport:', currentAirport);

    // Check if user has selected an airport for service queries
    if (!currentAirport && !query.toLowerCase().includes('help') && !query.toLowerCase().includes('hello')) {
      console.log('❌ No airport selected, returning no_airport_selected response');
      return {
        type: "no_airport_selected",
        query: query,
        message: "🏗️ **Please Select Your Airport First**\n\nTo provide you with accurate and relevant information, I need to know which airport you're at or planning to visit.\n\n📍 **Please use the location selector above to:**\n• Use GPS to detect your current airport\n• Manually select your airport from the list\n\nOnce you've set your location, I'll be able to help you find specific services, restaurants, shops, and amenities at your airport! ✈️",
        results: [],
        total: 0,
        suggestions: ["Please select your airport location first"]
      };
    }

    // Process the query - simple processing for now
    const processedQuery = query.toLowerCase().trim();
    console.log('🔍 Processed query:', processedQuery);

    // Start with airport-filtered data if an airport is selected
    let baseData = currentAirport ? filterServicesByAirport(currentAirport.code) : realAirportData;
    console.log('📊 Base data length:', baseData.length);

    const searchResults = searchRealAirportServices(processedQuery, baseData);
    console.log('🔍 Search results:', searchResults.length, 'items found');
    console.log('📋 Search results sample:', searchResults.slice(0, 2));

    // Extract location context from query
    let filteredResults = searchResults;
    const terminalMatch = processedQuery.match(/terminal\s+([a-z])/i);
    const gateMatch = processedQuery.match(/gate\s+([a-z]\d+)/i);
    const concourseMatch = processedQuery.match(/concourse\s+([a-z])/i);

    if (terminalMatch || gateMatch || concourseMatch) {
      filteredResults = searchResults.filter(service => {
        const serviceLocation = service.location.toLowerCase();
        const serviceTerminal = service.terminal.toLowerCase();

        if (gateMatch) {
          return serviceLocation.includes(gateMatch[1].toLowerCase());
        }
        if (terminalMatch) {
          return serviceTerminal.includes(`terminal ${terminalMatch[1].toLowerCase()}`);
        }
        if (concourseMatch) {
          return serviceLocation.includes(`concourse ${concourseMatch[1].toLowerCase()}`);
        }
        return true;
      });
    }

    const contextualMessage = generateRealContextualResponse(processedQuery, filteredResults);
    const airportContext = currentAirport ? `at ${currentAirport.code}` : '';

    console.log('💬 Contextual message:', contextualMessage);
    console.log('🎯 Filtered results:', filteredResults.length, 'items');

    return {
      type: "airport_services",
      query: query,
      currentAirport: currentAirport,
      message: currentAirport && filteredResults.length > 0 ?
        `${contextualMessage} ${airportContext}` : contextualMessage,
      results: filteredResults,
      total: filteredResults.length,
      suggestions: generateSmartSuggestions(processedQuery, filteredResults)
    };
  };

  // Generate smart follow-up suggestions
  const generateSmartSuggestions = (query, results) => {
    const suggestions = [];

    // Location-based suggestions from query
    const terminalMatch = query.match(/terminal\s+([a-z])/i);
    const gateMatch = query.match(/gate\s+([a-z]\d+)/i);
    const concourseMatch = query.match(/concourse\s+([a-z])/i);

    if (terminalMatch || gateMatch || concourseMatch) {
      const location = gateMatch?.[1] || terminalMatch?.[1] || concourseMatch?.[1];
      if (location && results.length > 0) {
        suggestions.push(`More services near ${location}`);
        suggestions.push(`Directions to ${location}`);
      }
    }

    // Airport code suggestions
    const airportMatch = query.match(/\b([A-Z]{3})\b/);
    if (airportMatch && results.length > 0) {
      const code = airportMatch[1];
      suggestions.push(`All services at ${code}`);
      suggestions.push(`${code} terminal map`);
    }

    // Category-based suggestions
    if (results.length > 0) {
      const categories = [...new Set(results.map(r => r.type))];
      categories.slice(0, 2).forEach(category => {
        suggestions.push(`More ${category.toLowerCase()} options`);
      });
    }

    // Default helpful suggestions
    if (suggestions.length === 0) {
      suggestions.push(
        "Try: 'coffee near gate B15'",
        "Ask: 'lounges in terminal C'",
        "Say: 'restaurants in concourse A'",
        "Request: 'shops and gifts'"
      );
    }

    return suggestions.slice(0, 4);
  };

  // Enhanced function to generate airport service response with natural conversation
  const generateAirportResponse = (query) => {
    const lowerQuery = query.toLowerCase();

    // Handle flight-related queries
    if (lowerQuery.includes('flight') || lowerQuery.includes('departure') || lowerQuery.includes('arrival')) {
      return generateFlightResponse(query);
    }

    // Handle weather queries
    if (lowerQuery.includes('weather') || lowerQuery.includes('temperature') || lowerQuery.includes('forecast')) {
      return generateWeatherResponse(query);
    }

    // Handle travel tips queries
    if (lowerQuery.includes('tip') || lowerQuery.includes('advice') || lowerQuery.includes('recommend')) {
      return generateTravelTipsResponse(query);
    }

    // Handle transportation queries
    if (lowerQuery.includes('transport') || lowerQuery.includes('taxi') || lowerQuery.includes('uber') ||
      lowerQuery.includes('downtown') || lowerQuery.includes('get to')) {
      return generateTransportationResponse(query);
    }

    // Handle itinerary queries
    if (lowerQuery.includes('itinerary') || lowerQuery.includes('trip') || lowerQuery.includes('schedule')) {
      return generateItineraryResponse(query);
    }

    // Handle greetings
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
      const airportContext = currentAirport ? ` at ${currentAirport.code}` : '';
      return {
        type: "greeting",
        query: query,
        message: getRandomResponse(conversationalResponses.greetings) + airportContext,
        suggestions: ["Check my flight status", "Show me weather", "Transportation options", "Travel tips"],
        results: [],
        total: 0
      };
    }

    // Handle help requests
    if (lowerQuery.includes('help') || lowerQuery.includes('what can you do') || lowerQuery.includes('how does this work')) {
      return {
        type: "help",
        query: query,
        message: getRandomResponse(helpResponses.general_help),
        examples: helpResponses.examples,
        results: [],
        total: 0
      };
    }

    // Handle airport info requests
    if (lowerQuery.includes('terminal') || lowerQuery.includes('gate') || lowerQuery.includes('layout')) {
      return {
        type: "airport_info",
        query: query,
        message: "🗺️ Here's our airport layout information:",
        airport_layout: airportLayout,
        results: [],
        total: 0
      };
    }

    // Use enhanced airport response with intelligent processing
    return generateEnhancedAirportResponse(query);

  };

  // Travel-related response functions
  const generateFlightResponse = (query) => {
    const lowerQuery = query.toLowerCase();

    // Check if asking for specific flight
    const flightNumbers = ['UA1234', 'DL5678', 'AA9012', 'ua 1234', 'dl 5678', 'aa 9012'];
    const mentionedFlight = flightNumbers.find(fn => lowerQuery.includes(fn.toLowerCase()));

    if (mentionedFlight) {
      const flight = flightData.userFlights.find(f =>
        f.flightNumber.toLowerCase().includes(mentionedFlight.toLowerCase().replace(' ', ''))
      );

      if (flight) {
        return {
          type: "flight_status",
          query: query,
          message: `✈️ **${flight.flightNumber} Flight Status**\n\n` +
            `**${flight.departure.city} → ${flight.arrival.city}**\n` +
            `• Status: **${flight.status}**\n` +
            `• Departure: ${flight.departure.time} from Terminal ${flight.departure.terminal}, Gate ${flight.departure.gate}\n` +
            `• Arrival: ${flight.arrival.time} at Terminal ${flight.arrival.terminal}, Gate ${flight.arrival.gate}\n` +
            `• Duration: ${flight.duration}\n` +
            `• Aircraft: ${flight.aircraft}\n` +
            `• Seat: ${flight.seat} (${flight.class})\n\n` +
            `${flight.status === 'On Time' ? '✅ Your flight is on schedule!' :
              flight.status === 'Boarding' ? '🚨 Boarding has started - head to your gate!' :
                '📋 Please check with airline for updates'}`,
          flight: flight,
          results: [],
          total: 1
        };
      }
    }

    // General flight information
    return {
      type: "flight_info",
      query: query,
      message: "✈️ **Your Upcoming Flights**\n\n" +
        flightData.userFlights.slice(0, 2).map(flight =>
          `**${flight.flightNumber}** - ${flight.departure.city} → ${flight.arrival.city}\n` +
          `${flight.departure.date} at ${flight.departure.time} | Status: ${flight.status}`
        ).join('\n\n'),
      flights: flightData.userFlights,
      results: [],
      total: flightData.userFlights.length
    };
  };

  const generateWeatherResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    const cities = Object.keys(weatherData.destinations);
    const mentionedCity = cities.find(city => lowerQuery.includes(city.toLowerCase()));

    if (mentionedCity) {
      const weather = weatherData.destinations[mentionedCity];
      return {
        type: "weather",
        query: query,
        message: `🌤️ **Weather in ${mentionedCity}**\n\n` +
          `**Current Conditions:**\n` +
          `• Temperature: ${weather.current.temperature}\n` +
          `• Condition: ${weather.current.condition}\n` +
          `• Humidity: ${weather.current.humidity}\n` +
          `• Wind: ${weather.current.windSpeed}\n\n` +
          `**3-Day Forecast:**\n` +
          weather.forecast.map(day =>
            `${day.day}: ${day.high}/${day.low} - ${day.condition}`
          ).join('\n'),
        weather: weather,
        results: [],
        total: 1
      };
    }

    return {
      type: "weather_general",
      query: query,
      message: "🌤️ **Weather Information Available**\n\nI can provide weather updates for:\n• Los Angeles\n• New York\n• London\n\nJust ask: 'What's the weather in New York?'",
      results: [],
      total: 0
    };
  };

  const generateTransportationResponse = (query) => {
    const transportation = travelServices.find(ts => ts.category === "Ground Transport");

    return {
      type: "transportation",
      query: query,
      message: "🚗 **Airport Transportation Options**\n\n" +
        transportation.services.map(service =>
          `**${service.type}** (${service.provider})\n` +
          `• Time: ${service.estimatedTime}\n` +
          `• Cost: ${service.estimatedCost}\n` +
          `• Available: ${service.availability}\n` +
          `• Booking: ${service.bookingRequired ? 'Required' : 'Not required'}`
        ).join('\n\n'),
      transportation: transportation,
      results: [],
      total: transportation.services.length
    };
  };

  const generateTravelTipsResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    let relevantTips = travelTips;

    if (lowerQuery.includes('security')) {
      relevantTips = travelTips.filter(tip => tip.category === 'Security');
    } else if (lowerQuery.includes('pack')) {
      relevantTips = travelTips.filter(tip => tip.category === 'Packing');
    } else if (lowerQuery.includes('health')) {
      relevantTips = travelTips.filter(tip => tip.category === 'Health & Safety');
    } else if (lowerQuery.includes('money') || lowerQuery.includes('document')) {
      relevantTips = travelTips.filter(tip => tip.category === 'Money & Documents');
    }

    const tipCategory = relevantTips[0];

    return {
      type: "travel_tips",
      query: query,
      message: `💡 **${tipCategory.category} Tips**\n\n` +
        tipCategory.tips.map((tip, index) => `${index + 1}. ${tip}`).join('\n\n'),
      tips: relevantTips,
      results: [],
      total: tipCategory.tips.length
    };
  };

  const generateItineraryResponse = (query) => {
    return {
      type: "itinerary",
      query: query,
      message: "📅 **Your Travel Itineraries**\n\n" +
        travelItineraries.map(trip =>
          `**${trip.title}**\n` +
          `${trip.dates} | Status: ${trip.status}\n` +
          `Destinations: ${trip.destinations.join(' → ')}`
        ).join('\n\n'),
      itineraries: travelItineraries,
      results: [],
      total: travelItineraries.length
    };
  };

  // Function to generate JSON response based on request
  const generateJsonResponse = (jsonRequest) => {
    try {
      const request = JSON.parse(jsonRequest);

      // Handle airport service requests
      if (request.type === "airport_services" || request.type === "search") {
        const query = request.query || request.message || "";
        return JSON.stringify(generateAirportResponse(query), null, 2);
      }

      // Sample response structure based on different request types
      const responses = {
        "greeting": {
          status: "success",
          message: "Welcome to Airport Assistant! How can I help you find airport services today?",
          timestamp: new Date().toISOString(),
          requestId: Date.now()
        },
        "airport_services": {
          status: "success",
          data: generateAirportResponse(request.query || ""),
          timestamp: new Date().toISOString()
        },
        "error": {
          status: "error",
          message: "Invalid request type. Try asking for airport services like 'restaurants', 'coffee', 'gifts', 'clothing', or 'lounges'.",
          code: 400,
          timestamp: new Date().toISOString()
        }
      };

      // Determine response based on request type
      const requestType = request.type || request.action || "error";
      const response = responses[requestType] || responses["error"];

      // Add request context to response
      response.originalRequest = request;

      return JSON.stringify(response, null, 2);
    } catch (error) {
      return JSON.stringify({
        status: "error",
        message: "Failed to parse JSON request",
        error: error.message,
        timestamp: new Date().toISOString()
      }, null, 2);
    }
  };

  // Enhanced function to format airport response for natural conversation
  const formatAirportResponse = (response) => {
    let formatted = `${response.message}\n\n`;

    // Handle different response types
    if (response.type === "greeting") {
      formatted += `Here are some things you can ask me:\n`;
      response.suggestions.forEach((suggestion, index) => {
        formatted += `• ${suggestion}\n`;
      });
      return formatted;
    }

    if (response.type === "help") {
      formatted += `**Example requests:**\n`;
      response.examples.forEach((example, index) => {
        formatted += `${example}\n`;
      });
      return formatted;
    }

    if (response.type === "airport_info") {
      formatted += `**Terminal Information:**\n\n`;
      Object.entries(response.airport_layout.terminals).forEach(([terminal, info]) => {
        formatted += `**Terminal ${terminal}** (Gates ${info.gates})\n`;
        formatted += `Services: ${info.services.join(', ')}\n`;
        formatted += `Amenities: ${info.amenities.join(', ')}\n\n`;
      });
      formatted += `**Transportation:**\n`;
      formatted += `• ${response.airport_layout.transportation.between_terminals}\n`;
      formatted += `• ${response.airport_layout.transportation.parking}\n`;
      formatted += `• ${response.airport_layout.transportation.public_transport}\n`;
      return formatted;
    }

    if (response.total === 0) {
      formatted += `${response.suggestions ? 'Try these instead:\n' : ''}`;
      response.suggestions?.forEach((suggestion, index) => {
        formatted += `• ${suggestion}\n`;
      });
      return formatted;
    }

    // Format service results with enhanced details
    response.results.forEach((service, index) => {
      formatted += `**${index + 1}. ${service.name}** ⭐ ${service.rating}/5\n`;
      formatted += `📍 ${service.location}\n`;
      formatted += `🕒 Open: ${service.hours}\n`;

      if (service.priceRange) {
        formatted += `💰 Price Range: ${service.priceRange}\n`;
      }

      if (service.specialties && service.specialties.length > 0) {
        formatted += `✨ Specialties: ${service.specialties.join(', ')}\n`;
      }

      if (service.menu && service.menu.length > 0) {
        formatted += `🍽️ Popular Items: ${service.menu.slice(0, 3).join(', ')}${service.menu.length > 3 ? '...' : ''}\n`;
      }

      if (service.products && service.products.length > 0) {
        formatted += `🛍️ Products: ${service.products.slice(0, 3).join(', ')}${service.products.length > 3 ? '...' : ''}\n`;
      }

      if (service.amenities && service.amenities.length > 0) {
        formatted += `🎯 Amenities: ${service.amenities.slice(0, 3).join(', ')}${service.amenities.length > 3 ? '...' : ''}\n`;
      }

      if (service.accessFee) {
        formatted += `� Access Fee: ${service.accessFee}\n`;
      }

      if (service.waitTime) {
        formatted += `⏱️ Wait Time: ${service.waitTime}\n`;
      }

      // Special indicators
      const indicators = [];
      if (service.wifi) indicators.push("� Free WiFi");
      if (service.delivery) indicators.push("🚚 Delivery Available");
      if (service.takeaway) indicators.push("🥡 Takeaway");
      if (service.mobile_order) indicators.push("📱 Mobile Order");
      if (service.reservations) indicators.push("📞 Reservations");
      if (indicators.length > 0) {
        formatted += `${indicators.join(' • ')}\n`;
      }

      formatted += `📝 ${service.description}\n`;
      formatted += `🔗 ${service.orderUrl}\n\n`;
    });

    // Add helpful tip if available
    if (response.tip) {
      formatted += `${response.tip}\n\n`;
    }

    // Add follow-up suggestions based on category
    if (response.category === "cafeterias") {
      formatted += `**Want more options?** Try asking: "healthy food options" or "quick breakfast near gate [X]"`;
    } else if (response.category === "restaurants") {
      formatted += `**Craving something specific?** Try: "vegetarian restaurants" or "quick food in Terminal B"`;
    } else if (response.category === "giftShops") {
      formatted += `**Looking for something specific?** Ask: "electronics store" or "duty free near international gates"`;
    } else if (response.category === "lounges") {
      formatted += `**Need specific amenities?** Try: "business lounge with meeting rooms" or "family lounge"`;
    } else if (response.total > 0) {
      formatted += `**Want to narrow it down?** Ask about specific terminals, gate areas, or dietary preferences!`;
    }

    return formatted;
  };

  const handleSendMessage = (messageText) => {
    const text = typeof messageText === 'string' ? messageText : inputValue;
    console.log('📤 Sending message:', text);

    if (text.trim()) {
      setHasUserInteraction(true); // Track that user has interacted

      const newMessage = {
        id: Date.now(),
        text: text,
        sender: 'user',
        isJson: isJsonMode && isValidJson(text)
      };
      setMessages([...messages, newMessage]);

      // Auto-scroll after user message
      setTimeout(() => {
        scrollToBottom();
      }, 100);

      // Generate bot response
      setTimeout(() => {
        console.log('🤖 Generating bot response for:', text);
        let responseText;
        let isJsonResponse = false;

        if (isJsonMode && isValidJson(text)) {
          // Handle JSON request
          responseText = generateJsonResponse(text);
          isJsonResponse = true;
        } else if (isJsonMode && !isValidJson(text)) {
          // Invalid JSON in JSON mode
          responseText = JSON.stringify({
            status: "error",
            message: "Invalid JSON format. Please provide a valid JSON request.",
            example: {
              type: "airport_services",
              query: "coffee"
            },
            timestamp: new Date().toISOString()
          }, null, 2);
          isJsonResponse = true;
        } else {
          // Handle natural language queries with AI-powered responses
          console.log('🔍 Processing natural language query with AI:', text);

          if (useAIMode) {
            try {
              // Use AI engine for intelligent response generation
              console.log('🤖 AI Mode enabled, generating intelligent response...');

              // Apply typo correction before search
              const correctedQuery = aiEngine.correctTypos(text);
              const finalSearchQuery = correctedQuery !== text.toLowerCase() ? correctedQuery : text;
              console.log('🔧 Search query after typo correction:', finalSearchQuery);

              let baseData = realAirportData;
              if (currentAirport?.code) {
                baseData = filterServicesByAirport(currentAirport.code);
                console.log('📍 Filtered data for', currentAirport.code, ':', baseData.length, 'services');
              }

              // Use corrected query for search
              const searchResultsArray = searchRealAirportServices(finalSearchQuery, baseData);
              console.log('🔍 AI search results array:', searchResultsArray.length, 'items');

              // Format results for AI engine (it expects an object with services property)
              const searchResults = {
                services: searchResultsArray,
                total: searchResultsArray.length,
                query: finalSearchQuery
              };

              console.log('🔧 Calling AI engine with:', { text, currentAirport, searchResults });
              responseText = aiEngine.generateIntelligentResponse(text, currentAirport, searchResults);
              console.log('🤖 AI-generated response:', responseText);

              if (!responseText || responseText.trim().length === 0) {
                console.error('❌ AI engine returned empty response, falling back to traditional mode');
                throw new Error('Empty AI response');
              }
            } catch (error) {
              console.error('❌ Error in AI mode:', error);
              console.log('🔄 Falling back to traditional mode');
              // Fallback to original logic
              const airportResponse = generateAirportResponse(text);
              responseText = formatAirportResponse(airportResponse);
            }
          } else {
            // Fallback to original logic
            const airportResponse = generateAirportResponse(text);
            console.log('📊 Airport response:', airportResponse);
            responseText = formatAirportResponse(airportResponse);
            console.log('📝 Formatted response:', responseText);
          }

          isJsonResponse = false;

          // Add some conversational flair with random positive responses
          const conversationalExtras = [
            "\n🌟 Anything else I can help you find?",
            "\n✈️ Have a wonderful time at the airport!",
            "\n😊 Let me know if you need help finding anything else!",
            "\n🎯 Hope this helps with your airport experience!",
            "\n🛫 Safe travels, and feel free to ask for more help!"
          ];

          // Add a random extra message 30% of the time (only for non-AI responses)
          if (!useAIMode && Math.random() < 0.3 && responseText.includes('**')) {
            responseText += conversationalExtras[Math.floor(Math.random() * conversationalExtras.length)];
          }
        }

        const botResponse = {
          id: Date.now(), // Use timestamp for unique ID
          text: responseText,
          sender: 'bot',
          isJson: isJsonResponse
        };
        setMessages(prev => [...prev, botResponse]);

        // Auto-scroll after bot response
        setTimeout(() => {
          scrollToBottom();
        }, 100);
      }, 1000);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="header-brand">
          Airport Concierge AI
        </div>
        <div className="header-actions">
          {/* AI Mode toggle hidden as requested */}
          {/*
          <div className="ai-mode-toggle">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={useAIMode}
                onChange={(e) => setUseAIMode(e.target.checked)}
              />
              <span className="ai-indicator">🤖 AI Mode</span>
            </label>
          </div>
          */}
          <button
            className="clear-history-btn"
            onClick={handleClearHistory}
            title="Clear all data and start fresh"
            disabled={!hasUserInteraction}
          >
            <span className="broom-icon">🧹</span>
            <span className="clear-text">Clear</span>
          </button>
        </div>
      </div>

      <div
        className="messages-container"
        ref={messagesContainerRef}
        onScroll={handleScroll}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-avatar">
              {message.sender === 'user' ? '👤' : '🤖'}
            </div>
            <div className={`message-content ${message.isJson ? 'json-content' : ''}`}>
              {message.isJson ? (
                <pre className="json-display">{message.text}</pre>
              ) : (
                <div dangerouslySetInnerHTML={{
                  __html: message.text
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n/g, '<br>')
                    .replace(/•/g, '•')
                    .replace(/📍|🕒|⭐|💰|✨|🍽️|🛍️|🎯|💳|⏱️|📶|🚚|🥡|📱|📞|🔗|📝/g, '<span style="margin-right: 4px;">$&</span>')
                }} />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to bottom button */}
      {showScrollDown && (
        <button
          className="scroll-down-button"
          onClick={scrollToBottom}
          title="Scroll to bottom"
        >
          <span className="scroll-icon">↓</span>
          <span className="scroll-text">New messages</span>
        </button>
      )}

      {/* Clear Chat Confirmation Dialog */}
      {showClearConfirm && (
        <div className="clear-confirm-overlay">
          <div className="clear-confirm-dialog">
            <div className="clear-confirm-header">
              <span className="broom-icon">🧹</span>
              <h3>Clear All Data</h3>
            </div>
            <p>Are you sure you want to clear all data and start fresh? This will remove:</p>
            <ul style={{ textAlign: 'left', margin: '10px 0', paddingLeft: '20px' }}>
              <li>All conversation history</li>
              <li>Selected airport location</li>
              <li>Chat preferences</li>
            </ul>
            <p>You'll return to the welcome screen and need to select your airport again. This action cannot be undone.</p>
            <div className="clear-confirm-actions">
              <button
                className="confirm-btn cancel"
                onClick={cancelClearHistory}
              >
                Cancel
              </button>
              <button
                className="confirm-btn clear"
                onClick={confirmClearHistory}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      <LocationService
        ref={locationServiceRef}
        onAirportSelect={handleAirportSelect}
        currentAirport={currentAirport}
      />

      {currentAirport && (
        <AirportFacilities
          airport={currentAirport}
          onFacilityClick={handleFacilityClick}
        />
      )}

      {!currentAirport && (
        <div className="location-required-message">
          <span className="icon">📍</span>
          <span>Please select an airport location above to start chatting with the assistant</span>
        </div>
      )}

      {useAIMode ? (
        <AIIntelligentInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendMessage}
          currentAirport={currentAirport}
          conversationHistory={messages}
          disabled={!currentAirport} // Disable input until location is selected
          placeholder={currentAirport ?
            `Ask me about ${currentAirport.city} airport services...` :
            "🔒 Please select an airport location above to start chatting..."
          }
        />
      ) : (
        <IntelligentInput
          onSubmit={handleSendMessage}
          inputValue={inputValue}
          setInputValue={setInputValue}
          disabled={!currentAirport} // Disable input until location is selected
          placeholder={currentAirport ?
            "Ask me about airport services..." :
            "🔒 Please select an airport location above to start chatting..."
          }
        />
      )}
    </div>
  );
};

export default Chat;
