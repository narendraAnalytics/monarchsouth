import { motion } from 'framer-motion'
import { pageVariants } from '../lib/transitions'
import type { PageId } from '../App'

interface Props {
  navigate: (page: PageId) => void
}

export default function CollectionsPage({ navigate }: Props) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ minHeight: '100vh', backgroundColor: '#08101e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={{ textAlign: 'center', fontFamily: "'Space Mono', monospace" }}>
        <p style={{ color: 'rgba(240,180,41,0.5)', fontSize: '10px', letterSpacing: '0.3em', marginBottom: '16px' }}>
          [COLLECTIONS · SPRING 2026]
        </p>
        <h1 style={{ color: '#f0f4ff', fontSize: 'clamp(2rem, 5vw, 4rem)', fontFamily: "'Playfair Display', serif", marginBottom: '24px', lineHeight: 1.1 }}>
          THE FULL RANGE
        </h1>
        <p style={{ color: '#7a9cc4', fontSize: '12px', letterSpacing: '0.15em', marginBottom: '40px' }}>
          COMING SOON — BUILD IN PROGRESS
        </p>
        <button
          onClick={() => navigate('home')}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            border: '1px solid rgba(240,180,41,0.3)',
            color: '#7a9cc4',
            background: 'transparent',
            padding: '12px 24px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            (e.target as HTMLButtonElement).style.color = '#f0b429'
            ;(e.target as HTMLButtonElement).style.borderColor = '#f0b429'
          }}
          onMouseLeave={e => {
            (e.target as HTMLButtonElement).style.color = '#7a9cc4'
            ;(e.target as HTMLButtonElement).style.borderColor = 'rgba(240,180,41,0.3)'
          }}
        >
          ← BACK TO HOME
        </button>
      </div>
    </motion.div>
  )
}
