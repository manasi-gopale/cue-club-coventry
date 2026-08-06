import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const ring2Ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    document.body.classList.add('custom-cursor-active')
    setVisible(true)

    const dot = dotRef.current
    const ring = ringRef.current
    const ring2 = ring2Ref.current
    let mx = 0
    let my = 0
    let rx = 0
    let ry = 0
    let r2x = 0
    let r2y = 0

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
    }

    const tick = () => {
      rx += (mx - rx) * 0.15
      ry += (my - ry) * 0.15
      r2x += (mx - r2x) * 0.08
      r2y += (my - r2y) * 0.08

      if (dot) {
        dot.style.transform = `translate(${mx}px, ${my}px)`
      }
      if (ring) {
        ring.style.transform = `translate(${rx}px, ${ry}px)`
      }
      if (ring2) {
        ring2.style.transform = `translate(${r2x}px, ${r2y}px)`
      }
      requestAnimationFrame(tick)
    }

    const onEnter = () => {
      gsap.to(ring, { scale: 1.8, duration: 0.3 })
      gsap.to(dot, { scale: 0.5, duration: 0.3 })
    }
    const onLeave = () => {
      gsap.to(ring, { scale: 1, duration: 0.3 })
      gsap.to(dot, { scale: 1, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMove)
    requestAnimationFrame(tick)

    const interactives = document.querySelectorAll('a, button, .gallery__item, input, select, textarea')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMove)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  if (!visible) return null

  return (
    <div className="cursor" aria-hidden="true">
      <div ref={ring2Ref} className="cursor__ring cursor__ring--outer" />
      <div ref={ringRef} className="cursor__ring" />
      <div ref={dotRef} className="cursor__dot" />
    </div>
  )
}
