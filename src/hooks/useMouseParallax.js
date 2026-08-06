import { useEffect, useRef } from 'react'

export function useMouseParallax(intensity = 0.03) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * intensity * 100
      const y = (clientY / innerHeight - 0.5) * intensity * 100
      el.style.transform = `translate(${x}px, ${y}px)`
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [intensity])

  return ref
}
