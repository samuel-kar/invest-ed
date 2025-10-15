import React, { useMemo, useState } from 'react'
import { LabeledInput } from '../components/InputsGroup'
import MetricRow from '../components/MetricRow'
import FormulaBlock from '../components/FormulaBlock'

export default function RetirementDividendContainer() {
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState<number>(3000)
  const [dividendYieldPercent, setDividendYieldPercent] = useState<number>(4)

  const { portfolioSize, annualIncome, yieldDecimal } = useMemo(() => {
    const y = Math.max(0, dividendYieldPercent) / 100
    const annual = desiredMonthlyIncome * 12
    const size = y === 0 ? Infinity : annual / y
    return {
      portfolioSize: size,
      annualIncome: annual,
      yieldDecimal: y,
    }
  }, [desiredMonthlyIncome, dividendYieldPercent])

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Input Section */}
      <div className="space-y-6">
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Dividend Plan
        </h3>

        <LabeledInput
          label="Desired monthly income ($)"
          type="number"
          value={desiredMonthlyIncome}
          onChange={(e) => setDesiredMonthlyIncome(Number(e.target.value))}
          min={0}
          step={50}
          placeholder="3000"
        />

        <LabeledInput
          label="Dividend yield (%)"
          type="number"
          value={dividendYieldPercent}
          onChange={(e) => setDividendYieldPercent(Number(e.target.value))}
          min={0}
          max={100}
          step={0.1}
          placeholder="4"
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
              Portfolio size
            </div>
            <div
              className="text-2xl font-bold"
              style={{ color: 'var(--accent-color)' }}
            >
              {portfolioSize === Infinity
                ? '∞'
                : `$${Math.round(portfolioSize).toLocaleString()}`}
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
              Annual income
            </div>
            <div
              className="text-2xl font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              ${annualIncome.toLocaleString()}
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
              Dividend yield
            </div>
            <div
              className="text-2xl font-bold"
              style={{ color: 'var(--accent-color)' }}
            >
              {dividendYieldPercent}%
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
            Dividend Projection
          </h4>
          <ul className="space-y-3" style={{ color: 'var(--text-secondary)' }}>
            <li>
              • With a dividend yield of {dividendYieldPercent}% you would need
              a portfolio of{' '}
              {portfolioSize === Infinity
                ? '∞'
                : `$${Math.round(portfolioSize).toLocaleString()}`}{' '}
              to target ${desiredMonthlyIncome.toLocaleString()} per month
            </li>
            <li>• Annual income target: ${annualIncome.toLocaleString()}</li>
            <li>• Formula result shown below</li>
          </ul>
        </div>

        {/* Info Block: Formula + Disclaimer */}
        <FormulaBlock title="Dividend Income Formula">
          <p className="mb-2">
            Portfolio size =
            <span className="inline-block align-middle mx-1">
              <span className="block text-center border-b border-current pb-0.5">
                Desired annual income
              </span>
              <span className="block text-center pt-0.5">
                Dividend yield (decimal)
              </span>
            </span>
          </p>
          <p
            className="text-xs mt-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            Note: Dividend yields can change. “Yield on cost” may improve over
            time as dividends grow while your initial investment stays constant.
          </p>
        </FormulaBlock>
      </div>
    </div>
  )
}
