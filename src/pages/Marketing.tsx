import styles from './Marketing.module.css'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ✅ Image imports
import CostlyBreakdowns from '../assets/CostlyBreakdowns.jpg'
import FinancialTips from '../assets/FinancialTips.jpg'
import FurnacePromo from '../assets/Furnace_Promo.png'
import Hiring from '../assets/Hiring.jpg'
import IAQ from '../assets/IAQ.jpg'
import StayWarm from '../assets/StayWarm.jpg'
import RealEstateFBPromo from '../assets/RealEstateFBPromo.png'
import CodePoke from '../assets/Code_Poke_FB_Graphic.png'
import YouTubeTitleCard from '../assets/YouTube_Title_Card.png'
import LegalSite from '../assets/legal-site.jpg'

type ItemType = {
  title: string
  category: string
  type: 'image' | 'video'
  src: string
  copy?: string
}

const marketingItems: ItemType[] = [
  {
    title: 'Service Plans Graphic (Social Media)',
    category: 'HVAC',
    type: 'image',
    src: CostlyBreakdowns,
    copy: 'Designed a visually engaging, multi-platform digital marketing asset with persuasive copy to promote PS Cool Heat’s HVAC service plans and educate customers on preventative maintenance benefits.'
  },
  {
    title: 'Financial Tips Graphic (Social Media)',
    category: 'HVAC',
    type: 'image',
    src: FinancialTips,
    copy: 'This project involved designing a vibrant, educational graphic offering three essential financial tips to inform and build trust with prospective HVAC buyers.'
  },
  {
    title: 'Seasonal HVAC Advertisement (Social Media)',
    category: 'HVAC',
    type: 'image',
    src: FurnacePromo,
    copy: 'Seasonal promotional graphic highlighting PS Cool Heats limited-time offer of a free furnace with qualifying A/C or heat pump purchases, emphasizing urgency and alignment with Lennoxs Merit Series.'
  },
  {
    title: 'PS Cool Heat Hiring Ad (Social Media)',
    category: 'HVAC',
    type: 'image',
    src: Hiring,
    copy: 'Social media graphic designed for Facebook and Instagram to attract qualified job applicants and boost employer branding.'
  },
  {
    title: 'Lennox IAQ - PS Cool Heat (Social Media)',
    category: 'HVAC',
    type: 'image',
    src: IAQ,
    copy: 'Social media graphic highlighting Lennox® Indoor Air Quality products and emphasizing the benefits of residential air purification and filtration.'
  },
  {
    title: 'Stay Warm - Remote Workers (Social Media)',
    category: 'HVAC',
    type: 'image',
    src: StayWarm,
    copy: 'Social media graphic offering practical wintertime tips for remote workers, designed to boost PS Cool Heats brand visibility and HVAC awareness.'
  },
  {
    title: 'Real Estate Promo (Social Media)',
    category: 'Real Estate',
    type: 'image',
    src: RealEstateFBPromo,
    copy: 'Real estate graphic promoting Denver-area home listings with a clean, aspirational design to engage potential buyers on social media.'
  },
  {
    title: 'Restaurant Promo (Social Media)',
    category: 'Restaurants',
    type: 'image',
    src: CodePoke,
    copy: 'Promotional graphic for Code:Poke designed to boost brand awareness and drive online orders through appetizing visuals on local social media platforms.'
  },
  {
    title: 'YouTube Title Card - Gaming',
    category: 'YouTube',
    type: 'image',
    src: YouTubeTitleCard,
    copy: 'Humorous title card graphic for a Minecraft YouTube episode on the chaotic April Fools 2025 update, designed to boost clicks and engagement across social platforms.'
  },
  {
    title: 'Legal Landing Page Copy',
    category: 'Legal',
    type: 'image',
    src: LegalSite,
    copy: 'Crafted persuasive headline and call-to-action for law firm’s lead gen page.'
  },
  {
    title: 'Tech Product Explainer',
    category: 'Tech',
    type: 'video',
    src: 'https://www.youtube.com/embed/ysz5S6PUM-U',
    copy: 'Produced an animated explainer showcasing a SaaS platform’s key features.'
  },
]

const categories = ['All', 'HVAC', 'Legal', 'Real Estate', 'Restaurants', 'Tech', 'YouTube']

export default function Marketing() {
  const [active, setActive] = useState('All')
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)

  // ✅ ESC key + Scroll lock
  useEffect(() => {
    if (!selectedItem) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItem(null)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedItem])

  // ✅ Click outside to close
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setSelectedItem(null)
    }
  }

  // ✅ Swipe to close
  let touchStartY = 0
  let touchEndY = 0

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY = e.changedTouches[0].screenY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndY = e.changedTouches[0].screenY
    if (touchStartY && touchEndY - touchStartY > 100) {
      setSelectedItem(null)
    }
  }

  const filteredItems =
    active === 'All' ? marketingItems : marketingItems.filter(item => item.category === active)

  return (
    <main>
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Marketing Portfolio</h1>

      <div className={styles.tabs}>
        {categories.map(category => (
          <button
            key={category}
            className={`${styles.tab} ${active === category ? styles.active : ''}`}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          className={styles.grid}
          key={active}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {filteredItems.map((item, i) => (
            <motion.div
              className={styles.card}
              key={item.title + i}
              onClick={() => setSelectedItem(item)}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              {item.type === 'image' ? (
                <img src={item.src} alt={item.title} />
              ) : (
                <iframe
                  src={item.src}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
              <h3>{item.title}</h3>
              {item.copy && <p>{item.copy}</p>}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* 🔍 Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOutsideClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              ref={modalRef}
              className={styles.modalContent}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button className={styles.closeBtn} onClick={() => setSelectedItem(null)}>
                ✕
              </button>
              {selectedItem.type === 'image' ? (
                <img src={selectedItem.src} alt={selectedItem.title} />
              ) : (
                <iframe
                  src={selectedItem.src}
                  title={selectedItem.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
              <h3>{selectedItem.title}</h3>
              {selectedItem.copy && <p>{selectedItem.copy}</p>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
