import { useState } from 'react'
import { monthlyCompoundInterestCalculator } from '../../../utils/calculations'
import { LabeledInput } from '../shared/InputsGroup'
import MetricRow from '../shared/MetricRow'
import FormulaBlock from '../shared/FormulaBlock'
import { useCurrency } from '../../../contexts/CurrencyContext'
import Card from '../../shared/Card'

export default function CompoundInterestContainer() {
  const [startValue, setStartValue] = useState<number>(10000)
  const [annualRate, setAnnualRate] = useState<number>(7)
  const [years, setYears] = useState<number>(10)
  const [monthlyInput, setMonthlyInput] = useState<number>(500)
  const { formatCurrency } = useCurrency()

  const finalValue = monthlyCompoundInterestCalculator(
    startValue,
    annualRate,
    years,
    monthlyInput,
  )

  const totalContributions = startValue + monthlyInput * years * 12
  const totalGains = finalValue - totalContributions

  return (
    <div className="grid md:grid-cols-5 gap-8">
      {/* Input Section */}
      <div className="md:col-span-2 space-y-6">
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Investment Parameters
        </h3>

        <LabeledInput
          label="Initial Investment ($)"
          type="number"
          value={startValue}
          onChange={(e) => setStartValue(Number(e.target.value))}
          min={0}
          step={100}
        />

        <LabeledInput
          label="Investment Period (Years)"
          type="number"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          min={1}
          max={50}
          step={1}
        />

        <LabeledInput
          label="Monthly Contribution ($)"
          type="number"
          value={monthlyInput}
          onChange={(e) => setMonthlyInput(Number(e.target.value))}
          min={0}
          step={50}
        />

        <LabeledInput
          label="Expected return per year (%)"
          type="number"
          value={annualRate}
          onChange={(e) => setAnnualRate(Number(e.target.value))}
          min={0}
          max={100}
          step={0.1}
        />
        <p className="text-sm text-gray-500">
          This is the expected annual return on your investments. Historically,
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
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Investment Results
        </h3>

        <Card className="p-4 max-w-lg">
          <div className="space-y-3">
            <MetricRow
              label="Initial Investment:"
              value={formatCurrency(startValue)}
            />
            <MetricRow
              label="Total Contributions:"
              value={formatCurrency(monthlyInput * years * 12)}
            />
            <MetricRow
              label="Total Invested:"
              value={formatCurrency(totalContributions)}
            />
            <hr style={{ borderColor: 'var(--border-color)' }} />
            <MetricRow
              label="Investment Gains:"
              value={formatCurrency(totalGains)}
            />
            <MetricRow
              label="Final Value:"
              value={formatCurrency(finalValue)}
              highlight
            />
          </div>
        </Card>

        <div className="max-w-lg">
          <FormulaBlock>
            <p className="mb-2">
              FV = PV × (1 + r)<sup>n</sup> + PMT ×
              <span className="inline-block align-middle mx-1">
                <span className="block text-center border-b border-current pb-0.5">
                  (1 + r)<sup>n</sup> - 1
                </span>
                <span className="block text-center pt-0.5">r</span>
              </span>
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              Where: FV = Future Value, PV = Present Value, r = Monthly Rate, n
              = Number of Months, PMT = Monthly Payment
            </p>
          </FormulaBlock>
        </div>
      </div>
      <div className="space-y-4">
        <h4
          className="text-sm font-medium"
          style={{ color: 'var(--text-primary)' }}
        >
          Learn More
        </h4>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/wf91rEGw88Q?si=XaaYLlNGIwvgw_q8"
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
  )
}
