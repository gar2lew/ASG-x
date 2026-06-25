# ASG‑x Online SMSF Property Pathway

**Status:** Frontend prototype — pre-integration

## What this is

ASG‑x by Amplify Solutions Group is an online‑first enquiry and discovery pathway
designed to help Australians understand the general process, risks, costs, and
professional support involved in SMSF property investment.

This prototype delivers:

- A premium dark-editorial landing page
- A functional 4-step discovery quiz
- A thank-you page that reads the quiz outcome from `sessionStorage`
- Supporting pages (FAQ, Privacy Policy, Referral Disclosure)

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
| `/debug`              | Prototype debug panel  | Implemented   |
| `/faq`                | FAQ page               | Implemented   |
| `/privacy-policy`     | Privacy policy         | Implemented   |
| `/referral-disclosure`| Referral disclosure    | Implemented   |

## What is implemented

- Dark editorial landing page with premium design direction (brass accents,
  glass morphism overlays, premium card treatments, brass corner brackets)
- 4-step quiz collecting name, contact, SMSF status, super balance, property
  interests, and consent
- Quiz scoring and outcome routing (`explore` / `review` / `not_now`)
- `sessionStorage` persistence (`asgXQuizSubmission`, `asgXQuizOutcome`)
- Australian mobile number validation
- Responsive layout across mobile, tablet, and desktop

## What is mocked / placeholder

- **Hero video background**: Currently a CSS gradient with a comment describing
  the future asset (line ~147 in `LandingPage.tsx`)
- **Service image cards**: Professional-category placeholders with letter
  monograms and clear `aria-label` descriptions (line ~308 in `LandingPage.tsx`)
- **"Book a discovery call" buttons**: All are `<button type="button">`
  placeholders with `aria-label`. No booking integration wired.
- **Firebase / Firestore**: Stubbed in `src/lib/firebase.ts` and
  `src/lib/leadSubmission.ts` with TODO comments. Not connected.
- **Submission adapter**: Local mock only (`src/lib/submissionAdapter.ts`).
  Builds a future-ready payload and stores it in `sessionStorage`. No external
  API calls, no CRM, no Firebase.

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
- Accessible at `/debug` — **for prototype use only**
- Displays all 5 sessionStorage keys as formatted JSON sections
- Includes "Clear all ASG‑x data" button to reset session storage
- Yellow warning banner: "Prototype debug view only. Do not expose publicly in production"
- Styled with the dark ASG‑x theme
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
- `VITE_FIREBASE_API_KEY` through `VITE_FIREBASE_APP_ID` — Firebase config
- `VITE_USE_FIREBASE_EMULATOR` — set to `"true"` for emulator connection

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

### Session storage keys (all 6)
| Key | Contents |
|-----|----------|
| `asgXQuizSubmission` | Raw quiz form data + score + outcome |
| `asgXQuizOutcome` | Outcome string (`explore` / `review` / `not_now`) |
| `asgXLeadPayload` | Future-ready lead payload |
| `asgXLeadPayloadValidation` | Pre-submission validation result |
| `asgXFirestoreResult` | Firestore emulator write result (firebase mode only) |
| `asgXUtmData` | UTM parameters from URL or previously stored |

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
