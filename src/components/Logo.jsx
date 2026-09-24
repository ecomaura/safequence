import { Link } from 'react-router-dom'

/**
 * Renders the Safequence wordmark from /public/logo.svg.
 *
 * NOTE: No logo asset was supplied with this build, so /public/logo.svg
 * is a placeholder mark. Drop the real "download (1).svg" asset into
 * /public/logo.svg (keeping the same filename) to swap it in — every
 * usage across the navbar and footer points at this one file.
 */
export default function Logo({ className = 'h-8 md:h-10 w-auto' }) {
  return (
    <Link to="/" aria-label="Safequence — home" className="inline-flex items-center">
      <img src="/logo.svg" alt="Safequence" className={className} />
    </Link>
  )
}
