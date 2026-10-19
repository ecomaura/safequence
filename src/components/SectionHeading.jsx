import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <Reveal className={align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'}>
      {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
      <h2 className="font-display font-semibold text-3xl md:text-[2.6rem] leading-[1.1] tracking-tight text-[var(--color-ink-0)]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-[var(--color-ink-2)] leading-relaxed">{description}</p>
      )}
    </Reveal>
  )
}
