import { Link } from 'react-router-dom'

/**
 * Renders the EviDecode wordmark from /public/logo.svg (white, transparent
 * background, traced from the supplied logo for the dark theme). Every usage
 * across the navbar and footer points at this one file.
 */
export default function Logo({ className = 'h-6 md:h-8 w-auto' }) {
  return (
    <Link to="/" aria-label="EviDecode — home" className="inline-flex items-center">
      <img src="/logo.svg" alt="EviDecode" className={className} />
    </Link>
  )
}
