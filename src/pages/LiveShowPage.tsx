import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VideoPlayer from '../components/VideoPlayer'
import ChatPanel from '../components/ChatPanel'
import FlashDeal from '../components/FlashDeal'
import PortraitStream from '../components/PortraitStream'
import GroupBuyPhone from '../components/GroupBuyPhone'
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
  const groupBuyRef = useRef<HTMLDivElement>(null)

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
      {/* Horizontal scroll container */}
      <div ref={containerRef} className="h-screen overflow-hidden">
        <div className="flex h-screen">
          {/* Desktop Experience Panel */}
          <section 
            ref={desktopRef}
            className="panel min-w-full h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
          >
            <div className="flex-1 flex flex-col max-w-screen-2xl mx-auto w-full px-6 py-6">
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
            className="panel min-w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-pink-900 to-slate-900 overflow-hidden"
          >
            <div className="w-full max-w-screen-2xl mx-auto px-6 h-full flex items-center justify-center">
              <div className="w-full max-w-7xl" style={{ maxHeight: '90vh' }}>
                <div className="flex items-center justify-center h-full scale-90">
                  <PortraitStream 
                    playbackId={muxPlaybackId}
                    products={DEMO_PRODUCTS}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Group Buying Panel */}
          <section 
            ref={groupBuyRef}
            className="panel min-w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 overflow-hidden"
          >
            <div className="w-full max-w-screen-2xl mx-auto px-6 h-full flex items-center justify-center">
              <div className="w-full max-w-7xl" style={{ maxHeight: '90vh' }}>
                <div className="flex items-center justify-center h-full scale-90">
                  <GroupBuyPhone />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Bottom scroll progress indicator - minimal */}
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
        <button
          onClick={() => {
            const container = containerRef.current
            if (container) {
              window.scrollTo({ 
                top: container.offsetHeight * 2, 
                behavior: 'smooth' 
              })
            }
          }}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            currentScreen === 2 
              ? 'bg-yellow-400 w-8' 
              : 'bg-white/30 hover:bg-white/50'
          }`}
          aria-label="Go to group buy view"
        />
      </div>
    </div>
  )
}

export default LiveShowPage
