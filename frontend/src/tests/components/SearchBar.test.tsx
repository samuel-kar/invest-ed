import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from '@/components/shared/SearchBar'

describe('SearchBar', () => {
  it('renders and calls onChange', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SearchBar value="" onChange={onChange} />)

    const input = screen.getByRole('textbox')
    await user.type(input, 'ABC')
    expect(onChange).toHaveBeenCalled()
  })
})

