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

const LENS_W = 90
const LENS_H = 90
const ZOOM = 3
const RESULT_W = 220
const RESULT_H = 220

const FRAMES = [
  '/images/herosecctionimg/imagetshirt.png',
  '/images/herosecctionimg/imagemoreleft2.png',
  '/images/herosecctionimg/imageside3.png',
  '/images/herosecctionimg/imagebackleft4.png',
  '/images/herosecctionimg/imageback5.png',
  '/images/herosecctionimg/imagebackright6.png',
  '/images/herosecctionimg/imageside7.png',
]

export default function MergedHero({ navigate }: MergedHeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [logoKey, setLogoKey] = useState(0)
  const [navKeys, setNavKeys] = useState<number[]>([0, 0, 0])
  const [zoomActive, setZoomActive] = useState(false)
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 })
  const [currentFrame, setCurrentFrame] = useState(0)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const productRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const zoomResultRef = useRef<HTMLDivElement>(null)
  const lensRef = useRef<HTMLDivElement>(null)
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

  // Auto-advance frames after entrance animation completes
  useEffect(() => {
    const delay = setTimeout(() => {
      const id = setInterval(() => {
        setCurrentFrame(f => (f + 1) % FRAMES.length)
      }, 500)
      return () => clearInterval(id)
    }, 1500)
    return () => clearTimeout(delay)
  }, [])

  // Crossfade: briefly dip opacity on each frame change
  useEffect(() => {
    if (!imageRef.current) return
    imageRef.current.style.opacity = '0'
    const t = setTimeout(() => {
      if (imageRef.current) imageRef.current.style.opacity = '1'
    }, 80)
    return () => clearTimeout(t)
  }, [currentFrame])

  const handleZoomEnter = () => setZoomActive(true)

  const handleZoomLeave = () => setZoomActive(false)

  const handleZoomMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current || !imageRef.current || !zoomResultRef.current) return

    const frameRect = frameRef.current.getBoundingClientRect()
    const imgRect = imageRef.current.getBoundingClientRect()

    const curX = e.clientX - frameRect.left
    const curY = e.clientY - frameRect.top

    const imgLeft = imgRect.left - frameRect.left
    const imgTop  = imgRect.top  - frameRect.top

    const lensX = Math.max(imgLeft, Math.min(curX - LENS_W / 2, imgLeft + imgRect.width  - LENS_W))
    const lensY = Math.max(imgTop,  Math.min(curY - LENS_H / 2, imgTop  + imgRect.height - LENS_H))

    setLensPos({ x: lensX, y: lensY })

    const pctX = (lensX - imgLeft + LENS_W / 2) / imgRect.width
    const pctY = (lensY - imgTop  + LENS_H / 2) / imgRect.height

    const bgW = imgRect.width  * ZOOM
    const bgH = imgRect.height * ZOOM
    const bgX = -(pctX * bgW - RESULT_W / 2)
    const bgY = -(pctY * bgH - RESULT_H / 2)

    zoomResultRef.current.style.backgroundSize     = `${bgW}px ${bgH}px`
    zoomResultRef.current.style.backgroundPosition = `${bgX}px ${bgY}px`
  }

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
              <div
                ref={frameRef}
                className="hero-product-frame"
                onMouseEnter={handleZoomEnter}
                onMouseMove={handleZoomMove}
                onMouseLeave={handleZoomLeave}
              >
                <img
                  ref={imageRef}
                  src={FRAMES[currentFrame]}
                  alt="MONARCHSOUTH Icon Tee"
                  className="hero-product-img"
                />
                {/* Zoom lens crosshair follows cursor */}
                <div
                  ref={lensRef}
                  className={`hero-zoom-lens${zoomActive ? ' hero-zoom-lens--active' : ''}`}
                  style={{ left: lensPos.x, top: lensPos.y }}
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
            {/* Zoom result box — outside tilt wrapper to avoid 3D distortion */}
            <div
              ref={zoomResultRef}
              className={`hero-zoom-result${zoomActive ? ' hero-zoom-result--active' : ''}`}
              style={{ backgroundImage: `url('${FRAMES[currentFrame]}')` }}
            >
              <span className="hero-zoom-label">[ZOOM]</span>
            </div>
          </div>

        </div>

        {/* ─ BOTTOM HUD STRIP ─────────────────────────────── */}
        <div className="hero-bottom-hud">
          <span>SUPIMA COTTON · MERINO WOOL · ITALIAN FABRIC · HAND STITCHED</span>
          <span>[X] {String(currentFrame + 1).padStart(3, '0')} / {String(FRAMES.length).padStart(3, '0')}</span>
        </div>
      </div>

      {/* ── Subtle bottom gradient vignette ───────────────── */}
      <div className="hero-vignette" />

    </section>
  )
}
