import React from 'react';
import { getAirportStats } from '../data/realAirportData';

const AirportFacilities = ({ airport, onFacilityClick }) => {
  if (!airport) return null;

  const stats = getAirportStats(airport.code);
  
  if (!stats || stats.totalServices === 0) {
    return (
      <div className="airport-facilities">
        <div className="facilities-header">
          <span className="airport-icon">✈️</span>
          <span className="airport-name">{airport.code}</span>
          <span className="no-data">No facilities data available</span>
        </div>
      </div>
    );
  }

  const handleFacilityClick = (searchQuery) => {
    if (onFacilityClick) {
      onFacilityClick(searchQuery);
    }
  };

  return (
    <div className="airport-facilities">
      <div className="facilities-header">
        <span className="airport-icon">✈️</span>
        <div className="airport-info">
          <span className="airport-name">{airport.code} - {airport.city}</span>
          <span className="total-services">{stats.totalServices} services available</span>
        </div>
      </div>
      
      <div className="facilities-grid">
        {stats.restaurants > 0 && (
          <div 
            className="facility-item" 
            title={`${stats.restaurants} restaurants - Click to browse`}
            onClick={() => handleFacilityClick('restaurants')}
          >
            <span className="facility-icon">🍽️</span>
            <span className="facility-count">{stats.restaurants}</span>
            <span className="facility-label">Restaurants</span>
          </div>
        )}
        
        {stats.cafes > 0 && (
          <div 
            className="facility-item" 
            title={`${stats.cafes} cafés & coffee shops - Click to browse`}
            onClick={() => handleFacilityClick('cafeterias coffee')}
          >
            <span className="facility-icon">☕</span>
            <span className="facility-count">{stats.cafes}</span>
            <span className="facility-label">Cafés</span>
          </div>
        )}
        
        {stats.shops > 0 && (
          <div 
            className="facility-item" 
            title={`${stats.shops} shops & stores - Click to browse`}
            onClick={() => handleFacilityClick('giftShops clothingStores shopping')}
          >
            <span className="facility-icon">🛍️</span>
            <span className="facility-count">{stats.shops}</span>
            <span className="facility-label">Shopping</span>
          </div>
        )}
        
        {stats.lounges > 0 && (
          <div 
            className="facility-item" 
            title={`${stats.lounges} lounges & relaxation areas - Click to browse`}
            onClick={() => handleFacilityClick('lounges')}
          >
            <span className="facility-icon">🛋️</span>
            <span className="facility-count">{stats.lounges}</span>
            <span className="facility-label">Lounges</span>
          </div>
        )}
      </div>
      
      <div className="facilities-summary">
        <div className="summary-stats">
          <span className="stat-item">
            <span className="stat-icon">🏢</span>
            <span className="stat-text">{stats.totalCategories} categories</span>
          </span>
          <span className="stat-item">
            <span className="stat-icon">📍</span>
            <span className="stat-text">Multiple terminals</span>
          </span>
          <span className="stat-item">
            <span className="stat-icon">🕒</span>
            <span className="stat-text">Various hours</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AirportFacilities;
