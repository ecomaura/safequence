// Content for the /sample-report landing page. Plain JS so scripts/prerender.mjs
// can import it at build time. The PDF and previews live in /public/samples.

export const SAMPLE_REPORT = {
  pdf: {
    href: '/samples/KeyPrefer-Sample-Penetration-Test-Report.pdf',
    pages: 10,
    size: '0.4 MB',
  },
  pages: [
    { src: '/samples/page-1.jpg', caption: 'Cover and document control', alt: 'Cover page of the KeyPrefer sample penetration test report' },
    { src: '/samples/page-2.jpg', caption: 'Executive summary', alt: 'Executive summary page with key evidence table and attack chain' },
    { src: '/samples/page-5.jpg', caption: 'Detailed findings and evidence', alt: 'Detailed finding pages with CVSS vectors, evidence and remediation' },
    { src: '/samples/page-7.jpg', caption: 'Retest results', alt: 'Retest table showing pass and fail results per control' },
  ],
  findings: [
    { id: 'SEC-01', title: 'Password reset accepts any OTP', severity: 'Critical', score: '9.1', status: 'Core flaw fixed; lockout validation incomplete' },
    { id: 'SEC-02', title: 'Cross-tenant access to employee records (BOLA)', severity: 'High', score: '8.1', status: 'Fixed on staging' },
    { id: 'SEC-03', title: 'User enumeration via response timing', severity: 'Medium', score: '5.3', status: 'Fixed on staging' },
    { id: 'SEC-04', title: 'No effective login rate limiting', severity: 'Medium', score: '6.5', status: 'Partially fixed; open' },
  ],
  inside: [
    { label: 'Executive summary', detail: 'Overall posture, key evidence at a glance, an illustrative attack chain and prioritized actions with owners and deadlines.' },
    { label: 'Scope and methodology', detail: 'What was tested, how, and what was not. Aligned to OWASP WSTG and the OWASP API Security Top 10, with limitations stated plainly.' },
    { label: 'Evidence-backed findings', detail: 'Each finding carries a CVSS v3.1 vector with the reasoning behind every metric, request and response evidence, and specific remediation steps.' },
    { label: 'Retest and closure', detail: 'Every fix is re-verified. Status terms are defined, and open validation items are listed so nothing is marked closed prematurely.' },
  ],
  facts: [
    { value: 'CVSS v3.1', label: 'Scored with documented rationale' },
    { value: 'OWASP', label: 'WSTG and API Top 10 aligned' },
    { value: 'Retest', label: 'Included for every finding' },
    { value: 'Peer review', label: 'Second assessor checks scoring' },
  ],
}
