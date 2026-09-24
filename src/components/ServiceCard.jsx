import { Link } from 'react-router-dom'
import Reveal from './Reveal'

export default function ServiceCard({ service, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <Link
        to={service.path}
        className="group relative flex flex-col justify-between h-full border-t border-[var(--color-line-0)] py-8 pr-4 transition-colors hover:border-[var(--color-accent)]/60"
      >
        <div className="flex items-start justify-between">
          <span className="mono-label text-[var(--color-ink-3)] group-hover:text-[var(--color-accent)] transition-colors">
            {service.index}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="text-[var(--color-ink-3)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200"
          >
            <path d="M4 12L12 4M12 4H5.5M12 4V10.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
          </svg>
        </div>

        <div className="mt-10">
          <h3 className="font-[var(--font-display)] text-xl text-white group-hover:text-[var(--color-accent)] transition-colors">
            {service.name}
          </h3>
          <p className="mt-3 text-sm text-[var(--color-ink-2)] leading-relaxed max-w-[34ch]">
            {service.short}
          </p>
        </div>
      </Link>
    </Reveal>
  )
}
