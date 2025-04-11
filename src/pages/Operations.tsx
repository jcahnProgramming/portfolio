import styles from './Operations.module.css'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import FrontPageArtwork from '../assets/FrontPage-Artwork.png'
import PlaceholderImage from '../assets/placeholder-img.jpg'

// ✅ Type Definition
export type OperationItem = {
  title: string
  category: string
  src: string
  content: string[]
  doc?: string
}

const operationsItems: OperationItem[] = [
  {
    title: 'Built an HVAC Playbook for PS Cool Heat',
    category: 'Team Management & Training',
    src: FrontPageArtwork,
    content: [
      'Created a 100+ page HVAC Operational Playbook for the company owner to independently manage systems I implemented.',
      'Built a structured onboarding and training system using the playbook as a foundation.'
    ],
    doc: '/assets/Playbook.docx'
  },
  {
    title: 'Workflow Improvements',
    category: 'Workflow Improvements',
    src: PlaceholderImage,
    content: [
      'Identified inefficiencies in scheduling, billing, and internal communications.',
      'Rebuilt workflows using automation tools and templates: Clickup, HouseCall Pro, GSuite, and CallRail.'
    ]
  },
  {
    title: 'HR Optimization',
    category: 'HR Optimization',
    src: PlaceholderImage,
    content: [
      'Created repeatable hiring, onboarding, and SOP documentation for every role from field tech to office admin.',
      'Utilized GoCo as an HR platform for streamlined document management.'
    ]
  },
  {
    title: 'Employee Benefits',
    category: 'Employee Benefits',
    src: PlaceholderImage,
    content: [
      'Established a company benefits program to improve retention and attract stronger talent.'
    ]
  },
  {
    title: 'Marketing Automation',
    category: 'Marketing',
    src: PlaceholderImage,
    content: [
      'Automated marketing and lead generation with scheduled campaigns across Facebook, Instagram, Google, and Nextdoor.',
      'Used META Business Suite and Nextdoor Ads for Business.'
    ]
  },
  {
    title: 'YouTube Channel Creation',
    category: 'YouTube Channel',
    src: PlaceholderImage,
    content: [
      'Created a How-To series on YouTube to promote help in the community for potential customers.',
      'Marketed videos based on Location, Age Range, and Demographics.'
    ]
  },
  {
    title: 'Service Plan Reusability',
    category: 'Reusability',
    src: PlaceholderImage,
    content: [
      'Built reusable service plan and sales templates to increase conversion and improve upselling consistency.',
      'Utilized HouseCall Pro to streamline sales pipeline.'
    ]
  }
]

const categories = [
  'All',
  'Team Management & Training',
  'Workflow Improvements',
  'HR Optimization',
  'Employee Benefits',
  'Marketing',
  'YouTube Channel',
  'Reusability'
]

export default function Operations() {
  const [active, setActive] = useState('All')
  const [expandedSection, setExpandedSection] = useState<OperationItem | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!expandedSection) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpandedSection(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [expandedSection])

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setExpandedSection(null)
    }
  }

  let touchStartY = 0
  let touchEndY = 0

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY = e.changedTouches[0].screenY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndY = e.changedTouches[0].screenY
    if (touchEndY - touchStartY > 100) {
      setExpandedSection(null)
    }
  }

  const filteredItems =
    active === 'All'
      ? operationsItems
      : operationsItems.filter(item => item.category === active)

  return (
    <main>
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Operations Highlights</h1>

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
              onClick={() => setExpandedSection(item)}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <img src={item.src || PlaceholderImage} alt={item.title} />
              <h3>{item.title}</h3>
              {item.content && item.content.map((text, idx) => <p key={idx}>{text}</p>)}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {expandedSection && (
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
              <button className={styles.closeBtn} onClick={() => setExpandedSection(null)}>
                ✕
              </button>
              <img
                src={expandedSection.src || PlaceholderImage}
                alt={expandedSection.title}
                className={styles.modalImage}
              />
              <h3>{expandedSection.title}</h3>
              {Array.isArray(expandedSection.content) &&
                expandedSection.content.map((text, idx) => <p key={idx}>{text}</p>)}
              {expandedSection.doc && (
                <a href={expandedSection.doc} download className={styles.download}>
                  Download Playbook
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}