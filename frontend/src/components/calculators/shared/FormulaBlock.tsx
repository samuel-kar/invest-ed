import React from 'react'
import { useTranslation } from 'react-i18next'

interface FormulaBlockProps {
  title?: string
  children: React.ReactNode
}

export default function FormulaBlock({
  title,
  children,
}: FormulaBlockProps) {
  const { t } = useTranslation()
  const defaultTitle = title || t('calculator.formulaUsed')
  return (
    <div
      className="p-4 rounded-lg"
      style={{ backgroundColor: 'var(--bg-tertiary)' }}
    >
      <h4
        className="font-semibold mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        {defaultTitle}
      </h4>
      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
        {children}
      </div>
    </div>
  )
}
