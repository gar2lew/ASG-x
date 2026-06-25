import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqItems = [
  {
    question: 'Is this personal financial advice?',
    answer:
      'No. This service provides general information only. We do not take your personal circumstances into account, and nothing on this site should be construed as personal financial advice. You should consult a licensed financial adviser before making any decisions about your superannuation.',
  },
  {
    question: 'Who decides if an SMSF property strategy is suitable for me?',
    answer:
      'Only a licensed financial adviser can determine whether an SMSF property strategy is appropriate for your individual circumstances. Our service provides general information to help you understand the process and decide whether to seek professional advice.',
  },
  {
    question: 'Are returns from SMSF property investment guaranteed?',
    answer:
      'No. All investments carry risk, and past performance is not indicative of future results. Property values can decrease, and there is no guarantee of returns from any investment strategy. You should discuss risks with a licensed professional.',
  },
  {
    question: 'Do I need to pay for the discovery call?',
    answer:
      'No. The initial discovery call is provided at no obligation and no cost to you. During the call, we provide general information and answer your questions about the process. If appropriate, we may refer you to a licensed professional — that referral is also at no cost to you.',
  },
  {
    question: 'Is my information safe?',
    answer:
      'We take data security seriously. Your personal information is stored securely and only shared with your explicit consent. Please refer to our Privacy Policy for full details on how we collect, use, and protect your information.',
  },
  {
    question: 'What is an SMSF?',
    answer:
      'A Self-Managed Super Fund (SMSF) is a private superannuation fund that you manage yourself, rather than one managed by a financial institution. SMSFs allow members to have direct control over their investment decisions, including the option to invest in property. SMSFs come with significant responsibilities including compliance with superannuation law, maintaining an investment strategy, and annual reporting obligations. This is general information only — whether an SMSF is appropriate for you should be discussed with a licensed professional.',
  },
  {
    question: 'What is a limited recourse borrowing arrangement?',
    answer:
      'A limited recourse borrowing arrangement (LRBA) is a structure that allows an SMSF to borrow money to purchase an asset, typically property. Under an LRBA, the lender\'s recourse is limited to the asset held in a separate holding trust — they cannot claim against other SMSF assets if the loan defaults. LRBAs must comply with specific superannuation regulations. This is general information only — you should consult a licensed professional to understand whether an LRBA may be appropriate for your circumstances.',
  },
  {
    question: 'What does a discovery call involve?',
    answer:
      'A discovery call is a no-obligation Zoom conversation where we provide general information about SMSF property pathways and answer your questions. The call is not personal financial advice — it is an opportunity for you to understand the general process, risks, and considerations involved. If appropriate, and with your explicit consent, we may refer you to a licensed professional for personalised advice.',
  },
  {
    question: 'How long does the typical process take?',
    answer:
      'The timeframe varies depending on individual circumstances. Generally, the initial enquiry and discovery call can be completed within days. If you proceed to engage a licensed professional, the advice process may take several weeks. Setting up an SMSF, if appropriate, can take additional weeks, and purchasing a property through an SMSF may take months. These are general timeframes only — actual timelines depend on your individual situation and should be discussed with the relevant licensed professionals.',
  },
  {
    question: 'What are the ongoing costs of an SMSF?',
    answer:
      'Ongoing SMSF costs typically include accounting fees, annual audit fees, tax return preparation, compliance costs, and potentially legal fees. If the SMSF holds property, additional costs may include property maintenance, insurance, council rates, and loan repayments if a borrowing arrangement is in place. These costs can vary significantly depending on the complexity of the fund. For more information, visit the ASIC MoneySmart website. This is general information only — specific costs should be discussed with a licensed professional.',
  },
  {
    question: 'Can I live in a property owned by my SMSF?',
    answer:
      'No. Under the sole purpose test, an SMSF must be maintained for the sole purpose of providing retirement benefits to members. This means you cannot live in, rent at below-market rates, or use a property owned by your SMSF for personal purposes. Breaching the sole purpose test can result in significant penalties, including the fund losing its complying status and becoming subject to the highest marginal tax rate. This is general information only — you should consult a licensed professional about compliance requirements.',
  },
]

export default function FAQPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="bg-white px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-navy-800 text-center mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-navy-500 text-center mb-12">
          General information only. No personal financial advice provided.
        </p>

        <div className="space-y-4">
          {faqItems.map((faq, index) => (
            <div key={index} className="bg-navy-50 rounded-lg">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="font-semibold text-navy-800 pr-4">
                  {faq.question}
                </span>
                {openFaq === index ? (
                  <ChevronUp className="h-5 w-5 text-navy-500 shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-navy-500 shrink-0" />
                )}
              </button>
              {openFaq === index && (
                <div className="px-6 pb-4 text-navy-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-navy-50 border border-navy-200 rounded-lg p-6 text-center">
          <p className="text-sm text-navy-600">
            This service provides general information only. We do not provide
            personal financial advice. Please consult a licensed professional
            before making any decisions about your superannuation.
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/quiz"
            className="bg-brass-500 hover:bg-brass-600 text-navy-900 font-bold px-8 py-4 rounded-lg text-lg transition-colors inline-block"
          >
            Take the 60-Second Quiz
          </Link>
        </div>
      </div>
    </div>
  )
}
