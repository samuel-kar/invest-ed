import { Link } from '@tanstack/react-router'
import Card from '../shared/Card'

export default function AnalysesOverview() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="p-4 md:p-6">
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Investment Analysis Tools
        </h2>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
          Advanced analysis tools to help you evaluate investment opportunities
          and make informed decisions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/analysis/ddm"
            className="block transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
          >
            <Card className="p-4 md:p-6 shadow-sm border">
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                📊 DDM Analysis
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                Dividend Discount Model analysis to evaluate stocks based on
                their dividend payments and growth potential.
              </p>
              <div
                className="text-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                <strong>Best for:</strong> Dividend stock analysis, value
                investing, long-term income evaluation
              </div>
            </Card>
          </Link>

          <Link
            to="/analysis/chowder"
            className="block transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
          >
            <Card className="p-4 md:p-6 shadow-sm border">
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                🥣 Chowder Rule
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                The Chowder Rule combines dividend yield and dividend growth
                rate to identify quality dividend stocks.
              </p>
              <div
                className="text-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                <strong>Best for:</strong> Dividend growth stocks, quality
                screening, dividend sustainability analysis
              </div>
            </Card>
          </Link>
        </div>

        <div
          className="mt-8 p-3 md:p-4 rounded-lg border"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-color)',
          }}
        >
          <h4
            className="font-semibold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            💡 Pro Tip
          </h4>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Use the <strong>DDM Analysis</strong> to calculate fair value for
            dividend-paying stocks, then apply the <strong>Chowder Rule</strong>{' '}
            to screen for quality dividend growth companies. These tools work
            best together for comprehensive dividend stock evaluation.
          </p>
        </div>
      </div>
    </div>
  )
}
