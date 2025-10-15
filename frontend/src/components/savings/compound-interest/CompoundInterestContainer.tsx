import React, { useState } from 'react'
import { monthlyCompoundInterestCalculator } from '../../../utils/calculations'
import { LabeledInput } from '../components/InputsGroup'
import MetricRow from '../components/MetricRow'
import FormulaBlock from '../components/FormulaBlock'

export default function CompoundInterestContainer() {
  const [startValue, setStartValue] = useState<number>(10000)
  const [annualRate, setAnnualRate] = useState<number>(7)
  const [years, setYears] = useState<number>(10)
  const [monthlyInput, setMonthlyInput] = useState<number>(500)

  const finalValue = monthlyCompoundInterestCalculator(
    startValue,
    annualRate,
    years,
    monthlyInput,
  )

  const totalContributions = startValue + monthlyInput * years * 12
  const totalGains = finalValue - totalContributions

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Input Section */}
      <div className="space-y-6">
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Investment Parameters
        </h3>

        <LabeledInput
          label="Initial Investment ($)"
          type="number"
          value={startValue}
          onChange={(e) => setStartValue(Number(e.target.value))}
          min={0}
          step={100}
        />

        <LabeledInput
          label="Expected return per year (%)"
          type="number"
          value={annualRate}
          onChange={(e) => setAnnualRate(Number(e.target.value))}
          min={0}
          max={100}
          step={0.1}
        />

        <LabeledInput
          label="Investment Period (Years)"
          type="number"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          min={1}
          max={50}
          step={1}
        />

        <LabeledInput
          label="Monthly Contribution ($)"
          type="number"
          value={monthlyInput}
          onChange={(e) => setMonthlyInput(Number(e.target.value))}
          min={0}
          step={50}
        />
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Investment Results
        </h3>

        <div
          className="p-4 rounded-lg"
          style={{ backgroundColor: 'var(--bg-tertiary)' }}
        >
          <div className="space-y-3">
            <MetricRow
              label="Initial Investment:"
              value={`$${startValue.toLocaleString()}`}
            />
            <MetricRow
              label="Total Contributions:"
              value={`$${(monthlyInput * years * 12).toLocaleString()}`}
            />
            <MetricRow
              label="Total Invested:"
              value={`$${totalContributions.toLocaleString()}`}
            />
            <hr style={{ borderColor: 'var(--border-color)' }} />
            <MetricRow
              label="Investment Gains:"
              value={`$${totalGains.toLocaleString()}`}
            />
            <MetricRow
              label="Final Value:"
              value={`$${finalValue.toLocaleString()}`}
              highlight
            />
          </div>
        </div>

        <FormulaBlock>
          <p className="mb-2">
            FV = PV × (1 + r)<sup>n</sup> + PMT ×
            <span className="inline-block align-middle mx-1">
              <span className="block text-center border-b border-current pb-0.5">
                (1 + r)<sup>n</sup> - 1
              </span>
              <span className="block text-center pt-0.5">r</span>
            </span>
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Where: FV = Future Value, PV = Present Value, r = Monthly Rate, n =
            Number of Months, PMT = Monthly Payment
          </p>
        </FormulaBlock>
      </div>
    </div>
  )
}
