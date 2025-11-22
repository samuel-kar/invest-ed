import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { monthlyCompoundInterestCalculator } from '../../../utils/calculations'
import { LabeledInput } from '../shared/InputsGroup'
import MetricRow from '../shared/MetricRow'
import FormulaBlock from '../shared/FormulaBlock'
import { useCurrency } from '../../../contexts/CurrencyContext'
import Card from '../../shared/Card'

export default function CompoundInterestContainer() {
  const { t } = useTranslation()
  const [startValue, setStartValue] = useState<number>(10000)
  const [annualRate, setAnnualRate] = useState<number>(7)
  const [years, setYears] = useState<number>(10)
  const [monthlyInput, setMonthlyInput] = useState<number>(500)
  const { formatCurrency } = useCurrency()

  const finalValue = monthlyCompoundInterestCalculator(
    startValue,
    annualRate,
    years,
    monthlyInput,
  )

  const totalContributions = startValue + monthlyInput * years * 12
  const totalGains = finalValue - totalContributions

  return (
    <div>
    <div className="grid md:grid-cols-5 gap-8">
      {/* Input Section */}
      <div className="md:col-span-2 space-y-6">
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('calculator.investmentParameters')}
        </h3>

        <LabeledInput
          label={t('calculator.initialInvestmentLabel')}
          type="number"
          value={startValue}
          onChange={(e) => setStartValue(Number(e.target.value))}
          min={0}
          step={100}
        />

        <LabeledInput
          label={t('calculator.investmentPeriod')}
          type="number"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          min={1}
          max={50}
          step={1}
        />

        <LabeledInput
          label={t('calculator.monthlyContributionLabel')}
          type="number"
          value={monthlyInput}
          onChange={(e) => setMonthlyInput(Number(e.target.value))}
          min={0}
          step={50}
        />

        <LabeledInput
          label={t('calculator.expectedReturn')}
          type="number"
          value={annualRate}
          onChange={(e) => setAnnualRate(Number(e.target.value))}
          min={0}
          max={100}
          step={0.1}
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
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('calculator.investmentResults')}
        </h3>

        <Card className="p-4 max-w-lg">
          <div className="space-y-3">
            <MetricRow
              label={t('calculator.initialInvestment')}
              value={formatCurrency(startValue)}
            />
            <MetricRow
              label={t('calculator.totalContributions')}
              value={formatCurrency(monthlyInput * years * 12)}
            />
            <MetricRow
              label={t('calculator.totalInvested')}
              value={formatCurrency(totalContributions)}
            />
            <hr style={{ borderColor: 'var(--border-color)' }} />
            <MetricRow
              label={t('calculator.investmentGains')}
              value={formatCurrency(totalGains)}
            />
            <MetricRow
              label={t('calculator.finalValue')}
              value={formatCurrency(finalValue)}
              highlight
            />
          </div>
        </Card>

        <div className="max-w-lg">
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
              {t('calculator.formulaWhere')}
            </p>
          </FormulaBlock>
        </div>
      </div>
    </div>
    <div className="mt-8 w-full max-w-2xl mx-auto space-y-4">
      <h4
        className="text-sm font-medium"
        style={{ color: 'var(--text-primary)' }}
      >
        {t('calculator.learnMore')}
      </h4>
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube-nocookie.com/embed/wf91rEGw88Q?si=XaaYLlNGIwvgw_q8"
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
  )
}
