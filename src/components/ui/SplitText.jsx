import { useSplitText } from '../../hooks/useSplitText'

export default function SplitText({
  children,
  as: Tag = 'span',
  className = '',
  type = 'chars',
  stagger = 0.03,
  trigger = true,
  start = 'top 85%',
}) {
  const ref = useSplitText({ type, stagger, trigger, start })

  return (
    <Tag ref={ref} className={`split-text ${className}`}>
      {children}
    </Tag>
  )
}
