import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Chat from './pages/Chat';
import AirportServices from './pages/AirportServices';
import History from './pages/History';
import Settings from './pages/Settings';
import './styles/globals.css';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">
            <img 
              src="/images/Alaska-Airlines-1.png" 
              alt="Alaska Airlines" 
              className="brand-logo"
            />
            <h2>Airport Assistant</h2>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">Chat</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/history" className="nav-link">History</Link>
            <Link to="/settings" className="nav-link">Settings</Link>
          </div>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/services" element={<AirportServices />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
