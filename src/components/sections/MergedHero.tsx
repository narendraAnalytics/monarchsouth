import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import HeroCanvas from '../three/HeroCanvas'
import TextScramble from '../ui/TextScramble'
import type { PageId } from '../../App'

interface MergedHeroProps {
  navigate: (page: PageId) => void
}

const NAV_LINKS: { label: string; page: PageId }[] = [
  { label: 'SHOP', page: 'collections' },
  { label: 'LOOKBOOK', page: 'lookbook' },
  { label: 'ABOUT', page: 'about' },
]

function LiveClock() {
  const [time, setTime] = useState(() => new Date().toTimeString().slice(0, 8))
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toTimeString().slice(0, 8))
    }, 1000)
    return () => clearInterval(id)
  }, [])
  return <>{time}</>
}

const today = new Date()
const sessionDate = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`

export default function MergedHero({ navigate }: MergedHeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({
      x: e.clientX / window.innerWidth - 0.5,
      y: e.clientY / window.innerHeight - 0.5,
    })
  }

  const spotlightX = (mousePos.x + 0.5) * 100
  const spotlightY = (mousePos.y + 0.5) * 100

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#08101e',
      }}
      onMouseMove={handleMouseMove}
    >
      {/* ── Layer 0: 3D Canvas ─────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
          style={{ background: 'transparent', width: '100%', height: '100%' }}
        >
          <HeroCanvas mouseX={mousePos.x} mouseY={mousePos.y} />
        </Canvas>
      </div>

      {/* ── Layer 1: Radial spotlight follows mouse ──────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background: `radial-gradient(700px circle at ${spotlightX}% ${spotlightY}%, rgba(240,180,41,0.055) 0%, transparent 70%)`,
          transition: 'background 0.1s ease',
        }}
      />

      {/* ── Layer 2: All UI ─────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* ─ NAV ─────────────────────────────────────────── */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '28px 40px 0',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => navigate('home')}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '13px',
              letterSpacing: '0.2em',
              color: '#f0b429',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            [MONARCHSOUTH]
          </button>

          {/* Nav links */}
          <ul style={{ display: 'flex', gap: '40px', listStyle: 'none', margin: 0, padding: 0 }}>
            {NAV_LINKS.map(({ label, page }) => (
              <li key={label}>
                <button
                  onClick={() => navigate(page)}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '10px',
                    letterSpacing: '0.25em',
                    color: 'rgba(240,244,255,0.55)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => ((e.target as HTMLElement).style.color = '#f0b429')}
                  onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(240,244,255,0.55)')}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* ─ TERMINAL HUD (top-right, absolute) ──────────── */}
        <div
          style={{
            position: 'absolute',
            top: '100px',
            right: '40px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px',
            lineHeight: '1.9',
            color: 'rgba(240,180,41,0.65)',
            border: '1px solid rgba(240,180,41,0.18)',
            padding: '16px 20px',
            backgroundColor: 'rgba(8,16,30,0.7)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            minWidth: '220px',
          }}
        >
          <div style={{ color: '#f0b429', letterSpacing: '0.2em', marginBottom: '6px' }}>
            MONARCH STATUS
          </div>
          <div style={{ borderBottom: '1px solid rgba(240,180,41,0.15)', marginBottom: '8px' }} />
          <div>SESSION &nbsp;&nbsp;: [{sessionDate}]</div>
          <div>TIME &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: [<LiveClock />]</div>
          <div>COLLECTION: [SPRING 2026]</div>
          <div>INVENTORY : (LOADED)</div>
          <div>STATUS &nbsp;&nbsp;&nbsp;: (ACTIVE)</div>
        </div>

        {/* ─ HERO CONTENT (centered) ──────────────────────── */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 40px',
            textAlign: 'center',
          }}
        >
          {/* Pre-headline badge */}
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.35em',
              color: 'rgba(240,180,41,0.5)',
              marginBottom: '24px',
              textTransform: 'uppercase',
            }}
          >
            [NEW COLLECTION &nbsp;·&nbsp; SPRING 2026]
          </div>

          {/* Main headline */}
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.8rem, 6.5vw, 6rem)',
              lineHeight: 1.05,
              fontWeight: 700,
              color: '#f0f4ff',
              marginBottom: '0',
              letterSpacing: '-0.01em',
            }}
          >
            <TextScramble
              text="ENGINEERED FOR"
              style={{ display: 'block' }}
              delay={200}
              duration={1200}
            />
            <TextScramble
              text="THE BOLD."
              style={{
                display: 'block',
                background: 'linear-gradient(135deg, #f0b429 0%, #3d8bff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              delay={600}
              duration={1000}
            />
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
              color: '#7a9cc4',
              maxWidth: '440px',
              lineHeight: 1.7,
              marginTop: '28px',
              marginBottom: '44px',
              fontWeight: 300,
            }}
          >
            Precision-crafted menswear. Italian fabrics.
            Uncompromising construction.
          </p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => navigate('collections')}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                border: '1px solid #f0b429',
                color: '#f0b429',
                background: 'transparent',
                padding: '14px 32px',
                cursor: 'pointer',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.backgroundColor = '#f0b429'
                el.style.color = '#08101e'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.backgroundColor = 'transparent'
                el.style.color = '#f0b429'
              }}
            >
              [SHOP COLLECTION]
            </button>
            <button
              onClick={() => navigate('lookbook')}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                border: '1px solid rgba(240,244,255,0.2)',
                color: 'rgba(240,244,255,0.5)',
                background: 'transparent',
                padding: '14px 32px',
                cursor: 'pointer',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(240,244,255,0.6)'
                el.style.color = '#f0f4ff'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(240,244,255,0.2)'
                el.style.color = 'rgba(240,244,255,0.5)'
              }}
            >
              [EXPLORE ↗]
            </button>
          </div>
        </div>

        {/* ─ BOTTOM HUD STRIP ─────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 40px 28px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.18em',
            color: 'rgba(122,156,196,0.4)',
          }}
        >
          <span>SUPIMA COTTON · MERINO WOOL · ITALIAN FABRIC · HAND STITCHED</span>
          <span>[X] 001 / 001</span>
        </div>
      </div>

      {/* ── Subtle bottom gradient vignette ───────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(to top, rgba(8,16,30,0.6) 0%, transparent 100%)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}
