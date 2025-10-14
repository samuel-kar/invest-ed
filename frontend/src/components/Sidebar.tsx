import { Link } from '@tanstack/react-router'
import {
  Home,
  BookOpen,
  Calculator,
  Building2,
  PiggyBank,
  Settings,
} from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:pt-20 lg:pb-6 lg:bg-gray-900 lg:text-white">
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          activeProps={{
            className:
              'flex items-center gap-3 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors',
          }}
        >
          <Home size={20} />
          <span className="font-medium">Home</span>
        </Link>

        <Link
          to="/learn"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          activeProps={{
            className:
              'flex items-center gap-3 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors',
          }}
        >
          <BookOpen size={20} />
          <span className="font-medium">Learn</span>
        </Link>

        <Link
          to="/calculators"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          activeProps={{
            className:
              'flex items-center gap-3 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors',
          }}
        >
          <Calculator size={20} />
          <span className="font-medium">Calculators</span>
        </Link>

        <Link
          to="/companies"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          activeProps={{
            className:
              'flex items-center gap-3 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors',
          }}
        >
          <Building2 size={20} />
          <span className="font-medium">Companies</span>
        </Link>

        <Link
          to="/savings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          activeProps={{
            className:
              'flex items-center gap-3 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors',
          }}
        >
          <PiggyBank size={20} />
          <span className="font-medium">Savings</span>
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          activeProps={{
            className:
              'flex items-center gap-3 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors',
          }}
        >
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </Link>
      </nav>
    </aside>
  )
}
