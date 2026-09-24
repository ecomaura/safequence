import { Link } from 'react-router-dom'
import Logo from './Logo'
import { services } from '../data/services'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[var(--color-bg-0)] border-t border-[var(--color-line-0)]">
      <div className="container-sq py-16 grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-12">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="text-sm text-[var(--color-ink-2)] max-w-[26ch] leading-relaxed">
            Cybersecurity testing, assessment and advisory for modern technology environments.
          </p>
        </div>

        <div>
          <div className="mono-label mb-4">Services</div>
          <ul className="flex flex-col gap-3">
            {services.map((s) => (
              <li key={s.id}>
                <Link to={s.path} className="text-sm text-[var(--color-ink-1)] hover:text-white transition-colors">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mono-label mb-4">Company</div>
          <ul className="flex flex-col gap-3">
            <li><a href="/#why" className="text-sm text-[var(--color-ink-1)] hover:text-white transition-colors">Why Safequence</a></li>
            <li><a href="/#approach" className="text-sm text-[var(--color-ink-1)] hover:text-white transition-colors">Security Approach</a></li>
            <li><Link to="/contact" className="text-sm text-[var(--color-ink-1)] hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 items-start">
          <div className="mono-label">Get started</div>
          <Link
            to="/contact"
            className="inline-flex items-center px-4 py-2.5 text-sm font-medium border border-[var(--color-line-1)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
          >
            Request Security Assessment
          </Link>
        </div>
      </div>

      <div className="border-t border-[var(--color-line-0)]">
        <div className="container-sq py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-[var(--color-ink-3)]">© {year} Safequence. All rights reserved.</p>
          <p className="text-xs text-[var(--color-ink-3)]">Web Applications · APIs · Cloud · Microsoft 365</p>
        </div>
      </div>
    </footer>
  )
}
