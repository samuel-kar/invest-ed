export const EPS = 1e-12

export const monthlyCompoundInterestCalculator = (
  startValue: number,
  annualRate: number,
  years: number,
  monthlyInput: number,
): number => {
  const monthlyRate = Math.max(annualRate, 0) / 12 / 100
  const months = Math.max(0, Math.floor(years * 12))

  if (monthlyRate <= EPS) {
    return Math.max(0, startValue) + Math.max(0, monthlyInput) * months
  }

  const pow = Math.pow(1 + monthlyRate, months)
  return (
    Math.max(0, startValue) * pow +
    (Math.max(0, monthlyInput) * (pow - 1)) / monthlyRate
  )
}

export const savingsGoalCalculator = (
  goalAmount: number,
  currentSavings: number,
  annualRate: number,
  years: number,
  months: number,
): number => {
  const monthlyRate = Math.max(annualRate, 0) / 12 / 100
  const totalMonths = Math.max(0, Math.floor(years * 12 + months))

  if (totalMonths === 0) return 0 // no time to save → treat as 0 (caller can handle separately)

  if (monthlyRate <= EPS) {
    return (Math.max(0, goalAmount) - Math.max(0, currentSavings)) / totalMonths
  }

  const pow = Math.pow(1 + monthlyRate, totalMonths)
  const fvCurrent = Math.max(0, currentSavings) * pow
  const numerator = monthlyRate * (Math.max(0, goalAmount) - fvCurrent)
  const denominator = pow - 1
  return numerator / denominator
}

export interface Retirement4PercentResult {
  yearsToRetirement: number
  fundAtRetirement: number
  startingGrowthValue: number
  contributionsValue: number
  annualIncome: number
  monthlyIncome: number
}

export const retirement4PercentCalculator = (
  currentAge: number,
  retirementAge: number,
  currentSavings: number,
  monthlyContribution: number,
  annualRate: number,
): Retirement4PercentResult => {
  const years = Math.max(0, Math.floor(retirementAge - currentAge))
  const months = years * 12
  const monthlyRate = Math.max(annualRate, 0) / 12 / 100

  let fund = 0
  let startingGrowth = 0

  if (monthlyRate <= EPS) {
    startingGrowth = Math.max(0, currentSavings)
    fund = startingGrowth + Math.max(0, monthlyContribution) * months
  } else {
    const pow = Math.pow(1 + monthlyRate, months)
    startingGrowth = Math.max(0, currentSavings) * pow
    fund =
      startingGrowth +
      (Math.max(0, monthlyContribution) * (pow - 1)) / monthlyRate
  }

  const contributions = Math.max(0, fund - startingGrowth)
  const annual = fund * 0.04
  const monthly = annual / 12

  return {
    yearsToRetirement: years,
    fundAtRetirement: Math.round(fund),
    startingGrowthValue: Math.round(startingGrowth),
    contributionsValue: Math.round(contributions),
    annualIncome: Math.round(annual),
    monthlyIncome: Math.round(monthly),
  }
}

export interface DividendPortfolioResult {
  startingPrincipalNeeded: number // present value required today (clamped >= 0)
  portfolioNeededAtYearT: number // future value goal at year T (can be Infinity if yield=0)
  annualIncome: number // current-dollar annual income target (12 * monthly)
  futureAnnualIncome: number // inflated annual income at year T
  totalContributions: number // FV of contributions at year T
  growthFromPrincipal: number // FV contributed by initial principal at year T (clamped >= 0)
}

export interface DDMResult {
  intrinsicValue: number
  isValid: boolean
  undervalued?: boolean
  marginOfSafety?: number
}

/**
 * Dividend Discount Model (DDM) calculator
 *
 * Calculates the intrinsic value of a stock using the Gordon Growth Model:
 * V = D × (1 + g) / (r - g)
 *
 * @param expectedDividend - Expected dividend for next year (in dollars)
 * @param growthRatePercent - Expected dividend growth rate (as percentage, e.g., 5 for 5%)
 * @param discountRatePercent - Required return/discount rate (as percentage, e.g., 8 for 8%)
 * @param currentPrice - Optional current market price (used to determine undervalued status and margin of safety)
 * @returns DDMResult containing intrinsic value, validation status, and optional comparison metrics
 */
export const ddmCalculator = (
  expectedDividend: number,
  growthRatePercent: number,
  discountRatePercent: number,
  currentPrice?: number,
): DDMResult => {
  const g = growthRatePercent / 100
  const r = discountRatePercent / 100
  const isValid = r > g && expectedDividend > 0
  const intrinsicValue = isValid ? (expectedDividend * (1 + g)) / (r - g) : 0

  const result: DDMResult = {
    intrinsicValue,
    isValid,
  }

  if (currentPrice !== undefined && currentPrice !== null && currentPrice > 0) {
    result.undervalued = intrinsicValue > currentPrice
    result.marginOfSafety =
      ((intrinsicValue - currentPrice) / currentPrice) * 100
  }

  return result
}

/**
 * Dividend portfolio planner
 *
 * Treats `capitalAppreciationPercent` as **price growth (ex-dividends)**.
 * If reinvesting dividends, capital compounds at (yield + price growth).
 * If NOT reinvesting, capital compounds at price growth only.
 */
export const dividendPortfolioCalculator = (
  desiredMonthlyIncome: number,
  monthlyInvestment: number,
  dividendYieldPercent: number,
  yearsUntilIncome: number,
  capitalAppreciationPercent: number, // price growth (ex-dividends)
  inflationRate: number,
  reinvestDividends: boolean = true,
): DividendPortfolioResult => {
  const y = Math.max(0, dividendYieldPercent) / 100 // dividend yield
  const gPrice = Math.max(0, capitalAppreciationPercent) / 100 // price growth
  const i = Math.max(0, inflationRate) / 100
  const T = Math.max(0, Math.floor(yearsUntilIncome))
  const annual = Math.max(0, desiredMonthlyIncome) * 12

  // Future income target (nominal)
  const futureAnnualIncome = annual * Math.pow(1 + i, T)

  // Required portfolio at T to generate that income with yield y
  const portfolioNeededAtYearT = y <= EPS ? Infinity : futureAnnualIncome / y

  // Immediate-income case (T === 0)
  if (T === 0) {
    return {
      startingPrincipalNeeded:
        portfolioNeededAtYearT === Infinity
          ? Infinity
          : Math.max(0, portfolioNeededAtYearT),
      portfolioNeededAtYearT,
      annualIncome: annual,
      futureAnnualIncome,
      totalContributions: 0,
      growthFromPrincipal:
        portfolioNeededAtYearT === Infinity
          ? Infinity
          : Math.max(0, portfolioNeededAtYearT),
    }
  }

  // Growth rate used for compounding capital during accumulation
  const growthRateUsed = reinvestDividends ? y + gPrice : gPrice
  const monthlyRate = growthRateUsed / 12
  const n = T * 12

  // FV of contributions
  let fvOfContributions: number
  if (monthlyRate <= EPS) {
    fvOfContributions = Math.max(0, monthlyInvestment) * n
  } else {
    const pow = Math.pow(1 + monthlyRate, n)
    fvOfContributions =
      (Math.max(0, monthlyInvestment) * (pow - 1)) / monthlyRate
  }

  // FV the principal must supply at T
  const requiredFvFromPrincipalRaw =
    portfolioNeededAtYearT === Infinity
      ? Infinity
      : portfolioNeededAtYearT - fvOfContributions
  const requiredFvFromPrincipal =
    portfolioNeededAtYearT === Infinity
      ? Infinity
      : Math.max(0, requiredFvFromPrincipalRaw)

  // PV of that principal today
  let startingPrincipalNeeded: number
  if (portfolioNeededAtYearT === Infinity) {
    startingPrincipalNeeded = Infinity
  } else if (growthRateUsed <= EPS) {
    startingPrincipalNeeded = requiredFvFromPrincipal // no discounting if no growth
  } else {
    startingPrincipalNeeded =
      requiredFvFromPrincipal / Math.pow(1 + growthRateUsed, T)
  }

  return {
    startingPrincipalNeeded: Math.max(0, startingPrincipalNeeded),
    portfolioNeededAtYearT,
    annualIncome: annual,
    futureAnnualIncome,
    totalContributions: fvOfContributions, // FV
    growthFromPrincipal: requiredFvFromPrincipal, // FV
  }
}
