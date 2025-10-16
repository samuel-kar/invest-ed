import { createFileRoute } from '@tanstack/react-router'
import SavingsOverview from '../../components/savings/SavingsOverview'

export const Route = createFileRoute('/savings/')({
  component: SavingsOverviewPage,
})

function SavingsOverviewPage() {
  return <SavingsOverview />
}
