/**
 * API service for fetching market data from the backend
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

const SAVED_API_BASE_URL = `${API_BASE_URL}/saved`

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
  sgaToSale: number | null
  totalRatio: number | null
}

export interface ApiError {
  message: string
  status?: number
}

export interface ChowderResult {
  chowderScore: number | null
  dividendYield: number | null
  dividendCAGR: number | null
  yearsOfData: number
  isValid: boolean
  message: string
  currentPrice: number | null
}

export interface DdmData {
  symbol: string
  currentPrice: number | null
  totalDividend: number | null
  dividendCount: number
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
export async function fetchCompanyData(
  symbol: string,
): Promise<{ quote: Quote; fundamentals: Fundamentals }> {
  try {
    const [quote, fundamentals] = await Promise.all([
      fetchQuote(symbol),
      fetchFundamentals(symbol),
    ])

    return { quote, fundamentals }
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Network error while fetching company data')
  }
}

/**
 * Fetches Chowder Rule analysis data for a stock symbol
 */
export async function fetchChowderData(symbol: string): Promise<ChowderResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/chowder/${symbol}`)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Symbol "${symbol}" not found`)
      }
      throw new Error(`Failed to fetch Chowder analysis: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Network error while fetching Chowder analysis')
  }
}

/**
 * Fetches DDM data for a stock symbol
 */
export async function fetchDdmData(symbol: string): Promise<DdmData> {
  try {
    const response = await fetch(`${API_BASE_URL}/market/ddm/${symbol}`)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Symbol "${symbol}" not found`)
      }
      throw new Error(`Failed to fetch DDM data: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Network error while fetching DDM data')
  }
}

export interface SavedDdmAnalysis {
  id: number
  symbol: string
  expectedDividend: number
  growthRate: number
  discountRate: number
  totalDividend: number | null
  currentPrice: number | null
  intrinsicValue: number
  isUndervalued: boolean
  createdAt: string
}

export interface SaveDdmAnalysisRequest {
  symbol: string
  expectedDividend: number
  growthRate: number
  discountRate: number
  totalDividend?: number | null
  currentPrice?: number | null
  intrinsicValue: number
  isUndervalued: boolean
}

/**
 * Makes an authenticated request to the saved analyses API
 */
async function authenticatedFetch(
  url: string,
  options: RequestInit = {},
  token: string,
): Promise<Response> {
  const headers = new Headers(options.headers)
  headers.set('Authorization', `Bearer ${token}`)
  headers.set('Content-Type', 'application/json')

  return fetch(url, {
    ...options,
    headers,
  })
}

/**
 * Saves a DDM analysis
 */
export async function saveDdmAnalysis(
  data: SaveDdmAnalysisRequest,
  token: string,
): Promise<SavedDdmAnalysis> {
  try {
    const response = await authenticatedFetch(
      `${SAVED_API_BASE_URL}/ddm`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
      token,
    )

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - please sign in')
      }
      const errorText = await response.text()
      throw new Error(`Failed to save analysis: ${errorText}`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Network error while saving analysis')
  }
}

/**
 * Fetches all saved DDM analyses for the current user
 */
export async function fetchSavedDdmAnalyses(
  token: string,
): Promise<SavedDdmAnalysis[]> {
  try {
    const response = await authenticatedFetch(
      `${SAVED_API_BASE_URL}/ddm`,
      {
        method: 'GET',
      },
      token,
    )

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - please sign in')
      }
      throw new Error(`Failed to fetch saved analyses: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Network error while fetching saved analyses')
  }
}

/**
 * Updates a saved DDM analysis
 */
export async function updateSavedDdmAnalysis(
  id: number,
  data: SaveDdmAnalysisRequest,
  token: string,
): Promise<SavedDdmAnalysis> {
  try {
    const response = await authenticatedFetch(
      `${SAVED_API_BASE_URL}/ddm/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      },
      token,
    )

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - please sign in')
      }
      if (response.status === 403) {
        throw new Error('You do not have permission to update this analysis')
      }
      const errorText = await response.text()
      throw new Error(`Failed to update analysis: ${errorText}`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Network error while updating analysis')
  }
}

/**
 * Deletes a saved DDM analysis
 */
export async function deleteSavedDdmAnalysis(
  id: number,
  token: string,
): Promise<void> {
  try {
    const response = await authenticatedFetch(
      `${SAVED_API_BASE_URL}/ddm/${id}`,
      {
        method: 'DELETE',
      },
      token,
    )

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - please sign in')
      }
      if (response.status === 403) {
        throw new Error('You do not have permission to delete this analysis')
      }
      throw new Error(`Failed to delete analysis: ${response.status}`)
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Network error while deleting analysis')
  }
}
