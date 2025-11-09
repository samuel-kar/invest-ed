import { createFileRoute } from '@tanstack/react-router'
import { SignIn } from '@clerk/clerk-react'

function SignInPage() {
  return (
    <div
      className="min-h-screen flex justify-center items-center"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <SignIn />
    </div>
  )
}

export const Route = createFileRoute('/sign-in')({
  component: SignInPage,
})
