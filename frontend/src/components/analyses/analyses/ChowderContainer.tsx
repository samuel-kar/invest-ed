import Card from '../../shared/Card'

export default function ChowderContainer() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 text-center">
        <div className="space-y-4">
          <h3
            className="text-2xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Chowder Rule Tool
          </h3>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Coming Soon
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            This tool will help you screen dividend stocks using the Chowder
            Rule methodology.
          </p>
        </div>
      </Card>
    </div>
  )
}
