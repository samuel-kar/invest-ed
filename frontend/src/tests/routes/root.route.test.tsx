import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { ThemeProvider } from '../../contexts/ThemeContext'

vi.mock('@tanstack/react-router', async (orig) => {
  const mod: any = await orig()
  return {
    ...mod,
    useNavigate: () => () => {},
    Link: ({ children, to }: any) => <a href={to}>{children}</a>,
  }
})

describe('root route smoke', () => {
  it('renders header and footer essentials', () => {
    render(
      <ThemeProvider>
        <>
          <Header />
          <Footer />
        </>
      </ThemeProvider>,
    )

    // Check header logo link specifically
    expect(screen.getByRole('link', { name: /invest/i })).toBeInTheDocument()
    // Check footer has copyright with InvestEd
    expect(screen.getByText(/InvestEd/i)).toBeInTheDocument()
  })
})
