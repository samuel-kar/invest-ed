import { createFileRoute } from '@tanstack/react-router'
import Retirement4PercentContainer from '../../components/savings/retirement/Retirement4PercentContainer'

export const Route = createFileRoute('/savings/retirement4percent')({
  component: Retirement4PercentPage,
})

function Retirement4PercentPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="p-6">
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Retirement (4% rule)
        </h2>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
          Retirement Calculator
          <br />
          Estimate your retirement savings and monthly income using the 4%
          withdrawal rule.
        </p>

        <Retirement4PercentContainer />
      </div>
    </div>
  )
}
