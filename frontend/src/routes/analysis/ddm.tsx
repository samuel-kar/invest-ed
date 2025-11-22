import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import DDMContainer from '../../components/analyses/analyses/DDMContainer'
import BackButton from '../../components/BackButton'

export const Route = createFileRoute('/analysis/ddm')({
  component: DDMPage,
})

function DDMPage() {
  const { t } = useTranslation()
  return (
    <div className="max-w-6xl mx-auto">
      <div className="p-6">
        <BackButton to="/analysis" label={t('analysis.backToAnalysis')} />
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('analysis.routes.ddm.title')}
        </h2>
        <div className="flex justify-between items-top mb-6">
          <p style={{ color: 'var(--text-secondary)' }}>
            {t('analysis.routes.ddm.description')}
          </p>
          <span className="text-6xl">📊</span>
        </div>

        <DDMContainer />
      </div>
    </div>
  )
}
