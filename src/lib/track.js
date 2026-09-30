const ADS_ID = 'AW-18481901915'
const CONVERSION_LABEL = 'rtlfCOPWw4sdENvi7exE' // paste your Google Ads conversion label here

export function trackLead(source) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  try {
    window.gtag('event', 'generate_lead', { method: source })
    if (CONVERSION_LABEL) {
      window.gtag('event', 'conversion', { send_to: `${ADS_ID}/${CONVERSION_LABEL}` })
    }
  } catch {
    /* never let tracking break the form */
  }
}
