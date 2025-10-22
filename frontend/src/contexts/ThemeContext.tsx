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

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (!prefersReducedMotion) {
      // Add theme transition class temporarily
      document.documentElement.classList.add('theme-transition')
    }

    setTheme(newTheme)

    if (!prefersReducedMotion) {
      // Remove theme transition class after animation completes
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition')
      }, 220) // Slightly longer than the defined duration
    }
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
