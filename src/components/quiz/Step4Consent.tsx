import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step4Schema, type Step4Data } from '@/lib/validation';
import { Link } from 'react-router-dom';

interface Step4ConsentProps {
  onSubmit: (data: Step4Data) => void;
  onBack: () => void;
  defaultValues?: Partial<Step4Data>;
}

export default function Step4Consent({ onSubmit, onBack, defaultValues }: Step4ConsentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
    defaultValues,
  });

  const consentFields: {
    name: keyof Step4Data;
    label: React.ReactNode;
  }[] = [
    {
      name: 'consentAdvice',
      label:
        'I understand this is general information only and ASG-x does not provide personal financial advice unless provided by an appropriately licensed representative',
    },
    {
      name: 'consentRisks',
      label:
        'I understand that SMSF property investment involves risks, costs, and may not be suitable for everyone',
    },
    {
      name: 'consentContact',
      label:
        'I consent to being contacted by phone, SMS, and email regarding my enquiry',
    },
    {
      name: 'consentPartnerSharing',
      label:
        'I consent to my details being shared with relevant licensed or appropriately qualified partners (financial advisers, SMSF specialists, finance brokers) where required for referral purposes',
    },
    {
      name: 'consentPrivacy',
      label: (
        <>
          I have read and understood the{' '}
          <Link
            to="/privacy-policy"
            target="_blank"
            className="text-brass-500 hover:text-brass-600 underline"
          >
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link
            to="/referral-disclosure"
            target="_blank"
            className="text-brass-500 hover:text-brass-600 underline"
          >
            Referral Disclosure
          </Link>
        </>
      ),
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto space-y-5">
      {/* Consent checkboxes */}
      <div className="space-y-4">
        {consentFields.map(({ name, label }) => (
          <div key={name}>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register(name)}
                className="mt-0.5 w-5 h-5 accent-brass-500 shrink-0"
              />
              <span className="text-navy-800 text-sm leading-snug">{label}</span>
            </label>
            {errors[name] && (
              <p className="text-red-500 text-sm ml-8">{errors[name]?.message}</p>
            )}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="bg-navy-100 text-navy-800 font-semibold px-6 py-3 rounded-lg hover:bg-navy-200 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-brass-500 hover:bg-brass-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Submit Enquiry
        </button>
      </div>

      <p className="text-navy-400 text-xs text-center">
        By submitting, you agree to our{' '}
        <Link to="/privacy-policy" className="text-brass-500 underline">
          privacy policy
        </Link>{' '}
        and{' '}
        <Link to="/referral-disclosure" className="text-brass-500 underline">
          referral disclosure
        </Link>
      </p>

      {/* Compliance notice */}
      <div className="bg-navy-50 border border-navy-200 rounded-lg p-4 mt-4">
        <p className="text-navy-600 text-xs">
          This service provides general information only. ASG-x does not provide personal
          financial advice. Any decisions regarding SMSF property investment should be made
          in consultation with a licensed financial adviser who considers your individual
          circumstances.
        </p>
      </div>
    </form>
  );
}
