import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/savings/Name1')({
  component: Name1Page,
})

function Name1Page() {
  return (
    <div>
      <h2
        className="text-2xl font-semibold mb-4"
        style={{ color: 'var(--text-primary)' }}
      >
        Name1
      </h2>
      <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
        Content coming soon...
      </p>
    </div>
  )
}
