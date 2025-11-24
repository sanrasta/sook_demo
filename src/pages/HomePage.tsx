import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Navbar from '../components/Navbar'

function HomePage() {
  const navigate = useNavigate()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create timeline for staggered entrance
    const tl = gsap.timeline()

    // Title animation - split letters and animate
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { 
          scale: 0.5, 
          opacity: 0,
          y: -100,
          rotation: -10,
        },
        { 
          scale: 1, 
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
        }
      )
    }

    // Decorator line
    if (decorRef.current) {
      tl.fromTo(
        decorRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.5'
      )
    }

    // Subtitle
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )
    }

    // Description
    if (descriptionRef.current) {
      tl.fromTo(
        descriptionRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
    }

    // Button with bounce
    if (buttonRef.current) {
      tl.fromTo(
        buttonRef.current,
        { scale: 0, opacity: 0, rotation: 180 },
        { 
          scale: 1, 
          opacity: 1,
          rotation: 0,
          duration: 0.8, 
          ease: 'back.out(2)',
        },
        '-=0.2'
      )

      // Continuous subtle float animation
      gsap.to(buttonRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })
    }
  }, [])

  const handleButtonHover = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  const handleButtonLeave = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  const handleButtonClick = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => navigate('/live'),
      })
    } else {
      navigate('/live')
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4 relative overflow-hidden pt-16">
      {/* Decorative gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="text-center relative z-10 max-w-4xl mx-auto">
        {/* Logo/Brand */}
        <div className="mb-6">
          <h1 
            ref={titleRef}
            className="text-7xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 mb-2"
          >
            Sook
          </h1>
          <div ref={decorRef} className="h-1 w-32 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
        </div>
        
        <h2 ref={subtitleRef} className="text-3xl md:text-4xl font-bold text-white mb-4">
          Live Demo
        </h2>
        
        <p ref={descriptionRef} className="text-xl md:text-2xl text-purple-100 mb-4 max-w-2xl mx-auto leading-relaxed">
          Experience the Future of Video Commerce
        </p>
        
        <p className="text-lg text-purple-200 mb-10 max-w-xl mx-auto">
          Watch live shows, chat with the community, and discover curated products
        </p>
        
        <button
          ref={buttonRef}
          onClick={handleButtonClick}
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
          className="group relative bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-10 py-5 rounded-full text-xl transition-all duration-300 shadow-2xl hover:shadow-purple-500/50"
        >
          <span className="relative z-10">Enter Live Show</span>
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </button>
        
        <p className="text-purple-300 text-sm mt-6">
          No sign-up required • Free demo
        </p>
      </div>
    </div>
    </>
  )
}

export default HomePage

