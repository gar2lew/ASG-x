# ASG-x Quiz Specification

## 4-Step Quiz Flow
**Step 1: Basic Details**
- Collect contact information and basic demographics.

**Step 2: SMSF Status**
- Assess current SMSF situation and superannuation details.

**Step 3: Property Intent**
- Explore property investment interests and timing.

**Step 4: Consent and Risk Acknowledgement**
- Obtain explicit consents and acknowledgements.

## Field Names, Labels, Requirements, and Validation

### Step 1 - Basic Details
| Field Name | Label | Required | Validation Rules |
|------------|-------|----------|------------------|
| firstName | First Name | Yes | Required, min 2 chars, max 50, letters/spaces/hyphens/apostrophes only |
| lastName | Last Name | Yes | Required, min 2 chars, max 50, letters/spaces/hyphens/apostrophes only |
| mobile | Mobile Number | Yes | Required, Australian mobile format (04xx xxx xxx or +614xx xxx xxx), 10 digits after 04 |
| email | Email Address | Yes | Required, valid email format |
| state | State/Territory | Yes | Required, dropdown: ACT, NSW, NT, QLD, SA, TAS, VIC, WA |
| bestTime | Best Contact Time | No | Dropdown: Morning, Afternoon, Evening, Anytime |

### Step 2 - SMSF Status
| Field Name | Label | Required | Validation Rules |
|------------|-------|----------|------------------|
| hasSmsf | Do you already have an SMSF? | Yes | Radio: Yes, No, Unsure |
| superBalance | Approximate super balance | Yes | Dropdown: Under $100k, $100k-$200k, $200k-$300k, $300k-$500k, $500k+, Prefer not to say |
| superBalanceCombined | Is this individual or combined with partner? | Yes | Radio: Individual, Combined with partner |
| ageRange | Age range | Yes | Dropdown: Under 35, 35-44, 45-54, 55-64, 64, 65+ |
| employmentStatus | Employment status: 65+ |
| employmentStatus | Employment status | Yes | Dropdown: Employed full-time, Employed part-time, Self-employed, Retired, Other |

### Step 3 - Property Intent
| Field Name | Label | Required | Validation Rules |
|------------|-------|----------|------------------|
| propertyType | Property type interest | Yes | Radio: Residential, Commercial, Not sure |
| preferredArea | Preferred state/area | No | Text, max 100 chars |
| timeframe | Timeframe for exploring | Yes | Dropdown: Now, 1-3 months, 3-6 months, 6-12 months, Research only |
| currentlyWithAdviser | Are you currently speaking with an adviser/accountant/broker? | Yes | Radio: Yes, No, Unsure |

### Step 4 - Consent and Risk Acknowledgement (All Required)
| Field Name | Label | Required | Validation Rules |
|------------|-------|----------|------------------|
| consentAdvice | I understand this is general information only and ASG-x does not provide personal financial advice unless provided by an appropriately licensed representative | Yes | Must be checked |
| consentRisks | I understand that SMSF property investment involves risks, costs, and may not be suitable for everyone | Yes | Must be checked |
| consentContact | I consent to being contacted by phone, SMS, and email regarding my enquiry | Yes | Must be checked |
| consentPartnerSharing | I consent to my details being shared with relevant licensed/approved partners (financial advisers, SMSF specialists, finance brokers) where required for referral purposes | Yes | Must be checked |
| consentPrivacy | I have read and understood the privacy policy and referral disclosure | Yes | Must be checked |

## Internal-Only Scoring Logic
- Scores are calculated internally and never shown to users.
- Each question assigned weighted points based on relevance to SMSF property pathway exploration.
- Maximum possible score: 100 points.
- Scoring bands:
  - 0-39: Not suitable now (shows "Not suitable now" outcome)
  - 40-69: Needs review (shows "Needs review" outcome)
  - 70-100: Worth exploring (shows "This may be worth exploring" outcome)
- NEEDS REVIEW: Scoring algorithm and thresholds to be reviewed by compliance to ensure no advice-like implications.

## Client-Facing Quiz Result Wording
Based on score band:
- **Not suitable now (0-39):** "Based on your responses, exploring SMSF property strategies may not be suitable for your current situation. You may wish to reconsider at a later date or speak with a licensed professional about other options."
- **Needs review (40-69):** "Based on your responses, you may wish to review your situation further with a licensed professional to understand whether exploring SMSF property strategies could be appropriate for you."
- **Worth exploring (70-100):** "Based on your responses, exploring whether SMSF property strategies may be worth discussing further with a licensed professional could be appropriate for your situation."

## Consent Checkbox Wording (as in table above)
NEEDS REVIEW: Exact consent wording to be reviewed by privacy/legal for compliance with Privacy Act and Spam Act.

## Data Model Draft (TypeScript Interface)
```typescript
interface ASGXLead {
  id: string;
  createdAt: timestamp;
  updatedAt: timestamp;
  
  // Core contact info
  firstName: string;
  lastName: string;
  mobile: string; // normalized AU format
  email: string;
  state: string;
  
  // Quiz responses
  hasSmsf: 'yes' | 'no' | 'unsure';
  superBalanceRange: string;
  superBalanceCombined: boolean;
  ageRange: string;
  employmentStatus: string;
  propertyType: 'residential' | 'commercial' | 'unsure';
  preferredArea: string;
  timeframe: string;
  currentlyWithAdviser: 'yes' | 'no' | 'unsure';
  
  // Consent and compliance
  consentVersion: string;
  consentTimestamp: timestamp;
  consentIP: string;
  consentAdvice: boolean;
  consentRisks: boolean;
  consentContact: boolean;
  consentPartnerSharing: boolean;
  consentPrivacy: boolean;
  
  // Tracking
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  
  // Internal scoring (not shown to user)
  quizScore?: number; // 0-100 internal
  quizOutcome?: 'not_suitable' | 'needs_review' | 'worth_exploring';
  
  // CRM integration
  leadSource: 'ASG-x Online SMSF Funnel';
  pipelineStage: 'New Online Enquiry' | 'Auto-SMS Sent' | 'Discovery Booked' | 'Discovery Completed' | 
                'Adviser Referral Required' | 'Finance Review' | 'Property Pathway' | 'Not Suitable' | 
                'Nurture' | 'Converted';
  assignedTo?: string; // user ID
  followUpTaskId?: string;
  
  // Referral tracking
  referralMade?: boolean;
  referralPartnerType?: 'financial_adviser' | 'smsf_specialist' | 'finance_broker' | 'property_consultant';
  referralConsentLogged?: boolean;
  referralTimestamp?: timestamp;
}
```
NEEDS REVIEW: Data model fields, consent fields, and scoring fields to be reviewed by privacy/legal/compliance.