import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { savingsGoalCalculator } from '../../utils/calculations'

export const Route = createFileRoute('/savings/savings-goal')({
  component: SavingsGoalPage,
})

function SavingsGoalPage() {
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

  // Calculate alternative payment with extended timeline
  const calculateAlternativeYears = () => {
    if (years < 5) {
      return years * 2 // Double if less than 5 years
    } else if (years < 10) {
      return years + 5 // Add 5 years if between 5-10
    } else {
      return years + 2 // Add 2 years if 10 or more
    }
  }

  const alternativeYears = calculateAlternativeYears()
  const alternativeMonthlyPayment = savingsGoalCalculator(
    goalAmount,
    currentSavings,
    annualRate,
    alternativeYears,
    months,
  )

  const amountNeeded = goalAmount - currentSavings
  return (
    <div className="max-w-6xl mx-auto">
      <div className="p-6">
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Savings Goal Calculator
        </h2>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
          Calculate how long it will take to reach your financial goals with
          regular monthly contributions.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Goal Parameters
            </h3>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Goal Amount ($)
              </label>
              <input
                type="number"
                value={goalAmount}
                onChange={(e) => setGoalAmount(Number(e.target.value))}
                className="w-full p-3 rounded-md transition-colors"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                }}
                min="0"
                step="100"
                placeholder="50000"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Current Savings ($)
              </label>
              <input
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value))}
                className="w-full p-3 rounded-md transition-colors"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                }}
                min="0"
                step="100"
                placeholder="10000"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Time Period (Years)
                </label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full p-3 rounded-md transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  min="0"
                  step="1"
                  placeholder="5"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Months
                </label>
                <input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full p-3 rounded-md transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  min="0"
                  max="11"
                  step="1"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Expected return per year (%)
              </label>
              <input
                type="number"
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full p-3 rounded-md transition-colors"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                }}
                min="0"
                max="100"
                step="0.1"
                placeholder="5"
              />
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Goal Timeline
            </h3>

            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span style={{ color: 'var(--text-secondary)' }}>
                    Goal Amount:
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    ${goalAmount.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span style={{ color: 'var(--text-secondary)' }}>
                    Current Savings:
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    ${currentSavings.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span style={{ color: 'var(--text-secondary)' }}>
                    Amount Needed:
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    ${amountNeeded.toLocaleString()}
                  </span>
                </div>

                <hr style={{ borderColor: 'var(--border-color)' }} />

                <div className="flex justify-between items-center">
                  <span style={{ color: 'var(--text-secondary)' }}>
                    Time to Goal:
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: 'var(--accent-color)' }}
                  >
                    {years} years {months} months
                  </span>
                </div>

                <div className="flex justify-between items-center text-lg">
                  <span
                    className="font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Monthly Contribution:
                  </span>
                  <span
                    className="font-bold"
                    style={{ color: 'var(--accent-color)' }}
                  >
                    ${Math.round(monthlyPayment).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Adjust Your Plan */}
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
            >
              <h4
                className="font-semibold mb-2"
                style={{ color: 'var(--accent-color)' }}
              >
                Adjust Your Plan
              </h4>
              <p
                className="text-sm mb-3"
                style={{ color: 'var(--text-secondary)' }}
              >
                If ${Math.round(monthlyPayment).toLocaleString()}/month seems
                too high, consider:
              </p>
              <ul
                className="text-sm space-y-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                <li>
                  • Extending your timeline to {alternativeYears} years
                  {months > 0 ? ` ${months} months` : ''} would reduce it to $
                  {Math.round(alternativeMonthlyPayment).toLocaleString()}/month
                </li>
                <li>• Starting with a larger initial amount</li>
                <li>
                  • Looking for higher-return investments (with appropriate
                  risk)
                </li>
              </ul>
            </div>

            {/* Formula Information */}
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
            >
              <h4
                className="font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Formula Used:
              </h4>
              <div
                className="text-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
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
                <p
                  className="text-xs mt-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Where: PMT = Monthly Payment, FV = Future Value (Goal), PV =
                  Present Value (Current Savings), r = Monthly Rate, n = Number
                  of Months
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
