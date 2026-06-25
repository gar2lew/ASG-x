### Phase 3: CRM Integration (Weeks 4-5)
- Save leads to ASG CRM with ASG-x lead source
- Add quiz score fields to lead record
- Set pipeline stage to "New Online Enquiry"
- Create consent log linked to lead
- Implement lead assignment/rules
- Create follow-up tasks in CRM
- **Deliverable**: ASG-x leads flowing into CRM

### Phase 4: Booking and Follow-up (Weeks 6-7)
- Integrate booking link (Calendly/Zoom) or build simple booking
- Set up automated email sequence (confirmation + pre-meeting)
- Set up automated SMS sequence (booking reminder)
- Implement no-booking reminder (after 15 minutes)
- Create rep task reminders for follow-up
- **Deliverable**: Online lead-to-Zoom workflow

### Phase 5: Partner/Referral Workflow (Weeks 8-9)
- Define partner categories (financial adviser, SMSF specialist, etc.)
- Implement referral consent logging
- Create partner handoff email template
- Build adviser/broker/accountant tracking
- Add referral status tracking to leads
- **Deliverable**: Controlled partner handoff system

### Phase 6: Basic Validation/Testing (Week 10)
- Conduct compliance review of all copy and flows
- Test form validation and edge cases
- Verify consent logging and audit trail
- Test CRM integration end-to-end
- Verify booking flow and automation triggers
- **Deliverable**: MVP ready for internal review

### Phase 7: Future CRM/Automation Integration (Post-MVP)
- Build dashboard for ASG-x performance metrics
- Implement A/B testing for landing page variants
- Add lead quality scoring based on quiz responses
- Track source ROI and campaign performance
- Develop partner billing/per-lead system (if needed)
- **Deliverable**: ASG-x acquisition engine

## Acceptance Criteria
1. **Compliance**: All copy passes compliance review; no advice-like language present
2. **Functionality**: Quiz submits successfully; lead appears in CRM with correct source
3. **Consent**: All consent fields captured and stored with timestamp/IP
4. **Booking**: Thank you page shows booking CTA; clicking creates calendar event
5. **Automation**: Form submission triggers SMS/email within 1 minute
6. **Compliance Tracking**: Staff cannot advance lead without completing checklist
7. **Referral**: When referral occurs, partner type and consent are logged
8. **Mobile Responsiveness**: All pages work correctly on mobile devices
9. **UTM Tracking**: Campaign parameters are captured and stored with lead
10. **Error Handling**: Form shows appropriate validation errors; submission failures are logged

## Open Questions
1. **CRM Integration Method**: Should we use Firebase Functions to push to ASG CRM API, or build a separate web app that writes to a shared Firestore instance?
2. **Booking Solution**: Should we use Calendly/Zoom integration or build a custom booking flow with Firebase?
3. **Email/SMS Provider**: Which service should we use for automation (SendGrid, Twilio, existing ASG providers)?
4. **Partner Categories**: Which specific partner types should we initially support for referrals?
5. **Staff Notification**: How should sales reps be notified of new leads (email, Slack, CRM task)?
6. **Success Metrics**: What constitutes a successful lead (booking attended, qualification met, etc.)?
7. **Legal Review**: Who will provide final compliance sign-off on copy and flows?
8. **Timeline**: What is the target launch date for the MVP?
9. **Budget**: Are there any constraints on third-party service costs?
10. **Branding**: Should ASG-x use existing ASG branding or develop a distinct visual identity?

## Do-Not-Do List
- ❌ Do NOT use phrases like "ATO loophole", "You qualify", "Guaranteed returns", "Use your super now", "Best investment strategy", or "Tax-free wealth"
- ❌ Do NOT provide personal financial advice or imply suitability for any individual
- ❌ Do NOT imply guaranteed outcomes or specific financial benefits
- ❌ Do NOT suggest that ASG-x provides SMSF setup, financial advice, lending, or accounting services unless properly licensed
- ❌ Do NOT share lead data without explicit consent for each specific purpose
- ❌ Do NOT use pre-ticked consent boxes or assume consent
- ❌ Do NOT skip compliance checklist before advancing leads in CRM
- ❌ Do NOT make referral partners without disclosing the relationship and any compensation
- ❌ Do NOT neglect to include privacy policy and disclaimer links on every page
- ❌ Do NOT forget to normalize and validate Australian mobile numbers
- ❌ Do NOT store sensitive data (like TFNs) in the quiz or lead capture
- ❌ Do NOT allow staff to bypass compliance checks in the CRM workflow
- ❌ Do NOT use dark patterns or misleading UI to increase conversion rates
- ❌ Do NOT forget to include clear unsubscribe options in all communications