import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
} from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import SearchBar from '../components/shared/SearchBar'

export const Route = createFileRoute('/analysis')({
  component: AnalysisPage,
  validateSearch: (search: Record<string, unknown>) => ({
    symbol: (search.symbol as string) || '',
  }),
})

function AnalysisPage() {
  const { symbol } = Route.useSearch()
  const [inputSymbol, setInputSymbol] = useState(symbol.toUpperCase())
  const navigate = useNavigate()

  // Sync inputSymbol with URL symbol when it changes
  useEffect(() => {
    setInputSymbol(symbol.toUpperCase())
  }, [symbol])

  const handleSymbolChange = (value: string) => {
    const upperValue = value.toUpperCase()
    setInputSymbol(upperValue)

    // Update URL search params when symbol changes
    if (value.trim()) {
      navigate({
        to: '/analysis',
        search: { symbol: upperValue },
        replace: true,
      })
    }
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Investment Analysis
        </h1>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            placeholder="Enter stock symbol (e.g., PG, KO, JNJ)"
            value={inputSymbol}
            onChange={handleSymbolChange}
          />
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="tab-nav flex-col md:flex-row" role="tablist">
            <Link
              to="/analysis/ddm"
              search={{ symbol }}
              className="px-4 py-2.5 md:py-2 w-full md:w-auto rounded-lg md:rounded-t-lg md:rounded-b-none font-medium transition-colors duration-200"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                borderBottom: '2px solid var(--accent-color)',
              }}
              activeProps={{
                style: {
                  backgroundColor: 'var(--accent-color)',
                  color: 'white',
                },
              }}
            >
              DDM Analysis
            </Link>
            <Link
              to="/analysis/chowder"
              search={{ symbol }}
              className="px-4 py-2.5 md:py-2 w-full md:w-auto rounded-lg md:rounded-t-lg md:rounded-b-none font-medium transition-colors duration-200"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                borderBottom: '2px solid var(--accent-color)',
              }}
              activeProps={{
                style: {
                  backgroundColor: 'var(--accent-color)',
                  color: 'white',
                },
              }}
            >
              Chowder Rule
            </Link>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          <Outlet context={{ symbol }} />
        </div>
      </div>
    </div>
  )
}
