import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
} from '@tanstack/react-router'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'

function SavedPage() {
  const { isSignedIn, isLoaded } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate({
        to: '/sign-in',
        search: {
          redirect: '/saved',
        },
      })
    }
  }, [isSignedIn, isLoaded, navigate])

  if (!isLoaded) {
    return (
      <div className="p-6">
        <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
      </div>
    )
  }

  if (!isSignedIn) {
    return null
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
          Saved Analyses
        </h1>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="relative -mx-4 md:mx-0">
            <nav className="tab-nav md:flex-wrap px-4 md:px-0" role="tablist">
              <Link
                to="/saved/ddm"
                className="inline-flex items-center justify-center font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-color)]"
              >
                DDM
              </Link>
              <Link
                to="/saved/chowder"
                className="inline-flex items-center justify-center font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-color)]"
              >
                Chowder rule
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
            <span>Swipe to view saved tools</span>
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

export const Route = createFileRoute('/saved')({
  component: SavedPage,
})
