import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSplitText(options = {}) {
  const ref = useRef(null)
  const {
    type = 'chars',
    stagger = 0.03,
    duration = 0.8,
    y = 80,
    delay = 0,
    trigger = true,
    start = 'top 85%',
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const text = el.textContent
    el.textContent = ''
    el.style.overflow = 'hidden'

    const units = type === 'words' ? text.split(' ') : text.split('')
    const spans = []

    units.forEach((unit, i) => {
      const wrap = document.createElement('span')
      wrap.style.display = 'inline-block'
      wrap.style.overflow = 'hidden'
      wrap.style.verticalAlign = 'top'

      const inner = document.createElement('span')
      inner.style.display = 'inline-block'
      inner.textContent = type === 'words' ? (i < units.length - 1 ? `${unit} ` : unit) : (unit === ' ' ? '\u00A0' : unit)
      inner.className = 'split-unit'
      wrap.appendChild(inner)
      el.appendChild(wrap)
      spans.push(inner)
    })

    const animProps = {
      y,
      opacity: 0,
      rotateX: type === 'chars' ? -40 : 0,
    }

    const tlConfig = trigger
      ? {
          scrollTrigger: { trigger: el, start, toggleActions: 'play none none none' },
        }
      : {}

    gsap.fromTo(spans, animProps, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration,
      delay,
      stagger,
      ease: 'power4.out',
      ...tlConfig,
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => { if (t.trigger === el) t.kill() })
    }
  }, [type, stagger, duration, y, delay, trigger, start])

  return ref
}

export function animateSplitText(el, options = {}) {
  if (!el) return

  const { type = 'chars', stagger = 0.04, duration = 1, y = 100, delay = 0 } = options
  const text = el.textContent
  el.textContent = ''
  el.style.overflow = 'hidden'
  el.style.perspective = '600px'

  const units = type === 'words' ? text.split(' ') : text.split('')
  const spans = []

  units.forEach((unit, i) => {
    const wrap = document.createElement('span')
    wrap.style.display = 'inline-block'
    wrap.style.overflow = 'hidden'

    const inner = document.createElement('span')
    inner.style.display = 'inline-block'
    inner.textContent = type === 'words' ? (i < units.length - 1 ? `${unit} ` : unit) : (unit === ' ' ? '\u00A0' : unit)
    wrap.appendChild(inner)
    el.appendChild(wrap)
    spans.push(inner)
  })

  return gsap.fromTo(spans, { y, opacity: 0, rotateX: -45 }, {
    y: 0,
    opacity: 1,
    rotateX: 0,
    duration,
    delay,
    stagger,
    ease: 'power4.out',
  })
}
