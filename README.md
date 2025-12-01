# SOOK: AI-Powered Live Commerce Platform

SOOK is a "Watch & Shop" platform where creators can stream live video, and viewers can buy products instantly via an interactive overlay.

## 🚀 Quick Start

1.  **Prerequisites**: Node.js 18+
2.  **Setup**:
    - Create `apps/web/.env.local` and add your Agora App ID:
      ```bash
      NEXT_PUBLIC_AGORA_APP_ID=your_agora_app_id
      ```
3.  **Run**:
    ```bash
    npm install
    npm start
    ```
    This will launch:
    - **Broadcaster (Host)**: [http://localhost:3000/broadcast](http://localhost:3000/broadcast)
    - **Viewer (Shopper)**: [http://localhost:3000/watch](http://localhost:3000/watch)
    - **API**: [http://localhost:3001](http://localhost:3001)

---

## 🏗 Architecture

This is a **Monorepo** managed by NPM Workspaces:

### `apps/web` (Next.js 14 + Tailwind)
-   **Frontend**: Handles the video player, product overlays, and broadcaster dashboard.
-   **Key Tech**:
    -   `agora-rtc-sdk-ng`: Low-latency live video.
    -   `socket.io-client`: Real-time product syncing.
    -   `framer-motion`: Smooth UI transitions.

### `apps/api` (NestJS)
-   **Backend**: Manages product data and real-time events.
-   **Key Tech**:
    -   `@nestjs/websockets`: Handles the `host:change-product` events.
    -   `socket.io`: Broadcasts updates to all viewers.

---

## ✅ Current Features (MVP Slices 1 & 2)

-   **Live Streaming**: Host can broadcast video; Viewers can watch.
-   **Smart Broadcaster**:
    -   **AI Teleprompter**: Shows talking points that update automatically when the product changes.
    -   **Product Timeline**: Host clicks "Next Product" to control the show.
-   **Interactive Shopping**:
    -   **Real-time Sync**: When Host changes the product, the Viewer's overlay updates *instantly*.
    -   **Product Cards**: Glassmorphism UI for product details.

---

## 🚧 What's Left to Build (Roadmap)

To make this production-ready, we need to implement:

### 1. Real AI Intelligence 🧠
-   **Current**: Teleprompter uses hardcoded "talking points".
-   **Next Step**: Connect to **Gemini/OpenAI API**.
    -   Generate scripts dynamically based on product description + live chat sentiment.
    -   "AI Co-host" that suggests answers to viewer questions.

### 2. Shopify Integration 🛍️
-   **Current**: Mock product data in `products.service.ts`.
-   **Next Step**: Connect to **Shopify Storefront API**.
    -   Fetch real inventory and prices.
    -   Implement "Add to Cart" and Checkout URL generation.

### 3. Authentication & Roles 🔐
-   **Current**: Open access (anyone can broadcast).
-   **Next Step**: Integrate **Clerk** or **Auth0**.
    -   Protect `/broadcast` route.
    -   Save viewer cart state.

### 4. Infrastructure ☁️
-   **Current**: Localhost.
-   **Next Step**: Deploy to cloud.
    -   **Web**: Vercel.
    -   **API**: Railway or AWS ECS.
    -   **Redis**: For scaling Socket.io across multiple instances.
