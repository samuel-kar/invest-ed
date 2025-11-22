import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/analysis')({
  component: AnalysisPage,
})

function AnalysisPage() {
  const { t } = useTranslation()
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
          {t('analysis.title')}
        </h1>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="relative -mx-4 md:mx-0">
            <nav className="tab-nav md:flex-wrap px-4 md:px-0" role="tablist">
              <Link
                to="/analysis/ddm"
                className="inline-flex items-center justify-center font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-color)]"
              >
                {t('analysis.ddm')}
              </Link>
              <Link
                to="/analysis/chowder"
                className="inline-flex items-center justify-center font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-color)]"
              >
                {t('analysis.chowder')}
              </Link>
            </nav>
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-8 md:hidden"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0) 0%, var(--bg-primary) 70%)',
              }}
              aria-hidden="true"
            />
          </div>
          {/* <div
            className="mt-2 text-xs font-medium text-emerald-600 md:hidden flex items-center gap-1 px-4"
            aria-hidden="true"
          >
            <span>Swipe to browse analyses</span>
            <span>→</span>
          </div> */}
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
