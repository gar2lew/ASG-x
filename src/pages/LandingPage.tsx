import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react'
import SmsfScenarioCalculator from '@/components/calculators/SmsfScenarioCalculator'

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
    question: 'Can SMSF property investment outcomes be certain?',
    answer:
      'No. All investments carry risk, and past performance is not indicative of future results. Property values can decrease, costs can change, and outcomes can vary. You should discuss risks with a licensed professional.',
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
]

const serviceCategories = [
  {
    label: 'Finance',
    title: 'Finance specialist connections',
    description:
      'Access lending conversations through accredited finance professionals and lending partners.',
  },
  {
    label: 'Property',
    title: 'Property specialist connections',
    description:
      'Explore property opportunities through trusted property and development partners.',
  },
  {
    label: 'SMSF',
    title: 'SMSF setup and administration',
    description:
      'Connect with SMSF specialists for setup, administration, compliance, and related support.',
  },
  {
    label: 'Tax',
    title: 'Tax and accounting support',
    description:
      'Access tax and accounting professionals for structure, reporting, and compliance discussions.',
  },
  {
    label: 'Management',
    title: 'Property management access',
    description:
      'Connect with property management specialists for tenanting and ongoing investment support.',
  },
  {
    label: 'Advisory',
    title: 'Advisory partner network',
    description:
      'Where required, connect with appropriately licensed professionals for financial product advice.',
  },
  {
    label: 'Lending',
    title: 'Lending and structuring support',
    description:
      'Explore lending conversations and structuring options through accredited professionals.',
  },
  {
    label: 'Coordination',
    title: 'Ongoing professional coordination',
    description:
      'Support to help coordinate across finance, property, SMSF, tax, and advisory professionals.',
  },
]

const frameworkSteps = [
  {
    number: '01',
    label: 'Online enquiry',
    title:
      'Complete a short digital enquiry so we can understand your goals, current situation, and whether this pathway may be worth discussing further.',
  },
  {
    number: '02',
    label: 'Discovery conversation',
    title:
      'Book a no-obligation online discovery call to understand the general process, risks, costs, and professional areas that may be relevant.',
  },
  {
    number: '03',
    label: 'Professional introductions',
    title:
      'Where appropriate and with your consent, Amplify X-Change may help connect you with trusted professionals across finance, SMSF, property, tax, accounting, or advisory services.',
  },
  {
    number: '04',
    label: 'Next-step clarity',
    title:
      'Receive a clearer understanding of the pathway, the professionals involved, and the possible next steps to explore further.',
  },
]

const statsAbout = [
  {
    value: '40+',
    label: 'Banks and lenders accessible through finance specialist partners',
  },
  {
    value: '2',
    label: 'Office locations supporting clients across Perth and Brisbane',
  },
  {
    value: 'Multi‑disciplinary',
    label: 'Property, finance, tax, accounting and SMSF partner network',
  },
  {
    value: 'Online‑first',
    label: 'Zoom‑based discovery and guided enquiry process',
  },
]

const pathwayCards = [
  {
    label: 'Residential',
    title: 'Residential property pathway',
    points: [
      'Residential property may be explored through an SMSF only where the rules are understood and followed.',
      'Related-party restrictions can apply, and fund members generally cannot live in or personally use residential SMSF property.',
      'Borrowing, costs, liquidity, insurance, administration, and compliance all need professional review.',
    ],
  },
  {
    label: 'Commercial',
    title: 'Commercial property pathway',
    points: [
      'Commercial property can involve different considerations from residential property.',
      'Business real property may involve specific rules and professional advice before any next steps are considered.',
      'Lease arrangements, cash flow, vacancy, tenant risk, lending, and compliance need careful review.',
    ],
  },
]

const comparisonRows = [
  {
    topic: 'Typical use case',
    residential: 'Long-term residential investment property held by an SMSF.',
    commercial: 'Commercial premises or business real property where rules and lease structure are reviewed.',
  },
  {
    topic: 'Key restrictions',
    residential: 'Related-party use is generally restricted; members usually cannot live in or personally use the property.',
    commercial: 'Business real property rules may apply and need specialist review.',
  },
  {
    topic: 'Cash flow considerations',
    residential: 'Rent, vacancy, maintenance, insurance, strata, and property management costs need modelling.',
    commercial: 'Lease terms, tenant quality, vacancy periods, outgoings, and rent review structure need review.',
  },
  {
    topic: 'Borrowing considerations',
    residential: 'SMSF borrowing can involve limited recourse structures, lender criteria, fees, and liquidity constraints.',
    commercial: 'Commercial lending may involve different valuation, deposit, lease, and servicing requirements.',
  },
  {
    topic: 'Related-party considerations',
    residential: 'Related-party purchase, lease, or personal use restrictions can be significant.',
    commercial: 'Related-party leasing may be possible only where rules are followed and terms are properly documented.',
  },
  {
    topic: 'Professional support needed',
    residential: 'Financial, tax, SMSF administration, lending, legal, and property input may be required.',
    commercial: 'Financial, tax, SMSF administration, lending, legal, lease, and commercial property input may be required.',
  },
]

const scenarioCards = [
  {
    label: 'Illustrative scenario only',
    title: 'Residential research pathway',
    description:
      'A couple wants to understand whether an SMSF could hold a residential investment property. The discussion focuses on rules, personal-use limits, borrowing structure, costs, and whether professional advice is needed before anything progresses.',
    assumption: 'Based on assumptions about balance, timeframe, risk tolerance, lending position, and willingness to seek advice.',
  },
  {
    label: 'Scenario only',
    title: 'Commercial premises discussion',
    description:
      'A business owner asks whether commercial premises could be explored through an SMSF. The review would need to consider business real property rules, lease terms, cash flow, tenant risk, lending, and compliance.',
    assumption: 'Professional support is required before any structure, lease, or purchase pathway is considered.',
  },
  {
    label: 'Not personal financial advice',
    title: 'Early-stage pathway check',
    description:
      'An individual is unsure whether residential or commercial property is more relevant. The enquiry helps frame questions for appropriately qualified professionals rather than suggesting a preferred path.',
    assumption: 'Illustrative only and not a recommendation or suitability assessment.',
  },
]

const professionalSupport = [
  'Financial adviser',
  'Accountant or tax adviser',
  'SMSF administrator',
  'Finance broker or lender',
  'Solicitor or conveyancer',
  'Property specialist',
]

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="bg-obsidian text-white">
      {/* ===== Hero ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
        {/* Placeholder gradient — replace with branded video loop when asset is available:
            Use a property/finance/advisory editorial loop (no generic lifestyle footage).
            Dimensions: 1920×1080, dark grade, brass-tinted overlay.
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-onyx to-obsidian" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1200px 600px at 50% 0%, rgba(181, 166, 66, 0.15), transparent), radial-gradient(800px 400px at 80% 100%, rgba(181, 166, 66, 0.06), transparent)',
          }}
        />

        <div className="glass-panel relative z-10 max-w-[800px] w-full mx-auto p-6 sm:p-8 md:p-12 text-center">
          <span className="block uppercase tracking-[0.25em] text-[0.65rem] sm:text-xs font-semibold text-brass-gold mb-3">
            Amplify X-Change &nbsp;| &nbsp;SMSF Property Pathway
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.12] mb-5 text-white">
            Explore whether an SMSF property pathway may be worth discussing
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-light text-white/70 mb-8 max-w-[600px] mx-auto leading-relaxed">
            Amplify X-Change by Amplify Solutions Group is an online‑first
            enquiry and discovery pathway designed to help Australians
            understand the general process, risks, costs, and professional
            support involved in SMSF property investment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/quiz"
              className="inline-flex items-center justify-center px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold bg-brass-gold text-obsidian rounded-lg transition-all duration-300 hover:bg-brass-gold-light hover:-translate-y-[3px] hover:shadow-[0_10px_25px_rgba(181,166,66,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Start online enquiry
            </Link>
            <Link
              to="/book-discovery"
              aria-label="Book a no-obligation discovery call"
              className="inline-flex items-center justify-center px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold bg-transparent text-white border border-brass-gold rounded-lg transition-all duration-300 hover:bg-brass-gold hover:bg-opacity-10 hover:-translate-y-[3px]"
            >
              Book a discovery call
            </Link>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="trust-badge">Online discovery appointments</span>
            <span className="trust-badge">General information only</span>
            <span className="trust-badge">Connections to trusted professionals</span>
            <span className="trust-badge">
              Property, finance, taxation and SMSF support pathways
            </span>
          </div>
        </div>
      </section>

      {/* ===== Framework / Pathway (4-card) ===== */}
      <section className="bg-onyx border-t border-white/5 px-4 py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <span className="block uppercase tracking-[0.25em] text-xs font-semibold text-brass-gold mb-3">
              A guided pathway, not a sales shortcut
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] mb-6 text-white">
              A structured online enquiry and discovery process
            </h2>
            <p className="text-white/50 max-w-[700px] mx-auto text-lg">
              Designed to help you understand the steps involved and identify
              which professional support areas may be relevant to your situation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {frameworkSteps.map((step) => (
              <div key={step.number} className="premium-card brass-corners text-center">
                <div className="brass-number">{step.number}</div>
                <span className="block uppercase tracking-[0.2em] text-[0.7rem] font-semibold text-brass-gold mb-3">
                  {step.label}
                </span>
                <p className="text-sm text-white/70 leading-relaxed">
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SMSF Property Education ===== */}
      <section className="bg-obsidian px-4 py-20 md:py-28">
        <div className="max-w-[1160px] mx-auto">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <span className="block uppercase tracking-[0.25em] text-xs font-semibold text-brass-gold mb-3">
                SMSF property pathways explained
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] mb-6 text-white">
                Understand the pathway before considering the property
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                Amplify X-Change helps users understand the general process,
                risks, costs, and professional support involved in exploring
                SMSF property. It is an education-first pathway, not personal
                financial advice or a suitability assessment.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/quiz"
                  className="inline-flex items-center justify-center px-7 py-3 text-sm uppercase tracking-[0.15em] font-semibold bg-brass-gold text-obsidian rounded-lg transition-all duration-300 hover:bg-brass-gold-light hover:-translate-y-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Start online enquiry
                </Link>
                <Link
                  to="/quiz"
                  className="inline-flex items-center justify-center px-7 py-3 text-sm uppercase tracking-[0.15em] font-semibold border border-brass-gold text-white rounded-lg transition-all duration-300 hover:bg-brass-gold/10 hover:-translate-y-[2px]"
                >
                  Explore the pathway
                </Link>
              </div>
            </div>

            <div className="grid gap-5">
              {pathwayCards.map((pathway) => (
                <article key={pathway.label} className="premium-card brass-corners">
                  <span className="block uppercase tracking-[0.22em] text-[0.68rem] font-semibold text-brass-gold mb-3">
                    {pathway.label}
                  </span>
                  <h3 className="font-display text-2xl font-light text-white mb-5">
                    {pathway.title}
                  </h3>
                  <ul className="space-y-3 text-sm leading-6 text-white/70">
                    {pathway.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <AlertTriangle className="h-4 w-4 text-brass-gold mt-1 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Residential vs Commercial Comparison ===== */}
      <section className="bg-onyx border-t border-white/5 px-4 py-20 md:py-28">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center mb-14">
            <span className="block uppercase tracking-[0.25em] text-xs font-semibold text-brass-gold mb-3">
              Residential vs commercial comparison
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] mb-5 text-white">
              Different property types can raise different questions
            </h2>
            <p className="text-white/50 max-w-[720px] mx-auto text-lg">
              This comparison is general information only. The right questions,
              documents, costs, and professional review can vary by individual
              circumstances.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-brass-gold/20 bg-card-surface">
            <div className="hidden md:grid grid-cols-[0.85fr_1fr_1fr] border-b border-white/10 bg-white/[0.03]">
              <div className="px-5 py-4 text-xs uppercase tracking-[0.2em] text-brass-gold font-semibold">
                Compare
              </div>
              <div className="px-5 py-4 text-xs uppercase tracking-[0.2em] text-brass-gold font-semibold">
                Residential
              </div>
              <div className="px-5 py-4 text-xs uppercase tracking-[0.2em] text-brass-gold font-semibold">
                Commercial
              </div>
            </div>
            <div className="divide-y divide-white/10">
              {comparisonRows.map((row) => (
                <div
                  key={row.topic}
                  className="grid gap-4 p-5 md:grid-cols-[0.85fr_1fr_1fr] md:gap-0 md:p-0"
                >
                  <div className="md:px-5 md:py-5">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
                      {row.topic}
                    </h3>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-obsidian/50 p-4 text-sm leading-6 text-white/70 md:rounded-none md:border-0 md:border-l md:border-white/10 md:bg-transparent md:px-5 md:py-5">
                    <span className="mb-1 block text-[0.65rem] uppercase tracking-[0.18em] text-brass-gold md:hidden">
                      Residential
                    </span>
                    {row.residential}
                  </div>
                  <div className="rounded-lg border border-white/10 bg-obsidian/50 p-4 text-sm leading-6 text-white/70 md:rounded-none md:border-0 md:border-l md:border-white/10 md:bg-transparent md:px-5 md:py-5">
                    <span className="mb-1 block text-[0.65rem] uppercase tracking-[0.18em] text-brass-gold md:hidden">
                      Commercial
                    </span>
                    {row.commercial}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SmsfScenarioCalculator />

      {/* ===== Illustrative Scenarios + Professional Support ===== */}
      <section className="bg-obsidian px-4 py-20 md:py-28">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center mb-14">
            <span className="block uppercase tracking-[0.25em] text-xs font-semibold text-brass-gold mb-3">
              Illustrative scenarios
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] mb-5 text-white">
              Example conversations, not promised outcomes
            </h2>
            <p className="text-white/50 max-w-[720px] mx-auto text-lg">
              These examples are illustrative only, based on assumptions, and
              are not personal financial advice.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {scenarioCards.map((scenario) => (
              <article key={scenario.title} className="premium-card">
                <span className="block uppercase tracking-[0.2em] text-[0.65rem] font-semibold text-brass-gold mb-4">
                  {scenario.label}
                </span>
                <h3 className="font-display text-2xl font-light text-white mb-4">
                  {scenario.title}
                </h3>
                <p className="text-sm leading-6 text-white/70">
                  {scenario.description}
                </p>
                <p className="mt-5 rounded-lg border border-brass-gold/20 bg-obsidian/60 p-4 text-xs leading-5 text-white/55">
                  <span className="font-semibold text-brass-gold">
                    Example assumptions:
                  </span>{' '}
                  {scenario.assumption}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-8 rounded-2xl border border-brass-gold/20 bg-card-surface p-6 md:grid-cols-[0.85fr_1.15fr] md:p-8">
            <div>
              <span className="block uppercase tracking-[0.25em] text-xs font-semibold text-brass-gold mb-3">
                Professional support required
              </span>
              <h3 className="font-display text-3xl font-light text-white mb-4">
                SMSF property often needs multiple qualified inputs
              </h3>
              <p className="text-sm leading-6 text-white/60">
                Before considering next steps, users may need to speak with
                licensed or appropriately qualified professionals who can review
                the relevant advice, tax, legal, lending, administration, and
                property questions.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {professionalSupport.map((role) => (
                <div
                  key={role}
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-obsidian/50 px-4 py-3"
                >
                  <CheckCircle className="h-4 w-4 text-brass-gold shrink-0" />
                  <span className="text-sm text-white/75">{role}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/quiz"
              className="inline-flex items-center justify-center px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold bg-brass-gold text-obsidian rounded-lg transition-all duration-300 hover:bg-brass-gold-light hover:-translate-y-[2px]"
            >
              Start online enquiry
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Who This May Suit / May Not Suit ===== */}
      <section className="bg-obsidian px-4 py-20 md:py-28">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-white mb-6">
                Who this may be worth exploring for
              </h2>
              <ul className="space-y-3">
                {[
                  'People with sufficient superannuation balance',
                  'Those with a long-term investment horizon',
                  'Individuals interested in property investment',
                  'Those willing to seek licensed professional advice',
                  'People comfortable with the compliance requirements of an SMSF',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-brass-gold mt-0.5 shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-white mb-6">
                Who this may not suit
              </h2>
              <ul className="space-y-3">
                {[
                  'Those with insufficient superannuation balance',
                  'People seeking certainty of investment returns',
                  'Those unwilling to seek professional advice',
                  'Individuals uncomfortable with investment risk',
                  'People who need immediate access to their super',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-10 text-sm text-white/40 italic text-center max-w-[660px] mx-auto">
            This is general information only. Suitability can only be determined
            by a licensed professional considering your individual circumstances.
            SMSF property pathways can involve rules, costs, risks, and
            responsibilities that vary by individual circumstances.
          </p>
        </div>
      </section>

      {/* ===== Professional Support Network (Services) ===== */}
      <section className="bg-onyx border-t border-white/5 px-4 py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <span className="block uppercase tracking-[0.25em] text-xs font-semibold text-brass-gold mb-3">
              Professional support network
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] mb-6 text-white">
              Access through our partner network
            </h2>
            <p className="text-white/50 max-w-[650px] mx-auto text-lg">
              One enquiry pathway connects you to conversations across multiple
              professional areas. Amplify X-Change provides general information
              and can help connect you with trusted professionals where
              appropriate.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((svc) => (
              <div key={svc.label} className="service-image-card" role="img" aria-label={`${svc.label}: ${svc.title}. Image placeholder — replace with professional ${svc.label.toLowerCase()} photography.`}>
                {/* Placeholder: replace with branded professional image.
                    Prefer architecture/finance/advisory editorial photography
                    with dark grading and brass-tinted overlays.
                    Recommended: 800×560, dark/moody editorial style.
                */}
                <div className="absolute inset-0 bg-gradient-to-br from-onyx via-card-surface to-onyx flex items-center justify-center">
                  <div className="text-center px-4">
                    <span className="block text-brass-gold text-3xl font-display opacity-25 mb-2">
                      {svc.label.slice(0, 1)}
                    </span>
                    <span className="block text-brass-gold text-[0.6rem] uppercase tracking-[0.3em] opacity-25">
                      {svc.label} imagery
                    </span>
                  </div>
                </div>
                <div className="service-image-overlay">
                  <span className="block uppercase tracking-[0.2em] text-[0.65rem] font-semibold text-brass-gold mb-1">
                    {svc.label}
                  </span>
                  <h3 className="font-display text-lg font-light text-white">
                    {svc.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== About Amplify Solutions Group / Stats ===== */}
      <section className="bg-obsidian px-4 py-20 md:py-28">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <span className="block uppercase tracking-[0.25em] text-xs font-semibold text-brass-gold mb-3">
              About Amplify Solutions Group
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] mb-6 text-white">
              Built on trusted professional introductions
            </h2>
            <p className="text-white/50 max-w-[700px] mx-auto text-lg">
              Amplify Solutions Group operates as a curated connection platform,
              helping clients access trusted professionals across property,
              finance, taxation, accounting, SMSF and related fields. Amplify
              X-Change brings that process online with a cleaner digital
              enquiry, discovery, and referral pathway.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsAbout.map((stat) => (
              <div key={stat.label} className="stat-card">
                <span className="stat-number">{stat.value}</span>
                <span className="text-sm text-white/50">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Risks & Transparency ===== */}
      <section className="bg-onyx border-t border-white/5 px-4 py-20 md:py-28">
        <div className="disclosure-panel">
          <span className="block uppercase tracking-[0.25em] text-xs font-semibold text-brass-gold mb-3">
            Transparent from the beginning
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-light text-white mb-6">
            Important disclosures
          </h2>
          <ul className="space-y-3 text-white/70">
            <li className="flex items-start gap-3">
              <span className="text-brass-gold text-lg leading-none mt-0.5">&#x2022;</span>
              <span>
                SMSF property strategies involve rules, costs, and responsibilities
                that vary by individual circumstances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brass-gold text-lg leading-none mt-0.5">&#x2022;</span>
              <span>
                Personal financial advice should be sought from appropriately
                licensed professionals where required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brass-gold text-lg leading-none mt-0.5">&#x2022;</span>
              <span>
                Amplify X-Change does not determine suitability, lending
                acceptance, investment performance, or outcomes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brass-gold text-lg leading-none mt-0.5">&#x2022;</span>
              <span>
                Consent is requested before your details are shared with relevant
                partners.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brass-gold text-lg leading-none mt-0.5">&#x2022;</span>
              <span>
                This is general information only and does not constitute financial
                advice.
              </span>
            </li>
          </ul>
        </div>

        <div className="max-w-[720px] mx-auto mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-light text-white text-center mb-8">
            Risks and costs to consider
          </h2>
          <ul className="space-y-3 text-white/70">
            {[
              'SMSF setup and ongoing costs (accounting, audit, tax, legal fees)',
              'Property costs including stamp duty, maintenance, and management',
              'Borrowing costs and limited recourse borrowing arrangement requirements',
              'Investment risk — property values can decrease',
              'Liquidity risk — property may be difficult to sell quickly',
              'Diversification risk — concentrating super in one asset class',
              'Compliance requirements and ongoing SMSF obligations',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-brass-gold mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="bg-obsidian px-4 py-20 md:py-28">
        <div className="cta-frame">
          <span className="block uppercase tracking-[0.25em] text-xs font-semibold text-brass-gold mb-4">
            Next step
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-light leading-[1.2] mb-6 text-white">
            Ready to explore whether this pathway may be worth discussing?
          </h2>
          <p className="text-white/50 text-lg mb-8 max-w-[700px] mx-auto">
            Start with a short online enquiry and book a no‑obligation discovery
            call with Amplify X-Change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quiz"
              className="inline-flex items-center justify-center px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold bg-brass-gold text-obsidian rounded-lg transition-all duration-300 hover:bg-brass-gold-light hover:-translate-y-[3px] hover:shadow-[0_10px_25px_rgba(181,166,66,0.3)]"
            >
              Start online enquiry
            </Link>
            <Link
              to="/book-discovery"
              aria-label="Book a no-obligation discovery call"
              className="inline-flex items-center justify-center px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold bg-transparent text-white border border-brass-gold rounded-lg transition-all duration-300 hover:bg-brass-gold hover:bg-opacity-10 hover:-translate-y-[3px]"
            >
              Book a discovery call
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-onyx border-t border-white/5 px-4 py-20 md:py-28">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-light text-white text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="faq-accordion">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-white pr-4">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-brass-gold shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-brass-gold shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 text-white/60 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/faq"
              className="text-brass-gold hover:text-brass-gold-light font-semibold underline transition-colors"
            >
              View all FAQs &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Brass Divider + Extra Compliance ===== */}
      <div className="brass-divider" />
      <div className="bg-obsidian px-4 py-8 text-center">
        <p className="text-white/50 text-xs max-w-[800px] mx-auto leading-relaxed">
          General information only. Amplify X-Change by Amplify Solutions Group
          does not provide personal financial advice through this enquiry page.
          Where financial product advice, SMSF advice, taxation advice,
          accounting advice, lending advice, or legal advice is required,
          clients should speak with appropriately qualified and licensed
          professionals. Referral and partner introductions may occur with
          client consent.
        </p>
      </div>
    </div>
  )
}
