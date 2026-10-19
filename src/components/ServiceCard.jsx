import { Link } from 'react-router-dom'
import Reveal from './Reveal'

const icons = {
  vapt: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4" />
    </>
  ),
  'm365-security': (
    <>
      <rect x="3.5" y="3.5" width="7.5" height="7.5" />
      <rect x="13" y="3.5" width="7.5" height="7.5" />
      <rect x="3.5" y="13" width="7.5" height="7.5" />
      <rect x="13" y="13" width="7.5" height="7.5" />
    </>
  ),
  'cloud-security': (
    <path d="M7 18.5h10.2a4.3 4.3 0 0 0 .6-8.55A6 6 0 0 0 6.3 8.9 4.9 4.9 0 0 0 7 18.5z" />
  ),
  'api-security': (
    <path d="M8.5 4.5C6 4.5 6 6 6 8v1.5c0 1.2-.8 2.5-2.5 2.5 1.7 0 2.5 1.3 2.5 2.5V16c0 2 0 3.5 2.5 3.5M15.5 4.5C18 4.5 18 6 18 8v1.5c0 1.2.8 2.5 2.5 2.5-1.7 0-2.5 1.3-2.5 2.5V16c0 2 0 3.5-2.5 3.5" />
  ),
}

export default function ServiceCard({ service, delay = 0 }) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        to={service.path}
        className="group flex flex-col h-full bg-[var(--color-bg-2)] border border-[var(--color-line-0)] p-7 transition-colors hover:border-[var(--color-accent)]"
      >
        <span className="flex h-11 w-11 items-center justify-center bg-[var(--color-accent)]/10 text-[var(--color-accent-text)]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {icons[service.id]}
          </svg>
        </span>

        <h3 className="mt-7 font-display font-semibold text-xl text-[var(--color-ink-0)]">
          {service.name}
        </h3>
        <p className="mt-3 text-sm text-[var(--color-ink-2)] leading-relaxed flex-1">
          {service.short}
        </p>

        <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent-text)]">
          View service
          <svg width="14" height="14" viewBox="0 0 16 16" className="transition-transform group-hover:translate-x-1" aria-hidden="true">
            <path d="M2 8h11M9 3.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </span>
      </Link>
    </Reveal>
  )
}
