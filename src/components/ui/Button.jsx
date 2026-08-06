import { useRef } from 'react'
import { useMagnetic } from '../../hooks/useMagnetic'

export default function Button({ children, variant = 'primary', href, onClick, className = '', magnetic = true }) {
  const magneticRef = useMagnetic(0.35)
  const ref = magnetic ? magneticRef : useRef(null)

  const base = 'btn'
  const variants = {
    primary: 'btn--primary',
    ghost: 'btn--ghost',
    outline: 'btn--outline',
  }

  const classes = `${base} ${variants[variant]} ${className}`
  const inner = <span className="btn__inner">{children}</span>

  if (href) {
    return (
      <a href={href} ref={ref} className={classes} data-cursor="hover">
        {inner}
      </a>
    )
  }

  return (
    <button type="button" ref={ref} className={classes} onClick={onClick} data-cursor="hover">
      {inner}
    </button>
  )
}
