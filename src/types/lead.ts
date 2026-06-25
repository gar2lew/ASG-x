export interface ASGXLead {
  id: string;
  createdAt: number;
  updatedAt: number;

  // Contact fields
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  state: 'ACT' | 'NSW' | 'NT' | 'QLD' | 'SA' | 'TAS' | 'VIC' | 'WA';
  bestTime?: 'Morning' | 'Afternoon' | 'Evening' | 'Anytime';

  // Quiz response fields
  hasSmsf: 'yes' | 'no' | 'unsure';
  superBalanceRange: string;
  superBalanceCombined: 'individual' | 'combined';
  ageRange: string;
  employmentStatus: string;
  propertyType: 'residential' | 'commercial' | 'unsure';
  preferredArea?: string;
  timeframe: string;
  currentlyWithAdviser: 'yes' | 'no' | 'unsure';

  // Consent fields
  consentAdvice: boolean;
  consentRisks: boolean;
  consentContact: boolean;
  consentPartnerSharing: boolean;
  consentPrivacy: boolean;
  consentVersion: string;
  consentTimestamp: number;
  consentIP: string;

  // UTM fields
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;

  // Scoring fields
  quizScore?: number;
  quizOutcome?: 'not_suitable' | 'needs_review' | 'worth_exploring';

  // Pipeline fields
  leadSource: 'asgx-online-smsf-quiz';
  pipelineStage: 'new' | 'contacted' | 'qualified' | 'appointment_booked' | 'advice_given' | 'lost' | 'archived';
  assignedTo?: string;
  followUpTaskId?: string;

  // Referral fields
  referralCode?: string;
  referralSource?: string;
}
