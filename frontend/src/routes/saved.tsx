import { createFileRoute, useNavigate } from '@tanstack/react-router'
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
    <div className="p-6">
      <h1
        className="text-3xl font-bold mb-4"
        style={{ color: 'var(--text-primary)' }}
      >
        Saved Analyses
      </h1>
      <p style={{ color: 'var(--text-secondary)' }}>
        Your saved analyses will appear here.
      </p>
    </div>
  )
}

export const Route = createFileRoute('/saved')({
  component: SavedPage,
})
