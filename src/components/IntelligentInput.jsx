import React, { useState, useEffect, useRef } from 'react';
import { realAirportData } from '../data/realAirportData';

const IntelligentInput = ({ onSubmit, inputValue, setInputValue, disabled = false, placeholder = "Type your message here..." }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(-1);
  const [isTabbing, setIsTabbing] = useState(false);
  const [originalInput, setOriginalInput] = useState('');
  const inputRef = useRef(null);

  // Smart suggestions data
  const smartSuggestions = {
    airports: [
      'ATL - Atlanta', 'JFK - New York', 'LAX - Los Angeles', 'ORD - Chicago',
      'DFW - Dallas', 'SEA - Seattle', 'SFO - San Francisco', 'MIA - Miami',
      'LAS - Las Vegas', 'PHX - Phoenix', 'BOS - Boston', 'MCO - Orlando',
      'CLT - Charlotte', 'DEN - Denver', 'EWR - Newark', 'MSP - Minneapolis',
      'DTW - Detroit', 'PHL - Philadelphia', 'LGA - LaGuardia', 'IAD - Washington DC'
    ],
    services: [
      'coffee', 'starbucks', 'food', 'restaurants', 'lounges', 'shopping',
      'duty free', 'gift shops', 'electronics', 'pharmacy', 'ATM',
      'currency exchange', 'car rental', 'spa', 'massage', 'wifi'
    ],
    brands: [
      'Starbucks', 'Chick-fil-A', 'Popeyes', 'Shake Shack', 'Hudson News',
      'Delta Sky Club', 'United Club', 'Centurion Lounge', 'Duty Free Americas',
      'MAC Cosmetics', 'Brookstone', 'InMotion Entertainment'
    ],
    terminals: [
      'Terminal A', 'Terminal B', 'Terminal C', 'Terminal D', 'Terminal E',
      'Concourse A', 'Concourse B', 'Concourse C', 'Gate A15', 'Gate B20'
    ],
    common_queries: [
      'Find coffee near gate',
      'Show me restaurants at',
      'Where is Starbucks at',
      'Lounges at airport',
      'Food options in terminal',
      'Shopping near gate',
      'ATM locations at',
      'Duty free stores',
      'Quick food before flight',
      'Business lounge access'
    ]
  };

  // Generate intelligent suggestions based on input
  const generateSuggestions = (input) => {
    if (!input || input.length < 2) {
      // Return fallback suggestions when no input
      return [
        { text: 'Find coffee', type: 'common', icon: '☕', completion: 'Find coffee' },
        { text: 'Show restaurants', type: 'common', icon: '🍽️', completion: 'Show restaurants' },
        { text: 'Find lounges', type: 'common', icon: '🛋️', completion: 'Find lounges' },
        { text: 'Shopping options', type: 'common', icon: '🛍️', completion: 'Shopping options' },
        { text: 'ATM locations', type: 'common', icon: '💰', completion: 'ATM locations' }
      ];
    }

    const lowerInput = input.toLowerCase();
    const suggestions = [];

    // Airport suggestions
    smartSuggestions.airports.forEach(airport => {
      if (airport.toLowerCase().includes(lowerInput)) {
        suggestions.push({
          text: airport,
          type: 'airport',
          icon: '✈️',
          completion: airport.split(' - ')[0]
        });
      }
    });

    // Service suggestions
    smartSuggestions.services.forEach(service => {
      if (service.toLowerCase().includes(lowerInput)) {
        suggestions.push({
          text: service,
          type: 'service',
          icon: '🔍',
          completion: service
        });
      }
    });

    // Brand suggestions
    smartSuggestions.brands.forEach(brand => {
      if (brand.toLowerCase().includes(lowerInput)) {
        suggestions.push({
          text: brand,
          type: 'brand',
          icon: '🏪',
          completion: brand
        });
      }
    });

    // Real data suggestions from airport services
    const realDataSuggestions = realAirportData
      .filter(service => 
        service.name.toLowerCase().includes(lowerInput) ||
        service.airport.toLowerCase().includes(lowerInput) ||
        service.type.toLowerCase().includes(lowerInput)
      )
      .slice(0, 5)
      .map(service => ({
        text: `${service.name} at ${service.airport.match(/\(([^)]+)\)/)?.[1] || service.airport}`,
        type: 'real_service',
        icon: '📍',
        completion: `${service.name} at ${service.airport.match(/\(([^)]+)\)/)?.[1]}`
      }));

    suggestions.push(...realDataSuggestions);

    // Common query suggestions
    smartSuggestions.common_queries.forEach(query => {
      if (query.toLowerCase().includes(lowerInput)) {
        suggestions.push({
          text: query,
          type: 'query',
          icon: '💬',
          completion: query
        });
      }
    });

    return suggestions.slice(0, 8); // Limit to 8 suggestions
  };

  // Handle input change with tab completion support
  const handleInputChange = (e) => {
    if (disabled) return; // Prevent input when disabled
    const value = e.target.value;
    setInputValue(value);
    
    // Reset tab completion state when user types
    if (!isTabbing) {
      setCurrentSuggestionIndex(-1);
      setOriginalInput(value);
    }
    setIsTabbing(false);
    
    const newSuggestions = generateSuggestions(value);
    setSuggestions(newSuggestions);
  };

  // Handle keyboard navigation and tab completion
  const handleKeyDown = (e) => {
    // Always generate current suggestions for Tab completion
    const currentSuggestions = generateSuggestions(inputValue);
    
    if (e.key === 'Tab') {
      e.preventDefault();
      
      if (currentSuggestions.length === 0) {
        // If no suggestions, do nothing
        return;
      }
      
      if (!isTabbing) {
        // Start tab completion
        setIsTabbing(true);
        setCurrentSuggestionIndex(0);
        setOriginalInput(inputValue);
        setInputValue(currentSuggestions[0].completion);
        setSuggestions(currentSuggestions);
      } else {
        // Cycle through suggestions
        const nextIndex = (currentSuggestionIndex + 1) % currentSuggestions.length;
        setCurrentSuggestionIndex(nextIndex);
        setInputValue(currentSuggestions[nextIndex].completion);
      }
      return;
    }

    if (e.key === 'Escape' && isTabbing) {
      // Reset to original input
      e.preventDefault();
      setInputValue(originalInput);
      setIsTabbing(false);
      setCurrentSuggestionIndex(-1);
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
      return;
    }

    // Any other key press stops tab completion
    if (isTabbing && e.key !== 'Tab' && e.key !== 'Escape') {
      setIsTabbing(false);
      setCurrentSuggestionIndex(-1);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (disabled) return; // Prevent submission when disabled
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue('');
      setIsTabbing(false);
      setCurrentSuggestionIndex(-1);
      setSuggestions([]);
    }
  };

  // Quick action buttons
  const quickActions = [
    { text: 'Coffee', icon: '☕', query: 'Find coffee' },
    { text: 'Food', icon: '🍽️', query: 'Show restaurants' },
    { text: 'Lounges', icon: '🛋️', query: 'Find lounges' },
    { text: 'Shopping', icon: '🛍️', query: 'Shopping options' },
    { text: 'ATL', icon: '✈️', query: 'Atlanta airport services' },
    { text: 'LAX', icon: '✈️', query: 'LAX airport services' }
  ];

  return (
    <div className="intelligent-input-container">
      {/* Quick Actions */}
      <div className="quick-actions">
        {quickActions.map((action, index) => (
          <button
            key={index}
            className="quick-action-btn"
            onClick={() => {
              if (disabled) return; // Prevent action when disabled
              setInputValue(action.query);
              onSubmit(action.query);
            }}
            disabled={disabled}
            title={disabled ? "Please select an airport location first" : `Quick search: ${action.text}`}
          >
            <span className="quick-action-icon">{action.icon}</span>
            <span className="quick-action-text">{action.text}</span>
          </button>
        ))}
      </div>

      {/* Main Input Area */}
      <div className="input-wrapper">
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="chat-input intelligent-input"
            autoComplete="off"
            disabled={disabled}
          />
          <button 
            onClick={handleSubmit}
            className="send-button"
            disabled={disabled || !inputValue.trim()}
          >
            <span>Send</span>
          </button>
        </div>

        {/* Tab Completion Indicator */}
        {isTabbing && suggestions.length > 0 && (
          <div className="tab-completion-indicator">
            <span className="completion-hint">
              Tab: {currentSuggestionIndex + 1}/{suggestions.length} suggestions
              {suggestions[currentSuggestionIndex] && (
                <span className="current-suggestion">
                  {suggestions[currentSuggestionIndex].icon} {suggestions[currentSuggestionIndex].text}
                </span>
              )}
            </span>
            <span className="escape-hint">Press Esc to cancel</span>
          </div>
        )}
      </div>

      {/* Input Hints */}
      <div className="input-hints">
        <span className="hint">💡 Try: "coffee at JFK", "lounges at LAX", or press Tab for suggestions</span>
      </div>
    </div>
  );
};

export default IntelligentInput;
