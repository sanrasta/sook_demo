import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { Product } from '../types'

interface FlashDealProps {
  product: Product
  onClose: () => void
  onBuyClick: () => void
}

/**
 * FlashDeal component - appears as an overlay on the video
 * Shows for 5 seconds with dynamic GSAP animations
 */
function FlashDeal({ product, onClose, onBuyClick }: FlashDealProps) {
  const [progress, setProgress] = useState(100)
  const containerRef = useRef<HTMLDivElement>(null)
  const lightningRef = useRef<HTMLSpanElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const priceRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create a GSAP timeline for the entrance animation
    const tl = gsap.timeline()

    // Entrance animation: slide in from right with bounce
    tl.fromTo(
      containerRef.current,
      {
        x: 400,
        opacity: 0,
        scale: 0.8,
        rotation: 5,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
      }
    )

    // Lightning bolt pulse animation
    if (lightningRef.current) {
      gsap.to(lightningRef.current, {
        scale: 1.3,
        rotation: 15,
        duration: 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      })
    }

    // Image scale animation on entrance
    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { scale: 0.5, rotation: -10 },
        { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)' },
        '-=0.3'
      )
    }

    // Price pop animation
    if (priceRef.current) {
      tl.fromTo(
        priceRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' },
        '-=0.4'
      )
    }

    // Button wiggle to grab attention
    if (buttonRef.current) {
      tl.fromTo(
        buttonRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' },
        '-=0.3'
      )

      // Continuous subtle pulse on button
      gsap.to(buttonRef.current, {
        scale: 1.05,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })
    }

    // Shake animation to grab attention after 1 second
    gsap.to(containerRef.current, {
      x: -5,
      duration: 0.1,
      repeat: 5,
      yoyo: true,
      delay: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.set(containerRef.current, { x: 0 })
      },
    })

    // Auto-dismiss after 5 seconds with exit animation
    const dismissTimer = setTimeout(() => {
      gsap.to(containerRef.current, {
        x: 400,
        opacity: 0,
        scale: 0.8,
        rotation: -5,
        duration: 0.4,
        ease: 'back.in(1.7)',
        onComplete: onClose,
      })
    }, 5000)

    // Update progress bar every 50ms
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - 1
        return newProgress < 0 ? 0 : newProgress
      })
    }, 50)

    return () => {
      clearTimeout(dismissTimer)
      clearInterval(progressInterval)
      gsap.killTweensOf([
        containerRef.current,
        lightningRef.current,
        imageRef.current,
        buttonRef.current,
        priceRef.current,
      ])
    }
  }, [onClose])

  const handleClose = () => {
    if (!containerRef.current) return
    
    // Animate out before closing
    gsap.to(containerRef.current, {
      x: 400,
      opacity: 0,
      scale: 0.8,
      rotation: -5,
      duration: 0.4,
      ease: 'back.in(1.7)',
      onComplete: onClose,
    })
  }

  const handleBuyClick = () => {
    if (!buttonRef.current) return
    
    // Button press animation
    gsap.to(buttonRef.current, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: onBuyClick,
    })
  }

  return (
    <div ref={containerRef} className="absolute top-4 right-4 z-20">
      <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-1 rounded-xl shadow-2xl max-w-xs">
        <div className="bg-slate-900 rounded-lg p-4">
          {/* Lightning Deal Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span ref={lightningRef} className="text-2xl inline-block origin-center">
                ⚡
              </span>
              <span className="text-yellow-400 font-bold text-sm uppercase tracking-wider">
                Lightning Deal
              </span>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Product Info */}
          <div className="flex gap-3 mb-3">
            <img
              ref={imageRef}
              src={product.imageUrl}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg shadow-lg"
            />
            <div className="flex-1">
              <h4 className="text-white font-bold text-sm mb-1 line-clamp-2">
                {product.name}
              </h4>
              <div className="flex items-baseline gap-2">
                <span ref={priceRef} className="text-yellow-400 font-extrabold text-xl inline-block">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-gray-400 text-xs line-through">
                  ${(product.price * 1.3).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Buy Button */}
          <button
            ref={buttonRef}
            onClick={handleBuyClick}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-slate-900 font-bold py-2.5 rounded-lg transition-all duration-200 shadow-lg"
          >
            Grab Deal Now!
          </button>

          {/* Progress Bar */}
          <div className="mt-3 h-1 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-red-500 transition-all duration-50 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlashDeal

