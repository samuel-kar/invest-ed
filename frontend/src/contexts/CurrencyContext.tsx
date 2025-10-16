import React, { createContext, useContext, useState, useEffect } from 'react'

export type Currency = 'USD' | 'EUR' | 'SEK' | 'PLN'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatCurrency: (value: number) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('USD')

  useEffect(() => {
    const saved = localStorage.getItem('currency') as Currency
    if (saved && ['USD', 'EUR', 'SEK', 'PLN'].includes(saved)) {
      setCurrencyState(saved)
    }
  }, [])

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency)
    localStorage.setItem('currency', newCurrency)
  }

  const formatCurrency = (value: number): string => {
    const formatted = value.toLocaleString()
    switch (currency) {
      case 'USD':
        return `$${formatted}`
      case 'EUR':
        return `€${formatted}`
      case 'SEK':
        return `${formatted} kr`
      case 'PLN':
        return `${formatted} zł`
      default:
        return `$${formatted}`
    }
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider')
  }
  return context
}
