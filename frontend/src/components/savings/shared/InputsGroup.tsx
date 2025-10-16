import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function LabeledInput({ label, ...props }: InputProps) {
  return (
    <div>
      <label
        className="block text-sm font-medium mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        {label}
      </label>
      <input
        {...props}
        className={`w-full p-3 rounded-md transition-colors ${props.className || ''}`}
        style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          color: 'var(--text-primary)',
          ...(props.style || {}),
        }}
      />
    </div>
  )
}
