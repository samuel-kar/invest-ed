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
