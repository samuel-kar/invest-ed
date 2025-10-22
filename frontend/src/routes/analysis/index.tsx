import { createFileRoute } from '@tanstack/react-router'
import AnalysesOverview from '../../components/analyses/AnalysesOverview'

export const Route = createFileRoute('/analysis/')({
  component: AnalysesOverviewPage,
})

function AnalysesOverviewPage() {
  return <AnalysesOverview />
}
