import { render, screen } from '@testing-library/react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/contexts/ThemeContext'

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

    expect(screen.getByText(/invest/i)).toBeInTheDocument()
  })
})

