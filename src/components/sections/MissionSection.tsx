import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * MissionSection - Hero section with clean, simple animation
 */
function MissionSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Simple fade in for title
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: 'power2.out' }
      )
    }

    // Line fades in
    if (lineRef.current) {
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.8'
      )
    }

    // Subtitle fades in
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' },
        '-=0.5'
      )
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-4 py-16 relative"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Hero Content - Simple and Clean */}
        <div className="text-center">
          <h1 
            ref={titleRef}
            className="text-8xl md:text-9xl lg:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 mb-8 leading-none"
          >
            Sook
          </h1>
          
          <div 
            ref={lineRef}
            className="h-1 w-64 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 mx-auto rounded-full mb-8"
          ></div>
          
          <p 
            ref={subtitleRef}
            className="text-2xl md:text-3xl text-purple-100 font-light max-w-3xl mx-auto leading-relaxed"
          >
            Bridging Cultures Through Commerce
          </p>

          {/* Scroll indicator */}
          <div className="text-center mt-20 animate-bounce">
            <p className="text-purple-300 text-sm mb-2">Scroll to explore</p>
            <div className="text-3xl">↓</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MissionSection

