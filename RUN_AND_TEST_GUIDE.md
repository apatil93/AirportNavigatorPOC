# 🚀 How to Run and Test the Airport Assistant

## Quick Start Instructions

### 1. Start the Development Server
Open a terminal in the `d:\React` directory and run:

```bash
npm run dev
```

This will start the Vite development server, typically on `http://localhost:5173`

### 2. Test the Real Airport Data Integration

#### 🔍 **Chat Interface Tests**
Navigate to the Chat page and try these queries:

**Coffee Searches:**
- "Find Starbucks at LAX"
- "coffee at Seattle airport"
- "I need caffeine near gate B20"

**Restaurant Searches:**
- "food at Atlanta airport"
- "Chick-fil-A locations"
- "restaurants at JFK terminal 4"

**Lounge Searches:**
- "lounges at Denver airport"
- "Delta Sky Club locations"
- "business lounge access"

**General Searches:**
- "services at ORD"
- "duty free shopping"
- "ATMs at Miami airport"

#### 🏢 **Services Directory Tests**
Navigate to the Airport Services page and verify:

- **Restaurants section** shows real establishments like Popeyes, Shake Shack
- **Coffee section** displays Starbucks and other real cafés
- **Gift Shops section** includes Duty Free Americas, Hudson News
- **Lounges section** shows Delta Sky Club, Centurion Lounge
- **Services section** displays ATMs, Currency Exchange

### 3. Verification Checklist

#### ✅ **Data Accuracy Tests**
- [ ] Real business names are displayed (not "Sky Diner" or dummy names)
- [ ] Actual airport codes appear (ATL, JFK, LAX, etc.)
- [ ] Real terminal locations shown (Terminal C, Concourse B, Gate A15)
- [ ] Authentic phone numbers displayed (404) xxx-xxxx format
- [ ] Realistic operating hours (5:00 AM - 10:00 PM, 24/7, etc.)

#### ✅ **Search Functionality Tests**
- [ ] Search "Starbucks" returns multiple real airport locations
- [ ] Search "ATL" shows Atlanta airport services
- [ ] Search "lounge" displays real airline clubs
- [ ] Search "food" shows actual restaurants and fast food chains
- [ ] Search results include specific terminal/gate information

#### ✅ **UI Integration Tests**
- [ ] Alaska Airlines logo appears in header
- [ ] Service cards display real business information
- [ ] Contact information and hours are shown
- [ ] Categories organize services properly
- [ ] Responsive design works on mobile

### 4. Expected Results

#### **Sample Real Services You Should See:**

**Restaurants:**
- Popeyes Louisiana Kitchen (ATL Concourse A)
- Chick-fil-A (ATL Concourse B)
- Shake Shack (DFW Terminal C, JFK Terminal 4)
- Legal Sea Foods (BOS multiple terminals)

**Coffee:**
- Starbucks (Multiple airports, various terminals)
- Starbucks Reserve (SEA Central Terminal)

**Lounges:**
- Delta Sky Club (ATL, DTW, MSP)
- United Club (ORD, SFO, EWR)
- Centurion Lounge (DFW, JFK, PHX)

**Services:**
- Duty Free Americas (ATL, JFK, MIA)
- Hudson News (Multiple airports)
- MAC Cosmetics (ORD, JFK)
- Currency Exchange (Multiple airports)

### 5. Troubleshooting

#### **If you see dummy data (Sky Diner, Milano Pizza):**
1. Check if imports in Chat.jsx and AirportServices.jsx use `realAirportData`
2. Verify `npm run dev` is serving the latest code
3. Clear browser cache and refresh

#### **If search doesn't work:**
1. Check browser console for JavaScript errors
2. Verify `searchRealAirportServices` function is imported correctly
3. Test with simple queries first ("coffee", "food", "ATL")

#### **If categories are empty:**
1. Check `organizedAirportData` import in AirportServices.jsx
2. Verify category filters are working properly
3. Check that data transformation maintained correct category assignments

### 6. Success Indicators

✅ **Integration Successful When:**
- Real airport names and business appear everywhere
- Search returns actual services with real contact info
- No "dummy" or "sky" named businesses visible
- Multiple airports represented in search results
- Specific terminal and gate locations displayed
- Authentic phone numbers and hours shown

---

## 🎯 **Ready to Test!**

The Airport Assistant now uses **100% real airport data** from major US airports. Users can find actual businesses, get real contact information, and navigate to specific terminal locations.

**Start the server with `npm run dev` and test the integration!**
