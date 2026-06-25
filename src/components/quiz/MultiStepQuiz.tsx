import { useReducer, useState, type Dispatch, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  calculateQuizScore,
  getQuizOutcome,
  type QuizOutcome,
} from '@/lib/scoring'
import {
  isValidAustralianMobile,
  normalizeAustralianMobile,
} from '@/lib/phoneValidation'
import { buildAndSaveLeadPayload } from '@/lib/submissionAdapter'
import type { AsgXQuizSubmission } from '@/types/asgx'

type SuperBalanceType = 'individual' | 'combined' | 'unsure' | ''

type QuizData = {
  firstName: string
  lastName: string
  mobile: string
  email: string
  state: string
  bestTime: string
  hasSmsf: string
  superBalanceRange: string
  superBalanceType: SuperBalanceType
  ageRange: string
  employmentStatus: string
  propertyType: string
  preferredArea: string
  timeframe: string
  currentlyWithAdviser: string
  generalInformationAcknowledgement: boolean
  noPersonalAdviceAcknowledgement: boolean
  riskAndCostsAcknowledgement: boolean
  contactConsent: boolean
  referralConsent: boolean
}

type Errors = Partial<Record<keyof QuizData, string>>

type QuizAction =
  | { type: 'field'; field: keyof QuizData; value: string | boolean }
  | { type: 'reset' }

const initialData: QuizData = {
  firstName: '',
  lastName: '',
  mobile: '',
  email: '',
  state: '',
  bestTime: '',
  hasSmsf: '',
  superBalanceRange: '',
  superBalanceType: '',
  ageRange: '',
  employmentStatus: '',
  propertyType: '',
  preferredArea: '',
  timeframe: '',
  currentlyWithAdviser: '',
  generalInformationAcknowledgement: false,
  noPersonalAdviceAcknowledgement: false,
  riskAndCostsAcknowledgement: false,
  contactConsent: false,
  referralConsent: false,
}

const steps = [
  'Basic Details',
  'SMSF Status',
  'Property Intent',
  'Consent',
] as const

const states = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA']
const bestTimes = ['Morning', 'Afternoon', 'Evening', 'Anytime']
const smsStatuses = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
  { label: 'Unsure', value: 'unsure' },
]
const superBalanceRanges = [
  'Under $100k',
  '$100k-$200k',
  '$200k-$300k',
  '$300k-$500k',
  '$500k+',
  'Prefer not to say',
]
const superBalanceTypes = [
  { label: 'Individual', value: 'individual' },
  { label: 'Combined', value: 'combined' },
  { label: 'Unsure', value: 'unsure' },
]
const ageRanges = ['Under 35', '35-44', '45-54', '55-64', '65+']
const employmentStatuses = [
  'Employed full-time',
  'Employed part-time',
  'Self-employed',
  'Retired',
  'Other',
]
const propertyTypes = [
  { label: 'Residential', value: 'residential' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Not sure', value: 'not sure' },
]
const timeframes = [
  'Now',
  '1-3 months',
  '3-6 months',
  '6-12 months',
  'Research only',
]

function quizReducer(data: QuizData, action: QuizAction): QuizData {
  if (action.type === 'reset') return initialData
  return { ...data, [action.field]: action.value }
}

function isEmailLike(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

function required(value: string, message: string) {
  return value.trim() ? '' : message
}

function validateStep(step: number, data: QuizData): Errors {
  const errors: Errors = {}

  if (step === 1) {
    errors.firstName = required(data.firstName, 'Please enter your first name.')
    errors.lastName = required(data.lastName, 'Please enter your last name.')
    errors.mobile = required(data.mobile, 'Please enter your Australian mobile number.')
    errors.email = required(data.email, 'Please enter your email address.')
    errors.state = required(data.state, 'Please select your state or territory.')

    if (!errors.mobile && !isValidAustralianMobile(data.mobile)) {
      errors.mobile = 'Please use a common Australian mobile format, such as 0412 345 678 or +61412 345 678.'
    }

    if (!errors.email && !isEmailLike(data.email)) {
      errors.email = 'Please enter an email address that looks valid.'
    }
  }

  if (step === 2) {
    errors.hasSmsf = required(data.hasSmsf, 'Please select whether you already have an SMSF.')
    errors.superBalanceRange = required(data.superBalanceRange, 'Please select an approximate super balance range.')
    errors.superBalanceType = required(data.superBalanceType, 'Please select whether this is individual, combined, or unsure.')
    errors.ageRange = required(data.ageRange, 'Please select your age range.')
    errors.employmentStatus = required(data.employmentStatus, 'Please select your employment status.')
  }

  if (step === 3) {
    errors.propertyType = required(data.propertyType, 'Please select the property type you are interested in.')
    errors.timeframe = required(data.timeframe, 'Please select your timeframe.')
    errors.currentlyWithAdviser = required(data.currentlyWithAdviser, 'Please select whether you are speaking with an adviser, accountant, or broker.')

    if (data.preferredArea.trim().length > 100) {
      errors.preferredArea = 'Please keep the preferred area under 100 characters.'
    }
  }

  if (step === 4) {
    const consentMessage = 'Please tick this acknowledgement before submitting.'
    if (!data.generalInformationAcknowledgement) errors.generalInformationAcknowledgement = consentMessage
    if (!data.noPersonalAdviceAcknowledgement) errors.noPersonalAdviceAcknowledgement = consentMessage
    if (!data.riskAndCostsAcknowledgement) errors.riskAndCostsAcknowledgement = consentMessage
    if (!data.contactConsent) errors.contactConsent = consentMessage
    if (!data.referralConsent) errors.referralConsent = consentMessage
  }

  return Object.fromEntries(
    Object.entries(errors).filter(([, value]) => Boolean(value))
  ) as Errors
}

function TextField({
  label,
  name,
  data,
  dispatch,
  errors,
  type = 'text',
  placeholder,
}: {
  label: string
  name: keyof QuizData
  data: QuizData
  dispatch: Dispatch<QuizAction>
  errors: Errors
  type?: string
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-navy-800">{label}</span>
      <input
        type={type}
        value={String(data[name])}
        placeholder={placeholder}
        onChange={(event) =>
          dispatch({ type: 'field', field: name, value: event.target.value })
        }
        className="mt-2 w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-navy-900 outline-none transition focus:border-brass-500 focus:ring-2 focus:ring-brass-200"
      />
      {errors[name] && <ErrorText>{errors[name]}</ErrorText>}
    </label>
  )
}

function SelectField({
  label,
  name,
  options,
  data,
  dispatch,
  errors,
  placeholder = 'Select an option',
}: {
  label: string
  name: keyof QuizData
  options: readonly string[]
  data: QuizData
  dispatch: Dispatch<QuizAction>
  errors: Errors
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-navy-800">{label}</span>
      <select
        value={String(data[name])}
        onChange={(event) =>
          dispatch({ type: 'field', field: name, value: event.target.value })
        }
        className="mt-2 w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-navy-900 outline-none transition focus:border-brass-500 focus:ring-2 focus:ring-brass-200"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors[name] && <ErrorText>{errors[name]}</ErrorText>}
    </label>
  )
}

function RadioGroup({
  label,
  name,
  options,
  data,
  dispatch,
  errors,
}: {
  label: string
  name: keyof QuizData
  options: readonly { label: string; value: string }[]
  data: QuizData
  dispatch: Dispatch<QuizAction>
  errors: Errors
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-navy-800">{label}</legend>
      <div className="mt-2 grid gap-3 sm:grid-cols-3">
        {options.map((option) => {
          const checked = data[name] === option.value
          return (
            <label
              key={option.value}
              className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
                checked
                  ? 'border-brass-500 bg-brass-50 text-navy-900'
                  : 'border-navy-200 bg-white text-navy-700'
              }`}
            >
              <input
                type="radio"
                className="sr-only"
                checked={checked}
                onChange={() =>
                  dispatch({ type: 'field', field: name, value: option.value })
                }
              />
              {option.label}
            </label>
          )
        })}
      </div>
      {errors[name] && <ErrorText>{errors[name]}</ErrorText>}
    </fieldset>
  )
}

function ConsentCheckbox({
  name,
  children,
  data,
  dispatch,
  errors,
}: {
  name: keyof QuizData
  children: ReactNode
  data: QuizData
  dispatch: Dispatch<QuizAction>
  errors: Errors
}) {
  return (
    <label className="flex gap-3 rounded-lg border border-navy-200 bg-white p-4">
      <input
        type="checkbox"
        checked={Boolean(data[name])}
        onChange={(event) =>
          dispatch({ type: 'field', field: name, value: event.target.checked })
        }
        className="mt-1 h-5 w-5 shrink-0 accent-brass-500"
      />
      <span className="text-sm leading-6 text-navy-700">
        {children}
        {errors[name] && <ErrorText>{errors[name]}</ErrorText>}
      </span>
    </label>
  )
}

function ErrorText({ children }: { children?: ReactNode }) {
  return <p className="mt-2 text-sm text-red-600">{children}</p>
}

function ComplianceNote() {
  return (
    <div className="rounded-lg border border-navy-200 bg-navy-50 p-4 text-xs leading-5 text-navy-700">
      ASG-x provides general information and education services only. We do not
      provide personal financial advice. SMSF property pathways involve risks
      and costs, and may not be suitable for everyone. Speak with licensed
      professionals before making decisions about your superannuation.
    </div>
  )
}

export default function MultiStepQuiz() {
  const [data, dispatch] = useReducer(quizReducer, initialData)
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<Errors>({})
  const navigate = useNavigate()

  const currentStepLabel = steps[step - 1]

  async function saveAndNavigate(outcome: QuizOutcome) {
    const submission: AsgXQuizSubmission = {
      ...data,
      mobile: normalizeAustralianMobile(data.mobile),
      submittedAt: new Date().toISOString(),
      quizScore: calculateQuizScore(data),
      quizOutcome: outcome,
    }

    sessionStorage.setItem('asgXQuizSubmission', JSON.stringify(submission))
    sessionStorage.setItem('asgXQuizOutcome', outcome)

    await buildAndSaveLeadPayload(submission)

    navigate('/thank-you')
  }

  async function handleNext(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateStep(step, data)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    if (step < steps.length) {
      setStep((value) => value + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const score = calculateQuizScore(data)
    await saveAndNavigate(getQuizOutcome(score))
  }

  return (
    <section className="bg-navy-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-navy-900">ASG-x Discovery Quiz</h1>
          <p className="mt-2 text-sm text-navy-600">
            Explore whether this pathway may be worth discussing with licensed professionals.
          </p>
        </div>

        <div className="rounded-lg border border-navy-200 bg-white p-5 shadow-lg shadow-navy-900/5 sm:p-8">
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between text-sm font-semibold text-navy-700">
              <span>Step {step} of {steps.length}</span>
              <span>{currentStepLabel}</span>
            </div>
            <div className="grid grid-cols-4 gap-2" aria-hidden="true">
              {steps.map((label, index) => (
                <div
                  key={label}
                  className={`h-2 rounded-full ${
                    index + 1 <= step ? 'bg-brass-500' : 'bg-navy-100'
                  }`}
                />
              ))}
            </div>
          </div>

          <form onSubmit={handleNext} noValidate>
            <div className="space-y-5">
              {step === 1 && (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextField label="First name" name="firstName" data={data} dispatch={dispatch} errors={errors} />
                    <TextField label="Last name" name="lastName" data={data} dispatch={dispatch} errors={errors} />
                  </div>
                  <TextField label="Mobile" name="mobile" type="tel" placeholder="0412 345 678" data={data} dispatch={dispatch} errors={errors} />
                  <TextField label="Email" name="email" type="email" placeholder="you@example.com" data={data} dispatch={dispatch} errors={errors} />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <SelectField label="State" name="state" options={states} data={data} dispatch={dispatch} errors={errors} />
                    <SelectField label="Best time" name="bestTime" options={bestTimes} data={data} dispatch={dispatch} errors={errors} placeholder="Optional" />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <RadioGroup label="Do you already have an SMSF?" name="hasSmsf" options={smsStatuses} data={data} dispatch={dispatch} errors={errors} />
                  <SelectField label="Approximate super balance" name="superBalanceRange" options={superBalanceRanges} data={data} dispatch={dispatch} errors={errors} />
                  <RadioGroup label="Is this individual, combined, or unsure?" name="superBalanceType" options={superBalanceTypes} data={data} dispatch={dispatch} errors={errors} />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <SelectField label="Age range" name="ageRange" options={ageRanges} data={data} dispatch={dispatch} errors={errors} />
                    <SelectField label="Employment status" name="employmentStatus" options={employmentStatuses} data={data} dispatch={dispatch} errors={errors} />
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <RadioGroup label="Property type interest" name="propertyType" options={propertyTypes} data={data} dispatch={dispatch} errors={errors} />
                  <TextField label="Preferred area" name="preferredArea" placeholder="Optional" data={data} dispatch={dispatch} errors={errors} />
                  <SelectField label="Timeframe" name="timeframe" options={timeframes} data={data} dispatch={dispatch} errors={errors} />
                  <RadioGroup label="Are you currently speaking with an adviser, accountant, or broker?" name="currentlyWithAdviser" options={smsStatuses} data={data} dispatch={dispatch} errors={errors} />
                </>
              )}

              {step === 4 && (
                <>
                  <ConsentCheckbox name="generalInformationAcknowledgement" data={data} dispatch={dispatch} errors={errors}>
                    I understand this quiz provides general information only.
                  </ConsentCheckbox>
                  <ConsentCheckbox name="noPersonalAdviceAcknowledgement" data={data} dispatch={dispatch} errors={errors}>
                    I understand ASG-x does not provide personal financial advice.
                  </ConsentCheckbox>
                  <ConsentCheckbox name="riskAndCostsAcknowledgement" data={data} dispatch={dispatch} errors={errors}>
                    I understand SMSF property pathways involve risks, costs, and may not be suitable for everyone.
                  </ConsentCheckbox>
                  <ConsentCheckbox name="contactConsent" data={data} dispatch={dispatch} errors={errors}>
                    I consent to being contacted by phone, SMS, and email about my enquiry.
                  </ConsentCheckbox>
                  <ConsentCheckbox name="referralConsent" data={data} dispatch={dispatch} errors={errors}>
                    I consent to my details being shared with relevant licensed or approved professionals where required for referral purposes.
                  </ConsentCheckbox>
                </>
              )}

              <ComplianceNote />
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() => {
                  setErrors({})
                  setStep((value) => Math.max(1, value - 1))
                }}
                disabled={step === 1}
                className="rounded-lg border border-navy-200 px-5 py-3 font-semibold text-navy-700 transition hover:bg-navy-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="submit"
                className="rounded-lg bg-brass-500 px-6 py-3 font-bold text-navy-950 transition hover:bg-brass-400"
              >
                {step === steps.length ? 'Submit enquiry' : 'Next'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
