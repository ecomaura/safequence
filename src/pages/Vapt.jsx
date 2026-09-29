import Seo from '../lib/Seo'
import PageHero from '../components/PageHero'
import AttackSurfaceMap from '../components/AttackSurfaceMap'
import PointGrid from '../components/PointGrid'
import ProcessSteps from '../components/ProcessSteps'
import CtaBand from '../components/CtaBand'
import SectionHeading from '../components/SectionHeading'

const whatWeTest = [
  { label: 'Web applications & websites', detail: 'OWASP-focused testing of production web apps, including authentication, authorization and business-logic abuse.' },
  { label: 'Mobile applications', detail: 'Android and iOS app testing covering insecure storage, weak transport security and backend API exposure.' },
  { label: 'Network & infrastructure', detail: 'Internal and external testing of servers, services, firewalls and network segmentation.' },
  { label: 'APIs & integrations', detail: 'Assessment of REST and GraphQL interfaces for access-control flaws and data exposure.' },
  { label: 'Cloud & configuration review', detail: 'Validation of exposed services, misconfigurations and excessive permissions in cloud-hosted assets.' },
  { label: 'Manual exploitation & reporting', detail: 'Findings are manually validated and, where safe, exploited to confirm real-world impact, then risk-rated with clear remediation guidance.' },
]

const identifies = [
  { label: 'Authentication & authorization weaknesses' },
  { label: 'Business logic vulnerabilities' },
  { label: 'Misconfigurations & exposed services' },
  { label: 'Unpatched & outdated components' },
  { label: 'Security control gaps' },
]

const deliverables = [
  { label: 'Risk-rated findings' },
  { label: 'Technical evidence' },
  { label: 'Business impact' },
  { label: 'Remediation guidance' },
  { label: 'Executive-level summary' },
]

const process = [
  { name: 'Discover', detail: 'Identify the in-scope applications, networks and assets, and agree the rules of engagement.' },
  { name: 'Map', detail: 'Chart functionality, services, roles and data flows to understand the full attack surface.' },
  { name: 'Test', detail: 'Combine automated scanning with manual testing of authentication, authorization, logic and configuration.' },
  { name: 'Validate', detail: 'Confirm and, where appropriate, safely demonstrate the real-world impact of each finding.' },
  { name: 'Report', detail: 'Deliver risk-rated findings with technical evidence and an executive-level summary.' },
]

export default function Vapt() {
  return (
    <>
      <Seo
  title="VAPT Services | Safequence"
  description="Vulnerability assessment and penetration testing across web, mobile, network and infrastructure to find and validate real-world risk."
  path="/vapt"
/>

<PageHero
  eyebrow="VAPT Services"
  title="Vulnerability Assessment & Penetration Testing"
  description="Identify and validate vulnerabilities across web, mobile, network and infrastructure environments before attackers can exploit them."
  primaryCta="Request a VAPT Assessment"
  secondaryCta="Discuss Your Environment"
  diagram={<AttackSurfaceMap />}
/>

      <PointGrid eyebrow="Scope" title="What we test" items={whatWeTest} columns={2} />

      <section className="border-t border-[var(--color-line-0)]">
        <div className="container-sq py-20 md:py-28">
          <SectionHeading
            eyebrow="Methodology"
            title="A testing approach built for validation, not just detection."
          />
          <div className="mt-14">
            <ProcessSteps steps={process} />
          </div>
        </div>
      </section>

      <PointGrid
        eyebrow="Outcomes"
        title="What the assessment helps identify"
        items={identifies}
        columns={6}
      />

      <PointGrid eyebrow="Deliverables" title="What you receive" items={deliverables} columns={3} />

     <CtaBand
  title="Is your environment ready for an independent security assessment?"
  cta="Request VAPT Assessment"
/>
    </>
  )
}
