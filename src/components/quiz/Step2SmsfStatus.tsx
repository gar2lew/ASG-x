import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step2Schema, type Step2Data } from '@/lib/validation';

const SUPER_BALANCE_OPTIONS = [
  'Under $100,000',
  '$100,000 - $200,000',
  '$200,000 - $300,000',
  '$300,000 - $500,000',
  '$500,000 - $750,000',
  'Over $750,000',
] as const;

const AGE_RANGES = [
  'Under 35',
  '35-44',
  '45-54',
  '55-64',
  '65+',
] as const;

const EMPLOYMENT_STATUSES = [
  'Employed full-time',
  'Employed part-time',
  'Self-employed',
  'Retired',
  'Other',
] as const;

interface Step2SmsfStatusProps {
  onNext: (data: Step2Data) => void;
  onBack: () => void;
  defaultValues?: Partial<Step2Data>;
}

export default function Step2SmsfStatus({ onNext, onBack, defaultValues }: Step2SmsfStatusProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="max-w-lg mx-auto space-y-5">
      {/* Has SMSF */}
      <div>
        <label className="block text-navy-800 font-medium mb-2">
          Do you currently have an SMSF?
        </label>
        <div className="flex gap-6">
          {(['Yes', 'No', 'Unsure'] as const).map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value={option}
                {...register('hasSmsf')}
                className="appearance-none w-5 h-5 border-2 border-navy-300 rounded-full checked:bg-brass-500 checked:border-brass-500"
              />
              <span className="text-navy-800">{option}</span>
            </label>
          ))}
        </div>
        {errors.hasSmsf && (
          <p className="text-red-500 text-sm mt-1">{errors.hasSmsf.message}</p>
        )}
      </div>

      {/* Super Balance */}
      <div>
        <label htmlFor="superBalance" className="block text-navy-800 font-medium mb-1">
          Approximate Super Balance
        </label>
        <select
          id="superBalance"
          {...register('superBalance')}
          className="w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-navy-800 focus:border-brass-500 focus:ring-2 focus:ring-brass-500 focus:outline-none"
        >
          <option value="">Select range</option>
          {SUPER_BALANCE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.superBalance && (
          <p className="text-red-500 text-sm mt-1">{errors.superBalance.message}</p>
        )}
      </div>

      {/* Super Balance Combined */}
      <div>
        <label className="block text-navy-800 font-medium mb-2">
          Individual or combined with partner?
        </label>
        <div className="flex gap-6">
          {(['Individual', 'Combined with partner'] as const).map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value={option}
                {...register('superBalanceCombined')}
                className="appearance-none w-5 h-5 border-2 border-navy-300 rounded-full checked:bg-brass-500 checked:border-brass-500"
              />
              <span className="text-navy-800">{option}</span>
            </label>
          ))}
        </div>
        {errors.superBalanceCombined && (
          <p className="text-red-500 text-sm mt-1">{errors.superBalanceCombined.message}</p>
        )}
      </div>

      {/* Age Range */}
      <div>
        <label htmlFor="ageRange" className="block text-navy-800 font-medium mb-1">
          Age Range
        </label>
        <select
          id="ageRange"
          {...register('ageRange')}
          className="w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-navy-800 focus:border-brass-500 focus:ring-2 focus:ring-brass-500 focus:outline-none"
        >
          <option value="">Select range</option>
          {AGE_RANGES.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.ageRange && (
          <p className="text-red-500 text-sm mt-1">{errors.ageRange.message}</p>
        )}
      </div>

      {/* Employment Status */}
      <div>
        <label htmlFor="employmentStatus" className="block text-navy-800 font-medium mb-1">
          Employment Status
        </label>
        <select
          id="employmentStatus"
          {...register('employmentStatus')}
          className="w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-navy-800 focus:border-brass-500 focus:ring-2 focus:ring-brass-500 focus:outline-none"
        >
          <option value="">Select status</option>
          {EMPLOYMENT_STATUSES.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.employmentStatus && (
          <p className="text-red-500 text-sm mt-1">{errors.employmentStatus.message}</p>
        )}
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
          Next
        </button>
      </div>
    </form>
  );
}
