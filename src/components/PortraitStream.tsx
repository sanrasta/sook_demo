import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import MuxPlayer from '@mux/mux-player-react'
import { Product } from '../types'

interface PortraitStreamProps {
  playbackId: string
  products: Product[]
}

/**
 * PortraitStream component - Shows mobile portrait video experience
 * Mimics TikTok/Instagram style vertical video with interactive elements
 */
function PortraitStream({ playbackId, products }: PortraitStreamProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const productTagRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [currentProduct, setCurrentProduct] = useState(products[0])
  const [showProductTag, setShowProductTag] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    // Entrance animation
    gsap.fromTo(
      containerRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    )
  }, [])

  // Rotate through products every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = products.findIndex(p => p.id === currentProduct.id)
      const nextIndex = (currentIndex + 1) % products.length
      setCurrentProduct(products[nextIndex])
      
      // Animate product tag entrance
      setShowProductTag(false)
      setTimeout(() => setShowProductTag(true), 100)
    }, 8000)

    return () => clearInterval(interval)
  }, [currentProduct, products])

  useEffect(() => {
    if (showProductTag && productTagRef.current) {
      gsap.fromTo(
        productTagRef.current,
        { x: -100, opacity: 0, scale: 0.8 },
        { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
      )
    }
  }, [showProductTag, currentProduct])

  const handleProductTagClick = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handlePurchase = () => {
    console.log('Purchase confirmed for:', currentProduct)
    setShowModal(false)
  }

  // Animate modal entrance
  useEffect(() => {
    if (showModal && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
      )
    }
  }, [showModal])

  return (
    <div ref={containerRef} className="w-full py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 mb-3">
            Mobile Portrait Experience
          </h2>
          <p className="text-purple-300 text-lg">
            See how viewers shop on their phones - vertical video optimized for mobile
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          {/* Mobile Frame */}
          <div className="relative">
            {/* Phone mockup */}
            <div className="relative w-[280px] md:w-[320px] h-[560px] md:h-[640px] bg-slate-900 rounded-[40px] p-3 shadow-2xl border-4 border-slate-800">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-20"></div>
              
              {/* Screen */}
              <div className="relative w-full h-full bg-black rounded-[32px] overflow-hidden">
                {/* Video Player */}
                <div className="absolute inset-0 z-0">
                  <MuxPlayer
                    streamType="on-demand"
                    playbackId={playbackId}
                    className="w-full h-full object-cover"
                    style={{ aspectRatio: '9/16' }}
                    muted
                    autoPlay
                    loop
                  />
                </div>

                {/* Purchase Modal - Inside Phone */}
                {showModal && (
                  <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div 
                      ref={modalRef}
                      className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 w-full max-w-[240px] border border-purple-500/30"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-white font-bold text-sm">Confirm Purchase</h3>
                        <button 
                          onClick={handleCloseModal}
                          className="text-gray-400 hover:text-white text-lg leading-none"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="flex gap-2 mb-3 bg-slate-700/50 p-2 rounded-lg">
                        <img 
                          src={currentProduct.imageUrl}
                          alt={currentProduct.name}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-xs mb-1 line-clamp-2">
                            {currentProduct.name}
                          </p>
                          <p className="text-yellow-400 font-bold text-lg">
                            ${currentProduct.price.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <p className="text-purple-300 text-xs text-center mb-3">
                        Demo only - No real payment
                      </p>

                      <div className="space-y-2">
                        <button
                          onClick={handlePurchase}
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 rounded-lg text-sm"
                        >
                          Buy Now
                        </button>
                        <button
                          onClick={handleCloseModal}
                          className="w-full bg-slate-700 text-white font-semibold py-2 rounded-lg text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Overlay UI Elements */}
                <div className="absolute inset-0 pointer-events-none z-10">
                  {/* Top bar */}
                  <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/60 to-transparent">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0"></div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-bold text-xs truncate">Sook Live</p>
                        <p className="text-purple-300 text-[10px] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse flex-shrink-0"></span>
                          <span className="truncate">12.5K watching</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Product Tag - Interactive */}
                  {showProductTag && !showModal && (
                    <div 
                      ref={productTagRef}
                      className="absolute bottom-20 left-3 right-3 pointer-events-auto"
                    >
                      <div 
                        onClick={handleProductTagClick}
                        className="bg-slate-900/90 backdrop-blur-md rounded-lg p-2 flex items-center gap-2 cursor-pointer hover:bg-slate-800/90 transition-all border border-purple-500/30 shadow-xl"
                      >
                        <img 
                          src={currentProduct.imageUrl}
                          alt={currentProduct.name}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-bold text-xs line-clamp-1">
                            {currentProduct.name}
                          </p>
                          <p className="text-yellow-400 font-extrabold text-sm">
                            ${currentProduct.price.toFixed(2)}
                          </p>
                        </div>
                        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs whitespace-nowrap flex-shrink-0">
                          Shop
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Right side buttons */}
                  {!showModal && (
                    <div className="absolute right-2 bottom-28 flex flex-col gap-3 items-center pointer-events-auto">
                      <button className="flex flex-col items-center gap-0.5 text-white">
                        <div className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center justify-center text-xl hover:scale-110 transition-transform">
                          ❤️
                        </div>
                        <span className="text-[10px] font-semibold">24.5K</span>
                      </button>
                      <button className="flex flex-col items-center gap-0.5 text-white">
                        <div className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center justify-center text-xl hover:scale-110 transition-transform">
                          💬
                        </div>
                        <span className="text-[10px] font-semibold">856</span>
                      </button>
                      <button className="flex flex-col items-center gap-0.5 text-white">
                        <div className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center justify-center text-xl hover:scale-110 transition-transform">
                          🔗
                        </div>
                        <span className="text-[10px] font-semibold">Share</span>
                      </button>
                    </div>
                  )}

                  {/* Bottom gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Floating labels */}
            <div className="absolute -left-4 top-1/4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              Portrait
            </div>
            <div className="absolute -right-4 top-1/3 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              9:16
            </div>
          </div>

          {/* Feature List */}
          <div className="flex-1 max-w-md">
            <h3 className="text-2xl font-bold text-white mb-6">Mobile-First Features</h3>
            <div className="space-y-4">
              <FeatureItem 
                icon="📱"
                title="Vertical Video"
                description="Full-screen portrait mode optimized for one-handed viewing"
              />
              <FeatureItem 
                icon="🛍️"
                title="Tap-to-Shop"
                description="Floating product tags that viewers can tap to purchase instantly"
              />
              <FeatureItem 
                icon="💬"
                title="Quick Reactions"
                description="Like, comment, and share without leaving the video"
              />
              <FeatureItem 
                icon="⚡"
                title="Seamless Flow"
                description="Swipe up to see next show, keeping viewers engaged"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface FeatureItemProps {
  icon: string
  title: string
  description: string
}

function FeatureItem({ icon, title, description }: FeatureItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!itemRef.current) return

    gsap.fromTo(
      itemRef.current,
      { x: -50, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.6, 
        ease: 'power2.out',
        delay: 0.2,
      }
    )
  }, [])

  return (
    <div ref={itemRef} className="flex gap-4 items-start bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
      <span className="text-3xl">{icon}</span>
      <div>
        <h4 className="text-white font-bold mb-1">{title}</h4>
        <p className="text-purple-200 text-sm">{description}</p>
      </div>
    </div>
  )
}

export default PortraitStream

