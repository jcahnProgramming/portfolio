import PageWrapper from '../components/PageWrapper'
import styles from './Home.module.css'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import profile from '../assets/profile.jpg'

// Lucide icons
import { Megaphone, Settings, Code, Gamepad2 } from 'lucide-react'

const MotionLink = motion(Link)

export default function Home() {
  const categories = [
    { label: 'Marketing', path: '/marketing', icon: Megaphone },
    { label: 'Operations', path: '/operations', icon: Settings },
    { label: 'Development', path: '/dev', icon: Code },
    { label: 'Game Design', path: '/game-design', icon: Gamepad2 },
  ]

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.img
          src={profile}
          alt="Jamie Cahn"
          className={styles.profile}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hi, I’m Jamie Cahn 👋
        </motion.h1>

        <motion.p
          className={styles.subtext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          I specialize in Marketing, Operations, Software Development, and Game Design.
          Explore the areas where I’ve done things differently — and delivered awesome results.
        </motion.p>
      </section>

      {/* Category Cards */}
      <motion.section
        className={styles.cardsSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
      >
        <h2>Explore My Work</h2>
        <div className={styles.cardsGrid}>
          {categories.map(({ label, path, icon: Icon }) => (
            <MotionLink
              to={path}
              key={path}
              className={`${styles.card} ${styles.cardLinkWrapper}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Icon size={32} strokeWidth={2.5} className={styles.icon} />
              <h3>{label}</h3>
            </MotionLink>
          ))}
        </div>
      </motion.section>

      {/* Featured Projects */}
      <motion.section
        className={styles.featured}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6 }}
      >
      </motion.section>
    </PageWrapper>
  )
}
