import { createFileRoute, Link } from '@tanstack/react-router'
import { BookOpen, PiggyBank, Search, Building2 } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to InvestEd
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Your comprehensive platform for dividend and growth investing
            analysis
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <Link to="/learn" className="block">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-emerald-600 mb-4">
                  <BookOpen size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Learn
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Master investing concepts with our educational content
                </p>
              </div>
            </Link>

            <Link to="/savings" className="block">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-emerald-600 mb-4">
                  <PiggyBank size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Save Goals
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Plan and track your savings goals with powerful calculators
                </p>
              </div>
            </Link>

            <Link to="/calculators" className="block">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-emerald-600 mb-4">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Analysis
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Use powerful tools to analyze investments and plan your future
                </p>
              </div>
            </Link>

            <Link to="/companies" className="block">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-emerald-600 mb-4">
                  <Building2 size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Companies
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Explore detailed analysis of dividend and growth stocks
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
