import { useState, useRef, useEffect } from 'react'
import { serviceOptions } from '../data/services'

const FALLBACK_EMAIL = 'contact@safequence.com'

const steps = [
  {
    key: 'name',
    ask: () => "Hi! I'm the Safequence assistant. I can pass your inquiry to our team. What's your name?",
    validate: (v) => v.length >= 2,
    error: 'Could you tell me your name?',
  },
  {
    key: 'email',
    ask: (d) => `Nice to meet you, ${d.name}. What's your work email?`,
    validate: (v) => /^\S+@\S+\.\S+$/.test(v),
    error: "That doesn't look like a valid email. Try again?",
  },
  {
    key: 'company',
    ask: () => 'Which company are you with?',
    validate: (v) => v.length >= 2,
    error: 'Please enter your company name.',
  },
  {
    key: 'service',
    ask: () => 'Which service are you interested in?',
    options: serviceOptions,
  },
  {
    key: 'message',
    ask: () => 'Briefly describe what you need assessed (application or environment, scope, timeline).',
    validate: (v) => v.length >= 5,
    error: 'A short description helps us prepare. Could you add a little more?',
  },
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([{ from: 'bot', text: steps[0].ask({}) }])
  const [step, setStep] = useState(0)
  const [data, setData] = useState({})
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [failed, setFailed] = useState(false)
  const listRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [msgs, open, failed])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const bot = (text) => setMsgs((m) => [...m, { from: 'bot', text }])

  const submit = async (d) => {
    setBusy(true)
    setFailed(false)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...d, source: 'chatbot' }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || !json.ok) throw new Error()
      bot("Thanks! Your inquiry has been sent. A member of our team will reply to your email shortly.")
      setDone(true)
    } catch {
      bot(`Sorry, that didn't go through. You can try again, or email us at ${FALLBACK_EMAIL}.`)
      setFailed(true)
    }
    setBusy(false)
  }

  const send = (value) => {
    const v = value.trim()
    if (!v || busy || done || failed) return
    const s = steps[step]
    setMsgs((m) => [...m, { from: 'user', text: v }])
    setInput('')
    if (s.validate && !s.validate(v)) {
      setTimeout(() => bot(s.error), 250)
      return
    }
    const d = { ...data, [s.key]: v }
    setData(d)
    if (step === steps.length - 1) {
      submit(d)
      return
    }
    setStep(step + 1)
    setTimeout(() => bot(steps[step + 1].ask(d)), 300)
    inputRef.current?.focus()
  }

  const cur = steps[step]
  const showOptions = !done && !failed && !busy && cur.options && msgs[msgs.length - 1].from === 'bot'

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end">
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Safequence"
          className="mb-3 w-[calc(100vw-2.5rem)] sm:w-[360px] h-[min(480px,calc(100dvh-7rem))] flex flex-col border border-[var(--color-line-1)] bg-[var(--color-bg-1)] shadow-2xl"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-line-0)]">
            <span className="mono-label">Safequence Assistant</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-[var(--color-ink-2)] hover:text-white transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 2l10 10M12 2L2 12" />
              </svg>
            </button>
          </div>

          <div ref={listRef} aria-live="polite" className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === 'user' ? 'text-right' : ''}>
                <span
                  className={`inline-block px-3 py-2 max-w-[85%] text-left break-words ${
                    m.from === 'user'
                      ? 'bg-[var(--color-accent)] text-[#050505]'
                      : 'bg-[var(--color-bg-3)] text-[var(--color-ink-1)]'
                  }`}
                >
                  {m.text}
                </span>
              </div>
            ))}

            {busy && <div className="text-xs text-[var(--color-ink-3)]">Sending…</div>}

            {showOptions && (
              <div className="flex flex-wrap gap-2">
                {cur.options.map((o) => (
                  <button
                    key={o}
                    onClick={() => send(o)}
                    className="px-3 py-1.5 text-xs border border-[var(--color-line-1)] text-[var(--color-ink-1)] hover:border-[var(--color-accent)] transition-colors"
                  >
                    {o}
                  </button>
                ))}
              </div>
            )}

            {failed && (
              <button
                onClick={() => submit(data)}
                className="px-3 py-1.5 text-xs bg-[var(--color-accent)] text-[#050505] hover:bg-[var(--color-accent-bright)] transition-colors"
              >
                Try again
              </button>
            )}
          </div>

          {!done && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex border-t border-[var(--color-line-0)]"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={busy || failed}
                maxLength={2000}
                placeholder={cur.options ? 'Pick an option above or type…' : 'Type your answer…'}
                aria-label="Your answer"
                className="flex-1 min-w-0 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-[var(--color-ink-3)]"
              />
              <button
                type="submit"
                disabled={busy || failed}
                className="px-4 text-sm font-medium bg-[var(--color-accent)] text-[#050505] hover:bg-[var(--color-accent-bright)] transition-colors disabled:opacity-60"
              >
                Send
              </button>
            </form>
          )}
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center bg-[var(--color-accent)] text-[#050505] hover:bg-[var(--color-accent-bright)] transition-colors shadow-xl"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M2 2l10 10M12 2L2 12" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
            <path d="M4 5h16v11H9l-5 4V5z" />
          </svg>
        )}
      </button>
    </div>
  )
}
