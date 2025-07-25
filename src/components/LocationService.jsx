import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { getAvailableAirports, findNearestAirport, getAirportByCode } from '../data/realAirportData';

const LocationService = ({ onAirportSelect, currentAirport }, ref) => {
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [locationStatus, setLocationStatus] = useState('idle'); // idle, requesting, success, error
  const [selectedAirport, setSelectedAirport] = useState(currentAirport || null);
  const [nearestAirport, setNearestAirport] = useState(null);
  const [showAirportSelector, setShowAirportSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasAskedLocation, setHasAskedLocation] = useState(false);

  const availableAirports = getAvailableAirports();

  // Load saved airport from localStorage on component mount
  useEffect(() => {
    const savedAirport = localStorage.getItem('userSelectedAirport');
    const hasAskedBefore = localStorage.getItem('hasAskedLocation') === 'true';
    
    if (savedAirport) {
      try {
        const airportData = JSON.parse(savedAirport);
        setSelectedAirport(airportData);
        onAirportSelect(airportData);
        setHasAskedLocation(true);
      } catch (error) {
        console.error('Error loading saved airport:', error);
        localStorage.removeItem('userSelectedAirport');
      }
    } else if (!hasAskedBefore && !currentAirport) {
      // Auto-request location for first-time users
      setShowAirportSelector(true);
      setHasAskedLocation(true);
      localStorage.setItem('hasAskedLocation', 'true');
    }
  }, []);

  // Check if geolocation is supported
  useEffect(() => {
    setIsLocationEnabled('geolocation' in navigator);
  }, []);

  // Save airport selection to localStorage
  const saveAirportToStorage = (airport) => {
    try {
      localStorage.setItem('userSelectedAirport', JSON.stringify(airport));
      localStorage.setItem('airportSelectionTimestamp', Date.now().toString());
    } catch (error) {
      console.error('Error saving airport to localStorage:', error);
    }
  };

  // Clear saved airport data
  const clearSavedAirport = () => {
    localStorage.removeItem('userSelectedAirport');
    localStorage.removeItem('airportSelectionTimestamp');
    localStorage.removeItem('hasAskedLocation');
    setSelectedAirport(null);
    setLocationStatus('idle');
    setNearestAirport(null);
    setShowAirportSelector(false);
    onAirportSelect(null);
  };

  // Expose functions to parent component via ref
  useImperativeHandle(ref, () => ({
    clearSavedAirport
  }));

  // Check if geolocation is supported
  useEffect(() => {
    setIsLocationEnabled('geolocation' in navigator);
  }, []);

  // Filter airports based on search query
  const filteredAirports = availableAirports.filter(airport =>
    airport.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    airport.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    airport.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Request user's location
  const requestLocation = () => {
    if (!isLocationEnabled) {
      setLocationStatus('error');
      return;
    }

    setLocationStatus('requesting');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const nearest = findNearestAirport(latitude, longitude);
        
        if (nearest) {
          setNearestAirport(nearest);
          setLocationStatus('success');
          
          // Auto-select if within reasonable distance (50 miles)
          if (nearest.distance <= 50) {
            handleAirportSelect(nearest);
          }
        } else {
          setLocationStatus('error');
        }
      },
      (error) => {
        console.error('Location error:', error);
        setLocationStatus('error');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  // Handle airport selection
  const handleAirportSelect = (airport) => {
    const airportData = airport.code ? airport : getAirportByCode(airport.code);
    setSelectedAirport(airportData);
    setShowAirportSelector(false);
    
    // Save to localStorage for persistence
    saveAirportToStorage(airportData);
    
    // Notify parent component
    onAirportSelect(airportData);
  };

  // Handle manual airport selection from dropdown
  const handleManualSelect = (airport) => {
    const airportData = getAirportByCode(airport.code);
    handleAirportSelect(airportData);
  };

  // Handle changing airport (clear current selection)
  const handleChangeAirport = () => {
    setShowAirportSelector(true);
    setLocationStatus('idle');
    setNearestAirport(null);
    setSearchQuery('');
  };

  return (
    <div className="location-service">
      {/* Current Airport Display */}
      <div className="current-airport">
        <div className="airport-header">
          <span className="airport-icon">✈️</span>
          <div className="airport-info">
            {selectedAirport ? (
              <>
                <div className="airport-code">{selectedAirport.code}</div>
                <div className="airport-name">{selectedAirport.city}, {selectedAirport.state}</div>
              </>
            ) : (
              <>
                <div className="airport-code">Select Airport</div>
                <div className="airport-name">Choose your current location</div>
              </>
            )}
          </div>
          {selectedAirport && (
            <div className="airport-actions">
              <button 
                className="change-airport-btn"
                onClick={handleChangeAirport}
                title="Change airport"
              >
                📍
              </button>
              <button 
                className="clear-airport-btn"
                onClick={() => {
                  clearSavedAirport();
                  setSelectedAirport(null);
                  onAirportSelect(null);
                }}
                title="Clear saved airport"
              >
                ✕
              </button>
            </div>
          )}
          {!selectedAirport && (
            <button 
              className="change-airport-btn"
              onClick={handleChangeAirport}
              title="Select airport"
            >
              📍
            </button>
          )}
        </div>
      </div>

      {/* Airport Selector Modal */}
      {showAirportSelector && (
        <div className="airport-selector-modal">
          <div className="selector-content">
            <div className="selector-header">
              <h3>Select Your Airport</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAirportSelector(false)}
              >
                ✕
              </button>
            </div>

            {/* Location Detection */}
            <div className="location-detection">
              <button 
                className={`location-btn ${locationStatus}`}
                onClick={requestLocation}
                disabled={!isLocationEnabled || locationStatus === 'requesting'}
              >
                {locationStatus === 'requesting' && (
                  <span className="spinner">🔄</span>
                )}
                {locationStatus === 'idle' && '📍 Use My Location'}
                {locationStatus === 'requesting' && 'Detecting Location...'}
                {locationStatus === 'success' && '✅ Location Detected'}
                {locationStatus === 'error' && '❌ Location Failed'}
              </button>
              
              {nearestAirport && locationStatus === 'success' && (
                <div className="nearest-airport">
                  <div className="nearest-info">
                    <strong>Nearest Airport:</strong> {nearestAirport.code} - {nearestAirport.city}
                    <span className="distance">({nearestAirport.distance} miles away)</span>
                  </div>
                  {nearestAirport.distance <= 50 ? (
                    <button 
                      className="select-nearest-btn"
                      onClick={() => handleAirportSelect(nearestAirport)}
                    >
                      Select {nearestAirport.code}
                    </button>
                  ) : (
                    <div className="distance-warning">
                      Too far from airport. Please select manually.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Manual Selection */}
            <div className="manual-selection">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search airports (e.g., LAX, Los Angeles, Atlanta...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="airport-search"
                />
              </div>

              <div className="airport-list">
                {filteredAirports.map((airport) => (
                  <div
                    key={airport.code}
                    className={`airport-item ${selectedAirport?.code === airport.code ? 'selected' : ''}`}
                    onClick={() => handleManualSelect(airport)}
                  >
                    <div className="airport-code-badge">{airport.code}</div>
                    <div className="airport-details">
                      <div className="airport-city">{airport.city}, {airport.state}</div>
                      <div className="airport-full-name">{airport.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LocationServiceWithRef = forwardRef(LocationService);

export default LocationServiceWithRef;
