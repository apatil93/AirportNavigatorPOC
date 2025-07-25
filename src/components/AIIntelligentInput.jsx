import React, { useState, useEffect, useRef } from 'react';
import { aiEngine } from './AIConversationEngine';

/**
 * AI-Powered Input Component with Gen AI features
 * Features: Intent prediction, contextual suggestions, smart autocomplete, conversation memory
 */
const AIIntelligentInput = ({ 
  value, 
  onChange, 
  onSend, 
  currentAirport, 
  placeholder = "Ask me anything about airport services...",
  conversationHistory = [],
  disabled = false
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [predictedIntent, setPredictedIntent] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [smartSuggestions, setSmartSuggestions] = useState([]);
  const [contextualHints, setContextualHints] = useState([]);
  
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // AI-powered suggestion categories
  const aiSuggestionCategories = {
    number_selection: {
      icon: '🔢',
      title: 'Quick Selection',
      color: '#f59e0b'
    },
    contextual: {
      icon: '🎯',
      title: 'Smart Suggestions',
      color: '#3b82f6'
    },
    predictive: {
      icon: '🔮',
      title: 'Predicted Queries',
      color: '#8b5cf6'
    },
    followup: {
      icon: '💬',
      title: 'Follow-up Questions',
      color: '#10b981'
    },
    proactive: {
      icon: '🤖',
      title: 'AI Recommendations',
      color: '#f59e0b'
    }
  };

  // Real-time intent analysis and prediction (suggestions disabled)
  useEffect(() => {
    if (disabled) {
      setPredictedIntent(null);
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    if (value.length > 2) {
      setIsAnalyzing(true);
      
      // Debounced intent recognition
      const timeoutId = setTimeout(() => {
        try {
          const intent = aiEngine.recognizeIntent(value);
          setPredictedIntent(intent);
          // Suggestions disabled - don't generate AI suggestions
          // generateAISuggestions(value, intent);
        } catch (error) {
          console.error('AI analysis error:', error);
        } finally {
          setIsAnalyzing(false);
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setPredictedIntent(null);
      // Keep suggestions hidden
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [value, currentAirport, conversationHistory, disabled]);

  // Generate number selection suggestions if appropriate
  const generateNumberSelectionHints = () => {
    const hints = [];
    const lastMessages = conversationHistory.slice(-2);
    
    // Check if the last bot message had numbered results
    const lastBotMessage = lastMessages.find(msg => msg.sender === 'bot' && msg.text);
    if (lastBotMessage && lastBotMessage.text.includes('**1.') && lastBotMessage.text.includes('**2.')) {
      // Count how many numbered items were in the response
      const numberMatches = lastBotMessage.text.match(/\*\*(\d+)\./g);
      if (numberMatches && numberMatches.length > 1) {
        const maxNumber = Math.min(numberMatches.length, 5); // Show up to 5 hints
        
        for (let i = 1; i <= maxNumber; i++) {
          hints.push({
            text: `${i}`,
            type: 'number_selection',
            confidence: 0.95,
            description: `Get details for option ${i}`
          });
        }
        
        // Add written number alternatives
        const writtenNumbers = ['one', 'two', 'three', 'four', 'five'];
        if (maxNumber <= 5) {
          hints.push({
            text: writtenNumbers[0], // 'one'
            type: 'number_selection',
            confidence: 0.8,
            description: 'Alternative: type "one" for first option'
          });
        }
      }
    }
    
    return hints;
  };

  // Enhanced suggestion generation with number selection support
  const generateAISuggestions = (query, intent) => {
    const suggestions = [];
    
    // 1. Check for number selection opportunities first
    const numberHints = generateNumberSelectionHints();
    if (numberHints.length > 0 && query.length === 0) {
      suggestions.push(...numberHints);
    }
    
    // 2. Contextual completions based on intent (only if not doing number selection)
    if (intent && intent.confidence > 0.6 && numberHints.length === 0) {
      suggestions.push(...generateContextualCompletions(query, intent));
    }
    
    // 3. Smart follow-up suggestions
    suggestions.push(...generateFollowUpSuggestions(intent));
    
    // 4. Proactive recommendations
    suggestions.push(...generateProactiveRecommendations());
    
    // 5. Location-aware suggestions
    if (currentAirport) {
      suggestions.push(...generateLocationAwareSuggestions(query, currentAirport));
    }

    setSuggestions(suggestions.slice(0, 8)); // Limit to 8 suggestions
    setShowSuggestions(suggestions.length > 0);
  };

  // Generate contextual completions using AI patterns
  const generateContextualCompletions = (query, intent) => {
    const completions = [];
    const lowerQuery = query.toLowerCase();
    
    // Intent-specific smart completions
    switch (intent.name) {
      case 'food_search':
        if (lowerQuery.includes('coffee')) {
          completions.push(
            { text: `${query} near gate`, type: 'contextual', confidence: 0.9 },
            { text: `${query} with wifi and seating`, type: 'contextual', confidence: 0.8 },
            { text: `${query} open early morning`, type: 'contextual', confidence: 0.7 }
          );
        } else if (lowerQuery.includes('restaurant')) {
          completions.push(
            { text: `${query} with vegetarian options`, type: 'contextual', confidence: 0.8 },
            { text: `${query} for quick meals`, type: 'contextual', confidence: 0.9 },
            { text: `${query} in Terminal ${currentAirport ? 'A' : ''}`, type: 'contextual', confidence: 0.7 }
          );
        }
        break;
        
      case 'shopping':
        completions.push(
          { text: `${query} duty free`, type: 'contextual', confidence: 0.8 },
          { text: `${query} electronics store`, type: 'contextual', confidence: 0.7 },
          { text: `${query} souvenirs and gifts`, type: 'contextual', confidence: 0.9 }
        );
        break;
        
      case 'navigation':
        completions.push(
          { text: `${query} directions`, type: 'contextual', confidence: 0.9 },
          { text: `${query} walking time`, type: 'contextual', confidence: 0.8 },
          { text: `${query} nearest restroom`, type: 'contextual', confidence: 0.7 }
        );
        break;
    }
    
    return completions;
  };

  // Generate intelligent follow-up suggestions
  const generateFollowUpSuggestions = (intent) => {
    const followUps = [];
    const userPattern = aiEngine.getUserPattern();
    
    // Based on conversation history
    if (conversationHistory.length > 0) {
      const lastMessage = conversationHistory[conversationHistory.length - 1];
      
      if (lastMessage.text.toLowerCase().includes('coffee')) {
        followUps.push(
          { text: "What about pastries or snacks with coffee?", type: 'followup', confidence: 0.8 },
          { text: "Any coffee shops with comfortable seating?", type: 'followup', confidence: 0.7 }
        );
      } else if (lastMessage.text.toLowerCase().includes('restaurant')) {
        followUps.push(
          { text: "What are the price ranges for dining options?", type: 'followup', confidence: 0.8 },
          { text: "Which restaurants take mobile orders?", type: 'followup', confidence: 0.9 }
        );
      }
    }
    
    // Based on user patterns
    if (userPattern.frequentCategories.includes('dining')) {
      followUps.push(
        { text: "Show me highly rated restaurants", type: 'followup', confidence: 0.9 },
        { text: "What's new in dining options?", type: 'followup', confidence: 0.7 }
      );
    }
    
    return followUps;
  };

  // Generate proactive AI recommendations
  const generateProactiveRecommendations = () => {
    const recommendations = [];
    const currentHour = new Date().getHours();
    const userPattern = aiEngine.getUserPattern();
    
    // Time-based recommendations
    if (currentHour < 10) {
      recommendations.push(
        { text: "Find breakfast options and morning coffee", type: 'proactive', confidence: 0.9 },
        { text: "Show me places to grab a quick bite", type: 'proactive', confidence: 0.8 }
      );
    } else if (currentHour > 18) {
      recommendations.push(
        { text: "Find a comfortable lounge to relax", type: 'proactive', confidence: 0.8 },
        { text: "What dinner options are still open?", type: 'proactive', confidence: 0.7 }
      );
    }
    
    // Pattern-based recommendations
    if (userPattern.totalInteractions === 0) {
      recommendations.push(
        { text: "What services are available at this airport?", type: 'proactive', confidence: 0.9 },
        { text: "Show me the most popular dining spots", type: 'proactive', confidence: 0.8 }
      );
    }
    
    return recommendations;
  };

  // Generate location-aware suggestions
  const generateLocationAwareSuggestions = (query, airport) => {
    const locationSuggestions = [];
    
    if (airport.city) {
      locationSuggestions.push(
        { text: `Find ${airport.city} local specialties`, type: 'contextual', confidence: 0.8 },
        { text: `What's unique to ${airport.city} airport?`, type: 'contextual', confidence: 0.7 }
      );
    }
    
    // Terminal-specific suggestions
    if (airport.terminals && airport.terminals.length > 1) {
      locationSuggestions.push(
        { text: `Compare options across all terminals`, type: 'contextual', confidence: 0.8 },
        { text: `What's available in Terminal ${airport.terminals[0]}?`, type: 'contextual', confidence: 0.7 }
      );
    }
    
    return locationSuggestions;
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
        
      case 'Tab':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          applySuggestion(suggestions[selectedSuggestionIndex]);
        } else if (suggestions.length > 0) {
          applySuggestion(suggestions[0]);
        }
        break;
        
      case 'Enter':
        if (selectedSuggestionIndex >= 0) {
          e.preventDefault();
          applySuggestion(suggestions[selectedSuggestionIndex]);
        }
        break;
        
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  // Apply selected suggestion
  const applySuggestion = (suggestion) => {
    onChange(suggestion.text);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    inputRef.current?.focus();
  };

  // Handle input changes
  const handleInputChange = (e) => {
    if (disabled) return; // Prevent input when disabled
    onChange(e.target.value);
    if (selectedSuggestionIndex >= 0) {
      setSelectedSuggestionIndex(-1);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (disabled) return; // Prevent submission when disabled
    if (value.trim()) {
      onSend(value);
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };

  return (
    <div className="ai-intelligent-input">
      {/* Intent Prediction Display */}
      {predictedIntent && predictedIntent.confidence > 0.7 && (
        <div className="intent-prediction">
          <div className="intent-indicator">
            <span className="intent-icon">🧠</span>
            <span className="intent-text">
              AI detected: <strong>{predictedIntent.name.replace('_', ' ')}</strong>
              <span className="confidence">{Math.round(predictedIntent.confidence * 100)}% confident</span>
            </span>
            {isAnalyzing && <span className="analyzing-indicator">🔄</span>}
          </div>
        </div>
      )}

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-container">
          <textarea
            ref={inputRef}
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`ai-message-input ${disabled ? 'disabled' : ''}`}
            rows={1}
            disabled={disabled}
            onFocus={() => !disabled && value.length > 2 && setShowSuggestions(suggestions.length > 0)}
          />
          <button 
            type="submit" 
            className="ai-send-button"
            disabled={disabled || !value.trim()}
          >
            <span className="send-icon">🚀</span>
            <span className="send-text">Send</span>
          </button>
        </div>

        {/* AI-Powered Suggestions Dropdown - DISABLED */}
        {false && showSuggestions && suggestions.length > 0 && (
          <div ref={suggestionsRef} className="ai-suggestions-dropdown">
            <div className="suggestions-header">
              <span className="ai-badge">🤖 AI Suggestions</span>
              <span className="suggestions-count">{suggestions.length} options</span>
            </div>
            
            {Object.entries(
              suggestions.reduce((groups, suggestion) => {
                if (!groups[suggestion.type]) groups[suggestion.type] = [];
                groups[suggestion.type].push(suggestion);
                return groups;
              }, {})
            ).map(([type, typeSuggestions]) => (
              <div key={type} className="suggestion-group">
                <div className="group-header">
                  <span className="group-icon">{aiSuggestionCategories[type]?.icon || '💡'}</span>
                  <span className="group-title">{aiSuggestionCategories[type]?.title || 'Suggestions'}</span>
                </div>
                
                {typeSuggestions.map((suggestion, index) => {
                  const globalIndex = suggestions.indexOf(suggestion);
                  const isNumberSelection = suggestion.type === 'number_selection';
                  return (
                    <div
                      key={globalIndex}
                      className={`suggestion-item ${globalIndex === selectedSuggestionIndex ? 'selected' : ''} ${isNumberSelection ? 'number-selection' : ''}`}
                      onClick={() => applySuggestion(suggestion)}
                      style={{ borderLeft: `3px solid ${aiSuggestionCategories[type]?.color || '#6b7280'}` }}
                    >
                      <div className="suggestion-text">{suggestion.text}</div>
                      {suggestion.description && (
                        <div className="suggestion-description">{suggestion.description}</div>
                      )}
                      <div className="suggestion-meta">
                        <span className="confidence-indicator">
                          {Math.round(suggestion.confidence * 100)}% match
                        </span>
                        <span className="suggestion-type">{type.replace('_', ' ')}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
            
            <div className="suggestions-footer">
              <span className="usage-hint">
                Use ↑↓ to navigate, Tab/Enter to select, Esc to close
              </span>
            </div>
          </div>
        )}
      </form>

      {/* Smart Context Hints */}
      {predictedIntent && predictedIntent.entities && Object.keys(predictedIntent.entities).length > 0 && (
        <div className="context-hints">
          <div className="hints-title">🎯 Detected Context:</div>
          <div className="entity-tags">
            {Object.entries(predictedIntent.entities).map(([key, value]) => (
              <span key={key} className="entity-tag">
                {key}: <strong>{value}</strong>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIIntelligentInput;
