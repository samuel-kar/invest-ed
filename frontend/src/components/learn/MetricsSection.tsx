import { useState, useMemo } from 'react'
import SearchBar from '../shared/SearchBar'
import MetricCard from '../shared/MetricCard'
import { financialMetrics } from '../../data/financialMetrics'

export default function MetricsSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = useMemo(() => {
    const cats = [
      'All',
      ...new Set(financialMetrics.map((metric) => metric.category)),
    ]
    return cats
  }, [])

  const filteredMetrics = useMemo(() => {
    return financialMetrics.filter((metric) => {
      const matchesSearch =
        metric.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        metric.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === 'All' || metric.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Financial Metrics Dictionary
        </h2>
        <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
          Learn about key financial metrics used in investment analysis. Click
          on any metric to see detailed information.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="space-y-4">
        <SearchBar
          placeholder="Search metrics by name or description..."
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
        Showing {filteredMetrics.length} of {financialMetrics.length} metrics
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMetrics.map((metric, index) => (
          <MetricCard
            key={`${metric.name}-${index}`}
            name={metric.name}
            category={metric.category}
            formula={metric.formula}
            description={metric.description}
            interpretation={metric.interpretation}
            goodRange={metric.goodRange}
            example={metric.example}
          />
        ))}
      </div>

      {filteredMetrics.length === 0 && (
        <div
          className="text-center py-8"
          style={{ color: 'var(--text-secondary)' }}
        >
          No metrics found matching your search criteria.
        </div>
      )}
    </div>
  )
}
