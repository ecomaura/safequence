import { useEffect } from 'react'
import { SITE, PAGES, NOT_FOUND, canonicalFor, absolute, jsonLd } from '../data/seo'

function setMeta(name, content, attr = 'name') {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setJsonLd(data) {
  let el = document.head.querySelector('script#ld-json')
  if (!data) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.id = 'ld-json'
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/**
 * Per-route SEO manager. Content comes from src/data/seo.js (shared with the
 * build-time prerender script). Pass notFound for the 404 page (adds noindex).
 */
export default function Seo({ path = '/', notFound = false }) {
  useEffect(() => {
    const page = notFound ? NOT_FOUND : PAGES[path]
    if (!page) return
    const canonical = canonicalFor(path)
    const image = absolute(SITE.image)

    document.title = page.title
    setMeta('description', page.description)
    setMeta('robots', notFound ? 'noindex, follow' : 'index, follow, max-image-preview:large')

    if (notFound) {
      document.head.querySelector('link[rel="canonical"]')?.remove()
    } else {
      setLink('canonical', canonical)
    }

    setMeta('og:title', page.title, 'property')
    setMeta('og:description', page.description, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:url', canonical, 'property')
    setMeta('og:site_name', SITE.name, 'property')
    setMeta('og:image', image, 'property')
    setMeta('og:image:width', '1200', 'property')
    setMeta('og:image:height', '630', 'property')
    setMeta('og:image:alt', `${SITE.name} — ${SITE.tagline}`, 'property')
    setMeta('og:locale', 'en_US', 'property')

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', page.title)
    setMeta('twitter:description', page.description)
    setMeta('twitter:image', image)

    setJsonLd(notFound ? null : jsonLd(path))
  }, [path, notFound])

  return null
}
