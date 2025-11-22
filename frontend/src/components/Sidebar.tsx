import { Link } from '@tanstack/react-router'
import {
  Home,
  BookOpen,
  Search,
  Building2,
  Calculator,
  Settings,
  Bookmark,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Sidebar() {
  const { t } = useTranslation()
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
          <span className="font-medium">{t('navigation.home')}</span>
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
          <span className="font-medium">{t('navigation.learn')}</span>
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
          <span className="font-medium">{t('navigation.calculators')}</span>
        </Link>

        <Link
          to="/analysis"
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition-opacity duration-200 hover:opacity-80"
          style={{ backgroundColor: 'var(--sidebar-hover)' }}
          activeProps={{
            className:
              'flex items-center gap-3 px-3 py-2 rounded-lg transition-opacity duration-200',
            style: { backgroundColor: 'var(--accent-color)' },
          }}
        >
          <Search size={20} />
          <span className="font-medium">{t('navigation.analysis')}</span>
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
          <span className="font-medium">{t('navigation.companies')}</span>
        </Link>

        <Link
          to="/saved"
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition-opacity duration-200 hover:opacity-80"
          style={{ backgroundColor: 'var(--sidebar-hover)' }}
          activeProps={{
            className:
              'flex items-center gap-3 px-3 py-2 rounded-lg transition-opacity duration-200',
            style: { backgroundColor: 'var(--accent-color)' },
          }}
        >
          <Bookmark size={20} />
          <span className="font-medium">{t('navigation.saved')}</span>
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
          <span className="font-medium">{t('navigation.settings')}</span>
        </Link>
      </nav>
    </aside>
  )
}
