import Seo from '../lib/Seo'
import PageHero from '../components/PageHero'
import AttackSurfaceMap from '../components/AttackSurfaceMap'
import PointGrid from '../components/PointGrid'
import ProcessSteps from '../components/ProcessSteps'
import CtaBand from '../components/CtaBand'
import SectionHeading from '../components/SectionHeading'

const whatWeTest = [
  { label: 'OWASP-focused testing', detail: 'Coverage built around the vulnerability classes that matter most in production web applications.' },
  { label: 'Authentication & authorization', detail: 'How identity is established, verified and enforced across every role and permission boundary.' },
  { label: 'Business-logic testing', detail: 'Workflow and process abuse that automated scanners cannot detect on their own.' },
  { label: 'Manual exploitation', detail: 'Findings are manually validated and, where safe, exploited to confirm real-world impact.' },
  { label: 'Risk-rated remediation reporting', detail: 'Every issue is prioritized and paired with clear guidance your engineers can act on.' },
]

const identifies = [
  { label: 'Authentication weaknesses' },
  { label: 'Authorization flaws' },
  { label: 'Business logic vulnerabilities' },
  { label: 'Application-layer weaknesses' },
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
  { name: 'Discover', detail: 'Identify the application, its entry points and the scope of the engagement.' },
  { name: 'Map', detail: 'Chart the application\u2019s functionality, roles and data flows to understand the full attack surface.' },
  { name: 'Test', detail: 'Manually test authentication, authorization, business logic and application-layer controls.' },
  { name: 'Validate', detail: 'Confirm and, where appropriate, safely demonstrate the real-world impact of each finding.' },
  { name: 'Report', detail: 'Deliver risk-rated findings with technical evidence and an executive-level summary.' },
]

export default function WebVapt() {
  return (
    <>
      <Seo
        title="Web VAPT | Safequence"
        description="Find and validate vulnerabilities in websites and web applications before attackers can exploit them."
        path="/web-vapt"
      />

      <PageHero
        eyebrow="Web VAPT"
        title="Web Application VAPT"
        description="Find and validate vulnerabilities in websites and web applications before attackers can exploit them."
        primaryCta="Request a VAPT Assessment"
        secondaryCta="Discuss Your Application"
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
        columns={3}
      />

      <PointGrid eyebrow="Deliverables" title="What you receive" items={deliverables} columns={3} />

      <CtaBand
        title="Is your application ready for an independent security assessment?"
        cta="Request Web VAPT"
      />
    </>
  )
}
