import { createFileRoute } from '@tanstack/react-router'
import CompanySearch from '../components/CompanySearch'

export const Route = createFileRoute('/companies')({
  component: CompaniesPage,
  validateSearch: (search: Record<string, unknown>) => ({
    symbol: (search.symbol as string) || '',
  }),
})

function CompaniesPage() {
  const { symbol } = Route.useSearch()

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
          Company Analysis
        </h1>
        <CompanySearch initialSymbol={symbol} />
      </div>
    </div>
  )
}
