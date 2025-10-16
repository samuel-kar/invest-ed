import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/calculators')({
  component: CalculatorsPage,
})

function CalculatorsPage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Investment Calculators
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Financial calculators coming soon...
        </p>
      </div>
    </div>
  )
}
