# ASG‑x Production Readiness Review

**Status:** Phase 5A — planning and documentation  
**Date:** June 2026

## Current prototype status

The ASG‑x prototype delivers:

- Premium dark-editorial landing page
- Functional 4-step quiz with inline validation and consent capture
- Typed `AsgXLeadPayload` data model
- Local mock submission adapter (sessionStorage)
- Firebase emulator submission adapter (local Firestore only)
- UTM campaign tracking
- Payload validation (14 rules, 5 categories)
- Debug page for local inspection
- Sample payloads and manual QA checklist
- CRM field mapping and integration plan documentation

## What is proven locally

- [x] Quiz form collects and validates all required fields
- [x] Consent is recorded with version + timestamp
- [x] `AsgXLeadPayload` is built and valid
- [x] Payload writes to Firestore emulator
- [x] Firestore document contains all expected fields
- [x] UTM params captured and persisted
- [x] Debug page shows all session storage keys
- [x] `npm run build` passes with zero errors and warnings
- [x] All routes render correctly

## What is NOT production-ready

This list represents the gap between the current prototype and a production deployment.

### Production blockers

1. **Firestore rules are dev-only** (`firestore.rules` allows `if true` for `asgXLeadSubmissions`)
2. **Direct client-side Firestore writes** — no server-side validation or rate limiting
3. **No authentication or App Check** — public Firestore write endpoint is open
4. **`/debug` route is publicly accessible** — exposes all lead payloads and internal scores
5. **No spam/abuse protection** — quiz can be submitted repeatedly
6. **No server-side submission endpoint** — client trusts the client
7. **No CRM integration** — leads stay in Firestore only
8. **No production Firebase project configured** — emulator-only values in `.env.local.example`
9. **No automated follow-up** — no SMS, email, or task creation
10. **No data retention policy** — when and how are leads deleted or archived?

### Security concerns

- Client-side writes are trivially spoofed. Any person with DevTools can modify the payload before submission.
- `import.meta.env.VITE_*` values are bundled into the client and visible in browser DevTools.
- Firestore API key is exposed in the client bundle even with restricted rules.
- `/debug` exposes all session storage including internal quiz scores.
- Session storage persists across tab navigation but is cleared on tab close — potential data loss if the user closes the tab before the Firestore write completes.

### Privacy / data retention concerns

- Personal information (name, mobile, email) is stored in sessionStorage and Firestore
- No data retention policy defined — how long are leads kept? Who can delete them?
- Consent audit trail exists as a document field but is not in an append-only log
- Consent withdrawal is not implemented
- No GDPR/Privacy Act compliance review has been performed

### Consent / audit requirements

- Consent version tracking is implemented (`1.0.0`) but has no audit trail history
- If consent wording changes, previous submissions cannot be retroactively re-consented
- Referral consent is recorded but the referral process is not implemented
- No mechanism for a user to withdraw consent after submission

### Public form abuse / spam risks

- Quiz can be submitted unlimited times
- No CAPTCHA or bot detection
- No IP-based rate limiting
- No email verification before submission
- AU mobile validation is client-side only

## Recommended production architecture

### Option A — Direct Firestore client write (current path)

**Pros:** Simple, fast to build, already partially working in emulator.

**Cons:**
- Highest abuse risk for public forms
- Requires very strict security rules with field-level validation
- Requires App Check to mitigate client spoofing
- Rate limiting is difficult with client-side writes
- Audit trail relies on client-provided timestamps (untrustworthy)

**Verdict:** Not recommended for final public launch unless App Check is enabled, security rules are battle-tested, and rate limiting is implemented externally.

### Option B — Firebase Functions server-side submission endpoint (recommended)

**Pros:**
- Server-side validation (unspoofable)
- Functions can rate-limit per IP
- Functions can sanitise and transform payload before write
- Easier CRM handoff (Function can call CRM API)
- Better audit trail (server-side timestamps)
- Security rules can deny all client writes (only Function writes)

**Cons:**
- More build work (Functions scaffold, deploy, test)
- Adds a cold-start dependency (Functions need warm-up)

**Verdict:** Recommended for ASG‑x production. Build a single `submitLead` HTTPS callable Function.

### Option C — External backend / API

**Pros:** Maximum flexibility, decoupled from Firebase.

**Cons:** Most build work, needs separate hosting, needs separate auth.

**Verdict:** Useful for Phase 6+ if ASG CRM becomes the primary backend target.

## Minimum go-live checklist

- [ ] Production Firebase project selected and configured
- [ ] `firestore.rules` hardened — deny all client writes, allow only Function writes
- [ ] Firebase App Check enabled for the quiz domain
- [ ] Server-side submission Function implemented and tested
- [ ] Rate limiting on the Function (per IP, per session)
- [ ] `/debug` route removed or gated behind admin authentication
- [ ] Production env vars sourced from a secure config system (not VITE_*)
- [ ] Privacy policy and consent text legally reviewed
- [ ] Referral disclosure finalised
- [ ] CRM field mapping approved by stakeholders
- [ ] Data retention policy confirmed
- [ ] Staging environment smoke-tested end-to-end
- [ ] Firestore security rules reviewed by a second engineer

## No-go checklist

These must NOT be true at go-live:

- [ ] `.env.local` committed to version control
- [ ] `VITE_USE_FIREBASE_EMULATOR=true` in production
- [ ] `firestore.rules` using `allow read, write: if true`
- [ ] `/debug` accessible without authentication
- [ ] Client-side writes to production Firestore
- [ ] Real client data in emulator test documents
- [ ] Internal quiz scores visible in client-facing pages
- [ ] Booking buttons wired without approval
- [ ] SMS/email sent without explicit consent review
