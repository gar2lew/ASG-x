import { Link } from 'react-router-dom'
import { outcomeMessages, type QuizOutcome } from '@/lib/scoring'

function readStoredOutcome(): QuizOutcome {
  if (typeof window === 'undefined') return 'review'

  const stored = sessionStorage.getItem('asgXQuizOutcome')
  if (stored === 'explore' || stored === 'review' || stored === 'not_now') {
    return stored
  }

  return 'review'
}

function readSubmissionId(): string | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = sessionStorage.getItem('asgXLeadPayload')
    if (!raw) return null
    const payload = JSON.parse(raw)
    if (payload && typeof payload.submissionId === 'string') {
      return payload.submissionId
    }
    return null
  } catch {
    return null
  }
}

export default function ThankYouPage() {
  const outcome = readStoredOutcome()
  const message = outcomeMessages[outcome]
  const submissionId = readSubmissionId()

  return (
    <div className="bg-navy-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-lg border border-navy-200 bg-white p-6 text-center shadow-lg shadow-navy-900/5 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-brass-600">
            Enquiry received
          </p>
          <h1 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">
            Thank you
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-navy-700">
            {message}
          </p>

          <div className="mx-auto mt-8 max-w-xl rounded-lg border border-brass-200 bg-brass-50 p-5 text-left">
            <h2 className="text-xl font-bold text-navy-900">Next steps</h2>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-navy-700">
              <li>1. Book a no-obligation discovery call when you are ready.</li>
              <li>2. The call is for general information and process questions only.</li>
              <li>3. Licensed professionals can assist where advice, SMSF setup, lending, or referral matters are required.</li>
            </ol>
            <button
              type="button"
              aria-label="Book a no-obligation discovery call — placeholder"
              className="mt-5 w-full rounded-lg bg-brass-500 px-5 py-3 font-bold text-navy-950 transition hover:bg-brass-400 sm:w-auto"
            >
              Booking link placeholder
            </button>
          </div>

          {/* Prototype status notification */}
          <div className="mt-8 rounded-lg border border-navy-200 bg-navy-50 p-4 text-left text-sm leading-6 text-navy-700">
            <p className="font-semibold mb-2">Prototype notice</p>
            <p>
              Your enquiry details have been captured in this prototype. The next
              production phase will connect this flow to the approved CRM and
              follow-up process. No external systems (CRM, SMS, email, or booking)
              are connected yet.
            </p>
            {submissionId && (
              <p className="mt-2 text-xs text-navy-500 font-mono">
                Local reference: {submissionId}
              </p>
            )}
          </div>

          <div className="mt-8 rounded-lg border border-navy-200 bg-navy-50 p-4 text-left text-sm leading-6 text-navy-700">
            ASG‑x provides general information and education services only. We do
            not provide personal financial advice. SMSF property pathways involve
            risks and costs, and may not be suitable for everyone. Speak with
            licensed professionals before making decisions about your
            superannuation.
          </div>

          <Link
            to="/"
            className="mt-8 inline-flex font-semibold text-brass-600 underline-offset-4 hover:underline"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  )
}
