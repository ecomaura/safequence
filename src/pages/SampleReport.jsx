import { motion } from 'framer-motion'
import Seo from '../lib/Seo'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import CtaBand from '../components/CtaBand'
import { SAMPLE_REPORT } from '../data/sampleReport'

const { pdf, pages, findings, inside, facts } = SAMPLE_REPORT

const severityStyle = {
  Critical: 'text-[#ff8a8a] border-[#ff8a8a]/40 bg-[#ff8a8a]/10',
  High: 'text-[#ffb27a] border-[#ffb27a]/40 bg-[#ffb27a]/10',
  Medium: 'text-[#ffd76a] border-[#ffd76a]/40 bg-[#ffd76a]/10',
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1v9m0 0L4.5 6.5M8 10l3.5-3.5M2 13.5h12" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

export default function SampleReport() {
  return (
    <>
      <Seo path="/sample-report" />

      {/* Hero */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 bg-[var(--color-bg-1)] border-b border-[var(--color-line-0)] overflow-hidden">
        <div className="absolute inset-0 grid-field opacity-[0.22] pointer-events-none" aria-hidden="true" />
        <div className="container-sq relative grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="eyebrow mb-4">Sample Report</div>
            <h1 className="font-display font-semibold text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.06] tracking-tight text-[var(--color-ink-0)] max-w-xl">
              See what a KeyPrefer penetration test report looks like.
            </h1>
            <p className="mt-6 text-base md:text-lg text-[var(--color-ink-2)] leading-relaxed max-w-lg">
              A complete, 10-page sample deliverable for a web application and API assessment: executive summary,
              evidence-backed findings, CVSS scoring, remediation guidance and a retest.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button
                href={pdf.href}
                download
                variant="primary"
                onClick={() => window.gtag?.('event', 'sample_report_download', { method: 'hero' })}
              >
                <DownloadIcon /> Download sample report (PDF)
              </Button>
              <Button to="/contact" variant="ghost">Request an Assessment</Button>
            </div>
            <p className="mt-5 mono-label">
              PDF · {pdf.pages} pages · {pdf.size}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-[380px]"
          >
            <div className="absolute -inset-6 bg-[var(--color-accent)]/10 blur-3xl" aria-hidden="true" />
            <a
              href={pdf.href}
              target="_blank"
              rel="noopener"
              aria-label="Open the sample report PDF"
              className="relative block border border-[var(--color-line-1)] bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:-translate-y-1"
            >
              <img
                src={pages[0].src}
                alt={pages[0].alt}
                width="820"
                height="1159"
                className="block w-full h-auto"
                fetchPriority="high"
              />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Notice */}
      <section className="border-b border-[var(--color-line-0)] bg-[var(--color-bg-0)]">
        <div className="container-sq py-6">
          <p className="text-sm text-[var(--color-ink-2)] leading-relaxed max-w-3xl">
            <span className="text-[var(--color-ink-0)] font-medium">Fictional client, synthetic data.</span>{' '}
            This sample is not a record of a real engagement. No real organization, system or personal data was
            tested or exposed. Client reports are confidential and name the individual assessors.
          </p>
        </div>
      </section>

      {/* What's inside */}
      <section>
        <div className="container-sq py-20 md:py-28">
          <SectionHeading
            eyebrow="What's inside"
            title="Written for both your engineers and your leadership."
            description="Every report leads with a plain-language summary and backs each finding with evidence you can reproduce."
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {inside.map((item, i) => (
              <Reveal key={item.label} delay={(i % 2) * 0.06}>
                <div className="border-l-2 border-[var(--color-line-1)] pl-5 transition-colors hover:border-[var(--color-accent)]">
                  <h3 className="font-display font-semibold text-lg text-[var(--color-ink-0)]">{item.label}</h3>
                  <p className="mt-2 text-sm text-[var(--color-ink-2)] leading-relaxed">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Findings at a glance */}
      <section className="bg-[var(--color-bg-1)] border-y border-[var(--color-line-0)]">
        <div className="container-sq py-20 md:py-28">
          <SectionHeading
            eyebrow="Findings at a glance"
            title="Four findings, each tracked through retest."
            description="Severity follows CVSS v3.1 base scores. Status is the result of our retest on the staging build."
          />
          <Reveal className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm border-collapse">
              <thead>
                <tr className="mono-label border-b border-[var(--color-line-1)]">
                  <th className="py-3 pr-4 font-normal">ID</th>
                  <th className="py-3 pr-4 font-normal">Finding</th>
                  <th className="py-3 pr-4 font-normal">Severity</th>
                  <th className="py-3 font-normal">Status after retest</th>
                </tr>
              </thead>
              <tbody>
                {findings.map((f) => (
                  <tr key={f.id} className="border-b border-[var(--color-line-0)] align-top">
                    <td className="py-4 pr-4 font-mono text-[var(--color-ink-3)] whitespace-nowrap">{f.id}</td>
                    <td className="py-4 pr-4 text-[var(--color-ink-0)]">{f.title}</td>
                    <td className="py-4 pr-4 whitespace-nowrap">
                      <span className={`inline-block px-2 py-0.5 text-xs border ${severityStyle[f.severity]}`}>
                        {f.severity} {f.score}
                      </span>
                    </td>
                    <td className="py-4 text-[var(--color-ink-2)]">{f.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* Page previews */}
      <section>
        <div className="container-sq py-20 md:py-28">
          <SectionHeading
            eyebrow="Preview"
            title="A look inside the report."
            description="Select any page to open the full PDF."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pages.map((p, i) => (
              <Reveal key={p.src} delay={i * 0.06}>
                <a href={pdf.href} target="_blank" rel="noopener" className="group block">
                  <div className="border border-[var(--color-line-1)] bg-white overflow-hidden transition-colors group-hover:border-[var(--color-accent)]">
                    <img
                      src={p.src}
                      alt={p.alt}
                      width="820"
                      height="1159"
                      loading="lazy"
                      className="block w-full h-auto"
                    />
                  </div>
                  <div className="mt-3 text-sm text-[var(--color-ink-1)] group-hover:text-[var(--color-accent-text)] transition-colors">
                    {p.caption}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Method facts */}
      <section className="bg-[var(--color-bg-1)] border-t border-[var(--color-line-0)]">
        <div className="container-sq py-16 md:py-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {facts.map((f) => (
            <Reveal key={f.label}>
              <div className="font-display font-semibold text-2xl text-[var(--color-ink-0)]">{f.value}</div>
              <div className="mt-1 text-sm text-[var(--color-ink-2)]">{f.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Want a report like this for your own application?"
        cta="Request a Security Assessment"
      />
    </>
  )
}
