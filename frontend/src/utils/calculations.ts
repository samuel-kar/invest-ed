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
  startingPrincipalNeeded: number
  portfolioNeededAtYearT: number
  annualIncome: number
  futureAnnualIncome: number
  totalContributions: number
  growthFromPrincipal: number
}

export const dividendPortfolioCalculator = (
  desiredMonthlyIncome: number,
  monthlyInvestment: number,
  dividendYieldPercent: number,
  yearsUntilIncome: number,
  totalAnnualReturn: number,
  inflationRate: number,
  reinvestDividends: boolean = true,
): DividendPortfolioResult => {
  const y = Math.max(0, dividendYieldPercent) / 100
  const R = Math.max(0, totalAnnualReturn) / 100
  const i = Math.max(0, inflationRate) / 100
  const annual = desiredMonthlyIncome * 12
  const T = Math.max(0, yearsUntilIncome)

  // Step 1: Calculate future goal
  const futureAnnualIncome = annual * Math.pow(1 + i, T)
  const portfolioNeededAtYearT = y === 0 ? Infinity : futureAnnualIncome / y

  if (T === 0 || !reinvestDividends || R === 0) {
    // Simplified case
    const startingPrincipal =
      monthlyInvestment > 0
        ? portfolioNeededAtYearT - monthlyInvestment * 12 * T
        : portfolioNeededAtYearT
    return {
      startingPrincipalNeeded: Math.max(0, startingPrincipal),
      portfolioNeededAtYearT,
      annualIncome: annual,
      futureAnnualIncome,
      totalContributions: monthlyInvestment * 12 * T,
      growthFromPrincipal: startingPrincipal,
    }
  }

  // Step 2: Calculate future value of monthly investments (annuity)
  const monthlyRate = R / 12
  const numMonths = T * 12
  // Future Value of Annuity: PMT * [((1+r)^n - 1) / r]
  const fvOfContributions =
    (monthlyInvestment * (Math.pow(1 + monthlyRate, numMonths) - 1)) /
    monthlyRate

  // Step 3: Determine required growth from principal
  const requiredFvFromPrincipal = portfolioNeededAtYearT - fvOfContributions

  // Step 4: Discount to find starting principal today
  const startingPrincipalNeeded = requiredFvFromPrincipal / Math.pow(1 + R, T)

  return {
    startingPrincipalNeeded: startingPrincipalNeeded,
    portfolioNeededAtYearT: portfolioNeededAtYearT,
    annualIncome: annual,
    futureAnnualIncome: futureAnnualIncome,
    totalContributions: fvOfContributions,
    growthFromPrincipal: requiredFvFromPrincipal,
  }
}
