import { createFileRoute } from '@tanstack/react-router'
import ArticleCard from '../components/shared/ArticleCard'
import MetricsSection from '../components/learn/MetricsSection'
import { learningArticles } from '../data/learningArticles'

export const Route = createFileRoute('/learn')({
  component: LearnPage,
})

function LearnPage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Learn to Invest Smarter
          </h1>
          <p
            className="text-xl max-w-3xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Master the fundamentals of investing with our comprehensive guides
            and financial metrics dictionary. Build the knowledge you need to
            make informed investment decisions.
          </p>
        </div>

        {/* Featured Articles Section */}
        <div className="mb-16">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Featured Learning Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningArticles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                description={article.description}
                comingSoon={article.comingSoon}
                onClick={() => {
                  if (!article.comingSoon) {
                    // Handle navigation to article when implemented
                    console.log(`Navigate to article: ${article.id}`)
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Financial Metrics Dictionary Section */}
        <MetricsSection />
      </div>
    </div>
  )
}
