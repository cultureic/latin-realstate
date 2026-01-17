# Latin Residences - Project Documentation & Roadmap

This file serves as the core knowledge base for the Latin Residences platform development, tracking implemented features, architectural decisions, and future roadmap.

## 🚀 Project Vision
A premium, decentralized real-estate platform combining high-end Latin American property listings with blockchain verification (Celo) and decentralized AI (Internet Computer).

## 🛠 Tech Stack & Knowledge Base

### 1. Frontend & Design
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS with custom institutional luxury tokens (Playfair Display, Lato).
- **Aesthetics**: Glassmorphism, Ken Burns parallax effects, and premium animation utilities (`pulse-slow`, `fade-in-up`).
- **Maps**: Moved from Google Maps to **OpenStreetMap (OSM)** via Nominatim (Geocoding) and Overpass API (Amenities) to eliminate key dependency and billing issues.

### 2. Backend & Database
- **ORM**: Prisma
- **Database**: PostgreSQL (Supabase)
- **Server Actions**: Located in `src/actions/property-actions.ts` handling property creation, user management, and bookings.

### 3. Integrated AI (Decentralized)
- **Core LLM**: Switched from OpenAI to **Internet Computer (IC) LLM Canister**.
- **Integration**: `src/lib/ic-agent.ts` handles communication with the IC canister `w36hm-eqaaa-aaaal-qr76a-cai`.

---

## ✅ Completed Features

### 💎 UI/UX & Components
- **Premium Hero Section**: Custom high-resolution villa image with smooth parallax and entrance animations.
- **Amenities Report**: (Live) Real-time neighborhood analysis fetching nearby schools, restaurants, and hospitals via OSM Overpass API.
- **Booking Calendar**: Integrated visit scheduling with database persistence.
- **Property Chat Widget**: Floating AI assistant with property-specific context, powered by IC.

### 🪄 Assistant Features
- **Listing Assistant Pro**: 
  - **Step 1**: Live address search with instant OSM Map Preview.
  - **Step 2**: AI Content Generation that drafts luxury titles and narrative descriptions based on the property location.
  - **Robust Parsing**: Advanced regex parsing to extract clean JSON content from AI responses.

### 🔗 Blockchain & Crypto
- **Wallet Integration**: RainbowKit/Wagmi for secure wallet connection.
- **Celo Verification**: Logic for "Ownership Authenticity Verified" UI badges.

---

## 🏗 Knowledge Transfer

### Geocoding Workflow
- **Endpoint**: `/api/geocode?address=[...]`
- **Logic**: Calls Nominatim (OSM). Returns `lat` and `lng`. No API key needed.

### Amenities Workflow
- **Endpoint**: `/api/amenities?lat=[...]&lng=[...]`
- **Logic**: Executes a complex Overpass Turbo query to find `amenity~"school|restaurant|hospital|park"` within 3000m.

### IC AI Integration
- **Function**: `getICLlmReply(messages, model)`
- **Role Mapping**: Successfully maps frontend roles (`user`, `assistant`, `system`) to IC Candid variants `{ user: null }`.

---

## 🗺 Roadmap & Pending Features

### Phase 1: Refining Data
- [ ] **Precise Distance API**: Implement a distance calculation utility for amenities (instead of generic "Nearby").
- [ ] **Image Uploads**: Finalize Supabase Storage or IPFS integration for property photos in the Wizard.

### Phase 2: User Engagement
- [ ] **Agent Dashboard**: A private view for property owners to manage their bookings and leads.
- [ ] **Lead Notifications**: Email or on-chain notifications when a new visit is scheduled.

### Phase 3: Advanced Blockchain
- [ ] **Tokenization Flow**: Complete the smart contract interaction to "Mint" a property listing as an NFT on Celo.
- [ ] **Fractional Investments**: Interface for users to buy "shares" of a luxury property.

---

*Last Updated: January 17, 2026*
