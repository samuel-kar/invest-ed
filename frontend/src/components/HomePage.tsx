import { Link } from '@tanstack/react-router'
import { BookOpen, Calculator, Search, Building2 } from 'lucide-react'
import Card from './savings/shared/Card'
import QuoteCarousel from './shared/QuoteCarousel'
import { investingQuotes } from '../data/quotes'

export default function HomePage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-emerald-600">Invest</span>
            <span className="text-emerald-800">Ed</span>
          </h1>
          <p
            className="text-xl mb-8"
            style={{ color: 'var(--text-secondary)' }}
          >
            Your comprehensive platform for dividend and growth investing
            analysis
          </p>

          {/* Quote Carousel */}
          <div className="max-w-4xl mx-auto mb-12">
            <div
              className="rounded-lg p-6"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              <QuoteCarousel quotes={investingQuotes} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/learn" className="block">
              <Card
                className="shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <div className="text-emerald-600 mb-4">
                  <BookOpen size={48} className="mx-auto" />
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Learn
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Master investing concepts with our educational content
                </p>
              </Card>
            </Link>

            <Link to="/savings" className="block">
              <Card
                className="shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <div className="text-emerald-600 mb-4">
                  <Calculator size={48} className="mx-auto" />
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Calculators
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Plan and track your savings goals with powerful calculators
                </p>
              </Card>
            </Link>

            <Link to="/calculators" className="block">
              <Card
                className="shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <div className="text-emerald-600 mb-4">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Analysis
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Use powerful tools to analyze investments and plan your future
                </p>
              </Card>
            </Link>

            <Link to="/companies" className="block">
              <Card
                className="shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <div className="text-emerald-600 mb-4">
                  <Building2 size={48} className="mx-auto" />
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Companies
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Explore detailed analysis of dividend and growth stocks
                </p>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
