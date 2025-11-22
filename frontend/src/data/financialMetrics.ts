export interface FinancialMetric {
  id: string
  name: string
  category: string
  formula?: string
  description: string
  interpretation?: string
  goodRange?: string
  example?: string
}

export const financialMetrics: FinancialMetric[] = [
  // Valuation Ratios
  {
    id: 'peRatio',
    name: 'Price-to-Earnings Ratio (P/E)',
    category: 'Valuation Ratios',
    formula: 'Market Price per Share / Earnings per Share',
    description:
      'Measures how much investors are willing to pay for each dollar of earnings.',
    interpretation:
      'Lower P/E may indicate undervaluation, but consider industry averages and growth prospects.',
    goodRange: 'Varies by industry, typically 15-25 for mature companies',
    example: 'If a stock trades at $50 and has EPS of $2, P/E = 25',
  },
  {
    id: 'pbRatio',
    name: 'Price-to-Book Ratio (P/B)',
    category: 'Valuation Ratios',
    formula: 'Market Price per Share / Book Value per Share',
    description:
      'Compares market value to book value, indicating if a stock is over or undervalued.',
    interpretation:
      'P/B < 1 may indicate undervaluation, but consider asset quality and industry.',
    goodRange: 'Generally 1-3, varies by industry',
    example: 'Stock at $30 with book value of $20 per share = P/B of 1.5',
  },
  {
    id: 'psRatio',
    name: 'Price-to-Sales Ratio (P/S)',
    category: 'Valuation Ratios',
    formula: 'Market Price per Share / Revenue per Share',
    description:
      'Measures how much investors pay for each dollar of company sales.',
    interpretation:
      'Lower P/S may indicate undervaluation, especially for growth companies.',
    goodRange: 'Typically 1-5, varies significantly by industry',
    example: 'Stock at $100 with $20 revenue per share = P/S of 5',
  },
  {
    id: 'evEbitda',
    name: 'Enterprise Value to EBITDA (EV/EBITDA)',
    category: 'Valuation Ratios',
    formula: 'Enterprise Value / EBITDA',
    description:
      'Measures company valuation relative to its earnings before interest, taxes, depreciation, and amortization.',
    interpretation:
      'Lower ratios may indicate better value, but consider industry norms.',
    goodRange: 'Generally 8-15, varies by industry',
    example: 'Company with EV of $1B and EBITDA of $100M = EV/EBITDA of 10',
  },
  {
    id: 'ddm',
    name: 'Dividend Discount Model (DDM)',
    category: 'Valuation Ratios',
    formula: 'Intrinsic Value = D × (1 + g) / (r - g)',
    description:
      'Calculates the intrinsic value of a stock based on expected future dividends. D is the expected next year dividend, g is the dividend growth rate, and r is the required rate of return.',
    interpretation:
      'If intrinsic value > current price, the stock may be undervalued. If intrinsic value < current price, it may be overvalued. Note: r must be greater than g.',
    goodRange: 'Compare intrinsic value to current market price',
    example:
      'Stock with $2 expected dividend, 5% growth rate, 10% required return = $2 × 1.05 / (0.10 - 0.05) = $42 intrinsic value',
  },

  // Dividend Analysis
  {
    id: 'chowderRule',
    name: 'Chowder Rule',
    category: 'Dividend Analysis',
    formula: 'Chowder Score = Dividend Yield (%) + Dividend CAGR (%)',
    description:
      'Evaluates dividend stocks by combining current dividend yield with historical dividend growth rate (5-year CAGR). Provides a single metric to assess dividend attractiveness.',
    interpretation:
      'Score ≥15 is excellent, 12-15 is good, 8-12 is fair, <8 is poor. Higher scores indicate stocks with strong dividend yields and consistent growth.',
    goodRange: 'Generally 12-15 or higher for quality dividend stocks',
    example:
      'Stock with 3% dividend yield and 10% dividend CAGR = Chowder Score of 13 (Good)',
  },

  // Profitability Margins
  {
    id: 'grossMargin',
    name: 'Gross Margin',
    category: 'Profitability Margins',
    formula: '(Revenue - Cost of Goods Sold) / Revenue × 100',
    description:
      'Shows the percentage of revenue remaining after direct costs of producing goods/services.',
    interpretation:
      'Higher margins indicate better pricing power and operational efficiency.',
    goodRange: 'Varies by industry, generally 20-60%',
    example: 'Company with $1M revenue and $600K COGS = 40% gross margin',
  },
  {
    id: 'operatingMargin',
    name: 'Operating Margin',
    category: 'Profitability Margins',
    formula: 'Operating Income / Revenue × 100',
    description:
      'Measures efficiency of core business operations before interest and taxes.',
    interpretation:
      'Higher margins indicate better operational efficiency and cost control.',
    goodRange: 'Generally 10-20%, varies by industry',
    example:
      'Company with $1M revenue and $150K operating income = 15% operating margin',
  },
  {
    id: 'netMargin',
    name: 'Net Margin',
    category: 'Profitability Margins',
    formula: 'Net Income / Revenue × 100',
    description:
      'Shows the percentage of revenue that becomes profit after all expenses.',
    interpretation:
      'Higher net margins indicate better overall profitability and efficiency.',
    goodRange: 'Generally 5-15%, varies by industry',
    example: 'Company with $1M revenue and $80K net income = 8% net margin',
  },

  // Liquidity Ratios
  {
    id: 'currentRatio',
    name: 'Current Ratio',
    category: 'Liquidity Ratios',
    formula: 'Current Assets / Current Liabilities',
    description:
      'Measures ability to pay short-term obligations with short-term assets.',
    interpretation:
      'Ratio > 1 indicates ability to cover short-term debts, but too high may indicate inefficient asset use.',
    goodRange: 'Generally 1.5-3.0',
    example:
      'Company with $500K current assets and $200K current liabilities = 2.5 current ratio',
  },
  {
    id: 'quickRatio',
    name: 'Quick Ratio',
    category: 'Liquidity Ratios',
    formula: '(Current Assets - Inventory) / Current Liabilities',
    description:
      'More conservative measure of liquidity, excluding inventory which may be hard to convert to cash.',
    interpretation:
      'Higher ratios indicate better short-term liquidity without relying on inventory sales.',
    goodRange: 'Generally 1.0-2.0',
    example:
      'Company with $400K quick assets and $200K current liabilities = 2.0 quick ratio',
  },

  // Leverage Ratios
  {
    id: 'debtToEquity',
    name: 'Debt-to-Equity Ratio',
    category: 'Leverage Ratios',
    formula: 'Total Debt / Total Equity',
    description:
      'Measures the relative proportion of debt and equity financing.',
    interpretation:
      'Higher ratios indicate more debt financing, which increases risk but can amplify returns.',
    goodRange: 'Generally 0.3-1.0, varies by industry',
    example: 'Company with $300K debt and $500K equity = 0.6 debt-to-equity',
  },
  {
    id: 'roe',
    name: 'Return on Equity (ROE)',
    category: 'Efficiency Ratios',
    formula: "Net Income / Shareholders' Equity × 100",
    description:
      "Measures how effectively a company uses shareholders' equity to generate profits.",
    interpretation:
      'Higher ROE indicates more efficient use of shareholder capital.',
    goodRange: 'Generally 10-20%, varies by industry',
    example: 'Company with $100K net income and $500K equity = 20% ROE',
  },
  {
    id: 'roa',
    name: 'Return on Assets (ROA)',
    category: 'Efficiency Ratios',
    formula: 'Net Income / Total Assets × 100',
    description:
      'Measures how efficiently a company uses its assets to generate profit.',
    interpretation:
      'Higher ROA indicates better asset utilization and operational efficiency.',
    goodRange: 'Generally 5-15%, varies by industry',
    example: 'Company with $100K net income and $1M assets = 10% ROA',
  },

  // Per-Share Metrics
  {
    id: 'eps',
    name: 'Earnings Per Share (EPS)',
    category: 'Per-Share Metrics',
    formula: 'Net Income / Number of Outstanding Shares',
    description:
      'Shows the portion of company profit allocated to each outstanding share.',
    interpretation:
      'Higher EPS generally indicates better profitability per share.',
    goodRange: 'Varies by company size and industry',
    example: 'Company with $1M net income and 100K shares = $10 EPS',
  },
]
