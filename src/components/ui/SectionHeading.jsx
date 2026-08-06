import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export default function SectionHeading({ label, title, subtitle, align = 'left' }) {
  const ref = useScrollAnimation({ y: 40, stagger: 0.15, children: true })

  return (
    <div ref={ref} className={`section-heading section-heading--${align}`}>
      {label && <span className="section-heading__label">{label}</span>}
      <h2 className="section-heading__title">{title}</h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </div>
  )
}
