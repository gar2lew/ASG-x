import { z } from 'zod';
import { isValidAustralianMobile } from './phoneValidation';

const nameRegex = /^[a-zA-Z\s\-']+$/;

export const step1Schema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be at most 50 characters')
    .regex(nameRegex, 'First name can only contain letters, spaces, hyphens and apostrophes'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be at most 50 characters')
    .regex(nameRegex, 'Last name can only contain letters, spaces, hyphens and apostrophes'),
  mobile: z
    .string()
    .refine(isValidAustralianMobile, 'Please enter a valid Australian mobile number (e.g. 0412 345 678)'),
  email: z.string().email('Please enter a valid email address'),
  state: z.enum(['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'], {
    errorMap: () => ({ message: 'Please select a valid state or territory' }),
  }),
  bestTime: z
    .enum(['Morning', 'Afternoon', 'Evening', 'Anytime'])
    .optional(),
});

export const step2Schema = z.object({
  hasSmsf: z.enum(['yes', 'no', 'unsure'], {
    errorMap: () => ({ message: 'Please select whether you have an SMSF' }),
  }),
  superBalance: z.enum(
    ['Under $100k', '$100k-$200k', '$200k-$300k', '$300k-$500k', '$500k+', 'Prefer not to say'],
    { errorMap: () => ({ message: 'Please select your super balance range' }) }
  ),
  superBalanceCombined: z.enum(['individual', 'combined'], {
    errorMap: () => ({ message: 'Please select individual or combined' }),
  }),
  ageRange: z.enum(['Under 35', '35-44', '45-54', '55-64', '65+'], {
    errorMap: () => ({ message: 'Please select your age range' }),
  }),
  employmentStatus: z.enum(
    ['Employed full-time', 'Employed part-time', 'Self-employed', 'Retired', 'Other'],
    { errorMap: () => ({ message: 'Please select your employment status' }) }
  ),
});

export const step3Schema = z.object({
  propertyType: z.enum(['residential', 'commercial', 'unsure'], {
    errorMap: () => ({ message: 'Please select a property type' }),
  }),
  preferredArea: z.string().max(100, 'Preferred area must be at most 100 characters').optional(),
  timeframe: z.enum(['Now', '1-3 months', '3-6 months', '6-12 months', 'Research only'], {
    errorMap: () => ({ message: 'Please select a timeframe' }),
  }),
  currentlyWithAdviser: z.enum(['yes', 'no', 'unsure'], {
    errorMap: () => ({ message: 'Please select whether you currently have an adviser' }),
  }),
});

const consentTrueMessage = 'You must agree to proceed';

export const step4Schema = z.object({
  consentAdvice: z.boolean().refine((val) => val === true, consentTrueMessage),
  consentRisks: z.boolean().refine((val) => val === true, consentTrueMessage),
  consentContact: z.boolean().refine((val) => val === true, consentTrueMessage),
  consentPartnerSharing: z.boolean().refine((val) => val === true, consentTrueMessage),
  consentPrivacy: z.boolean().refine((val) => val === true, consentTrueMessage),
});

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type Step4Data = z.infer<typeof step4Schema>;
