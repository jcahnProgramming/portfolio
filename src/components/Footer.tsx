// src/components/Footer.tsx
import styles from './Footer.module.css'
import SocialIcons from './SocialIcons'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <SocialIcons />
      <p>© {new Date().getFullYear()} Jamie Cahn. All rights reserved.</p>
    </footer>
  )
}
