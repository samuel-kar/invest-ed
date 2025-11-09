import { createFileRoute } from '@tanstack/react-router'
import { SignIn } from '@clerk/clerk-react'

function SignInPage() {
  return (
    <div
      className="min-h-screen flex justify-center items-center px-4 py-8"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="w-full max-w-md">
        <SignIn
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'mx-auto',
              socialButtonsBlockButton: 'mx-auto',
              socialButtonsBlockButtonText: 'text-center',
              formButtonPrimary: 'mx-auto',
              formFieldInput: 'mx-auto',
              headerTitle: 'text-center',
              headerSubtitle: 'text-center',
            },
            layout: {
              socialButtonsPlacement: 'top',
            },
          }}
        />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/sign-in')({
  component: SignInPage,
})
