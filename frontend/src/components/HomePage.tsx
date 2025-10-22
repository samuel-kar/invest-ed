import Card from './calculators/shared/Card'
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

          {/* Main Content Section */}
          <div className="max-w-6xl mx-auto">
            <Card
              className="shadow-md p-8"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              <h2
                className="text-3xl font-bold mb-6 text-center"
                style={{ color: 'var(--text-primary)' }}
              >
                Investment + Education = Financial Freedom
              </h2>
              <div className="max-w-4xl mx-auto">
                <p
                  className="text-lg leading-relaxed mb-6"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Welcome to InvestEd, where true financial freedom comes from
                  the perfect combination of <strong>Investment</strong>{' '}
                  knowledge and <strong>Education</strong>. This platform is
                  designed to give you the educational foundation you need to
                  make informed investment decisions that build lasting wealth.
                </p>
                <p
                  className="text-lg leading-relaxed mb-6"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Whether you're pursuing dividend income for steady cash flow
                  or growth investing for long-term wealth building, education
                  is your most powerful tool. Here you'll find comprehensive
                  learning resources and analysis tools to help you understand
                  market dynamics, evaluate investment opportunities, and create
                  a strategy that aligns with your financial goals.
                </p>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  From basic investment concepts to advanced analysis
                  techniques, this platform guides your journey toward financial
                  independence. When you combine knowledge with action, you
                  don't just invest—you build the foundation for lasting
                  financial freedom.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
