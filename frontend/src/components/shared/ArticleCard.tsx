import Card from './Card'

interface ArticleCardProps {
  title: string
  description: string
  comingSoon?: boolean
  onClick?: () => void
}

export default function ArticleCard({
  title,
  description,
  comingSoon = false,
  onClick,
}: ArticleCardProps) {
  return (
    <Card
      className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
        comingSoon ? 'opacity-75' : ''
      }`}
      style={{ backgroundColor: 'var(--bg-secondary)' }}
      onClick={comingSoon ? undefined : onClick}
    >
      <div className="relative">
        <h3
          className="text-xl font-semibold mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {description}
        </p>
        {comingSoon && (
          <div
            className="absolute top-0 right-0 bg-emerald-600 text-white text-xs px-2 py-1 rounded-bl-lg"
            style={{ backgroundColor: 'var(--accent-color)' }}
          >
            Coming Soon
          </div>
        )}
      </div>
    </Card>
  )
}
