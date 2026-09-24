import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal'

export default function ProcessSteps({ steps }) {
  const [active, setActive] = useState(0)

  return (
    <Reveal>
      <div className="flex flex-col md:flex-row md:items-stretch border border-[var(--color-line-0)]">
        {steps.map((step, i) => (
          <button
            key={step.name}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className={`relative flex-1 text-left px-6 py-6 border-b md:border-b-0 md:border-r last:border-0 transition-colors duration-200 ${
              i === active ? 'bg-[var(--color-bg-2)]' : 'bg-transparent'
            } border-[var(--color-line-0)]`}
          >
            <span
              className="absolute top-0 left-0 right-0 h-[2px] md:h-full md:w-[2px] md:left-0 md:right-auto"
              style={{ background: i === active ? 'var(--color-accent)' : 'transparent' }}
            />
            <div className="mono-label mb-2">{String(i + 1).padStart(2, '0')}</div>
            <div
              className="font-[var(--font-display)] text-base md:text-lg transition-colors"
              style={{ color: i === active ? '#fff' : 'var(--color-ink-2)' }}
            >
              {step.name}
            </div>
          </button>
        ))}
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6 max-w-xl"
      >
        <p className="text-[var(--color-ink-1)] text-base leading-relaxed">{steps[active].detail}</p>
      </motion.div>
    </Reveal>
  )
}
