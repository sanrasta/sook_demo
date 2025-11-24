import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Product } from '../types'

interface ProductCardProps {
  product: Product
  onBuyClick: () => void
}

/**
 * ProductCard displays individual product with image, name, price and buy button
 * Enhanced with GSAP animations
 */
function ProductCard({ product, onBuyClick }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    // Entrance animation with stagger effect
    gsap.fromTo(
      cardRef.current,
      { 
        y: 50, 
        opacity: 0,
        scale: 0.9,
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        delay: Math.random() * 0.3, // Random delay for stagger effect
      }
    )
  }, [])

  const handleMouseEnter = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.1,
        rotation: 2,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: -8,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  const handleMouseLeave = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  const handleBuyClick = () => {
    if (buttonRef.current) {
      // Button click animation
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
        onComplete: onBuyClick,
      })
    } else {
      onBuyClick()
    }
  }

  return (
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-shadow duration-300 border border-slate-600 hover:border-purple-500/50"
    >
      {/* Product Image */}
      <div ref={imageRef} className="aspect-square overflow-hidden bg-slate-900 relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-white font-bold text-sm mb-2 line-clamp-2 group-hover:text-purple-200 transition-colors">
          {product.name}
        </h3>
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-extrabold text-xl mb-3">
          ${product.price.toFixed(2)}
        </p>
        
        {/* Buy Button */}
        <button
          ref={buttonRef}
          onClick={handleBuyClick}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/50"
        >
          Buy Now
        </button>
      </div>
    </div>
  )
}

export default ProductCard

