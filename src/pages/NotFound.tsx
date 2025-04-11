import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './NotFound.module.css'
import mascot from '../assets/mascot.png'

const messages = [
  "Oops! This path went rogue.",
  "Looks like this page ran off!",
  "404... but at least you're stylish.",
  "You found the void 🕳️",
  "Not all who wander are lost... but this page is.",
  "This isn’t where you parked your car.",
  "Error 404: Jokes not found either.",
  "Your page took an unscheduled vacation."
]

export default function NotFound() {
  const [message, setMessage] = useState(messages[0])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const random = messages[Math.floor(Math.random() * messages.length)]
    setMessage(random)
  }, [])

  const handleMascotClick = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setIsAnimating(false)
      }, 15000) // 15 seconds
    }
  }

  return (
    <main className={styles.container}>
      <AnimatePresence mode="wait">
        {!isAnimating && (
          <motion.div
            key="box"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 1000 }}
            transition={{ duration: 0.8 }}
            className={styles.box}
          >
            <motion.img
              src={mascot}
              alt="Mascot"
              className={styles.mascot}
              onClick={handleMascotClick}
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            <h1>404</h1>
            <p>{message}</p>
            <Link to="/" className={styles.button}>Return Home</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
