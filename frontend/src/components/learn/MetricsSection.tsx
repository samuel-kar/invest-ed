import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import SearchBar from '../shared/SearchBar'
import MetricCard from '../shared/MetricCard'
import { financialMetrics } from '../../data/financialMetrics'

export default function MetricsSection() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>(
    t('learn.all'),
  )

  // Category mapping from English to translation keys
  const categoryMap: Record<string, string> = {
    'Valuation Ratios': 'learn.metrics.categories.valuationRatios',
    'Dividend Analysis': 'learn.metrics.categories.dividendAnalysis',
    'Profitability Margins': 'learn.metrics.categories.profitabilityMargins',
    'Liquidity Ratios': 'learn.metrics.categories.liquidityRatios',
    'Leverage Ratios': 'learn.metrics.categories.leverageRatios',
    'Efficiency Ratios': 'learn.metrics.categories.efficiencyRatios',
    'Per-Share Metrics': 'learn.metrics.categories.perShareMetrics',
  }

  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      financialMetrics.map((metric) => metric.category),
    )
    const translatedCategories = Array.from(uniqueCategories).map((cat) => {
      const translationKey = categoryMap[cat]
      return translationKey ? t(translationKey) : cat
    })
    return [t('learn.all'), ...translatedCategories]
  }, [t])

  const filteredMetrics = useMemo(() => {
    return financialMetrics.filter((metric) => {
      const translatedName = t(`learn.metrics.${metric.id}.name`)
      const translatedDescription = t(`learn.metrics.${metric.id}.description`)
      const translatedCategory = categoryMap[metric.category]
        ? t(categoryMap[metric.category])
        : metric.category

      const matchesSearch =
        translatedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        translatedDescription.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === t('learn.all') ||
        translatedCategory === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory, t])

  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('learn.metricsDictionary')}
        </h2>
        <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
          {t('learn.metricsDescription')}
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="space-y-4">
        <SearchBar
          placeholder={t('learn.searchMetrics')}
          value={searchTerm}
          onChange={setSearchTerm}
        />

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              style={{
                backgroundColor:
                  selectedCategory === category
                    ? 'var(--accent-color)'
                    : 'var(--bg-tertiary)',
                color:
                  selectedCategory === category
                    ? 'white'
                    : 'var(--text-secondary)',
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        {t('learn.showingMetrics', {
          count: filteredMetrics.length,
          total: financialMetrics.length,
        })}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMetrics.map((metric, index) => {
          const categoryTranslationKey = categoryMap[metric.category]
          const translatedCategory = categoryTranslationKey
            ? t(categoryTranslationKey)
            : metric.category

          return (
            <MetricCard
              key={`${metric.id}-${index}`}
              name={t(`learn.metrics.${metric.id}.name`)}
              category={translatedCategory}
              formula={t(`learn.metrics.${metric.id}.formula`)}
              description={t(`learn.metrics.${metric.id}.description`)}
              interpretation={t(`learn.metrics.${metric.id}.interpretation`)}
              goodRange={t(`learn.metrics.${metric.id}.goodRange`)}
              example={t(`learn.metrics.${metric.id}.example`)}
            />
          )
        })}
      </div>

      {filteredMetrics.length === 0 && (
        <div
          className="text-center py-8"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('learn.noMetricsFound')}
        </div>
      )}
    </div>
  )
}
