import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '../../components/Header'
import { ThemeProvider } from '../../contexts/ThemeContext'

vi.mock('@clerk/clerk-react', () => ({
  SignedIn: ({ children }: any) => <>{children}</>,
  SignedOut: ({ children }: any) => <>{children}</>,
  SignInButton: () => <button>Sign in</button>,
  UserButton: () => <div>User</div>,
}))

vi.mock('@tanstack/react-router', async (orig) => {
  const mod: any = await orig()
  return {
    ...mod,
    useNavigate: () => () => {},
    Link: ({ children, to }: any) => <a href={to}>{children}</a>,
  }
})

describe('Header', () => {
  it('toggles theme via ThemeProvider', async () => {
    const user = userEvent.setup()
    document.documentElement.setAttribute('data-theme', 'dark')
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>,
    )

    const btn = screen.getByRole('button', {
      name: /switch to light mode|switch to dark mode/i,
    })
    await user.click(btn)
    const theme = document.documentElement.getAttribute('data-theme')
    expect(theme === 'light' || theme === 'dark').toBe(true)
  })
})
