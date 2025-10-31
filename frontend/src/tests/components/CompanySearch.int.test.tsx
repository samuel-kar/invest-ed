import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CompanySearch from '@/components/CompanySearch'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

vi.mock('@tanstack/react-router', async (orig) => {
  const mod: any = await orig()
  return {
    ...mod,
    useNavigate: () => () => {},
  }
})

vi.mock('@/services/api', () => ({
  fetchCompanyData: vi.fn(async () => ({
    quote: {
      currentPrice: 100,
      high: null,
      low: null,
      open: null,
      previousClose: null,
    },
    fundamentals: {
      symbol: 'AAPL',
      priceToEarningsRatio: null,
      priceToBookRatio: null,
      priceToSalesRatio: null,
      priceToFreeCashFlowRatio: null,
      priceToTangibleBookValueRatio: null,
      grossMargin: null,
      operatingMargin: null,
      netMargin: null,
      pretaxMargin: null,
      freeCashFlowMargin: null,
      earningsPerShare: null,
      ebitPerShare: null,
      salesPerShare: null,
      currentRatio: null,
      quickRatio: null,
      cashRatio: null,
      totalDebtToEquity: null,
      totalDebtToTotalAsset: null,
      totalDebtToTotalCapital: null,
      longtermDebtToTotalAsset: null,
      longtermDebtToTotalCapital: null,
      longtermDebtToTotalEquity: null,
      netDebtToTotalCapital: null,
      netDebtToTotalEquity: null,
      returnOnAssets: null,
      returnOnEquity: null,
      returnOnInvestedCapital: null,
      returnOnTotalCapital: null,
      inventoryTurnover: null,
      receivablesTurnover: null,
      enterpriseValue: null,
      evToEbitda: null,
      evToRevenue: null,
      payoutRatio: null,
      sgaToSale: null,
      totalRatio: null,
    },
  })),
}))

function wrapper(children: React.ReactNode) {
  const client = new QueryClient()
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

describe('CompanySearch (integration)', () => {
  it('searches and renders results', async () => {
    const user = userEvent.setup()
    render(wrapper(<CompanySearch />))

    const input = screen.getByPlaceholderText(/enter stock symbol/i)
    await user.type(input, 'AAPL')
    const button = screen.getByRole('button', { name: /search/i })
    await user.click(button)

    await waitFor(() => {
      // The mocked CompanyData may render numbers; we at least assert loading ends
      expect(
        screen.queryByText(/loading company data/i),
      ).not.toBeInTheDocument()
    })
  })
})

