import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * ImpactSection - Shows Sook's social impact and humanitarian vision
 */
function ImpactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' }
    )

    // Animate stats counting up
    if (statsRef.current) {
      const stats = statsRef.current.querySelectorAll('.stat-number')
      stats.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') || '0')
        gsap.fromTo(
          stat,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: 'power2.out',
            onUpdate: function() {
              const value = Math.round(this.targets()[0].innerText)
              if (target >= 1000) {
                stat.textContent = (value / 1000).toFixed(1) + 'K'
              } else {
                stat.textContent = value.toString()
              }
            }
          }
        )
      })
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-4 py-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-emerald-200 mb-6">
            Commerce with Purpose
          </h2>
          <p className="text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Every purchase supports creators, small businesses, and communities worldwide
          </p>
        </div>

        {/* Impact Stats */}
        <div ref={statsRef} className="grid md:grid-cols-4 gap-6 mb-16">
          <StatCard 
            number={15}
            suffix="+"
            label="US Cities Connected"
            icon="🌆"
          />
          <StatCard 
            number={1000}
            suffix="+"
            label="Artisan Partners"
            icon="🛍️"
          />
          <StatCard 
            number={50}
            suffix="+"
            label="Countries Reached"
            icon="🌍"
          />
          <StatCard 
            number={100}
            suffix="%"
            label="Transparent Sourcing"
            icon="✨"
          />
        </div>

        {/* Impact Stories */}
        <div className="grid md:grid-cols-2 gap-8">
          <ImpactCard 
            icon="💝"
            title="Empowering Local Artisans"
            description="Direct connections between Istanbul's craftspeople and global customers, ensuring fair compensation and cultural preservation"
            gradient="from-rose-500/20 to-pink-500/20"
          />
          <ImpactCard 
            icon="🏥"
            title="Humanitarian Aid Innovation"
            description="Future 'Live Aid' events using livestream technology to provide faster, more efficient support for refugees and communities in need"
            gradient="from-blue-500/20 to-cyan-500/20"
          />
          <ImpactCard 
            icon="🌱"
            title="Food Desert Solutions"
            description="Leveraging user density to establish micro-warehouses serving as local stores in underserved urban neighborhoods"
            gradient="from-green-500/20 to-emerald-500/20"
          />
          <ImpactCard 
            icon="🚀"
            title="Creator Economy"
            description="Empowering influencers and creators to monetize their audiences while curating authentic cultural experiences"
            gradient="from-purple-500/20 to-indigo-500/20"
          />
        </div>

        {/* Vision Statement */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl px-12 py-8 border border-purple-500/30">
            <p className="text-xl md:text-2xl text-purple-100 font-light italic leading-relaxed">
              "Building a SuperApp that connects cultures, empowers communities,<br />
              and makes the world a little smaller, one joyful transaction at a time."
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  number: number
  suffix?: string
  label: string
  icon: string
}

function StatCard({ number, suffix = '', label, icon }: StatCardProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 text-center hover:border-purple-400/50 transition-all duration-300 hover:scale-105 transform">
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-2">
        <span className="stat-number" data-target={number}>0</span>{suffix}
      </div>
      <div className="text-purple-200 text-sm font-semibold">{label}</div>
    </div>
  )
}

interface ImpactCardProps {
  icon: string
  title: string
  description: string
  gradient: string
}

function ImpactCard({ icon, title, description, gradient }: ImpactCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power2.out',
        delay: Math.random() * 0.3,
      }
    )
  }, [])

  return (
    <div 
      ref={cardRef}
      className={`bg-gradient-to-br ${gradient} backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300`}
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-purple-100 leading-relaxed">{description}</p>
    </div>
  )
}

export default ImpactSection

