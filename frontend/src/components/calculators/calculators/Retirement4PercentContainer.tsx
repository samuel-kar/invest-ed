import { useMemo, useState } from 'react'
import { LabeledInput } from '../shared/InputsGroup'
import FormulaBlock from '../shared/FormulaBlock'
import { useCurrency } from '../../../contexts/CurrencyContext'
import { retirement4PercentCalculator } from '../../../utils/calculations'
import Card from '../../shared/Card'

export default function Retirement4PercentContainer() {
  const [currentAge, setCurrentAge] = useState<number>(30)
  const [retirementAge, setRetirementAge] = useState<number>(65)
  const [currentSavings, setCurrentSavings] = useState<number>(50000)
  const [monthlyContribution, setMonthlyContribution] = useState<number>(1000)
  const [annualRate, setAnnualRate] = useState<number>(7)
  const { formatCurrency } = useCurrency()

  const {
    yearsToRetirement,
    fundAtRetirement,
    startingGrowthValue,
    contributionsValue,
    annualIncome,
    monthlyIncome,
  } = useMemo(
    () =>
      retirement4PercentCalculator(
        currentAge,
        retirementAge,
        currentSavings,
        monthlyContribution,
        annualRate,
      ),
    [
      currentAge,
      retirementAge,
      currentSavings,
      monthlyContribution,
      annualRate,
    ],
  )

  return (
    <div>
    <div className="grid md:grid-cols-5 gap-8">
      {/* Input Section */}
      <div className="md:col-span-2 space-y-6">
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Retirement Plan
        </h3>

        <LabeledInput
          label="Current age"
          type="number"
          value={currentAge}
          onChange={(e) => setCurrentAge(Number(e.target.value))}
          min={0}
          max={120}
          step={1}
          placeholder="30"
        />

        <LabeledInput
          label="Retirement age"
          type="number"
          value={retirementAge}
          onChange={(e) => setRetirementAge(Number(e.target.value))}
          min={0}
          max={120}
          step={1}
          placeholder="65"
        />

        <LabeledInput
          label="Current Savings ($)"
          type="number"
          value={currentSavings}
          onChange={(e) => setCurrentSavings(Number(e.target.value))}
          min={0}
          step={100}
          placeholder="50000"
        />

        <LabeledInput
          label="Monthly Contribution ($)"
          type="number"
          value={monthlyContribution}
          onChange={(e) => setMonthlyContribution(Number(e.target.value))}
          min={0}
          step={50}
          placeholder="1000"
        />

        <LabeledInput
          label="Expected portfolio growth per year (%)"
          type="number"
          value={annualRate}
          onChange={(e) => setAnnualRate(Number(e.target.value))}
          min={0}
          max={100}
          step={0.1}
          placeholder="7"
        />
        <p className="text-sm text-gray-500">
          This is the expected growth of your portfolio each year. Historically,
          broad market index funds have grown at an average of 7-10% per year.
          <br />
          <br />
          <strong>Note:</strong> This is a historical average and is not a
          guarantee. The actual growth of your portfolio will depend on the
          performance of your specific investments and market conditions.
        </p>
      </div>

      {/* Results Section */}
      <div className="md:col-span-3 space-y-6">
        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-4 border">
            <div
              className="text-sm mb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              At Retirement
            </div>
            <div
              className="text-lg sm:text-xl lg:text-2xl font-bold break-words"
              style={{ color: 'var(--accent-color)' }}
            >
              {formatCurrency(fundAtRetirement)}
            </div>
          </Card>

          <Card className="p-4 border">
            <div
              className="text-sm mb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              Monthly Income
            </div>
            <div
              className="text-lg sm:text-xl lg:text-2xl font-bold break-words"
              style={{ color: 'var(--text-primary)' }}
            >
              {formatCurrency(monthlyIncome)}
            </div>
          </Card>

          <Card className="p-4 border">
            <div
              className="text-sm mb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              Years to Retirement
            </div>
            <div
              className="text-2xl font-bold"
              style={{ color: 'var(--accent-color)' }}
            >
              {yearsToRetirement}
            </div>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              years
            </div>
          </Card>
        </div>

        {/* Projection */}
        <Card className="p-4">
          <h4
            className="font-semibold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Retirement Projection
          </h4>
          <ul className="space-y-3" style={{ color: 'var(--text-secondary)' }}>
            <li className="break-words">
              • Starting with {formatCurrency(currentSavings)} will grow to{' '}
              {formatCurrency(startingGrowthValue)}
            </li>
            <li className="break-words">
              • Monthly contributions of {formatCurrency(monthlyContribution)}{' '}
              will add {formatCurrency(contributionsValue)}
            </li>
            <li className="break-words">
              • Total at age {retirementAge}: {formatCurrency(fundAtRetirement)}
            </li>
            <li className="break-words">
              You can safely withdraw {formatCurrency(monthlyIncome)}/month (
              {formatCurrency(annualIncome)}/year)
            </li>
          </ul>
        </Card>

        {/* Info Block: 4% Rule */}
        <FormulaBlock title="The 4% Rule">
          <p className="mb-2">
            Based on historical data, withdrawing 4% annually from your
            portfolio has a high probability of lasting 30+ years in retirement.
          </p>
          <p>
            This assumes a balanced portfolio and adjusting for inflation each
            year.
          </p>
        </FormulaBlock>
      </div>
    </div>
    <div className="mt-8 w-full max-w-2xl mx-auto">
      <h4
        className="text-sm font-medium mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        Recommended Videos
      </h4>
      <div className="space-y-4">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube-nocookie.com/embed/RUNzB_Nd3wc?si=iXFLfEEzNBDaN9ul"
            title="YouTube video player"
            frameBorder={0}
            allow={
              'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            }
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube-nocookie.com/embed/ZL9uEQBhcao?si=Hm-YATKHWkK7LhJi"
            title="YouTube video player"
            frameBorder={0}
            allow={
              'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            }
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
    </div>
  )
}
