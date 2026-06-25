import type {
  AsgXQuizSubmission,
  AsgXLeadPayload,
  AsgXSubmissionStatus,
  AsgXConsent,
} from '@/types/asgx'
import { getConsentVersion } from '@/lib/consentVersion'
import { readUtmData } from '@/lib/utm'
import { validateLeadPayload, type ValidationResult } from '@/lib/leadPayloadValidation'
import { getSubmissionMode, isFirebaseMode } from '@/lib/submissionMode'

/**
 * Builds a future-ready AsgXLeadPayload from quiz submission data.
 * Runs payload validation. Saves payload and validation to sessionStorage.
 *
 * Submission mode is controlled by VITE_ASGX_SUBMISSION_MODE:
 *   - "mock" (default): Local sessionStorage only. No external calls.
 *   - "firebase": Validates config, requires emulator. See firestoreSubmissionAdapter.
 *
 * Returns a clear result object. No external calls in mock mode.
 */
export function buildAndSaveLeadPayload(
  submission: AsgXQuizSubmission
): AsgXSubmissionStatus & { validation: ValidationResult } {
  const now = new Date().toISOString()
  const localSubmissionId = `asgx_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const mode = getSubmissionMode()

  const consent: AsgXConsent = {
    generalInformation: submission.generalInformationAcknowledgement,
    noPersonalAdvice: submission.noPersonalAdviceAcknowledgement,
    riskAndCosts: submission.riskAndCostsAcknowledgement,
    contact: submission.contactConsent,
    referral: submission.referralConsent,
    version: getConsentVersion(),
    timestamp: now,
  }

  const payload: AsgXLeadPayload = {
    leadSource: 'asg_x_smsf',
    submissionId: localSubmissionId,
    createdAt: now,

    // Contact
    firstName: submission.firstName,
    lastName: submission.lastName,
    mobile: submission.mobile,
    email: submission.email,
    state: submission.state,
    bestTime: submission.bestTime,

    // Quiz responses
    hasSmsf: submission.hasSmsf,
    superBalanceRange: submission.superBalanceRange,
    superBalanceType: submission.superBalanceType,
    ageRange: submission.ageRange,
    employmentStatus: submission.employmentStatus,
    propertyType: submission.propertyType,
    preferredArea: submission.preferredArea,
    timeframe: submission.timeframe,
    currentlyWithAdviser: submission.currentlyWithAdviser,

    // Scoring
    quizScore: submission.quizScore,
    quizOutcome: submission.quizOutcome,

    // Consent
    consent,

    // UTM
    utm: readUtmData(),

    // Meta
    pipelineStage: 'new_enquiry',
    campaignId: 'asg_x_smsf_v1',
  }

  const validation = validateLeadPayload(payload)
  sessionStorage.setItem('asgXLeadPayloadValidation', JSON.stringify(validation))

  if (!validation.valid) {
    return {
      success: false,
      localSubmissionId,
      timestamp: now,
      message: 'Local validation failed. The payload did not pass pre-submission checks.',
      validation,
    }
  }

  sessionStorage.setItem('asgXLeadPayload', JSON.stringify(payload))

  const modeLabel = mode === 'firebase' ? ' [firebase mode active]' : ''

  return {
    success: true,
    localSubmissionId,
    timestamp: now,
    message:
      `Your enquiry details have been captured (mode: ${mode}).${modeLabel} The next production phase will connect this flow to the approved CRM and follow-up process.`,
    validation,
  }
}
