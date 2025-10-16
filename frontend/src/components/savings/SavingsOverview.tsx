export default function SavingsOverview() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="p-6">
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Savings & Investment Calculators
        </h2>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
          Choose from our comprehensive suite of financial calculators to help
          you plan and optimize your savings strategy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              📈 Compound Interest Calculator
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: 'var(--text-secondary)' }}
            >
              Calculate how your investments will grow over time with compound
              interest and regular monthly contributions. Perfect for long-term
              investment planning.
            </p>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              <strong>Best for:</strong> Long-term investments, retirement
              planning, understanding compound growth
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              🎯 Savings Goal Calculator
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: 'var(--text-secondary)' }}
            >
              Determine how long it will take to reach your financial goals with
              regular monthly contributions. Set realistic timelines for your
              objectives.
            </p>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              <strong>Best for:</strong> Short-term goals, vacation planning,
              emergency fund building
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              🏖️ Retirement (4% Rule)
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: 'var(--text-secondary)' }}
            >
              Estimate your retirement savings and monthly income using the
              proven 4% withdrawal rule. Plan for a financially secure
              retirement.
            </p>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              <strong>Best for:</strong> Retirement planning, FIRE movement,
              traditional retirement strategies
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              💰 Retirement (Dividend)
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: 'var(--text-secondary)' }}
            >
              Calculate the portfolio size needed for dividend income
              retirement. Focus on dividend-paying stocks for passive income.
            </p>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              <strong>Best for:</strong> Dividend investing, passive income
              strategies, income-focused retirement
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4
            className="font-semibold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            💡 Pro Tip
          </h4>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Start with the <strong>Compound Interest Calculator</strong> to
            understand the power of long-term investing, then use the{' '}
            <strong>Savings Goal Calculator</strong> to set specific targets.
            For retirement planning, compare both the 4% rule and dividend
            strategies to find what works best for your situation.
          </p>
        </div>
      </div>
    </div>
  )
}
