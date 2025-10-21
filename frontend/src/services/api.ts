/**
 * API service for fetching market data from the backend
 */

const API_BASE_URL = 'http://localhost:8080/api/market'

export interface Quote {
  currentPrice: number | null
  high: number | null
  low: number | null
  open: number | null
  previousClose: number | null
}

export interface Fundamentals {
  symbol: string
  
  // Valuation Ratios
  priceToEarningsRatio: number | null
  priceToBookRatio: number | null
  priceToSalesRatio: number | null
  priceToFreeCashFlowRatio: number | null
  priceToTangibleBookValueRatio: number | null
  
  // Profitability Margins
  grossMargin: number | null
  operatingMargin: number | null
  netMargin: number | null
  pretaxMargin: number | null
  freeCashFlowMargin: number | null
  
  // Per-Share Metrics
  earningsPerShare: number | null
  ebitPerShare: number | null
  salesPerShare: number | null
  tangibleBookValuePerShare: number | null
  
  // Liquidity Ratios
  currentRatio: number | null
  quickRatio: number | null
  cashRatio: number | null
  
  // Leverage Ratios
  totalDebtToEquity: number | null
  totalDebtToTotalAsset: number | null
  totalDebtToTotalCapital: number | null
  longtermDebtToTotalAsset: number | null
  longtermDebtToTotalCapital: number | null
  longtermDebtToTotalEquity: number | null
  netDebtToTotalCapital: number | null
  netDebtToTotalEquity: number | null
  
  // Efficiency Ratios
  returnOnAssets: number | null
  returnOnEquity: number | null
  returnOnInvestedCapital: number | null
  returnOnTotalCapital: number | null
  inventoryTurnover: number | null
  receivablesTurnover: number | null
  
  // Valuation Metrics
  enterpriseValue: number | null
  evToEbitda: number | null
  evToRevenue: number | null
  
  // Other Metrics
  payoutRatio: number | null
  bookValuePerShare: number | null
  sgaToSale: number | null
  totalRatio: number | null
}

export interface ApiError {
  message: string
  status?: number
}

/**
 * Fetches current quote data for a stock symbol
 */
export async function fetchQuote(symbol: string): Promise<Quote> {
  try {
    const response = await fetch(`${API_BASE_URL}/quote/${symbol}`)
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Symbol "${symbol}" not found`)
      }
      throw new Error(`Failed to fetch quote: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Network error while fetching quote')
  }
}

/**
 * Fetches fundamental financial data for a stock symbol
 */
export async function fetchFundamentals(symbol: string): Promise<Fundamentals> {
  try {
    const response = await fetch(`${API_BASE_URL}/fundamentals/${symbol}`)
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Symbol "${symbol}" not found`)
      }
      throw new Error(`Failed to fetch fundamentals: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Network error while fetching fundamentals')
  }
}

/**
 * Fetches both quote and fundamentals data for a stock symbol
 */
export async function fetchCompanyData(symbol: string): Promise<{ quote: Quote; fundamentals: Fundamentals }> {
  try {
    const [quote, fundamentals] = await Promise.all([
      fetchQuote(symbol),
      fetchFundamentals(symbol)
    ])
    
    return { quote, fundamentals }
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Network error while fetching company data')
  }
}
