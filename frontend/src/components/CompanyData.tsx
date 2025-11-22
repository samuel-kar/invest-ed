import {
  TrendingUp,
  TrendingDown,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
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
            <span className="opacity-80">{t('companies.high')}</span>
            <div className="font-semibold">
              {quote.high ? `$${quote.high.toFixed(2)}` : 'N/A'}
            </div>
          </div>
          <div>
            <span className="opacity-80">{t('companies.low')}</span>
            <div className="font-semibold">
              {quote.low ? `$${quote.low.toFixed(2)}` : 'N/A'}
            </div>
          </div>
          <div>
            <span className="opacity-80">{t('companies.open')}</span>
            <div className="font-semibold">
              {quote.open ? `$${quote.open.toFixed(2)}` : 'N/A'}
            </div>
          </div>
          <div>
            <span className="opacity-80">{t('companies.previousClose')}</span>
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
          title={t('companies.valuationRatios')}
          metrics={[
            {
              label: t('companies.priceToEarnings'),
              value: fundamentals.priceToEarningsRatio,
              format: 'ratio',
            },
            {
              label: t('companies.priceToBook'),
              value: fundamentals.priceToBookRatio,
              format: 'ratio',
            },
            {
              label: t('companies.priceToSales'),
              value: fundamentals.priceToSalesRatio,
              format: 'ratio',
            },
            {
              label: t('companies.priceToFreeCashFlow'),
              value: fundamentals.priceToFreeCashFlowRatio,
              format: 'ratio',
            },
            {
              label: t('companies.priceToTangibleBookValue'),
              value: fundamentals.priceToTangibleBookValueRatio,
              format: 'ratio',
            },
          ]}
        />

        <MetricSection
          title={t('companies.profitabilityMargins')}
          metrics={[
            {
              label: t('companies.grossMargin'),
              value: fundamentals.grossMargin,
              format: 'percentage',
            },
            {
              label: t('companies.operatingMargin'),
              value: fundamentals.operatingMargin,
              format: 'percentage',
            },
            {
              label: t('companies.netMargin'),
              value: fundamentals.netMargin,
              format: 'percentage',
            },
            {
              label: t('companies.pretaxMargin'),
              value: fundamentals.pretaxMargin,
              format: 'percentage',
            },
            {
              label: t('companies.freeCashFlowMargin'),
              value: fundamentals.freeCashFlowMargin,
              format: 'percentage',
            },
          ]}
        />

        <MetricSection
          title={t('companies.perShareMetrics')}
          metrics={[
            {
              label: t('companies.earningsPerShare'),
              value: fundamentals.earningsPerShare,
              format: 'currency',
            },
            {
              label: t('companies.ebitPerShare'),
              value: fundamentals.ebitPerShare,
              format: 'currency',
            },
            {
              label: t('companies.salesPerShare'),
              value: fundamentals.salesPerShare,
              format: 'currency',
            },
          ]}
        />

        <MetricSection
          title={t('companies.liquidityRatios')}
          metrics={[
            {
              label: t('companies.currentRatio'),
              value: fundamentals.currentRatio,
              format: 'ratio',
            },
            {
              label: t('companies.quickRatio'),
              value: fundamentals.quickRatio,
              format: 'ratio',
            },
            {
              label: t('companies.cashRatio'),
              value: fundamentals.cashRatio,
              format: 'ratio',
            },
          ]}
        />

        <MetricSection
          title={t('companies.leverageRatios')}
          metrics={[
            {
              label: t('companies.totalDebtToEquity'),
              value: fundamentals.totalDebtToEquity,
              format: 'ratio',
            },
            {
              label: t('companies.totalDebtToTotalAsset'),
              value: fundamentals.totalDebtToTotalAsset,
              format: 'ratio',
            },
            {
              label: t('companies.totalDebtToTotalCapital'),
              value: fundamentals.totalDebtToTotalCapital,
              format: 'ratio',
            },
            {
              label: t('companies.longtermDebtToTotalAsset'),
              value: fundamentals.longtermDebtToTotalAsset,
              format: 'ratio',
            },
            {
              label: t('companies.longtermDebtToTotalCapital'),
              value: fundamentals.longtermDebtToTotalCapital,
              format: 'ratio',
            },
            {
              label: t('companies.longtermDebtToTotalEquity'),
              value: fundamentals.longtermDebtToTotalEquity,
              format: 'ratio',
            },
            {
              label: t('companies.netDebtToTotalCapital'),
              value: fundamentals.netDebtToTotalCapital,
              format: 'ratio',
            },
            {
              label: t('companies.netDebtToTotalEquity'),
              value: fundamentals.netDebtToTotalEquity,
              format: 'ratio',
            },
          ]}
        />

        <MetricSection
          title={t('companies.efficiencyRatios')}
          metrics={[
            {
              label: t('companies.returnOnAssets'),
              value: fundamentals.returnOnAssets,
              format: 'percentage',
            },
            {
              label: t('companies.returnOnEquity'),
              value: fundamentals.returnOnEquity,
              format: 'percentage',
            },
            {
              label: t('companies.returnOnCapital'),
              value: fundamentals.returnOnInvestedCapital,
              format: 'percentage',
            },
            {
              label: t('companies.assetTurnover'),
              value: fundamentals.returnOnTotalCapital,
              format: 'percentage',
            },
            {
              label: t('companies.inventoryTurnover'),
              value: fundamentals.inventoryTurnover,
              format: 'ratio',
            },
            {
              label: t('companies.receivablesTurnover'),
              value: fundamentals.receivablesTurnover,
              format: 'ratio',
            },
          ]}
        />
      </div>
    </div>
  )
}
