import React, { useState } from 'react';

const History = () => {
  const [conversations] = useState([
    {
      id: 1,
      title: "Getting Started with AI",
      date: "2025-07-09",
      preview: "Hello! I'm your AI assistant. How can I help you today?"
    },
    {
      id: 2,
      title: "Technical Questions",
      date: "2025-07-08",
      preview: "I have some questions about React development..."
    },
    {
      id: 3,
      title: "General Chat",
      date: "2025-07-07",
      preview: "Tell me about the weather today..."
    }
  ]);

  return (
    <div className="history-container">
      <h1>Conversation History</h1>
      <div className="conversations-list">
        {conversations.map((conversation) => (
          <div key={conversation.id} className="conversation-item">
            <div className="conversation-header">
              <h3>{conversation.title}</h3>
              <span className="conversation-date">{conversation.date}</span>
            </div>
            <p className="conversation-preview">{conversation.preview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
