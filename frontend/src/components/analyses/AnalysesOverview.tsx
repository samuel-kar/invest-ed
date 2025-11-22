import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import Card from '../shared/Card'

export default function AnalysesOverview() {
  const { t } = useTranslation()
  return (
    <div className="max-w-6xl mx-auto">
      <div className="p-4 md:p-6">
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('analysis.overviewTitle')}
        </h2>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
          {t('analysis.overviewDescription')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/analysis/ddm" className="block">
            <Card className="overview-card p-4 md:p-6 rounded-lg">
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {t('analysis.ddmTitle')}
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t('analysis.ddmDescription')}
              </p>
              <div
                className="text-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                <strong>{t('analysis.bestFor')}:</strong>{' '}
                {t('analysis.ddmBestFor')}
              </div>
            </Card>
          </Link>

          <Link to="/analysis/chowder" className="block">
            <Card className="overview-card p-4 md:p-6 rounded-lg">
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {t('analysis.chowderTitle')}
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t('analysis.chowderDescription')}
              </p>
              <div
                className="text-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                <strong>{t('analysis.bestFor')}:</strong>{' '}
                {t('analysis.chowderBestFor')}
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
            {t('analysis.proTipTitle')}
          </h4>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {t('analysis.proTipText')}
          </p>
        </div>
      </div>
    </div>
  )
}
