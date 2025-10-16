import React from 'react'

interface FormulaBlockProps {
  title?: string
  children: React.ReactNode
}

export default function FormulaBlock({
  title = 'Formula Used:',
  children,
}: FormulaBlockProps) {
  return (
    <div
      className="p-4 rounded-lg"
      style={{ backgroundColor: 'var(--bg-tertiary)' }}
    >
      <h4
        className="font-semibold mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </h4>
      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
        {children}
      </div>
    </div>
  )
}
