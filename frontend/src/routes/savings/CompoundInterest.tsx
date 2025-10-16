import { createFileRoute } from '@tanstack/react-router'
import CompoundInterestContainer from '../../components/savings/calculators/CompoundInterestContainer'

export const Route = createFileRoute('/savings/CompoundInterest')({
  component: CompoundInterestPage,
})

function CompoundInterestPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-2xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Compound Interest Calculator
          </h2>
          <span className="text-6xl">📈</span>
        </div>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
          Calculate how your investment will grow over time with compound
          interest and regular monthly contributions.
        </p>

        <CompoundInterestContainer />
      </div>
    </div>
  )
}
