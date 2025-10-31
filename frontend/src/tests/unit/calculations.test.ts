import {
  monthlyCompoundInterestCalculator,
  retirement4PercentCalculator,
  savingsGoalCalculator,
  ddmCalculator,
} from '@/utils/calculations'

describe('calculations utils', () => {
  test('monthlyCompoundInterestCalculator handles zero rate as linear sum', () => {
    const result = monthlyCompoundInterestCalculator(1000, 0, 1, 100)
    // 12 months * 100 + 1000
    expect(result).toBe(2200)
  })

  test('monthlyCompoundInterestCalculator grows with positive rate', () => {
    const result = monthlyCompoundInterestCalculator(1000, 12, 1, 0)
    // ~ 1000 * (1 + 0.01) ^ 12 ≈ 1126.8
    expect(result).toBeGreaterThan(1120)
    expect(result).toBeLessThan(1135)
  })

  test('savingsGoalCalculator returns 0 monthly if no time', () => {
    const result = savingsGoalCalculator(10000, 0, 5, 0, 0)
    expect(result).toBe(0)
  })

  test('retirement4PercentCalculator computes fund and incomes', () => {
    const res = retirement4PercentCalculator(30, 65, 10000, 500, 6)
    expect(res.yearsToRetirement).toBe(35)
    expect(res.fundAtRetirement).toBeGreaterThan(0)
    expect(res.annualIncome).toBe(Math.round(res.fundAtRetirement * 0.04))
    expect(res.monthlyIncome).toBe(Math.round(res.annualIncome / 12))
  })

  test('ddmCalculator validates r > g and positive dividend', () => {
    const valid = ddmCalculator(5, 3, 8, 80)
    expect(valid.isValid).toBe(true)
    expect(valid.intrinsicValue).toBeGreaterThan(0)

    const invalid = ddmCalculator(0, 3, 8)
    expect(invalid.isValid).toBe(false)
    expect(invalid.intrinsicValue).toBe(0)
  })
})

