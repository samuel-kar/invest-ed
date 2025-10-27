import { createFileRoute } from '@tanstack/react-router'
import ChowderContainer from '../../components/analyses/analyses/ChowderContainer'
import BackButton from '../../components/BackButton'

export const Route = createFileRoute('/analysis/chowder')({
  component: ChowderPage,
})

function ChowderPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="p-6">
        <BackButton to="/analysis" label="Back to Analysis" />
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Chowder Rule
        </h2>
        <div className="flex justify-between items-top mb-6">
          <p style={{ color: 'var(--text-secondary)' }}>
            Screen dividend stocks using the Chowder Rule to identify quality
            dividend growth companies.
          </p>
          <span className="text-6xl">🥣</span>
        </div>

        <ChowderContainer />
      </div>
    </div>
  )
}
