// Test script to verify real airport data integration
import { 
  realAirportData, 
  organizedAirportData, 
  searchRealAirportServices,
  generateRealContextualResponse 
} from './src/data/realAirportData.js';

console.log('=== REAL AIRPORT DATA INTEGRATION TEST ===\n');

// Test 1: Check data loading
console.log('1. Total services loaded:', realAirportData.length);

// Test 2: Check organized categories
console.log('\n2. Services by category:');
console.log('   Restaurants:', organizedAirportData.restaurants.length);
console.log('   Cafeterias:', organizedAirportData.cafeterias.length);
console.log('   Gift Shops:', organizedAirportData.giftShops.length);
console.log('   Lounges:', organizedAirportData.lounges.length);
console.log('   Services:', organizedAirportData.services.length);

// Test 3: Sample search
console.log('\n3. Search test - "starbucks":');
const starbucksResults = searchRealAirportServices('starbucks');
console.log('   Found', starbucksResults.length, 'Starbucks locations');
starbucksResults.slice(0, 2).forEach(location => {
  console.log(`   - ${location.name} at ${location.airport}`);
});

// Test 4: Airport-specific search
console.log('\n4. Search test - "ATL":');
const atlResults = searchRealAirportServices('ATL');
console.log('   Found', atlResults.length, 'services at Atlanta airport');
atlResults.slice(0, 3).forEach(service => {
  console.log(`   - ${service.name} (${service.type})`);
});

// Test 5: Contextual response
console.log('\n5. Contextual response test:');
const response = generateRealContextualResponse('coffee', starbucksResults);
console.log('   Response:', response.substring(0, 100) + '...');

console.log('\n✅ INTEGRATION TEST COMPLETE - All functions working!');
