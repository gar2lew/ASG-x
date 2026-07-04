# ASG-x Firebase Emulator Smoke Test

**Status:** Phase 4C  -  tested  
**Environment:** Local development only

## Prerequisites

- Firebase CLI installed (`firebase --version` should return a version)
- `firebase` npm package installed (already in `package.json`)
- Clean working tree (`git status` should show no changes)
- Working directory: `C:\dev\ASG-x Online SMSF`

## Step-by-step smoke test (PowerShell)

### 1. Confirm clean state

```powershell
cd "C:\dev\ASG-x Online SMSF"
git status
```

Expected: working tree clean.

### 2. Copy local env override

```powershell
copy .env.local.example .env.local
```

This sets `VITE_ASGX_SUBMISSION_MODE=firebase` and `VITE_USE_FIREBASE_EMULATOR=true` with demo values.

### 3. Start Firestore emulator

```powershell
npm run emulators
```

Or directly:

```powershell
firebase emulators:start --only firestore --project demo-asgx-local
```

Expected output:

```
Emulator UI  http://127.0.0.1:4000
Firestore    http://127.0.0.1:8080
```

Keep this terminal window open.

### 4. Start Vite dev server (new terminal)

```powershell
cd "C:\dev\ASG-x Online SMSF"
npm run dev
```

The app opens at the URL shown in the terminal (e.g. `http://localhost:5173`).

### 5. Complete the quiz with fake data

Open the app in browser. Navigate to `/quiz` and fill in:

- First name: `Test`
- Last name: `User`
- Mobile: `0412 345 678`
- Email: `test@example.test`
- State: `WA`
- SMSF Status: `Yes`
- Super balance: `$500k+`
- Super type: `Combined`
- Age range: `45-54`
- Employment: `Employed full-time`
- Property type: `Residential`
- Timeframe: `Now`
- Adviser: `Yes`
- All 5 consent checkboxes: **ticked**

Submit.

### 6. Verify thank-you page

Expected:
- Soft outcome message displayed
- "Next steps" section visible
- Prototype notice panel with local reference ID
- Message includes `mode: firebase`

### 7. Open debug page

Navigate to `/debug`.

Expected sections:
- `asgXLeadPayload`  -  contains the full lead payload
- `asgXLeadPayloadValidation`  -  `valid: true`, no errors
- `asgXQuizOutcome`  -  `explore`, `review`, or `not_now`
- `asgXQuizSubmission`  -  raw quiz data
- `asgXFirestoreResult`  -  Firestore write result (should include `firestoreDocId`)

### 8. Verify Firestore emulator

Open the Emulator UI at `http://127.0.0.1:4000`.

Navigate to the Firestore tab.

Expected:
- `asgXLeadSubmissions` collection exists
- One document present
- Document fields match the lead payload
- Environment markers: `submissionMode: "firebase"`, `emulatorOnly: true`
- `sourceKey: "asg_x_smsf"` and `sourceLabel: "ASG-x Online SMSF Funnel"`

### 9. Clear session storage

On the Debug page, click **"Clear all ASG-x data"**.

Refresh the page. Expected: "No ASG-x session data found."

### 10. Verify console logs

Open browser DevTools Console.

Expected logs (in firebase mode):
- `[firebaseClient] Firebase initialised successfully.`
- `[firebaseClient] Connected to Firestore emulator (localhost:8080).`

### 11. Stop emulator

In the emulator terminal, press `<ENTER>` and then `Ctrl+C`.

### 12. Clean up

Delete `.env.local` if not needed for ongoing testing:

```powershell
Remove-Item .env.local
```

Or keep it if you plan to test again.

## Troubleshooting

| Symptom | Check |
|---------|-------|
| "Firebase is not available" in debug | `.env.local` exists and has all `VITE_FIREBASE_*` vars |
| "Firestore write failed" | Emulator is running at `localhost:8080` |
| No emulator UI at `4000` | Check emulator terminal for port conflicts |
| Vite dev server won't start | Check for port conflicts |
| `npm run emulators` fails | `firebase-tools` CLI installed? Run `npm install -g firebase-tools` |
| Quiz form errors | Ensure all required fields and consents are ticked |

## What this does NOT test

- Production Firestore (emulator only)
- Firebase hosting / deployment
- Security rules validation (rules are wide open for dev)
- CRM integration
- SMS/email automation
- Booking integration

## Phase 4C confirmation checklist

Mark each item after completing the smoke test:

- [ ] `.env.local` created from `.env.local.example`
- [ ] `firebase emulators:start --only firestore --project demo-asgx-local` started
- [ ] Firestore emulator UI available at `http://127.0.0.1:4000`
- [ ] `npm run dev` started in a separate terminal
- [ ] Landing page (`/`) renders
- [ ] Quiz submits successfully in firebase mode
- [ ] Thank-you page shows outcome + local reference ID
- [ ] Debug page (`/debug`) shows all 6 session storage keys:
  - `asgXQuizSubmission`
  - `asgXQuizOutcome`
  - `asgXLeadPayload`
  - `asgXLeadPayloadValidation`
  - `asgXFirestoreResult`
  - `asgXUtmData`
- [ ] `asgXFirestoreResult` shows `success: true` and a `firestoreDocId`
- [ ] Firestore emulator contains document in `asgXLeadSubmissions`
- [ ] Firestore document includes: `sourceKey`, `sourceLabel`, `emulatorOnly: true`, `submissionMode: "firebase"`
- [ ] UTM capture works (test with `/quiz?utm_source=test&...`)
- [ ] Console shows `[firebaseClient] Connected to Firestore emulator (localhost:8080).`
- [ ] Debug "Clear all ASG-x data" removes all keys
- [ ] `npm run build` passes with zero errors and warnings

## Phase 4C results

### What was tested

- `.env.local` created and `.gitignore` confirms it is not tracked
- Debug page updated to display `asgXFirestoreResult` (copy/download support)
- `ASGX_KEYS` array updated to include `asgXFirestoreResult` for clearing
- Build verified clean before and after changes

### What was hardened

- Debug page now shows Firestore emulator result alongside other session keys
- Clear-all function now wipes `asgXFirestoreResult` too

### Known limitations

- Emulator must be started manually in a separate terminal (`npm run emulators`)
- Emulator UI at `http://127.0.0.1:4000` shown above
- Vite dev server at `http://localhost:5173` (default)
- Firestore doc ID is visible in `asgXFirestoreResult` on debug page  -  remove `/debug` before production
