import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { monthlyCompoundInterestCalculator } from '../../utils/calculations'

export const Route = createFileRoute('/savings/CompoundInterest')({
  component: CompoundInterestPage,
})

function CompoundInterestPage() {
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
    <div className="max-w-6xl mx-auto">
      <div className="p-6">
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Monthly Compound Interest Calculator
        </h2>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
          Calculate how your investment will grow over time with compound
          interest and regular monthly contributions.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Investment Parameters
            </h3>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Initial Investment ($)
              </label>
              <input
                type="number"
                value={startValue}
                onChange={(e) => setStartValue(Number(e.target.value))}
                className="w-full p-3 rounded-md transition-colors"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                }}
                min="0"
                step="100"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Annual Interest Rate (%)
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
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Investment Period (Years)
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
                min="1"
                max="50"
                step="1"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Monthly Contribution ($)
              </label>
              <input
                type="number"
                value={monthlyInput}
                onChange={(e) => setMonthlyInput(Number(e.target.value))}
                className="w-full p-3 rounded-md transition-colors"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                }}
                min="0"
                step="50"
              />
            </div>
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
                <div className="flex justify-between items-center">
                  <span style={{ color: 'var(--text-secondary)' }}>
                    Initial Investment:
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    ${startValue.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span style={{ color: 'var(--text-secondary)' }}>
                    Total Contributions:
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    ${(monthlyInput * years * 12).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span style={{ color: 'var(--text-secondary)' }}>
                    Total Invested:
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    ${totalContributions.toLocaleString()}
                  </span>
                </div>

                <hr style={{ borderColor: 'var(--border-color)' }} />

                <div className="flex justify-between items-center">
                  <span style={{ color: 'var(--text-secondary)' }}>
                    Investment Gains:
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: 'var(--accent-color)' }}
                  >
                    ${totalGains.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center text-lg">
                  <span
                    className="font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Final Value:
                  </span>
                  <span
                    className="font-bold"
                    style={{ color: 'var(--accent-color)' }}
                  >
                    ${finalValue.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
            >
              <h4
                className="font-semibold mb-2"
                style={{ color: 'var(--accent-color)' }}
              >
                Key Insights:
              </h4>
              <ul
                className="text-sm space-y-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                <li>
                  • Your money will grow{' '}
                  {((finalValue / totalContributions - 1) * 100).toFixed(1)}%
                  over {years} years
                </li>
                <li>• Monthly compounding accelerates growth</li>
                <li>• Regular contributions significantly boost returns</li>
                <li>• Time in the market is crucial for compound growth</li>
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
                  FV = PV × (1 + r)<sup>n</sup> + PMT ×
                  <span className="inline-block align-middle mx-1">
                    <span className="block text-center border-b border-current pb-0.5">
                      (1 + r)<sup>n</sup> - 1
                    </span>
                    <span className="block text-center pt-0.5">r</span>
                  </span>
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Where: FV = Future Value, PV = Present Value, r = Monthly
                  Rate, n = Number of Months, PMT = Monthly Payment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
