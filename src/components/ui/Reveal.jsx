import { useBlurReveal, useClipReveal } from '../../hooks/useReveal'

export function BlurReveal({ children, className = '', revealChildren = false, ...opts }) {
  const ref = useBlurReveal(opts)
  return (
    <div ref={ref} className={className} data-reveal-children={revealChildren || undefined}>
      {children}
    </div>
  )
}

export function ClipReveal({ children, className = '', direction = 'up', ...opts }) {
  const ref = useClipReveal({ direction, ...opts })
  return (
    <div ref={ref} className={`clip-reveal clip-reveal--${direction} ${className}`}>
      {children}
    </div>
  )
}
