import React from 'react';

/**
 * AI Conversation Engine - Implements Gen AI concepts for intelligent responses
 * Features: Context awareness, intent recognition, personalized responses, learning patterns
 */

class AIConversationEngine {
  constructor() {
    this.conversationHistory = [];
    this.userPreferences = {};
    this.contextMemory = new Map();
    this.intentPatterns = this.initializeIntentPatterns();
    this.personalityTraits = {
      helpfulness: 0.9,
      friendliness: 0.8,
      proactiveness: 0.7,
      formality: 0.6
    };
  }

  /**
   * Initialize intent recognition patterns using NLP-like concepts
   */
  initializeIntentPatterns() {
    return {
      // Intent categories with pattern matching
      greeting: {
        patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'greetings'],
        response_style: 'friendly_greeting',
        confidence_threshold: 0.8
      },
      food_search: {
        patterns: ['food', 'eat', 'hungry', 'restaurant', 'cafe', 'coffee', 'snack', 'meal', 'dining'],
        entities: ['terminal', 'gate', 'time', 'dietary_preference'],
        response_style: 'helpful_recommendation',
        confidence_threshold: 0.7
      },
      shopping: {
        patterns: ['shop', 'buy', 'gift', 'souvenir', 'store', 'mall', 'purchase', 'electronics'],
        entities: ['item_type', 'budget', 'recipient'],
        response_style: 'product_guidance',
        confidence_threshold: 0.7
      },
      lounge_access: {
        patterns: ['lounge', 'rest', 'relax', 'quiet', 'wifi', 'work space', 'comfortable'],
        entities: ['airline', 'class', 'access_type'],
        response_style: 'access_guidance',
        confidence_threshold: 0.75
      },
      navigation: {
        patterns: ['where', 'how to get', 'direction', 'find', 'locate', 'map'],
        entities: ['location', 'terminal', 'gate'],
        response_style: 'directional_guidance',
        confidence_threshold: 0.8
      },
      time_sensitive: {
        patterns: ['urgent', 'quick', 'fast', 'hurry', 'time', 'late', 'soon'],
        response_style: 'priority_assistance',
        confidence_threshold: 0.8
      },
      complaint: {
        patterns: ['problem', 'issue', 'wrong', 'bad', 'terrible', 'disappointed', 'complaint'],
        response_style: 'empathetic_support',
        confidence_threshold: 0.7
      }
    };
  }

  /**
   * Advanced intent recognition with confidence scoring
   */
  recognizeIntent(message) {
    const normalizedMessage = message.toLowerCase();
    const words = normalizedMessage.split(/\s+/);
    
    let bestIntent = null;
    let highestConfidence = 0;
    let extractedEntities = {};

    for (const [intentName, intentData] of Object.entries(this.intentPatterns)) {
      let confidence = 0;
      let matchedPatterns = 0;

      // Pattern matching with weighted scoring
      for (const pattern of intentData.patterns) {
        if (normalizedMessage.includes(pattern)) {
          matchedPatterns++;
          // Weight longer patterns more heavily
          confidence += (pattern.split(' ').length / words.length) * 0.8;
        }
      }

      // Contextual bonus (if we've seen similar intents recently)
      if (this.getRecentIntentContext().includes(intentName)) {
        confidence += 0.2;
      }

      // Normalize confidence score
      confidence = Math.min(confidence, 1.0);

      if (confidence >= intentData.confidence_threshold && confidence > highestConfidence) {
        highestConfidence = confidence;
        bestIntent = {
          name: intentName,
          confidence: confidence,
          response_style: intentData.response_style,
          entities: this.extractEntities(normalizedMessage, intentData.entities || [])
        };
      }
    }

    return bestIntent || {
      name: 'general_inquiry',
      confidence: 0.5,
      response_style: 'helpful_general',
      entities: {}
    };
  }

  /**
   * Entity extraction for structured data from user messages
   */
  extractEntities(message, entityTypes) {
    const entities = {};
    
    // Terminal extraction
    if (entityTypes.includes('terminal')) {
      const terminalMatch = message.match(/terminal\s*([a-z0-9]+)/i);
      if (terminalMatch) entities.terminal = terminalMatch[1].toUpperCase();
    }

    // Gate extraction
    if (entityTypes.includes('gate')) {
      const gateMatch = message.match(/gate\s*([a-z0-9]+)/i);
      if (gateMatch) entities.gate = gateMatch[1].toUpperCase();
    }

    // Time extraction
    if (entityTypes.includes('time')) {
      const timePatterns = [
        /(\d{1,2}:\d{2})/,
        /(morning|afternoon|evening|night)/i,
        /(early|late|now|soon)/i
      ];
      for (const pattern of timePatterns) {
        const match = message.match(pattern);
        if (match) {
          entities.time = match[1];
          break;
        }
      }
    }

    // Dietary preferences
    if (entityTypes.includes('dietary_preference')) {
      const dietaryPatterns = ['vegetarian', 'vegan', 'gluten.free', 'halal', 'kosher', 'healthy'];
      for (const diet of dietaryPatterns) {
        if (message.includes(diet)) {
          entities.dietary_preference = diet;
          break;
        }
      }
    }

    return entities;
  }

  /**
   * Context-aware response generation with number selection and typo handling
   */
  generateIntelligentResponse(message, airportData, searchResults) {
    try {
      console.log('🧠 AI Engine: Starting intelligent response generation');
      console.log('📝 Original message:', message);
      
      // Check if this is a number selection first
      const numberSelection = this.isNumberSelection(message);
      if (numberSelection && this.lastSearchResults) {
        console.log('🔢 Number selection detected:', numberSelection);
        const selectionResult = this.handleNumberSelection(numberSelection, this.lastSearchResults);
        if (selectionResult) {
          return selectionResult.message;
        }
      }
      
      // Apply typo correction
      const correctedMessage = this.correctTypos(message);
      const finalMessage = correctedMessage !== message.toLowerCase() ? correctedMessage : message;
      
      console.log('📝 Final message after correction:', finalMessage);
      console.log('📍 Airport:', airportData);
      console.log('🔍 Search results:', searchResults);
      
      // Store search results for potential number selection
      if (searchResults && searchResults.services && searchResults.services.length > 0) {
        this.setLastSearchResults(searchResults);
      }
      
      const intent = this.recognizeIntent(finalMessage);
      console.log('🎯 Recognized intent:', intent);
      
      this.updateConversationHistory(finalMessage, intent);

      // Generate response based on intent and context
      const responseContext = {
        intent: intent,
        searchResults: searchResults,
        userHistory: this.getUserPattern(),
        currentAirport: airportData,
        conversationFlow: this.analyzeConversationFlow(),
        originalMessage: message,
        correctedMessage: finalMessage,
        hadTypoCorrection: correctedMessage !== message.toLowerCase()
      };

      console.log('🔧 Response context:', responseContext);
      
      const response = this.craftPersonalizedResponse(responseContext);
      console.log('✅ Generated response:', response);
      
      return response;
    } catch (error) {
      console.error('❌ Error in AI engine:', error);
      return `I'm having trouble processing your request right now. Could you try asking in a different way? I can help you find airport services like restaurants, coffee shops, shopping, and lounges.`;
    }
  }

  /**
   * Craft personalized responses using AI concepts with number selection support
   */
  craftPersonalizedResponse(context) {
    try {
      const { intent, searchResults, userHistory, currentAirport, hadTypoCorrection, originalMessage, correctedMessage } = context;
      
      console.log('🎨 Crafting personalized response...');
      console.log('🎯 Intent:', intent.name);
      console.log('📊 Search results count:', searchResults?.services?.length || 0);
      
      let response = '';
      
      // Add typo correction feedback if applicable
      if (hadTypoCorrection) {
        response += `🔧 *I understood "${originalMessage}" as "${correctedMessage}"*\n\n`;
      }
      
      // Simple response opening based on intent
      response += this.generateResponseOpening(intent);
      console.log('✅ Generated opening');
      
      // Core content based on search results and context
      if (searchResults && searchResults.services && searchResults.services.length > 0) {
        console.log('📋 Generating service recommendations...');
        response += this.generateServiceRecommendations(searchResults, intent, userHistory);
        console.log('✅ Generated service recommendations');
        
        // Add number selection hint
        if (searchResults.services.length > 1) {
          response += `\n💡 **Quick Tip**: Type a number (1, 2, 3...) to get detailed info about any option above!\n`;
        }
      } else {
        console.log('💡 Generating alternative suggestions...');
        response += this.generateAlternativeSuggestions(intent, currentAirport);
        console.log('✅ Generated alternative suggestions');
      }
      
      // Add simple closing
      response += "\n💬 **Need help with anything else?** Just ask naturally! I'm here to help! 😊";
      
      console.log('🎉 Final response length:', response.length);
      return response;
    } catch (error) {
      console.error('❌ Error crafting response:', error);
      return `🤖 **AI Assistant**: I found some information about "${context.intent?.name || 'your request'}" but I'm having trouble formatting it perfectly. Let me help you with a quick summary: I can assist you with finding airport services, restaurants, coffee shops, shopping, and more! What specific service are you looking for?`;
    }
  }

  /**
   * Generate contextual response openings
   */
  generateResponseOpening(intent) {
    const openings = {
      greeting: [
        "Hello! Welcome to your personal airport assistant! ✈️",
        "Hi there! I'm here to make your airport experience smoother! 🌟",
        "Great to see you! Let's find exactly what you need! 👋"
      ],
      food_search: [
        "I'd love to help you find the perfect dining option! 🍽️",
        "Let me find some great food choices for you! 👨‍🍳",
        "Perfect timing for a food search! Here's what I found: 🔍"
      ],
      time_sensitive: [
        "I understand you're in a hurry! Let me get you quick answers: ⚡",
        "Time is important - here are your fastest options: 🏃‍♂️",
        "Quick assistance coming right up! ⏰"
      ],
      complaint: [
        "I'm sorry to hear you're having issues. Let me help resolve this! 🤝",
        "I understand your frustration. Let's find a solution together! 💙",
        "Thank you for bringing this to my attention. Here's how I can help: 🛠️"
      ]
    };

    const styleOpenings = openings[intent.name] || [
      "I'm here to help! Let me find what you're looking for! 🎯",
      "Great question! Here's what I discovered: 🔍",
      "I've got some excellent options for you! ✨"
    ];

    return styleOpenings[Math.floor(Math.random() * styleOpenings.length)] + "\n\n";
  }

  /**
   * Generate intelligent service recommendations
   */
  generateServiceRecommendations(searchResults, intent, userHistory) {
    let recommendations = '';
    
    // Prioritize results based on user patterns and context
    const prioritizedServices = this.prioritizeServices(searchResults.services, intent, userHistory);
    
    // Add contextual insights
    if (intent.entities.time) {
      recommendations += `🕐 **Time-Aware Suggestions** (${intent.entities.time}):\n`;
    }
    
    if (intent.entities.terminal || intent.entities.gate) {
      const location = intent.entities.terminal || intent.entities.gate;
      recommendations += `📍 **Located near ${location}**:\n`;
    }

    // Generate smart descriptions for each service
    prioritizedServices.slice(0, 5).forEach((service, index) => {
      recommendations += this.generateSmartServiceDescription(service, intent, index);
    });

    return recommendations + "\n";
  }

  /**
   * Generate smart service descriptions with AI insights
   */
  generateSmartServiceDescription(service, intent, index) {
    let description = `**${index + 1}. ${service.name}** (${service.terminal || 'N/A'})\n`;
    
    // Add relevant highlights based on intent
    if (intent.name === 'time_sensitive') {
      description += `   ⚡ **Quick Option**: ${service.description || 'Fast service available'}\n`;
      if (service.features && service.features.includes('mobile_order')) {
        description += `   📱 **Time Saver**: Mobile ordering available!\n`;
      }
    } else if (intent.name === 'food_search' && intent.entities.dietary_preference) {
      description += `   🥗 **Diet-Friendly**: Great for ${intent.entities.dietary_preference} options\n`;
    }
    
    // Add smart recommendations
    if (service.rating && service.rating >= 4.0) {
      description += `   ⭐ **Highly Rated**: ${service.rating}/5 stars - Customer favorite!\n`;
    }
    
    if (service.priceRange) {
      const priceContext = this.getPriceContext(service.priceRange);
      description += `   💰 **Pricing**: ${priceContext}\n`;
    }
    
    description += `   📍 ${service.location || 'Location info available'} | 🕒 ${service.hours || 'Check hours'}\n`;
    if (service.orderUrl) {
      description += `   🔗 ${service.orderUrl}\n`;
    }
    description += `\n`;
    
    return description;
  }

  /**
   * Generate proactive suggestions based on AI analysis
   */
  generateProactiveSuggestions(intent, userHistory, currentAirport) {
    let suggestions = "🤖 **AI Suggestions**:\n";
    
    // Time-based suggestions
    const currentHour = new Date().getHours();
    if (currentHour < 10 && intent.name === 'food_search') {
      suggestions += "• Since it's morning, consider grabbing a coffee and breakfast combo!\n";
    } else if (currentHour > 20) {
      suggestions += "• It's evening - maybe check out a lounge for a relaxing environment!\n";
    }
    
    // Pattern-based suggestions
    if (userHistory.frequentCategories.includes('coffee')) {
      suggestions += "• I noticed you like coffee - there's a premium roastery in Terminal B!\n";
    }
    
    // Contextual travel suggestions
    if (currentAirport) {
      suggestions += `• Don't miss ${currentAirport.city}'s local specialties available at the airport!\n`;
    }
    
    suggestions += "• Need anything else? Just ask naturally - I understand context! 😊\n\n";
    
    return suggestions;
  }

  /**
   * Generate conversational closings
   */
  generateResponseClosing(intent) {
    const closings = [
      "What else can I help you discover? 🌟",
      "Any other questions about your airport experience? 💬",
      "Feel free to ask about anything else - I'm here to help! 🤝",
      "Is there anything specific you'd like to know more about? 🔍"
    ];
    
    return closings[Math.floor(Math.random() * closings.length)];
  }

  /**
   * Learn from user interactions for continuous improvement
   */
  updateConversationHistory(message, intent) {
    const timestamp = new Date();
    const interaction = {
      message,
      intent: intent.name,
      confidence: intent.confidence,
      timestamp,
      entities: intent.entities
    };
    
    this.conversationHistory.push(interaction);
    
    // Keep only last 50 interactions for performance
    if (this.conversationHistory.length > 50) {
      this.conversationHistory.shift();
    }
    
    // Update user patterns
    this.updateUserPattern(intent);
  }

  /**
   * Analyze user patterns for personalization
   */
  updateUserPattern(intent) {
    if (!this.userPreferences.frequentIntents) {
      this.userPreferences.frequentIntents = {};
    }
    
    if (!this.userPreferences.frequentIntents[intent.name]) {
      this.userPreferences.frequentIntents[intent.name] = 0;
    }
    
    this.userPreferences.frequentIntents[intent.name]++;
    
    // Update frequent categories
    if (!this.userPreferences.frequentCategories) {
      this.userPreferences.frequentCategories = [];
    }
    
    const categoryMapping = {
      food_search: 'dining',
      shopping: 'retail',
      lounge_access: 'lounges'
    };
    
    const category = categoryMapping[intent.name];
    if (category && !this.userPreferences.frequentCategories.includes(category)) {
      this.userPreferences.frequentCategories.push(category);
    }
  }

  /**
   * Get user interaction patterns
   */
  getUserPattern() {
    return {
      frequentIntents: Object.keys(this.userPreferences.frequentIntents || {}),
      frequentCategories: this.userPreferences.frequentCategories || [],
      totalInteractions: this.conversationHistory.length,
      recentActivity: this.conversationHistory.slice(-5)
    };
  }

  /**
   * Get recent intent context for conversation flow
   */
  getRecentIntentContext() {
    return this.conversationHistory
      .slice(-3)
      .map(interaction => interaction.intent);
  }

  /**
   * Analyze conversation flow for context awareness
   */
  analyzeConversationFlow() {
    const recentIntents = this.getRecentIntentContext();
    
    return {
      isFollowUp: recentIntents.length > 1,
      dominantTheme: this.getDominantTheme(recentIntents),
      conversationDepth: this.conversationHistory.length,
      lastInteractionTime: this.conversationHistory.length > 0 
        ? this.conversationHistory[this.conversationHistory.length - 1].timestamp 
        : null
    };
  }

  /**
   * Prioritize services based on AI analysis
   */
  prioritizeServices(services, intent, userHistory) {
    return services.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;
      
      // Rating score
      scoreA += (a.rating || 3) * 0.3;
      scoreB += (b.rating || 3) * 0.3;
      
      // User pattern bonus
      if (userHistory.frequentCategories.includes(a.category)) scoreA += 1;
      if (userHistory.frequentCategories.includes(b.category)) scoreB += 1;
      
      // Time-sensitive bonus
      if (intent.name === 'time_sensitive') {
        if (a.features?.includes('mobile_order')) scoreA += 0.5;
        if (b.features?.includes('mobile_order')) scoreB += 0.5;
      }
      
      // Location relevance
      if (intent.entities.terminal) {
        if (a.terminal?.includes(intent.entities.terminal)) scoreA += 0.8;
        if (b.terminal?.includes(intent.entities.terminal)) scoreB += 0.8;
      }
      
      return scoreB - scoreA;
    });
  }

  /**
   * Helper methods
   */
  getDominantTheme(intents) {
    const counts = {};
    intents.forEach(intent => {
      counts[intent] = (counts[intent] || 0) + 1;
    });
    
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, 'general');
  }

  getPriceContext(priceRange) {
    const contexts = {
      '$': 'Budget-friendly option',
      '$$': 'Moderate pricing',
      '$$$': 'Premium experience',
      '$$$$': 'Luxury dining'
    };
    return contexts[priceRange] || 'Pricing varies';
  }

  generateAlternativeSuggestions(intent, currentAirport) {
    return `I didn't find exact matches, but here are some alternatives:\n\n` +
           `• Try browsing by category using the facility icons below\n` +
           `• Ask about specific terminals or gate areas\n` +
           `• I can help you find similar services in ${currentAirport?.city || 'your area'}\n\n`;
  }

  /**
   * Store last search results for number-based selection
   */
  setLastSearchResults(results) {
    this.lastSearchResults = results;
    this.lastSearchTimestamp = Date.now();
  }

  /**
   * Handle number-based selection from previous results
   */
  handleNumberSelection(number, searchResults) {
    if (!searchResults || !searchResults.services) {
      return null;
    }

    const selectedIndex = parseInt(number) - 1;
    if (selectedIndex >= 0 && selectedIndex < searchResults.services.length) {
      const selectedService = searchResults.services[selectedIndex];
      return {
        type: 'number_selection',
        selectedService: selectedService,
        message: this.generateDetailedServiceInfo(selectedService)
      };
    }
    return null;
  }

  /**
   * Generate detailed information for selected service
   */
  generateDetailedServiceInfo(service) {
    let details = `🎯 **${service.name}** - Detailed Information\n\n`;
    
    details += `📍 **Location**: ${service.location}\n`;
    details += `🏢 **Terminal**: ${service.terminal}\n`;
    details += `⭐ **Rating**: ${service.rating}/5 stars\n`;
    details += `🕒 **Hours**: ${service.hours}\n`;
    
    if (service.priceRange) {
      details += `💰 **Price Range**: ${service.priceRange}\n`;
    }
    
    if (service.phone) {
      details += `📞 **Phone**: ${service.phone}\n`;
    }
    
    if (service.specialties && service.specialties.length > 0) {
      details += `\n✨ **Specialties**:\n`;
      service.specialties.forEach(specialty => {
        details += `• ${specialty}\n`;
      });
    }
    
    if (service.menu && service.menu.length > 0) {
      details += `\n🍽️ **Popular Menu Items**:\n`;
      service.menu.forEach(item => {
        details += `• ${item}\n`;
      });
    }
    
    if (service.products && service.products.length > 0) {
      details += `\n🛍️ **Available Products**:\n`;
      service.products.forEach(product => {
        details += `• ${product}\n`;
      });
    }
    
    if (service.amenities && service.amenities.length > 0) {
      details += `\n🎯 **Amenities**:\n`;
      service.amenities.forEach(amenity => {
        details += `• ${amenity}\n`;
      });
    }
    
    // Add helpful information
    const features = [];
    if (service.wifi) features.push("📶 Free WiFi");
    if (service.delivery) features.push("🚚 Delivery Available");
    if (service.takeaway) features.push("🥡 Takeaway");
    if (service.mobile_order) features.push("📱 Mobile Ordering");
    if (service.reservations) features.push("📞 Reservations Accepted");
    
    if (features.length > 0) {
      details += `\n🌟 **Features**: ${features.join(" | ")}\n`;
    }
    
    details += `\n💡 **Need directions or have more questions?** Just ask me!`;
    
    return details;
  }

  /**
   * Advanced typo correction using Levenshtein distance and phonetic matching
   */
  correctTypos(query) {
    const commonAirportTerms = [
      // Food & Dining
      'starbucks', 'dunkin', 'mcdonalds', 'subway', 'pizza', 'burger', 'coffee', 'restaurant',
      'food', 'dining', 'cafe', 'bar', 'snack', 'breakfast', 'lunch', 'dinner',
      
      // Shopping
      'shop', 'store', 'gift', 'souvenir', 'electronics', 'duty-free', 'pharmacy', 'bookstore',
      
      // Services
      'lounge', 'bathroom', 'restroom', 'wifi', 'charging', 'atm', 'bank', 'currency',
      'information', 'help', 'desk', 'lost', 'found', 'security', 'baggage',
      
      // Locations
      'terminal', 'gate', 'concourse', 'arrival', 'departure', 'entrance', 'exit',
      'parking', 'garage', 'transportation', 'taxi', 'uber', 'shuttle',
      
      // Common airport brands
      'hudson', 'cibo', 'brookstone', 'sunglass', 'hut', 'auntie', 'anne',
      'cinnabon', 'panda', 'express', 'chilis', 'california', 'kitchen'
    ];

    const words = query.toLowerCase().split(/\s+/);
    const correctedWords = words.map(word => {
      if (word.length < 3) return word; // Skip very short words
      
      let bestMatch = word;
      let minDistance = Infinity;
      
      // Check against common terms
      for (const term of commonAirportTerms) {
        const distance = this.levenshteinDistance(word, term);
        const threshold = Math.min(2, Math.floor(word.length / 3)); // Allow 1-2 character differences
        
        if (distance < minDistance && distance <= threshold) {
          minDistance = distance;
          bestMatch = term;
        }
      }
      
      // Phonetic corrections for common misspellings
      const phoneticCorrections = {
        'cofee': 'coffee',
        'coffe': 'coffee',
        'resterant': 'restaurant',
        'resturant': 'restaurant',
        'restraunt': 'restaurant',
        'piza': 'pizza',
        'burguer': 'burger',
        'hamburguer': 'burger',
        'shopp': 'shop',
        'shoping': 'shopping',
        'bagage': 'baggage',
        'lugage': 'luggage',
        'airpot': 'airport',
        'termial': 'terminal',
        'gaet': 'gate',
        'lounj': 'lounge',
        'starbuks': 'starbucks',
        'starbuk': 'starbucks',
        'makdonalds': 'mcdonalds',
        'macdonald': 'mcdonalds'
      };
      
      if (phoneticCorrections[word]) {
        return phoneticCorrections[word];
      }
      
      return bestMatch;
    });

    const correctedQuery = correctedWords.join(' ');
    
    // Log corrections if any were made
    if (correctedQuery !== query.toLowerCase()) {
      console.log(`🔧 Typo correction: "${query}" → "${correctedQuery}"`);
    }
    
    return correctedQuery;
  }

  /**
   * Calculate Levenshtein distance for typo detection
   */
  levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  /**
   * Detect if input is a number selection
   */
  isNumberSelection(message) {
    const trimmed = message.trim();
    const numberMatch = trimmed.match(/^(\d+)$/);
    
    if (numberMatch) {
      const number = parseInt(numberMatch[1]);
      return number >= 1 && number <= 20; // Support selections 1-20
    }
    
    // Also handle written numbers
    const writtenNumbers = {
      'one': 1, 'first': 1,
      'two': 2, 'second': 2,
      'three': 3, 'third': 3,
      'four': 4, 'fourth': 4,
      'five': 5, 'fifth': 5,
      'six': 6, 'sixth': 6,
      'seven': 7, 'seventh': 7,
      'eight': 8, 'eighth': 8,
      'nine': 9, 'ninth': 9,
      'ten': 10, 'tenth': 10
    };
    
    const lowerTrimmed = trimmed.toLowerCase();
    for (const [word, number] of Object.entries(writtenNumbers)) {
      if (lowerTrimmed === word || lowerTrimmed === `${word} one` || lowerTrimmed === `option ${word}`) {
        return number;
      }
    }
    
    return false;
  }

  // ...existing code...
}

// Export singleton instance
export const aiEngine = new AIConversationEngine();

export default AIConversationEngine;
