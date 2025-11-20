import { useState, useEffect, useRef, useMemo } from 'react'
import { Search, Loader2, X } from 'lucide-react'
import { loadTickers, type TickerEntry } from '../../data/tickers'

interface AutocompleteTickerInputProps {
  value: string
  onChange: (value: string) => void
  onSelect?: (ticker: TickerEntry) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  minQueryLength?: number
  debounceMs?: number
}

export default function AutocompleteTickerInput({
  value,
  onChange,
  onSelect,
  placeholder = 'Enter stock symbol or company name',
  className = '',
  disabled = false,
  minQueryLength = 2,
  debounceMs = 300,
}: AutocompleteTickerInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [tickers, setTickers] = useState<TickerEntry[]>([])
  const [isLoadingTickers, setIsLoadingTickers] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Lazy-load tickers on component mount
  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      setIsLoadingTickers(true)
      try {
        const loadedTickers = await loadTickers()
        if (isMounted) {
          setTickers(loadedTickers)
        }
      } catch (error) {
        console.error('Failed to load tickers:', error)
        if (isMounted) {
          setTickers([])
        }
      } finally {
        if (isMounted) {
          setIsLoadingTickers(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])

  // Debounce the query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(value.trim())
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [value, debounceMs])

  // Filter suggestions locally
  const suggestions = useMemo(() => {
    if (debouncedQuery.length < minQueryLength || tickers.length === 0) {
      return []
    }

    const upperQuery = debouncedQuery.toUpperCase()
    const exactMatches: TickerEntry[] = []
    const partialMatches: TickerEntry[] = []

    for (const ticker of tickers) {
      const symbol = ticker.symbol?.toUpperCase() ?? ''
      const name = ticker.name?.toUpperCase() ?? ''

      // Exact symbol match (highest priority)
      if (symbol === upperQuery) {
        exactMatches.push(ticker)
      }
      // Symbol starts with query
      else if (symbol.startsWith(upperQuery)) {
        partialMatches.push(ticker)
      }
      // Name contains query
      else if (name.includes(upperQuery)) {
        partialMatches.push(ticker)
      }
      // Symbol contains query (lower priority)
      else if (symbol.includes(upperQuery)) {
        partialMatches.push(ticker)
      }
    }

    // Combine: exact matches first, then partial matches
    const results = [...exactMatches, ...partialMatches]

    // Limit to 50 results
    return results.slice(0, 50)
  }, [debouncedQuery, minQueryLength, tickers])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toUpperCase()
    onChange(newValue)
    setShowSuggestions(true)
  }

  const handleSelect = (ticker: TickerEntry) => {
    onChange(ticker.symbol)
    setShowSuggestions(false)
    if (onSelect) {
      onSelect(ticker)
    }
    inputRef.current?.blur()
  }

  const handleClear = () => {
    onChange('')
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  const handleFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  const displaySuggestions =
    showSuggestions &&
    debouncedQuery.length >= minQueryLength &&
    suggestions.length > 0 &&
    !isLoadingTickers

  const isLoading = isLoadingTickers && tickers.length === 0

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600"
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full pl-10 pr-10 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
          }}
          autoComplete="off"
          spellCheck="false"
          data-lpignore="true"
        />
        {value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear input"
          >
            <X size={16} />
          </button>
        )}
        {isLoading && (
          <div className="absolute right-10 top-1/2 -translate-y-1/2">
            <Loader2 size={16} className="animate-spin text-emerald-600" />
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {displaySuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderColor: 'var(--border-color)',
          }}
        >
          {suggestions.map((ticker) => (
            <button
              key={ticker.symbol}
              type="button"
              onClick={() => handleSelect(ticker)}
              className="w-full text-left px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors border-b last:border-b-0"
              style={{
                borderColor: 'var(--border-color)',
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div
                    className="font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {ticker.symbol}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {ticker.name}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
