import { Link } from '@tanstack/react-router'
import {
  Home,
  BookOpen,
  Search,
  Building2,
  Calculator,
  Settings,
} from 'lucide-react'

export default function Sidebar() {
  return (
    <aside
      className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:top-16 lg:bottom-0 lg:left-0 lg:pb-6"
      style={{
        backgroundColor: 'var(--sidebar-bg)',
        color: 'var(--sidebar-text)',
      }}
    >
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition-opacity duration-200 hover:opacity-80"
          style={{ backgroundColor: 'var(--sidebar-hover)' }}
          activeProps={{
            className:
              'flex items-center gap-3 px-3 py-2 rounded-lg transition-opacity duration-200',
            style: { backgroundColor: 'var(--accent-color)' },
          }}
        >
          <Home size={20} />
          <span className="font-medium">Home</span>
        </Link>

        <Link
          to="/learn"
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition-opacity duration-200 hover:opacity-80"
          style={{ backgroundColor: 'var(--sidebar-hover)' }}
          activeProps={{
            className:
              'flex items-center gap-3 px-3 py-2 rounded-lg transition-opacity duration-200',
            style: { backgroundColor: 'var(--accent-color)' },
          }}
        >
          <BookOpen size={20} />
          <span className="font-medium">Learn</span>
        </Link>

        <Link
          to="/calculators"
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition-opacity duration-200 hover:opacity-80"
          style={{ backgroundColor: 'var(--sidebar-hover)' }}
          activeProps={{
            className:
              'flex items-center gap-3 px-3 py-2 rounded-lg transition-opacity duration-200',
            style: { backgroundColor: 'var(--accent-color)' },
          }}
        >
          <Calculator size={20} />
          <span className="font-medium">Calculators</span>
        </Link>

        <Link
          to="/analysis"
          search={{ symbol: '' }}
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition-opacity duration-200 hover:opacity-80"
          style={{ backgroundColor: 'var(--sidebar-hover)' }}
          activeProps={{
            className:
              'flex items-center gap-3 px-3 py-2 rounded-lg transition-opacity duration-200',
            style: { backgroundColor: 'var(--accent-color)' },
          }}
        >
          <Search size={20} />
          <span className="font-medium">Analysis</span>
        </Link>

        <Link
          to="/companies"
          search={{ symbol: '' }}
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition-opacity duration-200 hover:opacity-80"
          style={{ backgroundColor: 'var(--sidebar-hover)' }}
          activeProps={{
            className:
              'flex items-center gap-3 px-3 py-2 rounded-lg transition-opacity duration-200',
            style: { backgroundColor: 'var(--accent-color)' },
          }}
        >
          <Building2 size={20} />
          <span className="font-medium">Companies</span>
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition-opacity duration-200 hover:opacity-80"
          style={{ backgroundColor: 'var(--sidebar-hover)' }}
          activeProps={{
            className:
              'flex items-center gap-3 px-3 py-2 rounded-lg transition-opacity duration-200',
            style: { backgroundColor: 'var(--accent-color)' },
          }}
        >
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </Link>
      </nav>
    </aside>
  )
}
