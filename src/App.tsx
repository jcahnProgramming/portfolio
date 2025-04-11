import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import Footer from './components/Footer'
import Home from './pages/Home'
import Marketing from './pages/Marketing'
import Operations from './pages/Operations'
import Dev from './pages/Development'
import GameDesign from './pages/GameDesign'
import NotFound from './pages/NotFound'
import Contact from './pages/Contact'
import KonamiListener from './components/KonamiListener'

export default function App() {
  const location = useLocation()
  const showFooter = location.pathname !== '/contact'

  return (
    <>

    <KonamiListener />
    
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/dev" element={<Dev />} />
            <Route path="/game-design" element={<GameDesign />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </Layout>
      {showFooter && <Footer />}
    </>
  )
}
