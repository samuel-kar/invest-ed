import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/calculators')({
  component: CalculatorsPage,
})

function CalculatorsPage() {
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
          Calculators
        </h1>

        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="tab-nav flex-col md:flex-row" role="tablist">
            <Link
              to="/calculators/CompoundInterest"
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
              Compound Interest
            </Link>
            <Link
              to="/calculators/savings-goal"
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
              Savings Goal
            </Link>
            <Link
              to="/calculators/retirement4percent"
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
              Retirement (4% rule)
            </Link>
            <Link
              to="/calculators/retirement-dividend"
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
              Retirement (dividend)
            </Link>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
