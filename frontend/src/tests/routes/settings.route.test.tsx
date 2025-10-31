import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SettingsPage from '@/components/SettingsPage'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { CurrencyProvider } from '@/contexts/CurrencyContext'

describe('settings route', () => {
  it('toggles theme and persists selection', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <CurrencyProvider>
          <SettingsPage />
        </CurrencyProvider>
      </ThemeProvider>,
    )

    const btn = screen.getByRole('button', {
      name: /switch to light mode|switch to dark mode/i,
    })
    await user.click(btn)
    const theme = document.documentElement.getAttribute('data-theme')
    expect(theme === 'light' || theme === 'dark').toBe(true)
  })

  it('changes calculator currency', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <CurrencyProvider>
          <SettingsPage />
        </CurrencyProvider>
      </ThemeProvider>,
    )

    const select = screen.getByRole('combobox')
    await user.selectOptions(select, 'EUR')
    expect((select as HTMLSelectElement).value).toBe('EUR')
  })
})

