import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import GlowCursor from './components/ui/GlowCursor'
import NoiseOverlay from './components/ui/NoiseOverlay'
import HomePage from './pages/HomePage'
import CollectionsPage from './pages/CollectionsPage'
import LookbookPage from './pages/LookbookPage'
import AboutPage from './pages/AboutPage'

export type PageId = 'home' | 'collections' | 'lookbook' | 'about'

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home')

  const navigate = useCallback((page: PageId) => {
    setCurrentPage(page)
  }, [])

  return (
    <>
      <GlowCursor />
      <NoiseOverlay />
      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <HomePage key="home" navigate={navigate} />
        )}
        {currentPage === 'collections' && (
          <CollectionsPage key="collections" navigate={navigate} />
        )}
        {currentPage === 'lookbook' && (
          <LookbookPage key="lookbook" navigate={navigate} />
        )}
        {currentPage === 'about' && (
          <AboutPage key="about" navigate={navigate} />
        )}
      </AnimatePresence>
    </>
  )
}
