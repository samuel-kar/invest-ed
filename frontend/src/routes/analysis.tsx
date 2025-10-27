import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
  useRouter,
} from '@tanstack/react-router'
import { useState, useEffect } from 'react'

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
  const router = useRouter()

  // Sync inputSymbol with URL symbol when it changes
  useEffect(() => {
    setInputSymbol(symbol.toUpperCase())
  }, [symbol])

  const handleSymbolChange = (value: string) => {
    setInputSymbol(value.toUpperCase())
  }

  const handleSearch = () => {
    const trimmedSymbol = inputSymbol.trim().toUpperCase()
    if (trimmedSymbol) {
      // Get current pathname to preserve the child route
      const currentPath = router.state.location.pathname

      // If we're on a child route, stay there. Otherwise, default to chowder
      const targetPath =
        currentPath !== '/analysis' ? currentPath : '/analysis/chowder'

      navigate({
        to: targetPath,
        search: { symbol: trimmedSymbol },
        replace: true,
      })
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
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
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter stock symbol (e.g., PG, KO, JNJ)"
                value={inputSymbol}
                onChange={(e) => handleSymbolChange(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full p-3 rounded-lg border transition-colors"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={!inputSymbol.trim()}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              Search
            </button>
          </div>
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
