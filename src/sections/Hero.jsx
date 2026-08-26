import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import Button from '../components/ui/Button'
import ControlToolbar from '../components/ui/ControlToolbar'
import HUDDrawer from '../components/ui/HUDDrawer'
import { useMouseParallax } from '../hooks/useMouseParallax'
import { soundEngine } from '../utils/audio'
import { CLUB_INFO } from '../utils/constants'

const Scene3D = lazy(() => import('../components/three/Scene3D'))

function Hero3DFallback() {
  return (
    <div className="hero__fallback" aria-hidden="true">
      <div className="hero__fallback-spinner" />
      <span className="hero__fallback-text">Loading 3D Atmosphere...</span>
    </div>
  )
}

export default function Hero() {
  const rootRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const visualRef = useRef(null)

  const [hasInteracted, setHasInteracted] = useState(false)
  const [cameraMode, setCameraMode] = useState('hero')
  const [lightingTheme, setLightingTheme] = useState('midnight')
  const [showPins, setShowPins] = useState(true)
  const [activePin, setActivePin] = useState(null)
  const [soundEnabled, setSoundEnabled] = useState(false)

  const parallaxRef = useMouseParallax(0.045)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(titleRef.current, { y: 70, opacity: 0, duration: 1.1, delay: 0.25 })
        .from(subtitleRef.current, { y: 32, opacity: 0, duration: 0.8 }, '-=0.65')
        .from(ctaRef.current.children, { y: 24, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.45')
        .from(
          visualRef.current,
          { opacity: 0, scale: 0.9, duration: 1.6, ease: 'power2.out' },
          '-=1.3'
        )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  const handleToggleSound = () => {
    const newState = soundEngine.toggleSound()
    setSoundEnabled(newState)
  }

  const handleResetView = () => {
    setCameraMode('hero')
    setLightingTheme('midnight')
    setActivePin(null)
    setShowPins(true)
  }

  return (
    <section className="hero" id="hero" ref={rootRef}>
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__gradient" />
        <div className="hero__grid" />
        <div className="hero__noise" />
      </div>

      {/* Floating Left Telemetry Panel & Chapter Drawer */}
      <HUDDrawer activePin={activePin} setActivePin={setActivePin} />

      <div className="hero__container container">
        <div className="hero__content">
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero__badge-dot" />
            Coventry&apos;s Premier Cue Sports Destination
          </motion.div>

          <h1 ref={titleRef} className="hero__title">
            <span className="hero__title-line">Precision.</span>
            <span className="hero__title-line hero__title-line--accent">Atmosphere.</span>
            <span className="hero__title-line">Excellence.</span>
          </h1>

          <p ref={subtitleRef} className="hero__subtitle">
            {CLUB_INFO.tagline}. Championship tables, premium facilities, and an
            unforgettable experience in the heart of Coventry.
          </p>

          <div ref={ctaRef} className="hero__actions">
            <Button href="#booking" variant="primary">
              Reserve Your Table
            </Button>
            <Button href="#about" variant="ghost">
              Discover More
            </Button>
          </div>
        </div>

        <div ref={visualRef} className="hero__visual">
          <div className="hero__visual-glow" aria-hidden="true" />
          <div className="hero__visual-inner" ref={parallaxRef}>
            <Suspense fallback={<Hero3DFallback />}>
              <Scene3D
                onCueBallInteract={() => setHasInteracted(true)}
                cameraMode={cameraMode}
                lightingTheme={lightingTheme}
                showPins={showPins}
                activePin={activePin}
                setActivePin={setActivePin}
              />
            </Suspense>
          </div>

          <AnimatePresence>
            {!hasInteracted && (
              <motion.div
                className="hero__interaction-hint"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <span className="hero__interaction-hint-dot" />
                <span>Drag cue ball to strike 🎱</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Bottom Control Bar */}
      <ControlToolbar
        cameraMode={cameraMode}
        setCameraMode={setCameraMode}
        lightingTheme={lightingTheme}
        setLightingTheme={setLightingTheme}
        showPins={showPins}
        setShowPins={setShowPins}
        soundEnabled={soundEnabled}
        toggleSound={handleToggleSound}
        onResetView={handleResetView}
      />
    </section>
  )
}
