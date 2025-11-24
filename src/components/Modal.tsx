import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
}

/**
 * Modal component with GSAP animations
 * Closes on backdrop click or Escape key
 */
function Modal({ children, onClose }: ModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Entrance animations
    if (backdropRef.current) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
    }

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { 
          scale: 0.8, 
          opacity: 0,
          y: 50,
          rotation: -5,
        },
        { 
          scale: 1, 
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.5,
          ease: 'back.out(1.7)',
        }
      )
    }
  }, [])

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleClose = () => {
    // Exit animations
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 50,
        rotation: 5,
        duration: 0.3,
        ease: 'back.in(1.7)',
      })
    }

    if (backdropRef.current) {
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: onClose,
      })
    }
  }

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 bg-gradient-to-br from-purple-900/95 via-slate-900/95 to-black/95 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleClose}
    >
      {/* Prevent clicks inside modal from closing it */}
      <div ref={contentRef} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal

