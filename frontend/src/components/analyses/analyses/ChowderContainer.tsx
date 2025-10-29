import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import {
  fetchChowderData,
  saveChowderAnalysis,
  type SaveChowderAnalysisRequest,
  type SavedChowderAnalysis,
} from '../../../services/api'
import MetricRow from '../../calculators/shared/MetricRow'
import FormulaBlock from '../../calculators/shared/FormulaBlock'
import Card from '../../shared/Card'
import { Loader2, AlertCircle, Search, Save } from 'lucide-react'

export default function ChowderContainer() {
  const [inputSymbol, setInputSymbol] = useState('')
  const [searchSymbol, setSearchSymbol] = useState('')
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const { getToken, isSignedIn } = useAuth()
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['chowder', searchSymbol],
    queryFn: () => fetchChowderData(searchSymbol),
    enabled: !!searchSymbol && searchSymbol.length > 0,
    retry: false,
  })

  const handleSearch = () => {
    const trimmed = inputSymbol.trim().toUpperCase()
    if (trimmed) {
      setSearchSymbol(trimmed)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const getScoreInterpretation = (score: number | null) => {
    if (score === null) return null

    if (score >= 15) {
      return {
        level: 'Excellent',
        colorClass: 'text-green-600',
        description: 'Strong dividend growth potential with good current yield',
      }
    } else if (score >= 12) {
      return {
        level: 'Good',
        colorClass: 'text-blue-600',
        description: 'Solid combination of yield and growth',
      }
    } else if (score >= 8) {
      return {
        level: 'Fair',
        colorClass: 'text-yellow-600',
        description: 'Moderate dividend attractiveness',
      }
    } else {
      return {
        level: 'Poor',
        colorClass: 'text-red-600',
        description: 'Low dividend yield and/or poor dividend growth',
      }
    }
  }

  const interpretation = getScoreInterpretation(data?.chowderScore || null)

  // Check if error is rate limit (503)
  const isRateLimitError = error && error.message.includes('503')

  const saveMutation = useMutation({
    mutationFn: async (saveData: SaveChowderAnalysisRequest) => {
      const token = await getToken()
      if (!token) throw new Error('Not authenticated')
      return saveChowderAnalysis(saveData, token)
    },
    onMutate: async (saveData: SaveChowderAnalysisRequest) => {
      setSaveError(null)
      setSaveSuccess(false)
      await queryClient.cancelQueries({ queryKey: ['savedChowderAnalyses'] })
      const previous = queryClient.getQueryData<SavedChowderAnalysis[]>([
        'savedChowderAnalyses',
      ])
      const optimistic: SavedChowderAnalysis = {
        id: -Date.now(),
        symbol: saveData.symbol,
        chowderScore: saveData.chowderScore,
        dividendYield: saveData.dividendYield ?? null,
        dividendCAGR: saveData.dividendCAGR ?? null,
        yearsOfData: saveData.yearsOfData ?? null,
        currentPrice: saveData.currentPrice ?? null,
        message: saveData.message ?? null,
        createdAt: new Date().toISOString(),
      }
      queryClient.setQueryData<SavedChowderAnalysis[] | undefined>(
        ['savedChowderAnalyses'],
        (old) => (old ? [optimistic, ...old] : [optimistic]),
      )
      return { previous, tempId: optimistic.id }
    },
    onError: (err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['savedChowderAnalyses'], context.previous)
      }
      setSaveError(
        err instanceof Error ? err.message : 'Failed to save analysis',
      )
    },
    onSuccess: (result, _vars, context) => {
      // Replace optimistic with server result
      queryClient.setQueryData<SavedChowderAnalysis[] | undefined>(
        ['savedChowderAnalyses'],
        (old) =>
          old?.map((a) => (a.id === context?.tempId ? result : a)) || [result],
      )
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['savedChowderAnalyses'] })
    },
  })

  const handleSaveAnalysis = () => {
    if (!data?.isValid || !data.chowderScore || !searchSymbol || !isSignedIn)
      return
    const saveData: SaveChowderAnalysisRequest = {
      symbol: searchSymbol,
      chowderScore: data.chowderScore,
      dividendYield: data.dividendYield ?? null,
      dividendCAGR: data.dividendCAGR ?? null,
      yearsOfData: data.yearsOfData ?? null,
      currentPrice: data.currentPrice ?? null,
      message: data.message ?? null,
    }
    saveMutation.mutate(saveData)
  }

  return (
    <div className="grid md:grid-cols-5 gap-8">
      {/* Info Section */}
      <div className="md:col-span-2 space-y-6">
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          About the Chowder Rule
        </h3>

        <FormulaBlock title="Chowder Rule Formula:">
          <p className="mb-2">
            <strong>
              Chowder Score = Dividend Yield (%) + Dividend CAGR (%)
            </strong>
          </p>
          <div
            className="text-xs space-y-1"
            style={{ color: 'var(--text-muted)' }}
          >
            <p>• Dividend Yield = TTM Dividends / Current Price</p>
            <p>
              • Dividend CAGR = 5-year compound annual growth rate of dividends
            </p>
            <p>• Falls back to 3-year CAGR if insufficient 5-year data</p>
          </div>
        </FormulaBlock>

        <Card
          className="p-4"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
          <h4
            className="font-semibold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Score Interpretation:
          </h4>
          <ul
            className="text-sm space-y-1"
            style={{ color: 'var(--text-secondary)' }}
          >
            <li>
              • <strong>15+:</strong> Excellent dividend stock
            </li>
            <li>
              • <strong>12-14:</strong> Good dividend opportunity
            </li>
            <li>
              • <strong>8-11:</strong> Fair dividend potential
            </li>
            <li>
              • <strong>&lt;8:</strong> Poor dividend characteristics
            </li>
          </ul>
        </Card>
      </div>

      {/* Results Section */}
      <div className="md:col-span-3 space-y-6">
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Analyze a Stock
        </h3>

        {/* Search Bar */}
        <Card className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                style={{ color: 'var(--text-muted)' }}
              />
              <input
                type="text"
                value={inputSymbol}
                onChange={(e) => setInputSymbol(e.target.value.toUpperCase())}
                onKeyPress={handleKeyPress}
                placeholder="Enter stock symbol (e.g., PG, KO, JNJ)"
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={!inputSymbol.trim() || isLoading}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search size={16} />
                  Analyze
                </>
              )}
            </button>
          </div>
        </Card>

        {/* Loading State */}
        {isLoading && searchSymbol && (
          <Card className="p-8 text-center">
            <Loader2
              size={48}
              className="animate-spin mx-auto mb-4"
              style={{ color: 'var(--text-muted)' }}
            />
            <p style={{ color: 'var(--text-secondary)' }}>
              Loading Chowder analysis for {searchSymbol}...
            </p>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle
                size={24}
                className="text-red-500 flex-shrink-0 mt-1"
              />
              <div>
                <h4 className="font-semibold text-red-800 mb-2">
                  {isRateLimitError ? 'Rate Limit Exceeded' : 'Error'}
                </h4>
                {isRateLimitError ? (
                  <div className="text-red-700 space-y-2">
                    <p>
                      You've exceeded the API rate limit. Please try again in a
                      few moments.
                    </p>
                    <p className="text-sm">
                      Tip: The free tier of Polygon API has limited requests per
                      minute. Consider waiting 60 seconds before trying again.
                    </p>
                  </div>
                ) : (
                  <p className="text-red-700">{error.message}</p>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Results */}
        {data && !isLoading && (
          <>
            {/* Main Score Card */}
            {data.isValid && interpretation && data.chowderScore !== null ? (
              <Card className="p-6">
                <div className="text-center">
                  <h4
                    className="text-lg font-semibold mb-4"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Chowder Score for {searchSymbol}
                  </h4>
                  <div
                    className={`text-5xl font-bold mb-2 ${interpretation.colorClass}`}
                  >
                    {data.chowderScore.toFixed(1)}
                  </div>
                  <div
                    className={`text-xl font-semibold mb-1 ${interpretation.colorClass}`}
                  >
                    {interpretation.level}
                  </div>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {interpretation.description}
                  </p>
                </div>
              </Card>
            ) : (
              <Card className="p-6">
                <p className="text-center text-red-700">{data.message}</p>
              </Card>
            )}

            {/* Breakdown Card */}
            {data.isValid && data.chowderScore !== null && (
              <Card className="p-4">
                <h4
                  className="font-semibold mb-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Breakdown:
                </h4>
                <div className="space-y-3">
                  <MetricRow
                    label="Current Price:"
                    value={`$${data.currentPrice?.toFixed(2) || 'N/A'}`}
                  />
                  <MetricRow
                    label="Dividend Yield:"
                    value={`${data.dividendYield?.toFixed(2) || 'N/A'}%`}
                  />
                  <MetricRow
                    label="Dividend CAGR:"
                    value={`${data.dividendCAGR?.toFixed(2) || 'N/A'}%`}
                  />
                  <MetricRow
                    label="Years of Data:"
                    value={data.yearsOfData.toString()}
                  />
                  <hr style={{ borderColor: 'var(--border-color)' }} />
                  <MetricRow
                    label="Chowder Score:"
                    value={
                      interpretation ? (
                        <span className={interpretation.colorClass}>
                          {data.chowderScore?.toFixed(1) || 'N/A'}
                        </span>
                      ) : (
                        data.chowderScore?.toFixed(1) || 'N/A'
                      )
                    }
                    highlight
                  />
                </div>
              </Card>
            )}

            {/* Info Message */}
            <Card
              className="p-4"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
            >
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {data.message}
              </p>
            </Card>

            {/* Save Button */}
            {isSignedIn && data.isValid && data.chowderScore !== null && (
              <Card className="p-6">
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={handleSaveAnalysis}
                    disabled={saveMutation.isPending}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {saveMutation.isPending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        Save Analysis
                      </>
                    )}
                  </button>
                  {saveSuccess && (
                    <p className="text-sm text-green-600">
                      Analysis saved successfully!
                    </p>
                  )}
                  {saveError && (
                    <p className="text-sm text-red-600">{saveError}</p>
                  )}
                </div>
              </Card>
            )}
          </>
        )}

        {/* Empty State */}
        {!data && !isLoading && !error && (
          <Card className="p-8 text-center">
            <Search
              size={48}
              className="mx-auto mb-4"
              style={{ color: 'var(--text-muted)' }}
            />
            <p style={{ color: 'var(--text-secondary)' }}>
              Enter a stock symbol above to view Chowder Rule analysis.
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
