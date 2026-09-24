import { motion } from 'framer-motion'

/**
 * Scroll-reveal wrapper. Used deliberately on section-level entrances,
 * not on every individual element, to keep motion restrained.
 */
export default function Reveal({ children, delay = 0, y = 16, className = '', as = 'div' }) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
