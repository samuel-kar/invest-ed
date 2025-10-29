import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useAuth } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchSavedDdmAnalyses, deleteSavedDdmAnalysis } from '../services/api'
import Card from '../components/shared/Card'
import { Loader2, Trash2, Calendar } from 'lucide-react'

function SavedPage() {
  const { isSignedIn, isLoaded, getToken } = useAuth()
  const navigate = useNavigate()
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null)

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

  const {
    data: analyses,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['savedDdmAnalyses'],
    queryFn: async () => {
      const token = await getToken()
      if (!token) {
        throw new Error('Not authenticated')
      }
      return fetchSavedDdmAnalyses(token)
    },
    enabled: isSignedIn && isLoaded,
  })

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this analysis?')) {
      return
    }

    setDeleteLoading(id)
    try {
      const token = await getToken()
      if (!token) {
        throw new Error('Not authenticated')
      }
      await deleteSavedDdmAnalysis(id, token)
      refetch()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete analysis')
    } finally {
      setDeleteLoading(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

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
    <div className="p-6 max-w-6xl mx-auto">
      <h1
        className="text-3xl font-bold mb-6"
        style={{ color: 'var(--text-primary)' }}
      >
        Saved Analyses
      </h1>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2
            size={32}
            className="animate-spin"
            style={{ color: 'var(--text-muted)' }}
          />
        </div>
      )}

      {error && (
        <Card className="p-6 border-2 border-red-200 bg-red-50">
          <p className="text-red-700">
            {error instanceof Error
              ? error.message
              : 'Failed to load saved analyses'}
          </p>
        </Card>
      )}

      {!isLoading && !error && analyses && analyses.length === 0 && (
        <Card className="p-8 text-center">
          <p style={{ color: 'var(--text-secondary)' }}>
            You haven't saved any analyses yet. Go to "Analysis" page and save
            them to see them here.
          </p>
        </Card>
      )}

      {!isLoading && !error && analyses && analyses.length > 0 && (
        <div className="space-y-4">
          {analyses.map((analysis) => (
            <Card key={analysis.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3
                      className="text-xl font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {analysis.symbol}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        analysis.isUndervalued
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {analysis.isUndervalued ? 'Undervalued' : 'Overvalued'}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p
                        className="text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Intrinsic Value
                      </p>
                      <p
                        className="text-lg font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        ${analysis.intrinsicValue.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Current Price
                      </p>
                      <p
                        className="text-lg font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        ${analysis.currentPrice?.toFixed(2) || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Growth Rate
                      </p>
                      <p
                        className="text-lg font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {analysis.growthRate.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Discount Rate
                      </p>
                      <p
                        className="text-lg font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {analysis.discountRate.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-2 text-sm"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <Calendar size={16} />
                    <span>{formatDate(analysis.createdAt)}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(analysis.id)}
                  disabled={deleteLoading === analysis.id}
                  className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  aria-label="Delete analysis"
                >
                  {deleteLoading === analysis.id ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Trash2 size={20} />
                  )}
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export const Route = createFileRoute('/saved')({
  component: SavedPage,
})
