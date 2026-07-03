import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Copy, Download, Check } from 'lucide-react'
import { isDebugEnabled } from '@/lib/environment'

interface DebugData {
  asgXLeadPayload: unknown
  asgXLeadPayloadValidation: unknown
  asgXFirestoreResult: unknown
  asgXUtmData: unknown
  asgXQuizOutcome: unknown
  asgXQuizSubmission: unknown
  asgXBookingIntent: unknown
}

function readSessionStorage(): DebugData {
  const safeParse = (key: string): unknown => {
    try {
      const raw = sessionStorage.getItem(key)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  }

  return {
    asgXLeadPayload: safeParse('asgXLeadPayload'),
    asgXLeadPayloadValidation: safeParse('asgXLeadPayloadValidation'),
    asgXFirestoreResult: safeParse('asgXFirestoreResult'),
    asgXUtmData: safeParse('asgXUtmData'),
    asgXQuizOutcome: sessionStorage.getItem('asgXQuizOutcome') ?? null,
    asgXQuizSubmission: safeParse('asgXQuizSubmission'),
    asgXBookingIntent: safeParse('asgXBookingIntent'),
  }
}

const ASGX_KEYS = [
  'asgXLeadPayload',
  'asgXLeadPayloadValidation',
  'asgXFirestoreResult',
  'asgXUtmData',
  'asgXQuizOutcome',
  'asgXQuizSubmission',
  'asgXBookingIntent',
]

export default function DebugPage() {
  if (!isDebugEnabled()) {
    return (
      <div className="bg-navy-50 px-4 py-12">
        <div className="mx-auto max-w-2xl rounded-lg border border-navy-200 bg-white p-6 text-center shadow-lg shadow-navy-900/5 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-brass-600">
            Prototype controls
          </p>
          <h1 className="mt-3 text-3xl font-bold text-navy-900">
            Debug view is disabled
          </h1>
          <p className="mt-4 text-navy-700">
            Debug view is disabled for this environment.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg bg-brass-500 px-6 py-3 font-bold text-navy-950 transition hover:bg-brass-400"
          >
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  return <DebugPanel />
}

function DebugPanel() {
  const [data, setData] = useState<DebugData>(readSessionStorage)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  function refresh() {
    setData(readSessionStorage())
  }

  function clearAll() {
    ASGX_KEYS.forEach((key) => sessionStorage.removeItem(key))
    setData({
      asgXLeadPayload: null,
      asgXLeadPayloadValidation: null,
      asgXFirestoreResult: null,
      asgXUtmData: null,
      asgXQuizOutcome: null,
      asgXQuizSubmission: null,
      asgXBookingIntent: null,
    })
  }

  function copyToClipboard(label: string, value: unknown) {
    const text = typeof value === 'string' ? value : JSON.stringify(value, null, 2)
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(label)
      setTimeout(() => setCopiedKey(null), 2000)
    })
  }

  function downloadJson(label: string, value: unknown) {
    const text = typeof value === 'string' ? value : JSON.stringify(value, null, 2)
    const blob = new Blob([text], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${label}_${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const hasData = Object.values(data).some((v) => v !== null)

  return (
    <div className="bg-obsidian min-h-screen text-white">
      <div className="bg-amber-600 text-black px-4 py-3 text-center text-sm font-bold uppercase tracking-wide">
        Prototype debug view only. Do not expose this page publicly in production.
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-light text-white">
              ASG‑x Debug Panel
            </h1>
            <p className="text-white/50 text-sm mt-1">
              Local prototype inspection only
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={refresh}
              className="px-4 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/10 transition"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="px-4 py-2 text-sm bg-red-800/40 border border-red-500/40 text-red-200 rounded-lg hover:bg-red-800/60 transition flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear all ASG‑x data
            </button>
          </div>
        </div>

        {!hasData && (
          <div className="rounded-lg border border-white/10 bg-card-surface p-10 text-center">
            <p className="text-white/50 text-lg">
              No ASG‑x session data found. Complete the quiz to generate payloads.
            </p>
            <Link
              to="/quiz"
              className="mt-4 inline-block text-brass-gold hover:text-brass-gold-light underline font-semibold"
            >
              Go to quiz &rarr;
            </Link>
          </div>
        )}

        <div className="space-y-6">
          {renderSection('asgXLeadPayload', data.asgXLeadPayload, 'Future-ready lead payload for CRM/Firebase', copiedKey, copyToClipboard, downloadJson)}
          {renderSection('asgXLeadPayloadValidation', data.asgXLeadPayloadValidation, 'Pre-submission validation result', copiedKey, copyToClipboard, downloadJson)}
          {renderSection('asgXFirestoreResult', data.asgXFirestoreResult, 'Firestore emulator write result (firebase mode only)', copiedKey, copyToClipboard, downloadJson)}
          {renderSection('asgXUtmData', data.asgXUtmData, 'UTM campaign tracking parameters', copiedKey, copyToClipboard, downloadJson)}
          {renderSection('asgXQuizOutcome', data.asgXQuizOutcome, 'Quiz outcome string', copiedKey, copyToClipboard, downloadJson)}
          {renderSection('asgXQuizSubmission', data.asgXQuizSubmission, 'Raw quiz form submission data', copiedKey, copyToClipboard, downloadJson)}
          {renderSection('asgXBookingIntent', data.asgXBookingIntent, 'Demo-only discovery call preference', copiedKey, copyToClipboard, downloadJson)}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-white/30 text-xs text-center">
          This panel exists for local development and QA only. Never expose in production.
          Remove or gate behind authentication before deploying.
        </div>
      </div>
    </div>
  )
}

function renderSection(
  label: string,
  value: unknown,
  description: string,
  copiedKey: string | null,
  onCopy: (label: string, value: unknown) => void,
  onDownload: (label: string, value: unknown) => void
) {
  if (value === null) return null

  return (
    <section className="rounded-lg border border-white/10 bg-card-surface overflow-hidden">
      <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-mono text-sm font-semibold text-brass-gold">
            {label}
          </h2>
          <p className="text-white/40 text-xs mt-0.5">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onCopy(label, value)}
            className="px-3 py-1.5 text-xs border border-white/20 rounded-md hover:bg-white/10 transition flex items-center gap-1.5"
            aria-label={`Copy ${label} JSON to clipboard`}
          >
            {copiedKey === label ? (
              <Check className="h-3.5 w-3.5 text-green-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {copiedKey === label ? 'Copied' : 'Copy'}
          </button>
          <button
            type="button"
            onClick={() => onDownload(label, value)}
            className="px-3 py-1.5 text-xs border border-white/20 rounded-md hover:bg-white/10 transition flex items-center gap-1.5"
            aria-label={`Download ${label} as JSON file`}
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </button>
        </div>
      </div>
      <pre className="p-5 text-xs leading-relaxed text-white/70 overflow-x-auto max-h-[400px] overflow-y-auto bg-obsidian font-mono">
        {formatValue(value)}
      </pre>
    </section>
  )
}

function formatValue(value: unknown): string {
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}
