import {
  TrendingUp,
  TrendingDown,
} from 'lucide-react'
import type { Quote, Fundamentals } from '../services/api'
import Card from './shared/Card'
import { getCompanyName } from '../data/tickers'

interface CompanyDataProps {
  quote: Quote
  fundamentals: Fundamentals
}

interface MetricSectionProps {
  title: string
  metrics: Array<{
    label: string
    value: number | null
    format?: 'currency' | 'percentage' | 'ratio' | 'number'
  }>
}

function MetricSection({
  title,
  metrics,
}: MetricSectionProps) {
  const formatValue = (value: number | null, format?: string) => {
    if (value === null) return 'N/A'

    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(value)
      case 'percentage':
        return `${(value * 100).toFixed(2)}%`
      case 'ratio':
        return value.toFixed(2)
      case 'number':
        return new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value)
      default:
        return value.toFixed(2)
    }
  }

  return (
    <Card>
      <div className="p-4">
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2"
            >
              <span
                className="text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                {metric.label}
              </span>
              <span
                className="font-medium"
                style={{ color: 'var(--text-primary)' }}
              >
                {formatValue(metric.value, metric.format)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default function CompanyData({ quote, fundamentals }: CompanyDataProps) {
  const companyName = getCompanyName(fundamentals.symbol)

  const getPriceChange = () => {
    if (!quote.currentPrice || !quote.previousClose) return null
    return quote.currentPrice - quote.previousClose
  }

  const getPriceChangePercent = () => {
    const change = getPriceChange()
    if (!change || !quote.previousClose) return null
    return (change / quote.previousClose) * 100
  }

  const priceChange = getPriceChange()
  const priceChangePercent = getPriceChangePercent()
  const isPositive = priceChange && priceChange > 0

  return (
    <div className="space-y-4">
      {/* Quote Summary Card */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{fundamentals.symbol}</h2>
            {companyName && (
              <p className="text-sm opacity-90 mt-1">{companyName}</p>
            )}
            <div className="flex items-center gap-4 mt-2">
              <span className="text-3xl font-bold">
                {quote.currentPrice
                  ? `$${quote.currentPrice.toFixed(2)}`
                  : 'N/A'}
              </span>
              {priceChange && priceChangePercent && (
                <div
                  className={`flex items-center gap-1 ${isPositive ? 'text-green-200' : 'text-red-200'}`}
                >
                  {isPositive ? (
                    <TrendingUp size={16} />
                  ) : (
                    <TrendingDown size={16} />
                  )}
                  <span className="text-sm">
                    {isPositive ? '+' : ''}
                    {priceChange.toFixed(2)} ({isPositive ? '+' : ''}
                    {priceChangePercent.toFixed(2)}%)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
          <div>
            <span className="opacity-80">High</span>
            <div className="font-semibold">
              {quote.high ? `$${quote.high.toFixed(2)}` : 'N/A'}
            </div>
          </div>
          <div>
            <span className="opacity-80">Low</span>
            <div className="font-semibold">
              {quote.low ? `$${quote.low.toFixed(2)}` : 'N/A'}
            </div>
          </div>
          <div>
            <span className="opacity-80">Open</span>
            <div className="font-semibold">
              {quote.open ? `$${quote.open.toFixed(2)}` : 'N/A'}
            </div>
          </div>
          <div>
            <span className="opacity-80">Previous Close</span>
            <div className="font-semibold">
              {quote.previousClose
                ? `$${quote.previousClose.toFixed(2)}`
                : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* Financial Metrics Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricSection
          title="Valuation Ratios"
          metrics={[
            {
              label: 'Price-to-Earnings (P/E)',
              value: fundamentals.priceToEarningsRatio,
              format: 'ratio',
            },
            {
              label: 'Price-to-Book (P/B)',
              value: fundamentals.priceToBookRatio,
              format: 'ratio',
            },
            {
              label: 'Price-to-Sales (P/S)',
              value: fundamentals.priceToSalesRatio,
              format: 'ratio',
            },
            {
              label: 'Price-to-Free Cash Flow',
              value: fundamentals.priceToFreeCashFlowRatio,
              format: 'ratio',
            },
            {
              label: 'Price-to-Tangible Book Value',
              value: fundamentals.priceToTangibleBookValueRatio,
              format: 'ratio',
            },
          ]}
        />

        <MetricSection
          title="Profitability Margins"
          metrics={[
            {
              label: 'Gross Margin',
              value: fundamentals.grossMargin,
              format: 'percentage',
            },
            {
              label: 'Operating Margin',
              value: fundamentals.operatingMargin,
              format: 'percentage',
            },
            {
              label: 'Net Margin',
              value: fundamentals.netMargin,
              format: 'percentage',
            },
            {
              label: 'Pre-tax Margin',
              value: fundamentals.pretaxMargin,
              format: 'percentage',
            },
            {
              label: 'Free Cash Flow Margin',
              value: fundamentals.freeCashFlowMargin,
              format: 'percentage',
            },
          ]}
        />

        <MetricSection
          title="Per-Share Metrics"
          metrics={[
            {
              label: 'Earnings Per Share',
              value: fundamentals.earningsPerShare,
              format: 'currency',
            },
            {
              label: 'EBIT Per Share',
              value: fundamentals.ebitPerShare,
              format: 'currency',
            },
            {
              label: 'Sales Per Share',
              value: fundamentals.salesPerShare,
              format: 'currency',
            },
          ]}
        />

        <MetricSection
          title="Liquidity Ratios"
          metrics={[
            {
              label: 'Current Ratio',
              value: fundamentals.currentRatio,
              format: 'ratio',
            },
            {
              label: 'Quick Ratio',
              value: fundamentals.quickRatio,
              format: 'ratio',
            },
            {
              label: 'Cash Ratio',
              value: fundamentals.cashRatio,
              format: 'ratio',
            },
          ]}
        />

        <MetricSection
          title="Leverage Ratios"
          metrics={[
            {
              label: 'Total Debt to Equity',
              value: fundamentals.totalDebtToEquity,
              format: 'ratio',
            },
            {
              label: 'Total Debt to Total Asset',
              value: fundamentals.totalDebtToTotalAsset,
              format: 'ratio',
            },
            {
              label: 'Total Debt to Total Capital',
              value: fundamentals.totalDebtToTotalCapital,
              format: 'ratio',
            },
            {
              label: 'Long-term Debt to Total Asset',
              value: fundamentals.longtermDebtToTotalAsset,
              format: 'ratio',
            },
            {
              label: 'Long-term Debt to Total Capital',
              value: fundamentals.longtermDebtToTotalCapital,
              format: 'ratio',
            },
            {
              label: 'Long-term Debt to Total Equity',
              value: fundamentals.longtermDebtToTotalEquity,
              format: 'ratio',
            },
            {
              label: 'Net Debt to Total Capital',
              value: fundamentals.netDebtToTotalCapital,
              format: 'ratio',
            },
            {
              label: 'Net Debt to Total Equity',
              value: fundamentals.netDebtToTotalEquity,
              format: 'ratio',
            },
          ]}
        />

        <MetricSection
          title="Efficiency Ratios"
          metrics={[
            {
              label: 'Return on Assets (ROA)',
              value: fundamentals.returnOnAssets,
              format: 'percentage',
            },
            {
              label: 'Return on Equity (ROE)',
              value: fundamentals.returnOnEquity,
              format: 'percentage',
            },
            {
              label: 'Return on Invested Capital (ROIC)',
              value: fundamentals.returnOnInvestedCapital,
              format: 'percentage',
            },
            {
              label: 'Return on Total Capital (ROTC)',
              value: fundamentals.returnOnTotalCapital,
              format: 'percentage',
            },
            {
              label: 'Inventory Turnover',
              value: fundamentals.inventoryTurnover,
              format: 'ratio',
            },
            {
              label: 'Receivables Turnover',
              value: fundamentals.receivablesTurnover,
              format: 'ratio',
            },
          ]}
        />

        <MetricSection
          title="Valuation Metrics"
          metrics={[
            {
              label: 'Enterprise Value',
              value: fundamentals.enterpriseValue,
              format: 'currency',
            },
            {
              label: 'EV/EBITDA',
              value: fundamentals.evToEbitda,
              format: 'ratio',
            },
            {
              label: 'EV/Revenue',
              value: fundamentals.evToRevenue,
              format: 'ratio',
            },
          ]}
        />

        <MetricSection
          title="Other Metrics"
          metrics={[
            {
              label: 'Payout Ratio',
              value: fundamentals.payoutRatio,
              format: 'percentage',
            },
            {
              label: 'SG&A to Sales',
              value: fundamentals.sgaToSale,
              format: 'percentage',
            },
            {
              label: 'Total Ratio',
              value: fundamentals.totalRatio,
              format: 'ratio',
            },
          ]}
        />
      </div>
    </div>
  )
}
