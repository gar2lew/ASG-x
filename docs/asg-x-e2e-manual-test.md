# ASG‑x End-to-End Manual QA Checklist

**Version:** Phase 3C  
**Date:** June 2026  
**Tester:** ____________

Run through each test case on a fresh browser tab (or after clearing ASG‑x session storage via `/debug`).

---

## 1. Landing page

- [ ] Landing page loads at `/`
- [ ] Hero section renders with headline, lead text, and glass panel
- [ ] Two CTA buttons visible: "Start online enquiry" and "Book a discovery call"
- [ ] Trust badges visible below CTAs
- [ ] Framework (4-card) section renders below hero
- [ ] Who this may suit / may not suit section renders
- [ ] Professional support network (8-card) section renders
- [ ] About / Stats section renders
- [ ] Risks & Transparency disclosure panel renders
- [ ] Final CTA frame renders at bottom
- [ ] FAQ section renders with accordion
- [ ] Brass divider + compliance footer renders

## 2. CTA verification

- [ ] "Start online enquiry" in hero routes to `/quiz`
- [ ] "Start online enquiry" in final CTA routes to `/quiz`
- [ ] "Book a discovery call" in hero is a placeholder button (no navigation)
- [ ] "Book a discovery call" in final CTA is a placeholder button (no navigation)
- [ ] "View all FAQs" link routes to `/faq`
- [ ] Header nav links ("Home", "Enquiry", "FAQ") all route correctly

## 3. Quiz — Step 1 (Basic Details)

Navigate to `/quiz`:

- [ ] Step 1 displays: First name, Last name, Mobile, Email, State, Best time
- [ ] Pressing "Next" with empty fields shows inline validation errors
- [ ] Entering an invalid mobile (e.g. `abc`) shows mobile format error
- [ ] Entering an invalid email (e.g. `notanemail`) shows email format error
- [ ] All fields valid → advances to Step 2
- [ ] Progress bar updates to Step 2 of 4

## 4. Quiz — Step 2 (SMSF Status)

- [ ] Step 2 displays: SMSF status radio, Super balance dropdown, Super balance type radio, Age range, Employment status
- [ ] Pressing "Next" with empty fields shows inline validation errors
- [ ] All fields valid → advances to Step 3
- [ ] "Previous" button returns to Step 1
- [ ] Progress bar updates to Step 3 of 4

## 5. Quiz — Step 3 (Property Intent)

- [ ] Step 3 displays: Property type radio, Preferred area text, Timeframe dropdown, Adviser status radio
- [ ] Preferred area rejects text >100 characters
- [ ] All fields valid → advances to Step 4
- [ ] "Previous" button returns to Step 2

## 6. Quiz — Step 4 (Consent)

- [ ] Step 4 displays: 5 consent checkboxes
- [ ] Pressing "Submit enquiry" with unchecked boxes shows inline errors
- [ ] All 5 checkboxes checked → form submits
- [ ] Compliance note visible at bottom

## 7. Submission and thank-you page

- [ ] After submit, redirected to `/thank-you`
- [ ] Thank-you page shows soft outcome message (not the raw score or label)
- [ ] "Next steps" section renders
- [ ] Booking placeholder button renders
- [ ] Prototype notice panel renders with submission ID
- [ ] Compliance disclaimer renders
- [ ] "Return home" link routes to `/`

## 8. SessionStorage verification

Open browser DevTools → Application → Session Storage:

- [ ] `asgXQuizSubmission` exists and contains quiz data
- [ ] `asgXQuizOutcome` is `explore`, `review`, or `not_now`
- [ ] `asgXLeadPayload` exists and contains the full payload
- [ ] `asgXLeadPayloadValidation` exists and shows `valid: true`
- [ ] `asgXUtmData` exists (may be empty `{}` if no UTM params)

## 9. Debug page (`/debug`)

Navigate to `/debug`:

- [ ] Yellow warning banner: "Prototype debug view only…"
- [ ] All 5 sections display (LeadPayload, Validation, UTM, Outcome, Submission)
- [ ] Each section shows formatted JSON
- [ ] "Copy" button copies JSON to clipboard (check via paste)
- [ ] "Copied" feedback shows briefly after clicking Copy
- [ ] "Download" button downloads a `.json` file
- [ ] "Refresh" button re-reads session storage
- [ ] "Clear all ASG‑x data" button removes all 5 keys (verify in DevTools)
- [ ] After clearing, "No ASG‑x session data found" message shows
- [ ] Footer: "This panel exists for local development and QA only."

## 10. UTM capture

Open a new tab (to clear session) and navigate to:

```
/quiz?utm_source=test&utm_medium=cpc&utm_campaign=asg_x_smsf_test&utm_content=hero&utm_term=smsf_property
```

- [ ] Complete the quiz
- [ ] Navigate to `/debug`
- [ ] `asgXUtmData` section shows all 5 UTM values
- [ ] `asgXLeadPayload.utm` matches the UTM values

## 11. Mobile smoke test

Open on a mobile viewport (375px width in DevTools):

- [ ] Landing page hero text is readable (no cutoff)
- [ ] CTA buttons stack vertically
- [ ] 4-card framework grid shows 1 column
- [ ] 8-card service grid shows 1 column
- [ ] Quiz form fields are full-width and tap-friendly
- [ ] Thank-you page is readable
- [ ] Debug page pre blocks scroll horizontally

## 12. Compliance wording sweep

Run the compliance search command (see README):

```
Find-String -Path "src" -Pattern "ATO loophole|You qualify|Approved|Guaranteed returns|Use your super now|Best investment strategy|Tax-free wealth|Retire rich|Elevate your wealth|Strategic acquisition|High-net-worth|Financial levers" -AllMatches | Select-Object -Unique
```

- [ ] No prohibited terms found in `src/`

## 13. Build check

- [ ] `npm run build` completes with zero errors
- [ ] `npm run build` completes with zero warnings

---

**QA sign-off:**

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Developer | | | |
| Reviewer | | | |
