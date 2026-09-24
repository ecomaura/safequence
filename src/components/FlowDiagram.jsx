import { motion } from 'framer-motion'

/**
 * Minimal architecture / pipeline diagram. Renders a sequence of labeled
 * nodes connected by a line, with a single pulse animated along the path
 * to suggest telemetry moving through the system. Orientation is
 * "vertical" (stacked, for identity/cloud diagrams) or "horizontal"
 * (side-scrolling row, for request/response pipelines).
 */
export default function FlowDiagram({ nodes, orientation = 'vertical', flagged = [] }) {
  const isVertical = orientation === 'vertical'

  return (
    <div
      className={`relative border border-[var(--color-line-0)] bg-[var(--color-bg-1)] p-6 md:p-8 flex ${
        isVertical ? 'flex-col gap-0' : 'flex-col md:flex-row gap-6 md:gap-0 md:items-center'
      }`}
    >
      {nodes.map((node, i) => (
        <div key={node} className={isVertical ? 'flex flex-col items-stretch' : 'flex flex-1 items-center'}>
          <div
            className={`relative flex items-center gap-3 border px-4 py-3.5 transition-colors ${
              flagged.includes(i)
                ? 'border-[var(--color-accent)]/50 bg-[var(--color-accent)]/[0.06]'
                : 'border-[var(--color-line-1)] bg-[var(--color-bg-2)]'
            } ${isVertical ? '' : 'flex-1 justify-center'}`}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: flagged.includes(i) ? 'var(--color-accent)' : 'var(--color-ink-3)' }}
            />
            <span className="mono-label !text-[11px] tracking-[0.08em] text-[var(--color-ink-1)]">
              {node}
            </span>
          </div>

          {i < nodes.length - 1 && (
            <div
              className={`relative shrink-0 ${
                isVertical ? 'h-8 w-px mx-6 self-start' : 'h-px w-8 md:w-full my-3 md:my-0'
              } bg-[var(--color-line-0)]`}
            >
              <motion.div
                className={isVertical ? 'absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full' : 'absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full'}
                style={{ background: 'var(--color-accent)' }}
                initial={isVertical ? { top: 0, opacity: 0 } : { left: 0, opacity: 0 }}
                animate={
                  isVertical
                    ? { top: ['0%', '100%'], opacity: [0, 1, 0] }
                    : { left: ['0%', '100%'], opacity: [0, 1, 0] }
                }
                transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
