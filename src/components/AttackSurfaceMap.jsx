import { motion } from 'framer-motion'

const nodes = [
  { x: 20, y: 18, label: '/auth' },
  { x: 62, y: 14, label: '/api/users' },
  { x: 84, y: 34, label: '/checkout' },
  { x: 12, y: 50, label: '/admin' },
  { x: 46, y: 46, label: '/session' },
  { x: 70, y: 62, label: '/upload' },
  { x: 30, y: 78, label: '/reset-pwd' },
  { x: 90, y: 82, label: '/webhook' },
]

const flagged = new Set([0, 4, 6])

const edges = [
  [0, 4], [4, 1], [1, 2], [4, 5], [3, 4], [4, 6], [5, 7],
]

export default function AttackSurfaceMap() {
  return (
    <div className="relative border border-[var(--color-line-0)] bg-[var(--color-bg-1)] aspect-[4/3] p-4">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="#1c1c1c"
            strokeWidth="0.4"
          />
        ))}

        {nodes.map((n, i) => (
          <g key={i}>
            {flagged.has(i) && (
              <motion.circle
                cx={n.x}
                cy={n.y}
                r="3.2"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="0.5"
                initial={{ opacity: 0.6, r: 2.2 }}
                animate={{ opacity: [0.6, 0, 0.6], r: [2.2, 5, 2.2] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
              />
            )}
            <circle
              cx={n.x}
              cy={n.y}
              r="1.5"
              fill={flagged.has(i) ? 'var(--color-accent)' : '#4b4b4f'}
            />
            <text
              x={n.x}
              y={n.y - 4}
              fontSize="3"
              fill={flagged.has(i) ? '#c6f3f7' : '#6b6b70'}
              fontFamily="IBM Plex Mono, monospace"
              textAnchor="middle"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between mono-label !text-[10px]">
        <span>SURFACE MAP</span>
        <span className="text-[var(--color-accent)]">3 FLAGGED FOR REVIEW</span>
      </div>
    </div>
  )
}
