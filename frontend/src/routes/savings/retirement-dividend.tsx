import { createFileRoute } from '@tanstack/react-router'
import RetirementDividendContainer from '../../components/savings/calculators/RetirementDividendContainer'
import BackButton from '../../components/BackButton'

export const Route = createFileRoute('/savings/retirement-dividend')({
  component: RetirementDividendPage,
})

function RetirementDividendPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2
            className="text-2xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Retirement (dividend)
          </h2>
          <BackButton to="/savings" label="Back to Savings" />
        </div>
        <div className="flex justify-between items-center mb-6">
          <p style={{ color: 'var(--text-secondary)' }}>
            Estimate required portfolio size for a target monthly income based
            on dividend yield.
          </p>
          <span className="text-6xl">💰</span>
        </div>

        <RetirementDividendContainer />
      </div>
    </div>
  )
}
