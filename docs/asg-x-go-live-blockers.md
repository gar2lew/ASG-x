# ASG-x Go-Live Blocker Checklist

**Status:** Phase 5A  
**Purpose:** Track blockers that must be resolved before production Firebase rollout

## Critical blockers (must resolve)

- [ ] **Production security rules not finalised.** Current `firestore.rules` uses `allow read, write: if true`  -  development only.
- [ ] **Server-side submission endpoint not implemented.** Client-side writes are vulnerable to spoofing and abuse.
- [ ] **Spam / rate limiting not implemented.** Quiz can be submitted unlimited times with no bot protection.
- [ ] **Firebase App Check not reviewed.** No protection against non-browser Firestore access.
- [ ] **`/debug` route not protected or removed.** Exposes all lead payloads, internal scores, and session storage.
- [ ] **Privacy policy and consent text not legally reviewed.** Current wording is draft only.
- [ ] **Referral disclosure not approved by compliance.** Current wording is draft only.
- [ ] **CRM field mapping not confirmed by the receiving team.** Current mapping is proposed only.
- [ ] **Data retention policy not confirmed.** No defined lifecycle for stored leads.
- [ ] **Production Firebase project not selected.** Only demo project (`demo-asgx-local`) used.
- [ ] **Real booking process not approved.** "Book a discovery call" is a placeholder.
- [ ] **Follow-up ownership not assigned.** Who responds to new leads? What SLAs apply?

## Technical blockers

- [ ] **Firebase Functions not implemented.** Server-side validation, write, and rate limiting needed.
- [ ] **Production env vars not sourced from secure config.** `VITE_*` values are public in the client bundle.
- [ ] **Client-side write path must be removed.** Production must route through a server-side endpoint.
- [ ] **`VITE_USE_FIREBASE_EMULATOR` must be absent from production.** Emulator mode must not activate in production.
- [ ] **`emulatorOnly: true` marker must be removed from production Firestore documents.**
- [ ] **Firestore security rules must deny all direct client writes.**
- [ ] **Consent audit log must be append-only with server-side timestamps.**

## Compliance / legal blockers

- [ ] **Consent wording reviewed by privacy/legal.**
- [ ] **Referral disclosure reviewed by compliance.**
- [ ] **Australian Privacy Act 1988 obligations reviewed.**
- [ ] **Spam Act 2003 obligations reviewed (SMS/email consent).**
- [ ] **Data breach response plan documented.**
- [ ] **Consent withdrawal mechanism designed (not necessarily implemented, but planned).**

## Operational blockers

- [ ] **Lead assignment process defined.** Round-robin? Manual? Territory-based?
- [ ] **Lead response SLA defined.** How quickly should a new lead be contacted?
- [ ] **Nurture / follow-up cadence defined.** What happens after first contact?
- [ ] **CRM pipeline stages agreed with the operations team.**
- [ ] **Staging environment provisioned for pre-production testing.**

## Nice-to-have (not blockers, but should be tracked)

- [ ] Email verification before submission
- [ ] CAPTCHA / bot detection
- [ ] Admin dashboard for lead viewing
- [ ] Export-to-CSV for leads
- [ ] Automated lead scoring refinement
- [ ] A/B testing framework for quiz questions
