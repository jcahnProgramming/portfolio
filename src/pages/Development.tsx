import { useEffect, useState, useRef } from 'react';
import styles from './Development.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

// 🖼 Placeholder image if no default-image.png exists
import PlaceholderImage from '../assets/placeholder-dev.png';

// 🛠️ Language badges
import HTML from '../assets/badges/html5.png';
import CSS from '../assets/badges/css.png';
import JS from '../assets/badges/javascript.png';
import TS from '../assets/badges/typescript.png';
import ReactIcon from '../assets/badges/react.png';
import Node from '../assets/badges/node.png';
import Python from '../assets/badges/python.png';
import Cpp from '../assets/badges/cpp.png';
import CSharp from '../assets/badges/csharp.png';
import ThreeJS from '../assets/badges/3js.png';
import Unity from '../assets/badges/unity.png';
import Unreal from '../assets/badges/unreal.png';
import Go from '../assets/badges/go.png';
import Ruby from '../assets/badges/ruby.png';
import Java from '../assets/badges/java.png';

const badgeMap: Record<string, any> = {
  HTML: HTML,
  CSS: CSS,
  JavaScript: JS,
  TypeScript: TS,
  React: ReactIcon,
  Node: Node,
  Python: Python,
  'C++': Cpp,
  'C#': CSharp,
  ThreeJS: ThreeJS,
  Unity: Unity,
  'Unreal Engine': Unreal,
  Go: Go,
  Ruby: Ruby,
  Java: Java,
};

export default function Development() {
  const [repos, setRepos] = useState<any[]>([]);
  const [active, setActive] = useState('All');
  const [expanded, setExpanded] = useState<any | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const allLanguages = new Set<string>();

  // ✅ Fetch GitHub repos
  useEffect(() => {
    fetch('https://api.github.com/users/jcahnProgramming/repos')
      .then((res) => res.json())
      .then(async (data) => {
        const enrichedRepos = await Promise.all(
          data.map(async (repo: any) => {
            const langs = await fetch(repo.languages_url).then((res) => res.json());
            const tech = Object.keys(langs);
            tech.forEach((lang) => allLanguages.add(lang));
            const imagePath = await fetch(`https://raw.githubusercontent.com/jcahnProgramming/${repo.name}/main/default-image.png`)
              .then((res) => res.ok ? `https://raw.githubusercontent.com/jcahnProgramming/${repo.name}/main/default-image.png` : PlaceholderImage)
              .catch(() => PlaceholderImage);

            return {
              title: repo.name,
              content: [repo.description || 'No description available.'],
              tech,
              github: repo.html_url,
              src: imagePath,
              auto: true
            };
          })
        );
        setRepos(enrichedRepos);
      });
  }, []);

  const allCategories = ['All', ...Array.from(new Set(repos.flatMap((repo) => repo.tech)))];

  const filteredItems =
    active === 'All' ? repos : repos.filter((item) => item.tech.includes(active));

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setExpanded(null);
    }
  };

  let touchStartY = 0, touchEndY = 0;
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY = e.changedTouches[0].screenY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndY = e.changedTouches[0].screenY;
    if (touchEndY - touchStartY > 100) setExpanded(null);
  };

  return (
    <main>
      <h1 className={styles.header}>Development Projects</h1>
      <div className={styles.tabs}>
        {allCategories.map((category) => (
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
              onClick={() => setExpanded(item)}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <img src={item.src} alt={item.title} />
              <h3>{item.title}</h3>
              {item.auto && (
                <span className={styles.autoLabel}>
                  <ExternalLink size={14} /> Auto Imported from GitHub
                </span>
              )}
              <p>{item.content[0]}</p>
              <div className={styles.cardBadges}>
                {item.tech.map((lang: string, i: number) =>
                  badgeMap[lang] ? (
                    <img key={i} src={badgeMap[lang]} alt={lang} className={styles.badge} />
                  ) : null
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {expanded && (
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
              <button className={styles.closeBtn} onClick={() => setExpanded(null)}>
                ✕
              </button>
              <img src={expanded.src} alt={expanded.title} className={styles.modalImage} />
              <h3>{expanded.title}</h3>
              {expanded.auto && (
                <span className={styles.autoLabel}>
                  <ExternalLink size={14} /> Auto Imported from GitHub
                </span>
              )}
              {expanded.content.map((line: string, i: number) => (
                <p key={i}>{line}</p>
              ))}
              <div className={styles.modalBadges}>
                {expanded.tech.map((lang: string, i: number) =>
                  badgeMap[lang] ? (
                    <img key={i} src={badgeMap[lang]} alt={lang} className={styles.badge} />
                  ) : null
                )}
              </div>
              <a
                href={expanded.github}
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
  );
}
