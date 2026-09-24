import { motion } from 'framer-motion'
import Button from './Button'

export default function PageHero({ eyebrow, title, description, primaryCta, secondaryCta, diagram }) {
  return (
    <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 border-b border-[var(--color-line-0)] overflow-hidden">
      <div className="absolute inset-0 grid-field opacity-[0.22] pointer-events-none" aria-hidden="true" />
      <div className="container-sq relative grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {eyebrow && <div className="mono-label mb-5">{eyebrow}</div>}
          <h1 className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.06] tracking-tight text-white max-w-xl">
            {title}
          </h1>
          <p className="mt-6 text-base md:text-lg text-[var(--color-ink-2)] leading-relaxed max-w-lg">
            {description}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button to="/contact" variant="primary">{primaryCta}</Button>
            {secondaryCta && (
              <Button to="/contact" variant="ghost">{secondaryCta}</Button>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {diagram}
        </motion.div>
      </div>
    </section>
  )
}
