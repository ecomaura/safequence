import { useState } from 'react'
import { serviceOptions } from '../data/services'

const fieldCls =
  'w-full bg-[var(--color-bg-2)] border border-[var(--color-line-1)] px-4 py-3 text-sm text-white placeholder:text-[var(--color-ink-3)] focus:border-[var(--color-accent)] transition-colors outline-none'

const labelCls = 'block text-xs text-[var(--color-ink-2)] mb-2'

export default function ContactForm({ defaultService = '' }) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: defaultService,
    url: '',
    message: '',
  })

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // Wire this up to your lead-intake endpoint or CRM webhook.
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="border border-[var(--color-line-0)] bg-[var(--color-bg-1)] p-10 text-center">
        <div className="mono-label mb-3">Request received</div>
        <p className="text-lg text-white font-[var(--font-display)]">
          Thanks — a member of our team will be in touch shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="border border-[var(--color-line-0)] bg-[var(--color-bg-1)] p-6 md:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls} htmlFor="name">Name</label>
          <input id="name" required className={fieldCls} value={form.name} onChange={update('name')} placeholder="Jordan Reyes" />
        </div>
        <div>
          <label className={labelCls} htmlFor="email">Work email</label>
          <input id="email" type="email" required className={fieldCls} value={form.email} onChange={update('email')} placeholder="jordan@company.com" />
        </div>
        <div>
          <label className={labelCls} htmlFor="company">Company</label>
          <input id="company" required className={fieldCls} value={form.company} onChange={update('company')} placeholder="Company name" />
        </div>
        <div>
          <label className={labelCls} htmlFor="phone">Phone</label>
          <input id="phone" className={fieldCls} value={form.phone} onChange={update('phone')} placeholder="+1 (___) ___-____" />
        </div>
        <div>
          <label className={labelCls} htmlFor="service">Service required</label>
          <select id="service" required className={fieldCls} value={form.service} onChange={update('service')}>
            <option value="" disabled>Select a service</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="url">Website / application URL</label>
          <input id="url" className={fieldCls} value={form.url} onChange={update('url')} placeholder="https://" />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="message">Message</label>
          <textarea id="message" rows={4} className={fieldCls} value={form.message} onChange={update('message')} placeholder="Tell us what you'd like assessed." />
        </div>
      </div>

      <button
        type="submit"
        className="mt-7 w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium bg-[var(--color-accent)] text-[#050505] hover:bg-[var(--color-accent-bright)] transition-colors"
      >
        Request Security Assessment
      </button>

      <p className="mt-5 text-xs text-[var(--color-ink-3)] leading-relaxed">
        Your information is used only to respond to your security assessment request.
      </p>
    </form>
  )
}
