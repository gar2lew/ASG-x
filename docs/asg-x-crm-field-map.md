# ASG‑x CRM Field Mapping

**Status:** Draft — for review before CRM integration begins

## Current local payload fields (`AsgXLeadPayload`)

These are the fields stored locally in `sessionStorage` under `asgXLeadPayload`.

### Meta
| Local field | Type | Local value |
|-------------|------|-------------|
| `leadSource` | `'asg_x_smsf'` | `asg_x_smsf` |
| `submissionId` | `string` | `asgx_<timestamp>_<random>` |
| `createdAt` | `string` (ISO 8601) | `new Date().toISOString()` |
| `campaignId` | `string` | `asg_x_smsf_v1` |
| `pipelineStage` | `'new_enquiry'` | `new_enquiry` |

### Contact
| Local field | Type |
|-------------|------|
| `firstName` | `string` |
| `lastName` | `string` |
| `mobile` | `string` (normalised, 04xxxxxxxx) |
| `email` | `string` |
| `state` | `string` |
| `bestTime` | `string` |

### Quiz responses
| Local field | Type |
|-------------|------|
| `hasSmsf` | `string` (`'yes'` / `'no'` / `'unsure'`) |
| `superBalanceRange` | `string` |
| `superBalanceType` | `string` |
| `ageRange` | `string` |
| `employmentStatus` | `string` |
| `propertyType` | `string` |
| `preferredArea` | `string` |
| `timeframe` | `string` |
| `currentlyWithAdviser` | `string` |

### Scoring (internal only)
| Local field | Type | Notes |
|-------------|------|-------|
| `quizScore` | `number` (0–100) | Must not be displayed to user |
| `quizOutcome` | `'explore'` / `'review'` / `'not_now'` | Must not be displayed to user with score context |

### Consent
| Local field | Type |
|-------------|------|
| `consent.generalInformation` | `boolean` |
| `consent.noPersonalAdvice` | `boolean` |
| `consent.riskAndCosts` | `boolean` |
| `consent.contact` | `boolean` |
| `consent.referral` | `boolean` |
| `consent.version` | `string` (`1.0.0`) |
| `consent.timestamp` | `string` (ISO 8601) |

### UTM / Campaign
| Local field | Type | URL param |
|-------------|------|-----------|
| `utm.utmSource` | `string?` | `utm_source` |
| `utm.utmMedium` | `string?` | `utm_medium` |
| `utm.utmCampaign` | `string?` | `utm_campaign` |
| `utm.utmContent` | `string?` | `utm_content` |
| `utm.utmTerm` | `string?` | `utm_term` |

---

## Proposed CRM lead fields

These fields map the local payload to a typical CRM (e.g. HubSpot, Zoho, Salesforce).

| CRM field | Maps from (local) | Notes |
|-----------|-------------------|-------|
| Lead Source | `leadSource` | Set to `ASG-x Online SMSF Funnel` |
| Lead Source Key | `leadSource` | Set to `asg_x_smsf` (internal only) |
| First Name | `firstName` | |
| Last Name | `lastName` | |
| Phone | `mobile` | Normalised AU format |
| Email | `email` | |
| State | `state` | |
| Best Contact Time | `bestTime` | |
| SMSF Status | `hasSmsf` | |
| Super Balance Range | `superBalanceRange` | |
| Super Balance Type | `superBalanceType` | |
| Age Range | `ageRange` | |
| Employment Status | `employmentStatus` | |
| Property Type | `propertyType` | |
| Preferred Area | `preferredArea` | |
| Timeframe | `timeframe` | |
| Working with Adviser/Broker | `currentlyWithAdviser` | |
| Pipeline Stage | `pipelineStage` | Start at `New Online Enquiry` |
| Campaign ID | `campaignId` | |
| UTM Source | `utm.utmSource` | |
| UTM Medium | `utm.utmMedium` | |
| UTM Campaign | `utm.utmCampaign` | |
| UTM Content | `utm.utmContent` | |
| UTM Term | `utm.utmTerm` | |
| Submission ID | `submissionId` | Internal tracking |

---

## Proposed Firestore fields

If using Firestore as the primary database before CRM sync:

| Firestore field | Type | Maps from |
|-----------------|------|-----------|
| `leadSource` | `string` | `leadSource` |
| `submissionId` | `string` | `submissionId` |
| `createdAt` | `Timestamp` | `createdAt` |
| `updatedAt` | `Timestamp` | server timestamp |
| `firstName` | `string` | `firstName` |
| `lastName` | `string` | `lastName` |
| `mobile` | `string` | `mobile` |
| `email` | `string` | `email` |
| `state` | `string` | `state` |
| `bestTime` | `string` | `bestTime` |
| `hasSmsf` | `string` | `hasSmsf` |
| `superBalanceRange` | `string` | `superBalanceRange` |
| `superBalanceType` | `string` | `superBalanceType` |
| `ageRange` | `string` | `ageRange` |
| `employmentStatus` | `string` | `employmentStatus` |
| `propertyType` | `string` | `propertyType` |
| `preferredArea` | `string` | `preferredArea` |
| `timeframe` | `string` | `timeframe` |
| `currentlyWithAdviser` | `string` | `currentlyWithAdviser` |
| `quizScore` | `number` | `quizScore` (internal) |
| `quizOutcome` | `string` | `quizOutcome` (internal) |
| `consent` | `map` | `consent` object |
| `utm` | `map` | `utm` object |
| `pipelineStage` | `string` | `pipelineStage` |
| `campaignId` | `string` | `campaignId` |
| `crmLeadId` | `string?` | Set after CRM sync |
| `crmSyncStatus` | `string` | `pending` / `synced` / `failed` |

---

## Consent log mapping

An immutable consent audit log should be maintained separately:

| Consent log field | Maps from |
|-------------------|-----------|
| `submissionId` | `submissionId` |
| `consentVersion` | `consent.version` |
| `consentTimestamp` | `consent.timestamp` |
| `generalInformation` | `consent.generalInformation` |
| `noPersonalAdvice` | `consent.noPersonalAdvice` |
| `riskAndCosts` | `consent.riskAndCosts` |
| `contact` | `consent.contact` |
| `referral` | `consent.referral` |
| `logCreatedAt` | server timestamp |

---

## Follow-up task mapping (CRM)

| Task field | Value / source |
|------------|----------------|
| Task Type | `New Online Enquiry Follow-up` |
| Assigned To | Round-robin or auto-assignment queue |
| Due Date | `createdAt` + 1 business day |
| Priority | Normal |
| Subject | `ASG-x Online SMSF Enquiry — {firstName} {lastName}` |

---

## Fields that must never be shown publicly

- `quizScore` — internal scoring; no client-facing display
- `quizOutcome` — internal routing only; the thank-you page shows the soft message, not the outcome label
- `pipelineStage` — internal CRM status
- `campaignId` — internal tracking
- Any consent audit metadata beyond the fact that consent was recorded

---

## Open CRM integration questions

1. Which CRM will be used? (HubSpot, Zoho, Salesforce, custom?)
2. Will leads be created via REST API or a Firestore listener/trigger?
3. Should consent be recorded in the CRM or in a separate audit table?
4. What pipeline stages should be used?
5. What is the lead assignment rule? (round-robin, territory, manual?)
6. Should UTM data be mapped to native CRM campaign objects or custom fields?
7. Does the CRM support webhook callbacks for status updates?

## Data privacy notes

- Personal information (name, mobile, email, state) must be handled in accordance with the Privacy Act 1988 (Cth)
- Consent must be recorded before personal data is shared with any third party
- The `submissionId` should be used as the primary correlation key across systems
- All data should be transmitted over HTTPS
- Session storage data is cleared when the browser tab is closed
- No data should be persisted to `localStorage` (indefinite persistence); only `sessionStorage` is used
