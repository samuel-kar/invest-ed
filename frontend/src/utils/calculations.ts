export const monthlyCompoundInterestCalculator = (
  startValue: number,
  annualRate: number,
  years: number,
  monthlyInput: number,
): number => {
  const monthlyRate = annualRate / 12 / 100
  const months = years * 12

  // Handle 0% interest rate case
  if (monthlyRate === 0) {
    return startValue + monthlyInput * months
  }

  return (
    startValue * Math.pow(1 + monthlyRate, months) +
    (monthlyInput * (Math.pow(1 + monthlyRate, months) - 1)) / monthlyRate
  )
}

export const savingsGoalCalculator = (
  goalAmount: number,
  currentSavings: number,
  annualRate: number,
  years: number,
  months: number,
): number => {
  const monthlyRate = annualRate / 12 / 100
  const totalMonths = years * 12 + months

  // Handle special case when rate is 0
  if (monthlyRate === 0) {
    return (goalAmount - currentSavings) / totalMonths
  }

  // General formula
  const futureValueOfCurrentSavings =
    currentSavings * Math.pow(1 + monthlyRate, totalMonths)
  const numerator = monthlyRate * (goalAmount - futureValueOfCurrentSavings)
  const denominator = Math.pow(1 + monthlyRate, totalMonths) - 1

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
  const years = Math.max(0, retirementAge - currentAge)
  const months = years * 12
  const monthlyRate = annualRate / 12 / 100

  const pow = Math.pow(1 + monthlyRate, months)

  let fund = 0
  let startingGrowth = 0
  if (monthlyRate === 0) {
    startingGrowth = currentSavings
    fund = currentSavings + monthlyContribution * months
  } else {
    startingGrowth = currentSavings * pow
    fund = startingGrowth + (monthlyContribution * (pow - 1)) / monthlyRate
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
  portfolioNeedToday: number
  portfolioNeededAtYearT: number
  annualIncome: number
}

export const dividendPortfolioCalculator = (
  desiredMonthlyIncome: number,
  dividendYieldPercent: number,
  yearsUntilIncome: number,
  annualGrowthRate: number,
): DividendPortfolioResult => {
  const y = Math.max(0, dividendYieldPercent) / 100
  const g = Math.max(0, annualGrowthRate) / 100
  const annual = desiredMonthlyIncome * 12
  const T = Math.max(0, yearsUntilIncome)

  // Enhanced formula: PORTFOLIO_NOW = (Annual Income) / (Yield × (1 + g)^T)
  const growthFactor = Math.pow(1 + g, T)
  const portfolioToday = y === 0 ? Infinity : annual / (y * growthFactor)

  // Simple formula for portfolio needed at year T: (Annual Income) / Yield
  const portfolioAtYearT = y === 0 ? Infinity : annual / y

  return {
    portfolioNeedToday: portfolioToday,
    portfolioNeededAtYearT: portfolioAtYearT,
    annualIncome: annual,
  }
}
