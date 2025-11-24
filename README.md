# Sook Livestream Demo

An immersive, full-featured demo showcasing the future of video commerce. Experience how Sook bridges cultures through livestream shopping with cutting-edge technology and community-powered features.

## Technology Stack

- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- React Router DOM for navigation
- Mux Player for video streaming
- GSAP for professional animations
- Smooth scroll-snap navigation

## Project Structure

```
sook-livestream-demo/
├── src/
│   ├── components/
│   │   ├── VideoPlayer.tsx      # Mux video player wrapper
│   │   ├── ChatPanel.tsx        # Live chat with local state
│   │   ├── ProductDrawer.tsx    # Product list container
│   │   ├── ProductCard.tsx      # Individual product card
│   │   └── Modal.tsx            # Purchase confirmation modal
│   ├── pages/
│   │   ├── HomePage.tsx         # Landing page
│   │   └── LiveShowPage.tsx     # Main live show interface
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   ├── App.tsx                  # Router configuration
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Tailwind imports and global styles
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Mux Playback ID

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Then edit `.env` and replace the placeholder with your actual Mux playback ID:

```
VITE_MUX_PLAYBACK_ID=your-actual-mux-playback-id
```

The playback ID can be found in your Mux dashboard after creating a video asset or live stream.

### 3. Run the Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### 5. Preview Production Build

```bash
npm run preview
```

## Features

### Home Page
- GSAP-animated hero section with floating button
- Elegant gradient backgrounds
- Clear call-to-action routing to live experience

### Story-Driven Experience

The demo is structured as a scrollable deck with 7 full-screen sections:

#### 1. Mission Section
- Hero introduction to Sook's vision
- "Bridging Cultures Through Commerce"
- Three core values: Cultural Bridge, Video-First Joy, Community Powered
- Smooth entrance animations

#### 2. Desktop Experience

- Landscape video player (Mux streaming)
- Real-time chat panel with animations
- Product drawer with 4 demo products
- Lightning deals appearing every 15 seconds on video overlay
- Flash deals with countdown timers and purchase CTAs

#### 3. Mobile Experience
- iPhone mockup with portrait video (9:16 aspect ratio)
- Tap-to-shop product tags rotating every 8 seconds
- Social interaction buttons (like, comment, share)
- Live viewer count and status
- Mobile-first features showcase

#### 4. Group Buying Feature
- Live 5-person joining animation
- Dynamic pricing that decreases as people join
- Progress bar showing group completion
- Confetti celebration when group completes
- Up to 25% discount demonstration
- Benefits: Save Together, Instant Matching, Community Shopping

#### 5. Technology Section
- Sook Coin with DeFi benefits
- Turkish Cargo logistics (Istanbul hub to 15 US cities)
- AI-driven operations (BytePlus, DataInsta)
- Smart recommendations, real-time translation, content creation
- Technology partner badges

#### 6. Impact Section
- Animated statistics counters
- Social impact stories
- Humanitarian aid innovation
- Food desert solutions
- Creator economy empowerment
- Vision statement

#### 7. Final CTA
- Market statistics ($680B US opportunity)
- Link to full pitch deck
- Quick navigation back to top

### Navigation
- Fixed navbar with Sook branding and tagline
- Floating navigation pills on the right side
- 6 quick-jump buttons to different sections
- Smooth scroll behavior between full-screen sections
- CSS scroll-snap for deck-style navigation

### GSAP Animations

All major interactions are enhanced with professional GSAP animations:

**Flash Deals:**
- Slide in from right with bounce and rotation
- Lightning bolt pulse animation
- Product image scale with spring physics
- Price pop with elastic bounce
- Button continuous pulse
- Attention-grabbing shake after 1 second
- Smooth exit animation

**Product Cards:**
- Staggered entrance on page load
- Hover: image scale + rotation + card lift
- Button press animation
- Mouse leave returns smoothly

**Modal:**
- Backdrop fade in
- Content scale up with rotation
- Exit with reverse animation

**Home Page:**
- Title elastic bounce entrance
- Staggered element reveals
- Button continuous float
- Hover and click interactions

**Section Entrances:**
- Fade and slide animations
- Scale transformations
- Rotation effects
- Staggered card reveals

### Group Buying Demo
- 5 avatars join automatically every 1.5 seconds
- Each person adds 5% discount (up to 25%)
- Progress bar animates smoothly
- Avatar entrance with rotation and elastic bounce
- Confetti particle explosion on completion
- Dynamic price calculations

## Environment Variables

All environment variables must be prefixed with `VITE_` to be accessible in the client-side code.

- `VITE_MUX_PLAYBACK_ID` - Your Mux video playback ID or live stream playback ID

## Component Details

### VideoPlayer
Wraps the Mux Player React component with minimal configuration. The component expects a `playbackId` prop.

### ChatPanel
Manages chat messages in local state. Uses functional state updates to avoid stale state issues. Messages include username, content, and timestamp.

### ProductDrawer
Contains hard-coded product data and manages the purchase modal state. Products can easily be replaced with API data in the future.

### Modal
Reusable overlay component with backdrop click and ESC key handling for closing.

## Customization

### Change Products
Edit the `DEMO_PRODUCTS` array in `src/components/ProductDrawer.tsx`

### Modify Styling
Tailwind utility classes are used throughout. Adjust colors and spacing directly in component files.

### Add Real Backend
- Replace hard-coded products with API calls
- Implement WebSocket or Server-Sent Events for real chat
- Add authentication and user management
- Integrate payment processing (Stripe, PayPal, etc.)

## Browser Support

Modern browsers with ES2020 support:
- Chrome 80+
- Firefox 75+
- Safari 14+
- Edge 80+

## Sook's Values Showcased

This demo brings to life Sook's core mission:

1. **Cultural Bridge** - Connecting US viewers to authentic products from Istanbul and the Global South
2. **Video-First Commerce** - Engaging livestream experiences that make shopping joyful
3. **Community Powered** - Group buying, chat interaction, and shared experiences
4. **Technology Innovation** - DeFi payments (Sook Coin), AI operations, efficient logistics
5. **Social Impact** - Supporting artisans, humanitarian aid, underserved communities
6. **Creator Economy** - Empowering influencers to monetize through curated shows

## Demo Highlights

- **7 Full-Screen Sections** - Deck-style presentation
- **Smooth Scroll Navigation** - Professional navigation experience
- **Live Animations** - GSAP-powered interactions throughout
- **Interactive Demos** - Working flash deals, group buying, chat
- **Mobile Showcase** - Portrait video mockup with tap-to-shop
- **Values-Driven** - Every section tells part of Sook's story

## Notes

This is a demo application focused on showcasing the vision and UX:
- No authentication
- No database persistence
- No real payment processing
- Chat messages are local to browser session
- Products are hard-coded
- Mux demo video for testing

These limitations are intentional to keep the demo focused on the UI experience and Sook's value proposition.

