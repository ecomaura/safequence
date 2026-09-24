import Seo from '../lib/Seo'
import PageHero from '../components/PageHero'
import FlowDiagram from '../components/FlowDiagram'
import PointGrid from '../components/PointGrid'
import CtaBand from '../components/CtaBand'
import Reveal from '../components/Reveal'

const flowNodes = ['INTERNET', 'EDGE', 'APPLICATIONS', 'CLOUD SERVICES', 'DATA']

const areas = [
  { label: 'Cloud Exposure', detail: 'Externally reachable services, storage and endpoints that widen your attack surface.' },
  { label: 'Identity & Privilege', detail: 'IAM roles, policies and privilege escalation paths across accounts and workloads.' },
  { label: 'Network & Storage', detail: 'Network segmentation, security groups and storage access controls reviewed for exposure.' },
  { label: 'Logging & Security Controls', detail: 'Coverage and configuration of logging, monitoring and native security tooling.' },
  { label: 'Hardening Roadmap', detail: 'A prioritized path from current configuration to a defensible security baseline.' },
]

const scopeAreas = [
  'IAM & privilege analysis',
  'Storage & network exposure',
  'Logging & security controls',
  'Cloud hardening roadmap',
]

export default function CloudSecurity() {
  return (
    <>
      <Seo
        title="Cloud Security Assessment | Safequence"
        description="Identify misconfigurations, excessive permissions, exposed services and architectural weaknesses across your cloud environment."
        path="/cloud-security"
      />

      <PageHero
        eyebrow="Cloud Security"
        title="Cloud Security Assessment"
        description="Identify misconfigurations, excessive permissions, exposed services and architectural weaknesses across your cloud environment."
        primaryCta="Assess Our Cloud Environment"
        secondaryCta="Discuss Your Environment"
        diagram={<FlowDiagram nodes={flowNodes} orientation="vertical" flagged={[1, 3]} />}
      />

      <section className="border-t border-[var(--color-line-0)]">
        <div className="container-sq py-14">
          <Reveal>
            <div className="mono-label mb-4">Reviewed across</div>
            <div className="flex flex-wrap gap-x-10 gap-y-3">
              {['AWS', 'Azure', 'GCP'].map((p) => (
                <span key={p} className="font-[var(--font-display)] text-lg text-[var(--color-ink-1)]">{p}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <PointGrid
        eyebrow="Scope"
        title="Reviewed as one architecture, not a list of settings."
        items={areas}
        columns={2}
      />

      <section className="border-t border-[var(--color-line-0)]">
        <div className="container-sq py-20 md:py-28">
          <div className="mono-label mb-5">Assessment areas</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-t border-[var(--color-line-0)]">
            {scopeAreas.map((item) => (
              <div key={item} className="border-t border-[var(--color-line-0)] py-6 -mt-px pr-4">
                <p className="text-sm text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Does your cloud configuration match your security intent?" cta="Request Cloud Security Assessment" />
    </>
  )
}
