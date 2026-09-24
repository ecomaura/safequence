import { useEffect } from 'react'

const SITE_NAME = 'Safequence'
const SITE_URL = 'https://www.safequence.com'

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

/**
 * Lightweight per-page SEO manager. No external dependency — sets
 * document.title, meta description, canonical URL and OpenGraph tags
 * on mount for each route.
 */
export default function Seo({ title, description, path = '/' }) {
  useEffect(() => {
    const fullTitle = title
    const canonical = `${SITE_URL}${path === '/' ? '' : path}`

    document.title = fullTitle
    setMeta('description', description)
    setLink('canonical', canonical)

    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:url', canonical, 'property')
    setMeta('og:site_name', SITE_NAME, 'property')

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
  }, [title, description, path])

  return null
}
