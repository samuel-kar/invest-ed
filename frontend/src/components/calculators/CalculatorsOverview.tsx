import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import Card from '../shared/Card'

export default function CalculatorsOverview() {
  const { t } = useTranslation()
  return (
    <div className="max-w-6xl mx-auto">
      <div className="p-4 md:p-6">
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('calculators.overviewTitle')}
        </h2>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
          {t('calculators.overviewDescription')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/calculators/CompoundInterest" className="block">
            <Card className="overview-card p-4 md:p-6 rounded-lg">
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {t('calculators.compoundInterestTitle')}
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t('calculators.compoundInterestDescription')}
              </p>
              <div
                className="text-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                <strong>{t('calculators.bestFor')}:</strong>{' '}
                {t('calculators.compoundInterestBestFor')}
              </div>
            </Card>
          </Link>

          <Link to="/calculators/savings-goal" className="block">
            <Card className="overview-card p-4 md:p-6 rounded-lg">
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {t('calculators.savingsGoalTitle')}
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t('calculators.savingsGoalDescription')}
              </p>
              <div
                className="text-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                <strong>{t('calculators.bestFor')}:</strong>{' '}
                {t('calculators.savingsGoalBestFor')}
              </div>
            </Card>
          </Link>

          <Link to="/calculators/retirement4percent" className="block">
            <Card className="overview-card p-4 md:p-6 rounded-lg">
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {t('calculators.retirement4PercentTitle')}
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t('calculators.retirement4PercentDescription')}
              </p>
              <div
                className="text-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                <strong>{t('calculators.bestFor')}:</strong>{' '}
                {t('calculators.retirement4PercentBestFor')}
              </div>
            </Card>
          </Link>

          <Link to="/calculators/retirement-dividend" className="block">
            <Card className="overview-card p-4 md:p-6 rounded-lg">
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {t('calculators.retirementDividendTitle')}
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t('calculators.retirementDividendDescription')}
              </p>
              <div
                className="text-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                <strong>{t('calculators.bestFor')}:</strong>{' '}
                {t('calculators.retirementDividendBestFor')}
              </div>
            </Card>
          </Link>
        </div>

        <div
          className="mt-8 p-3 md:p-4 rounded-lg border"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-color)',
          }}
        >
          <h4
            className="font-semibold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('calculators.proTipTitle')}
          </h4>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {t('calculators.proTipText')}
          </p>
        </div>
      </div>
    </div>
  )
}
