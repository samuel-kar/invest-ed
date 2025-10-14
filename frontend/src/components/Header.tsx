import { Link } from '@tanstack/react-router'
import { useState } from 'react'
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
    setIsDarkMode(!isDarkMode)
    // TODO: Implement actual theme switching logic
  }

  return (
    <>
      <header
        className={`p-4 flex items-center justify-between shadow-lg ${
          isDarkMode
            ? 'bg-gray-800 text-white'
            : 'bg-white text-gray-900 border-b border-gray-200'
        }`}
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
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            />
            <input
              type="text"
              placeholder="Search companies..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500'
              } focus:outline-none focus:ring-2`}
            />
          </div>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-colors ${
            isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
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
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Navigation</h2>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors mb-2',
            }}
          >
            <Home size={20} />
            <span className="font-medium">Home</span>
          </Link>

          <Link
            to="/learn"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors mb-2',
            }}
          >
            <BookOpen size={20} />
            <span className="font-medium">Learn</span>
          </Link>

          <Link
            to="/calculators"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors mb-2',
            }}
          >
            <Calculator size={20} />
            <span className="font-medium">Calculators</span>
          </Link>

          <Link
            to="/companies"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors mb-2',
            }}
          >
            <Building2 size={20} />
            <span className="font-medium">Companies</span>
          </Link>

          <Link
            to="/savings"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors mb-2',
            }}
          >
            <PiggyBank size={20} />
            <span className="font-medium">Savings</span>
          </Link>

          <Link
            to="/settings"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors mb-2',
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
