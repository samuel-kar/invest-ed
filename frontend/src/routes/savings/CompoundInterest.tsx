import { createFileRoute } from '@tanstack/react-router'
import CompoundInterestContainer from '../../components/savings/compound-interest/CompoundInterestContainer'

export const Route = createFileRoute('/savings/CompoundInterest')({
  component: CompoundInterestPage,
})

function CompoundInterestPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="p-6">
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Monthly Compound Interest Calculator
        </h2>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
          Calculate how your investment will grow over time with compound
          interest and regular monthly contributions.
        </p>

        <CompoundInterestContainer />
      </div>
    </div>
  )
}
