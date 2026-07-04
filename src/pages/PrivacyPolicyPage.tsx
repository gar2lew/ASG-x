import { Link } from 'react-router-dom'

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-navy-800 mb-2">
          Privacy Policy
        </h1>
        <p className="text-navy-500 mb-8">Last Updated: June 2026</p>

        <div className="space-y-8 text-navy-700">
          <section>
            <h2 className="text-xl font-semibold text-navy-800 mb-3">
              Information We Collect
            </h2>
            <p className="mb-2">
              We collect personal information that you provide to us directly,
              including:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Your name, email address, and phone number</li>
              <li>Your responses to our quiz questions</li>
              <li>
                Information about your superannuation balance, investment
                experience, and property interests
              </li>
              <li>
                Any other information you choose to provide during the enquiry
                process
              </li>
            </ul>
            <p className="mt-2">
              We may also collect technical information about your visit,
              including IP address, browser type, pages visited, and referring
              URL, through standard analytics tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-800 mb-3">
              How We Use Your Information
            </h2>
            <p className="mb-2">We use your personal information to:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Provide you with general information about SMSF property pathways</li>
              <li>Contact you to schedule and conduct discovery calls</li>
              <li>
                Refer you, with your explicit consent, to licensed professionals
                including financial advisers, SMSF specialists, and finance
                brokers
              </li>
              <li>Maintain records of your consent and preferences</li>
              <li>Comply with our legal and regulatory obligations</li>
              <li>Improve our services and website experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-800 mb-3">
              Information Sharing
            </h2>
            <p className="mb-2">
              We may share your personal information with:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Licensed professional partners (financial advisers, SMSF
                specialists, finance brokers)  -  only with your explicit consent
              </li>
              <li>
                Service providers who assist us in operating our website and
                delivering our services, subject to confidentiality obligations
              </li>
              <li>
                Law enforcement or regulatory bodies if required by law
              </li>
            </ul>
            <p className="mt-2">
              We do not sell your personal information to third parties. For
              information about referral fees, please refer to our{' '}
              <Link
                to="/referral-disclosure"
                className="text-brass-500 hover:text-brass-600 underline"
              >
                Referral Disclosure
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-800 mb-3">
              Data Security
            </h2>
            <p>
              We take reasonable steps to protect your personal information from
              unauthorised access, modification, or disclosure. This includes
              using secure storage, encryption in transit, and access controls.
              However, no method of electronic transmission or storage is
              completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-800 mb-3">
              Consent
            </h2>
            <p>
              Before sharing your personal information with any licensed
              professional partner, we will seek your explicit consent. You may
              withdraw your consent at any time by contacting us using the
              details below. Withdrawal of consent does not affect the
              lawfulness of any processing that occurred prior to withdrawal.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-800 mb-3">
              Your Rights
            </h2>
            <p className="mb-2">
              Under Australian privacy law, you have the right to:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Withdraw consent for information sharing</li>
              <li>Lodge a complaint with the Office of the Australian Information Commissioner</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-navy-800 mb-3">
              Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy or wish to
              exercise your privacy rights, please contact us at:{' '}
              <a
                href="mailto:privacy@asg-x.com.au"
                className="text-brass-500 hover:text-brass-600 underline"
              >
                privacy@asg-x.com.au
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
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
