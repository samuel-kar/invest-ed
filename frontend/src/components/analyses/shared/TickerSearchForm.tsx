import { Loader2, Search } from 'lucide-react'
import AutocompleteTickerInput from '../../shared/AutocompleteTickerInput'

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
  placeholder = 'Enter stock symbol or company name',
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
      <div className="flex-1">
        <AutocompleteTickerInput
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || isLoading}
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
