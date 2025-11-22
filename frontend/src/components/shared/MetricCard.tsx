import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Card from './Card'

interface MetricCardProps {
  metricId?: string
  name: string
  category: string
  formula?: string
  description: string
  interpretation?: string
  goodRange?: string
  example?: string
}

export default function MetricCard({
  metricId,
  name,
  category,
  formula,
  description,
  interpretation,
  goodRange,
  example,
}: MetricCardProps) {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card
      className="p-4 cursor-pointer transition-all duration-200 hover:shadow-md"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex justify-between items-start mb-2">
        <h4
          className="font-semibold text-lg"
          style={{ color: 'var(--text-primary)' }}
        >
          {name}
        </h4>
        <span
          className="text-xs px-2 py-1 rounded"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-secondary)',
          }}
        >
          {category}
        </span>
      </div>

      <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
        {description}
      </p>

      {formula && (
        <div
          className="text-xs p-2 rounded mb-3"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            fontFamily: 'monospace',
          }}
        >
          {formula}
        </div>
      )}

      {isExpanded && (
        <div className="mt-3 space-y-2">
          {interpretation && (
            <div>
              <span
                className="text-xs font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                {t('learn.interpretation')}
              </span>
              <p
                className="text-xs mt-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                {interpretation}
              </p>
            </div>
          )}

          {goodRange && (
            <div>
              <span
                className="text-xs font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                {t('learn.goodRange')}
              </span>
              <p
                className="text-xs mt-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                {goodRange}
              </p>
            </div>
          )}

          {example && (
            <div>
              <span
                className="text-xs font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                {t('learn.example')}
              </span>
              <p
                className="text-xs mt-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                {example}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-2 text-xs" style={{ color: 'var(--accent-color)' }}>
        {isExpanded ? t('learn.clickToCollapse') : t('learn.clickToExpand')}
      </div>
    </Card>
  )
}
