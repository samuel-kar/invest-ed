import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
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
import AnalysisTickerSearchForm from '../shared/TickerSearchForm'
import { getCompanyName } from '../../../data/tickers'

export default function DDMContainer() {
  const { t } = useTranslation()
  const [inputSymbol, setInputSymbol] = useState('')
  const [searchSymbol, setSearchSymbol] = useState('')
  const [growthRate, setGrowthRate] = useState(5)
  const [discountRate, setDiscountRate] = useState(8)
  const [expectedDividend, setExpectedDividend] = useState(0)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [showColdStart, setShowColdStart] = useState(false)
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

  const handleSearch = () => {
    const trimmed = inputSymbol.trim().toUpperCase()
    if (trimmed) {
      setSearchSymbol(trimmed)
    }
  }

  const handleTickerSelect = (symbol: string) => {
    // Update input symbol and immediately trigger search
    const trimmed = symbol.trim().toUpperCase()
    setInputSymbol(trimmed)
    setSearchSymbol(trimmed)
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
        err instanceof Error ? err.message : t('ddm.saveError'),
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
          {t('ddm.about')}
        </h3>

        <FormulaBlock title={t('ddm.formulaTitle')}>
          <p className="mb-2">
            <strong>{t('ddm.formula')}</strong>
          </p>
          <div
            className="text-xs space-y-1"
            style={{ color: 'var(--text-muted)' }}
          >
            <p>• {t('ddm.formulaV')}</p>
            <p>• {t('ddm.formulaD')}</p>
            <p>• {t('ddm.formulaG')}</p>
            <p>• {t('ddm.formulaR')}</p>
            <p>• {t('ddm.formulaNote')}</p>
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
            {t('ddm.interpretation')}
          </h4>
          <ul
            className="text-sm space-y-1"
            style={{ color: 'var(--text-secondary)' }}
          >
            <li>• {t('ddm.interpretation1')}</li>
            <li>• {t('ddm.interpretation2')}</li>
            <li>• {t('ddm.interpretation3')}</li>
            <li>• {t('ddm.interpretation4')}</li>
          </ul>
        </Card>
      </div>

      {/* Calculator Section */}
      <div className="md:col-span-3 space-y-6">
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('ddm.analyzeStock')}
        </h3>

        {/* Search Bar */}
        <Card className="p-4">
          <AnalysisTickerSearchForm
            value={inputSymbol}
            onChange={setInputSymbol}
            onSubmit={handleSearch}
            onTickerSelect={handleTickerSelect}
            placeholder={t('ddm.searchPlaceholder')}
            buttonLabel={t('ddm.searchButton')}
            loadingLabel={t('ddm.loadingData')}
            isLoading={isLoading}
          />
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
              {t('ddm.loadingData')} {searchSymbol}...
            </p>
            {showColdStart && (
              <p
                className="mt-3 text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                {t('ddm.coldStartMessage')}
              </p>
            )}
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
                  {isRateLimitError ? t('ddm.rateLimitError') : t('common.error')}
                </h4>
                {isRateLimitError ? (
                  <div className="text-red-700 space-y-2">
                    <p>
                      {t('ddm.rateLimitError')}
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
              <div className="mb-3">
                <h4
                  className="text-base font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {t('ddm.ddmAnalysisResults')}
                </h4>
                {getCompanyName(searchSymbol) && (
                  <p
                    className="text-xs opacity-80 mt-1"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {getCompanyName(searchSymbol)}
                  </p>
                )}
              </div>

              {!ddmResult.isValid && (
                <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-700 text-xs">
                    {discountRate <= growthRate
                      ? t('ddm.requiredReturnGreater')
                      : t('ddm.expectedDividendGreater')}
                  </p>
                </div>
              )}

              {ddmResult.isValid && (
                <>
                  {/* Row 1: Intrinsic Value | Status + Icon (centered) | [empty] */}
                  <div className="grid md:grid-cols-3 gap-4 mb-3">
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
                        {t('ddm.intrinsicValue')}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      {ddmResult.undervalued ? (
                        <TrendingUp size={16} className="text-green-600" />
                      ) : (
                        <TrendingDown size={16} className="text-red-600" />
                      )}
                      <span
                        className={`text-sm font-semibold ${ddmResult.undervalued ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {ddmResult.undervalued ? t('ddm.isUndervalued') : t('ddm.isOvervalued')}
                      </span>
                    </div>
                    <div></div>
                  </div>

                  {/* Row 2: Current Price | Margin (centered below Status) | Save button */}
                  <div className="grid md:grid-cols-3 gap-4 text-sm items-center">
                    <div>
                      <span style={{ color: 'var(--text-secondary)' }}>
                        {t('ddm.currentPrice')}{' '}
                      </span>
                      <span
                        className="font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        ${data.currentPrice?.toFixed(2) || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-center">
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
                    {isSignedIn ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={handleSaveAnalysis}
                          disabled={saveMutation.isPending}
                          className="px-3 py-1.5 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
                        >
                          {saveMutation.isPending ? (
                            <>
                              <Loader2 size={14} className="animate-spin" />
                              {t('common.loading')}
                            </>
                          ) : (
                            <>
                              <Save size={14} />
                              {t('ddm.saveAnalysis')}
                            </>
                          )}
                        </button>
                        {saveSuccess && (
                          <p className="text-xs text-green-600">{t('ddm.saveSuccess')}</p>
                        )}
                        {saveError && (
                          <p className="text-xs text-red-600">{saveError}</p>
                        )}
                      </div>
                    ) : (
                      <div></div>
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
                  {t('ddm.stockDataFor', { symbol: searchSymbol })}
                </h4>
                <div className="space-y-3">
                  <MetricRow
                    label={t('ddm.currentPrice')}
                    value={`$${data.currentPrice?.toFixed(2) || 'N/A'}`}
                  />
                  <MetricRow
                    label={t('ddm.expectedDividend')}
                    value={`$${data.totalDividend?.toFixed(2) || 'N/A'}`}
                  />
                  <MetricRow
                    label={t('ddm.dividendPaymentsPerYear')}
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
                  {t('ddm.ddmParameters')}
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {t('ddm.growthRate')}
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
                      {t('ddm.discountRate')}
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
                      {t('ddm.expectedDividend')}
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
              {t('ddm.noData')}
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
