import { useState, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import {
  fetchDdmData,
  saveDdmAnalysis,
  type SaveDdmAnalysisRequest,
  type SavedDdmAnalysis,
} from '../../../services/api'
import { ddmCalculator } from '../../../utils/calculations'
import MetricRow from '../../calculators/shared/MetricRow'
import FormulaBlock from '../../calculators/shared/FormulaBlock'
import Card from '../../shared/Card'
import {
  Loader2,
  AlertCircle,
  Search,
  TrendingUp,
  TrendingDown,
  Save,
} from 'lucide-react'

export default function DDMContainer() {
  const [inputSymbol, setInputSymbol] = useState('')
  const [searchSymbol, setSearchSymbol] = useState('')
  const [growthRate, setGrowthRate] = useState(5)
  const [discountRate, setDiscountRate] = useState(8)
  const [expectedDividend, setExpectedDividend] = useState(0)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const { getToken, isSignedIn } = useAuth()
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['ddm', searchSymbol],
    queryFn: () => fetchDdmData(searchSymbol),
    enabled: !!searchSymbol && searchSymbol.length > 0,
    retry: false,
  })

  // Auto-fill expected dividend when data is loaded
  useEffect(() => {
    if (data && data.totalDividend !== null) {
      setExpectedDividend(data.totalDividend)
    }
  }, [data])

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

  // DDM calculation
  const ddmResult = ddmCalculator(
    expectedDividend,
    growthRate,
    discountRate,
    data?.currentPrice ?? undefined,
  )

  // Check if error is rate limit (503)
  const isRateLimitError = error && error.message.includes('503')

  const saveMutation = useMutation({
    mutationFn: async (saveData: SaveDdmAnalysisRequest) => {
      const token = await getToken()
      if (!token) throw new Error('Not authenticated')
      return saveDdmAnalysis(saveData, token)
    },
    onMutate: async (saveData: SaveDdmAnalysisRequest) => {
      setSaveError(null)
      setSaveSuccess(false)
      await queryClient.cancelQueries({ queryKey: ['savedDdmAnalyses'] })
      const previous = queryClient.getQueryData<SavedDdmAnalysis[]>([
        'savedDdmAnalyses',
      ])
      const optimistic: SavedDdmAnalysis = {
        id: -Date.now(),
        symbol: saveData.symbol,
        expectedDividend: saveData.expectedDividend,
        growthRate: saveData.growthRate,
        discountRate: saveData.discountRate,
        totalDividend: saveData.totalDividend ?? null,
        currentPrice: saveData.currentPrice ?? null,
        intrinsicValue: saveData.intrinsicValue,
        isUndervalued: saveData.isUndervalued,
        createdAt: new Date().toISOString(),
      }
      queryClient.setQueryData<SavedDdmAnalysis[] | undefined>(
        ['savedDdmAnalyses'],
        (old) => (old ? [optimistic, ...old] : [optimistic]),
      )
      return { previous, tempId: optimistic.id }
    },
    onError: (err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['savedDdmAnalyses'], context.previous)
      }
      setSaveError(
        err instanceof Error ? err.message : 'Failed to save analysis',
      )
    },
    onSuccess: (result, _vars, context) => {
      // Replace optimistic with server result
      queryClient.setQueryData<SavedDdmAnalysis[] | undefined>(
        ['savedDdmAnalyses'],
        (old) =>
          old?.map((a) => (a.id === context?.tempId ? result : a)) || [result],
      )
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['savedDdmAnalyses'] })
    },
  })

  const handleSaveAnalysis = () => {
    if (!ddmResult.isValid || !searchSymbol || !isSignedIn) return
    const saveData: SaveDdmAnalysisRequest = {
      symbol: searchSymbol,
      expectedDividend,
      growthRate,
      discountRate,
      totalDividend: data?.totalDividend ?? null,
      currentPrice: data?.currentPrice ?? null,
      intrinsicValue: ddmResult.intrinsicValue,
      isUndervalued: ddmResult.undervalued ?? false,
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
          About DDM Analysis
        </h3>

        <FormulaBlock title="Dividend Discount Model Formula:">
          <p className="mb-2">
            <strong>V = D × (1 + g) / (r - g)</strong>
          </p>
          <div
            className="text-xs space-y-1"
            style={{ color: 'var(--text-muted)' }}
          >
            <p>• V = Intrinsic value</p>
            <p>• D = Expected next year's dividend</p>
            <p>• g = Dividend growth rate (%)</p>
            <p>• r = Required return rate (%)</p>
            <p>• Note: r must be greater than g</p>
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
            Interpretation:
          </h4>
          <ul
            className="text-sm space-y-1"
            style={{ color: 'var(--text-secondary)' }}
          >
            <li>
              •{' '}
              <span className="text-green-600 font-semibold">
                Intrinsic Value &gt; Current Price:
              </span>{' '}
              Undervalued
            </li>
            <li>
              •{' '}
              <span className="text-red-600 font-semibold">
                Intrinsic Value &lt; Current Price:
              </span>{' '}
              Overvalued
            </li>
            <li>
              • <strong>Margin of Safety:</strong> Percentage difference between
              intrinsic and current price
            </li>
          </ul>
        </Card>
      </div>

      {/* Calculator Section */}
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
                  Loading...
                </>
              ) : (
                <>
                  <Search size={16} />
                  Search
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
              Loading DDM data for {searchSymbol}...
            </p>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Card className="p-6 border-2 border-red-200 bg-red-50">
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
            {/* Calculation Results - Prominent banner at top */}
            <Card className="p-4">
              <h4
                className="text-base font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                DDM Analysis Results
              </h4>

              {!ddmResult.isValid && (
                <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-700 text-xs">
                    {discountRate <= growthRate
                      ? 'Required return must be greater than growth rate'
                      : 'Expected dividend must be greater than 0'}
                  </p>
                </div>
              )}

              {ddmResult.isValid && (
                <>
                  {/* Row 1: Intrinsic Value | Status + Icon */}
                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div className="flex flex-col">
                      <div
                        className={`text-2xl font-bold ${ddmResult.undervalued ? 'text-green-600' : 'text-red-600'}`}
                      >
                        ${ddmResult.intrinsicValue.toFixed(2)}
                      </div>
                      <span
                        className="text-xs mt-1"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Intrinsic Value
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {ddmResult.undervalued ? (
                        <TrendingUp size={16} className="text-green-600" />
                      ) : (
                        <TrendingDown size={16} className="text-red-600" />
                      )}
                      <span
                        className={`text-sm font-semibold ${ddmResult.undervalued ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {ddmResult.undervalued ? 'Undervalued' : 'Overvalued'}
                      </span>
                    </div>
                  </div>

                  {/* Row 2: Current Price | Margin of Safety | Save button */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div>
                      <span style={{ color: 'var(--text-secondary)' }}>
                        Current Price:{' '}
                      </span>
                      <span
                        className="font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        ${data.currentPrice?.toFixed(2) || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-secondary)' }}>
                        Margin:{' '}
                      </span>
                      <span
                        className={`font-semibold ${(ddmResult.marginOfSafety ?? 0) > 0 ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {(ddmResult.marginOfSafety ?? 0) > 0 ? '+' : ''}
                        {(ddmResult.marginOfSafety ?? 0).toFixed(1)}%
                      </span>
                    </div>
                    {isSignedIn && (
                      <div className="ml-auto flex items-center gap-2">
                        <button
                          onClick={handleSaveAnalysis}
                          disabled={saveMutation.isPending}
                          className="px-3 py-1.5 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
                        >
                          {saveMutation.isPending ? (
                            <>
                              <Loader2 size={14} className="animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save size={14} />
                              Save
                            </>
                          )}
                        </button>
                        {saveSuccess && (
                          <p className="text-xs text-green-600">Saved!</p>
                        )}
                        {saveError && (
                          <p className="text-xs text-red-600">{saveError}</p>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </Card>

            {/* Stock Data and DDM Parameters side-by-side */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Stock Data Card */}
              <Card className="p-4">
                <h4
                  className="font-semibold mb-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Stock Data for {searchSymbol}:
                </h4>
                <div className="space-y-3">
                  <MetricRow
                    label="Current Price:"
                    value={`$${data.currentPrice?.toFixed(2) || 'N/A'}`}
                  />
                  <MetricRow
                    label="Last Year's Total Dividend:"
                    value={`$${data.totalDividend?.toFixed(2) || 'N/A'}`}
                  />
                  <MetricRow
                    label="Dividend Payments per Year:"
                    value={data.dividendCount.toString()}
                  />
                </div>
              </Card>

              {/* DDM Parameters Card */}
              <Card className="p-4">
                <h4
                  className="font-semibold mb-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  DDM Parameters:
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span style={{ color: 'var(--text-secondary)' }}>
                      Growth Rate (%):
                    </span>
                    <input
                      type="number"
                      value={growthRate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setGrowthRate(Number(e.target.value))
                      }
                      min="0"
                      max="50"
                      step="0.1"
                      className="w-20 p-2 rounded-md transition-colors"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: 'var(--text-secondary)' }}>
                      Required Return (%):
                    </span>
                    <input
                      type="number"
                      value={discountRate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setDiscountRate(Number(e.target.value))
                      }
                      min="0"
                      max="50"
                      step="0.1"
                      className="w-20 p-2 rounded-md transition-colors"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: 'var(--text-secondary)' }}>
                      Next Year Dividend ($):
                    </span>
                    <input
                      type="number"
                      value={expectedDividend}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setExpectedDividend(Number(e.target.value))
                      }
                      min="0"
                      step="0.01"
                      className="w-20 p-2 rounded-md transition-colors"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                      }}
                    />
                  </div>
                </div>
              </Card>
            </div>
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
              Enter a stock symbol above to view DDM analysis.
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
