import Seo from '../lib/Seo'
import PageHero from '../components/PageHero'
import FlowDiagram from '../components/FlowDiagram'
import PointGrid from '../components/PointGrid'
import CtaBand from '../components/CtaBand'

const flowNodes = ['CLIENT', 'AUTH', 'API GATEWAY', 'SERVICE', 'DATABASE']

const surface = [
  { label: 'API Attack Surface', detail: 'REST and GraphQL endpoints mapped and tested for exposure beyond documented functionality.' },
  { label: 'Authentication', detail: 'How the API verifies identity, and where that verification can be bypassed or weakened.' },
  { label: 'Authorization', detail: 'BOLA and IDOR testing to confirm users can only reach the objects and actions they should.' },
  { label: 'Data Exposure', detail: 'Response payloads and error handling reviewed for data that should never leave the service.' },
  { label: 'Session & Token Security', detail: 'Token issuance, expiry, storage and session handling assessed for weaknesses.' },
  { label: 'Abuse & Rate Limiting', detail: 'Rate-limit testing against brute-force, scraping and resource-exhaustion scenarios.' },
]

const remediation = [
  { label: 'Remediation guidance', detail: 'Findings are paired with clear, API-specific guidance your engineering team can implement directly.' },
]

export default function ApiSecurity() {
  return (
    <>
      <Seo
        title="API Security Testing | Safequence"
        description="Assess APIs for authorization flaws, data exposure, authentication weaknesses and abuse scenarios."
        path="/api-security"
      />

      <PageHero
        eyebrow="API Security"
        title="API Security Testing"
        description="Assess APIs for authorization flaws, data exposure, authentication weaknesses and abuse scenarios."
        primaryCta="Request API Security Testing"
        secondaryCta="Discuss Your API"
        diagram={<FlowDiagram nodes={flowNodes} orientation="horizontal" flagged={[1, 3]} />}
      />

      <PointGrid
        eyebrow="Coverage"
        title="Testing built around how APIs actually fail."
        description="REST and GraphQL testing focused on authorization, data exposure, token security and abuse — not just schema validation."
        items={surface}
        columns={2}
      />

      <PointGrid eyebrow="Deliverables" title="Remediation you can act on" items={remediation} columns={1} />

      <CtaBand title="Could an attacker reach data your API wasn't meant to expose?" cta="Test Your APIs" />
    </>
  )
}
