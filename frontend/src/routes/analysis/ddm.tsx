import { createFileRoute } from '@tanstack/react-router'
import DDMContainer from '../../components/analyses/analyses/DDMContainer'
import BackButton from '../../components/BackButton'

export const Route = createFileRoute('/analysis/ddm')({
  component: DDMPage,
})

function DDMPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="p-6">
        <BackButton to="/analysis" label="Back to Analysis" />
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          DDM Analysis
        </h2>
        <div className="flex justify-between items-top mb-6">
          <p style={{ color: 'var(--text-secondary)' }}>
            Analyze dividend-paying stocks using the Dividend Discount Model to
            determine fair value.
          </p>
          <span className="text-6xl">📊</span>
        </div>

        <DDMContainer />
      </div>
    </div>
  )
}
