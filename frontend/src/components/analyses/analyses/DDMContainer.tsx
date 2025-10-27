import Card from '../../shared/Card'

interface DDMContainerProps {
  symbol: string
}

export default function DDMContainer({ symbol }: DDMContainerProps) {
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
          {symbol && (
            <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
              (Selected symbol: {symbol})
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}
