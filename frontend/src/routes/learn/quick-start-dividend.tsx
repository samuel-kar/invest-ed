import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import BackButton from '../../components/BackButton'
import Card from '../../components/shared/Card'

export const Route = createFileRoute('/learn/quick-start-dividend')({
  component: QuickStartDividendPage,
})

function QuickStartDividendPage() {
  const { t } = useTranslation()

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton to="/learn" label={t('learn.backToLearn')} />

        <h1
          className="text-3xl md:text-4xl font-bold mb-6 mt-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('learn.guides.dividendAnalysis.title')}
        </h1>

        <p
          className="text-lg mb-8"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('learn.guides.dividendAnalysis.description')}
        </p>

        <div className="space-y-6">
          {/* Step 1 */}
          <Card className="p-6">
            <h2
              className="text-xl font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              1. {t('learn.guides.dividendAnalysis.step1.title')}
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('learn.guides.dividendAnalysis.step1.content')}
            </p>
          </Card>

          {/* Step 2 */}
          <Card className="p-6">
            <h2
              className="text-xl font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              2. {t('learn.guides.dividendAnalysis.step2.title')}
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('learn.guides.dividendAnalysis.step2.content')}
            </p>
          </Card>

          {/* Step 3 */}
          <Card className="p-6">
            <h2
              className="text-xl font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              3. {t('learn.guides.dividendAnalysis.step3.title')}
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('learn.guides.dividendAnalysis.step3.content')}
            </p>
          </Card>

          {/* Step 4 */}
          <Card className="p-6">
            <h2
              className="text-xl font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              4. {t('learn.guides.dividendAnalysis.step4.title')}
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('learn.guides.dividendAnalysis.step4.content')}
            </p>
          </Card>

          {/* Step 5 */}
          <Card className="p-6">
            <h2
              className="text-xl font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              5. {t('learn.guides.dividendAnalysis.step5.title')}
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('learn.guides.dividendAnalysis.step5.content')}
            </p>
          </Card>

          {/* Step 6 */}
          <Card className="p-6">
            <h2
              className="text-xl font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              6. {t('learn.guides.dividendAnalysis.step6.title')}
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('learn.guides.dividendAnalysis.step6.content')}
            </p>
          </Card>

          {/* Step 7 */}
          <Card className="p-6">
            <h2
              className="text-xl font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              7. {t('learn.guides.dividendAnalysis.step7.title')}
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('learn.guides.dividendAnalysis.step7.content')}
            </p>
          </Card>

          {/* Step 8 */}
          <Card className="p-6">
            <h2
              className="text-xl font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              8. {t('learn.guides.dividendAnalysis.step8.title')}
            </h2>

            {/* Regular Stocks */}
            <div className="mt-4 mb-4">
              <h3
                className="text-lg font-medium mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {t('learn.guides.dividendAnalysis.step8.regularStocks.title')}
              </h3>
              <ul
                className="list-disc list-inside space-y-1 ml-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                <li>{t('learn.guides.dividendAnalysis.step8.regularStocks.metrics.peRatio')}</li>
                <li>
                  {t(
                    'learn.guides.dividendAnalysis.step8.regularStocks.metrics.freeCashFlowToEquity',
                  )}
                </li>
                <li>
                  {t(
                    'learn.guides.dividendAnalysis.step8.regularStocks.metrics.dividendCoverageRatio',
                  )}
                </li>
              </ul>
            </div>

            {/* REITs */}
            <div className="mt-4 mb-4">
              <h3
                className="text-lg font-medium mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {t('learn.guides.dividendAnalysis.step8.reits.title')}
              </h3>
              <ul
                className="list-disc list-inside space-y-1 ml-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                <li>
                  {t(
                    'learn.guides.dividendAnalysis.step8.reits.metrics.fundsFromOperations',
                  )}
                </li>
                <li>
                  {t('learn.guides.dividendAnalysis.step8.reits.metrics.debt')}
                </li>
                <li>
                  {t(
                    'learn.guides.dividendAnalysis.step8.reits.metrics.interestCoverageRatio',
                  )}
                </li>
              </ul>
            </div>

            {/* BDCs */}
            <div className="mt-4 mb-4">
              <h3
                className="text-lg font-medium mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {t('learn.guides.dividendAnalysis.step8.bdcs.title')}
              </h3>
              <ul
                className="list-disc list-inside space-y-1 ml-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                <li>{t('learn.guides.dividendAnalysis.step8.bdcs.metrics.nav')}</li>
                <li>
                  {t(
                    'learn.guides.dividendAnalysis.step8.bdcs.metrics.netInterestIncome',
                  )}
                </li>
                <li>
                  {t(
                    'learn.guides.dividendAnalysis.step8.bdcs.metrics.weightedAveragePortfolioYield',
                  )}
                </li>
              </ul>
            </div>
          </Card>

          {/* Step 9 */}
          <Card className="p-6">
            <h2
              className="text-xl font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              9. {t('learn.guides.dividendAnalysis.step9.title')}
            </h2>
          </Card>

          {/* Step 10 */}
          <Card className="p-6">
            <h2
              className="text-xl font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              10. {t('learn.guides.dividendAnalysis.step10.title')}
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('learn.guides.dividendAnalysis.step10.content')}
            </p>
          </Card>

          {/* Step 11 */}
          <Card className="p-6">
            <h2
              className="text-xl font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              11. {t('learn.guides.dividendAnalysis.step11.title')}
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('learn.guides.dividendAnalysis.step11.content')}
            </p>
          </Card>

          {/* Step 12 */}
          <Card className="p-6">
            <h2
              className="text-xl font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              12. {t('learn.guides.dividendAnalysis.step12.title')}
            </h2>
          </Card>
        </div>
      </div>
    </div>
  )
}
