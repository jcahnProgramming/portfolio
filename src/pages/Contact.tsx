import styles from './Contact.module.css'
import { motion } from 'framer-motion'
import SocialIcons from '../components/SocialIcons'
import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [isSent, setIsSent] = useState(false)

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setIsSent(true)
        formRef.current?.reset()
      })
      .catch((err) => {
        console.error('EmailJS error:', err)
      })
  }

  return (
    <main className={styles.container}>
      <motion.h1
        style={{ textAlign: 'center', marginTop: '2rem' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact Me
      </motion.h1>

      <motion.p
        className={styles.description}
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        I'm always excited to connect! Feel free to reach out through any of my social platforms below
        — or send a message directly through the form.
      </motion.p>

      <motion.form
        ref={formRef}
        className={styles.form}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        onSubmit={handleSubmit}
      >
        <input type="text" name="from_name" placeholder="Your Name" required />
        <input type="email" name="from_email" placeholder="Your Email" required />
        <textarea name="message" rows={5} placeholder="Your Message" required />
        <button type="submit">Send Message</button>
      </motion.form>

      {isSent && (
        <motion.p
          className={styles.success}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          ✅ Thank you! Your message has been sent.
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <SocialIcons />
      </motion.div>
    </main>
  )
}
