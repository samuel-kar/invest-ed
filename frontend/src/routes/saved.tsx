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
          <nav className="tab-nav flex-col md:flex-row" role="tablist">
            <Link
              to="/saved/ddm"
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
              DDM
            </Link>
            <Link
              to="/saved/chowder"
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
              Chowder rule
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

export const Route = createFileRoute('/saved')({
  component: SavedPage,
})
