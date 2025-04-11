import styles from './GameDesign.module.css'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PlaceholderImage from '../assets/badges/placeholder.png'

// 🛠️ Badge imports (replace with yours later)
import Unity from '../assets/badges/unity.png'
import CSharp from '../assets/badges/csharp.png'
import Unreal from '../assets/badges/unreal.png'
import ThreeJS from '../assets/badges/3js.png'
import CPP from '../assets/badges/cpp.png'

type GameDesignItem = {
  title: string
  category: string
  src: string
  content: string[]
  pdf?: string
  badges?: string[]
}

const gameDesignItems: GameDesignItem[] = [
  {
    title: 'Narrative Design for AR Game',
    category: 'Narrative',
    src: PlaceholderImage,
    content: [
      'Designed immersive lore and branching dialogues for an AR treasure hunt game.',
      'Integrated environmental storytelling into real-world locations.'
    ],
    pdf: '/assets/docs/NarrativeDesign.pdf',
    badges: [Unity, CSharp]
  },
  {
    title: 'Puzzle Mechanics Prototype',
    category: 'Systems',
    src: PlaceholderImage,
    content: [
      'Created a modular puzzle system using Unity and scriptable objects.',
      'Focused on reusable mechanics for scalable level design.'
    ],
    badges: [Unity, CSharp]
  },
  {
    title: 'Real-Time Combat System in UE5',
    category: 'Mechanics',
    src: PlaceholderImage,
    content: [
      'Developed a real-time combat framework using Blueprints in Unreal Engine 5.',
      'Designed for flexibility with animation state machines and dynamic hit detection.'
    ],
    badges: [Unreal, CPP]
  },
  {
    title: '3D UI for Web-Based Game',
    category: 'Art',
    src: PlaceholderImage,
    content: [
      'Built an interactive 3D UI using Three.js with mouse-based controls.',
      'Designed visual feedback systems to guide the player through tutorials.'
    ],
    badges: [ThreeJS]
  }
]

const categories = ['All', 'Art', 'Mechanics', 'Narrative', 'Systems']

export default function GameDesign() {
  const [active, setActive] = useState('All')
  const [expandedItem, setExpandedItem] = useState<null | GameDesignItem>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)

  // ESC key + scroll lock
  useEffect(() => {
    if (!expandedItem) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpandedItem(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [expandedItem])

  // Click outside to close
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setExpandedItem(null)
    }
  }

  // Swipe to close
  let touchStartY = 0
  let touchEndY = 0
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY = e.changedTouches[0].screenY
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndY = e.changedTouches[0].screenY
    if (touchEndY - touchStartY > 100) setExpandedItem(null)
  }

  const filtered = active === 'All' ? gameDesignItems : gameDesignItems.filter(item => item.category === active)

  return (
    <main>
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Game Design Highlights</h1>
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
          key={active}
          className={styles.grid}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {filtered.map((item, i) => (
            <motion.div
              className={styles.card}
              key={item.title + i}
              onClick={() => setExpandedItem(item)}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <img src={item.src} alt={item.title} />
              <h3>{item.title}</h3>
              {item.content && <p>{item.content[0]}</p>}
              {item.badges && (
                <div className={styles.cardBadges}>
                  {item.badges.map((badge, i) => (
                    <img src={badge} key={i} alt="Badge" className={styles.badge} />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {expandedItem && (
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
              <button className={styles.closeBtn} onClick={() => setExpandedItem(null)}>✕</button>
              <img src={expandedItem.src} alt={expandedItem.title} className={styles.modalImage} />
              <h3>{expandedItem.title}</h3>
              {expandedItem.content.map((line, i) => <p key={i}>{line}</p>)}
              {expandedItem.badges && (
                <div className={styles.modalBadges}>
                  {expandedItem.badges.map((badge, i) => (
                    <img src={badge} key={i} alt="Badge" className={styles.badge} />
                  ))}
                </div>
              )}
              {expandedItem.pdf && (
                <a href={expandedItem.pdf} download className={styles.downloadBtn}>
                  Download PDF
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
