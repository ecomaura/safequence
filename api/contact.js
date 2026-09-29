// Vercel serverless function: receives the contact form / chatbot inquiry
// and emails it to you via Resend. Runs on the server, so keys stay secret.

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

const clean = (v, max) => String(v ?? '').trim().slice(0, max)
const oneLine = (v, max) => clean(v, max).replace(/[\r\n]+/g, ' ')

const safeParse = (s) => {
  try { return JSON.parse(s) } catch { return {} }
}

async function sendEmail(payload) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`)
}

async function saveToSheet(lead) {
  const r = await fetch(process.env.SHEETS_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: process.env.SHEETS_TOKEN, ...lead }),
    signal: AbortSignal.timeout(20000),
  })
  const text = await r.text()
  let j = {}
  try { j = JSON.parse(text) } catch { /* non-JSON response */ }
  if (!r.ok || !j.ok) throw new Error(`Sheet save failed: ${j.error || r.status}`)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const b = typeof req.body === 'string' ? safeParse(req.body) : req.body || {}

  // Honeypot: real users never fill this hidden field, bots do.
  if (b.hp_field) return res.status(200).json({ ok: true })

  const name = oneLine(b.name, 100)
  const email = oneLine(b.email, 200)
  const company = oneLine(b.company, 150)
  const phone = oneLine(b.phone, 50)
  const service = oneLine(b.service, 100)
  const url = oneLine(b.url, 300)
  const message = clean(b.message, 4000)
  const source = oneLine(b.source || 'contact-form', 30)

  if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Please provide a valid name and email.' })
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, SHEETS_WEBHOOK_URL, SHEETS_TOKEN } = process.env
  const emailConfigured = !!(RESEND_API_KEY && CONTACT_TO_EMAIL && CONTACT_FROM_EMAIL)
  const sheetConfigured = !!(SHEETS_WEBHOOK_URL && SHEETS_TOKEN)

  if (!emailConfigured && !sheetConfigured) {
    console.error('Nothing configured: set the Resend and/or Google Sheet env vars')
    return res.status(500).json({ ok: false, error: 'Server not configured.' })
  }

  // 1) Save the lead first (the record), 2) then email the alert.
  // The visitor only sees an error if BOTH fail, so a lead is never silently lost.
  let sheetOk = false
  let sheetFailed = false
  if (sheetConfigured) {
    try {
      await saveToSheet({ name, email, company, phone, service, url, message, source })
      sheetOk = true
    } catch (err) {
      sheetFailed = true
      console.error(err)
    }
  }

  const rows = [
    ['Name', name], ['Email', email], ['Company', company], ['Phone', phone],
    ['Service', service], ['URL', url], ['Source', source],
  ].filter(([, v]) => v)

  const warning = sheetFailed
    ? '<p style="color:#b00020;font-family:Arial,sans-serif"><b>Warning:</b> this lead could NOT be saved to the Google Sheet. Add it manually and check the Vercel logs.</p>'
    : ''
  const html = `
    ${warning}
    <h2 style="margin:0 0 12px">New inquiry from the website</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
      ${rows.map(([k, v]) => `<tr><td style="color:#666"><b>${k}</b></td><td>${esc(v)}</td></tr>`).join('')}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap"><b>Message</b><br>${esc(message) || '(none)'}</p>`
  const text = [
    ...(sheetFailed ? ['WARNING: not saved to Google Sheet. Add manually.', ''] : []),
    ...rows.map(([k, v]) => `${k}: ${v}`), '', 'Message:', message || '(none)',
  ].join('\n')

  let emailOk = false
  if (emailConfigured) {
    try {
      await sendEmail({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `New inquiry: ${service || 'General'} — ${company || name}`,
        html,
        text,
      })
      emailOk = true
    } catch (err) {
      console.error(err)
    }
  }

  if (!sheetOk && !emailOk) {
    return res.status(502).json({ ok: false, error: 'Could not send your message.' })
  }

  // Optional auto-reply to the visitor (needs a verified sending domain in Resend).
  if (process.env.SEND_AUTOREPLY === 'true') {
    try {
      await sendEmail({
        from: CONTACT_FROM_EMAIL,
        to: [email],
        subject: 'We received your inquiry — Safequence',
        html: `<p style="font-family:Arial,sans-serif;font-size:14px">Hi ${esc(name)},<br><br>Thanks for reaching out. A member of our team will get back to you shortly.<br><br>— Safequence</p>`,
        text: `Hi ${name},\n\nThanks for reaching out. A member of our team will get back to you shortly.\n\n— Safequence`,
      })
    } catch (err) {
      console.error('Auto-reply failed', err)
    }
  }

  return res.status(200).json({ ok: true })
}
