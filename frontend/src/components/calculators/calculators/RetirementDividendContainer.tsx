import { useMemo, useState } from 'react'
import { LabeledInput } from '../shared/InputsGroup'
import FormulaBlock from '../shared/FormulaBlock'
import { useCurrency } from '../../../contexts/CurrencyContext'
import { dividendPortfolioCalculator } from '../../../utils/calculations'
import Card from '../../shared/Card'

export default function RetirementDividendContainer() {
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState<number>(3000)
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(500)
  const [dividendYieldPercent, setDividendYieldPercent] = useState<number>(4)
  const [yearsUntilIncome, setYearsUntilIncome] = useState<number>(20)
  const [capitalAppreciation, setCapitalAppreciation] = useState<number>(4)
  const [inflationRate, setInflationRate] = useState<number>(0)
  const [reinvestDividends, setReinvestDividends] = useState<boolean>(true)
  const { formatCurrency } = useCurrency()

  // Rate used for compounding while accumulating
  const growthRateUsed = reinvestDividends
    ? dividendYieldPercent + capitalAppreciation // total return when reinvesting
    : capitalAppreciation // price-only growth otherwise

  const {
    startingPrincipalNeeded,
    portfolioNeededAtYearT,
    annualIncome,
    futureAnnualIncome,
    totalContributions,
    growthFromPrincipal,
  } = useMemo(
    () =>
      dividendPortfolioCalculator(
        desiredMonthlyIncome,
        monthlyInvestment,
        dividendYieldPercent,
        yearsUntilIncome,
        capitalAppreciation, // pass PRICE growth, not total return
        inflationRate,
        reinvestDividends,
      ),
    [
      desiredMonthlyIncome,
      monthlyInvestment,
      dividendYieldPercent,
      yearsUntilIncome,
      capitalAppreciation,
      inflationRate,
      reinvestDividends,
    ],
  )

  return (
    <div>
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
          label="Monthly Investment ($)"
          type="number"
          value={monthlyInvestment}
          onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
          min={0}
          step={50}
          placeholder="500"
        />
        <p className="text-sm text-gray-500">
          Amount you plan to invest each month during the accumulation phase.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <LabeledInput
            label="Dividend Yield (%)"
            type="number"
            value={dividendYieldPercent}
            onChange={(e) => setDividendYieldPercent(Number(e.target.value))}
            min={0}
            max={100}
            step={0.1}
            placeholder="4"
          />

          <LabeledInput
            label="Capital Appreciation (%)"
            type="number"
            value={capitalAppreciation}
            onChange={(e) => setCapitalAppreciation(Number(e.target.value))}
            min={0}
            max={100}
            step={0.1}
            placeholder="4"
          />
        </div>
        <p className="text-sm text-gray-500">
          <strong>Capital appreciation</strong> is stock price growth only
          (excluding dividends). This avoids double-counting since dividend
          growth is already reflected in price appreciation. Your total return =
          Dividend Yield + Capital Appreciation.
        </p>

        {/* Display growth rate used */}
        <Card className="p-3 border">
          <div className="flex justify-between items-center">
            <span
              className="text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              {reinvestDividends
                ? 'Total annual return used (reinvesting):'
                : 'Growth rate used (no reinvest):'}
            </span>
            <span
              className="text-lg font-bold"
              style={{ color: 'var(--accent-color)' }}
            >
              {growthRateUsed.toFixed(1)}%
            </span>
          </div>
          <p
            className="text-xs mt-1"
            style={{ color: 'var(--text-secondary)' }}
          >
            {reinvestDividends ? (
              <>
                {' '}
                = Dividend Yield ({dividendYieldPercent}%) + Price Growth (
                {capitalAppreciation}%)
              </>
            ) : (
              <> = Price Growth only</>
            )}
          </p>
        </Card>

        <LabeledInput
          label="Years until income needed (T)"
          type="number"
          value={yearsUntilIncome}
          onChange={(e) => setYearsUntilIncome(Number(e.target.value))}
          min={0}
          step={1}
          placeholder="20"
        />

        <LabeledInput
          label="Expected Annual Inflation Rate (%)"
          type="number"
          value={inflationRate}
          onChange={(e) => setInflationRate(Number(e.target.value))}
          min={0}
          max={100}
          step={0.1}
          placeholder="0"
        />
        <p className="text-sm text-gray-500">
          Inflation increases your future cost of living. This rate adjusts your
          desired income to maintain its purchasing power in year T.
        </p>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="reinvest"
            checked={reinvestDividends}
            onChange={(e) => setReinvestDividends(e.target.checked)}
            className="w-4 h-4 rounded"
            style={{
              accentColor: 'var(--accent-color)',
            }}
          />
          <label
            htmlFor="reinvest"
            className="text-sm font-medium cursor-pointer"
            style={{ color: 'var(--text-primary)' }}
          >
            Reinvest dividends during accumulation phase
          </label>
        </div>
        <p className="text-sm text-gray-500">
          If checked, dividends earned before year T will be reinvested to grow
          your portfolio. If unchecked, only price growth compounds.
        </p>
      </div>

      {/* Results Section */}
      <div className="md:col-span-3 space-y-6">
        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-4 border">
            <div
              className="text-sm mb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              Starting Principal Needed Today
            </div>
            <div
              className="text-lg sm:text-xl lg:text-2xl font-bold break-words"
              style={{ color: 'var(--accent-color)' }}
            >
              {startingPrincipalNeeded === Infinity
                ? '∞'
                : startingPrincipalNeeded <= 0 && monthlyInvestment > 0
                  ? '$0 (Contributions sufficient)'
                  : formatCurrency(Math.round(startingPrincipalNeeded))}
            </div>
          </Card>

          <Card className="p-4 border">
            <div
              className="text-sm mb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              Portfolio Target at Year {yearsUntilIncome}
            </div>
            <div
              className="text-lg sm:text-xl lg:text-2xl font-bold break-words"
              style={{ color: 'var(--text-primary)' }}
            >
              {portfolioNeededAtYearT === Infinity
                ? '∞'
                : formatCurrency(Math.round(portfolioNeededAtYearT))}
            </div>
          </Card>

          <Card className="p-4 border">
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
          </Card>

          <Card className="p-4 border">
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
          </Card>
        </div>

        {/* Projection */}
        <Card className="p-4">
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
                  {startingPrincipalNeeded === Infinity
                    ? '∞'
                    : formatCurrency(Math.round(startingPrincipalNeeded))}{' '}
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
                  • Your target annual income will be{' '}
                  <strong>
                    {formatCurrency(Math.round(futureAnnualIncome))}
                  </strong>{' '}
                  after {inflationRate}% annual inflation.
                </li>
                <li className="break-words">
                  • To reach your{' '}
                  <strong>
                    {formatCurrency(Math.round(portfolioNeededAtYearT))}
                  </strong>{' '}
                  goal, you need an initial principal of{' '}
                  <strong>
                    {formatCurrency(
                      Math.round(
                        startingPrincipalNeeded < 0
                          ? 0
                          : startingPrincipalNeeded,
                      ),
                    )}
                  </strong>
                  .
                </li>
                <li className="break-words">
                  • Your monthly investments of{' '}
                  {formatCurrency(monthlyInvestment)} are projected to grow to{' '}
                  <strong>
                    {formatCurrency(Math.round(totalContributions))}
                  </strong>
                  .
                </li>
                <li className="break-words">
                  • Your initial principal is projected to grow to{' '}
                  <strong>
                    {growthFromPrincipal === Infinity
                      ? '∞'
                      : formatCurrency(Math.round(growthFromPrincipal))}
                  </strong>
                  .
                </li>
              </>
            )}
          </ul>
        </Card>

        {/* Info Block: Formula + Disclaimer */}
        <FormulaBlock title="Dividend Income Formulas">
          <div className="space-y-4">
            <div>
              <p className="mb-2 font-medium">
                1. Future Income (Inflation-Adjusted)
              </p>
              <p className="text-sm">
                Future Income = Annual Income × (1 + Inflation)<sup>T</sup>
              </p>
            </div>
            <div>
              <p className="mb-2 font-medium">2. Portfolio Goal</p>
              <p className="text-sm">
                Portfolio Goal = Future Income / Dividend Yield
              </p>
            </div>
            <div>
              <p className="mb-2 font-medium">
                3. Future Value of Monthly Investments
              </p>
              <p className="text-sm">
                FV Contributions = Monthly × [((1+r)<sup>n</sup> - 1) / r]
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                Where r = monthly rate, n = number of months
              </p>
            </div>
            <div>
              <p className="mb-2 font-medium">4. Starting Principal Needed</p>
              <p className="text-sm">
                Principal = (Portfolio Goal − FV Contributions) / (1 +{' '}
                <strong>{(growthRateUsed / 100).toFixed(4)}</strong>)
                <sup>T</sup>
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                The growth rate {(growthRateUsed / 100).toFixed(4)} is{' '}
                {reinvestDividends
                  ? 'Dividend Yield + Price Growth'
                  : 'Price Growth only'}
                .
              </p>
            </div>
          </div>
          <p
            className="text-xs mt-4"
            style={{ color: 'var(--text-secondary)' }}
          >
            <strong>Note:</strong> All rates are assumed constant. These are
            estimates for planning purposes only.
          </p>
        </FormulaBlock>
      </div>
    </div>
    <div className="mt-8 w-full max-w-2xl mx-auto">
      <h4
        className="text-sm font-medium mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        Recommended Videos
      </h4>
      <div className="space-y-4">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube-nocookie.com/embed/O8HfQ5uycBg?si=_I237wsy-3DMHv0d"
            title="YouTube video player"
            frameBorder={0}
            allow={
              'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            }
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
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
    </div>
    </div>
  )
}
