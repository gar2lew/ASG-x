import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
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
    <section className="bg-navy-50 px-4 py-12">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-navy-200 bg-white p-6 shadow-lg shadow-navy-900/5 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-brass-600">
            Discovery conversation
          </p>
          <h1 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">
            Choose a preferred time for a discovery call
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-navy-700">
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
                <span className="block text-sm font-semibold text-navy-800">
                  Preferred time window
                </span>
                <select
                  value={form.preferredTimeWindow}
                  onChange={(event) =>
                    updateField('preferredTimeWindow', event.target.value)
                  }
                  required
                  className="mt-2 w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-navy-900 outline-none transition focus:border-brass-500 focus:ring-2 focus:ring-brass-200"
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
              <span className="block text-sm font-semibold text-navy-800">
                Notes
              </span>
              <textarea
                value={form.notes}
                onChange={(event) => updateField('notes', event.target.value)}
                rows={4}
                className="mt-2 w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-navy-900 outline-none transition focus:border-brass-500 focus:ring-2 focus:ring-brass-200"
                placeholder="Optional context for the discovery conversation"
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="rounded-lg bg-brass-500 px-6 py-3 font-bold text-navy-950 transition hover:bg-brass-400"
              >
                Save preferred time
              </button>
              <Link
                to="/"
                className="inline-flex justify-center rounded-lg border border-navy-200 px-6 py-3 font-semibold text-navy-700 transition hover:bg-navy-50"
              >
                Back to home
              </Link>
            </div>
          </form>

          {saved && (
            <div className="mt-6 flex gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-900">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <p>
                Your preferred discovery call details have been captured in this
                demo. In production, this step will connect to the ASG-x
                booking and follow-up process.
              </p>
            </div>
          )}
        </div>

        <aside className="rounded-lg border border-navy-200 bg-white p-6 shadow-lg shadow-navy-900/5">
          <h2 className="text-xl font-bold text-navy-900">Demo summary</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <SummaryRow label="Name" value={summary.name ?? 'Not provided'} />
            <SummaryRow label="Outcome" value={summary.outcomeLabel ?? 'Not available'} />
            <SummaryRow label="Reference ID" value={summary.referenceId ?? 'Not available'} />
            <SummaryRow label="Booking intent" value={summary.bookingIntentStatus} />
          </dl>
          <p className="mt-6 rounded-lg border border-brass-200 bg-brass-50 p-4 text-sm leading-6 text-navy-700">
            In production, the ASG-x follow-up process would continue from
            here. A licensed or appropriately qualified professional may be
            required before any personal advice or next steps are considered.
          </p>
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
      <span className="block text-sm font-semibold text-navy-800">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-navy-900 outline-none transition focus:border-brass-500 focus:ring-2 focus:ring-brass-200"
      />
    </label>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold text-navy-500">{label}</dt>
      <dd className="mt-1 break-words text-navy-900">{value}</dd>
    </div>
  )
}
