import { createFileRoute } from '@tanstack/react-router'
import Retirement4PercentContainer from '../../components/calculators/calculators/Retirement4PercentContainer'
import BackButton from '../../components/BackButton'

export const Route = createFileRoute('/calculators/retirement4percent')({
  component: Retirement4PercentPage,
})

function Retirement4PercentPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2
            className="text-2xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Retirement Calculator (4% Rule)
          </h2>
          <BackButton to="/calculators" label="Back to Calculators" />
        </div>
        <div className="flex justify-between items-center mb-6">
          <p style={{ color: 'var(--text-secondary)' }}>
            Estimate your retirement savings and monthly income using the proven
            4% withdrawal rule.
          </p>
          <span className="text-6xl">🏖️</span>
        </div>

        <Retirement4PercentContainer />
      </div>
    </div>
  )
}
