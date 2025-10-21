import { ChevronDown, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react'
import { useState } from 'react'
import type { Quote, Fundamentals } from '../services/api'

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
  isOpen: boolean
  onToggle: () => void
}

function MetricSection({ title, metrics, isOpen, onToggle }: MetricSectionProps) {
  const formatValue = (value: number | null, format?: string) => {
    if (value === null) return 'N/A'
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(value)
      case 'percentage':
        return `${(value * 100).toFixed(2)}%`
      case 'ratio':
        return value.toFixed(2)
      case 'number':
        return new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value)
      default:
        return value.toFixed(2)
    }
  }

  return (
    <div className="border rounded-lg" style={{ borderColor: 'var(--border-color)' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:opacity-80 transition-opacity"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h3>
        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>
      
      {isOpen && (
        <div className="p-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {metric.label}
                </span>
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                  {formatValue(metric.value, metric.format)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function CompanyData({ quote, fundamentals }: CompanyDataProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    quote: true,
    valuation: false,
    profitability: false,
    perShare: false,
    liquidity: false,
    leverage: false,
    efficiency: false,
    valuationMetrics: false,
    other: false
  })

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

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
            <div className="flex items-center gap-4 mt-2">
              <span className="text-3xl font-bold">
                {quote.currentPrice ? `$${quote.currentPrice.toFixed(2)}` : 'N/A'}
              </span>
              {priceChange && priceChangePercent && (
                <div className={`flex items-center gap-1 ${isPositive ? 'text-green-200' : 'text-red-200'}`}>
                  {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span className="text-sm">
                    {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({isPositive ? '+' : ''}{priceChangePercent.toFixed(2)}%)
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
              {quote.previousClose ? `$${quote.previousClose.toFixed(2)}` : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* Financial Metrics Sections */}
      <div className="space-y-4">
        <MetricSection
          title="Valuation Ratios"
          metrics={[
            { label: 'Price-to-Earnings (P/E)', value: fundamentals.priceToEarningsRatio, format: 'ratio' },
            { label: 'Price-to-Book (P/B)', value: fundamentals.priceToBookRatio, format: 'ratio' },
            { label: 'Price-to-Sales (P/S)', value: fundamentals.priceToSalesRatio, format: 'ratio' },
            { label: 'Price-to-Free Cash Flow', value: fundamentals.priceToFreeCashFlowRatio, format: 'ratio' },
            { label: 'Price-to-Tangible Book Value', value: fundamentals.priceToTangibleBookValueRatio, format: 'ratio' }
          ]}
          isOpen={openSections.valuation}
          onToggle={() => toggleSection('valuation')}
        />

        <MetricSection
          title="Profitability Margins"
          metrics={[
            { label: 'Gross Margin', value: fundamentals.grossMargin, format: 'percentage' },
            { label: 'Operating Margin', value: fundamentals.operatingMargin, format: 'percentage' },
            { label: 'Net Margin', value: fundamentals.netMargin, format: 'percentage' },
            { label: 'Pre-tax Margin', value: fundamentals.pretaxMargin, format: 'percentage' },
            { label: 'Free Cash Flow Margin', value: fundamentals.freeCashFlowMargin, format: 'percentage' }
          ]}
          isOpen={openSections.profitability}
          onToggle={() => toggleSection('profitability')}
        />

        <MetricSection
          title="Per-Share Metrics"
          metrics={[
            { label: 'Earnings Per Share', value: fundamentals.earningsPerShare, format: 'currency' },
            { label: 'EBIT Per Share', value: fundamentals.ebitPerShare, format: 'currency' },
            { label: 'Sales Per Share', value: fundamentals.salesPerShare, format: 'currency' },
            { label: 'Tangible Book Value Per Share', value: fundamentals.tangibleBookValuePerShare, format: 'currency' }
          ]}
          isOpen={openSections.perShare}
          onToggle={() => toggleSection('perShare')}
        />

        <MetricSection
          title="Liquidity Ratios"
          metrics={[
            { label: 'Current Ratio', value: fundamentals.currentRatio, format: 'ratio' },
            { label: 'Quick Ratio', value: fundamentals.quickRatio, format: 'ratio' },
            { label: 'Cash Ratio', value: fundamentals.cashRatio, format: 'ratio' }
          ]}
          isOpen={openSections.liquidity}
          onToggle={() => toggleSection('liquidity')}
        />

        <MetricSection
          title="Leverage Ratios"
          metrics={[
            { label: 'Total Debt to Equity', value: fundamentals.totalDebtToEquity, format: 'ratio' },
            { label: 'Total Debt to Total Asset', value: fundamentals.totalDebtToTotalAsset, format: 'ratio' },
            { label: 'Total Debt to Total Capital', value: fundamentals.totalDebtToTotalCapital, format: 'ratio' },
            { label: 'Long-term Debt to Total Asset', value: fundamentals.longtermDebtToTotalAsset, format: 'ratio' },
            { label: 'Long-term Debt to Total Capital', value: fundamentals.longtermDebtToTotalCapital, format: 'ratio' },
            { label: 'Long-term Debt to Total Equity', value: fundamentals.longtermDebtToTotalEquity, format: 'ratio' },
            { label: 'Net Debt to Total Capital', value: fundamentals.netDebtToTotalCapital, format: 'ratio' },
            { label: 'Net Debt to Total Equity', value: fundamentals.netDebtToTotalEquity, format: 'ratio' }
          ]}
          isOpen={openSections.leverage}
          onToggle={() => toggleSection('leverage')}
        />

        <MetricSection
          title="Efficiency Ratios"
          metrics={[
            { label: 'Return on Assets (ROA)', value: fundamentals.returnOnAssets, format: 'percentage' },
            { label: 'Return on Equity (ROE)', value: fundamentals.returnOnEquity, format: 'percentage' },
            { label: 'Return on Invested Capital (ROIC)', value: fundamentals.returnOnInvestedCapital, format: 'percentage' },
            { label: 'Return on Total Capital (ROTC)', value: fundamentals.returnOnTotalCapital, format: 'percentage' },
            { label: 'Inventory Turnover', value: fundamentals.inventoryTurnover, format: 'ratio' },
            { label: 'Receivables Turnover', value: fundamentals.receivablesTurnover, format: 'ratio' }
          ]}
          isOpen={openSections.efficiency}
          onToggle={() => toggleSection('efficiency')}
        />

        <MetricSection
          title="Valuation Metrics"
          metrics={[
            { label: 'Enterprise Value', value: fundamentals.enterpriseValue, format: 'currency' },
            { label: 'EV/EBITDA', value: fundamentals.evToEbitda, format: 'ratio' },
            { label: 'EV/Revenue', value: fundamentals.evToRevenue, format: 'ratio' }
          ]}
          isOpen={openSections.valuationMetrics}
          onToggle={() => toggleSection('valuationMetrics')}
        />

        <MetricSection
          title="Other Metrics"
          metrics={[
            { label: 'Payout Ratio', value: fundamentals.payoutRatio, format: 'percentage' },
            { label: 'Book Value Per Share', value: fundamentals.bookValuePerShare, format: 'currency' },
            { label: 'SG&A to Sales', value: fundamentals.sgaToSale, format: 'percentage' },
            { label: 'Total Ratio', value: fundamentals.totalRatio, format: 'ratio' }
          ]}
          isOpen={openSections.other}
          onToggle={() => toggleSection('other')}
        />
      </div>
    </div>
  )
}
