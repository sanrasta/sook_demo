import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useNavigate, useLocation } from 'react-router-dom'

function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!navRef.current) return

    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  const isLivePage = location.pathname === '/live'

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/95 via-slate-900/95 to-purple-900/95 backdrop-blur-md border-b border-purple-500/20 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 group-hover:scale-110 transition-transform duration-300">
              Sook
            </div>
            <div className="hidden sm:block">
              <div className="text-purple-200 text-sm font-semibold">Live Shopping</div>
              <div className="text-purple-400 text-xs">Bridging Cultures with Commerce</div>
            </div>
          </div>

          {/* Center - Tagline */}
          {isLivePage && (
            <div className="hidden md:flex items-center gap-2 text-purple-200 text-sm">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span className="font-semibold">LIVE NOW</span>
            </div>
          )}

          {/* Right - Nav Items */}
          <div className="flex items-center gap-6">
            <a 
              href="https://sook-pitch-deck--al9b220.gamma.site/deck" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:block text-purple-200 hover:text-white text-sm font-semibold transition-colors"
            >
              About Sook
            </a>
            
            {!isLivePage && (
              <button
                onClick={() => navigate('/live')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-6 py-2 rounded-full text-sm transition-all duration-200 shadow-lg hover:shadow-purple-500/50 transform hover:scale-105"
              >
                Watch Live
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

