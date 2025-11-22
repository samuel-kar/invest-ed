export const en = {
  common: {
    loading: 'Loading...',
    error: 'Error',
    search: 'Search',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    open: 'Open',
    clear: 'Clear',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    navigation: 'Navigation',
    years: 'years',
    months: 'months',
    year: 'year',
    month: 'month',
    note: 'Note',
  },
  navigation: {
    home: 'Home',
    learn: 'Learn',
    calculators: 'Calculators',
    analysis: 'Analysis',
    companies: 'Companies',
    saved: 'Saved',
    settings: 'Settings',
  },
  home: {
    title: 'InvestEd',
    subtitle:
      'Your comprehensive platform for dividend and growth investing analysis',
    heading: 'Investment + Education = Financial Freedom',
    welcome1:
      'Welcome to InvestEd, where true financial freedom comes from the perfect combination of Investment knowledge and Education. This platform is designed to give you the educational foundation you need to make informed investment decisions that build lasting wealth.',
    welcome2:
      "Whether you're pursuing dividend income for steady cash flow or growth investing for long-term wealth building, education is your most powerful tool. Here you'll find comprehensive learning resources and analysis tools to help you understand market dynamics, evaluate investment opportunities, and create a strategy that aligns with your financial goals.",
    welcome3:
      "From basic investment concepts to advanced analysis techniques, this platform guides your journey toward financial independence. When you combine knowledge with action, you don't just invest - you build the foundation for lasting financial freedom.",
  },
  learn: {
    title: 'Learn to Invest Smarter',
    subtitle:
      'Master the fundamentals of investing with our comprehensive guides and financial metrics dictionary. Build the knowledge you need to make informed investment decisions.',
    featuredGuides: 'Featured Learning Guides',
    metricsDictionary: 'Financial Metrics Dictionary',
    metricsDescription:
      'Learn about key financial metrics used in investment analysis. Click on any metric to see detailed information.',
    searchMetrics: 'Search metrics by name or description...',
    showingMetrics: 'Showing {count} of {total} metrics',
    noMetricsFound: 'No metrics found matching your search criteria.',
    all: 'All',
    backToLearn: 'Back to Learn',
    guides: {
      dividendAnalysis: {
        title: 'Quick Start Guide to Analyze Dividend Companies',
        description:
          'A comprehensive step-by-step guide to analyzing dividend-paying companies, covering everything from company type identification to key financial metrics.',
        step1: {
          title: 'Go to Yahoo Finance, Seeking Alpha, or any online broker and enter the ticker symbol',
          content: 'Check what type of company it is; whether it is a REIT, BDC, or other type.',
        },
        step2: {
          title: 'Check the share price history to see what entry point you can use',
          content: 'Determine if other investors are optimistic or pessimistic – why, in that case?',
        },
        step3: {
          title: 'Check the company website and look for "Investor Presentation"',
          content: 'Under investor relations. They are written by the company itself, but provide good insight.',
        },
        step4: {
          title: 'Check the dividend history (dividend distribution history)',
          content:
            'A red flag is if they cut/reduce the dividend (preferably on Seeking Alpha). History is no guarantee either way, but a good indicator (see "The Ultimate Dividend Playbook" by Josh Peters). "The safest dividend is the one that\'s just been raised" (except for royalty trusts).',
        },
        step5: {
          title: 'Total return calculator (stock value + reinvested dividends)',
          content: 'Dividendchannel.com. Customstockalerts.com (Maybe only this one includes DRIP?)',
        },
        step6: {
          title: 'Check payout ratio (one of the more important) – payout ratio',
          content:
            'What portion is paid out of revenues. Seeking Alpha calculates this automatically. Consumer staples: <50% is healthy, but >80% is risky. BDC and REIT must however pay out >90% by law.',
        },
        step7: {
          title: 'REITs – book value is not unimportant, but "Funds from Operations" is more important (see income statement)',
          content:
            'It should increase year over year. Otherwise see "Earnings from Continuing Operations".',
        },
        step8: {
          title: 'Important metrics for different types of companies',
          regularStocks: {
            title: 'Regular stocks (growth stocks with dividends)',
            metrics: {
              peRatio: 'P/E ratio',
              freeCashFlowToEquity: 'Free cash flow to equity',
              dividendCoverageRatio: 'Dividend coverage ratio',
            },
          },
          reits: {
            title: 'REITs',
            metrics: {
              fundsFromOperations:
                'Funds from Operations - book value is not unimportant, but FFO is more important (see income statement). It should increase year over year. Otherwise see "Earnings from Continuing Operations".',
              debt: 'Debt/liabilities – REITs are more sensitive at high interest rates',
              interestCoverageRatio: 'Interest coverage ratio',
            },
          },
          bdcs: {
            title: 'BDCs',
            metrics: {
              nav: 'NAV (Net Asset Value) aka Book Value – found in the balance sheet (Seeking Alpha)',
              netInterestIncome: 'Net interest income',
              weightedAveragePortfolioYield: 'Weighted average portfolio yield',
            },
          },
        },
        step9: {
          title: 'You can also take in opinions from others (e.g., the website Tipranks)',
        },
        step10: {
          title: 'Check their (company\'s) portfolio, especially for BDCs',
          content: 'Diversification is especially important for BDC.',
        },
        step11: {
          title: 'Check insider ownership percentage – how confident are they in their company?',
          content: 'Sometimes difficult to find, but the website Fintel has it.',
        },
        step12: {
          title: 'Check trends and news in the industry where they are active.',
        },
      },
    },
  },
  calculators: {
    title: 'Calculators',
    compoundInterest: 'Compound Interest',
    savingsGoal: 'Savings Goal',
    retirement4Percent: 'Retirement (4% rule)',
    retirementDividend: 'Retirement (dividend)',
    swipeToExplore: 'Swipe to explore calculators',
    overviewTitle: 'Investment Calculators',
    overviewDescription:
      'Choose from a comprehensive set of financial calculators to help you plan and optimize your savings strategy.',
    bestFor: 'Best for',
    compoundInterestTitle: '📈 Compound Interest Calculator',
    compoundInterestDescription:
      'Calculate how your investments will grow over time with compound interest and regular monthly contributions. Perfect for long-term investment planning.',
    compoundInterestBestFor:
      'Long-term investments, retirement planning, understanding compound growth',
    savingsGoalTitle: '🎯 Savings Goal Calculator',
    savingsGoalDescription:
      'Determine how long it will take to reach your financial goals with regular monthly contributions. Set realistic timelines for your objectives.',
    savingsGoalBestFor:
      'Short-term goals, vacation planning, emergency fund building',
    retirement4PercentTitle: '🏖️ Retirement (4% Rule)',
    retirement4PercentDescription:
      'Estimate your retirement savings and monthly income using the proven 4% withdrawal rule. Plan for a financially secure retirement.',
    retirement4PercentBestFor:
      'Retirement planning, FIRE movement, traditional retirement strategies',
    retirementDividendTitle: '💰 Retirement (Dividend)',
    retirementDividendDescription:
      'Calculate the portfolio size needed for dividend income retirement. Focus on dividend-paying stocks for passive income.',
    retirementDividendBestFor:
      'Dividend investing, passive income strategies, income-focused retirement',
    proTipTitle: '💡 Pro Tip',
    proTipText:
      'Start with the Compound Interest Calculator to understand the power of long-term investing, then use the Savings Goal Calculator to set specific targets. For retirement planning, compare both the 4% rule and dividend strategies to find what works best for your situation.',
  },
  calculator: {
    investmentParameters: 'Investment Parameters',
    investmentResults: 'Investment Results',
    goalParameters: 'Goal Parameters',
    goalTimeline: 'Goal Timeline',
    initialInvestment: 'Initial Investment:',
    totalContributions: 'Total Contributions:',
    totalInvested: 'Total Invested:',
    investmentGains: 'Investment Gains:',
    finalValue: 'Final Value:',
    goalAmount: 'Goal Amount:',
    currentSavings: 'Current Savings:',
    amountNeeded: 'Amount Needed:',
    timeToGoal: 'Time to Goal:',
    monthlyContribution: 'Monthly Contribution:',
    initialInvestmentLabel: 'Initial Investment ($)',
    investmentPeriod: 'Investment Period (Years)',
    monthlyContributionLabel: 'Monthly Contribution ($)',
    expectedReturn: 'Expected return per year (%)',
    expectedReturnNote:
      'This is the expected annual return on your investments. Historically, broad market index funds have grown at an average of 7-10% per year.',
    expectedReturnNote2:
      'Note: This is a historical average and is not a guarantee. The actual growth of your portfolio will depend on the performance of your specific investments and market conditions.',
    expectedReturnNoteSavings:
      'This is the expected annual return on your investments. Historically, broad market index funds have grown at an average of 7-10% per year, while more conservative investments like bonds yield 3-5%.',
    expectedReturnNoteSavings2:
      'Note: This is a historical average and is not a guarantee. Actual returns will vary based on your investment choices and market conditions.',
    goalAmountLabel: 'Goal Amount ($)',
    currentSavingsLabel: 'Current Savings ($)',
    timePeriodYears: 'Time Period (Years)',
    learnMore: 'Learn More',
    formulaWhere:
      'Where: FV = Future Value, PV = Present Value, r = Monthly Rate, n = Number of Months, PMT = Monthly Payment',
    formulaWhereSavings:
      'Where: PMT = Monthly Payment, FV = Future Value (Goal), PV = Present Value (Current Savings), r = Monthly Rate, n = Number of Months',
    formulaGeneral: 'General (r ≠ 0):',
    formulaSpecial: 'Special case (r = 0):',
    retirementPlan: 'Retirement Plan',
    currentAge: 'Current age',
    retirementAge: 'Retirement age',
    expectedPortfolioGrowth: 'Expected portfolio growth per year (%)',
    yearsToRetirement: 'Years to Retirement:',
    fundAtRetirement: 'Fund at Retirement:',
    startingGrowthValue: 'Starting Growth Value:',
    contributionsValue: 'Contributions Value:',
    annualIncome: 'Annual Income:',
    monthlyIncome: 'Monthly Income:',
    dividendPlan: 'Dividend Plan',
    amountYouPlanToInvest:
      'Amount you plan to invest each month during the accumulation phase.',
    capitalAppreciationNote:
      'Capital appreciation is stock price growth only (excluding dividends). This avoids double-counting since dividend growth is already reflected in price appreciation. Your total return = Dividend Yield + Capital Appreciation.',
    totalAnnualReturnUsed: 'Total annual return used (reinvesting):',
    growthRateUsed: 'Growth rate used (no reinvest):',
    dividendYieldPlusPriceGrowth:
      '= Dividend Yield ({yield}%) + Price Growth ({growth}%)',
    priceGrowthOnly: '= Price Growth only',
    reinvestDividendsLabel: 'Reinvest dividends during accumulation phase',
    reinvestDividendsNote:
      'If checked, dividends earned before year T will be reinvested to grow your portfolio. If unchecked, only price growth compounds.',
    inflationNote:
      'Inflation increases your future cost of living. This rate adjusts your desired income to maintain its purchasing power in year T.',
    totalNeeded: 'Total Needed:',
    portfolioNeeded: 'Portfolio Needed:',
    startingPrincipalNeeded: 'Starting Principal Needed:',
    futureAnnualIncome: 'Future Annual Income:',
    growthFromPrincipal: 'Growth from Principal:',
    atRetirement: 'At Retirement',
    retirementProjection: 'Retirement Projection',
    startingWith: 'Starting with {amount} will grow to {growth}',
    monthlyContributionsWillAdd:
      'Monthly contributions of {amount} will add {total}',
    totalAtAge: 'Total at age {age}: {amount}',
    canSafelyWithdraw:
      'You can safely withdraw {monthly}/month ({annual}/year)',
    the4PercentRule: 'The 4% Rule',
    fourPercentRuleDescription:
      'Based on historical data, withdrawing 4% annually from your portfolio has a high probability of lasting 30+ years in retirement.',
    fourPercentRuleNote:
      'This assumes a balanced portfolio and adjusting for inflation each year.',
    recommendedVideos: 'Recommended Videos',
    startingPrincipalNeededToday: 'Starting Principal Needed Today',
    portfolioTargetAtYear: 'Portfolio Target at Year {year}',
    dividendYield: 'Dividend yield',
    yearsUntilIncome: 'Years until income',
    dividendProjection: 'Dividend Projection',
    forImmediateIncome:
      'For immediate income: You need a portfolio of {amount} today to generate {monthly} per month',
    annualIncomeTarget: 'Annual income target: {amount}',
    usesSimpleFormula: 'This uses the simple formula (no growth assumptions)',
    targetAnnualIncomeWillBe:
      'Your target annual income will be {amount} after {inflation}% annual inflation.',
    toReachGoal:
      'To reach your {goal} goal, you need an initial principal of {principal}.',
    monthlyInvestmentsProjected:
      'Your monthly investments of {monthly} are projected to grow to {total}.',
    initialPrincipalProjected:
      'Your initial principal is projected to grow to {growth}.',
    contributionsSufficient: '$0 (Contributions sufficient)',
    futureIncomeInflationAdjusted: 'Future Income (Inflation-Adjusted)',
    futureIncomeFormula: 'Future Income = Annual Income × (1 + Inflation)^T',
    portfolioGoal: 'Portfolio Goal',
    portfolioGoalFormula: 'Portfolio Goal = Future Income / Dividend Yield',
    futureValueOfMonthlyInvestments: 'Future Value of Monthly Investments',
    fvContributionsFormula: 'FV Contributions = Monthly × [((1+r)^n - 1) / r]',
    fvContributionsWhere: 'Where r = monthly rate, n = number of months',
    startingPrincipalNeededFormula: 'Starting Principal Needed',
    principalFormula:
      'Principal = (Portfolio Goal − FV Contributions) / (1 + rate)^T',
    growthRateIs: 'The growth rate {rate} is {type}.',
    dividendYieldPlusPriceGrowthFormula: 'Dividend Yield + Price Growth',
    priceGrowthOnlyFormula: 'Price Growth only',
    allRatesConstant:
      'Note: All rates are assumed constant. These are estimates for planning purposes only.',
  },
  analysis: {
    title: 'Investment Analysis',
    ddm: 'DDM Analysis',
    chowder: 'Chowder Rule',
    swipeToBrowse: 'Swipe to browse analyses',
    overviewTitle: 'Investment Analysis Tools',
    overviewDescription:
      'Advanced analysis tools to help you evaluate investment opportunities and make informed decisions.',
    bestFor: 'Best for',
    ddmTitle: '📊 DDM Analysis',
    ddmDescription:
      'Dividend Discount Model analysis to evaluate stocks based on their dividend payments and growth potential.',
    ddmBestFor:
      'Dividend stock analysis, value investing, long-term income evaluation',
    chowderTitle: '🥣 Chowder Rule',
    chowderDescription:
      'The Chowder Rule combines dividend yield and dividend growth rate to identify quality dividend stocks.',
    chowderBestFor:
      'Dividend growth stocks, quality screening, dividend sustainability analysis',
    proTipTitle: '💡 Pro Tip',
    proTipText:
      'Use the DDM Analysis to calculate fair value for dividend-paying stocks, then apply the Chowder Rule to screen for quality dividend growth companies. These tools work best together for comprehensive dividend stock evaluation.',
  },
  ddm: {
    about: 'About DDM Analysis',
    formulaTitle: 'Dividend Discount Model Formula:',
    formula: 'V = D × (1 + g) / (r - g)',
    formulaV: 'V = Intrinsic value',
    formulaD: "D = Expected next year's dividend",
    formulaG: 'g = Dividend growth rate (%)',
    formulaR: 'r = Required return rate (%)',
    formulaNote: 'Note: r must be greater than g',
    interpretation: 'Interpretation:',
    interpretation1:
      '• If intrinsic value > current price: Stock is undervalued (potential buy)',
    interpretation2:
      '• If intrinsic value < current price: Stock is overvalued (potential sell)',
    interpretation3:
      '• If intrinsic value ≈ current price: Stock is fairly valued',
    interpretation4:
      '• The model assumes constant dividend growth, which may not hold for all companies',
    searchPlaceholder: 'Enter stock symbol (e.g., AAPL, MSFT)',
    searchButton: 'Search',
    loadingData: 'Loading company data...',
    coldStartMessage:
      'Backend server is waking up from standby mode. This may take a few extra seconds...',
    expectedDividend: 'Expected Dividend ($)',
    growthRate: 'Growth Rate (%)',
    discountRate: 'Discount Rate (%)',
    currentPrice: 'Current Price:',
    intrinsicValue: 'Intrinsic Value:',
    isUndervalued: 'Undervalued',
    isOvervalued: 'Overvalued',
    isFairlyValued: 'Fairly Valued',
    saveAnalysis: 'Save Analysis',
    saveSuccess: 'Analysis saved successfully!',
    saveError: 'Failed to save analysis',
    rateLimitError:
      'Rate limit exceeded. Please wait a moment before trying again.',
    signInToSave: 'Sign in to save your analysis',
    noData: 'No data available. Please search for a company first.',
    invalidCalculation: 'Invalid calculation. Please check your inputs.',
    analyzeStock: 'Analyze a Stock',
    ddmAnalysisResults: 'DDM Analysis Results',
    ddmParameters: 'DDM Parameters',
    stockDataFor: 'Stock Data for {symbol}',
    dividendPaymentsPerYear: 'Dividend Payments per Year:',
    requiredReturnGreater: 'Required return must be greater than growth rate',
    expectedDividendGreater: 'Expected dividend must be greater than 0',
  },
  chowder: {
    about: 'About Chowder Rule',
    description:
      'The Chowder Rule is a dividend growth investing strategy that helps identify quality dividend growth stocks. It combines current yield and dividend growth rate to create a "Chowder Number".',
    formulaTitle: 'Chowder Number Formula:',
    formula: 'Chowder Number = Current Yield (%) + Dividend Growth Rate (%)',
    interpretation: 'Interpretation:',
    interpretation1: '• Chowder Number ≥ 12: Strong dividend growth candidate',
    interpretation2: '• Chowder Number 8-11: Good dividend growth candidate',
    interpretation3: '• Chowder Number < 8: May need improvement',
    searchPlaceholder: 'Enter stock symbol (e.g., AAPL, MSFT)',
    searchButton: 'Search',
    loadingData: 'Loading company data...',
    coldStartMessage:
      'Backend server is waking up from standby mode. This may take a few extra seconds...',
    currentYield: 'Current Yield (%)',
    dividendGrowthRate: 'Dividend Growth Rate (%)',
    chowderNumber: 'Chowder Number:',
    currentPrice: 'Current Price:',
    annualDividend: 'Annual Dividend:',
    saveAnalysis: 'Save Analysis',
    saveSuccess: 'Analysis saved successfully!',
    saveError: 'Failed to save analysis',
    rateLimitError:
      'Rate limit exceeded. Please wait a moment before trying again.',
    signInToSave: 'Sign in to save your analysis',
    noData: 'No data available. Please search for a company first.',
    analyzeStock: 'Analyze a Stock',
    breakdown: 'Breakdown:',
    chowderScoreFor: 'Chowder Score for {symbol}',
    yearsOfData: 'Years of Data:',
  },
  saved: {
    title: 'Saved Analyses',
    ddm: 'DDM',
    chowder: 'Chowder rule',
    swipeToView: 'Swipe to view saved tools',
    loading: 'Loading...',
    noSavedAnalyses: 'No saved analyses found.',
  },
  companies: {
    searchPlaceholder:
      'Enter stock symbol or company name (e.g., AAPL, Apple, MSFT)',
    searchButton: 'Search',
    loading: 'Loading company data...',
    coldStartMessage:
      'Backend server is waking up from standby mode. This may take a few extra seconds...',
    searchForCompany: 'Search for a Company',
    searchDescription:
      'Enter a stock symbol or company name above to view detailed financial data and metrics.',
    error: 'Error',
    high: 'High',
    low: 'Low',
    open: 'Open',
    previousClose: 'Previous Close',
    valuationRatios: 'Valuation Ratios',
    profitabilityMargins: 'Profitability Margins',
    perShareMetrics: 'Per-Share Metrics',
    liquidityRatios: 'Liquidity Ratios',
    leverageRatios: 'Leverage Ratios',
    efficiencyRatios: 'Efficiency Ratios',
    priceToEarnings: 'Price-to-Earnings (P/E)',
    priceToBook: 'Price-to-Book (P/B)',
    priceToSales: 'Price-to-Sales (P/S)',
    priceToFreeCashFlow: 'Price-to-Free Cash Flow',
    priceToTangibleBookValue: 'Price-to-Tangible Book Value',
    grossMargin: 'Gross Margin',
    operatingMargin: 'Operating Margin',
    netMargin: 'Net Margin',
    pretaxMargin: 'Pre-tax Margin',
    freeCashFlowMargin: 'Free Cash Flow Margin',
    earningsPerShare: 'Earnings Per Share',
    ebitPerShare: 'EBIT Per Share',
    salesPerShare: 'Sales Per Share',
    currentRatio: 'Current Ratio',
    quickRatio: 'Quick Ratio',
    cashRatio: 'Cash Ratio',
    totalDebtToEquity: 'Total Debt to Equity',
    totalDebtToTotalAsset: 'Total Debt to Total Asset',
    totalDebtToTotalCapital: 'Total Debt to Total Capital',
    longtermDebtToTotalAsset: 'Long-term Debt to Total Asset',
    longtermDebtToTotalCapital: 'Long-term Debt to Total Capital',
    longtermDebtToTotalEquity: 'Long-term Debt to Total Equity',
    netDebtToTotalCapital: 'Net Debt to Total Capital',
    netDebtToTotalEquity: 'Net Debt to Total Equity',
    returnOnAssets: 'Return on Assets',
    returnOnEquity: 'Return on Equity',
    returnOnCapital: 'Return on Capital',
    assetTurnover: 'Asset Turnover',
    inventoryTurnover: 'Inventory Turnover',
    receivablesTurnover: 'Receivables Turnover',
  },
  settings: {
    title: 'Settings',
    theme: 'Theme',
    themeDescription: '{mode} mode',
    light: 'Light',
    dark: 'Dark',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    currency: 'Calculator currency',
    currencyDescription: '{name}',
    currencyNames: {
      USD: 'US Dollar ($)',
      EUR: 'Euro (€)',
      SEK: 'Swedish Krona (kr)',
      PLN: 'Polish Zloty (zł)',
      DKK: 'Danish Krone (kr)',
      NOK: 'Norwegian Krone (kr)',
      CNY: 'Chinese Yuan (¥)',
      JPY: 'Japanese Yen (¥)',
    },
    language: 'Language',
    languageDescription: '{name}',
    english: 'English',
    swedish: 'Swedish',
  },
  footer: {
    importantDisclaimers: 'Important Disclaimers',
    educationalOnly: 'Educational Only:',
    educationalOnlyText:
      'This site provides educational content only. Nothing constitutes investment or financial advice.',
    investmentRisks: 'Investment Risks:',
    investmentRisksText:
      "All investments carry risk of loss. Past performance doesn't guarantee future results.",
    noLiability: 'No Liability:',
    noLiabilityText:
      'This site is not responsible for any losses from decisions made based on this information.',
    additionalInformation: 'Additional Information',
    dataAccuracy: 'Data Accuracy:',
    dataAccuracyText:
      'Information may not be accurate or current. Consult qualified professionals before investing.',
    noProfessionalRelationship: 'No Professional Relationship:',
    noProfessionalRelationshipText:
      "Use of this site doesn't create any advisor-client relationship.",
    copyright: '© 2025 InvestEd. All rights reserved.',
    educationalPurposes: 'Educational purposes only.',
  },
  header: {
    searchPlaceholder: 'Search companies...',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  retirement: {
    desiredMonthlyIncome: 'Desired monthly income ($)',
    monthlyInvestment: 'Monthly Investment ($)',
    dividendYield: 'Dividend Yield (%)',
    capitalAppreciation: 'Capital Appreciation (%)',
    yearsUntilIncome: 'Years until income needed (T)',
    expectedInflation: 'Expected Annual Inflation Rate (%)',
    adjustForInflation: 'Adjust for inflation',
    investmentParameters: 'Investment Parameters',
    results: 'Results',
    totalNeeded: 'Total Needed:',
    monthlyContribution: 'Monthly Contribution:',
    yearsToGoal: 'Years to Goal:',
    formulaTitle: 'Dividend Income Formulas',
  },
  adjustPlan: {
    title: 'Adjust Your Plan',
    currentPlan: 'Current Plan:',
    alternativePlan: 'Alternative Plan:',
    ifYouExtend:
      'If you extend your timeline to {years} years {months} months:',
    monthlyPayment: 'Monthly Payment:',
  },
}
