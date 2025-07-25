import React, { useState } from 'react';
import { sampleConversations } from '../data/dummyConversations';
import { travelConversations } from '../data/travelData';
import '../styles/History.css';

const History = () => {
  const [conversations] = useState([...sampleConversations, ...travelConversations]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getConversationPreview = (messages) => {
    if (messages.length > 0) {
      return messages[0].text.length > 100 
        ? messages[0].text.substring(0, 100) + '...'
        : messages[0].text;
    }
    return "No messages";
  };

  return (
    <div className="history-container">
      <h1>🕒 Airport Assistant History</h1>
      <p className="history-subtitle">Your recent conversations with Airport Assistant</p>
      
      <div className="conversations-list">
        {conversations.map((conversation) => (
          <div key={conversation.id} className="conversation-item">
            <div className="conversation-header">
              <h3>✈️ {conversation.title}</h3>
              <span className="conversation-date">{formatDate(conversation.timestamp)}</span>
            </div>
            <p className="conversation-preview">
              "{getConversationPreview(conversation.messages)}"
            </p>
            <div className="conversation-stats">
              <span className="message-count">💬 {conversation.messages.length} messages</span>
              <button className="view-conversation">View Details</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="history-actions">
        <button className="clear-history">🗑️ Clear History</button>
        <button className="export-history">📤 Export Conversations</button>
      </div>
    </div>
  );
};

export default History;
