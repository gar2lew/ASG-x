/**
 * ASG‑x typed data model for quiz submissions.
 * Future-ready for CRM, Firebase, and partner integrations.
 */

// ---- Quiz outcome (matches scoring.ts) ----
export type AsgXQuizOutcome = 'explore' | 'review' | 'not_now'

// ---- Consent record ----
export interface AsgXConsent {
  generalInformation: boolean
  noPersonalAdvice: boolean
  riskAndCosts: boolean
  contact: boolean
  referral: boolean
  version: string
  timestamp: string
}

// ---- UTM tracking data ----
export interface AsgXUtmData {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  utmTerm?: string
}

// ---- Raw quiz submission (what the quiz form produces) ----
export interface AsgXQuizSubmission {
  firstName: string
  lastName: string
  mobile: string
  email: string
  state: string
  bestTime: string
  hasSmsf: string
  superBalanceRange: string
  superBalanceType: string
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
  submittedAt: string
  quizScore: number
  quizOutcome: AsgXQuizOutcome
}

// ---- Submission result ----
export interface AsgXSubmissionStatus {
  success: boolean
  localSubmissionId: string
  timestamp: string
  message: string
}

// ---- Future-ready lead payload (for CRM / Firebase / partner handoff) ----
export interface AsgXLeadPayload {
  leadSource: 'asg_x_smsf'
  submissionId: string
  createdAt: string

  // Contact
  firstName: string
  lastName: string
  mobile: string
  email: string
  state: string
  bestTime: string

  // Quiz responses
  hasSmsf: string
  superBalanceRange: string
  superBalanceType: string
  ageRange: string
  employmentStatus: string
  propertyType: string
  preferredArea: string
  timeframe: string
  currentlyWithAdviser: string

  // Scoring (internal, not surfaced to user)
  quizScore: number
  quizOutcome: AsgXQuizOutcome

  // Consent
  consent: AsgXConsent

  // UTM / campaign
  utm: AsgXUtmData

  // Meta
  pipelineStage: 'new_enquiry'
  campaignId: string
}
