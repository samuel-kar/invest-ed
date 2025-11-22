import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import RetirementDividendContainer from '../../components/calculators/calculators/RetirementDividendContainer'
import BackButton from '../../components/BackButton'

export const Route = createFileRoute('/calculators/retirement-dividend')({
  component: RetirementDividendPage,
})

function RetirementDividendPage() {
  const { t } = useTranslation()
  return (
    <div className="max-w-6xl mx-auto">
      <div className="p-6">
        <BackButton to="/calculators" label={t('calculator.backToCalculators')} />
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('calculator.routes.retirementDividend.title')}
        </h2>
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
          <p className="flex-1 min-w-0" style={{ color: 'var(--text-secondary)' }}>
            {t('calculator.routes.retirementDividend.description')}
          </p>
          <span className="text-4xl md:text-6xl flex-shrink-0">💰</span>
        </div>

        <RetirementDividendContainer />
      </div>
    </div>
  )
}
