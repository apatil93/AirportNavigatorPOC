import React from 'react';
import { organizedAirportData } from '../data/realAirportData';
import '../styles/AirportServices.css';

const AirportServices = () => {
  const renderServiceCard = (service) => (
    <div key={service.id} className="service-card">
      <h3>{service.name}</h3>
      <p className="service-type">{service.type}</p>
      <p className="location">📍 {service.location}</p>
      <p className="hours">🕒 {service.hours}</p>
      <div className="rating-price">
        <span className="rating">⭐ {service.rating}/5</span>
        {service.priceRange && <span className="price-range">💰 {service.priceRange}</span>}
      </div>
      
      {service.specialties && service.specialties.length > 0 && (
        <p className="specialties">✨ Specialties: {service.specialties.join(', ')}</p>
      )}
      
      {service.menu && (
        <p className="menu">🍽️ Popular: {service.menu.slice(0, 3).join(', ')}{service.menu.length > 3 ? '...' : ''}</p>
      )}
      
      {service.products && (
        <p className="products">🛍️ Products: {service.products.slice(0, 3).join(', ')}{service.products.length > 3 ? '...' : ''}</p>
      )}
      
      {service.amenities && (
        <p className="amenities">🎯 Amenities: {service.amenities.slice(0, 3).join(', ')}{service.amenities.length > 3 ? '...' : ''}</p>
      )}
      
      {service.accessFee && (
        <p className="access-fee">� Access: {service.accessFee}</p>
      )}
      
      {service.waitTime && (
        <p className="wait-time">⏱️ Wait Time: {service.waitTime}</p>
      )}
      
      {/* Service indicators */}
      <div className="service-indicators">
        {service.wifi && <span className="indicator">📶 WiFi</span>}
        {service.delivery && <span className="indicator">🚚 Delivery</span>}
        {service.takeaway && <span className="indicator">🥡 Takeaway</span>}
        {service.mobile_order && <span className="indicator">📱 Mobile Order</span>}
        {service.reservations && <span className="indicator">📞 Reservations</span>}
      </div>
      
      <p className="description">{service.description}</p>
      
      <a href={service.orderUrl} target="_blank" rel="noopener noreferrer" className="order-link">
        {service.category === 'lounges' ? 'Book Access' : 'Order/Visit'} →
      </a>
    </div>
  );

  return (
    <div className="airport-services-container">
      <div className="services-header">
        <div className="header-brand">
          <img 
            src="/images/AlaskaLogo.jpg" 
            alt="Alaska Airlines" 
            className="header-logo"
          />
        </div>
      </div>

      <section className="service-section">
        <h2>🍽️ Restaurants</h2>
        <div className="services-grid">
          {organizedAirportData.restaurants.map(renderServiceCard)}
        </div>
      </section>

      <section className="service-section">
        <h2>☕ Cafeterias & Coffee</h2>
        <div className="services-grid">
          {organizedAirportData.cafeterias.map(renderServiceCard)}
        </div>
      </section>

      <section className="service-section">
        <h2>🎁 Gift Shops</h2>
        <div className="services-grid">
          {organizedAirportData.giftShops.map(renderServiceCard)}
        </div>
      </section>

      <section className="service-section">
        <h2>👔 Clothing Stores</h2>
        <div className="services-grid">
          {organizedAirportData.clothingStores.map(renderServiceCard)}
        </div>
      </section>

      <section className="service-section">
        <h2>🛋️ Lounges</h2>
        <div className="services-grid">
          {organizedAirportData.lounges.map(renderServiceCard)}
        </div>
      </section>

      <section className="service-section">
        <h2>📱 Electronics</h2>
        <div className="services-grid">
          {organizedAirportData.electronics.map(renderServiceCard)}
        </div>
      </section>

      <section className="service-section">
        <h2>💄 Health & Beauty</h2>
        <div className="services-grid">
          {organizedAirportData.healthBeauty.map(renderServiceCard)}
        </div>
      </section>

      <section className="service-section">
        <h2>🎯 Specialty Retail</h2>
        <div className="services-grid">
          {organizedAirportData.specialtyRetail.map(renderServiceCard)}
        </div>
      </section>

      <section className="service-section">
        <h2>🏢 Services</h2>
        <div className="services-grid">
          {organizedAirportData.services.map(renderServiceCard)}
        </div>
      </section>
    </div>
  );
};

export default AirportServices;
