import Reveal from './Reveal'
import Button from './Button'

export default function CtaBand({ title, cta }) {
  return (
    <section className="border-t border-[var(--color-line-0)]">
      <div className="container-sq py-20 md:py-28 text-center">
        <Reveal className="mx-auto max-w-2xl">
          <h2 className="font-[var(--font-display)] text-2xl md:text-[2.2rem] leading-tight tracking-tight text-white">
            {title}
          </h2>
          <div className="mt-8">
            <Button to="/contact" variant="primary">{cta}</Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
