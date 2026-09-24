import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <Reveal className={align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'}>
      {eyebrow && <div className="mono-label mb-4">{eyebrow}</div>}
      <h2 className="font-[var(--font-display)] text-3xl md:text-[2.6rem] leading-[1.1] tracking-tight text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-[var(--color-ink-2)] leading-relaxed">{description}</p>
      )}
    </Reveal>
  )
}
