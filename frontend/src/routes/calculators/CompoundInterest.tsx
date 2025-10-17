import { createFileRoute } from '@tanstack/react-router'
import CompoundInterestContainer from '../../components/calculators/calculators/CompoundInterestContainer'
import BackButton from '../../components/BackButton'

export const Route = createFileRoute('/calculators/CompoundInterest')({
  component: CompoundInterestPage,
})

function CompoundInterestPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="p-6">
        <BackButton to="/calculators" label="Back to Calculators" />
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Compound Interest Calculator
        </h2>
        <div className="flex justify-between items-center mb-6">
          <p style={{ color: 'var(--text-secondary)' }}>
            Calculate how your investment will grow over time with compound
            interest and regular monthly contributions.
          </p>
          <span className="text-6xl">📈</span>
        </div>

        <CompoundInterestContainer />
      </div>
    </div>
  )
}
