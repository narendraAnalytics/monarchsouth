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
      style={{ minHeight: '100vh', backgroundColor: '#150c05', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={{ textAlign: 'center', fontFamily: "'Space Mono', monospace" }}>
        <p style={{ color: 'rgba(212,160,23,0.5)', fontSize: '10px', letterSpacing: '0.3em', marginBottom: '16px' }}>
          [COLLECTIONS · SPRING 2026]
        </p>
        <h1 style={{ color: '#f5e6c8', fontSize: 'clamp(2rem, 5vw, 4rem)', fontFamily: "'Playfair Display', serif", marginBottom: '24px', lineHeight: 1.1 }}>
          THE FULL RANGE
        </h1>
        <p style={{ color: '#c9a96e', fontSize: '12px', letterSpacing: '0.15em', marginBottom: '40px' }}>
          COMING SOON — BUILD IN PROGRESS
        </p>
        <button
          onClick={() => navigate('home')}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            border: '1px solid rgba(212,160,23,0.3)',
            color: '#c9a96e',
            background: 'transparent',
            padding: '12px 24px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            (e.target as HTMLButtonElement).style.color = '#d4a017'
            ;(e.target as HTMLButtonElement).style.borderColor = '#d4a017'
          }}
          onMouseLeave={e => {
            (e.target as HTMLButtonElement).style.color = '#c9a96e'
            ;(e.target as HTMLButtonElement).style.borderColor = 'rgba(212,160,23,0.3)'
          }}
        >
          ← BACK TO HOME
        </button>
      </div>
    </motion.div>
  )
}
