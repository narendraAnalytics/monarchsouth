import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function GlowCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  // Hide native cursor
  useEffect(() => {
    document.body.style.cursor = 'none'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [])

  useGSAP(
    () => {
      const cursor = cursorRef.current
      const trail = trailRef.current
      if (!cursor || !trail) return

      const setCursorX = gsap.quickSetter(cursor, 'x', 'px')
      const setCursorY = gsap.quickSetter(cursor, 'y', 'px')

      const onMouseMove = (e: MouseEvent) => {
        setCursorX(e.clientX)
        setCursorY(e.clientY)
        gsap.to(trail, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: true,
        })
      }

      window.addEventListener('mousemove', onMouseMove)
      return () => window.removeEventListener('mousemove', onMouseMove)
    },
    { scope: cursorRef }
  )

  return (
    <>
      {/* Main cursor dot — 8px, centered via negative margin */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          marginTop: -4,
          marginLeft: -4,
          borderRadius: '50%',
          backgroundColor: '#f0b429',
          pointerEvents: 'none',
          zIndex: 99999,
        }}
      />
      {/* Gold glow ring — 40px, centered via negative margin */}
      <div
        ref={trailRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          marginTop: -20,
          marginLeft: -20,
          borderRadius: '50%',
          border: '1px solid rgba(240, 180, 41, 0.5)',
          boxShadow: '0 0 16px rgba(240, 180, 41, 0.2)',
          pointerEvents: 'none',
          zIndex: 99998,
        }}
      />
    </>
  )
}
