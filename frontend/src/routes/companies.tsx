import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/companies')({
  component: CompaniesPage,
})

function CompaniesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Company Analysis
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Company analysis tools coming soon...
        </p>
      </div>
    </div>
  )
}
