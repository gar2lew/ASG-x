import { Link } from 'react-router-dom'

export default function ReferralDisclosurePage() {
  return (
    <div className="bg-white px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-navy-800 mb-8">
          Referral Disclosure
        </h1>

        <div className="space-y-8 text-navy-700">
          <section>
            <h2 className="text-xl font-semibold text-navy-800 mb-3">
              How Our Referral Service Works
            </h2>
            <p>
              ASG-x provides general information about SMSF property pathways.
              We are not a financial advice provider. If, after completing our
              quiz and discovery call, it may be appropriate for you to seek
              personal advice, we can refer you to licensed professionals
              including financial advisers, SMSF specialists, and finance
              brokers. Referrals are made only with your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-800 mb-3">
              Referral Fees
            </h2>
            <p>
              ASG-x may receive a referral fee or commission from licensed
              professional partners when we refer you to them and you proceed
              to engage their services. These referral fees are a commercial
              arrangement between ASG-x and our partners and are disclosed to
              you in the interests of transparency.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-800 mb-3">
              Partner Categories
            </h2>
            <p className="mb-2">
              We may refer you to the following categories of licensed
              professionals:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Licensed Financial Advisers</strong> — who can provide
                personal financial advice about whether an SMSF property
                strategy is appropriate for your circumstances
              </li>
              <li>
                <strong>SMSF Specialists</strong> — who can assist with SMSF
                establishment, compliance, administration, and ongoing
                management
              </li>
              <li>
                <strong>Finance Brokers</strong> — who can assist with
                arranging limited recourse borrowing arrangements and other
                finance options
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-800 mb-3">
              Your Consent
            </h2>
            <p>
              We will not share your personal information with any professional
              partner without your explicit consent. You are under no obligation
              to consent to a referral, and declining a referral will not affect
              the general information we provide. You may withdraw your consent
              at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-800 mb-3">
              No Impact on Cost
            </h2>
            <p>
              Any referral fee paid to ASG-x by our partners does not increase
              the cost of services to you. Professional partners set their own
              fees independently, and the referral fee is paid from the
              partner's commercial arrangements — not added to your invoice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-800 mb-3">
              Questions
            </h2>
            <p>
              If you have any questions about our referral arrangements, please
              contact us at{' '}
              <a
                href="mailto:info@asg-x.com.au"
                className="text-brass-500 hover:text-brass-600 underline"
              >
                info@asg-x.com.au
              </a>
              . For more information about how we handle your personal data,
              please see our{' '}
              <Link
                to="/privacy-policy"
                className="text-brass-500 hover:text-brass-600 underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 bg-navy-50 border border-navy-200 rounded-lg p-6 text-center">
          <p className="text-sm text-navy-600">
            This disclosure is provided in accordance with Australian consumer
            law and regulatory requirements. ASG-x is not a licensed financial
            advice provider and does not hold an Australian Financial Services
            Licence (AFSL). All referrals are to appropriately licensed
            professionals.
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-brass-500 hover:text-brass-600 underline font-semibold transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}
