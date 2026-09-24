import Seo from '../lib/Seo'
import PageHero from '../components/PageHero'
import FlowDiagram from '../components/FlowDiagram'
import PointGrid from '../components/PointGrid'
import CtaBand from '../components/CtaBand'

const flowNodes = ['USERS', 'IDENTITY', 'CONDITIONAL ACCESS', 'MICROSOFT 365', 'APPLICATIONS / DATA']

const areas = [
  { label: 'Identity Security', detail: 'Review of Entra ID configuration, privileged roles and identity hygiene across the tenant.' },
  { label: 'Access Controls', detail: 'MFA enforcement and Conditional Access policy design across users, devices and sign-in risk.' },
  { label: 'Email Security', detail: 'Exchange Online configuration, mail flow rules and phishing-resistant controls.' },
  { label: 'Defender Configuration', detail: 'Microsoft Defender policy coverage across identity, endpoint and cloud apps.' },
  { label: 'Administrative & Application Permissions', detail: 'Admin role assignment and the scope of permissions granted to registered applications.' },
]

export default function M365Security() {
  return (
    <>
      <Seo
        title="Microsoft 365 Security Assessment | Safequence"
        description="Review identity, collaboration, email and Microsoft security controls across your Microsoft 365 environment."
        path="/m365-security"
      />

      <PageHero
        eyebrow="M365 Security"
        title="Microsoft 365 Security Assessment"
        description="Review identity, collaboration, email and Microsoft security controls across your Microsoft 365 environment."
        primaryCta="Assess Our M365 Environment"
        secondaryCta="Discuss Your Tenant"
        diagram={<FlowDiagram nodes={flowNodes} orientation="vertical" flagged={[1, 2]} />}
      />

      <PointGrid
        eyebrow="Key assessment areas"
        title="Entra ID, access, email and Defender — reviewed together."
        description="Microsoft 365 security spans identity, endpoint and data controls. We assess it as one connected system, not five isolated checklists."
        items={areas}
        columns={2}
      />

      <section className="border-t border-[var(--color-line-0)]">
        <div className="container-sq py-20 md:py-28">
          <div className="mono-label mb-5">What we review</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-0 border-t border-[var(--color-line-0)]">
            {['Entra ID review', 'MFA & Conditional Access', 'Defender configuration', 'Exchange / email security', 'Admin & app permissions'].map((item) => (
              <div key={item} className="border-t border-[var(--color-line-0)] py-6 -mt-px">
                <p className="text-sm text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Is your Microsoft 365 tenant configured the way you think it is?" cta="Request M365 Security Assessment" />
    </>
  )
}
