import { useMemo, useState } from 'react'

type CalculatorValues = {
  currentSuperBalance: number
  annualContributions: number
  superYears: number
  superGrowthRate: number
  smsfBalanceUsed: number
  propertyPurchasePrice: number
  depositAmount: number
  borrowingAmount: number
  interestRate: number
  rentYield: number
  annualPropertyExpenses: number
  propertyGrowthRate: number
  propertyYears: number
}

const defaultValues: CalculatorValues = {
  currentSuperBalance: 250000,
  annualContributions: 15000,
  superYears: 10,
  superGrowthRate: 5,
  smsfBalanceUsed: 250000,
  propertyPurchasePrice: 650000,
  depositAmount: 220000,
  borrowingAmount: 430000,
  interestRate: 7,
  rentYield: 4,
  annualPropertyExpenses: 12000,
  propertyGrowthRate: 3,
  propertyYears: 10,
}

const currencyFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
})

const numberFormatter = new Intl.NumberFormat('en-AU', {
  maximumFractionDigits: 1,
})

function toRate(value: number) {
  return Number.isFinite(value) ? value / 100 : 0
}

function formatCurrency(value: number) {
  if (!Number.isFinite(value)) return '$0'
  return currencyFormatter.format(value)
}

function compoundSuperBalance({
  currentSuperBalance,
  annualContributions,
  superYears,
  superGrowthRate,
}: CalculatorValues) {
  const years = Math.max(0, Math.round(superYears))
  const annualGrowthRate = toRate(superGrowthRate)
  let balance = Math.max(0, currentSuperBalance)

  for (let year = 0; year < years; year += 1) {
    balance = balance * (1 + annualGrowthRate) + Math.max(0, annualContributions)
  }

  return balance
}

function CalculatorInput({
  label,
  value,
  onChange,
  prefix,
  suffix,
  min = 0,
}: {
  label: string
  value: number
  onChange: (value: number) => void
  prefix?: string
  suffix?: string
  min?: number
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-white/80">{label}</span>
      <div className="calculator-input-shell mt-2 flex overflow-hidden rounded-lg border border-white/10 bg-obsidian/70 focus-within:border-brass-gold focus-within:ring-2 focus-within:ring-brass-gold/20">
        {prefix && (
          <span className="flex items-center border-r border-white/10 px-3 text-sm text-white/45">
            {prefix}
          </span>
        )}
        <input
          type="number"
          inputMode="decimal"
          min={min}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none"
        />
        {suffix && (
          <span className="flex items-center border-l border-white/10 px-3 text-sm text-white/45">
            {suffix}
          </span>
        )}
      </div>
    </label>
  )
}

function ResultRow({
  label,
  value,
  tone = 'neutral',
}: {
  label: string
  value: string
  tone?: 'neutral' | 'accent'
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/10 py-3 last:border-b-0">
      <dt className="text-sm leading-5 text-white/60">{label}</dt>
      <dd
        className={`text-right text-sm font-semibold ${
          tone === 'accent' ? 'text-brass-gold' : 'text-white'
        }`}
      >
        {value}
      </dd>
    </div>
  )
}

function ResultMetric({
  label,
  value,
  tone = 'neutral',
}: {
  label: string
  value: string
  tone?: 'neutral' | 'accent'
}) {
  return (
    <div className="calculator-metric rounded-xl border border-white/10 bg-obsidian/55 p-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
        {label}
      </dt>
      <dd
        className={`mt-2 font-display text-2xl font-light ${
          tone === 'accent' ? 'text-brass-gold' : 'text-white'
        }`}
      >
        {value}
      </dd>
    </div>
  )
}

export default function SmsfScenarioCalculator() {
  const [values, setValues] = useState<CalculatorValues>(defaultValues)

  const years = Math.max(0, Math.round(values.propertyYears))

  const results = useMemo(() => {
    const superFundBalance = compoundSuperBalance(values)
    const propertyValue =
      Math.max(0, values.propertyPurchasePrice) *
      Math.pow(1 + toRate(values.propertyGrowthRate), years)
    const loanBalance = Math.max(0, values.borrowingAmount)
    const propertyEquity = propertyValue - loanBalance
    const annualGrossRent = Math.max(0, values.propertyPurchasePrice) * toRate(values.rentYield)
    const annualInterestCost = loanBalance * toRate(values.interestRate)
    const annualExpenses = Math.max(0, values.annualPropertyExpenses)
    const annualNetCashFlowBeforeTax =
      annualGrossRent - annualInterestCost - annualExpenses
    const scenarioDifference = propertyEquity - superFundBalance

    return {
      superFundBalance,
      propertyValue,
      loanBalance,
      propertyEquity,
      annualGrossRent,
      annualInterestCost,
      annualExpenses,
      annualNetCashFlowBeforeTax,
      scenarioDifference,
    }
  }, [values, years])

  function updateValue(field: keyof CalculatorValues, value: number) {
    setValues((current) => ({
      ...current,
      [field]: Number.isFinite(value) ? value : 0,
    }))
  }

  return (
    <section className="section-premium section-premium-onyx border-t border-white/5 px-4 py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="mb-12 text-center">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-brass-gold">
            Scenario calculator
          </span>
          <h2 className="font-display text-3xl font-light leading-[1.2] text-white md:text-4xl lg:text-5xl">
            Super vs SMSF Property Scenario Tool
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-white/55 md:text-lg">
            Compare two illustrative pathways using your own assumptions. This
            is not personal financial advice and does not account for all costs,
            tax, lending, legal, insurance, SMSF administration, vacancy,
            liquidity, or personal circumstances.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-6">
            <div className="calculator-card rounded-2xl border border-brass-gold/20 bg-card-surface p-5 sm:p-6">
              <h3 className="font-display text-2xl font-light text-white">
                Super fund scenario
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/50">
                Uses annual compounding with contributions added at the end of
                each year.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <CalculatorInput
                  label="Current super balance"
                  prefix="$"
                  value={values.currentSuperBalance}
                  onChange={(value) => updateValue('currentSuperBalance', value)}
                />
                <CalculatorInput
                  label="Annual contributions"
                  prefix="$"
                  value={values.annualContributions}
                  onChange={(value) => updateValue('annualContributions', value)}
                />
                <CalculatorInput
                  label="Years to compare"
                  suffix="years"
                  value={values.superYears}
                  onChange={(value) => {
                    updateValue('superYears', value)
                    updateValue('propertyYears', value)
                  }}
                />
                <CalculatorInput
                  label="Estimated annual super fund growth rate"
                  suffix="%"
                  value={values.superGrowthRate}
                  onChange={(value) => updateValue('superGrowthRate', value)}
                />
              </div>
            </div>

            <div className="calculator-card rounded-2xl border border-brass-gold/20 bg-card-surface p-5 sm:p-6">
              <h3 className="font-display text-2xl font-light text-white">
                SMSF property scenario
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/50">
                Uses a flat loan balance assumption and annual estimates for
                rent, interest, expenses, and property value movement.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <CalculatorInput
                  label="SMSF balance used"
                  prefix="$"
                  value={values.smsfBalanceUsed}
                  onChange={(value) => updateValue('smsfBalanceUsed', value)}
                />
                <CalculatorInput
                  label="Property purchase price"
                  prefix="$"
                  value={values.propertyPurchasePrice}
                  onChange={(value) => updateValue('propertyPurchasePrice', value)}
                />
                <CalculatorInput
                  label="Deposit amount"
                  prefix="$"
                  value={values.depositAmount}
                  onChange={(value) => updateValue('depositAmount', value)}
                />
                <CalculatorInput
                  label="Borrowing amount"
                  prefix="$"
                  value={values.borrowingAmount}
                  onChange={(value) => updateValue('borrowingAmount', value)}
                />
                <CalculatorInput
                  label="Estimated interest rate"
                  suffix="%"
                  value={values.interestRate}
                  onChange={(value) => updateValue('interestRate', value)}
                />
                <CalculatorInput
                  label="Estimated rent yield"
                  suffix="%"
                  value={values.rentYield}
                  onChange={(value) => updateValue('rentYield', value)}
                />
                <CalculatorInput
                  label="Estimated annual property expenses"
                  prefix="$"
                  value={values.annualPropertyExpenses}
                  onChange={(value) =>
                    updateValue('annualPropertyExpenses', value)
                  }
                />
                <CalculatorInput
                  label="Estimated property value growth rate"
                  suffix="%"
                  value={values.propertyGrowthRate}
                  onChange={(value) => updateValue('propertyGrowthRate', value)}
                />
                <CalculatorInput
                  label="Years to compare"
                  suffix="years"
                  value={values.propertyYears}
                  onChange={(value) => {
                    updateValue('propertyYears', value)
                    updateValue('superYears', value)
                  }}
                />
              </div>
            </div>
          </div>

          <aside className="calculator-results rounded-2xl border border-brass-gold/30 bg-card-surface p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:p-6 lg:sticky lg:top-6 lg:self-start">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.24em] text-brass-gold">
              Illustrative results
            </span>
            <h3 className="font-display text-2xl font-light text-white">
              Based on your assumptions
            </h3>
            <dl className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <ResultMetric
                label="Super estimate"
                value={formatCurrency(results.superFundBalance)}
              />
              <ResultMetric
                label="Property equity"
                value={formatCurrency(results.propertyEquity)}
                tone="accent"
              />
              <ResultMetric
                label="Scenario difference"
                value={formatCurrency(results.scenarioDifference)}
                tone="accent"
              />
            </dl>

            <dl className="mt-5 rounded-xl border border-white/10 bg-obsidian/45 px-4">
              <ResultRow
                label="Estimated super fund balance"
                value={formatCurrency(results.superFundBalance)}
              />
              <ResultRow
                label="Estimated property value"
                value={formatCurrency(results.propertyValue)}
              />
              <ResultRow
                label="Estimated loan balance"
                value={formatCurrency(results.loanBalance)}
              />
              <ResultRow
                label="Estimated SMSF property equity"
                value={formatCurrency(results.propertyEquity)}
                tone="accent"
              />
              <ResultRow
                label="Estimated annual gross rent"
                value={formatCurrency(results.annualGrossRent)}
              />
              <ResultRow
                label="Estimated annual interest cost"
                value={formatCurrency(results.annualInterestCost)}
              />
              <ResultRow
                label="Estimated annual expenses"
                value={formatCurrency(results.annualExpenses)}
              />
              <ResultRow
                label="Estimated annual net cash flow before tax"
                value={formatCurrency(results.annualNetCashFlowBeforeTax)}
              />
              <ResultRow
                label="Difference between the two illustrative scenarios"
                value={formatCurrency(results.scenarioDifference)}
                tone="accent"
              />
            </dl>

            <div className="mt-6 rounded-lg border border-white/10 bg-obsidian/60 p-4 text-xs leading-5 text-white/60">
              <p className="font-semibold text-brass-gold">Assumptions shown</p>
              <p className="mt-2">
                Super scenario: {numberFormatter.format(values.superYears)} years,
                {` ${numberFormatter.format(values.superGrowthRate)}% `}
                annual growth rate, with annual contributions added after each
                year.
              </p>
              <p className="mt-2">
                Property scenario: {numberFormatter.format(years)} years,
                interest-only loan balance, gross rent based on purchase price,
                and annual expenses before tax.
              </p>
            </div>

            <p className="calculator-disclaimer mt-5 rounded-lg border border-brass-gold/30 bg-brass-gold/10 p-4 text-xs leading-5 text-white/75">
              This tool is for illustrative education only. It does not account
              for all tax, fees, insurance, lending, legal, SMSF administration,
              vacancy, depreciation, liquidity, or personal financial
              circumstances. It is not personal financial advice.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
