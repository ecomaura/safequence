import Seo from '../lib/Seo'
import Button from '../components/Button'

export default function NotFound() {
  return (
    <>
      <Seo path="/404" notFound />
      <section className="pt-44 pb-32">
        <div className="container-sq">
          <div className="eyebrow mb-4">Error 404</div>
          <h1 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-[var(--color-ink-0)]">
            Page not found
          </h1>
          <p className="mt-6 text-base md:text-lg text-[var(--color-ink-2)] max-w-lg leading-relaxed">
            The page you are looking for does not exist or has moved.
          </p>
          <div className="mt-9">
            <Button to="/" variant="primary">Back to home</Button>
          </div>
        </div>
      </section>
    </>
  )
}
