import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'

export default function ProcessSteps({ steps }) {
  const [active, setActive] = useState(0)

  return (
    <Reveal>
      <div className="flex flex-col md:flex-row items-stretch border border-[var(--color-line-0)]">
        {steps.map((step, i) => {
          const isActive = i === active
          return (
            <div
              key={step.name}
              className="min-w-0 md:flex-1 border-b md:border-b-0 md:border-r last:border-0 border-[var(--color-line-0)]"
            >
              <button
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={isActive}
                className={`relative w-full text-left px-5 py-4 md:px-6 md:py-6 md:h-full transition-colors duration-200 ${
                  isActive ? 'bg-[var(--color-bg-2)]' : 'bg-transparent'
                }`}
              >
                <span
                  className="absolute top-0 left-0 bottom-0 w-[2px]"
                  style={{ background: isActive ? 'var(--color-accent)' : 'transparent' }}
                />
                <div className="flex items-baseline gap-4 md:block">
                  <div className="mono-label md:mb-2">{String(i + 1).padStart(2, '0')}</div>
                  <div
                    className="font-[var(--font-display)] text-base md:text-lg transition-colors"
                    style={{ color: isActive ? '#fff' : 'var(--color-ink-2)' }}
                  >
                    {step.name}
                  </div>
                </div>
              </button>

              {/* Mobile: content opens directly under its own tab */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    key="panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="md:hidden overflow-hidden bg-[var(--color-bg-2)]"
                  >
                    <p className="px-5 pb-5 pl-[52px] text-sm text-[var(--color-ink-1)] leading-relaxed">
                      {step.detail}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Desktop: content sits below the row */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="hidden md:block mt-6 max-w-xl"
      >
        <p className="text-[var(--color-ink-1)] text-base leading-relaxed">{steps[active].detail}</p>
      </motion.div>
    </Reveal>
  )
}
