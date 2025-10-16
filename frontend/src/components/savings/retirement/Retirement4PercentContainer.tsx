import { useMemo, useState } from 'react'
import { LabeledInput } from '../shared/InputsGroup'
import FormulaBlock from '../shared/FormulaBlock'

export default function Retirement4PercentContainer() {
  const [currentAge, setCurrentAge] = useState<number>(30)
  const [retirementAge, setRetirementAge] = useState<number>(65)
  const [currentSavings, setCurrentSavings] = useState<number>(50000)
  const [monthlyContribution, setMonthlyContribution] = useState<number>(1000)
  const [annualRate, setAnnualRate] = useState<number>(7)

  const {
    yearsToRetirement,
    fundAtRetirement,
    startingGrowthValue,
    contributionsValue,
    annualIncome,
    monthlyIncome,
  } = useMemo(() => {
    const years = Math.max(0, retirementAge - currentAge)
    const months = years * 12
    const monthlyRate = annualRate / 12 / 100

    const pow = Math.pow(1 + monthlyRate, months)

    let fund = 0
    let startingGrowth = 0
    if (monthlyRate === 0) {
      startingGrowth = currentSavings
      fund = currentSavings + monthlyContribution * months
    } else {
      startingGrowth = currentSavings * pow
      fund = startingGrowth + (monthlyContribution * (pow - 1)) / monthlyRate
    }
    const contributions = Math.max(0, fund - startingGrowth)
    const annual = fund * 0.04
    const monthly = annual / 12

    return {
      yearsToRetirement: years,
      fundAtRetirement: Math.round(fund),
      startingGrowthValue: Math.round(startingGrowth),
      contributionsValue: Math.round(contributions),
      annualIncome: Math.round(annual),
      monthlyIncome: Math.round(monthly),
    }
  }, [
    currentAge,
    retirementAge,
    currentSavings,
    monthlyContribution,
    annualRate,
  ])

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Input Section */}
      <div className="space-y-6">
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Retirement Plan
        </h3>

        <LabeledInput
          label="Current age"
          type="number"
          value={currentAge}
          onChange={(e) => setCurrentAge(Number(e.target.value))}
          min={0}
          max={120}
          step={1}
          placeholder="30"
        />

        <LabeledInput
          label="Retirement age"
          type="number"
          value={retirementAge}
          onChange={(e) => setRetirementAge(Number(e.target.value))}
          min={0}
          max={120}
          step={1}
          placeholder="65"
        />

        <LabeledInput
          label="Current Savings ($)"
          type="number"
          value={currentSavings}
          onChange={(e) => setCurrentSavings(Number(e.target.value))}
          min={0}
          step={100}
          placeholder="50000"
        />

        <LabeledInput
          label="Monthly Contribution ($)"
          type="number"
          value={monthlyContribution}
          onChange={(e) => setMonthlyContribution(Number(e.target.value))}
          min={0}
          step={50}
          placeholder="1000"
        />

        <LabeledInput
          label="Expected return per year (%)"
          type="number"
          value={annualRate}
          onChange={(e) => setAnnualRate(Number(e.target.value))}
          min={0}
          max={100}
          step={0.1}
          placeholder="7"
        />
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            className="p-4 rounded-lg border"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div
              className="text-sm mb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              At Retirement
            </div>
            <div
              className="text-2xl font-bold"
              style={{ color: 'var(--accent-color)' }}
            >
              ${fundAtRetirement.toLocaleString()}
            </div>
          </div>

          <div
            className="p-4 rounded-lg border"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div
              className="text-sm mb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              Monthly Income
            </div>
            <div
              className="text-2xl font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              ${monthlyIncome.toLocaleString()}
            </div>
          </div>

          <div
            className="p-4 rounded-lg border"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div
              className="text-sm mb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              Years to Retirement
            </div>
            <div
              className="text-2xl font-bold"
              style={{ color: 'var(--accent-color)' }}
            >
              {yearsToRetirement}
            </div>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              years
            </div>
          </div>
        </div>

        {/* Projection */}
        <div
          className="p-4 rounded-lg"
          style={{ backgroundColor: 'var(--bg-tertiary)' }}
        >
          <h4
            className="font-semibold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Retirement Projection
          </h4>
          <ul className="space-y-3" style={{ color: 'var(--text-secondary)' }}>
            <li>
              • Starting with ${currentSavings.toLocaleString()} will grow to $
              {startingGrowthValue.toLocaleString()}
            </li>
            <li>
              • Monthly contributions of ${monthlyContribution.toLocaleString()}{' '}
              will add ${contributionsValue.toLocaleString()}
            </li>
            <li>
              • Total at age {retirementAge}: $
              {fundAtRetirement.toLocaleString()}
            </li>
            <li>
              You can safely withdraw ${monthlyIncome.toLocaleString()}/month ($
              {annualIncome.toLocaleString()}/year)
            </li>
          </ul>
        </div>

        {/* Info Block: 4% Rule */}
        <FormulaBlock title="The 4% Rule">
          <p className="mb-2">
            Based on historical data, withdrawing 4% annually from your
            portfolio has a high probability of lasting 30+ years in retirement.
          </p>
          <p>
            This assumes a balanced portfolio and adjusting for inflation each
            year.
          </p>
        </FormulaBlock>
      </div>
    </div>
  )
}
