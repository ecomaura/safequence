import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal'

export default function ProcessSteps({ steps }) {
  const [active, setActive] = useState(0)

  return (
    <Reveal>
      <div className="flex flex-col md:flex-row items-stretch border border-[var(--color-line-0)]">
        {steps.map((step, i) => (
          <button
            key={step.name}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className={`relative min-w-0 md:flex-1 text-left px-5 py-4 md:px-6 md:py-6 border-b md:border-b-0 md:border-r last:border-0 transition-colors duration-200 ${
              i === active ? 'bg-[var(--color-bg-2)]' : 'bg-transparent'
            } border-[var(--color-line-0)]`}
          >
            <span
              className="absolute top-0 left-0 bottom-0 w-[2px] md:h-full"
              style={{ background: i === active ? 'var(--color-accent)' : 'transparent' }}
            />
            <div className="flex items-baseline gap-4 md:block">
              <div className="mono-label md:mb-2">{String(i + 1).padStart(2, '0')}</div>
              <div
                className="font-[var(--font-display)] text-base md:text-lg transition-colors"
                style={{ color: i === active ? '#fff' : 'var(--color-ink-2)' }}
              >
                {step.name}
              </div>
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
