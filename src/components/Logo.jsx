import { Link } from 'react-router-dom'

/**
 * Renders the KeyPrefer wordmark from /public/logo.svg (white, transparent
 * background, traced from the supplied logo for the dark theme). Every usage
 * across the navbar and footer points at this one file.
 */
export default function Logo({ className = 'h-8 md:h-10 w-auto' }) {
  return (
    <Link to="/" aria-label="KeyPrefer — home" className="inline-flex items-center">
      <img src="/logo.svg" alt="KeyPrefer" className={className} />
    </Link>
  )
}
