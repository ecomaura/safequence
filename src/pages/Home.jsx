import { motion } from 'framer-motion'
import Seo from '../lib/Seo'
import ScanField from '../components/ScanField'
import FindingCard from '../components/FindingCard'
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
        title="EviDecode | Cybersecurity Testing & Security Assessment"
        description="Security testing and assessment for applications, networks, APIs, cloud environments and Microsoft 365."
        path="/"
      />

      {/* Hero */}
      <section className="theme-dark relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <ScanField />
        <div className="container-sq relative grid grid-cols-1 lg:grid-cols-[1.2fr_0.9fr] gap-14 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="eyebrow mb-5">Cybersecurity testing &amp; security assessment</div>
            <h1 className="font-display font-bold text-[2.6rem] leading-[1.02] sm:text-6xl md:text-[3.5rem] tracking-[-0.025em] text-balance text-[var(--color-ink-0)]">
              Find the weaknesses<br className="hidden md:block" /> before attackers do.
            </h1>
            <p className="mt-6 text-base md:text-lg text-[var(--color-ink-2)] leading-relaxed max-w-[34rem]">
              Security testing and assessment for applications, networks, APIs, cloud environments
              and Microsoft 365. Every finding comes with the evidence to prove it and the steps to fix it.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button to="/contact" variant="primary">Request a Security Assessment</Button>
              <Button to="/#services" variant="ghost" onClick={(e) => {
                e.preventDefault()
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
              }}>Explore Services</Button>
            </div>
          </motion.div>

          <FindingCard />
        </div>
      </section>

      {/* Service navigation cards */}
      <section id="services" className="bg-[var(--color-bg-1)] scroll-mt-16">
        <div className="container-sq py-20 md:py-24">
          <SectionHeading
            eyebrow="Where we focus"
            title="Four service lines, one exposure story."
            description="Each engagement is scoped around the systems attackers actually target."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <ServiceCard key={s.id} service={s} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      {/* Why EviDecode */}
      <section id="why" className="scroll-mt-20">
        <div className="container-sq py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-14">
            <SectionHeading
              eyebrow="Why EviDecode"
              title="Security testing that holds up under scrutiny."
              description="We work the way an internal security team would want a testing partner to work — thorough, evidence-based and easy to act on."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-9">
              {differentiators.map((d, i) => (
                <Reveal key={d.label} delay={i * 0.07}>
                  <div className="border-l-2 border-[var(--color-accent)] pl-5">
                    <h3 className="font-display font-semibold text-lg text-[var(--color-ink-0)]">{d.label}</h3>
                    <p className="mt-2 text-sm text-[var(--color-ink-2)] leading-relaxed">{d.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Approach / methodology */}
      <section id="approach" className="bg-[var(--color-bg-1)] scroll-mt-20">
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

      {/* Additional capabilities */}
      <section>
        <div className="container-sq py-20 md:py-24">
          <Reveal>
            <h2 className="font-display font-semibold text-2xl md:text-3xl tracking-tight text-[var(--color-ink-0)]">
              Additional security capabilities
            </h2>
            <ul className="mt-8 flex flex-wrap gap-3 list-none p-0 m-0">
              {additionalCapabilities.map((c) => (
                <li
                  key={c}
                  className="px-4 py-2 text-sm text-[var(--color-ink-1)] border border-[var(--color-line-1)] bg-[var(--color-bg-0)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {c}
                </li>
              ))}
            </ul>
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
