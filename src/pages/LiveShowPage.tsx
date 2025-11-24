import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import VideoPlayer from '../components/VideoPlayer'
import ChatPanel from '../components/ChatPanel'
import ProductDrawer from '../components/ProductDrawer'
import FlashDeal from '../components/FlashDeal'
import PortraitStream from '../components/PortraitStream'
import GroupBuyingFeature from '../components/GroupBuyingFeature'
import Navbar from '../components/Navbar'
import MissionSection from '../components/sections/MissionSection'
import ValuesSection from '../components/sections/ValuesSection'
import TechnologySection from '../components/sections/TechnologySection'
import ImpactSection from '../components/sections/ImpactSection'
import { Product } from '../types'

// Same product list as ProductDrawer for flash deals
const DEMO_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'Smart Watch Series 5',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'Leather Backpack',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
  },
  {
    id: '4',
    name: 'Portable Speaker',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
  },
]

function LiveShowPage() {
  // Get Mux playback ID from environment variable
  const muxPlaybackId = import.meta.env.VITE_MUX_PLAYBACK_ID || 'placeholder-playback-id'
  
  const [flashDealProduct, setFlashDealProduct] = useState<Product | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  
  const missionRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const desktopSectionRef = useRef<HTMLDivElement>(null)
  const mobileSectionRef = useRef<HTMLDivElement>(null)
  const groupBuyingSectionRef = useRef<HTMLDivElement>(null)
  const technologyRef = useRef<HTMLDivElement>(null)
  const impactRef = useRef<HTMLDivElement>(null)

  // Show random flash deals every 15 seconds
  useEffect(() => {
    // Show first flash deal after 3 seconds
    const initialTimer = setTimeout(() => {
      showRandomFlashDeal()
    }, 3000)

    // Then show a new flash deal every 15 seconds
    const interval = setInterval(() => {
      showRandomFlashDeal()
    }, 15000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [])

  const showRandomFlashDeal = () => {
    // Only show if no flash deal is currently visible
    if (!flashDealProduct) {
      const randomProduct = DEMO_PRODUCTS[Math.floor(Math.random() * DEMO_PRODUCTS.length)]
      setFlashDealProduct(randomProduct)
    }
  }

  const handleFlashDealClose = () => {
    setFlashDealProduct(null)
  }

  const handleFlashDealBuy = () => {
    // Open the purchase modal for this product
    setSelectedProduct(flashDealProduct)
    setFlashDealProduct(null)
  }

  // Smooth scroll to section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navbar */}
      <Navbar />

      {/* Scroll Navigation Pills */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
        <NavPill 
          emoji="🌟"
          label="Hero"
          onClick={() => scrollToSection(missionRef)}
          color="bg-purple-600/80"
        />
        <NavPill 
          emoji="💎"
          label="Values"
          onClick={() => scrollToSection(valuesRef)}
          color="bg-indigo-600/80"
        />
        <NavPill 
          emoji="🖥️"
          label="Desktop"
          onClick={() => scrollToSection(desktopSectionRef)}
          color="bg-blue-600/80"
        />
        <NavPill 
          emoji="📱"
          label="Mobile"
          onClick={() => scrollToSection(mobileSectionRef)}
          color="bg-pink-600/80"
        />
        <NavPill 
          emoji="🤝"
          label="Group Buy"
          onClick={() => scrollToSection(groupBuyingSectionRef)}
          color="bg-yellow-600/80"
        />
        <NavPill 
          emoji="🚀"
          label="Technology"
          onClick={() => scrollToSection(technologyRef)}
          color="bg-cyan-600/80"
        />
        <NavPill 
          emoji="💝"
          label="Impact"
          onClick={() => scrollToSection(impactRef)}
          color="bg-green-600/80"
        />
      </div>

      {/* Hero Section */}
      <section ref={missionRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16 snap-start">
        <MissionSection />
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 snap-start">
        <ValuesSection />
      </section>

      {/* Desktop Experience Section */}
      <section ref={desktopSectionRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-16 snap-start">
        <div className="h-full flex flex-col">
          {/* Section Header */}
          <div className="text-center py-8 px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 mb-2">
              Desktop Experience
            </h2>
            <p className="text-purple-300">Full-screen livestream with chat and products</p>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col lg:grid lg:grid-cols-3 lg:gap-4 lg:px-4 max-w-screen-2xl mx-auto w-full">
        
        {/* Video Player Section - Takes 2 columns on desktop */}
        <div className="lg:col-span-2 bg-black rounded-lg overflow-hidden shadow-2xl relative">
          <VideoPlayer playbackId={muxPlaybackId} />
          
          {/* Flash Deal Overlay */}
          {flashDealProduct && (
            <FlashDeal
              product={flashDealProduct}
              onClose={handleFlashDealClose}
              onBuyClick={handleFlashDealBuy}
            />
          )}
        </div>

        {/* Chat Panel - Takes 1 column on desktop, below video on mobile */}
        <div className="lg:col-span-1 flex-shrink-0 h-96 lg:h-auto">
          <ChatPanel />
        </div>

            {/* Product Drawer - Full width at bottom on desktop, middle on mobile */}
            <div className="lg:col-span-3 order-first lg:order-last mt-4">
              <ProductDrawer 
                selectedProduct={selectedProduct}
                onCloseModal={() => setSelectedProduct(null)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Experience Section */}
      <section ref={mobileSectionRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-pink-900 to-slate-900 py-16 snap-start">
        <PortraitStream 
          playbackId={muxPlaybackId}
          products={DEMO_PRODUCTS}
        />
      </section>

      {/* Group Buying Section */}
      <section ref={groupBuyingSectionRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 py-16 snap-start">
        <GroupBuyingFeature />
      </section>

      {/* Technology Section */}
      <section ref={technologyRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 py-16 snap-start">
        <TechnologySection />
      </section>

      {/* Impact Section */}
      <section ref={impactRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 py-16 snap-start">
        <ImpactSection />
      </section>

      {/* Final CTA Section */}
      <section className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 py-16 snap-start flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 mb-8">
            Join the Journey
          </h2>
          <p className="text-2xl text-purple-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            We're building the future of video commerce, one joyful connection at a time
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="https://sook-pitch-deck--al9b220.gamma.site/deck"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-200 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105"
            >
              View Full Pitch Deck
            </a>
            <button
              onClick={() => scrollToSection(missionRef)}
              className="bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700/80 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-200 border border-purple-500/30"
            >
              ↑ Back to Top
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <Stat label="Live Shopping" value="$680B" subtext="US Market by 2030" />
            <Stat label="Growth" value="32%" subtext="CAGR Globally" />
            <Stat label="Cities" value="15+" subtext="US Connected" />
            <Stat label="Vision" value="∞" subtext="Limitless Impact" />
          </div>
        </div>
      </section>
    </div>
  )
}

interface NavPillProps {
  emoji: string
  label: string
  onClick: () => void
  color: string
}

function NavPill({ emoji, label, onClick, color }: NavPillProps) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm hover:${color} text-white rounded-full p-2.5 transition-all duration-300 shadow-lg hover:scale-110`}
      title={label}
    >
      <span className="text-lg">{emoji}</span>
      <span className="max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-300 text-xs font-semibold whitespace-nowrap pr-0 group-hover:pr-2">
        {label}
      </span>
    </button>
  )
}

interface StatProps {
  label: string
  value: string
  subtext: string
}

function Stat({ label, value, subtext }: StatProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
      <div className="text-purple-300 text-xs mb-1">{label}</div>
      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-1">
        {value}
      </div>
      <div className="text-purple-400 text-xs">{subtext}</div>
    </div>
  )
}

export default LiveShowPage

