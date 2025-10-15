import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/savings')({
  component: SavingsPage,
})

function SavingsPage() {
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
          Savings & Planning
        </h1>

        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="tab-nav" role="tablist">
            <Link
              to="/savings/Name1"
              className="px-4 py-2 rounded-t-lg font-medium transition-colors duration-200"
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
              Name1
            </Link>
            <Link
              to="/savings/Name2"
              className="px-4 py-2 rounded-t-lg font-medium transition-colors duration-200"
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
              Name2
            </Link>
            <Link
              to="/savings/Name3"
              className="px-4 py-2 rounded-t-lg font-medium transition-colors duration-200"
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
              Name3
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
