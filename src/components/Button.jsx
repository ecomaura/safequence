import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium transition-colors duration-200 whitespace-nowrap'

const variants = {
  primary: 'bg-[var(--color-accent)] text-[#050505] hover:bg-[var(--color-accent-bright)]',
  ghost:
    'border border-[var(--color-line-1)] text-[var(--color-ink-0)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]',
  text: 'text-[var(--color-ink-0)] hover:text-[var(--color-accent)] px-0 py-0',
}

export default function Button({ to, href, variant = 'primary', children, className = '', ...rest }) {
  const cls = `${base} ${variants[variant]} ${className}`
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  )
}
