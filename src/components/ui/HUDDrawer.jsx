import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiLayers, FiSliders, FiCrosshair, FiChevronRight } from 'react-icons/fi'

export default function HUDDrawer({ activePin, setActivePin }) {
  const [isOpen, setIsOpen] = useState(true)

  const pinDetails = {
    cueball: {
      title: 'Aramith Phenolic Cue Ball',
      subtitle: 'CHAMPIONSHIP SPECIFICATION',
      desc: 'Precision balanced 2-1/4" tournament grade cue ball engineered for exact kinetic energy transfer, coat gloss, and minimal felt friction.',
      specs: [
        { label: 'Weight', val: '170g ± 0.5g' },
        { label: 'Material', val: 'Pure Phenolic Resin' },
        { label: 'Diameter', val: '57.15 mm' },
      ],
    },
    eightball: {
      title: 'Eight Ball (8)',
      subtitle: 'TARGET SPHERE',
      desc: 'High-density laser-engraved 8-ball positioned on the foot spot. Custom balanced for smooth friction and precise angle rebounds.',
      specs: [
        { label: 'Coating', val: 'Dual Ultra-Gloss Coat' },
        { label: 'Density', val: '1.91 g/cm³' },
      ],
    },
    felt: {
      title: 'Simonis 860® Tournament Felt',
      subtitle: 'WORSTED CLOTH SURFACE',
      desc: 'Combed worsted wool for smooth, true ball roll and high durability. Preferred worldwide for professional championship tournaments.',
      specs: [
        { label: 'Composition', val: '90% Wool / 10% Nylon' },
        { label: 'Felt Speed', val: 'Tournament Fast' },
      ],
    },
    slate: {
      title: '1.5" Italian Slate Bedrock',
      subtitle: 'FOUNDATION STRUCTURE',
      desc: 'Diamond-honed 3-piece precision ground slate base providing an absolute flat playing bed across all environmental conditions.',
      specs: [
        { label: 'Thickness', val: '38.1 mm (1.5 in)' },
        { label: 'Tolerance', val: '± 0.005 in' },
      ],
    },
    pocket: {
      title: 'Precision Drop Pockets',
      subtitle: 'CORNER HARNESS',
      desc: 'Hand-stitched genuine leather drop pockets with sound-dampening rubber liners conforming to World Pool-Billiard Association specs.',
      specs: [
        { label: 'Cut Angle', val: '142° Corner Cut' },
        { label: 'Capacity', val: '6 Balls' },
      ],
    },
  }

  const activeDetail = activePin ? pinDetails[activePin] : null

  return (
    <div className="hud-drawer-wrapper">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="hud-panel"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
          >
            {/* Telemetry Coordinates Header */}
            <div className="hud-panel__telemetry">
              <div className="hud-panel__coord">
                <FiCrosshair className="hud-panel__coord-icon" />
                <span>52.4068° N 1.5197° W</span>
              </div>
              <div className="hud-panel__location">
                <span>COVENTRY, UK</span>
                <span className="hud-panel__bullet">•</span>
                <span>ELEV. 92m</span>
              </div>
            </div>

            {/* Chapter Selection */}
            <div className="hud-panel__chapters">
              <div className="hud-panel__chapter-item hud-panel__chapter-item--active">
                <span className="hud-panel__chapter-num">CHAPTER I</span>
                <span className="hud-panel__chapter-title">Championship Arena</span>
              </div>
            </div>

            {/* Dynamic Specification Card when Pin Clicked */}
            {activeDetail ? (
              <motion.div
                key={activePin}
                className="hud-card"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="hud-card__header">
                  <div>
                    <span className="hud-card__subtitle">{activeDetail.subtitle}</span>
                    <h3 className="hud-card__title">{activeDetail.title}</h3>
                  </div>
                  <button
                    type="button"
                    className="hud-card__close"
                    onClick={() => setActivePin(null)}
                    aria-label="Close detail"
                  >
                    <FiX />
                  </button>
                </div>
                <p className="hud-card__desc">{activeDetail.desc}</p>
                <div className="hud-card__specs">
                  {activeDetail.specs.map((item, idx) => (
                    <div key={idx} className="hud-card__spec-row">
                      <span className="hud-card__spec-label">{item.label}</span>
                      <span className="hud-card__spec-val">{item.val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="hud-card hud-card--default">
                <div className="hud-card__hint">
                  <FiLayers className="hud-card__hint-icon" />
                  <div>
                    <span className="hud-card__hint-title">Interactive Telemetry Active</span>
                    <p className="hud-card__hint-text">
                      Drag cue ball to strike or select spatial pins on the 3D table to inspect architectural specs.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
