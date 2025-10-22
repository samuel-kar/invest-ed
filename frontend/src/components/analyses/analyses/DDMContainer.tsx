import Card from '../../shared/Card'

export default function DDMContainer() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 text-center">
        <div className="space-y-4">
          <h3
            className="text-2xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            DDM Analysis Tool
          </h3>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Coming Soon
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            This tool will help you analyze dividend-paying stocks using the
            Dividend Discount Model.
          </p>
        </div>
      </Card>
    </div>
  )
}
