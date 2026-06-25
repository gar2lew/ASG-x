# ASG‑x Firebase Emulator Plan

**Status:** Phase 4A — scaffolded, not connected

## Goal

Set up a local Firebase emulator environment for Firestore submission testing
before connecting to production Firebase.

All Phase 4A work is **emulator-only**. Nothing writes to production Firestore.

## Proposed Firestore collection

**Collection:** `asgXLeadSubmissions`

Each document represents one quiz submission.

### Document shape

```
asgXLeadSubmissions/{auto-id}
├── leadSource:          "asg_x_smsf"
├── submissionId:        string
├── createdAt:           ISO 8601 string
├── submittedAt:         ISO 8601 string
├── firstName:           string
├── lastName:            string
├── mobile:              string (normalised AU)
├── email:               string
├── state:               string
├── bestTime:            string
├── hasSmsf:             string
├── superBalanceRange:   string
├── superBalanceType:    string
├── ageRange:            string
├── employmentStatus:    string
├── propertyType:        string
├── preferredArea:       string
├── timeframe:           string
├── currentlyWithAdviser:string
├── quizScore:           number (internal only)
├── quizOutcome:         string (internal only)
├── consent:             map
│   ├── generalInformation:  boolean
│   ├── noPersonalAdvice:    boolean
│   ├── riskAndCosts:        boolean
│   ├── contact:             boolean
│   ├── referral:            boolean
│   ├── consentVersion:      string
│   └── consentTimestamp:    ISO 8601 string
├── utm:                 map
│   ├── source:          string | null
│   ├── medium:          string | null
│   ├── campaign:        string | null
│   ├── content:         string | null
│   └── term:            string | null
├── pipelineStage:       "new_enquiry"
└── campaignId:          string
```

## Required env vars

Copy `.env.example` to `.env` and fill in:

```env
VITE_ASGX_SUBMISSION_MODE=firebase
VITE_FIREBASE_API_KEY=           # From Firebase Console
VITE_FIREBASE_AUTH_DOMAIN=       # From Firebase Console
VITE_FIREBASE_PROJECT_ID=        # From Firebase Console
VITE_FIREBASE_STORAGE_BUCKET=    # From Firebase Console
VITE_FIREBASE_MESSAGING_SENDER_ID=  # From Firebase Console
VITE_FIREBASE_APP_ID=            # From Firebase Console
VITE_USE_FIREBASE_EMULATOR=true
```

## Local test process

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Start emulators: `firebase emulators:start --only firestore`
3. Confirm Firestore emulator is running at `localhost:8080`
4. Set `.env` vars for your Firebase project (any project, emulator doesn't need a real one)
5. Set `VITE_ASGX_SUBMISSION_MODE=firebase`
6. Set `VITE_USE_FIREBASE_EMULATOR=true`
7. Run `npm run dev`
8. Complete the quiz. The submission should write to the emulator's Firestore.
9. Check the Firestore emulator UI at `http://localhost:4000`

## Security rule considerations

Firestore security rules (to be written before production):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /asgXLeadSubmissions/{docId} {
      allow read: if false;                    // No public reads
      allow create: if
        request.resource.data.leadSource == 'asg_x_smsf' &&
        request.resource.data.consent.contact == true &&
        request.resource.data.consent.referral == true;
      allow update, delete: if false;          // Immutable after creation
    }
  }
}
```

## Production rollout blockers

These must be resolved before switching to production:

- [ ] Firestore security rules written and tested
- [ ] Consent audit trail implemented (append-only log)
- [ ] Rate limiting on quiz submissions (prevent abuse)
- [ ] PII handling reviewed (encryption at rest, access control)
- [ ] `/debug` route removed or gated behind authentication
- [ ] Environment variables audit (no secrets in client bundle)
- [ ] `VITE_USE_FIREBASE_EMULATOR` must be removed or default to `false`
- [ ] Staging environment verified end-to-end
- [ ] Compliance review of consent logging
- [ ] Rollback plan rehearsed

## Rollback plan

If production Firestore write fails:

1. Set `VITE_ASGX_SUBMISSION_MODE=mock`
2. Deploy — all submissions revert to local sessionStorage
3. Investigate failure in staging
4. Fix and redeploy with `firebase` mode

Any submissions lost during the production window can be recovered from
the user's session storage if the tab is still open, or re-submitted.

## What must be reviewed before live Firebase

- [ ] Data model compliance with the CRM field map (`docs/asg-x-crm-field-map.md`)
- [ ] Consent recording complies with Privacy Act 1988
- [ ] No quiz scores or internal outcomes exposed to client-facing code
- [ ] `VITE_*` env vars contain no secrets
- [ ] Firebase API key is not committed to version control
- [ ] `firestore.rules` deployed and tested
- [ ] Production Firestore is in the correct region (AU/nearby)
