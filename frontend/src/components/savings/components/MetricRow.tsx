import React from 'react'

interface MetricRowProps {
  label: string
  value: React.ReactNode
  highlight?: boolean
}

export default function MetricRow({ label, value, highlight }: MetricRowProps) {
  return (
    <div className="flex justify-between items-center">
      <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
      <span
        className={highlight ? 'font-bold' : 'font-semibold'}
        style={{
          color: highlight ? 'var(--accent-color)' : 'var(--text-primary)',
        }}
      >
        {value}
      </span>
    </div>
  )
}
