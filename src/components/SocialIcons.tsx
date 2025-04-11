import styles from './SocialIcons.module.css'
import {
  Github,
  Linkedin,
  Youtube,
  Instagram,
  Mail
} from 'lucide-react'
import { FaTiktok, FaDiscord } from 'react-icons/fa6'
import { SiBluesky } from 'react-icons/si'

const links = [
  { name: 'GitHub', url: 'https://github.com/jcahnProgramming', icon: <Github /> },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/jcahn/', icon: <Linkedin /> },
  { name: 'Bluesky', url: 'https://bsky.app/profile/pathorian.bsky.social', icon: <SiBluesky /> },
  { name: 'Instagram', url: 'https://www.instagram.com/officialpathorian/', icon: <Instagram /> },
  { name: 'YouTube', url: 'https://www.youtube.com/@Pathorian', icon: <Youtube /> },
  { name: 'TikTok', url: 'https://www.tiktok.com/@pathorian99', icon: <FaTiktok /> },
  { name: 'Discord', url: 'https://discord.com/users/.path', icon: <FaDiscord /> },
  { name: 'Email', url: 'mailto:jamie.cahn93@gmail.com', icon: <Mail /> },
]

export default function SocialIcons() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Connect With Me</h2>
      <div className={styles.card}>
        <div className={styles.iconGrid}>
          {links.map(({ name, url, icon }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconWrapper}
            >
              <div className={styles.icon}>{icon}</div>
              <span className={styles.label}>{name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
