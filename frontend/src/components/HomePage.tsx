import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Card from './shared/Card'
import QuoteCarousel from './shared/QuoteCarousel'
import { investingQuotes } from '../data/quotes'
import { pingHealth } from '../services/api'

export default function HomePage() {
  const { t } = useTranslation()
  // Ping backend health endpoint on mount to wake it up from standby
  useEffect(() => {
    pingHealth()
  }, [])

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
            {t('home.subtitle')}
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
                {t('home.heading')}
              </h2>
              <div className="max-w-4xl mx-auto">
                <p
                  className="text-lg leading-relaxed mb-6"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {t('home.welcome1')}
                </p>
                <p
                  className="text-lg leading-relaxed mb-6"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {t('home.welcome2')}
                </p>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {t('home.welcome3')}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
