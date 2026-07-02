# ASG‑x Phase 5B — Firebase Functions Plan

**Status:** Phase 5A — documented, not implemented  
**Purpose:** Outline the future server-side submission architecture

## Overview

Phase 5B will implement a Firebase HTTPS Callable Function that:

1. Receives the `AsgXLeadPayload` from the frontend
2. Validates the payload server-side
3. Writes to Firestore with server-authoritative timestamps
4. Logs an audit entry
5. Returns a success/failure result with a document ID
6. (Future) Creates a CRM lead / triggers follow-up

## Proposed Function structure

```
functions/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts               # Export entry point
│   ├── submitLead.ts          # Main callable function
│   ├── validation.ts          # Server-side payload validation
│   ├── firestore.ts           # Firestore write helper
│   └── audit.ts               # Consent audit logger
└── lib/                        # Compiled output (gitignored)
```

## Proposed Function: `submitLead`

### Type: HTTPS Callable

### Input

```typescript
{
  payload: AsgXLeadPayload
}
```

### Server-side validation

Duplicate the client-side `validateLeadPayload()` logic on the server. Do NOT trust the client-provided validation result. Re-validate:

- lead source
- consent flags (all must be true)
- consent version + timestamp
- quiz outcome value
- contact fields non-empty
- UTM object present (optional)

### Firestore write

- Write to `asgXLeadSubmissions/{auto-id}`
- Set `createdAt` and `submittedAt` server-side (admin timestamps)
- Remove `emulatorOnly: true` marker
- Add `submissionMode: "functions"`
- Add `validatedAt` timestamp

### Audit log

- Write a separate document to `consentAuditLog/{submissionId}`
- Immutable — no updates after creation
- Contains: consent version, consent time, consent flags, function version

### Response

```typescript
{
  success: boolean
  message: string
  submissionId: string
  firestoreDocId: string
}
```

## Frontend changes needed

- In `submissionAdapter.ts`: when `VITE_ASGX_SUBMISSION_MODE=functions`, call the Function instead of writing directly
- The Function endpoint is automatically provided by the Firebase SDK
- Keep mock mode as default
- Keep Firebase emulator mode for local development

## Rate limiting approach

- Per-IP rate limit: max 5 submissions per hour
- Per-session rate limit: max 3 submissions per session
- Implement via Firebase Functions rate limiting middleware
- Return a 429-style error with a retry-after window

## App Check integration

- Enable App Check in the Firebase console
- Require App Check token on all Function calls
- Frontend: import `initializeAppCheck` and attach to the request
- Blocks non-browser (curl/script) submissions

## Local emulator test plan

1. `firebase init functions` in the project root
2. Select TypeScript
3. Implement `submitLead` as an HTTPS callable
4. Test with `firebase emulators:start` (which now includes Functions emulator)
5. Verify:
   - Payload validates correctly
   - Firestore document created with server timestamps
   - Audit log created
   - Invalid payloads rejected
   - Rate limiting works

## Production deployment blockers

- Functions must be deployed to the same Firebase project as Firestore
- App Check must be configured for the production domain
- Functions must be in the same region as Firestore (recommend `australia-southeast1`)
- Cold start mitigation: keep minimum instances = 1

## What Phase 5B does NOT do

- CRM integration (Phase 6+)
- SMS/email follow-up (Phase 6+)
- Booking integration (Phase 6+)
- Admin dashboard (Phase 6+)
- Production deployment (requires sign-off)
