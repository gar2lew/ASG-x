# Amplify X-Change Demo QA Checklist

Manual QA checklist for the Amplify X-Change | Property Pathway demo by
Amplify Solutions Group. The current demo includes SMSF-focused property
education and enquiry flow, while the public campaign naming is broader.

## Demo Settings

- [ ] Vercel env values are confirmed for preview/demo mode:
  - `VITE_ASGX_SUBMISSION_MODE=mock`
  - `VITE_ASGX_DEMO_MODE=true`
  - `VITE_ASGX_ENABLE_DEBUG=false`
  - `VITE_USE_FIREBASE_EMULATOR=false`
- [ ] Confirm no production Firebase, CRM, SMS, email, calendar, booking, or referral integration is connected.
- [ ] Confirm demo banner appears when `VITE_ASGX_DEMO_MODE=true`.

## Route Behaviour

- [ ] `/` renders the landing page.
- [ ] `/quiz` renders the four-step discovery quiz.
- [ ] `/thank-you` renders the enquiry captured page.
- [ ] `/book-discovery` renders the demo booking intent form.
- [ ] `/debug` shows the disabled message unless `VITE_ASGX_ENABLE_DEBUG=true`.
- [ ] All "Start online enquiry" CTAs route to `/quiz`.
- [ ] All "Explore the pathway" CTAs route to `/quiz`.
- [ ] All booking CTAs route to `/book-discovery`.

## Landing Page

- [ ] Brand name appears as Amplify X-Change by Amplify Solutions Group.
- [ ] Property Pathway naming appears as Amplify X-Change | Property Pathway or Property Pathway.
- [ ] Landing page uses the premium dark editorial style with brass/gold accents.
- [ ] Hero visual impact is strong in the first fold: larger header logo, dark navy/black background, brass/gold glow, premium hero card, clear CTAs, and trust/value badges.
- [ ] Header logo renders from `/brand/amplify-xchange-wordmark.svg` with alt text `Amplify X-Change by Amplify Solutions Group`.
- [ ] Footer wordmark renders and footer AX mark loads.
- [ ] Favicon loads from `/brand/ax-icon.svg` and the browser console does not show a missing `/favicon.ico` error on a fresh page load.
- [ ] Primary CTAs are visible, keyboard accessible, and route correctly.
- [ ] General information and not-personal-advice wording is visible.

## Education Sections

- [ ] Residential property pathway section explains rule awareness, related-party restrictions, member-use limits, borrowing, costs, liquidity, insurance, administration, and professional review.
- [ ] Commercial property pathway section explains different considerations, business real property rules, lease arrangements, cash flow, vacancy, tenant risk, lending, and compliance review.
- [ ] Residential vs commercial comparison section covers typical use case, key restrictions, cash flow, borrowing, related-party considerations, and professional support.
- [ ] Scenario examples are labelled as illustrative/scenario-only and avoid promises or suitability claims.
- [ ] Professional support section names financial adviser, accountant/tax adviser, SMSF administrator, finance broker/lender, solicitor/conveyancer, and property specialist.

## Mini Calculator

- [ ] Super vs SMSF Property Scenario Tool renders on desktop and mobile.
- [ ] All calculator inputs have accessible labels.
- [ ] Editing inputs updates outputs without external calls.
- [ ] Results are labelled estimated, illustrative, or based on assumptions.
- [ ] Disclaimer is visible near the calculator.
- [ ] Calculator mobile check confirms result cards and inputs stack cleanly without horizontal overflow.
- [ ] Calculator data is not stored externally.

## Quiz

- [ ] Quiz starts from `/quiz`.
- [ ] Step navigation works through all four steps.
- [ ] Required validation prevents incomplete submission.
- [ ] Consent step remains visible and required.
- [ ] Submission stays in mock mode and uses browser `sessionStorage`.
- [ ] Successful submission routes to `/thank-you`.

## Thank-you Page

- [ ] Page shows "Enquiry captured".
- [ ] Soft outcome message is visible.
- [ ] Reference ID appears when available.
- [ ] Demo-safe next-step explanation is visible.
- [ ] CTA to `/book-discovery` is visible and works.
- [ ] CTA back to `/` is visible and works.

## Book Discovery

- [ ] Page title says "Book a discovery conversation".
- [ ] Fields render for name, email, mobile, preferred day, preferred time window, and notes.
- [ ] Saving writes booking intent to `sessionStorage` under `asgXBookingIntent`.
- [ ] Confirmation states that preferred discovery call details were captured in this demo.
- [ ] Copy does not imply a real consultant, CRM, SMS, email, or calendar action occurred.
- [ ] CTA back to thank-you or home is visible and works.

## Debug Disabled

- [ ] Debug disabled check confirms `/debug` shows the disabled message when `VITE_ASGX_ENABLE_DEBUG=false`.
- [ ] Debug route is not linked from public-facing pages.
- [ ] Debug data is not visible in demo mode unless explicitly enabled for local QA.

## Mobile Smoke Test

- [ ] `/` renders cleanly at a mobile viewport width.
- [ ] `/quiz` is usable on mobile.
- [ ] `/thank-you` content and CTAs do not overlap on mobile.
- [ ] `/book-discovery` form fields and buttons are usable on mobile.
- [ ] Calculator inputs and output cards stack cleanly on mobile.

## Compliance Wording

- [ ] Confirm public campaign naming uses `Amplify X-Change | Property Pathway` or `Property Pathway`, not `SMSF Property Pathway`.
- [ ] Search the project for em dashes and en dashes:

```powershell
$em = [char]8212
$en = [char]8211
rg -n "$em|$en" --glob '!node_modules/**' --glob '!dist/**' --glob '!package-lock.json'
```

- [ ] Confirm no em dashes remain in source, docs, README, comments, or brand notes unless unavoidable.
- [ ] Confirm no en dashes remain in source, docs, README, comments, or brand notes unless unavoidable.
- [ ] Search `src/` for the prohibited public-facing phrases before demo handoff:

```powershell
rg -n "ATO loophole|You qualify|Approved|Guaranteed returns|Use your super now|Best investment strategy|Tax-free wealth|Retire rich|Elevate your wealth|Strategic acquisition|High-net-worth|Financial levers|Expected returns|Likely returns" src
```

- [ ] Confirm any matches are replaced with safer wording such as "General information only", "May be worth discussing", "Illustrative only", "Scenario only", "Based on assumptions", "Speak with licensed or appropriately qualified professionals", or "Not personal financial advice".
- [ ] Search `src/` for `SMSF Property Pathway` and confirm there are no public campaign-name matches.
- [ ] Confirm calculator copy does not imply advice, suitability, approval, or guaranteed outcomes.

## Brand Assets

- [ ] `/brand/ax-icon.svg` returns a successful response.
- [ ] `/brand/ax-mark.svg` returns a successful response.
- [ ] `/brand/amplify-xchange-wordmark.svg` returns a successful response.
- [ ] Header and footer logo images render with non-zero natural dimensions.

## Build

- [ ] Run `npm run build`.
- [ ] Confirm the build exits successfully.
- [ ] Record any warnings.
- [ ] Record any errors.
