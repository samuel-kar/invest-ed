import React from 'react'

export default function SimpleComingSoon({
  title = 'Coming soon',
}: {
  title?: string
}) {
  return (
    <div>
      <h2
        className="text-2xl font-semibold mb-4"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </h2>
      <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
        Content coming soon...
      </p>
    </div>
  )
}
