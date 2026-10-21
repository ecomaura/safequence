// Runs after `vite build`. Turns dist/index.html into one HTML file per route with:
//   - the route's own <title>, meta description, canonical, Open Graph / Twitter tags
//   - JSON-LD structured data
//   - real, visible text inside #root (React replaces it once JS loads)
// so Google, Bing and social-link scrapers see proper content without running JavaScript.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { SITE, PAGES, NOT_FOUND, canonicalFor, absolute, jsonLd } from '../src/data/seo.js'
import { services, methodology, additionalCapabilities, differentiators } from '../src/data/services.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function headTags(path, page, { notFound = false } = {}) {
  const canonical = canonicalFor(path)
  const img = absolute(SITE.image)
  const tags = [
    `<meta name="robots" content="${notFound ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
    notFound ? '' : `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:type" content="website" />`,
    notFound ? '' : `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(`${SITE.name} — ${SITE.tagline}`)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    notFound
      ? ''
      : `<script id="ld-json" type="application/ld+json">${JSON.stringify(jsonLd(path)).replace(/</g, '\\u003c')}</script>`,
  ]
  return tags.filter(Boolean).join('\n    ')
}

const nav = `<nav aria-label="Primary"><a href="/">${SITE.name}</a> · ${services
  .map((s) => `<a href="${s.path}">${esc(s.nav)}</a>`)
  .join(' · ')} · <a href="/contact">Contact</a></nav>`

function body(path, page) {
  const intro = `<h1>${esc(page.h1)}</h1><p>${esc(page.description)}</p>`
  let main = intro
  if (page.kind === 'home') {
    main += `<p><a href="/contact">Request a Security Assessment</a></p>
<h2>Our security services</h2><ul>${services
      .map((s) => `<li><a href="${s.path}">${esc(s.fullName)}</a> — ${esc(s.short)}</li>`)
      .join('')}</ul>
<h2>Why ${SITE.name}</h2><ul>${differentiators
      .map((d) => `<li><strong>${esc(d.label)}.</strong> ${esc(d.detail)}</li>`)
      .join('')}</ul>
<h2>Our security approach</h2><ol>${methodology
      .map((m) => `<li><strong>${esc(m.name)}.</strong> ${esc(m.detail)}</li>`)
      .join('')}</ol>
<h2>Additional security capabilities</h2><ul>${additionalCapabilities
      .map((c) => `<li>${esc(c)}</li>`)
      .join('')}</ul>`
  } else if (page.kind === 'service') {
    main += `<p><a href="/contact">Request a security assessment</a></p>
<h2>Other security services</h2><ul>${services
      .filter((s) => s.path !== path)
      .map((s) => `<li><a href="${s.path}">${esc(s.fullName)}</a> — ${esc(s.short)}</li>`)
      .join('')}</ul>`
  } else if (page.kind === 'contact') {
    main += `<p>Email us at <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>`
  } else {
    main += `<p><a href="/">Back to home</a></p>`
  }
  return `<header>${nav}</header><main>${main}</main><footer><p>© ${new Date().getFullYear()} ${SITE.name}. ${esc(SITE.tagline)}.</p></footer>`
}

function render(path, page, opts) {
  let html = template
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`)
  html = html.replace(
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="${esc(page.description)}" />`,
  )
  html = html.replace('</head>', `    ${headTags(path, page, opts)}\n  </head>`)
  if (!html.includes('<div id="root"></div>')) throw new Error('#root placeholder not found in dist/index.html')
  html = html.replace('<div id="root"></div>', `<div id="root">${body(path, page)}</div>`)
  return html
}

for (const [path, page] of Object.entries(PAGES)) {
  writeFileSync(join(dist, page.file), render(path, page))
  console.log('prerendered', path, '->', page.file)
}
writeFileSync(join(dist, NOT_FOUND.file), render('/404', NOT_FOUND, { notFound: true }))
console.log('prerendered 404 ->', NOT_FOUND.file)

for (const f of ['robots.txt', 'sitemap.xml']) {
  if (!existsSync(join(dist, f))) throw new Error(`${f} missing from dist (expected in /public)`)
}
