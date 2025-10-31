import { vi, expect, it, describe, beforeEach, afterEach } from 'vitest'
import {
  fetchQuote,
  fetchFundamentals,
  fetchCompanyData,
  saveDdmAnalysis,
} from '@/services/api'

const ok = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

describe('api service', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    vi.restoreAllMocks()
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  it('fetchQuote returns parsed json on 200', async () => {
    global.fetch = vi.fn().mockResolvedValue(ok({ currentPrice: 123 }))
    const q = await fetchQuote('AAPL')
    expect(q.currentPrice).toBe(123)
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/market/quote/AAPL'),
    )
  })

  it('fetchFundamentals throws on 404 with message', async () => {
    global.fetch = vi.fn().mockResolvedValue(new Response('', { status: 404 }))
    await expect(fetchFundamentals('NOPE')).rejects.toThrow(
      'Symbol "NOPE" not found',
    )
  })

  it('fetchCompanyData calls both endpoints', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce(ok({ currentPrice: 1 }))
      .mockResolvedValueOnce(ok({ symbol: 'AAPL' }))
    const res = await fetchCompanyData('AAPL')
    expect(res.quote.currentPrice).toBe(1)
    expect(res.fundamentals.symbol).toBe('AAPL')
  })

  it('saveDdmAnalysis sends Authorization header', async () => {
    const spy = vi.spyOn(global, 'fetch').mockResolvedValue(
      ok({
        id: 1,
        symbol: 'AAPL',
        expectedDividend: 1,
        growthRate: 5,
        discountRate: 8,
        totalDividend: null,
        currentPrice: null,
        intrinsicValue: 10,
        isUndervalued: true,
        createdAt: new Date().toISOString(),
      }),
    )

    await saveDdmAnalysis(
      {
        symbol: 'AAPL',
        expectedDividend: 1,
        growthRate: 5,
        discountRate: 8,
        intrinsicValue: 10,
        isUndervalued: true,
      },
      'token-123',
    )

    expect(spy).toHaveBeenCalled()
    const [, init] = spy.mock.calls[0]!
    // @ts-expect-error Headers in RequestInit
    const headers = new Headers(init.headers)
    expect(headers.get('Authorization')).toBe('Bearer token-123')
  })
})
