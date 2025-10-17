import React from 'react'
import { useCurrency } from '../../../contexts/CurrencyContext'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function LabeledInput({ label, ...props }: InputProps) {
  const { currency } = useCurrency()

  // Replace hardcoded currency symbols with dynamic ones
  const getCurrencySymbol = () => {
    switch (currency) {
      case 'USD':
        return '$'
      case 'EUR':
        return '€'
      case 'SEK':
        return 'kr'
      case 'PLN':
        return 'zł'
      case 'DKK':
        return 'kr'
      case 'NOK':
        return 'kr'
      case 'CNY':
        return '¥'
      case 'JPY':
        return '¥'
      default:
        return '$'
    }
  }

  const dynamicLabel = label.replace(/\$/, getCurrencySymbol())
  return (
    <div>
      <label
        className="block text-sm font-medium mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        {dynamicLabel}
      </label>
      <input
        {...props}
        onChange={(e) => {
          const value = e.target.value
          // Strip leading zeros for number inputs, but preserve decimals
          if (props.type === 'number' && value) {
            // Remove leading zeros unless it's a decimal like "0.5"
            const cleaned = value.replace(/^0+(?=\d)/, '')
            e.target.value = cleaned || '0'
          }
          props.onChange?.(e)
        }}
        onFocus={(e) => {
          e.target.select()
          props.onFocus?.(e)
        }}
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
