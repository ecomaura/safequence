import { motion } from 'framer-motion'
import Seo from '../lib/Seo'
import ScanField from '../components/ScanField'
import Button from '../components/Button'
import ServiceCard from '../components/ServiceCard'
import SectionHeading from '../components/SectionHeading'
import MethodologyTimeline from '../components/MethodologyTimeline'
import Reveal from '../components/Reveal'
import CtaBand from '../components/CtaBand'
import { services, additionalCapabilities } from '../data/services'

const differentiators = [
  {
    label: 'Independent by design',
    detail: 'We test and report without a stake in the platforms or vendors we assess — findings are ours alone.',
  },
  {
    label: 'Manual, expert-led testing',
    detail: 'Automated scanning is a starting point, not the deliverable. Our consultants manually validate every finding.',
  },
  {
    label: 'Risk-rated, not noise',
    detail: 'Every issue is prioritized by real business impact, so your team fixes what matters first.',
  },
  {
    label: 'Built for decision-makers',
    detail: 'Executive-ready summaries sit alongside the technical evidence engineers need to remediate.',
  },
]

export default function Home() {
  return (
    <>
      <Seo
        title="Safequence | Cybersecurity Testing & Security Assessment"
        description="Security testing and assessment for web applications, APIs, cloud environments and Microsoft 365."
        path="/"
      />

      {/* Hero */}
      <section className="relative pt-40 pb-24 md:pt-52 md:pb-32 overflow-hidden">
        <ScanField />
        <div className="container-sq relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <div className="mono-label mb-6">Cybersecurity testing &amp; security assessment</div>
            <h1 className="font-[var(--font-display)] text-[2.6rem] leading-[1.05] sm:text-6xl md:text-[4.2rem] tracking-tight text-white">
              Find the weaknesses<br />before attackers do.
            </h1>
            <p className="mt-7 text-base md:text-lg text-[var(--color-ink-2)] leading-relaxed max-w-xl">
              Security testing and assessment for web applications, APIs, cloud environments
              and Microsoft 365.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button to="/contact" variant="primary">Request a Security Assessment</Button>
              <Button to="/#services" variant="ghost" onClick={(e) => {
                e.preventDefault()
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
              }}>Explore Services</Button>
            </div>
            <div className="mt-14 text-xs tracking-wide text-[var(--color-ink-3)]">
              Web Applications &nbsp;•&nbsp; APIs &nbsp;•&nbsp; Cloud &nbsp;•&nbsp; Microsoft 365
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service navigation cards */}
      <section id="services" className="border-t border-[var(--color-line-0)]">
        <div className="container-sq py-20 md:py-24">
          <SectionHeading
            eyebrow="Where we focus"
            title="Four service lines, one exposure story."
            description="Each engagement is scoped around the systems attackers actually target."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
            {services.map((s, i) => (
              <ServiceCard key={s.id} service={s} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Safequence */}
      <section id="why" className="border-t border-[var(--color-line-0)] scroll-mt-20">
        <div className="container-sq py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-14">
            <SectionHeading
              eyebrow="Why Safequence"
              title="Security testing that holds up under scrutiny."
              description="We work the way an internal security team would want a testing partner to work — thorough, evidence-based and easy to act on."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
              {differentiators.map((d, i) => (
                <Reveal key={d.label} delay={i * 0.07}>
                  <div className="border-t border-[var(--color-line-0)] py-6">
                    <h3 className="text-white text-base font-medium">{d.label}</h3>
                    <p className="mt-2 text-sm text-[var(--color-ink-2)] leading-relaxed">{d.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Approach / methodology */}
      <section id="approach" className="border-t border-[var(--color-line-0)] scroll-mt-20">
        <div className="container-sq py-20 md:py-28">
          <SectionHeading
            eyebrow="Security approach"
            title="From assessment to stronger security."
            description="A scalable security program, not a one-off scan — five stages that move you from exposure to ongoing assurance."
          />
          <div className="mt-16">
            <MethodologyTimeline />
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="border-t border-[var(--color-line-0)]">
        <div className="container-sq py-20 md:py-28">
          <SectionHeading
            eyebrow="Services"
            title="Security services built around real exposure."
          />
          <div className="mt-14 grid grid-cols-1 divide-y divide-[var(--color-line-0)] border-t border-[var(--color-line-0)]">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.05}>
                <a
                  href={s.path}
                  className="group grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-3 md:gap-8 items-start md:items-center py-8"
                >
                  <span className="mono-label">{s.index}</span>
                  <div>
                    <h3 className="font-[var(--font-display)] text-xl text-white group-hover:text-[var(--color-accent)] transition-colors">
                      {s.name}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-ink-2)] leading-relaxed max-w-2xl">{s.short}</p>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 16 16" className="hidden md:block text-[var(--color-ink-3)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all">
                    <path d="M4 12L12 4M12 4H5.5M12 4V10.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
                  </svg>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-16 pt-10 border-t border-[var(--color-line-0)]">
            <div className="mono-label mb-5">Additional security capabilities</div>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {additionalCapabilities.map((c) => (
                <span key={c} className="text-sm text-[var(--color-ink-2)]">{c}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Ready to see where your exposure actually is?"
        cta="Request a Security Assessment"
      />
    </>
  )
}
