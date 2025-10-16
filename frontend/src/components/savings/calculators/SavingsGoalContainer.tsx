import { useState } from 'react'
import { savingsGoalCalculator } from '../../../utils/calculations'
import { LabeledInput } from '../shared/InputsGroup'
import MetricRow from '../shared/MetricRow'
import AdjustPlan from '../shared/AdjustPlan'
import FormulaBlock from '../shared/FormulaBlock'

export default function SavingsGoalContainer() {
  const [goalAmount, setGoalAmount] = useState<number>(50000)
  const [currentSavings, setCurrentSavings] = useState<number>(10000)
  const [annualRate, setAnnualRate] = useState<number>(5)
  const [years, setYears] = useState<number>(5)
  const [months, setMonths] = useState<number>(0)

  const monthlyPayment = savingsGoalCalculator(
    goalAmount,
    currentSavings,
    annualRate,
    years,
    months,
  )

  const amountNeeded = Math.max(0, goalAmount - currentSavings)

  const calculateAlternativeYears = () => {
    if (years < 5) return years * 2
    if (years < 10) return years + 5
    return years + 2
  }

  const alternativeYears = calculateAlternativeYears()
  const alternativeMonthlyPayment = savingsGoalCalculator(
    goalAmount,
    currentSavings,
    annualRate,
    alternativeYears,
    months,
  )

  return (
    <div className="grid md:grid-cols-5 gap-8">
      {/* Input Section */}
      <div className="md:col-span-2 space-y-6">
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Goal Parameters
        </h3>

        <LabeledInput
          label="Goal Amount ($)"
          type="number"
          value={goalAmount}
          onChange={(e) => setGoalAmount(Number(e.target.value))}
          min={0}
          step={100}
          placeholder="50000"
        />

        <LabeledInput
          label="Current Savings ($)"
          type="number"
          value={currentSavings}
          onChange={(e) => setCurrentSavings(Number(e.target.value))}
          min={0}
          step={100}
          placeholder="10000"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <LabeledInput
            label="Time Period (Years)"
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            min={0}
            step={1}
            placeholder="5"
          />
          <LabeledInput
            label="Months"
            type="number"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            min={0}
            max={11}
            step={1}
            placeholder="0"
          />
        </div>

        <LabeledInput
          label="Expected return per year (%)"
          type="number"
          value={annualRate}
          onChange={(e) => setAnnualRate(Number(e.target.value))}
          min={0}
          max={100}
          step={0.1}
          placeholder="5"
        />
      </div>

      {/* Results Section */}
      <div className="md:col-span-3 space-y-6">
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Goal Timeline
        </h3>

        <div
          className="p-4 rounded-lg max-w-lg"
          style={{ backgroundColor: 'var(--bg-tertiary)' }}
        >
          <div className="space-y-3">
            <MetricRow
              label="Goal Amount:"
              value={`$${goalAmount.toLocaleString()}`}
            />
            <MetricRow
              label="Current Savings:"
              value={`$${currentSavings.toLocaleString()}`}
            />
            <MetricRow
              label="Amount Needed:"
              value={`$${amountNeeded.toLocaleString()}`}
            />

            <hr style={{ borderColor: 'var(--border-color)' }} />

            <MetricRow
              label="Time to Goal:"
              value={`${years} years ${months} months`}
            />
            <MetricRow
              label="Monthly Contribution:"
              value={`$${Math.round(monthlyPayment).toLocaleString()}`}
              highlight
            />
          </div>
        </div>

        <AdjustPlan
          currentMonthly={monthlyPayment}
          altYears={alternativeYears}
          altMonths={months}
          altMonthly={alternativeMonthlyPayment}
        />

        <FormulaBlock>
          <p className="mb-2">
            <strong>General (r ≠ 0):</strong>
          </p>
          <p className="mb-2">
            PMT =
            <span className="inline-block align-middle mx-1">
              <span className="block text-center border-b border-current pb-0.5">
                r × ( FV - ( PV × (1 + r)<sup>n</sup> ) )
              </span>
              <span className="block text-center pt-0.5">
                (1 + r)
                <sup>n</sup> - 1
              </span>
            </span>
          </p>
          <p className="mb-2">
            <strong>Special case (r = 0):</strong>
          </p>
          <p className="mb-2">
            PMT =
            <span className="inline-block align-middle mx-1">
              <span className="block text-center border-b border-current pb-0.5">
                FV - PV
              </span>
              <span className="block text-center pt-0.5">n</span>
            </span>
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Where: PMT = Monthly Payment, FV = Future Value (Goal), PV = Present
            Value (Current Savings), r = Monthly Rate, n = Number of Months
          </p>
        </FormulaBlock>
      </div>
    </div>
  )
}
