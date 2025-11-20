/**
 * Ticker data types and lazy-loading utilities.
 * Tickers are loaded lazily to minimize initial bundle size.
 */

export interface TickerEntry {
  symbol: string
  name: string
}

let tickersCache: TickerEntry[] | null = null
let loadingPromise: Promise<TickerEntry[]> | null = null

/**
 * Lazy-loads ticker data from JSON file.
 * Uses caching to ensure data is only loaded once.
 *
 * @returns Promise resolving to array of ticker entries
 */
export async function loadTickers(): Promise<TickerEntry[]> {
  // Return cached data if already loaded
  if (tickersCache !== null) {
    return tickersCache
  }

  // Return existing promise if already loading
  if (loadingPromise !== null) {
    return loadingPromise
  }

  // Start loading
  loadingPromise = (async () => {
    try {
      const module = await import('./tickers.json')
      tickersCache = module.default as TickerEntry[]
      return tickersCache
    } catch (error) {
      console.error('Failed to load ticker data:', error)
      tickersCache = [] // Return empty array on error
      return tickersCache
    } finally {
      loadingPromise = null // Clear loading promise
    }
  })()

  return loadingPromise
}

/**
 * Gets cached tickers if available, otherwise returns empty array.
 * Use this for synchronous access when you know data is already loaded.
 *
 * @returns Array of ticker entries (may be empty if not loaded yet)
 */
export function getCachedTickers(): TickerEntry[] {
  return tickersCache ?? []
}

/**
 * Looks up a company name by ticker symbol.
 * Uses cached ticker data for synchronous lookup.
 *
 * @param symbol - Ticker symbol to lookup (case-insensitive)
 * @returns Company name if found, null otherwise
 */
export function getCompanyName(symbol: string): string | null {
  if (!symbol) return null
  const tickers = getCachedTickers()
  const entry = tickers.find(
    (t) => t.symbol.toUpperCase() === symbol.toUpperCase(),
  )
  return entry?.name ?? null
}
