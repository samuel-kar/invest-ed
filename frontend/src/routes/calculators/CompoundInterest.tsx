import { createFileRoute } from '@tanstack/react-router'
import CompoundInterestContainer from '../../components/calculators/calculators/CompoundInterestContainer'

export const Route = createFileRoute('/calculators/CompoundInterest')({
  component: CompoundInterestPage,
})

function CompoundInterestPage() {
  return <CompoundInterestContainer />
}
