import type { AsgXLeadPayload } from '@/types/asgx'

export interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

const VALID_OUTCOMES = ['explore', 'review', 'not_now'] as const

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

/**
 * Lightweight local validation for AsgXLeadPayload.
 * Runs before any future external handoff path.
 * In this prototype, runs as part of the local mock adapter.
 */
export function validateLeadPayload(payload: AsgXLeadPayload): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // ---- Lead source ----
  if (payload.leadSource !== 'asg_x_smsf') {
    errors.push('leadSource must be "asg_x_smsf".')
  }

  // ---- Created timestamp ----
  if (!isNonEmptyString(payload.createdAt)) {
    errors.push('createdAt timestamp is required.')
  }

  // ---- Consent ----
  if (!payload.consent) {
    errors.push('Consent object is required.')
  } else {
    if (!isNonEmptyString(payload.consent.version)) {
      errors.push('Consent version is required.')
    }
    if (!isNonEmptyString(payload.consent.timestamp)) {
      errors.push('Consent timestamp is required.')
    }

    if (!payload.consent.generalInformation) {
      errors.push('Consent: generalInformation acknowledgement is required.')
    }
    if (!payload.consent.noPersonalAdvice) {
      errors.push('Consent: noPersonalAdvice acknowledgement is required.')
    }
    if (!payload.consent.riskAndCosts) {
      errors.push('Consent: riskAndCosts acknowledgement is required.')
    }
    if (!payload.consent.contact) {
      errors.push('Consent: contact consent is required.')
    }
    if (!payload.consent.referral) {
      errors.push('Consent: referral consent is required.')
    }
  }

  // ---- Quiz outcome ----
  if (!VALID_OUTCOMES.includes(payload.quizOutcome as typeof VALID_OUTCOMES[number])) {
    errors.push(
      `quizOutcome must be one of: ${VALID_OUTCOMES.join(', ')}. Got: "${payload.quizOutcome}".`
    )
  }

  // ---- Contact fields ----
  if (!isNonEmptyString(payload.firstName)) {
    errors.push('firstName is required.')
  }
  if (!isNonEmptyString(payload.lastName)) {
    errors.push('lastName is required.')
  }
  if (!isNonEmptyString(payload.mobile)) {
    errors.push('mobile is required.')
  }
  if (!isNonEmptyString(payload.email)) {
    errors.push('email is required.')
  }

  // ---- UTM ----
  if (!payload.utm || typeof payload.utm !== 'object') {
    warnings.push('UTM object is missing. Campaign attribution will be incomplete.')
  }

  // ---- Internal score ----
  if (typeof payload.quizScore !== 'number' || payload.quizScore < 0 || payload.quizScore > 100) {
    warnings.push('quizScore is missing or out of range (0–100). Internal scoring may be incomplete.')
  }

  if (payload.quizScore !== undefined && payload.quizOutcome !== undefined) {
    warnings.push(
      'quizScore is internal only and must not be displayed to the user or included in any client-facing communication.'
    )
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}
