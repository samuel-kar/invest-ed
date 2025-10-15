export const monthlyCompoundInterestCalculator = (
  startValue: number,
  annualRate: number,
  years: number,
  monthlyInput: number,
): number => {
  const monthlyRate = annualRate / 12 / 100
  const months = years * 12
  return (
    startValue * Math.pow(1 + monthlyRate, months) +
    (monthlyInput * (Math.pow(1 + monthlyRate, months) - 1)) / monthlyRate
  )
}
