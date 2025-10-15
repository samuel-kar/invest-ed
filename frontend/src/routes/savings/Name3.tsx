import { createFileRoute } from '@tanstack/react-router'
import SimpleComingSoon from '../../components/savings/placeholders/SimpleComingSoon'

export const Route = createFileRoute('/savings/Name3')({
  component: Name3Page,
})

function Name3Page() {
  return <SimpleComingSoon title="Name3" />
}
