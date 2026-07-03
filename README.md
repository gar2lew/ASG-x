# Amplify X-Change | Property Pathway

**Status:** Vercel preview/demo prototype — pre-production and demo-safe

## What this is

Amplify X-Change by Amplify Solutions Group is opening up its property pathway
education and discovery process to Australians nationwide — combining local
experience with a guided, digital-first experience. The current demo includes
general information about SMSF property considerations and connects users with
the right professional support where required.

This prototype delivers a safe internal-review demo of:

- A premium dark-editorial landing page
- A functional 4-step discovery quiz
- A thank-you page that reads the quiz outcome from `sessionStorage`
- A local-only booking intent step for discovery call preferences
- A gated prototype debug page for local QA
- Supporting pages (FAQ, Privacy Policy, Referral Disclosure)

No production Firebase, CRM, SMS/email automation, real calendar booking,
Calendly, Zoom, or referral workflow is connected.

## Current demo snapshot

- **Current public brand:** Amplify X-Change by Amplify Solutions Group
- **Current campaign:** Amplify X-Change | Property Pathway
- **Demo posture:** Vercel preview/demo mode, pre-production, mock submissions
- **Current content focus:** SMSF-focused property education and enquiry flow
  inside a broader Property Pathway campaign name

### Current route list

| Route | Purpose | Demo behaviour |
|-------|---------|----------------|
| `/` | Landing page | Educational Property Pathway funnel with SMSF-focused residential, commercial, comparison, scenario, calculator, and CTA sections |
| `/quiz` | Discovery quiz | Four-step enquiry quiz using local mock submission handling |
| `/thank-you` | Post-quiz page | Shows enquiry captured, soft outcome, reference ID when available, and next-step CTAs |
| `/book-discovery` | Booking intent | Captures preferred discovery call details in browser `sessionStorage` only |
| `/debug` | Prototype debug panel | Disabled unless `VITE_ASGX_ENABLE_DEBUG=true` |

### What works in Vercel demo mode

- Public Amplify X-Change | Property Pathway campaign pages
- Landing page education sections for residential and commercial pathways
- Residential vs commercial comparison and illustrative scenario cards
- Super vs SMSF Property Scenario Tool using editable local assumptions
- Quiz flow, local outcome calculation, and thank-you routing
- Demo booking intent form saved under `asgXBookingIntent`
- Demo banner when `VITE_ASGX_DEMO_MODE=true`
- Debug route disabled by default for public demo environments

### What remains mocked

- Lead submission persistence outside the browser
- Discovery booking/calendar workflow
- Follow-up process and handoff workflow
- Firebase writes except local emulator testing when explicitly configured
- Scenario calculator outputs, which are illustrative and based only on local assumptions

### What is not connected

- Production Firebase or production Firestore
- CRM systems
- SMS or email automation
- Calendly, Zoom, or any real booking provider
- Referral/introduction workflow
- Production analytics or tracking integrations

### Required Vercel demo env values

```env
VITE_ASGX_SUBMISSION_MODE=mock
VITE_ASGX_DEMO_MODE=true
VITE_ASGX_ENABLE_DEBUG=false
VITE_USE_FIREBASE_EMULATOR=false
```

### Production blockers

- Server-side submission endpoint, validation, consent logging, and abuse controls are not implemented.
- Production Firebase security rules and deployment targets are not configured.
- CRM, booking, SMS, email, analytics, and referral handoff requirements are not approved or connected.
- Privacy, compliance, data retention, and operational review must be completed before handling live enquiries.
- `/debug` must remain disabled or be removed from any public production build.

### Next recommended phase

Plan the production submission and booking architecture before connecting live
services. The likely next step is a Firebase Functions local emulator scaffold
with server-side validation, consent/audit logging, rate limiting, App Check
planning, and production security rules documented before any deployment.

## Tech stack

- **React 18** + **TypeScript**
- **Vite 8** (build tool)
- **Tailwind CSS 4** (utility-first CSS)
- **React Router 6** (client-side routing)
- **React Hook Form** + **Zod** (quiz form & validation)
- **Lucide React** (icons)
- **Google Fonts** (Cormorant Garamond + Montserrat)

## How to run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

## Available routes

| Route                 | Page                   | Status        |
|-----------------------|------------------------|---------------|
| `/`                   | Landing page           | Implemented   |
| `/quiz`               | 4-step discovery quiz  | Implemented   |
| `/thank-you`          | Post-quiz thank you    | Implemented   |
| `/book-discovery`     | Demo booking intent    | Implemented   |
| `/debug`              | Prototype debug panel  | Disabled unless `VITE_ASGX_ENABLE_DEBUG=true` |
| `/faq`                | FAQ page               | Implemented   |
| `/privacy-policy`     | Privacy policy         | Implemented   |
| `/referral-disclosure`| Referral disclosure    | Implemented   |

## What is implemented

- Dark editorial landing page with premium design direction (brass accents,
  glass morphism overlays, premium card treatments, brass corner brackets)
- Expanded SMSF property education sections covering residential and commercial
  pathways, a comparison table, illustrative scenarios, and professional
  support roles
- Local-only illustrative scenario calculator comparing an ordinary super fund
  pathway with an SMSF property pathway using editable assumptions
- 4-step quiz collecting name, contact, SMSF status, super balance, property
  interests, and consent
- Quiz scoring and outcome routing (`explore` / `review` / `not_now`)
- `sessionStorage` persistence (`asgXQuizSubmission`, `asgXQuizOutcome`)
- Local booking intent capture in `sessionStorage` under `asgXBookingIntent`
- Demo banner when `VITE_ASGX_DEMO_MODE=true`
- Debug gating: `/debug` shows a safe disabled message unless explicitly enabled
- Australian mobile number validation
- Responsive layout across mobile, tablet, and desktop

## What is mocked / placeholder

- **Hero video background**: Currently a CSS gradient with a comment describing
  the future asset (line ~147 in `LandingPage.tsx`)
- **Service image cards**: Professional-category placeholders with letter
  monograms and clear `aria-label` descriptions (line ~308 in `LandingPage.tsx`)
- **Scenario calculator**: Uses React local state only. Results are illustrative,
  based on editable assumptions, and are not stored or sent anywhere.
- **Booking step**: `/book-discovery` saves preferred discovery call details to
  `sessionStorage` only. No booking provider, calendar event, email, SMS, Zoom,
  Calendly, CRM, or external API is connected.
- **Firebase / Firestore**: Available only through the local emulator scaffold
  when explicitly enabled with local env vars. Production Firebase is not
  connected.
- **Submission adapter**: Mock mode is the default
  (`src/lib/submissionAdapter.ts`). It builds a future-ready payload and stores
  it in `sessionStorage`. No CRM or production Firebase writes occur.

## Phase 3A — Local submission data model

A typed data model and local mock submission adapter have been implemented:

### Data model (`src/types/asgx.ts`)
- `AsgXQuizSubmission` — Raw quiz data as produced by the form
- `AsgXQuizOutcome` — `'explore'` | `'review'` | `'not_now'`
- `AsgXConsent` — Structured consent record with version + timestamp
- `AsgXUtmData` — UTM campaign tracking fields
- `AsgXLeadPayload` — Future-ready payload for CRM/Firebase
- `AsgXSubmissionStatus` — Result of a submission attempt

### UTM helper (`src/lib/utm.ts`)
- Reads `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
  from the current URL
- Persists to `sessionStorage` under `asgXUtmData`
- Returns stored UTM data if URL params are absent (e.g. on page navigation)

### Submission adapter (`src/lib/submissionAdapter.ts`)
- `buildAndSaveLeadPayload(submission)` builds an `AsgXLeadPayload` from quiz
  data, outcome, score, consent, and UTM data
- Saves to `sessionStorage` under `asgXLeadPayload`
- Returns a clear `AsgXSubmissionStatus` with `localSubmissionId`, timestamp,
  and prototype-aware message
- No Firebase, CRM, or external API calls

### Session storage keys
| Key | Contents |
|-----|----------|
| `asgXQuizSubmission` | Raw quiz form data + score + outcome |
| `asgXQuizOutcome` | Outcome string (`explore` / `review` / `not_now`) |
| `asgXLeadPayload` | Future-ready lead payload (contacts, quiz, consent, UTM, meta) |
| `asgXUtmData` | UTM parameters from URL or previously stored |
| `asgXLeadPayloadValidation` | Pre-submission validation result (errors + warnings) |
| `asgXFirestoreResult` | Firestore emulator write result (firebase mode only) |
| `asgXBookingIntent` | Demo-only preferred discovery call details |

## Phase 3B — Integration readiness and debug visibility

### Payload validation (`src/lib/leadPayloadValidation.ts`)
Validates every `AsgXLeadPayload` before it would be submitted:
- lead source is `asg_x_smsf`
- createdAt and consent timestamps are present
- All 5 consent acknowledgements are `true`
- quizOutcome is a known value
- Contact fields are non-empty
- UTM object exists (warns if missing)
- quizScore is present but internal (warning)

Returns `{ valid, errors[], warnings[] }`. No external dependencies.

### Submission adapter updated
`buildAndSaveLeadPayload()` now:
1. Builds the payload
2. Validates it via `validateLeadPayload`
3. Saves validation result to `asgXLeadPayloadValidation`
4. Returns `success: false` with errors if validation fails

### Debug page (`/debug`)
- Accessible at `/debug` only when `VITE_ASGX_ENABLE_DEBUG=true`
- Shows "Debug view is disabled for this environment." when debug is off
- Displays prototype sessionStorage keys as formatted JSON sections
- Includes "Clear all Amplify X-Change data" button to reset session storage
- Yellow warning banner: "Prototype debug view only. Do not expose publicly in production"
- Styled with the dark Amplify X-Change theme
- Not linked from public-facing pages

### Documentation
- `docs/asg-x-crm-field-map.md` — Complete field mapping from local payload to CRM and Firestore, consent log schema, follow-up tasks, privacy notes, open questions
- `docs/asg-x-integration-plan.md` — 6-stage adapter evolution plan (mock → firebase → CRM → automation → booking), feature flag approach, security considerations, rollback plan

## What should NOT be connected yet

- Firebase / Firestore database
- CRM systems (no CRM records should be created)
- Calendly, Zoom, or any real booking provider
- SMS or email automation
- Any external API that sends or stores user data
- Real referral/introduction workflows
- Google Analytics or any tracking beyond basic cookie-less operation

## Next recommended phase

1. **Phase 3C — Firebase integration**: Wire Firestore for quiz submission
   persistence using the existing stubs in `src/lib/firebase.ts` and
   `src/lib/leadSubmission.ts`. The `AsgXLeadPayload` data model is ready to
   map directly into Firestore documents.
2. **Phase 3D — Booking integration**: Wire "Book a discovery call" buttons to
   a calendar/booking provider (e.g. Calendly, HubSpot, or custom).
3. **Phase 3E — Admin dashboard**: Build an internal view for submitted
   enquiries.
4. **Phase 3F — Production hardening**: Add rate limiting, CSP headers,
   CSRF protection, and proper environment-variable management before deploying.

## Phase 4A — Firebase emulator scaffold

### Submission modes
Two submission modes via `VITE_ASGX_SUBMISSION_MODE`:

| Mode | Default | Behaviour |
|------|---------|-----------|
| `mock` | **Yes** | Local sessionStorage only. No external calls. |
| `firebase` | No | Requires valid config + emulator running. Writes to Firestore. |

**Mock remains the default.** Firebase mode will not activate unless explicitly
configured with `.env` variables and `VITE_USE_FIREBASE_EMULATOR=true`.

### Env variables
See `.env.example` for the full template. Key variables:

- `VITE_ASGX_SUBMISSION_MODE` — `"mock"` (default) or `"firebase"`
- `VITE_ASGX_ENABLE_DEBUG` — set to `"true"` only for local QA/debug sessions
- `VITE_ASGX_DEMO_MODE` — set to `"true"` for the subtle demo preview banner
- `VITE_FIREBASE_API_KEY` through `VITE_FIREBASE_APP_ID` — Firebase config
- `VITE_USE_FIREBASE_EMULATOR` — set to `"true"` only for local emulator connection

No real `.env` file exists. No secrets are hardcoded.

### New files

| File | Purpose |
|------|---------|
| `.env.example` | Environment variable template (no secrets) |
| `src/lib/firebaseClient.ts` | Firebase app/db initialisation with emulator support, fails safely if config missing |
| `src/lib/submissionMode.ts` | Reads `VITE_ASGX_SUBMISSION_MODE`, returns `"mock"` or `"firebase"` |
| `src/lib/firestoreSubmissionAdapter.ts` | Prepares Firestore document from `AsgXLeadPayload`, writes to `asgXLeadSubmissions` collection (emulator only) |
| `docs/asg-x-firebase-emulator-plan.md` | Emulator setup guide, document shape, security rules, production blockers, rollback |

### Firebase emulator safeguards
- `firebaseClient.ts` checks `hasFirebaseConfig()` before initialising
- `firestoreSubmissionAdapter.ts` requires `isFirebaseAvailable()` before writing
- Both return safe failure results if config is missing or emulator is down
- Production Firestore writes are **not possible** without explicit env config
- The existing mock adapter (`submissionAdapter.ts`) is unchanged in mock mode
- All existing debug tools, session storage keys, and sample payloads are preserved

## Phase 4B — Emulator wiring and smoke test preparation

### Firebase emulator project files

| File | Purpose |
|------|---------|
| `firebase.json` | Emulator config: Firestore on `8080`, UI on `4000` |
| `firestore.rules` | Dev-only rules (allow everything for `asgXLeadSubmissions`) |
| `firestore.indexes.json` | Empty indexes file |

These files support local emulator testing. They contain no deploy targets.
The emulator rules are intentionally permissive — they are NOT production-safe.

### Local env override

`.env.local.example` provides demo-safe values for emulator testing:

```powershell
copy .env.local.example .env.local
```

This file is in `.gitignore` and will not be committed.

### How to run mock mode (default)

No configuration needed. Just run:

```powershell
npm run dev
```

All submissions stay in `sessionStorage`. No Firebase involved.

### How to run Firebase emulator mode

```powershell
copy .env.local.example .env.local
npm run emulators      # Terminal 1 — start Firestore emulator
npm run dev            # Terminal 2 — start Vite
```

Then complete a quiz. The submission will write to the local Firestore emulator.
Check the Emulator UI at `http://127.0.0.1:4000`.

### Submission flow in firebase mode

1. Quiz submits → `saveAndNavigate()`
2. Quiz submission + outcome saved to `sessionStorage`
3. `buildAndSaveLeadPayload()` builds `AsgXLeadPayload`
4. Validation runs via `validateLeadPayload()`
5. Payload saved to `sessionStorage` (always, both modes)
6. `submitToFirestore()` attempts emulator write
7. Firestore result saved to `asgXFirestoreResult`
8. `navigate('/thank-you')`

### Smoke test

Full step-by-step instructions: `docs/asg-x-firebase-emulator-smoke-test.md`

### Production rollout blockers

All Phase 4A blockers remain in place. Additionally:

- `firestore.rules` must be replaced with production security rules
- `emulatorOnly: true` marker must be audited before production
- `.env.local.example` uses demo values — never use with production Firebase
- `npm run emulators` script must not exist in production deployments

## Phase 4C — Emulator smoke test and hardening

### Changes
- **`.env.local`** created from `.env.local.example` — ignored by `.gitignore`
- **Debug page** now shows `asgXFirestoreResult` with copy/download buttons
- **Clear-all** now wipes `asgXFirestoreResult` alongside other keys

### Smoke test status
The emulator must be started manually:

```powershell
# Terminal 1
npm run emulators

# Terminal 2
npm run dev
```

Then complete the quiz in firebase mode and verify:
- `asgXFirestoreResult` visible on `/debug` with `success: true` and `firestoreDocId`
- Firestore emulator UI shows one document in `asgXLeadSubmissions`
- Document includes `sourceKey: "asg_x_smsf"`, `emulatorOnly: true`, `submissionMode: "firebase"`

### How to verify asgXFirestoreResult
Visit `/debug` after quiz submission. The 3rd section displays the Firestore write result.

### Known limitations
- Emulator must be started manually in a separate terminal
- `/debug` route must be removed before production deployment
- Firestore doc ID visible in debug — do not expose in production
- UTM test URL: `/quiz?utm_source=test&utm_medium=cpc&utm_campaign=asg_x_smsf_test&utm_content=hero&utm_term=smsf_property`

## Phase 5A — Production readiness review

### Documentation created

| File | Purpose |
|------|---------|
| `docs/asg-x-production-readiness-review.md` | Full production readiness analysis: what is proven, what is not ready, 3 architecture options, minimum go-live checklist, no-go checklist |
| `docs/asg-x-go-live-blockers.md` | 25+ blocker checklist across critical, technical, compliance, and operational categories |
| `docs/asg-x-phase-5b-functions-plan.md` | Firebase Functions scaffold plan: function structure, validation, audit log, rate limiting, App Check, deployment blockers |

### Recommended production architecture

**Option B — Firebase Functions server-side endpoint (recommended)**

- Frontend calls a `submitLead` HTTPS callable Function
- Function validates payload server-side (unspoofable)
- Function writes to Firestore with server timestamps
- Function logs an immutable consent audit entry
- Function can later trigger CRM/email/SMS workflows
- Security rules deny all direct client writes — only the Function writes

**Options A (direct client write) and C (external API) are documented and deferred.**

### Key warnings

- Current `firestore.rules` are **emulator-only**. Do not deploy to production.
- Production Firebase is **not connected**. All env values are demos/placeholders.
- `/debug` is **prototype-only**. Must be removed or gated before production.
- Firebase mode (`VITE_ASGX_SUBMISSION_MODE=firebase`) is **emulator-only**.
- No secrets exist in any committed file.

### Next recommended phase

Phase 5B: Firebase Functions local emulator scaffold (documented in `docs/asg-x-phase-5b-functions-plan.md`), if approved.

## Phase 5A-Demo — Vercel preview funnel

### Preview status

The deployed Vercel build is for visual/demo review only. The safe default
submission mode is `mock`, so quiz submissions stay in browser
`sessionStorage`. The app builds without `.env.local`.

Recommended Vercel preview variables:

```env
VITE_ASGX_SUBMISSION_MODE=mock
VITE_ASGX_DEMO_MODE=true
VITE_ASGX_ENABLE_DEBUG=false
VITE_USE_FIREBASE_EMULATOR=false
```

### Demo flow

1. `/` — Landing page with "Start online enquiry" and "Book a discovery call"
   CTAs.
2. `/quiz` — Four-step enquiry quiz with local mock submission.
3. `/thank-you` — Soft outcome, local reference ID when available, public-safe
   next-step copy, and a booking CTA.
4. `/book-discovery` — Demo-only booking intent form saved under
   `asgXBookingIntent`.
5. `/debug` — Disabled unless `VITE_ASGX_ENABLE_DEBUG=true`.

### What works in demo

- Landing page CTAs route to the intended demo pages.
- Quiz submission stores local quiz, outcome, validation, UTM, and lead payload
  state in `sessionStorage`.
- Thank-you page shows the soft outcome, local reference ID if available, and
  booking status without exposing the internal score.
- Booking intent form captures name, email, mobile, preferred day, preferred
  time window, and notes locally.
- Demo banner appears when `VITE_ASGX_DEMO_MODE=true`.

### What is still mocked

- Submission persistence outside the browser
- Booking and calendar workflow
- Follow-up process
- Partner handoff process
- Firebase Firestore outside local emulator testing

### What is not connected

- Production Firebase
- CRM
- SMS or email automation
- Calendly, Zoom, or real calendar booking
- Real referral/introduction workflow
- Production analytics or tracking integrations

### Next recommended production-readiness phase

Proceed to Phase 5B only after approval: build a Firebase Functions local
emulator scaffold with server-side validation, audit logging, rate limiting,
App Check planning, and production security rules documented before any live
integration work.

### Session storage keys
| Key | Contents |
|-----|----------|
| `asgXQuizSubmission` | Raw quiz form data + score + outcome |
| `asgXQuizOutcome` | Outcome string (`explore` / `review` / `not_now`) |
| `asgXLeadPayload` | Future-ready lead payload |
| `asgXLeadPayloadValidation` | Pre-submission validation result |
| `asgXFirestoreResult` | Firestore emulator write result (firebase mode only) |
| `asgXUtmData` | UTM parameters from URL or previously stored |
| `asgXBookingIntent` | Demo-only preferred discovery call details |

## Phase 3C — Prototype hardening, fixtures, and QA

### Debug export/copy tools (`/debug`)
- **Copy JSON** button on each section — copies formatted JSON to clipboard
- **Download JSON** button on each section — downloads `.json` file
- "Copied" feedback indicator (green checkmark, auto-dismisses after 2s)
- Refresh and Clear buttons retained from Phase 3B

### Sample payload fixtures
Three realistic example payloads in `docs/sample-payloads/`:
- `explore-payload.example.json` — SMSF owner, $500k+ combined, commercial property, score 88
- `review-payload.example.json` — unsure about SMSF, $200-300k, residential, score 52
- `not-now-payload.example.json` — no SMSF, under $100k, part-time, research only, score 22

All use fake data. No real client information.

### E2E manual QA checklist
`docs/asg-x-e2e-manual-test.md` — 13 test sections covering:
- Landing page rendering
- CTA link routing
- Quiz steps 1–4 validation
- Submit and thank-you page
- SessionStorage key creation
- Debug page (copy, download, refresh, clear)
- UTM capture with test URL
- Mobile smoke test
- Compliance wording sweep
- Build verification

### Compliance search
Manual PowerShell command documented in Development notes below.
No npm script added (avoids dependencies).

### UTM test URL
```
/quiz?utm_source=test&utm_medium=cpc&utm_campaign=asg_x_smsf_test&utm_content=hero&utm_term=smsf_property
```

## Development notes

- `npm run build` produces production output in `dist/`
- All interactive elements have visible focus states (brass-gold outline)
- Copy has been swept for compliance — no risk-prohibited wording
- Google Fonts are loaded via `@import` in `src/index.css`
- The Tailwind theme is extended with Open Design color tokens in `src/index.css`

### Compliance search (PowerShell)

```powershell
Get-ChildItem -Path "src" -Recurse -Include *.ts,*.tsx,*.css,*.md |
  Select-String -Pattern "ATO loophole|You qualify|Approved|Guaranteed returns|Use your super now|Best investment strategy|Tax-free wealth|Retire rich|Elevate your wealth|Strategic acquisition|High-net-worth|Financial levers"
```

Expected output: **no matches found**.
