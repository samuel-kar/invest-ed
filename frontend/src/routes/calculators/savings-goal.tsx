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
        <BackButton to="/calculators" label="Back to Calculators" />
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Savings Goal Calculator
        </h2>
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
          <p
            className="flex-1 min-w-0"
            style={{ color: 'var(--text-secondary)' }}
          >
            Determine how long it will take to reach your financial goals with
            regular monthly contributions.
          </p>
          <span className="text-4xl md:text-6xl flex-shrink-0">🎯</span>
        </div>

        <SavingsGoalContainer />
      </div>
    </div>
  )
}
