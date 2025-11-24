import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

/**
 * GroupBuyingFeature - Demonstrates group buying with 5 people joining for bulk discounts
 */
function GroupBuyingFeature() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const avatarsRef = useRef<HTMLDivElement>(null)
  const [joinedCount, setJoinedCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const avatars = [
    { id: 1, name: 'Sarah', emoji: '👩🏻', color: 'from-purple-400 to-pink-400' },
    { id: 2, name: 'Ahmed', emoji: '👨🏽', color: 'from-blue-400 to-cyan-400' },
    { id: 3, name: 'Maria', emoji: '👩🏼', color: 'from-green-400 to-emerald-400' },
    { id: 4, name: 'Jin', emoji: '👨🏻', color: 'from-yellow-400 to-orange-400' },
    { id: 5, name: 'Aisha', emoji: '👩🏾', color: 'from-pink-400 to-rose-400' },
  ]

  useEffect(() => {
    if (!containerRef.current) return

    // Entrance animation
    gsap.fromTo(
      containerRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    )

    // Title animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)', delay: 0.2 }
      )
    }
  }, [])

  // Auto-join animation every 1.5 seconds
  useEffect(() => {
    if (joinedCount >= 5) {
      setIsComplete(true)
      return
    }

    const timer = setTimeout(() => {
      setJoinedCount(prev => prev + 1)
    }, 1500)

    return () => clearTimeout(timer)
  }, [joinedCount])

  // Animate each avatar as they join
  useEffect(() => {
    if (joinedCount > 0 && avatarsRef.current) {
      const avatarElements = avatarsRef.current.querySelectorAll('.avatar-item')
      const currentAvatar = avatarElements[joinedCount - 1]
      
      if (currentAvatar) {
        gsap.fromTo(
          currentAvatar,
          { scale: 0, rotation: -180, opacity: 0 },
          { 
            scale: 1, 
            rotation: 0, 
            opacity: 1, 
            duration: 0.6, 
            ease: 'back.out(2)',
          }
        )

        // Pulse effect
        gsap.to(currentAvatar, {
          scale: 1.15,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          delay: 0.6,
        })
      }
    }
  }, [joinedCount])

  // Celebration animation when complete
  useEffect(() => {
    if (isComplete && containerRef.current) {
      const celebrationEl = containerRef.current.querySelector('.celebration')
      
      if (celebrationEl) {
        gsap.fromTo(
          celebrationEl,
          { scale: 0, rotation: -360, opacity: 0 },
          { 
            scale: 1, 
            rotation: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: 'elastic.out(1, 0.5)',
          }
        )
      }

      // Confetti animation
      const confettiContainer = containerRef.current.querySelector('.confetti-container')
      if (confettiContainer) {
        for (let i = 0; i < 20; i++) {
          const confetti = document.createElement('div')
          confetti.className = 'confetti'
          confetti.style.left = `${Math.random() * 100}%`
          confetti.style.backgroundColor = ['#a855f7', '#ec4899', '#f59e0b', '#10b981'][Math.floor(Math.random() * 4)]
          confettiContainer.appendChild(confetti)

          gsap.fromTo(
            confetti,
            { y: 0, opacity: 1, rotation: 0 },
            {
              y: 500,
              opacity: 0,
              rotation: 360,
              duration: 2 + Math.random(),
              ease: 'power2.out',
              delay: Math.random() * 0.5,
              onComplete: () => confetti.remove(),
            }
          )
        }
      }
    }
  }, [isComplete])

  const discount = Math.min(joinedCount * 5, 25)
  const originalPrice = 149.99
  const discountedPrice = (originalPrice * (1 - discount / 100)).toFixed(2)

  return (
    <div ref={containerRef} className="w-full py-16 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 mb-4"
          >
            Group Buying Power
          </h2>
          <p className="text-purple-300 text-xl">
            Join forces with other shoppers for instant bulk discounts
          </p>
        </div>

        {/* Main Demo Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 border-2 border-purple-500/30 shadow-2xl relative overflow-hidden">
          {/* Confetti container */}
          <div className="confetti-container absolute inset-0 pointer-events-none"></div>

          {/* Product Info */}
          <div className="text-center mb-8">
            <div className="w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
                alt="Premium Wireless Headphones"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Premium Wireless Headphones</h3>
            <div className="flex items-center justify-center gap-4">
              <span className="text-gray-400 line-through text-lg">
                ${originalPrice.toFixed(2)}
              </span>
              <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                ${discountedPrice}
              </span>
              {discount > 0 && (
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold px-3 py-1 rounded-full text-sm">
                  {discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Progress Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-purple-300 font-semibold">Group Progress</span>
              <span className="text-white font-bold text-xl">
                {joinedCount}/5 Joined
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="h-4 bg-slate-700 rounded-full overflow-hidden mb-6">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 transition-all duration-700 ease-out"
                style={{ width: `${(joinedCount / 5) * 100}%` }}
              />
            </div>

            {/* Avatars */}
            <div ref={avatarsRef} className="flex justify-center gap-4 flex-wrap">
              {avatars.map((avatar, index) => (
                <div
                  key={avatar.id}
                  className={`avatar-item flex flex-col items-center ${
                    index < joinedCount ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${avatar.color} flex items-center justify-center text-3xl shadow-lg border-4 ${
                    index < joinedCount ? 'border-white' : 'border-slate-600'
                  }`}>
                    {avatar.emoji}
                  </div>
                  <span className="text-white text-xs mt-2 font-semibold">{avatar.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Status Messages */}
          {!isComplete && (
            <div className="text-center">
              <p className="text-purple-200 text-lg mb-2">
                ⏳ Waiting for {5 - joinedCount} more {5 - joinedCount === 1 ? 'person' : 'people'} to join...
              </p>
              <p className="text-sm text-gray-400">
                Each person unlocks +5% discount
              </p>
            </div>
          )}

          {isComplete && (
            <div className="celebration text-center">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold px-8 py-4 rounded-2xl text-xl shadow-2xl mb-4">
                <span className="text-3xl">🎉</span>
                Group Complete!
                <span className="text-3xl">🎉</span>
              </div>
              <p className="text-white text-lg mb-4">
                Everyone saves <span className="text-yellow-400 font-bold">25%</span> on this purchase!
              </p>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/50 transform hover:scale-105">
                Complete Purchase - ${discountedPrice}
              </button>
            </div>
          )}
        </div>

        {/* Benefits List */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <BenefitCard 
            icon="💰"
            title="Save More Together"
            description="Up to 25% off when 5 people join the same deal"
          />
          <BenefitCard 
            icon="⚡"
            title="Instant Matching"
            description="Auto-matched with shoppers wanting the same product"
          />
          <BenefitCard 
            icon="🤝"
            title="Community Shopping"
            description="Shop with friends or make new ones while saving"
          />
        </div>
      </div>

      <style>{`
        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -10px;
        }
      `}</style>
    </div>
  )
}

interface BenefitCardProps {
  icon: string
  title: string
  description: string
}

function BenefitCard({ icon, title, description }: BenefitCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0, scale: 0.9 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.6, 
        ease: 'back.out(1.7)',
        delay: Math.random() * 0.3,
      }
    )
  }, [])

  return (
    <div 
      ref={cardRef}
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 text-center hover:border-purple-500/50 transition-all duration-300"
    >
      <span className="text-5xl block mb-3">{icon}</span>
      <h4 className="text-white font-bold text-lg mb-2">{title}</h4>
      <p className="text-purple-200 text-sm">{description}</p>
    </div>
  )
}

export default GroupBuyingFeature

