import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function PageTransition() {
  const overlayRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const line = lineRef.current
    if (!overlay || !line) return

    const tl = gsap.timeline()

    tl.set(overlay, { scaleY: 1, transformOrigin: 'top' })
      .set(line, { scaleX: 0 })
      .to(line, { scaleX: 1, duration: 0.8, ease: 'power4.inOut' })
      .to(overlay, { scaleY: 0, duration: 0.9, ease: 'power4.inOut', delay: 0.2 })
      .to(document.body, { opacity: 1, duration: 0.01 }, '-=0.5')
  }, [])

  return (
    <div ref={overlayRef} className="page-transition" aria-hidden="true">
      <div ref={lineRef} className="page-transition__line" />
      <span className="page-transition__logo">CC</span>
    </div>
  )
}
