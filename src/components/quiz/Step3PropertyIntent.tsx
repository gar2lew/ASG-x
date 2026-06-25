import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step3Schema, type Step3Data } from '@/lib/validation';

const TIMEFRAME_OPTIONS = [
  'Immediately',
  'Within 3 months',
  'Within 6 months',
  'Within 12 months',
  'Just exploring',
] as const;

interface Step3PropertyIntentProps {
  onNext: (data: Step3Data) => void;
  onBack: () => void;
  defaultValues?: Partial<Step3Data>;
}

export default function Step3PropertyIntent({ onNext, onBack, defaultValues }: Step3PropertyIntentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="max-w-lg mx-auto space-y-5">
      {/* Property Type */}
      <div>
        <label className="block text-navy-800 font-medium mb-2">
          What type of property are you interested in?
        </label>
        <div className="flex gap-6">
          {(['Residential', 'Commercial', 'Not sure'] as const).map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value={option}
                {...register('propertyType')}
                className="appearance-none w-5 h-5 border-2 border-navy-300 rounded-full checked:bg-brass-500 checked:border-brass-500"
              />
              <span className="text-navy-800">{option}</span>
            </label>
          ))}
        </div>
        {errors.propertyType && (
          <p className="text-red-500 text-sm mt-1">{errors.propertyType.message}</p>
        )}
      </div>

      {/* Preferred Area */}
      <div>
        <label htmlFor="preferredArea" className="block text-navy-800 font-medium mb-1">
          Preferred Area / Suburb <span className="text-navy-400">(optional)</span>
        </label>
        <input
          id="preferredArea"
          type="text"
          maxLength={100}
          {...register('preferredArea')}
          className="w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-navy-800 placeholder-navy-300 focus:border-brass-500 focus:ring-2 focus:ring-brass-500 focus:outline-none"
          placeholder="e.g. Melbourne CBD, Sydney Inner West"
        />
        {errors.preferredArea && (
          <p className="text-red-500 text-sm mt-1">{errors.preferredArea.message}</p>
        )}
      </div>

      {/* Timeframe */}
      <div>
        <label htmlFor="timeframe" className="block text-navy-800 font-medium mb-1">
          Timeframe
        </label>
        <select
          id="timeframe"
          {...register('timeframe')}
          className="w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-navy-800 focus:border-brass-500 focus:ring-2 focus:ring-brass-500 focus:outline-none"
        >
          <option value="">Select timeframe</option>
          {TIMEFRAME_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.timeframe && (
          <p className="text-red-500 text-sm mt-1">{errors.timeframe.message}</p>
        )}
      </div>

      {/* Currently With Adviser */}
      <div>
        <label className="block text-navy-800 font-medium mb-2">
          Are you currently working with a financial adviser?
        </label>
        <div className="flex gap-6">
          {(['Yes', 'No', 'Unsure'] as const).map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value={option}
                {...register('currentlyWithAdviser')}
                className="appearance-none w-5 h-5 border-2 border-navy-300 rounded-full checked:bg-brass-500 checked:border-brass-500"
              />
              <span className="text-navy-800">{option}</span>
            </label>
          ))}
        </div>
        {errors.currentlyWithAdviser && (
          <p className="text-red-500 text-sm mt-1">{errors.currentlyWithAdviser.message}</p>
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
