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
    <div className="bg-obsidian px-4 py-16 text-white md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="glass-panel p-6 sm:p-10 lg:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brass-gold">
              Enquiry captured
            </p>
            <h1 className="mt-4 font-display text-4xl font-light text-white sm:text-5xl">
              Thank you
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">
              Your enquiry has been captured in this demo. {message}
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="premium-card brass-corners">
              <h2 className="font-display text-2xl font-light text-white">
                Demo summary
              </h2>
              <dl className="mt-6 space-y-4 text-sm">
                <SummaryRow label="Name" value={name ?? 'Not provided'} />
                <SummaryRow label="Outcome" value={message} />
                <SummaryRow
                  label="Reference ID"
                  value={submissionId ?? 'Not available'}
                />
                <SummaryRow label="Booking intent" value={bookingStatus} />
              </dl>
            </section>

            <section className="rounded-2xl border border-brass-gold/25 bg-card-surface p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brass-gold">
                Next step
              </p>
              <h2 className="mt-3 font-display text-2xl font-light text-white">
                What would happen next
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-6 text-white/70">
                <p>
                  In production, the Amplify X-Change follow-up process would
                  continue from here.
                </p>
                <p>
                  A licensed or appropriately qualified professional may be
                  required before any personal advice or next steps are
                  considered.
                </p>
                <p className="rounded-lg border border-brass-gold/20 bg-obsidian/60 p-4 text-xs leading-5 text-white/55">
                  Prototype-only: no CRM, email, SMS, calendar, Zoom, Calendly,
                  or production Firebase integration is connected.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/book-discovery"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brass-gold px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-obsidian transition hover:bg-brass-gold-light"
              aria-label="Book a discovery call"
            >
              <CalendarCheck className="h-5 w-5" />
              Book a discovery call
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-brass-gold/50 px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-brass-gold/10"
            >
              <Home className="h-5 w-5" />
              Back to home
            </Link>
          </div>

          <div className="mt-10 rounded-lg border border-white/10 bg-obsidian/55 p-4 text-left text-xs leading-6 text-white/55">
            Amplify X-Change provides general information and education
            services only. We do not provide personal financial advice. SMSF
            property pathways involve risks and costs, and may not be suitable
            for everyone. Speak with licensed professionals before making
            decisions about your superannuation.
          </div>
        </div>
      </div>
    </div>
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
