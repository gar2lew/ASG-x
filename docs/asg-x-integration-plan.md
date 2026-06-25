# ASG‑x Integration Plan

**Status:** Phase 3B — pre-integration readiness

## Current state

The application uses a **local mock submission adapter** (`src/lib/submissionAdapter.ts`).
All quiz submissions are:

- Built into a typed `AsgXLeadPayload`
- Validated locally via `src/lib/leadPayloadValidation.ts`
- Stored in `sessionStorage` under `asgXLeadPayload`
- Inspected via the `/debug` prototype debug page

No external APIs are called. No CRM, Firebase, SMS, or booking integration exists.

## Recommended adapter stages

### Stage 1 — Mock adapter (current)
- Builds payload in memory
- Validates payload locally
- Saves to `sessionStorage`
- Returns a local status result
- Use for: development, QA, demo, compliance review

### Stage 2 — Firebase emulator / local test adapter
- Same as Stage 1, plus:
  - Writes payload to Firebase emulator Firestore
  - Reads back the document ID
  - Returns the Firestore document ID in the status
- Use for: integration testing, QA before production connection

### Stage 3 — Firestore production adapter
- Same as Stage 2, plus:
  - Writes to production Firestore
  - Implements server-side validation (security rules)
  - Adds rate limiting
  - Implements retry logic
- Use for: production data capture before CRM sync

### Stage 4 — CRM lead creation adapter
- Same as Stage 3, plus:
  - Creates a lead in the CRM via REST API
  - Maps Firestore fields to CRM fields
  - Stores the CRM lead ID back in Firestore
  - Tracks CRM sync status (`pending` / `synced` / `failed`)
- Use for: production CRM integration

### Stage 5 — SMS / email automation
- Sends a confirmation SMS/email after successful submission
- Sends follow-up reminders
- Requires consent verification before sending
- Use for: production communication workflows

### Stage 6 — Booking integration
- Wires "Book a discovery call" to a calendar provider
- Candidates: Calendly, HubSpot Meetings, custom
- Updates pipeline stage when a booking is created

---

## Feature flag approach

Use Vite environment variables for adapter selection:

```
VITE_ASGX_SUBMISSION_MODE=mock
```

Planned values:

| Value | Adapter | Description |
|-------|---------|-------------|
| `mock` | Mock adapter | Local sessionStorage only (current) |
| `firebase-local` | Firebase emulator | Local emulator for integration testing |
| `firebase` | Firestore production | Production Firestore |
| `crm` | Full CRM pipeline | Firestore + CRM + automation |

The submission flow should check `import.meta.env.VITE_ASGX_SUBMISSION_MODE` and
dispatch to the appropriate adapter. Default to `mock` if not set.

---

## Security considerations

- `VITE_*` environment variables are bundled into the client build and visible
  in browser DevTools. Do not store secrets (API keys, tokens) in VITE_ vars.
- Firestore security rules must validate lead payload structure server-side
- Consent data must be immutable once recorded
- Session storage is per-tab and cleared on tab close — suitable for prototype
  but not for persistence
- No PII should appear in console logs in production
- The `/debug` route must be removed or gated behind authentication before
  production deployment

---

## Consent / audit considerations

- Consent version is tracked (`1.0.0`) and embedded in every payload
- Each consent has a timestamp recorded at submission time
- Future consent versions should be additive only (never remove fields)
- The consent audit log should be stored in an append-only collection
- Consent withdrawal should not delete the original consent record — it should
  append a withdrawal event with timestamp

---

## Rollback plan

If the production Firestore or CRM integration fails:

1. Disable the integration feature flag (`VITE_ASGX_SUBMISSION_MODE=mock`)
2. Deployment reverts to the mock adapter — submissions are stored locally
3. Investigate the failure root cause in the staging environment
4. Fix and re-deploy with the feature flag set back to the production adapter
5. Any submissions captured during rollback can be exported from the mock
   payload and manually imported if needed

---

## Next steps after Phase 3B

1. Set up a Firebase project and configure security rules
2. Create a Firestore `leads` collection with the schema from `asg-x-crm-field-map.md`
3. Implement Stage 2 (Firebase emulator adapter)
4. Implement Stage 3 (Firestore production adapter)
5. Set up a staging environment for integration testing
6. Run compliance review on consent/audit handling
7. Implement CRM integration (Stage 4)
