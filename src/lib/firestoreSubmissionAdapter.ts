/**
 * Firestore submission adapter (emulator-only scaffold).
 *
 * Accepts an AsgXLeadPayload, validates it, and prepares a Firestore
 * document shape. Only attempts to write if Firebase emulator mode
 * is enabled and config is valid.
 *
 * Does NOT write to production Firestore.
 */
import type { AsgXLeadPayload, AsgXSubmissionStatus } from '@/types/asgx'
import { validateLeadPayload, type ValidationResult } from '@/lib/leadPayloadValidation'
import { getFirestoreDb, isFirebaseEmulatorMode } from '@/lib/firebaseClient'

interface FirestoreSubmissionResult extends AsgXSubmissionStatus {
  validation: ValidationResult
  firestoreDocId: string | null
}

/**
 * Prepares a document shape suitable for the asgXLeadSubmissions collection.
 * Does not mutate — returns a plain object.
 */
function prepareFirestoreDocument(payload: AsgXLeadPayload) {
  return {
    sourceKey: 'asg_x_smsf',
    sourceLabel: 'ASG-x Online SMSF Funnel',

    leadSource: payload.leadSource,
    submissionId: payload.submissionId,
    localSubmissionId: payload.submissionId,
    createdAt: payload.createdAt,
    submittedAt: new Date().toISOString(),

    // Environment markers
    submissionMode: 'firebase',
    emulatorOnly: true,

    firstName: payload.firstName,
    lastName: payload.lastName,
    mobile: payload.mobile,
    email: payload.email,
    state: payload.state,
    bestTime: payload.bestTime,

    hasSmsf: payload.hasSmsf,
    superBalanceRange: payload.superBalanceRange,
    superBalanceType: payload.superBalanceType,
    ageRange: payload.ageRange,
    employmentStatus: payload.employmentStatus,
    propertyType: payload.propertyType,
    preferredArea: payload.preferredArea,
    timeframe: payload.timeframe,
    currentlyWithAdviser: payload.currentlyWithAdviser,

    quizScore: payload.quizScore,
    quizOutcome: payload.quizOutcome,

    consent: {
      generalInformation: payload.consent.generalInformation,
      noPersonalAdvice: payload.consent.noPersonalAdvice,
      riskAndCosts: payload.consent.riskAndCosts,
      contact: payload.consent.contact,
      referral: payload.consent.referral,
      consentVersion: payload.consent.version,
      consentTimestamp: payload.consent.timestamp,
    },

    utm: {
      source: payload.utm.utmSource ?? null,
      medium: payload.utm.utmMedium ?? null,
      campaign: payload.utm.utmCampaign ?? null,
      content: payload.utm.utmContent ?? null,
      term: payload.utm.utmTerm ?? null,
    },

    pipelineStage: 'new_enquiry',
    campaignId: payload.campaignId,
  }
}

/**
 * Attempts to write the payload to Firestore.
 * Only executes if:
 *   1. VITE_ASGX_SUBMISSION_MODE is "firebase"
 *   2. Firebase config is valid
 *   3. Emulator mode is enabled (VITE_USE_FIREBASE_EMULATOR=true)
 *
 * Returns a safe result regardless of outcome.
 */
export async function submitToFirestore(
  payload: AsgXLeadPayload
): Promise<FirestoreSubmissionResult> {
  const now = new Date().toISOString()

  const validation = validateLeadPayload(payload)

  if (!validation.valid) {
    return {
      success: false,
      localSubmissionId: payload.submissionId,
      timestamp: now,
      message: 'Payload validation failed before Firestore submission.',
      firestoreDocId: null,
      validation,
    }
  }

  if (!isFirebaseEmulatorMode()) {
    return {
      success: false,
      localSubmissionId: payload.submissionId,
      timestamp: now,
      message:
        'Firebase emulator mode is disabled. Submit in mock mode for local-only capture.',
      firestoreDocId: null,
      validation,
    }
  }

  try {
    const db = await getFirestoreDb()
    if (!db) {
      return {
        success: false,
        localSubmissionId: payload.submissionId,
        timestamp: now,
        message: 'Firestore db instance unavailable after initialisation.',
        firestoreDocId: null,
        validation,
      }
    }

    const doc = prepareFirestoreDocument(payload)

    // Dynamic import of Firestore write methods
    const { collection, addDoc } = await import('firebase/firestore')
    const collectionRef = collection(db, 'asgXLeadSubmissions')
    const docRef = await addDoc(collectionRef, doc)

    return {
      success: true,
      localSubmissionId: payload.submissionId,
      timestamp: now,
      message: 'Payload submitted to Firestore emulator successfully.',
      firestoreDocId: docRef.id,
      validation,
    }
  } catch (error) {
    console.error('[firestoreSubmissionAdapter] Firestore write failed:', error)
    return {
      success: false,
      localSubmissionId: payload.submissionId,
      timestamp: now,
      message:
        'Firestore write failed. Is the emulator running? Check console for details.',
      firestoreDocId: null,
      validation,
    }
  }
}
