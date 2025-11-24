import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * TechnologySection - Highlights Sook's tech innovation: AI, DeFi, Turkish Cargo
 */
function TechnologySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const coinRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    )

    // Coin floating animation
    if (coinRef.current) {
      gsap.to(coinRef.current, {
        y: -20,
        rotation: 360,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-4 py-16"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-200 mb-6">
            Powered by Innovation
          </h2>
          <p className="text-2xl text-purple-100 max-w-3xl mx-auto">
            Cutting-edge technology meets ancient trade routes
          </p>
        </div>

        {/* Main Tech Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Sook Coin */}
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-3xl p-8 border border-yellow-500/30 relative overflow-hidden">
            <div 
              ref={coinRef}
              className="absolute top-4 right-4 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-4xl shadow-2xl"
            >
              🪙
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Sook Coin</h3>
            <p className="text-purple-100 text-lg leading-relaxed mb-6">
              DeFi-powered currency for seamless global transactions with better exchange rates and instant settlements
            </p>
            <ul className="space-y-3">
              <TechFeature text="Seamless in-app purchases" />
              <TechFeature text="Easy on/off ramp for vendors" />
              <TechFeature text="Airdrops for early supporters" />
              <TechFeature text="Protection against inflation" />
            </ul>
          </div>

          {/* Turkish Cargo */}
          <div className="bg-gradient-to-br from-red-500/20 to-rose-500/20 backdrop-blur-sm rounded-3xl p-8 border border-red-500/30 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-6xl opacity-20">✈️</div>
            <h3 className="text-3xl font-bold text-white mb-4">Turkish Cargo</h3>
            <p className="text-purple-100 text-lg leading-relaxed mb-6">
              Istanbul hub model with daily non-stops to 15 US cities. Air freight as low as ~$1/kg
            </p>
            <ul className="space-y-3">
              <TechFeature text="Orders on planes to US by Saturday" />
              <TechFeature text="Direct Istanbul → 15 US cities" />
              <TechFeature text="Affordable air freight rates" />
              <TechFeature text="Track shipments in real-time" />
            </ul>
          </div>
        </div>

        {/* AI & Automation */}
        <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-purple-500/30">
          <div className="text-center mb-8">
            <h3 className="text-4xl font-bold text-white mb-4">
              🤖 AI-Driven Operations
            </h3>
            <p className="text-purple-100 text-lg max-w-2xl mx-auto">
              Leveraging BytePlus and DataInsta's 6,000+ AI experts for next-gen shopping experiences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <AICard 
              title="Smart Recommendations"
              description="Demand-sensing algorithms that learn what viewers want to see"
              icon="🎯"
            />
            <AICard 
              title="Real-Time Translation"
              description="Live voice & language translation for global community engagement"
              icon="🗣️"
            />
            <AICard 
              title="Content Creation"
              description="CapCut APIs for automated video remixing and multi-city targeting"
              icon="🎬"
            />
          </div>
        </div>

        {/* Partner Logos */}
        <div className="mt-16 text-center">
          <p className="text-purple-300 text-sm mb-6 uppercase tracking-wider">Technology Partners</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <PartnerBadge name="BytePlus" />
            <PartnerBadge name="DataInsta" />
            <PartnerBadge name="Turkish Cargo" />
            <PartnerBadge name="Arasta Capital" />
          </div>
        </div>
      </div>
    </div>
  )
}

function TechFeature({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3">
      <span className="text-green-400 text-xl">✓</span>
      <span className="text-purple-100">{text}</span>
    </li>
  )
}

interface AICardProps {
  title: string
  description: string
  icon: string
}

function AICard({ title, description, icon }: AICardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    gsap.fromTo(
      cardRef.current,
      { scale: 0.8, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.6, 
        ease: 'back.out(1.7)',
        delay: Math.random() * 0.3,
      }
    )
  }, [])

  return (
    <div 
      ref={cardRef}
      className="bg-slate-800/50 rounded-xl p-6 border border-purple-500/20 text-center hover:border-purple-400/50 transition-all duration-300 hover:scale-105 transform"
    >
      <div className="text-5xl mb-3">{icon}</div>
      <h4 className="text-white font-bold mb-2">{title}</h4>
      <p className="text-purple-200 text-sm">{description}</p>
    </div>
  )
}

function PartnerBadge({ name }: { name: string }) {
  return (
    <div className="bg-slate-800/50 px-6 py-3 rounded-full border border-purple-500/20 text-purple-200 font-semibold hover:border-purple-400/50 transition-all duration-300">
      {name}
    </div>
  )
}

export default TechnologySection

