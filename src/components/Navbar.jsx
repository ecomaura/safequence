import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'
import { services } from '../data/services'

const navLinks = [
  { label: 'Why Safequence', to: '/#why' },
  { label: 'Security Approach', to: '/#approach' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [location.pathname])

  const openServices = () => {
    clearTimeout(closeTimer.current)
    setServicesOpen(true)
  }
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 140)
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/92 backdrop-blur border-[var(--color-line-0)]'
          : 'bg-transparent border-transparent'
      }`}
    >
      <nav className="container-sq flex items-center justify-between h-16 md:h-[68px]">
        <Logo />

        <div className="hidden md:flex items-center gap-8">
          <div
            className="relative"
            onMouseEnter={openServices}
            onMouseLeave={scheduleClose}
          >
            <button
              className="flex items-center gap-1.5 text-sm text-[var(--color-ink-1)] hover:text-white transition-colors py-2"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((v) => !v)}
            >
              Services
              <svg width="9" height="6" viewBox="0 0 9 6" className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`}>
                <path d="M1 1L4.5 4.5L8 1" stroke="currentColor" strokeWidth="1.2" fill="none" />
              </svg>
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[560px]"
                >
                  <div className="border border-[var(--color-line-0)] bg-[var(--color-bg-1)] p-2 grid grid-cols-2 gap-1">
                    {services.map((s) => (
                      <Link
                        key={s.id}
                        to={s.path}
                        className="group flex flex-col gap-1 p-4 hover:bg-[var(--color-bg-2)] transition-colors"
                      >
                        <span className="mono-label text-[var(--color-ink-3)]">{s.index}</span>
                        <span className="text-sm text-white group-hover:text-[var(--color-accent)] transition-colors">
                          {s.name}
                        </span>
                        <span className="text-xs text-[var(--color-ink-2)] leading-snug">{s.short}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.to}
              className="text-sm text-[var(--color-ink-1)] hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            to="/contact"
            className="inline-flex items-center px-4 py-2.5 text-sm font-medium bg-[var(--color-accent)] text-[#050505] hover:bg-[var(--color-accent-bright)] transition-colors"
          >
            Request Security Assessment
          </Link>
        </div>

        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className={`block w-5 h-px bg-white transition-transform ${mobileOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
          <span className={`block w-5 h-px bg-white transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-white transition-transform ${mobileOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[var(--color-bg-0)] border-t border-[var(--color-line-0)]"
          >
            <div className="container-sq py-6 flex flex-col gap-6">
              <div>
                <div className="mono-label mb-3">Services</div>
                <div className="flex flex-col gap-3">
                  {services.map((s) => (
                    <Link key={s.id} to={s.path} className="text-base text-white flex items-center gap-3">
                      <span className="mono-label">{s.index}</span>
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 pt-4 border-t border-[var(--color-line-0)]">
                {navLinks.map((l) => (
                  <a key={l.label} href={l.to} className="text-base text-white">
                    {l.label}
                  </a>
                ))}
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-4 py-3 text-sm font-medium bg-[var(--color-accent)] text-[#050505]"
              >
                Request Security Assessment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
