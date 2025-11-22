import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { savingsGoalCalculator } from '../../../utils/calculations'
import { LabeledInput } from '../shared/InputsGroup'
import MetricRow from '../shared/MetricRow'
import AdjustPlan from '../shared/AdjustPlan'
import FormulaBlock from '../shared/FormulaBlock'
import { useCurrency } from '../../../contexts/CurrencyContext'
import Card from '../../shared/Card'

export default function SavingsGoalContainer() {
  const { t } = useTranslation()
  const [goalAmount, setGoalAmount] = useState<number>(50000)
  const [currentSavings, setCurrentSavings] = useState<number>(10000)
  const [annualRate, setAnnualRate] = useState<number>(7)
  const [years, setYears] = useState<number>(5)
  const [months, setMonths] = useState<number>(0)
  const { formatCurrency } = useCurrency()

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
          {t('calculator.goalParameters')}
        </h3>

        <LabeledInput
          label={t('calculator.goalAmountLabel')}
          type="number"
          value={goalAmount}
          onChange={(e) => setGoalAmount(Number(e.target.value))}
          min={0}
          step={100}
          placeholder="50000"
        />

        <LabeledInput
          label={t('calculator.currentSavingsLabel')}
          type="number"
          value={currentSavings}
          onChange={(e) => setCurrentSavings(Number(e.target.value))}
          min={0}
          step={100}
          placeholder="10000"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <LabeledInput
            label={t('calculator.timePeriodYears')}
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            min={0}
            step={1}
            placeholder="5"
          />
          <LabeledInput
            label={t('common.months')}
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
          label={t('calculator.expectedReturn')}
          type="number"
          value={annualRate}
          onChange={(e) => setAnnualRate(Number(e.target.value))}
          min={0}
          max={100}
          step={0.1}
          placeholder="5"
        />
        <p className="text-sm text-gray-500">
          {t('calculator.expectedReturnNoteSavings')}
          <br />
          <br />
          <strong>{t('common.note')}:</strong>{' '}
          {t('calculator.expectedReturnNoteSavings2')}
        </p>
      </div>

      {/* Results Section */}
      <div className="md:col-span-3 space-y-6">
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('calculator.goalTimeline')}
        </h3>

        <Card className="p-4 max-w-lg">
          <div className="space-y-3">
            <MetricRow
              label={t('calculator.goalAmount')}
              value={formatCurrency(goalAmount)}
            />
            <MetricRow
              label={t('calculator.currentSavings')}
              value={formatCurrency(currentSavings)}
            />
            <MetricRow
              label={t('calculator.amountNeeded')}
              value={formatCurrency(amountNeeded)}
            />

            <hr style={{ borderColor: 'var(--border-color)' }} />

            <MetricRow
              label={t('calculator.timeToGoal')}
              value={`${years} ${t('common.years')} ${months} ${t('common.months')}`}
            />
            <MetricRow
              label={t('calculator.monthlyContribution')}
              value={formatCurrency(Math.round(monthlyPayment))}
              highlight
            />
          </div>
        </Card>

        <div className="max-w-lg">
          <AdjustPlan
            currentMonthly={monthlyPayment}
            altYears={alternativeYears}
            altMonths={months}
            altMonthly={alternativeMonthlyPayment}
          />
        </div>

        <div className="max-w-lg">
          <FormulaBlock>
            <p className="mb-2">
              <strong>{t('calculator.formulaGeneral')}</strong>
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
              <strong>{t('calculator.formulaSpecial')}</strong>
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
              {t('calculator.formulaWhereSavings')}
            </p>
          </FormulaBlock>
        </div>
      </div>
    </div>
  )
}
