import { createFileRoute } from '@tanstack/react-router'
import SavingsGoalContainer from '../../components/savings/calculators/SavingsGoalContainer'

export const Route = createFileRoute('/savings/savings-goal')({
  component: SavingsGoalPage,
})

function SavingsGoalPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="p-6">
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Savings Goal Calculator
        </h2>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
          Calculate how long it will take to reach your financial goals with
          regular monthly contributions.
        </p>

        <SavingsGoalContainer />
      </div>
    </div>
  )
}
