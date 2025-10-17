import { createFileRoute } from '@tanstack/react-router'
import CalculatorsOverview from '../../components/calculators/CalculatorsOverview.tsx'

export const Route = createFileRoute('/calculators/')({
  component: CalculatorsOverviewPage,
})

function CalculatorsOverviewPage() {
  return <CalculatorsOverview />
}
