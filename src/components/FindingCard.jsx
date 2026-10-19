import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const GLYPHS = '0123456789abcdef#%&*+=<>/'

const EVIDENCE = [
  'GET /api/v2/invoices/48211',
  'Authorization: Bearer (customer B)',
  '200 OK  returned customer A\u2019s invoice',
]

/**
 * Resolves scrambled characters into the real text, left to right, once.
 * Shows the final text immediately when the visitor prefers reduced motion.
 */
function useDecode(lines, { delay = 700, duration = 1500 } = {}) {
  const [out, setOut] = useState(lines)
  const [done, setDone] = useState(
    () => typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const total = lines.reduce((n, l) => n + l.length, 0)
    let timer
    const startTimer = setTimeout(() => {
      const t0 = performance.now()
      timer = setInterval(() => {
        const p = Math.min(1, (performance.now() - t0) / duration)
        let seen = 0
        setOut(
          lines.map((line) =>
            [...line]
              .map((ch) => {
                const idx = seen++
                if (ch === ' ' || idx < p * total) return ch
                return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
              })
              .join(''),
          ),
        )
        if (p >= 1) {
          clearInterval(timer)
          setOut(lines)
          setDone(true)
        }
      }, 45)
    }, delay)
    // scramble from the very first paint so the real text never flashes
    setOut(lines.map((l) => [...l].map((c) => (c === ' ' ? c : GLYPHS[(c.charCodeAt(0) * 7) % GLYPHS.length])).join('')))
    return () => {
      clearTimeout(startTimer)
      clearInterval(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { out, done }
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 7.4l2.8 2.8 6-6.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Illustrative sample of what an EviDecode finding looks like. Not client data. */
export default function FindingCard() {
  const { out, done } = useDecode(EVIDENCE)

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="theme-light relative m-0 w-full max-w-[520px] justify-self-end overflow-hidden border border-[var(--color-line-0)] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.65)]"
      aria-label="Sample security finding"
    >
      <div className="h-1 bg-[var(--color-accent)]" />

      <div className="p-6 md:p-7">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-[var(--color-ink-3)]">Sample finding</span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 bg-[#fdf0dc] text-[#8a4208]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d9780d]" />
            High severity
          </span>
        </div>

        <h2 className="mt-4 font-display font-semibold text-[1.55rem] leading-[1.15] tracking-tight text-[var(--color-ink-0)]">
          Customers can open each other&rsquo;s invoices
        </h2>

        <dl className="mt-5 grid grid-cols-[84px_1fr] gap-x-4 gap-y-4 text-sm">
          <dt className="text-[var(--color-ink-3)]">Affected</dt>
          <dd className="text-[var(--color-ink-0)] font-mono text-[13px]">GET /api/v2/invoices/&#123;id&#125;</dd>

          <dt className="text-[var(--color-ink-3)] pt-3">Evidence</dt>
          <dd>
            <pre
              className="m-0 bg-[var(--color-bg-1)] border border-[var(--color-line-0)] px-4 py-3 font-mono text-[12.5px] leading-[1.7] text-[var(--color-ink-1)] overflow-x-auto"
              aria-label={EVIDENCE.join('. ')}
            >
              <span aria-hidden="true">
                {out[0]}
                {'\n'}
                {out[1]}
                {'\n'}
                <span className={done ? 'text-[var(--color-warn)] font-medium' : ''}>{out[2]}</span>
              </span>
            </pre>
          </dd>

          <dt className="text-[var(--color-ink-3)]">Fix</dt>
          <dd className="text-[var(--color-ink-1)] leading-relaxed">
            Check that the invoice belongs to the signed-in customer on every request.
          </dd>
        </dl>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-1 border-t border-[var(--color-line-0)] bg-[var(--color-bg-1)] px-6 md:px-7 py-3.5 text-[13px] text-[var(--color-ink-1)]">
        <span className="inline-flex items-center gap-1.5 text-[var(--color-accent)]">
          <Check />
          <span className="text-[var(--color-ink-1)]">Verified manually</span>
        </span>
        <span className="inline-flex items-center gap-1.5 text-[var(--color-accent)]">
          <Check />
          <span className="text-[var(--color-ink-1)]">Fix guidance included</span>
        </span>
      </div>
    </motion.figure>
  )
}
