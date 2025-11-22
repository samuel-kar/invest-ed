import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LabeledInput } from '../shared/InputsGroup'
import FormulaBlock from '../shared/FormulaBlock'
import { useCurrency } from '../../../contexts/CurrencyContext'
import { dividendPortfolioCalculator } from '../../../utils/calculations'
import Card from '../../shared/Card'

export default function RetirementDividendContainer() {
  const { t } = useTranslation()
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
            {t('calculator.dividendPlan')}
          </h3>

          <LabeledInput
            label={t('retirement.desiredMonthlyIncome')}
            type="number"
            value={desiredMonthlyIncome}
            onChange={(e) => setDesiredMonthlyIncome(Number(e.target.value))}
            min={0}
            step={50}
            placeholder="3000"
          />

          <LabeledInput
            label={t('retirement.monthlyInvestment')}
            type="number"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
            min={0}
            step={50}
            placeholder="500"
          />
          <p className="text-sm text-gray-500">
            {t('calculator.amountYouPlanToInvest')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <LabeledInput
              label={t('retirement.dividendYield')}
              type="number"
              value={dividendYieldPercent}
              onChange={(e) => setDividendYieldPercent(Number(e.target.value))}
              min={0}
              max={100}
              step={0.1}
              placeholder="4"
            />

            <LabeledInput
              label={t('retirement.capitalAppreciation')}
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
            {t('calculator.capitalAppreciationNote')}
          </p>

          {/* Display growth rate used */}
          <Card className="p-3 border">
            <div className="flex justify-between items-center">
              <span
                className="text-sm font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                {reinvestDividends
                  ? t('calculator.totalAnnualReturnUsed')
                  : t('calculator.growthRateUsed')}
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
                  {t('calculator.dividendYieldPlusPriceGrowth', {
                    yield: dividendYieldPercent.toString(),
                    growth: capitalAppreciation.toString(),
                  })}
                </>
              ) : (
                <> {t('calculator.priceGrowthOnly')}</>
              )}
            </p>
          </Card>

          <LabeledInput
            label={t('retirement.yearsUntilIncome')}
            type="number"
            value={yearsUntilIncome}
            onChange={(e) => setYearsUntilIncome(Number(e.target.value))}
            min={0}
            step={1}
            placeholder="20"
          />

          <LabeledInput
            label={t('retirement.expectedInflation')}
            type="number"
            value={inflationRate}
            onChange={(e) => setInflationRate(Number(e.target.value))}
            min={0}
            max={100}
            step={0.1}
            placeholder="0"
          />
          <p className="text-sm text-gray-500">
            {t('calculator.inflationNote')}
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
              {t('calculator.reinvestDividendsLabel')}
            </label>
          </div>
          <p className="text-sm text-gray-500">
            {t('calculator.reinvestDividendsNote')}
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
                {t('calculator.startingPrincipalNeededToday')}
              </div>
              <div
                className="text-lg sm:text-xl lg:text-2xl font-bold break-words"
                style={{ color: 'var(--accent-color)' }}
              >
                {startingPrincipalNeeded === Infinity
                  ? '∞'
                  : startingPrincipalNeeded <= 0 && monthlyInvestment > 0
                    ? t('calculator.contributionsSufficient')
                    : formatCurrency(Math.round(startingPrincipalNeeded))}
              </div>
            </Card>

            <Card className="p-4 border">
              <div
                className="text-sm mb-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t('calculator.portfolioTargetAtYear', {
                  year: yearsUntilIncome.toString(),
                })}
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
                {t('calculator.dividendYield')}
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
                {t('calculator.yearsUntilIncome')}
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
              {t('calculator.dividendProjection')}
            </h4>
            <ul
              className="space-y-3"
              style={{ color: 'var(--text-secondary)' }}
            >
              {yearsUntilIncome === 0 ? (
                <>
                  <li className="break-words">
                    •{' '}
                    {t('calculator.forImmediateIncome', {
                      amount:
                        startingPrincipalNeeded === Infinity
                          ? '∞'
                          : formatCurrency(Math.round(startingPrincipalNeeded)),
                      monthly: formatCurrency(desiredMonthlyIncome),
                    })}
                  </li>
                  <li className="break-words">
                    •{' '}
                    {t('calculator.annualIncomeTarget', {
                      amount: formatCurrency(annualIncome),
                    })}
                  </li>
                  <li className="break-words">
                    • {t('calculator.usesSimpleFormula')}
                  </li>
                </>
              ) : (
                <>
                  <li className="break-words">
                    •{' '}
                    {t('calculator.targetAnnualIncomeWillBe', {
                      amount: formatCurrency(Math.round(futureAnnualIncome)),
                      inflation: inflationRate.toString(),
                    })}
                  </li>
                  <li className="break-words">
                    •{' '}
                    {t('calculator.toReachGoal', {
                      goal: formatCurrency(Math.round(portfolioNeededAtYearT)),
                      principal: formatCurrency(
                        Math.round(
                          startingPrincipalNeeded < 0
                            ? 0
                            : startingPrincipalNeeded,
                        ),
                      ),
                    })}
                  </li>
                  <li className="break-words">
                    •{' '}
                    {t('calculator.monthlyInvestmentsProjected', {
                      monthly: formatCurrency(monthlyInvestment),
                      total: formatCurrency(Math.round(totalContributions)),
                    })}
                  </li>
                  <li className="break-words">
                    •{' '}
                    {t('calculator.initialPrincipalProjected', {
                      growth:
                        growthFromPrincipal === Infinity
                          ? '∞'
                          : formatCurrency(Math.round(growthFromPrincipal)),
                    })}
                  </li>
                </>
              )}
            </ul>
          </Card>

          {/* Info Block: Formula + Disclaimer */}
          <FormulaBlock title={t('retirement.formulaTitle')}>
            <div className="space-y-4">
              <div>
                <p className="mb-2 font-medium">
                  1. {t('calculator.futureIncomeInflationAdjusted')}
                </p>
                <p className="text-sm">{t('calculator.futureIncomeFormula')}</p>
              </div>
              <div>
                <p className="mb-2 font-medium">
                  2. {t('calculator.portfolioGoal')}
                </p>
                <p className="text-sm">
                  {t('calculator.portfolioGoalFormula')}
                </p>
              </div>
              <div>
                <p className="mb-2 font-medium">
                  3. {t('calculator.futureValueOfMonthlyInvestments')}
                </p>
                <p className="text-sm">
                  {t('calculator.fvContributionsFormula')}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {t('calculator.fvContributionsWhere')}
                </p>
              </div>
              <div>
                <p className="mb-2 font-medium">
                  4. {t('calculator.startingPrincipalNeededFormula')}
                </p>
                <p className="text-sm">{t('calculator.principalFormula')}</p>
                <p
                  className="text-xs mt-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {t('calculator.growthRateIs', {
                    rate: (growthRateUsed / 100).toFixed(4),
                    type: reinvestDividends
                      ? t('calculator.dividendYieldPlusPriceGrowthFormula')
                      : t('calculator.priceGrowthOnlyFormula'),
                  })}
                </p>
              </div>
            </div>
            <p
              className="text-xs mt-4"
              style={{ color: 'var(--text-secondary)' }}
            >
              <strong>{t('common.note')}:</strong>{' '}
              {t('calculator.allRatesConstant')}
            </p>
          </FormulaBlock>
        </div>
      </div>
      <div className="mt-8 w-full max-w-2xl mx-auto">
        <h4
          className="text-sm font-medium mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('calculator.recommendedVideos')}
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
