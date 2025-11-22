import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2, Trash2, Calendar } from 'lucide-react'
import Card from '../shared/Card'
import {
  fetchSavedDdmAnalyses,
  deleteSavedDdmAnalysis,
  type SavedDdmAnalysis,
} from '../../services/api'

export default function SavedDdmList() {
  const { t } = useTranslation()
  const [showColdStart, setShowColdStart] = useState(false)
  const { isSignedIn, isLoaded, getToken } = useAuth()
  const queryClient = useQueryClient()

  const {
    data: analyses,
    isLoading,
    error,
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

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const token = await getToken()
      if (!token) throw new Error('Not authenticated')
      return deleteSavedDdmAnalysis(id, token)
    },
    // Optimistic update
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['savedDdmAnalyses'] })
      const previous = queryClient.getQueryData<SavedDdmAnalysis[]>([
        'savedDdmAnalyses',
      ])
      queryClient.setQueryData<SavedDdmAnalysis[] | undefined>(
        ['savedDdmAnalyses'],
        (old) => old?.filter((a) => a.id !== id),
      )
      return { previous }
    },
    onError: (err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['savedDdmAnalyses'], context.previous)
      }
      alert(err instanceof Error ? err.message : t('saved.deleteError'))
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['savedDdmAnalyses'] })
    },
  })

  const handleDelete = (id: number) => {
    if (!confirm(t('saved.confirmDelete'))) return
    deleteMutation.mutate(id)
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
        <p style={{ color: 'var(--text-secondary)' }}>{t('common.loading')}</p>
      </div>
    )
  }

  if (!isSignedIn) return null

  return (
    <div className="p-0">
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2
            size={32}
            className="animate-spin mb-4"
            style={{ color: 'var(--text-muted)' }}
          />
          {showColdStart && (
            <p
              className="text-xs text-center"
              style={{ color: 'var(--text-muted)' }}
            >
              {t('saved.coldStartMessage')}
            </p>
          )}
        </div>
      )}

      {error && (
        <Card className="p-6 border-2 border-red-200 bg-red-50">
          <p className="text-red-700">
            {error instanceof Error
              ? error.message
              : t('saved.loadError')}
          </p>
        </Card>
      )}

      {!isLoading && !error && analyses && analyses.length === 0 && (
        <Card className="p-8 text-center">
          <p style={{ color: 'var(--text-secondary)' }}>
            {t('saved.noDdmAnalyses')}
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
                      {analysis.isUndervalued ? t('ddm.isUndervalued') : t('ddm.isOvervalued')}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p
                        className="text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {t('ddm.intrinsicValue')}
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
                        {t('ddm.currentPrice')}
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
                        {t('ddm.growthRate')}
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
                        {t('ddm.discountRate')}
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
                  disabled={
                    deleteMutation.isPending &&
                    deleteMutation.variables === analysis.id
                  }
                  className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  aria-label={t('saved.deleteAnalysis')}
                >
                  {deleteMutation.isPending &&
                  deleteMutation.variables === analysis.id ? (
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
