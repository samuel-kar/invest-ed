import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/saved/chowder')({
  component: ChowderPlaceholder,
})

function ChowderPlaceholder() {
  return (
    <div className="p-6">
      <p style={{ color: 'var(--text-secondary)' }}>
        Saved Chowder analyses are coming soon.
      </p>
    </div>
  )
}
