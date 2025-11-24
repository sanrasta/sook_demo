import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VideoPlayer from '../components/VideoPlayer'
import ChatPanel from '../components/ChatPanel'
import FlashDeal from '../components/FlashDeal'
import PortraitStream from '../components/PortraitStream'
import { Product } from '../types'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Demo products for flash deals only
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
  const muxPlaybackId = import.meta.env.VITE_MUX_PLAYBACK_ID || 'placeholder-playback-id'
  
  const [flashDealProduct, setFlashDealProduct] = useState<Product | null>(null)
  const [currentScreen, setCurrentScreen] = useState(0)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const desktopRef = useRef<HTMLDivElement>(null)
  const mobileRef = useRef<HTMLDivElement>(null)

  // Initialize horizontal scroll with GSAP - snappier feel
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const sections = gsap.utils.toArray<HTMLElement>('.panel')
    
    // More responsive scroll - scrub: 0.1 makes it very snappy and mouse-responsive
    const scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 0.1, // Changed from 1 to 0.1 for snappier response
        snap: {
          snapTo: 1 / (sections.length - 1),
          duration: { min: 0.2, max: 0.4 }, // Faster snap
          ease: 'power2.inOut',
        },
        end: () => `+=${container.offsetWidth * (sections.length - 1)}`,
        onUpdate: (self) => {
          const progress = self.progress
          const screenIndex = Math.round(progress * (sections.length - 1))
          setCurrentScreen(screenIndex)
        },
      },
    })

    return () => {
      scrollTween.scrollTrigger?.kill()
      scrollTween.kill()
    }
  }, [])

  // Flash deals timer - only on desktop view
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      showRandomFlashDeal()
    }, 3000)

    const interval = setInterval(() => {
      showRandomFlashDeal()
    }, 15000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [])

  const showRandomFlashDeal = () => {
    if (!flashDealProduct && currentScreen === 0) {
      const randomProduct = DEMO_PRODUCTS[Math.floor(Math.random() * DEMO_PRODUCTS.length)]
      setFlashDealProduct(randomProduct)
    }
  }

  const handleFlashDealClose = () => {
    setFlashDealProduct(null)
  }

  const handleFlashDealBuy = () => {
    alert(`Added ${flashDealProduct?.name} to cart!`)
    setFlashDealProduct(null)
  }

  return (
    <div className="relative overflow-hidden">
      {/* Header with logo and screen indicators */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-white font-semibold text-lg">Sook Live</span>
          </div>

          {/* Screen indicators */}
          <div className="flex items-center gap-2">
            <ScreenIndicator 
              active={currentScreen === 0} 
              label="Desktop"
              icon="🖥️"
            />
            <ScreenIndicator 
              active={currentScreen === 1} 
              label="Mobile"
              icon="📱"
            />
          </div>

          {/* Scroll hint */}
          <div className="hidden md:flex items-center gap-2 text-purple-300 text-sm">
            <span>Scroll to explore</span>
            <svg 
              className="w-5 h-5 animate-pulse" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </div>
        </div>
      </header>

      {/* Horizontal scroll container */}
      <div ref={containerRef} className="h-screen overflow-hidden">
        <div className="flex h-screen">
          {/* Desktop Experience Panel */}
          <section 
            ref={desktopRef}
            className="panel min-w-full h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
          >
            <div className="flex-1 flex flex-col max-w-screen-2xl mx-auto w-full px-6 pt-20 pb-6">
              {/* Section header - compact */}
              <div className="text-center py-4">
                <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-1">
                  Desktop Experience
                </h2>
                <p className="text-blue-200 text-sm">How customers watch on desktop</p>
              </div>

              {/* Main content - fits in viewport */}
              <div className="flex-1 grid lg:grid-cols-[1fr_380px] gap-4 overflow-hidden">
                {/* Video Player */}
                <div className="bg-black rounded-2xl overflow-hidden shadow-2xl relative">
                  <VideoPlayer playbackId={muxPlaybackId} />
                  
                  {/* Flash Deal Overlay */}
                  {flashDealProduct && currentScreen === 0 && (
                    <FlashDeal
                      product={flashDealProduct}
                      onClose={handleFlashDealClose}
                      onBuyClick={handleFlashDealBuy}
                    />
                  )}
                </div>

                {/* Chat Panel - scrollable within its container */}
                <div className="flex-shrink-0 overflow-hidden">
                  <ChatPanel />
                </div>
              </div>
            </div>
          </section>

          {/* Mobile Experience Panel */}
          <section 
            ref={mobileRef}
            className="panel min-w-full h-screen flex flex-col bg-gradient-to-br from-slate-900 via-pink-900 to-slate-900"
          >
            <div className="flex-1 flex flex-col max-w-screen-2xl mx-auto w-full px-6 pt-20 pb-6">
              {/* Section header - compact */}
              <div className="text-center py-4">
                <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 mb-1">
                  Mobile Experience
                </h2>
                <p className="text-pink-200 text-sm">How customers watch on mobile</p>
              </div>

              {/* Mobile content - centered and contained */}
              <div className="flex-1 flex items-center justify-center overflow-hidden">
                <div className="w-full max-w-6xl h-full">
                  <PortraitStream 
                    playbackId={muxPlaybackId}
                    products={DEMO_PRODUCTS}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Bottom scroll progress indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-2xl">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            currentScreen === 0 
              ? 'bg-blue-400 w-8' 
              : 'bg-white/30 hover:bg-white/50'
          }`}
          aria-label="Go to desktop view"
        />
        <button
          onClick={() => {
            const container = containerRef.current
            if (container) {
              window.scrollTo({ 
                top: container.offsetHeight, 
                behavior: 'smooth' 
              })
            }
          }}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            currentScreen === 1 
              ? 'bg-pink-400 w-8' 
              : 'bg-white/30 hover:bg-white/50'
          }`}
          aria-label="Go to mobile view"
        />
      </div>

      {/* Live viewers count indicator */}
      <div className="fixed top-20 left-6 z-40 bg-red-600/90 backdrop-blur-md px-4 py-2 rounded-full border border-red-400/50 shadow-lg flex items-center gap-2">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        <span className="text-white text-sm font-semibold">12.5K watching</span>
      </div>
    </div>
  )
}

interface ScreenIndicatorProps {
  active: boolean
  label: string
  icon: string
}

function ScreenIndicator({ active, label, icon }: ScreenIndicatorProps) {
  return (
    <div 
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
        active 
          ? 'bg-purple-500/20 border border-purple-400/50' 
          : 'bg-white/5 border border-white/10'
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className={`text-sm font-medium hidden sm:block ${
        active ? 'text-purple-200' : 'text-gray-400'
      }`}>
        {label}
      </span>
    </div>
  )
}

export default LiveShowPage
