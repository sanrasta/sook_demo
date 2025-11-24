import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * ValuesSection - Shows Sook's three core values
 */
function ValuesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline()

    // Title entrance
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      )
    }

    // Cards entrance
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.value-card')
      tl.fromTo(
        cards,
        { y: 80, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.2,
          ease: 'back.out(1.7)' 
        },
        '-=0.5'
      )
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <p 
            ref={titleRef}
            className="text-2xl md:text-3xl text-purple-100 font-light max-w-3xl mx-auto leading-relaxed"
          >
            Connecting US communities to the vibrant cultures and commerce of Istanbul, 
            the world's oldest and most dynamic crossroads
          </p>
        </div>

        {/* Value Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          <ValueCard 
            emoji="🌍"
            title="Cultural Bridge"
            description="Authentic products and stories from the Global South, starting from Istanbul's ancient bazaars"
            gradient="from-blue-500/20 to-cyan-500/20"
          />
          <ValueCard 
            emoji="🎥"
            title="Video-First Joy"
            description="Engaging livestreams that bring the energy of global markets to your screen"
            gradient="from-purple-500/20 to-pink-500/20"
          />
          <ValueCard 
            emoji="🤝"
            title="Community Powered"
            description="Shop together, save together, and discover together in a welcoming space for all"
            gradient="from-orange-500/20 to-yellow-500/20"
          />
        </div>
      </div>
    </div>
  )
}

interface ValueCardProps {
  emoji: string
  title: string
  description: string
  gradient: string
}

function ValueCard({ emoji, title, description, gradient }: ValueCardProps) {
  return (
    <div className={`value-card bg-gradient-to-br ${gradient} backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 hover:scale-105 transform`}>
      <div className="text-6xl mb-4">{emoji}</div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-purple-100 leading-relaxed">{description}</p>
    </div>
  )
}

export default ValuesSection

