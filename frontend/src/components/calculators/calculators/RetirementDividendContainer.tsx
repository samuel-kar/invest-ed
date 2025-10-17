import { useMemo, useState } from 'react'
import { LabeledInput } from '../shared/InputsGroup'
import FormulaBlock from '../shared/FormulaBlock'
import { useCurrency } from '../../../contexts/CurrencyContext'

export default function RetirementDividendContainer() {
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState<number>(3000)
  const [dividendYieldPercent, setDividendYieldPercent] = useState<number>(4)
  const [yearsUntilIncome, setYearsUntilIncome] = useState<number>(0)
  const [annualGrowthRate, setAnnualGrowthRate] = useState<number>(3)
  const { formatCurrency } = useCurrency()

  const { portfolioNeedToday, portfolioNeededAtYearT, annualIncome } =
    useMemo(() => {
      const y = Math.max(0, dividendYieldPercent) / 100
      const g = Math.max(0, annualGrowthRate) / 100
      const annual = desiredMonthlyIncome * 12
      const T = Math.max(0, yearsUntilIncome)

      // Enhanced formula: PORTFOLIO_NOW = (Annual Income) / (Yield × (1 + g)^T)
      const growthFactor = Math.pow(1 + g, T)
      const portfolioToday = y === 0 ? Infinity : annual / (y * growthFactor)

      // Simple formula for portfolio needed at year T: (Annual Income) / Yield
      const portfolioAtYearT = y === 0 ? Infinity : annual / y

      return {
        portfolioNeedToday: portfolioToday,
        portfolioNeededAtYearT: portfolioAtYearT,
        annualIncome: annual,
      }
    }, [
      desiredMonthlyIncome,
      dividendYieldPercent,
      yearsUntilIncome,
      annualGrowthRate,
    ])

  return (
    <div className="grid md:grid-cols-5 gap-8">
      {/* Input Section */}
      <div className="md:col-span-2 space-y-6">
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

        <LabeledInput
          label="Years until income needed (T)"
          type="number"
          value={yearsUntilIncome}
          onChange={(e) => setYearsUntilIncome(Number(e.target.value))}
          min={0}
          step={1}
          placeholder="0"
        />

        <LabeledInput
          label="Expected annual dividend growth rate (%)"
          type="number"
          value={annualGrowthRate}
          onChange={(e) => setAnnualGrowthRate(Number(e.target.value))}
          min={0}
          max={100}
          step={0.1}
          placeholder="3"
        />
        <p className="text-sm text-gray-500">
          Dividend growth rate represents how much companies increase their
          dividend payouts annually.
          <br />
          <br />
          <strong>Note:</strong> Dividend growth is not guaranteed. Companies
          may reduce or eliminate dividends during economic downturns or poor
          performance.
        </p>
      </div>

      {/* Results Section */}
      <div className="md:col-span-3 space-y-6">
        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              Portfolio needed today
            </div>
            <div
              className="text-lg sm:text-xl lg:text-2xl font-bold break-words"
              style={{ color: 'var(--accent-color)' }}
            >
              {portfolioNeedToday === Infinity
                ? '∞'
                : formatCurrency(Math.round(portfolioNeedToday))}
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
              Portfolio at year {yearsUntilIncome}
            </div>
            <div
              className="text-lg sm:text-xl lg:text-2xl font-bold break-words"
              style={{ color: 'var(--text-primary)' }}
            >
              {portfolioNeededAtYearT === Infinity
                ? '∞'
                : formatCurrency(Math.round(portfolioNeededAtYearT))}
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
              Years until income
            </div>
            <div
              className="text-2xl font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              {yearsUntilIncome}
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
            {yearsUntilIncome === 0 ? (
              <>
                <li className="break-words">
                  • For immediate income: You need a portfolio of{' '}
                  {portfolioNeedToday === Infinity
                    ? '∞'
                    : formatCurrency(Math.round(portfolioNeedToday))}{' '}
                  today to generate {formatCurrency(desiredMonthlyIncome)} per
                  month
                </li>
                <li className="break-words">
                  • Annual income target: {formatCurrency(annualIncome)}
                </li>
                <li className="break-words">
                  • This uses the simple formula (no growth assumptions)
                </li>
              </>
            ) : (
              <>
                <li className="break-words">
                  • For income in {yearsUntilIncome} years: You need{' '}
                  {portfolioNeedToday === Infinity
                    ? '∞'
                    : formatCurrency(Math.round(portfolioNeedToday))}{' '}
                  today, which will grow to{' '}
                  {portfolioNeededAtYearT === Infinity
                    ? '∞'
                    : formatCurrency(Math.round(portfolioNeededAtYearT))}{' '}
                  by year {yearsUntilIncome}
                </li>
                <li className="break-words">
                  • Assumes {annualGrowthRate}% annual growth in dividends
                </li>
                <li className="break-words">
                  • Annual income target: {formatCurrency(annualIncome)}
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Info Block: Formula + Disclaimer */}
        <FormulaBlock title="Dividend Income Formulas">
          <div className="space-y-4">
            <div>
              <p className="mb-2 font-medium">
                Enhanced Formula (with growth):
              </p>
              <p className="mb-2">
                Portfolio needed today =
                <span className="inline-block align-middle mx-1">
                  <span className="block text-center border-b border-current pb-0.5">
                    Desired annual income
                  </span>
                  <span className="block text-center pt-0.5">
                    Dividend yield × (1 + g)<sup>T</sup>
                  </span>
                </span>
              </p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Where g = growth rate (decimal), T = years until income
              </p>
            </div>

            <div>
              <p className="mb-2 font-medium">
                Simple Formula (immediate income):
              </p>
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
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Use when T = 0 (immediate income needed)
              </p>
            </div>
          </div>

          <p
            className="text-xs mt-4"
            style={{ color: 'var(--text-secondary)' }}
          >
            Note: Dividend yields and growth rates can change. "Yield on cost"
            may improve over time as dividends grow while your initial
            investment stays constant.
          </p>
        </FormulaBlock>
      </div>
      <div className="space-y-4">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/O8HfQ5uycBg?si=_I237wsy-3DMHv0d"
          title="YouTube video player"
          frameBorder={0}
          allow={
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          }
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/nJ1qzS3JM20?si=CaiyIe3xdRbpUrMI"
          title="YouTube video player"
          frameBorder={0}
          allow={
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          }
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}
