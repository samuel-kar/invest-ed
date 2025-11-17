// TODO: This analysis-specific search form could be refactored into a truly shared component with CompanySearch in the future.
import { Loader2, Search } from 'lucide-react'

interface AnalysisTickerSearchFormProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  placeholder?: string
  buttonLabel?: string
  loadingLabel?: string
  isLoading?: boolean
  disabled?: boolean
  className?: string
}

export default function AnalysisTickerSearchForm({
  value,
  onChange,
  onSubmit,
  placeholder = 'Enter stock symbol',
  buttonLabel = 'Search',
  loadingLabel = 'Loading...',
  isLoading = false,
  disabled = false,
  className = '',
}: AnalysisTickerSearchFormProps) {
  const isButtonDisabled = disabled || isLoading || !value.trim()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (isButtonDisabled) return
    onSubmit()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-3 sm:flex-row ${className}`}
    >
      <div className="flex-1 relative">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600"
        />
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
          }}
          autoComplete="off"
          spellCheck="false"
          data-lpignore="true"
        />
      </div>
      <button
        type="submit"
        disabled={isButtonDisabled}
        className="w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            {loadingLabel}
          </>
        ) : (
          <>
            <Search size={16} />
            {buttonLabel}
          </>
        )}
      </button>
    </form>
  )
}
