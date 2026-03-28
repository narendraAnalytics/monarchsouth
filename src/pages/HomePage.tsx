import { motion } from 'framer-motion'
import { pageVariants } from '../lib/transitions'
import MergedHero from '../components/sections/MergedHero'
import type { PageId } from '../App'

interface HomePageProps {
  navigate: (page: PageId) => void
}

export default function HomePage({ navigate }: HomePageProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <MergedHero navigate={navigate} />
    </motion.div>
  )
}
