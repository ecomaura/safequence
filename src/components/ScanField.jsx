import { motion } from 'framer-motion'

const points = [
  { x: 12, y: 22 }, { x: 68, y: 14 }, { x: 40, y: 58 }, { x: 84, y: 46 },
  { x: 22, y: 78 }, { x: 92, y: 76 }, { x: 55, y: 30 }, { x: 6, y: 62 },
]

/**
 * Restrained hero surface: faint grid, a single slow-moving scan line,
 * and a handful of static telemetry points. No 3D, no glow bloom.
 */
export default function ScanField({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <div className="absolute inset-0 grid-field opacity-[0.35]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(53,201,219,0.06), transparent 70%)',
        }}
      />

      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)' }}
        initial={{ top: '0%', opacity: 0 }}
        animate={{ top: ['0%', '100%'], opacity: [0, 0.6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      <svg className="absolute inset-0 w-full h-full">
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={`${p.x}%`}
            cy={`${p.y}%`}
            r="1.6"
            fill="var(--color-accent)"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: [0.15, 0.55, 0.15] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
          />
        ))}
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg-0)]" />
    </div>
  )
}
