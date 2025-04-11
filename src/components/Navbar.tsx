import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './Navbar.module.css'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <motion.nav
      className={styles.navbar}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <NavLink to="/" className={styles.logo}>
        <motion.span
          whileTap={{ scale: 0.9, rotate: -2 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Jamie Cahn
        </motion.span>
      </NavLink>

      <div className={styles.links}>
        <NavLink
          to="/marketing"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          Marketing
        </NavLink>

        <NavLink
          to="/operations"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          Operations
        </NavLink>

        <NavLink
          to="/dev"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          Development
        </NavLink>

        <NavLink
          to="/game-design"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          Game Design
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          Contact
        </NavLink>

        <ThemeToggle />
      </div>
    </motion.nav>
  )
}
