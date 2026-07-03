import { Link } from 'react-router-dom'
import { CalendarCheck, Home } from 'lucide-react'
import { outcomeMessages, type QuizOutcome } from '@/lib/scoring'

interface QuizSubmissionSummary {
  firstName?: string
  lastName?: string
}

interface BookingIntentSummary {
  capturedAt?: string
}

function readStoredOutcome(): QuizOutcome {
  if (typeof window === 'undefined') return 'review'

  const stored = sessionStorage.getItem('asgXQuizOutcome')
  if (stored === 'explore' || stored === 'review' || stored === 'not_now') {
    return stored
  }

  return 'review'
}

function readJson<T>(key: string): T | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = sessionStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function readSubmissionId(): string | null {
  const payload = readJson<{ submissionId?: string }>('asgXLeadPayload')
  return payload?.submissionId ?? null
}

function readName(): string | null {
  const submission = readJson<QuizSubmissionSummary>('asgXQuizSubmission')
  const name = [submission?.firstName, submission?.lastName]
    .filter(Boolean)
    .join(' ')
    .trim()

  return name || null
}

function readBookingStatus(): string {
  const booking = readJson<BookingIntentSummary>('asgXBookingIntent')
  return booking?.capturedAt
    ? 'Discovery call preference captured in this demo'
    : 'Not captured yet'
}

export default function ThankYouPage() {
  const outcome = readStoredOutcome()
  const message = outcomeMessages[outcome]
  const submissionId = readSubmissionId()
  const name = readName()
  const bookingStatus = readBookingStatus()

  return (
    <div className="bg-navy-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-lg border border-navy-200 bg-white p-6 shadow-lg shadow-navy-900/5 sm:p-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brass-600">
              Enquiry captured
            </p>
            <h1 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">
              Thank you
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-navy-700">
              Your enquiry has been captured in this demo. {message}
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-lg border border-navy-200 bg-navy-50 p-5">
              <h2 className="text-xl font-bold text-navy-900">Demo summary</h2>
              <dl className="mt-5 space-y-4 text-sm">
                <SummaryRow label="Name" value={name ?? 'Not provided'} />
                <SummaryRow label="Outcome" value={message} />
                <SummaryRow
                  label="Reference ID"
                  value={submissionId ?? 'Not available'}
                />
                <SummaryRow label="Booking intent" value={bookingStatus} />
              </dl>
            </section>

            <section className="rounded-lg border border-brass-200 bg-brass-50 p-5">
              <h2 className="text-xl font-bold text-navy-900">
                What would happen next
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-6 text-navy-700">
                <p>
                  In production, the ASG-x follow-up process would continue
                  from here.
                </p>
                <p>
                  A licensed or appropriately qualified professional may be
                  required before any personal advice or next steps are
                  considered.
                </p>
                <p className="rounded-lg border border-brass-200 bg-white/70 p-3 text-xs">
                  Prototype-only: no CRM, email, SMS, calendar, Zoom, Calendly,
                  or production Firebase integration is connected.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/book-discovery"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brass-500 px-6 py-3 font-bold text-navy-950 transition hover:bg-brass-400"
              aria-label="Book a discovery call"
            >
              <CalendarCheck className="h-5 w-5" />
              Book a discovery call
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-navy-200 px-6 py-3 font-semibold text-navy-700 transition hover:bg-navy-50"
            >
              <Home className="h-5 w-5" />
              Back to home
            </Link>
          </div>

          <div className="mt-8 rounded-lg border border-navy-200 bg-navy-50 p-4 text-left text-sm leading-6 text-navy-700">
            ASG-x provides general information and education services only. We
            do not provide personal financial advice. SMSF property pathways
            involve risks and costs, and may not be suitable for everyone.
            Speak with licensed professionals before making decisions about
            your superannuation.
          </div>
        </div>
      </div>
    </div>
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
