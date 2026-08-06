import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

import Scene3D from '../components/three/Scene3D'
import Button from '../components/ui/Button'
import { useMouseParallax } from '../hooks/useMouseParallax'
import { CLUB_INFO } from '../utils/constants'

export default function Hero() {
  const parallaxRef = useMouseParallax(0.04)

  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonsRef = useRef(null)
  const badgeRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: 'power4.out',
      },
    })

    tl.from(badgeRef.current, {
      opacity: 0,
      y: 25,
      duration: 0.6,
    })
      .from(
        titleRef.current,
        {
          opacity: 0,
          y: 70,
          duration: 1,
        },
        '-=0.2'
      )
      .from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
        },
        '-=0.5'
      )
      .from(
        buttonsRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
        },
        '-=0.4'
      )
      .from(
        scrollRef.current,
        {
          opacity: 0,
          y: 15,
          duration: 0.6,
        },
        '-=0.3'
      )
  }, [])

  return (
    <section className="hero" id="hero">
      {/* Background */}
      <div className="hero__bg">
        <div className="hero__gradient" />
        <div className="hero__grid" />
        <div className="hero__noise" />
      </div>

      {/* 3D Scene */}
      <div className="hero__scene" ref={parallaxRef}>
        <Scene3D />
      </div>

      {/* Left Content */}
      <div className="hero__content container">
        <motion.div
          ref={badgeRef}
          className="hero__badge"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="hero__badge-dot" />
          Coventry's Premier Cue Sports Destination
        </motion.div>

        <h1
          ref={titleRef}
          className="hero__title"
        >
          <span className="hero__title-line">
            Precision.
          </span>

          <span className="hero__title-line hero__title-line--accent">
            Atmosphere.
          </span>

          <span className="hero__title-line">
            Excellence.
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="hero__subtitle"
        >
          {CLUB_INFO.tagline}. Championship tables,
          premium facilities, handcrafted interiors,
          and an unforgettable cue sports experience
          in the heart of Coventry.
        </p>

        <div
          ref={buttonsRef}
          className="hero__actions"
        >
          <Button
            href="#booking"
            variant="primary"
          >
            Reserve Your Table
          </Button>

          <Button
            href="#about"
            variant="ghost"
          >
            Discover More
          </Button>
        </div>
      </div>

      {/* Scroll */}
      <div
        ref={scrollRef}
        className="hero__scroll"
      >
        <span>Scroll</span>

        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}