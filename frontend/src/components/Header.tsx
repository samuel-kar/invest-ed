import { Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Home,
  Menu,
  X,
  BookOpen,
  Search,
  Building2,
  Calculator,
  Settings,
  Sun,
  Moon,
  Bookmark,
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const { isDarkMode, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      navigate({
        to: '/companies',
        search: { symbol: searchValue.trim().toUpperCase() },
      })
      setSearchValue('')
    }
  }

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
            className="text-2xl font-bold hover:opacity-80 transition-opacity"
          >
            <span className="text-emerald-600">Invest</span>
            <span className="text-emerald-800">Ed</span>
          </Link>
        </div>

        {/* Search bar - centered */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              style={{ color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value.toUpperCase())}
              placeholder="Search companies..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-200"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </form>
        </div>
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-colors transition-opacity duration-200 hover:opacity-80"
            style={{ backgroundColor: 'var(--bg-tertiary)' }}
            aria-label={
              isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
            }
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {/* Clerk buttons */}
          <SignedOut>
            <div
              className="p-2 rounded-lg transition-colors transition-opacity duration-200 hover:opacity-80"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
            >
              <SignInButton
                mode="modal"
                appearance={{
                  elements: {
                    rootBox: 'h-full',
                    button: {
                      backgroundColor: 'transparent',
                      color: 'var(--text-primary)',
                      padding: 0,
                      border: 'none',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    },
                  },
                }}
              />
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-transparent z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-48 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col lg:hidden ${
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
            className="p-2 rounded-lg transition-colors transition-opacity duration-200 hover:opacity-80"
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
            className="flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 mb-2 hover:opacity-80"
            style={{ backgroundColor: 'var(--sidebar-hover)' }}
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 mb-2',
              style: { backgroundColor: 'var(--accent-color)' },
            }}
          >
            <Home size={20} />
            <span className="font-medium">Home</span>
          </Link>

          <Link
            to="/learn"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 mb-2 hover:opacity-80"
            style={{ backgroundColor: 'var(--sidebar-hover)' }}
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 mb-2',
              style: { backgroundColor: 'var(--accent-color)' },
            }}
          >
            <BookOpen size={20} />
            <span className="font-medium">Learn</span>
          </Link>

          <Link
            to="/calculators"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 mb-2 hover:opacity-80"
            style={{ backgroundColor: 'var(--sidebar-hover)' }}
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 mb-2',
              style: { backgroundColor: 'var(--accent-color)' },
            }}
          >
            <Calculator size={20} />
            <span className="font-medium">Calculators</span>
          </Link>

          <Link
            to="/analysis"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 mb-2 hover:opacity-80"
            style={{ backgroundColor: 'var(--sidebar-hover)' }}
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 mb-2',
              style: { backgroundColor: 'var(--accent-color)' },
            }}
          >
            <Search size={20} />
            <span className="font-medium">Analysis</span>
          </Link>

          <Link
            to="/companies"
            search={{ symbol: '' }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 mb-2 hover:opacity-80"
            style={{ backgroundColor: 'var(--sidebar-hover)' }}
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 mb-2',
              style: { backgroundColor: 'var(--accent-color)' },
            }}
          >
            <Building2 size={20} />
            <span className="font-medium">Companies</span>
          </Link>

          <Link
            to="/saved"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 mb-2 hover:opacity-80"
            style={{ backgroundColor: 'var(--sidebar-hover)' }}
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 mb-2',
              style: { backgroundColor: 'var(--accent-color)' },
            }}
          >
            <Bookmark size={20} />
            <span className="font-medium">Saved</span>
          </Link>

          <Link
            to="/settings"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 mb-2 hover:opacity-80"
            style={{ backgroundColor: 'var(--sidebar-hover)' }}
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 mb-2',
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
