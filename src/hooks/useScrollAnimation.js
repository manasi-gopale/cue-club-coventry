import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation(options = {}) {
  const ref = useRef(null)
  const {
    y = 60,
    opacity = 0,
    duration = 1,
    delay = 0,
    stagger = 0,
    start = 'top 85%',
    children = false,
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = children ? el.children : el

    gsap.fromTo(
      targets,
      { y, opacity },
      {
        y: 0,
        opacity: 1,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill()
      })
    }
  }, [y, opacity, duration, delay, stagger, start, children])

  return ref
}
