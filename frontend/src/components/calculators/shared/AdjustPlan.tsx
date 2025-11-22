import { useTranslation } from 'react-i18next'
import { useCurrency } from '../../../contexts/CurrencyContext'

interface AdjustPlanProps {
  currentMonthly: number
  altYears: number
  altMonths: number
  altMonthly: number
}

export default function AdjustPlan({
  currentMonthly,
  altYears,
  altMonths,
  altMonthly,
}: AdjustPlanProps) {
  const { t } = useTranslation()
  const { formatCurrency } = useCurrency()
  return (
    <div
      className="p-4 rounded-lg"
      style={{ backgroundColor: 'var(--bg-tertiary)' }}
    >
      <h4
        className="font-semibold mb-2"
        style={{ color: 'var(--accent-color)' }}
      >
        {t('adjustPlan.title')}
      </h4>
      <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
        {t('adjustPlan.currentPlan')} {formatCurrency(Math.round(currentMonthly))}/month {t('adjustPlan.alternativePlan')}
      </p>
      <ul
        className="text-sm space-y-1"
        style={{ color: 'var(--text-secondary)' }}
      >
        <li>
          • {t('adjustPlan.ifYouExtend', {
            years: altYears.toString(),
            months: altMonths.toString(),
          })}{' '}
          {t('adjustPlan.monthlyPayment')} {formatCurrency(Math.round(altMonthly))}/month
        </li>
        <li>• Starting with a larger initial amount</li>
        <li>• Looking for higher-return investments (with appropriate risk)</li>
      </ul>
    </div>
  )
}
