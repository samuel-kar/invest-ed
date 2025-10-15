import React from 'react'

interface AdjustPlanProps {
  currentMonthly: number
  altYears: number
  altMonths: number
  altMonthly: number
}

export default function AdjustPlan({
  currentMonthly,
  altYears,
  altMonths,
  altMonthly,
}: AdjustPlanProps) {
  return (
    <div
      className="p-4 rounded-lg"
      style={{ backgroundColor: 'var(--bg-tertiary)' }}
    >
      <h4
        className="font-semibold mb-2"
        style={{ color: 'var(--accent-color)' }}
      >
        Adjust Your Plan
      </h4>
      <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
        If ${Math.round(currentMonthly).toLocaleString()}/month seems too high,
        consider:
      </p>
      <ul
        className="text-sm space-y-1"
        style={{ color: 'var(--text-secondary)' }}
      >
        <li>
          • Extending your timeline to {altYears} years
          {altMonths > 0 ? ` ${altMonths} months` : ''} would reduce it to $
          {Math.round(altMonthly).toLocaleString()}/month
        </li>
        <li>• Starting with a larger initial amount</li>
        <li>• Looking for higher-return investments (with appropriate risk)</li>
      </ul>
    </div>
  )
}
