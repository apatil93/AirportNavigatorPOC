import React, { useState } from 'react';
import '../styles/Chat.css';
import { searchServices, getServicesByCategory } from '../data/airportData';

const Chat = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Welcome to Airport Assistant! 🛫\n\nI can help you find:\n• Restaurants & Food\n• Coffee & Cafeterias\n• Gift Shops & Souvenirs\n• Clothing Stores\n• Lounge Access\n\nJust tell me what you need! For example: 'I need coffee' or 'Show me restaurants'", 
      sender: 'bot',
      isJson: false
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isJsonMode, setIsJsonMode] = useState(false);

  // Function to validate and parse JSON
  const isValidJson = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Function to generate airport service response
  const generateAirportResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    
    // Handle specific requests
    if (lowerQuery.includes('coffee') || lowerQuery.includes('cafe')) {
      const cafeterias = getServicesByCategory('cafeterias');
      return {
        type: "airport_services",
        query: query,
        category: "cafeterias",
        results: cafeterias,
        message: "Here are the coffee shops and cafeterias available:",
        total: cafeterias.length
      };
    }
    
    if (lowerQuery.includes('restaurant') || lowerQuery.includes('food') || lowerQuery.includes('eat')) {
      const restaurants = getServicesByCategory('restaurants');
      return {
        type: "airport_services", 
        query: query,
        category: "restaurants",
        results: restaurants,
        message: "Here are the restaurants available:",
        total: restaurants.length
      };
    }
    
    if (lowerQuery.includes('gift') || lowerQuery.includes('shop') || lowerQuery.includes('souvenir')) {
      const giftShops = getServicesByCategory('giftShops');
      return {
        type: "airport_services",
        query: query, 
        category: "giftShops",
        results: giftShops,
        message: "Here are the gift shops and souvenir stores:",
        total: giftShops.length
      };
    }
    
    if (lowerQuery.includes('cloth') || lowerQuery.includes('fashion') || lowerQuery.includes('apparel')) {
      const clothing = getServicesByCategory('clothing');
      return {
        type: "airport_services",
        query: query,
        category: "clothing", 
        results: clothing,
        message: "Here are the clothing stores available:",
        total: clothing.length
      };
    }
    
    if (lowerQuery.includes('lounge') || lowerQuery.includes('relax') || lowerQuery.includes('wifi')) {
      const lounges = getServicesByCategory('lounges');
      return {
        type: "airport_services",
        query: query,
        category: "lounges",
        results: lounges,
        message: "Here are the lounges available for access:",
        total: lounges.length
      };
    }
    
    // General search
    const searchResults = searchServices(query);
    if (searchResults.length > 0) {
      return {
        type: "airport_services",
        query: query,
        category: "search_results",
        results: searchResults,
        message: `Found ${searchResults.length} services matching "${query}":`,
        total: searchResults.length
      };
    }
    
    // No matches found
    return {
      type: "airport_services",
      query: query,
      category: "no_results",
      results: [],
      message: "Sorry, I couldn't find any services matching your request. Try asking for restaurants, coffee, gift shops, clothing, or lounges.",
      suggestions: ["Show me restaurants", "I need coffee", "Gift shops", "Clothing stores", "Lounge access"],
      total: 0
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
      
      // Sample response structure
      const responses = {
        "greeting": {
          status: "success",
          message: "Welcome to Airport Assistant! How can I help you find airport services today?",
          timestamp: new Date().toISOString(),
          requestId: Date.now()
        },
        "error": {
          status: "error",
          message: "Invalid request type. Try asking for airport services like 'restaurants', 'coffee', 'gifts', 'clothing', or 'lounges'.",
          code: 400,
          timestamp: new Date().toISOString()
        }
      };

      const requestType = request.type || request.action || "error";
      const response = responses[requestType] || responses["error"];
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

  // Function to format airport response for text mode
  const formatAirportResponse = (response) => {
    if (response.total === 0) {
      return `${response.message}\n\nTry asking: ${response.suggestions?.join(', ')}`;
    }

    let formatted = `${response.message}\n\n`;
    
    response.results.forEach((service, index) => {
      formatted += `${index + 1}. **${service.name}**\n`;
      formatted += `   📍 ${service.location}\n`;
      formatted += `   ⭐ Rating: ${service.rating}/5\n`;
      formatted += `   🕒 Hours: ${service.hours}\n`;
      
      if (service.menu) {
        formatted += `   🍽️ Menu: ${service.menu.join(', ')}\n`;
      }
      if (service.products) {
        formatted += `   🛍️ Products: ${service.products.join(', ')}\n`;
      }
      if (service.amenities) {
        formatted += `   ✨ Amenities: ${service.amenities.join(', ')}\n`;
      }
      if (service.accessFee) {
        formatted += `   💰 Access Fee: ${service.accessFee}\n`;
      }
      
      formatted += `   🔗 Order/Access: ${service.orderUrl}\n`;
      formatted += `   📝 ${service.description}\n\n`;
    });

    return formatted;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: 'user',
        isJson: isJsonMode && isValidJson(inputValue)
      };
      setMessages([...messages, newMessage]);
      
      // Generate bot response
      setTimeout(() => {
        let responseText;
        let isJsonResponse = false;

        if (isJsonMode && isValidJson(inputValue)) {
          // Handle JSON request
          responseText = generateJsonResponse(inputValue);
          isJsonResponse = true;
        } else if (isJsonMode && !isValidJson(inputValue)) {
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
          // Handle natural language queries for airport services
          const airportResponse = generateAirportResponse(inputValue);
          responseText = formatAirportResponse(airportResponse);
          isJsonResponse = false;
        }

        const botResponse = {
          id: messages.length + 2,
          text: responseText,
          sender: 'bot',
          isJson: isJsonResponse
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
      
      setInputValue('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>🛫 Airport Assistant</h1>
        <div className="mode-toggle">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={isJsonMode}
              onChange={(e) => setIsJsonMode(e.target.checked)}
            />
            JSON Mode
          </label>
        </div>
      </div>
      
      {isJsonMode && (
        <div className="json-help">
          <h3>Sample Airport Service Requests:</h3>
          <div className="json-examples">
            <button onClick={() => setInputValue(JSON.stringify({type: "airport_services", query: "coffee"}, null, 2))}>
              Coffee Shops
            </button>
            <button onClick={() => setInputValue(JSON.stringify({type: "airport_services", query: "restaurants"}, null, 2))}>
              Restaurants
            </button>
            <button onClick={() => setInputValue(JSON.stringify({type: "airport_services", query: "gift shops"}, null, 2))}>
              Gift Shops
            </button>
            <button onClick={() => setInputValue(JSON.stringify({type: "airport_services", query: "clothing"}, null, 2))}>
              Clothing
            </button>
            <button onClick={() => setInputValue(JSON.stringify({type: "airport_services", query: "lounge"}, null, 2))}>
              Lounges
            </button>
          </div>
        </div>
      )}
      
      <div className="messages-container">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <div className={`message-content ${message.isJson ? 'json-content' : ''}`}>
              {message.isJson ? (
                <pre className="json-display">{message.text}</pre>
              ) : (
                message.text
              )}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSendMessage} className="input-form">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={isJsonMode ? 'Enter your JSON request here...' : 'Ask me about airport services! e.g., "I need coffee", "Show me restaurants", "Gift shops near gate A15"'}
          className="message-input"
          rows={isJsonMode ? 4 : 1}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
