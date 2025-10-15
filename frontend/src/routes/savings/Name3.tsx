import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/savings/Name3')({
  component: Name3Page,
})

function Name3Page() {
  return (
    <div>
      <h2
        className="text-2xl font-semibold mb-4"
        style={{ color: 'var(--text-primary)' }}
      >
        Name3
      </h2>
      <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
        Content coming soon...
      </p>
    </div>
  )
}
