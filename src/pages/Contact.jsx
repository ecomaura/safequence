import Seo from '../lib/Seo'
import ScanField from '../components/ScanField'
import ContactForm from '../components/ContactForm'
import Reveal from '../components/Reveal'

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact | Safequence"
        description="Request a security assessment for your web applications, APIs, cloud environment or Microsoft 365 tenant."
        path="/contact"
      />

      <section className="relative pt-40 pb-16 md:pt-48 overflow-hidden">
        <ScanField />
        <div className="container-sq relative">
          <Reveal className="max-w-2xl">
            <div className="mono-label mb-5">Contact</div>
            <h1 className="font-[var(--font-display)] text-4xl md:text-5xl leading-[1.08] tracking-tight text-white">
              Let's identify where your security exposure starts.
            </h1>
            <p className="mt-6 text-base md:text-lg text-[var(--color-ink-2)] leading-relaxed">
              Tell us what you're protecting, what you're concerned about, or what needs to be assessed.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-sq grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-14 items-start">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <h2 className="font-[var(--font-display)] text-2xl text-white mb-4">Start a conversation</h2>
              <p className="text-sm text-[var(--color-ink-2)] leading-relaxed max-w-sm">
                Share a few details about your environment and what you'd like assessed — Web VAPT, M365,
                cloud or API security — and a consultant will follow up to scope the engagement.
              </p>
              <div className="mt-10 pt-8 border-t border-[var(--color-line-0)] text-xs text-[var(--color-ink-3)] leading-relaxed max-w-sm">
                Prefer email? Reach us directly and we'll route your request to the right team.
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
