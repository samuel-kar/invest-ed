import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)

    // Apply theme to document
    document.documentElement.setAttribute(
      'data-theme',
      newTheme ? 'dark' : 'light',
    )

    // Store theme preference in localStorage
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  // Initialize theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches

    const shouldUseDark = savedTheme ? savedTheme === 'dark' : prefersDark
    setIsDarkMode(shouldUseDark)
    document.documentElement.setAttribute(
      'data-theme',
      shouldUseDark ? 'dark' : 'light',
    )
  }, [])

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
          <div
            className="p-6 rounded-lg"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Appearance
            </h2>

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
          </div>
        </div>
      </div>
    </div>
  )
}
