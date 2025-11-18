import { createFileRoute } from '@tanstack/react-router'
import RetirementDividendContainer from '../../components/calculators/calculators/RetirementDividendContainer'
import BackButton from '../../components/BackButton'

export const Route = createFileRoute('/calculators/retirement-dividend')({
  component: RetirementDividendPage,
})

function RetirementDividendPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="p-6">
        <BackButton to="/calculators" label="Back to Calculators" />
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Retirement (Dividend)
        </h2>
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
          <p className="flex-1 min-w-0" style={{ color: 'var(--text-secondary)' }}>
            Calculate the portfolio size needed for dividend income retirement.
            Focus on dividend-paying stocks for passive income.
          </p>
          <span className="text-4xl md:text-6xl flex-shrink-0">💰</span>
        </div>

        <RetirementDividendContainer />
      </div>
    </div>
  )
}
