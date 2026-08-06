import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import Scene3D from '../components/three/Scene3D'
import Button from '../components/ui/Button'
import { useMouseParallax } from '../hooks/useMouseParallax'
import { CLUB_INFO } from '../utils/constants'

export default function Hero() {
  const rootRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollRef = useRef(null)
  const visualRef = useRef(null)

  // Subtle cursor-driven drift applied to the inner scene wrapper only,
  // kept separate from the GSAP-animated outer wrapper so the two never
  // fight over the same `transform` style property.
  const parallaxRef = useMouseParallax(0.045)

  useEffect(() => {
    // gsap.context scopes selectors + guarantees clean teardown, which
    // matters once StrictMode double-invokes this effect in dev.
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(titleRef.current, { y: 70, opacity: 0, duration: 1.1, delay: 0.25 })
        .from(subtitleRef.current, { y: 32, opacity: 0, duration: 0.8 }, '-=0.65')
        .from(ctaRef.current.children, { y: 24, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.45')
        .from(scrollRef.current, { opacity: 0, duration: 0.7 }, '-=0.2')
        .from(
          visualRef.current,
          { opacity: 0, scale: 0.9, duration: 1.6, ease: 'power2.out' },
          '-=1.3'
        )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" id="hero" ref={rootRef}>
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__gradient" />
        <div className="hero__grid" />
        <div className="hero__noise" />
      </div>

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
            <Scene3D />
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="hero__scroll">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}
