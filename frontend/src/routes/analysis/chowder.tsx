import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import ChowderContainer from '../../components/analyses/analyses/ChowderContainer'
import BackButton from '../../components/BackButton'

export const Route = createFileRoute('/analysis/chowder')({
  component: ChowderPage,
})

function ChowderPage() {
  const { t } = useTranslation()
  return (
    <div className="max-w-6xl mx-auto">
      <div className="p-6">
        <BackButton to="/analysis" label={t('analysis.backToAnalysis')} />
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('analysis.routes.chowder.title')}
        </h2>
        <div className="flex justify-between items-top mb-6">
          <p style={{ color: 'var(--text-secondary)' }}>
            {t('analysis.routes.chowder.description')}
          </p>
          <span className="text-6xl">🥣</span>
        </div>

        <ChowderContainer />
      </div>
    </div>
  )
}
