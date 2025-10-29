import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/saved/')({
  beforeLoad: () => {
    throw redirect({
      to: '/saved/ddm',
    })
  },
})
