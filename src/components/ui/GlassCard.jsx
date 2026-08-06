import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', hover = true }) {
  return (
    <motion.div
      className={`glass-card ${className}`}
      whileHover={hover ? { y: -6, transition: { duration: 0.3 } } : undefined}
    >
      {children}
    </motion.div>
  )
}
