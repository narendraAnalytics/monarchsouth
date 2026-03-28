import { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import HeroCanvas from '../three/HeroCanvas'
import TextScramble from '../ui/TextScramble'
import type { PageId } from '../../App'
import './MergedHero.css'

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
  const [logoKey, setLogoKey] = useState(0)
  const [navKeys, setNavKeys] = useState<number[]>([0, 0, 0])
  const spotlightRef = useRef<HTMLDivElement>(null)
  const productRef = useRef<HTMLDivElement>(null)
  const spotlightX = (mousePos.x + 0.5) * 100
  const spotlightY = (mousePos.y + 0.5) * 100

  useEffect(() => {
    if (spotlightRef.current) {
      spotlightRef.current.style.background = `radial-gradient(700px circle at ${spotlightX}% ${spotlightY}%, rgba(212,160,23,0.055) 0%, transparent 70%)`
    }
  }, [spotlightX, spotlightY])

  useEffect(() => {
    if (productRef.current) {
      const tiltX = -mousePos.y * 20
      const tiltY = mousePos.x * 20
      productRef.current.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
    }
  }, [mousePos])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({
      x: e.clientX / window.innerWidth - 0.5,
      y: e.clientY / window.innerHeight - 0.5,
    })
  }

  return (
    <section className="hero-section" onMouseMove={handleMouseMove}>

      {/* ── Layer 0: 3D Canvas ─────────────────────────── */}
      <div className="hero-canvas-wrapper">
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
      <div ref={spotlightRef} className="hero-spotlight" />

      {/* ── Layer 2: All UI ─────────────────────────────── */}
      <div className="hero-ui">

        {/* ─ NAV ─────────────────────────────────────────── */}
        <nav className="hero-nav">

          {/* Logo */}
          <button
            title="[MONARCHSOUTH]"
            className="hero-logo"
            onClick={() => navigate('home')}
            onMouseEnter={() => setLogoKey(k => k + 1)}
          >
            <img src="/images/logo.png" alt="MONARCHSOUTH logo" className="hero-logo-img" />
            <TextScramble key={logoKey} text="[MONARCHSOUTH]" duration={700} delay={0} />
          </button>

          {/* Nav links */}
          <ul className="hero-nav-links">
            {NAV_LINKS.map(({ label, page }, i) => (
              <li key={label}>
                <button
                  title={label}
                  className="hero-nav-btn"
                  onClick={() => navigate(page)}
                  onMouseEnter={() => setNavKeys(keys => keys.map((k, j) => j === i ? k + 1 : k))}
                >
                  <TextScramble key={navKeys[i]} text={label} duration={500} delay={0} />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* ─ TERMINAL HUD (top-right, absolute) ──────────── */}
        <div className="hero-hud">
          <div className="hero-hud-title">MONARCH STATUS</div>
          <div className="hero-hud-divider" />
          <div>SESSION &nbsp;&nbsp;: [{sessionDate}]</div>
          <div>TIME &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: [<LiveClock />]</div>
          <div>COLLECTION: [SPRING 2026]</div>
          <div>INVENTORY : (LOADED)</div>
          <div>STATUS &nbsp;&nbsp;&nbsp;: (ACTIVE)</div>
        </div>

        {/* ─ HERO CONTENT (centered) ──────────────────────── */}
        <div className="hero-content">

          {/* Pre-headline badge */}
          <div className="hero-badge">
            [NEW COLLECTION &nbsp;·&nbsp; SPRING 2026]
          </div>

          {/* Product image with premium animations */}
          <div className="hero-product-scene">
            <div className="hero-product-glow" />
            <div ref={productRef} className="hero-product-wrapper">
              <div className="hero-product-frame">
                <img
                  src="/images/herosecctionimg/imagetshirt.png"
                  alt="MONARCHSOUTH Icon Tee"
                  className="hero-product-img"
                />
                <div className="hero-hotspot hero-hotspot-1">
                  <div className="hero-hotspot-ring" />
                  <div className="hero-hotspot-dot" />
                  <span className="hero-hotspot-label">SUPIMA COTTON</span>
                </div>
                <div className="hero-hotspot hero-hotspot-2">
                  <div className="hero-hotspot-ring" />
                  <div className="hero-hotspot-dot" />
                  <span className="hero-hotspot-label">HAND STITCHED</span>
                </div>
                <div className="hero-hotspot hero-hotspot-3">
                  <div className="hero-hotspot-ring" />
                  <div className="hero-hotspot-dot" />
                  <span className="hero-hotspot-label">ITALIAN FABRIC</span>
                </div>
                <div className="hero-hotspot hero-hotspot-4">
                  <div className="hero-hotspot-ring" />
                  <div className="hero-hotspot-dot" />
                  <span className="hero-hotspot-label">MERINO WOOL</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ─ BOTTOM HUD STRIP ─────────────────────────────── */}
        <div className="hero-bottom-hud">
          <span>SUPIMA COTTON · MERINO WOOL · ITALIAN FABRIC · HAND STITCHED</span>
          <span>[X] 001 / 001</span>
        </div>
      </div>

      {/* ── Subtle bottom gradient vignette ───────────────── */}
      <div className="hero-vignette" />

    </section>
  )
}
