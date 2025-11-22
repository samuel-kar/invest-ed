import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LabeledInput } from '../shared/InputsGroup'
import FormulaBlock from '../shared/FormulaBlock'
import { useCurrency } from '../../../contexts/CurrencyContext'
import { retirement4PercentCalculator } from '../../../utils/calculations'
import Card from '../../shared/Card'

export default function Retirement4PercentContainer() {
  const { t } = useTranslation()
  const [currentAge, setCurrentAge] = useState<number>(30)
  const [retirementAge, setRetirementAge] = useState<number>(65)
  const [currentSavings, setCurrentSavings] = useState<number>(50000)
  const [monthlyContribution, setMonthlyContribution] = useState<number>(1000)
  const [annualRate, setAnnualRate] = useState<number>(7)
  const { formatCurrency } = useCurrency()

  const {
    yearsToRetirement,
    fundAtRetirement,
    startingGrowthValue,
    contributionsValue,
    annualIncome,
    monthlyIncome,
  } = useMemo(
    () =>
      retirement4PercentCalculator(
        currentAge,
        retirementAge,
        currentSavings,
        monthlyContribution,
        annualRate,
      ),
    [
      currentAge,
      retirementAge,
      currentSavings,
      monthlyContribution,
      annualRate,
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
          {t('calculator.retirementPlan')}
        </h3>

        <LabeledInput
          label={t('calculator.currentAge')}
          type="number"
          value={currentAge}
          onChange={(e) => setCurrentAge(Number(e.target.value))}
          min={0}
          max={120}
          step={1}
          placeholder="30"
        />

        <LabeledInput
          label={t('calculator.retirementAge')}
          type="number"
          value={retirementAge}
          onChange={(e) => setRetirementAge(Number(e.target.value))}
          min={0}
          max={120}
          step={1}
          placeholder="65"
        />

        <LabeledInput
          label={t('calculator.currentSavingsLabel')}
          type="number"
          value={currentSavings}
          onChange={(e) => setCurrentSavings(Number(e.target.value))}
          min={0}
          step={100}
          placeholder="50000"
        />

        <LabeledInput
          label={t('calculator.monthlyContributionLabel')}
          type="number"
          value={monthlyContribution}
          onChange={(e) => setMonthlyContribution(Number(e.target.value))}
          min={0}
          step={50}
          placeholder="1000"
        />

        <LabeledInput
          label={t('calculator.expectedPortfolioGrowth')}
          type="number"
          value={annualRate}
          onChange={(e) => setAnnualRate(Number(e.target.value))}
          min={0}
          max={100}
          step={0.1}
          placeholder="7"
        />
        <p className="text-sm text-gray-500">
          {t('calculator.expectedReturnNote')}
          <br />
          <br />
          <strong>{t('common.note')}:</strong>{' '}
          {t('calculator.expectedReturnNote2')}
        </p>
      </div>

      {/* Results Section */}
      <div className="md:col-span-3 space-y-6">
        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-4 border">
            <div
              className="text-sm mb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('calculator.atRetirement')}
            </div>
            <div
              className="text-lg sm:text-xl lg:text-2xl font-bold break-words"
              style={{ color: 'var(--accent-color)' }}
            >
              {formatCurrency(fundAtRetirement)}
            </div>
          </Card>

          <Card className="p-4 border">
            <div
              className="text-sm mb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('calculator.monthlyIncome')}
            </div>
            <div
              className="text-lg sm:text-xl lg:text-2xl font-bold break-words"
              style={{ color: 'var(--text-primary)' }}
            >
              {formatCurrency(monthlyIncome)}
            </div>
          </Card>

          <Card className="p-4 border">
            <div
              className="text-sm mb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('calculator.yearsToRetirement')}
            </div>
            <div
              className="text-2xl font-bold"
              style={{ color: 'var(--accent-color)' }}
            >
              {yearsToRetirement}
            </div>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {t('common.years')}
            </div>
          </Card>
        </div>

        {/* Projection */}
        <Card className="p-4">
          <h4
            className="font-semibold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('calculator.retirementProjection')}
          </h4>
          <ul className="space-y-3" style={{ color: 'var(--text-secondary)' }}>
            <li className="break-words">
              • {t('calculator.startingWith', {
                amount: formatCurrency(currentSavings),
                growth: formatCurrency(startingGrowthValue),
              })}
            </li>
            <li className="break-words">
              • {t('calculator.monthlyContributionsWillAdd', {
                amount: formatCurrency(monthlyContribution),
                total: formatCurrency(contributionsValue),
              })}
            </li>
            <li className="break-words">
              • {t('calculator.totalAtAge', {
                age: retirementAge.toString(),
                amount: formatCurrency(fundAtRetirement),
              })}
            </li>
            <li className="break-words">
              {t('calculator.canSafelyWithdraw', {
                monthly: formatCurrency(monthlyIncome),
                annual: formatCurrency(annualIncome),
              })}
            </li>
          </ul>
        </Card>

        {/* Info Block: 4% Rule */}
        <FormulaBlock title={t('calculator.the4PercentRule')}>
          <p className="mb-2">
            {t('calculator.fourPercentRuleDescription')}
          </p>
          <p>
            {t('calculator.fourPercentRuleNote')}
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
            src="https://www.youtube-nocookie.com/embed/RUNzB_Nd3wc?si=iXFLfEEzNBDaN9ul"
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
            src="https://www.youtube-nocookie.com/embed/ZL9uEQBhcao?si=Hm-YATKHWkK7LhJi"
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
