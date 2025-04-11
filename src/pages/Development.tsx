import styles from './Development.module.css'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PlaceholderImage from '../assets/badges/placeholder.png'

// ✅ Badge imports
import HTML from '../assets/badges/html5.png'
import CSS from '../assets/badges/css.png'
import JS from '../assets/badges/javascript.png'
import TS from '../assets/badges/typescript.png'
import ReactIcon from '../assets/badges/react.png'
import Node from '../assets/badges/node.png'
import API from '../assets/badges/api.png'
import Python from '../assets/badges/python.png'

const devItems = [
  {
    title: 'Portfolio Website',
    category: 'React Projects',
    src: PlaceholderImage,
    content: [
      'Created a modern, animated portfolio using Vite, React, TailwindCSS, and Framer Motion.',
      'Includes dynamic pages, markdown rendering, dark mode, and interactive modals.'
    ],
    tech: [ReactIcon, TS, HTML, CSS],
    github: 'https://github.com/jamiecahn/portfolio'
  },
  {
    title: 'Task Management API',
    category: 'APIs',
    src: PlaceholderImage,
    content: [
      'Built a RESTful API for task management using Node.js and Express.',
      'Implements CRUD operations, authentication, and data validation.'
    ],
    tech: [Node, JS, API],
    github: 'https://github.com/jamiecahn/task-api'
  },
  {
    title: 'Python CLI Tool',
    category: 'Web Apps',
    src: PlaceholderImage,
    content: [
      'Command-line tool built with Python for automating file operations and reporting.'
    ],
    tech: [Python],
    github: 'https://github.com/jamiecahn/cli-tool'
  }
]

const categories = ['All', 'Web Apps', 'React Projects', 'APIs']

export default function Development() {
  const [active, setActive] = useState('All')
  const [expandedItem, setExpandedItem] = useState<null | typeof devItems[0]>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)

  // ✅ ESC key + Scroll lock
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

  // ✅ Click outside to close
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setExpandedItem(null)
    }
  }

  // ✅ Swipe to close
  let touchStartY = 0, touchEndY = 0
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY = e.changedTouches[0].screenY
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndY = e.changedTouches[0].screenY
    if (touchEndY - touchStartY > 100) setExpandedItem(null)
  }

  const filteredItems =
    active === 'All' ? devItems : devItems.filter(item => item.category === active)

  return (
    <main>
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Development Projects</h1>
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
              onClick={() => setExpandedItem(item)}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <img src={item.src} alt={item.title} />
              <h3>{item.title}</h3>
              {item.content && <p>{item.content[0]}</p>}
              <div className={styles.cardBadges}>
                {item.tech.map((badge, i) => (
                  <img src={badge} alt='Tech badge' key={i} className={styles.badge} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* 🔍 Lightbox Modal */}
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
              {expandedItem.content && expandedItem.content.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              <div className={styles.modalBadges}>
                {expandedItem.tech.map((badge, i) => (
                  <img src={badge} alt="Tech badge" key={i} className={styles.badge} />
                ))}
              </div>
              <a
                href={expandedItem.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubBtn}
              >
                View GitHub Repo
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
