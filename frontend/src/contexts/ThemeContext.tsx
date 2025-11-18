import React, { createContext, useContext, useState, useEffect } from 'react'

export type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  isDarkMode: boolean
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark')

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as Theme
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches

    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    setThemeState(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDarkMode: theme === 'dark',
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
