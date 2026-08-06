import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { GALLERY_ITEMS } from '../utils/constants'

export default function Gallery() {
  const [active, setActive] = useState(null)
  const gridRef = useScrollAnimation({ y: 50, stagger: 0.08, children: true })

  return (
    <section className="gallery section" id="gallery">
      <div className="container">
        <SectionHeading
          label="Gallery"
          title="Inside the Club"
          subtitle="Step into our world — where every frame tells a story."
          align="center"
        />

        <div ref={gridRef} className="gallery__grid">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              className={`gallery__item ${i === 0 ? 'gallery__item--large' : ''}`}
              style={{ background: item.gradient }}
              onClick={() => setActive(item)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="gallery__item-overlay">
                <span className="gallery__item-label">{item.label}</span>
                <span className="gallery__item-icon">+</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="gallery__lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="gallery__lightbox-content"
              style={{ background: active.gradient }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="gallery__lightbox-close"
                onClick={() => setActive(null)}
                aria-label="Close"
              >
                ×
              </button>
              <h3>{active.label}</h3>
              <p>Cue Club Coventry — Premium cue sports experience</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
