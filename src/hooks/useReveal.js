import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useBlurReveal(options = {}) {
  const ref = useRef(null)
  const { start = 'top 85%', delay = 0, stagger = 0.08, y = 40 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = el.dataset.revealChildren ? el.children : [el]

    gsap.fromTo(
      targets,
      { opacity: 0, y, filter: 'blur(12px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start, toggleActions: 'play none none none' },
      }
    )

    return () => ScrollTrigger.getAll().forEach((t) => { if (t.trigger === el) t.kill() })
  }, [start, delay, stagger, y])

  return ref
}

export function useClipReveal(options = {}) {
  const ref = useRef(null)
  const { start = 'top 85%', direction = 'up', delay = 0 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const clipFrom = {
      up: 'inset(100% 0% 0% 0%)',
      down: 'inset(0% 0% 100% 0%)',
      left: 'inset(0% 100% 0% 0%)',
      right: 'inset(0% 0% 0% 100%)',
    }

    gsap.fromTo(
      el,
      { clipPath: clipFrom[direction] || clipFrom.up, opacity: 0 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        duration: 1.4,
        delay,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start, toggleActions: 'play none none none' },
      }
    )

    return () => ScrollTrigger.getAll().forEach((t) => { if (t.trigger === el) t.kill() })
  }, [start, direction, delay])

  return ref
}

export function useParallaxBg(speed = 0.15) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.to(el, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => ScrollTrigger.getAll().forEach((t) => { if (t.trigger === el.parentElement) t.kill() })
  }, [speed])

  return ref
}
