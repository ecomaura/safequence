// Single source of truth for the four primary service lines and the
// broader capability catalog. Keep copy here so pages and nav stay in sync.

export const services = [
  {
    id: 'web-vapt',
    path: '/web-vapt',
    index: '01',
    name: 'Web VAPT',
    fullName: 'Web Application VAPT',
    short:
      'Find and validate vulnerabilities in websites and web applications before attackers can exploit them.',
    nav: 'Web VAPT',
  },
  {
    id: 'm365-security',
    path: '/m365-security',
    index: '02',
    name: 'M365 Security',
    fullName: 'Microsoft 365 Security Assessment',
    short:
      'Review identity, collaboration, email and Microsoft security controls across the Microsoft 365 environment.',
    nav: 'M365 Security',
  },
  {
    id: 'cloud-security',
    path: '/cloud-security',
    index: '03',
    name: 'Cloud Security',
    fullName: 'Cloud Security Assessment',
    short:
      'Review cloud environments for misconfigurations, excessive permissions, exposed services and architectural weaknesses.',
    nav: 'Cloud Security',
  },
  {
    id: 'api-security',
    path: '/api-security',
    index: '04',
    name: 'API Security',
    fullName: 'API Security Testing',
    short:
      'Assess APIs for authorization flaws, data exposure, authentication weaknesses and abuse scenarios.',
    nav: 'API Security',
  },
]

// Five-stage program methodology — fixed, do not alter the sequence.
export const methodology = [
  {
    index: '01',
    name: 'Assess',
    detail: 'Understand exposure, architecture, risk and control gaps.',
  },
  {
    index: '02',
    name: 'Validate',
    detail: 'Validate real-world security through VAPT, API, mobile and AI testing.',
  },
  {
    index: '03',
    name: 'Improve',
    detail: 'Prioritize remediation and strengthen security controls.',
  },
  {
    index: '04',
    name: 'Monitor',
    detail: 'Maintain visibility through vulnerability and external attack-surface management.',
  },
  {
    index: '05',
    name: 'Advise',
    detail: 'Provide ongoing security leadership through architecture and vCISO services.',
  },
]

// Additional capabilities from the wider 16-service catalog — supporting
// content only, none of these get a dedicated primary landing page.
export const additionalCapabilities = [
  'AI Security Assessment & Red Teaming',
  'AI Application & LLM Security Testing',
  'AI Security Governance & Risk Advisory',
  'Mobile Application Security Testing',
  'Security Architecture & Threat Modeling',
  'Cybersecurity Risk Assessment',
  'Endpoint Security Assessment',
  'Third-Party / Vendor Security Assessment',
  'vCISO Services',
  'Vulnerability Management',
  'External Attack Surface Management',
  'Security Exposure & Credential Monitoring',
]

export const serviceOptions = [
  'Web VAPT',
  'M365 Security',
  'Cloud Security',
  'API Security',
  'Other',
]
