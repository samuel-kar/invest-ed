import { Link } from '@tanstack/react-router'
import React, { useState } from 'react'
import {
  Home,
  Menu,
  X,
  BookOpen,
  Calculator,
  Building2,
  PiggyBank,
  Settings,
  Search,
  Sun,
  Moon,
} from 'lucide-react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
  React.useEffect(() => {
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
    <>
      <header
        className="fixed top-0 left-0 right-0 z-30 p-4 flex items-center justify-between shadow-lg glass-header"
        style={{
          color: 'var(--text-primary)',
        }}
      >
        {/* Mobile menu button - only visible on mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            InvestEd
          </Link>
        </div>

        {/* Search bar - centered */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              style={{ color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              placeholder="Search companies..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-colors hover:opacity-80"
          style={{ backgroundColor: 'var(--bg-tertiary)' }}
          aria-label={
            isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
          }
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          backgroundColor: 'var(--sidebar-bg)',
          color: 'var(--sidebar-text)',
        }}
      >
        <div
          className="flex items-center justify-between p-4 border-b"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <h2 className="text-xl font-bold">Navigation</h2>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-lg transition-colors hover:opacity-80"
            style={{ backgroundColor: 'var(--sidebar-hover)' }}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg transition-colors mb-2 hover:opacity-80"
            style={{ backgroundColor: 'var(--sidebar-hover)' }}
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg transition-colors mb-2',
              style: { backgroundColor: 'var(--accent-color)' },
            }}
          >
            <Home size={20} />
            <span className="font-medium">Home</span>
          </Link>

          <Link
            to="/learn"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg transition-colors mb-2 hover:opacity-80"
            style={{ backgroundColor: 'var(--sidebar-hover)' }}
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg transition-colors mb-2',
              style: { backgroundColor: 'var(--accent-color)' },
            }}
          >
            <BookOpen size={20} />
            <span className="font-medium">Learn</span>
          </Link>

          <Link
            to="/calculators"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg transition-colors mb-2 hover:opacity-80"
            style={{ backgroundColor: 'var(--sidebar-hover)' }}
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg transition-colors mb-2',
              style: { backgroundColor: 'var(--accent-color)' },
            }}
          >
            <Calculator size={20} />
            <span className="font-medium">Calculators</span>
          </Link>

          <Link
            to="/companies"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg transition-colors mb-2 hover:opacity-80"
            style={{ backgroundColor: 'var(--sidebar-hover)' }}
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg transition-colors mb-2',
              style: { backgroundColor: 'var(--accent-color)' },
            }}
          >
            <Building2 size={20} />
            <span className="font-medium">Companies</span>
          </Link>

          <Link
            to="/savings"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg transition-colors mb-2 hover:opacity-80"
            style={{ backgroundColor: 'var(--sidebar-hover)' }}
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg transition-colors mb-2',
              style: { backgroundColor: 'var(--accent-color)' },
            }}
          >
            <PiggyBank size={20} />
            <span className="font-medium">Savings</span>
          </Link>

          <Link
            to="/settings"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg transition-colors mb-2 hover:opacity-80"
            style={{ backgroundColor: 'var(--sidebar-hover)' }}
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg transition-colors mb-2',
              style: { backgroundColor: 'var(--accent-color)' },
            }}
          >
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </Link>
        </nav>
      </aside>
    </>
  )
}
