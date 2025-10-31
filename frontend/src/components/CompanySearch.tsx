import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Search, Loader2, AlertCircle } from 'lucide-react'
import { fetchCompanyData } from '../services/api'
import CompanyData from './CompanyData'
import Card from './shared/Card'

interface CompanySearchProps {
  initialSymbol?: string
}

export default function CompanySearch({
  initialSymbol = '',
}: CompanySearchProps) {
  const [symbol, setSymbol] = useState(initialSymbol.toUpperCase())
  const [searchSymbol, setSearchSymbol] = useState(initialSymbol.toUpperCase())
  const [showColdStart, setShowColdStart] = useState(false)
  const navigate = useNavigate()

  const { data, isLoading, error } = useQuery({
    queryKey: ['companyData', searchSymbol],
    queryFn: () => fetchCompanyData(searchSymbol),
    enabled: searchSymbol.length > 0,
    retry: false,
  })

  // Sync searchSymbol with initialSymbol when URL changes
  useEffect(() => {
    const upperInitialSymbol = initialSymbol.toUpperCase()
    setSearchSymbol(upperInitialSymbol)
    setSymbol(upperInitialSymbol)
  }, [initialSymbol])

  // Show cold start message after 3 seconds of loading
  useEffect(() => {
    if (isLoading) {
      setShowColdStart(false)
      const timer = setTimeout(() => {
        setShowColdStart(true)
      }, 3000)
      return () => clearTimeout(timer)
    } else {
      setShowColdStart(false)
    }
  }, [isLoading])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (symbol.trim()) {
      const trimmedSymbol = symbol.trim().toUpperCase()
      setSearchSymbol(trimmedSymbol)
      navigate({
        to: '/companies',
        search: { symbol: trimmedSymbol },
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSymbol(e.target.value.toUpperCase())
  }

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card className="shadow-sm p-6">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1 relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              style={{ color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              value={symbol}
              onChange={handleInputChange}
              placeholder="Enter stock symbol (e.g., AAPL, MSFT, TSLA)"
              className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
          <button
            type="submit"
            disabled={!symbol.trim() || isLoading}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Search size={16} />
                Search
              </>
            )}
          </button>
        </form>
      </Card>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle size={20} className="text-red-500" />
          <div>
            <h3 className="font-semibold text-red-800">Error</h3>
            <p className="text-red-700">{error.message}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <Card className="shadow-sm p-8 text-center">
          <Loader2
            size={32}
            className="animate-spin mx-auto mb-4"
            style={{ color: 'var(--text-muted)' }}
          />
          <p style={{ color: 'var(--text-secondary)' }}>
            Loading company data...
          </p>
          {showColdStart && (
            <p className="mt-3 text-xs" style={{ color: 'var(--text-muted)' }}>
              Backend is waking up from standby. This may take a few extra
              seconds...
            </p>
          )}
        </Card>
      )}

      {/* Data Display */}
      {data && !isLoading && (
        <CompanyData quote={data.quote} fundamentals={data.fundamentals} />
      )}

      {/* Empty State */}
      {!data && !isLoading && !error && (
        <Card className="shadow-sm p-8 text-center">
          <Search
            size={48}
            className="mx-auto mb-4"
            style={{ color: 'var(--text-muted)' }}
          />
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Search for a Company
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Enter a stock symbol above to view detailed financial data and
            metrics.
          </p>
        </Card>
      )}
    </div>
  )
}
