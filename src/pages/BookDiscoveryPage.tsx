import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Home, ArrowLeft } from 'lucide-react'
import { outcomeMessages, type QuizOutcome } from '@/lib/scoring'

interface BookingIntent {
  name: string
  email: string
  mobile: string
  preferredDay: string
  preferredTimeWindow: string
  notes: string
  capturedAt: string
}

interface DemoSummary {
  name: string | null
  outcomeLabel: string | null
  referenceId: string | null
  bookingIntentStatus: string
}

const timeWindows = [
  'Morning',
  'Midday',
  'Afternoon',
  'Early evening',
  'Flexible',
]

function safeParse<T>(key: string): T | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = sessionStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function getOutcomeLabel(outcome: unknown): string | null {
  if (outcome !== 'explore' && outcome !== 'review' && outcome !== 'not_now') {
    return null
  }

  return outcomeMessages[outcome as QuizOutcome]
}

function getDemoSummary(): DemoSummary {
  const submission = safeParse<{
    firstName?: string
    lastName?: string
  }>('asgXQuizSubmission')
  const payload = safeParse<{ submissionId?: string }>('asgXLeadPayload')
  const booking = safeParse<BookingIntent>('asgXBookingIntent')
  const outcome = typeof window === 'undefined'
    ? null
    : sessionStorage.getItem('asgXQuizOutcome')

  const name = [submission?.firstName, submission?.lastName]
    .filter(Boolean)
    .join(' ')
    .trim()

  return {
    name: name || booking?.name || null,
    outcomeLabel: getOutcomeLabel(outcome),
    referenceId: payload?.submissionId ?? null,
    bookingIntentStatus: booking
      ? 'Discovery call preference captured in this demo'
      : 'Not captured yet',
  }
}

export default function BookDiscoveryPage() {
  const storedBooking = useMemo(
    () => safeParse<BookingIntent>('asgXBookingIntent'),
    []
  )
  const [form, setForm] = useState<BookingIntent>({
    name: storedBooking?.name ?? '',
    email: storedBooking?.email ?? '',
    mobile: storedBooking?.mobile ?? '',
    preferredDay: storedBooking?.preferredDay ?? '',
    preferredTimeWindow: storedBooking?.preferredTimeWindow ?? '',
    notes: storedBooking?.notes ?? '',
    capturedAt: storedBooking?.capturedAt ?? '',
  })
  const [saved, setSaved] = useState(Boolean(storedBooking))
  const [summary, setSummary] = useState<DemoSummary>(getDemoSummary)

  function updateField(field: keyof BookingIntent, value: string) {
    setSaved(false)
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const bookingIntent = {
      ...form,
      capturedAt: new Date().toISOString(),
    }

    sessionStorage.setItem('asgXBookingIntent', JSON.stringify(bookingIntent))
    setForm(bookingIntent)
    setSaved(true)
    setSummary(getDemoSummary())
  }

  return (
    <section className="bg-obsidian px-4 py-16 text-white md:py-24">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="glass-panel p-6 sm:p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brass-gold">
            Book a discovery conversation
          </p>
          <h1 className="mt-4 font-display text-4xl font-light text-white sm:text-5xl">
            Choose a preferred time for a discovery call
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/65">
            This demo captures your preferred call details locally only. No
            calendar event, email, SMS, CRM record, or external booking is
            created.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField label="Name" value={form.name} onChange={(value) => updateField('name', value)} required />
              <TextField label="Email" value={form.email} type="email" onChange={(value) => updateField('email', value)} required />
            </div>
            <TextField label="Mobile" value={form.mobile} type="tel" onChange={(value) => updateField('mobile', value)} required />
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField label="Preferred day" value={form.preferredDay} placeholder="e.g. Tuesday" onChange={(value) => updateField('preferredDay', value)} required />
              <label className="block">
                <span className="block text-sm font-semibold text-white/80">
                  Preferred time window
                </span>
                <select
                  value={form.preferredTimeWindow}
                  onChange={(event) =>
                    updateField('preferredTimeWindow', event.target.value)
                  }
                  required
                  className="mt-2 w-full rounded-lg border border-white/10 bg-obsidian/70 px-4 py-3 text-white outline-none transition focus:border-brass-gold focus:ring-2 focus:ring-brass-gold/20"
                >
                  <option value="">Select a window</option>
                  {timeWindows.map((window) => (
                    <option key={window} value={window}>
                      {window}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className="block">
              <span className="block text-sm font-semibold text-white/80">
                Notes
              </span>
              <textarea
                value={form.notes}
                onChange={(event) => updateField('notes', event.target.value)}
                rows={4}
                className="mt-2 w-full rounded-lg border border-white/10 bg-obsidian/70 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-brass-gold focus:ring-2 focus:ring-brass-gold/20"
                placeholder="Optional context for the discovery conversation"
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="rounded-lg bg-brass-gold px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-obsidian transition hover:bg-brass-gold-light"
              >
                Save preferred time
              </button>
              <Link
                to="/thank-you"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-brass-gold/50 px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-brass-gold/10"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to thank you
              </Link>
            </div>
          </form>

          {saved && (
            <div className="mt-6 flex gap-3 rounded-lg border border-brass-gold/30 bg-brass-gold/10 p-4 text-sm leading-6 text-white/75">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brass-gold" />
              <p>
                Your preferred discovery call details have been captured in this
                demo. In production, this step will connect to the approved
                booking and follow-up process.
              </p>
            </div>
          )}
        </div>

        <aside className="rounded-2xl border border-brass-gold/25 bg-card-surface p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)] lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brass-gold">
            Prototype summary
          </p>
          <h2 className="mt-3 font-display text-2xl font-light text-white">
            Demo summary
          </h2>
          <dl className="mt-6 space-y-4 text-sm">
            <SummaryRow label="Name" value={summary.name ?? 'Not provided'} />
            <SummaryRow label="Outcome" value={summary.outcomeLabel ?? 'Not available'} />
            <SummaryRow label="Reference ID" value={summary.referenceId ?? 'Not available'} />
            <SummaryRow label="Booking intent" value={summary.bookingIntentStatus} />
          </dl>
          <p className="mt-6 rounded-lg border border-brass-gold/20 bg-obsidian/60 p-4 text-sm leading-6 text-white/65">
            In production, the Amplify X-Change follow-up process would
            continue from here. A licensed or appropriately qualified
            professional may be required before any personal advice or next
            steps are considered.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-5 py-3 text-sm font-semibold text-white/75 transition hover:border-brass-gold/50 hover:bg-brass-gold/10"
          >
            <Home className="h-4 w-4" />
            Back to home
          </Link>
        </aside>
      </div>
    </section>
  )
}

function TextField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-white/80">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-white/10 bg-obsidian/70 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-brass-gold focus:ring-2 focus:ring-brass-gold/20"
      />
    </label>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-brass-gold/85">
        {label}
      </dt>
      <dd className="mt-2 break-words leading-6 text-white/80">{value}</dd>
    </div>
  )
}
