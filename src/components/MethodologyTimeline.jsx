import { useState } from 'react'
import { motion } from 'framer-motion'
import { methodology } from '../data/services'
import Reveal from './Reveal'

export default function MethodologyTimeline() {
  const [active, setActive] = useState(0)

  return (
    <div>
      {/* Desktop: horizontal */}
      <div className="hidden md:block">
        <Reveal>
          <div className="relative flex justify-between">
            <div className="absolute top-[9px] left-0 right-0 h-px bg-[var(--color-line-0)]" />
            {methodology.map((stage, i) => (
              <button
                key={stage.index}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="relative z-10 flex flex-col items-start gap-5 flex-1 text-left pr-6 last:pr-0"
              >
                <span
                  className="block w-[19px] h-[19px] rounded-full border transition-colors duration-200"
                  style={{
                    borderColor: i === active ? 'var(--color-accent)' : 'var(--color-line-1)',
                    background: i === active ? 'var(--color-accent)' : 'var(--color-bg-0)',
                  }}
                />
                <div>
                  <div className="mono-label mb-1">{stage.index}</div>
                  <div
                    className="font-[var(--font-display)] text-lg transition-colors duration-200"
                    style={{ color: i === active ? '#fff' : 'var(--color-ink-2)' }}
                  >
                    {stage.name}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="mt-10 border-t border-[var(--color-line-0)] pt-8 max-w-xl"
        >
          <p className="text-[var(--color-ink-1)] text-base leading-relaxed">
            {methodology[active].detail}
          </p>
        </motion.div>
      </div>

      {/* Mobile: vertical */}
      <div className="md:hidden flex flex-col">
        {methodology.map((stage, i) => (
          <Reveal key={stage.index} delay={i * 0.05}>
            <div className="relative flex gap-5 pb-8 last:pb-0">
              <div className="flex flex-col items-center">
                <span className="block w-[15px] h-[15px] rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)] shrink-0" />
                {i !== methodology.length - 1 && (
                  <span className="w-px flex-1 bg-[var(--color-line-0)] mt-2" />
                )}
              </div>
              <div className="pb-2">
                <div className="mono-label mb-1">{stage.index}</div>
                <div className="font-[var(--font-display)] text-lg text-white">{stage.name}</div>
                <p className="mt-2 text-sm text-[var(--color-ink-2)] leading-relaxed">{stage.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
