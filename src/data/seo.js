// Single source of truth for SEO. Used by the <Seo /> component at runtime AND by
// scripts/prerender.mjs at build time (so crawlers get real HTML without running JS).
// Plain JS on purpose: no JSX or aliases, so Node can import it directly.

export const SITE = {
  name: 'KeyPrefer',
  url: 'https://www.keyprefer.com',
  email: 'contact@keyprefer.com',
  image: '/og-image.jpg', // 1200x630 share image
  logo: '/icon-512.png',
  tagline: 'Cybersecurity testing & security assessment',
}

export const PAGES = {
  '/': {
    title: 'KeyPrefer | Cybersecurity Testing & Security Assessment',
    description:
      'Security testing and assessment for applications, networks, APIs, cloud environments and Microsoft 365.',
    h1: 'Find the weaknesses before attackers do.',
    kind: 'home',
    file: 'index.html',
  },
  '/vapt': {
    title: 'Penetration Testing & VAPT Services | KeyPrefer',
    description:
      'Vulnerability assessment and penetration testing across web, mobile, network and infrastructure to find and validate real-world risk.',
    h1: 'Vulnerability Assessment & Penetration Testing',
    kind: 'service',
    name: 'VAPT Services',
    file: 'vapt.html',
  },
  '/m365-security': {
    title: 'Microsoft 365 Security Assessment | KeyPrefer',
    description:
      'Review identity, collaboration, email and Microsoft security controls across your Microsoft 365 environment.',
    h1: 'Microsoft 365 Security Assessment',
    kind: 'service',
    name: 'Microsoft 365 Security Assessment',
    file: 'm365-security.html',
  },
  '/cloud-security': {
    title: 'Cloud Security Assessment | KeyPrefer',
    description:
      'Identify misconfigurations, excessive permissions, exposed services and architectural weaknesses across your cloud environment.',
    h1: 'Cloud Security Assessment',
    kind: 'service',
    name: 'Cloud Security Assessment',
    file: 'cloud-security.html',
  },
  '/api-security': {
    title: 'API Security Testing & Assessment | KeyPrefer',
    description:
      'Assess APIs for authorization flaws, data exposure, authentication weaknesses and abuse scenarios.',
    h1: 'API Security Testing',
    kind: 'service',
    name: 'API Security Testing',
    file: 'api-security.html',
  },
  '/sample-report': {
    title: 'Sample Penetration Test Report | KeyPrefer',
    description:
      'Download a sample KeyPrefer penetration test report: executive summary, CVSS-scored findings with evidence, remediation guidance and retest results.',
    h1: 'See what a KeyPrefer penetration test report looks like.',
    kind: 'sample',
    name: 'Sample Penetration Test Report',
    file: 'sample-report.html',
  },
  '/contact': {
    title: 'Contact KeyPrefer | Request a Security Assessment',
    description:
      'Request a security assessment for your applications, networks, APIs, cloud environment or Microsoft 365 tenant.',
    h1: "Let's identify where your security exposure starts.",
    kind: 'contact',
    file: 'contact.html',
  },
}

export const NOT_FOUND = {
  title: 'Page not found | KeyPrefer',
  description: 'The page you are looking for does not exist.',
  h1: 'Page not found',
  file: '404.html',
}

export const canonicalFor = (path) => `${SITE.url}${path === '/' ? '/' : path}`
export const absolute = (p) => `${SITE.url}${p}`

/** schema.org JSON-LD graph for a route. */
export function jsonLd(path) {
  const page = PAGES[path]
  const orgId = `${SITE.url}/#organization`
  const graph = [
    {
      '@type': 'Organization',
      '@id': orgId,
      name: SITE.name,
      url: `${SITE.url}/`,
      logo: absolute(SITE.logo),
      email: SITE.email,
      description: PAGES['/'].description,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: `${SITE.url}/`,
      name: SITE.name,
      publisher: { '@id': orgId },
      inLanguage: 'en',
    },
  ]
  if (page?.kind === 'service') {
    graph.push(
      {
        '@type': 'Service',
        '@id': `${canonicalFor(path)}#service`,
        name: page.name,
        description: page.description,
        url: canonicalFor(path),
        serviceType: 'Cybersecurity assessment',
        provider: { '@id': orgId },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
          { '@type': 'ListItem', position: 2, name: page.name, item: canonicalFor(path) },
        ],
      },
    )
  }
  if (page?.kind === 'sample') {
    graph.push(
      {
        '@type': 'WebPage',
        '@id': `${canonicalFor(path)}#webpage`,
        url: canonicalFor(path),
        name: page.title,
        description: page.description,
        isPartOf: { '@id': `${SITE.url}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
          { '@type': 'ListItem', position: 2, name: page.name, item: canonicalFor(path) },
        ],
      },
    )
  }
  if (page?.kind === 'contact') {
    graph.push({
      '@type': 'ContactPage',
      '@id': `${canonicalFor(path)}#webpage`,
      url: canonicalFor(path),
      name: page.title,
      isPartOf: { '@id': `${SITE.url}/#website` },
    })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}
