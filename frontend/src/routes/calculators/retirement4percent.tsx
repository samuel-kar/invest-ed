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
        <BackButton to="/calculators" label="Back to Calculators" />
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Retirement (4% Rule)
        </h2>
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
          <p className="flex-1 min-w-0" style={{ color: 'var(--text-secondary)' }}>
            Estimate your retirement savings and monthly income using the proven
            4% withdrawal rule.
          </p>
          <span className="text-4xl md:text-6xl flex-shrink-0">🏖️</span>
        </div>

        <Retirement4PercentContainer />
      </div>
    </div>
  )
}
