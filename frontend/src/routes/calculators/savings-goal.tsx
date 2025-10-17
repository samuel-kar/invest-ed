import { createFileRoute } from '@tanstack/react-router'
import SavingsGoalContainer from '../../components/calculators/calculators/SavingsGoalContainer'
import BackButton from '../../components/BackButton'

export const Route = createFileRoute('/calculators/savings-goal')({
  component: SavingsGoalPage,
})

function SavingsGoalPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2
            className="text-2xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Savings Goal Calculator
          </h2>
          <BackButton to="/calculators" label="Back to Calculators" />
        </div>
        <div className="flex justify-between items-center mb-6">
          <p style={{ color: 'var(--text-secondary)' }}>
            Determine how long it will take to reach your financial goals with
            regular monthly contributions.
          </p>
          <span className="text-6xl">🎯</span>
        </div>

        <SavingsGoalContainer />
      </div>
    </div>
  )
}
