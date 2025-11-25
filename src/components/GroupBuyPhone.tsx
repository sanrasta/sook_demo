import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * GroupBuyPhone - Shows group buying feature in a phone mockup
 */
function GroupBuyPhone() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.fromTo(
      containerRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    )
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full flex items-center">
      <div className="w-full max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-200 mb-2">
            Group Buying
          </h2>
          <p className="text-yellow-300 text-sm">
            Team up with friends for exclusive discounts
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Phone mockup */}
          <div className="relative">
            <div className="relative w-[260px] md:w-[300px] h-[520px] md:h-[600px] bg-slate-900 rounded-[40px] p-3 shadow-2xl border-4 border-slate-800">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-20"></div>
              
              {/* Screen */}
              <div className="relative w-full h-full bg-gradient-to-b from-orange-950 to-slate-950 rounded-[32px] overflow-hidden p-4">
                {/* Header */}
                <div className="text-center mb-4 pt-4">
                  <h3 className="text-white font-bold text-xl mb-1">Group Buy Deal</h3>
                  <p className="text-orange-300 text-xs">Get more friends, save more!</p>
                </div>

                {/* Product Card */}
                <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-4 mb-4">
                  <div className="flex gap-3 mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
                      alt="Wireless Headphones"
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-sm mb-1">Premium Wireless Headphones</h4>
                      <div className="flex items-baseline gap-2">
                        <span className="text-yellow-400 font-extrabold text-lg">$99.99</span>
                        <span className="text-gray-400 line-through text-xs">$149.99</span>
                      </div>
                      <div className="mt-1 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded inline-block">
                        33% OFF
                      </div>
                    </div>
                  </div>
                  
                  {/* Timer */}
                  <div className="bg-orange-600/30 border border-orange-500/50 rounded-lg p-2 text-center">
                    <p className="text-orange-200 text-[10px] font-semibold mb-1">Deal ends in</p>
                    <div className="flex justify-center gap-2 text-white font-bold">
                      <div>
                        <div className="text-lg">23</div>
                        <div className="text-[8px] text-orange-300">HRS</div>
                      </div>
                      <div className="text-lg">:</div>
                      <div>
                        <div className="text-lg">45</div>
                        <div className="text-[8px] text-orange-300">MIN</div>
                      </div>
                      <div className="text-lg">:</div>
                      <div>
                        <div className="text-lg">12</div>
                        <div className="text-[8px] text-orange-300">SEC</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold text-xs">Group Progress</span>
                    <span className="text-yellow-400 font-bold text-xs">7/10 joined</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="bg-slate-700 rounded-full h-3 mb-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full" style={{ width: '70%' }}></div>
                  </div>

                  {/* Avatars */}
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center text-gray-400 text-xs">
                      +3
                    </div>
                  </div>

                  <p className="text-green-400 text-[10px] font-semibold">
                    🎉 3 more friends needed to unlock this price!
                  </p>
                </div>

                {/* Pricing Tiers */}
                <div className="space-y-2 mb-4">
                  <PriceTier people="5 people" price="$119.99" active={false} />
                  <PriceTier people="7 people" price="$109.99" active={true} />
                  <PriceTier people="10 people" price="$99.99" active={false} locked={false} />
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-3 rounded-xl text-sm shadow-lg">
                    Invite Friends
                  </button>
                  <button className="w-full bg-slate-700 text-white font-semibold py-3 rounded-xl text-sm">
                    Join Group Now
                  </button>
                </div>
              </div>
            </div>

            {/* Floating label */}
            <div className="absolute -right-4 top-1/4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              Save More
            </div>
          </div>

          {/* Feature List */}
          <div className="flex-1 max-w-md lg:max-w-sm">
            <h3 className="text-xl font-bold text-white mb-4">How It Works</h3>
            <div className="space-y-3">
              <FeatureItem 
                icon="👥"
                title="Form a Group"
                description="Invite friends or join an existing group"
              />
              <FeatureItem 
                icon="💰"
                title="Unlock Tiers"
                description="More people = bigger discounts for everyone"
              />
              <FeatureItem 
                icon="⏰"
                title="Limited Time"
                description="Deals expire in 24 hours - act fast!"
              />
              <FeatureItem 
                icon="🎁"
                title="Everyone Wins"
                description="All group members get the same discount"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface PriceTierProps {
  people: string
  price: string
  active: boolean
  locked?: boolean
}

function PriceTier({ people, price, active, locked = true }: PriceTierProps) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border-2 ${
      active 
        ? 'bg-yellow-600/20 border-yellow-500' 
        : locked 
          ? 'bg-slate-700/30 border-slate-600 opacity-60' 
          : 'bg-slate-700/30 border-slate-600'
    }`}>
      <div className="flex items-center gap-2">
        {locked && !active && <span className="text-gray-500 text-xs">🔒</span>}
        {active && <span className="text-yellow-400 text-xs">✓</span>}
        <span className={`text-xs font-semibold ${active ? 'text-yellow-300' : 'text-gray-400'}`}>
          {people}
        </span>
      </div>
      <span className={`font-bold text-sm ${active ? 'text-yellow-400' : 'text-gray-400'}`}>
        {price}
      </span>
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
    <div ref={itemRef} className="flex gap-4 items-start bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-yellow-500/20">
      <span className="text-3xl">{icon}</span>
      <div>
        <h4 className="text-white font-bold mb-1">{title}</h4>
        <p className="text-yellow-200 text-sm">{description}</p>
      </div>
    </div>
  )
}

export default GroupBuyPhone

