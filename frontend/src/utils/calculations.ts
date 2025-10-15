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
