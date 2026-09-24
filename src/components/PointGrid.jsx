import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function PointGrid({ eyebrow, title, description, items, columns = 2 }) {
  return (
    <section className="border-t border-[var(--color-line-0)]">
      <div className="container-sq py-20 md:py-28">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div
          className={`mt-14 grid grid-cols-1 gap-x-10 gap-y-0 ${
            columns === 3 ? 'md:grid-cols-3' : columns === 1 ? 'md:grid-cols-1 max-w-2xl' : 'md:grid-cols-2'
          }`}
        >
          {items.map((item, i) => (
            <Reveal key={item.label} delay={(i % columns) * 0.06}>
              <div className="border-t border-[var(--color-line-0)] py-6">
                <h3 className="text-white text-base font-medium">{item.label}</h3>
                {item.detail && (
                  <p className="mt-2 text-sm text-[var(--color-ink-2)] leading-relaxed">{item.detail}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
