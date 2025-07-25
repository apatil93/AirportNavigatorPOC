import React, { useState } from 'react';
import '../styles/Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: 'user'
      };
      setMessages([...messages, newMessage]);
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: "Thanks for your message! This is a demo response. In a real application, this would connect to your chatbot API.",
          sender: 'bot'
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
      
      setInputValue('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Chat Assistant</h1>
      </div>
      
      <div className="messages-container">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-content">
              {message.text}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSendMessage} className="input-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message here..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
