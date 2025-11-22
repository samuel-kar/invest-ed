import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useCurrency, type Currency } from '../contexts/CurrencyContext'
import { useTranslation } from 'react-i18next'
import Card from './shared/Card'

export default function SettingsPage() {
  const { isDarkMode, toggleTheme } = useTheme()
  const { currency, setCurrency } = useCurrency()
  const { i18n, t } = useTranslation()

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
          {t('settings.title')}
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
                  {t('settings.theme')}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {t('settings.themeDescription', {
                    mode: isDarkMode ? t('settings.dark') : t('settings.light'),
                  })}
                </p>
              </div>

              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:opacity-80"
                style={{
                  backgroundColor: isDarkMode
                    ? 'var(--bg-secondary)'
                    : 'var(--bg-tertiary)',
                }}
                aria-label={
                  isDarkMode
                    ? t('settings.switchToLight')
                    : t('settings.switchToDark')
                }
              >
                {isDarkMode ? (
                  <>
                    <Sun size={20} />
                    <span
                      className="text-sm font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {t('settings.light')}
                    </span>
                  </>
                ) : (
                  <>
                    <Moon size={20} />
                    <span
                      className="text-sm font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {t('settings.dark')}
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
                  {t('settings.currency')}
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
                  backgroundColor: isDarkMode
                    ? 'var(--bg-secondary)'
                    : 'var(--bg-tertiary)',
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

          {/* Language Settings */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3
                  className="text-lg font-medium mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {t('settings.language')}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {t('settings.languageDescription', {
                    name:
                      i18n.language === 'sv'
                        ? t('settings.swedish')
                        : t('settings.english'),
                  })}
                </p>
              </div>
              <select
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="p-2 rounded-lg"
                style={{
                  backgroundColor: isDarkMode
                    ? 'var(--bg-secondary)'
                    : 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <option value="en">{t('settings.english')}</option>
                <option value="sv">{t('settings.swedish')}</option>
              </select>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
