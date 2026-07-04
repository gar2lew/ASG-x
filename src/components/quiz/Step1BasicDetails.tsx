import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema, type Step1Data } from '@/lib/validation';

const STATES = [
  'Australian Capital Territory',
  'New South Wales',
  'Northern Territory',
  'Queensland',
  'South Australia',
  'Tasmania',
  'Victoria',
  'Western Australia',
] as const;

const BEST_TIMES = [
  'Morning (9am-12pm)',
  'Afternoon (12pm-5pm)',
  'Evening (5pm-8pm)',
] as const;

interface Step1BasicDetailsProps {
  onNext: (data: Step1Data) => void;
  defaultValues?: Partial<Step1Data>;
}

export default function Step1BasicDetails({ onNext, defaultValues }: Step1BasicDetailsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="max-w-lg mx-auto space-y-5">
      {/* First Name */}
      <div>
        <label htmlFor="firstName" className="block text-navy-800 font-medium mb-1">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          {...register('firstName')}
          className="w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-navy-800 placeholder-navy-300 focus:border-brass-500 focus:ring-2 focus:ring-brass-500 focus:outline-none"
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <label htmlFor="lastName" className="block text-navy-800 font-medium mb-1">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          {...register('lastName')}
          className="w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-navy-800 placeholder-navy-300 focus:border-brass-500 focus:ring-2 focus:ring-brass-500 focus:outline-none"
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
        )}
      </div>

      {/* Mobile */}
      <div>
        <label htmlFor="mobile" className="block text-navy-800 font-medium mb-1">
          Mobile
        </label>
        <input
          id="mobile"
          type="tel"
          placeholder="04XX XXX XXX"
          {...register('mobile')}
          className="w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-navy-800 placeholder-navy-300 focus:border-brass-500 focus:ring-2 focus:ring-brass-500 focus:outline-none"
        />
        {errors.mobile && (
          <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-navy-800 font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-navy-800 placeholder-navy-300 focus:border-brass-500 focus:ring-2 focus:ring-brass-500 focus:outline-none"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* State */}
      <div>
        <label htmlFor="state" className="block text-navy-800 font-medium mb-1">
          State
        </label>
        <select
          id="state"
          {...register('state')}
          className="w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-navy-800 focus:border-brass-500 focus:ring-2 focus:ring-brass-500 focus:outline-none"
        >
          <option value="">Select your state</option>
          {STATES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.state && (
          <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
        )}
      </div>

      {/* Best Time (optional) */}
      <div>
        <label htmlFor="bestTime" className="block text-navy-800 font-medium mb-1">
          Best Time to Contact <span className="text-navy-400">(optional)</span>
        </label>
        <select
          id="bestTime"
          {...register('bestTime')}
          className="w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-navy-800 focus:border-brass-500 focus:ring-2 focus:ring-brass-500 focus:outline-none"
        >
          <option value="">Select a time</option>
          {BEST_TIMES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-brass-500 hover:bg-brass-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        Next
      </button>
    </form>
  );
}
