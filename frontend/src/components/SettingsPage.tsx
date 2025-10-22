import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useCurrency, type Currency } from '../contexts/CurrencyContext'
import Card from './shared/Card'

export default function SettingsPage() {
  const { isDarkMode, toggleTheme } = useTheme()
  const { currency, setCurrency } = useCurrency()

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Settings
        </h1>

        <div className="space-y-6">
          {/* Appearance Settings */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3
                  className="text-lg font-medium mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Theme
                </h3>
                <p
                  className="text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {isDarkMode ? 'Dark mode' : 'Light mode'}
                </p>
              </div>

              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:opacity-80"
                style={{ backgroundColor: 'var(--bg-tertiary)' }}
                aria-label={
                  isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
                }
              >
                {isDarkMode ? (
                  <>
                    <Sun size={20} />
                    <span
                      className="text-sm font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Light
                    </span>
                  </>
                ) : (
                  <>
                    <Moon size={20} />
                    <span
                      className="text-sm font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Dark
                    </span>
                  </>
                )}
              </button>
            </div>
          </Card>

          {/* Currency Settings */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3
                  className="text-lg font-medium mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Calculator currency
                </h3>
                <p
                  className="text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {currency === 'USD'
                    ? 'US Dollar ($)'
                    : currency === 'EUR'
                      ? 'Euro (€)'
                      : currency === 'SEK'
                        ? 'Swedish Krona (kr)'
                        : currency === 'PLN'
                          ? 'Polish Zloty (zł)'
                          : currency === 'DKK'
                            ? 'Danish Krone (kr)'
                            : currency === 'NOK'
                              ? 'Norwegian Krone (kr)'
                              : currency === 'CNY'
                                ? 'Chinese Yuan (¥)'
                                : 'Japanese Yen (¥)'}
                </p>
              </div>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="p-2 rounded-lg"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="SEK">SEK (kr)</option>
                <option value="PLN">PLN (zł)</option>
                <option value="DKK">DKK (kr)</option>
                <option value="NOK">NOK (kr)</option>
                <option value="CNY">CNY (¥)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
