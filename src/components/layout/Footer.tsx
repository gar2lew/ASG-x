import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-white/5 text-white/50 text-xs">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-4">
        <p>
          ASG‑x provides general information and education services only. We do
          not provide personal financial advice. SMSF property pathways can
          involve rules, costs, risks, and responsibilities that vary by
          individual circumstances.
        </p>
        <p>
          Personal financial advice should be sought from appropriately licensed
          professionals where required. ASG‑x may receive referral fees from
          licensed professionals (financial advisers, SMSF specialists, finance
          brokers) to whom we refer users who provide explicit consent for such
          referrals. This does not affect the cost to you.
        </p>
        <p>
          Please read our{' '}
          <Link to="/privacy-policy" className="text-brass-gold hover:text-brass-gold-light underline">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link to="/referral-disclosure" className="text-brass-gold hover:text-brass-gold-light underline">
            Referral Disclosure
          </Link>{' '}
          for full details.
        </p>
        <p>
          This service is intended for Australian residents only. All
          investments carry risk. Past performance is not indicative of future
          results.
        </p>
        <p>&copy; 2026 ASG‑x. All rights reserved.</p>
      </div>
    </footer>
  );
}
