import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/savings/Name2')({
  component: Name2Page,
})

function Name2Page() {
  return (
    <div>
      <h2
        className="text-2xl font-semibold mb-4"
        style={{ color: 'var(--text-primary)' }}
      >
        Name2
      </h2>
      <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
        Content coming soon...
      </p>
    </div>
  )
}
