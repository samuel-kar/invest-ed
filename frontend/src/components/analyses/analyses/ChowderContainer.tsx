import { useQuery } from '@tanstack/react-query'
import { fetchChowderData } from '../../../services/api'
import MetricRow from '../../calculators/shared/MetricRow'
import FormulaBlock from '../../calculators/shared/FormulaBlock'
import Card from '../../shared/Card'
import { Loader2, AlertCircle } from 'lucide-react'

interface ChowderContainerProps {
  symbol: string
}

export default function ChowderContainer({ symbol }: ChowderContainerProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['chowder', symbol],
    queryFn: () => fetchChowderData(symbol),
    enabled: !!symbol && symbol.length > 0,
    retry: false,
  })

  const getScoreInterpretation = (score: number | null) => {
    if (score === null) return null

    if (score >= 15) {
      return {
        level: 'Excellent',
        colorClass: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        description: 'Strong dividend growth potential with good current yield',
      }
    } else if (score >= 12) {
      return {
        level: 'Good',
        colorClass: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        description: 'Solid combination of yield and growth',
      }
    } else if (score >= 8) {
      return {
        level: 'Fair',
        colorClass: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        description: 'Moderate dividend attractiveness',
      }
    } else {
      return {
        level: 'Poor',
        colorClass: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        description: 'Low dividend yield and/or poor dividend growth',
      }
    }
  }

  const interpretation = getScoreInterpretation(data?.chowderScore || null)

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

        {!symbol && (
          <Card className="p-4">
            <p style={{ color: 'var(--text-secondary)' }}>
              Enter a stock symbol in the search bar above to analyze.
            </p>
          </Card>
        )}
      </div>

      {/* Results Section */}
      <div className="md:col-span-3 space-y-6">
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Analysis Results
          {isLoading && symbol
            ? ` for ${symbol}`
            : symbol
              ? ` for ${symbol}`
              : ''}
        </h3>

        {/* Loading State */}
        {isLoading && symbol && (
          <Card className="p-8 text-center">
            <Loader2
              size={48}
              className="animate-spin mx-auto mb-4"
              style={{ color: 'var(--text-muted)' }}
            />
            <p style={{ color: 'var(--text-secondary)' }}>
              Loading Chowder analysis for {symbol}...
            </p>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Card className="p-6 border-2 border-red-200 bg-red-50">
            <div className="flex items-center gap-3">
              <AlertCircle size={24} className="text-red-500" />
              <div>
                <h4 className="font-semibold text-red-800">Error</h4>
                <p className="text-red-700">{error.message}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Results */}
        {data && !isLoading && (
          <>
            {/* Main Score Card */}
            {data.isValid && interpretation && data.chowderScore !== null ? (
              <Card
                className={`p-6 ${interpretation.bgColor} border-2 ${interpretation.borderColor}`}
              >
                <div className="text-center">
                  <h4
                    className="text-lg font-semibold mb-4"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Chowder Score
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
              <Card className="p-6 bg-yellow-50 border-2 border-yellow-200">
                <p className="text-center text-yellow-700">{data.message}</p>
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
          </>
        )}

        {/* Empty State */}
        {!data && !isLoading && !error && !symbol && (
          <Card className="p-8 text-center">
            <p style={{ color: 'var(--text-secondary)' }}>
              Enter a stock symbol above to view Chowder Rule analysis.
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
