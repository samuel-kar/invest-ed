export const sv = {
  common: {
    loading: 'Laddar...',
    error: 'Fel',
    search: 'Sök',
    save: 'Spara',
    cancel: 'Avbryt',
    close: 'Stäng',
    open: 'Öppna',
    clear: 'Rensa',
    signIn: 'Logga in',
    signOut: 'Logga ut',
    navigation: 'Navigering',
    years: 'år',
    months: 'månader',
    year: 'år',
    month: 'månad',
    note: 'Obs',
    comingSoon: 'Kommer snart',
  },
  navigation: {
    home: 'Hem',
    learn: 'Lär dig',
    calculators: 'Kalkylatorer',
    analysis: 'Analys',
    companies: 'Företag',
    saved: 'Sparade',
    settings: 'Inställningar',
  },
  home: {
    title: 'InvestEd',
    subtitle:
      'Din omfattande plattform för utdelnings- och tillväxtinvesteringar',
    heading: 'Investering + Utbildning = Ekonomisk Frihet',
    welcome1:
      'Välkommen till InvestEd, där sann ekonomisk frihet kommer från den perfekta kombinationen av Investeringskunskap och Utbildning. Denna plattform är designad för att ge dig den utbildningsgrund du behöver för att fatta välgrundade investeringsbeslut som bygger varaktig förmögenhet.',
    welcome2:
      'Oavsett om du strävar efter utdelningsinkomst för stadig kassaflöde eller tillväxtinvesteringar för långsiktig förmögenhetsbyggnad, är utbildning ditt kraftfullaste verktyg. Här hittar du omfattande läranderesurser och analysverktyg för att hjälpa dig förstå marknadsdynamik, utvärdera investeringsmöjligheter och skapa en strategi som stämmer överens med dina ekonomiska mål.',
    welcome3:
      'Från grundläggande investeringsbegrepp till avancerade analysmetoder guidar denna plattform din resa mot ekonomisk oavhängighet. När du kombinerar kunskap med handling investerar du inte bara—du bygger grunden för varaktig ekonomisk frihet.',
  },
  learn: {
    title: 'Lär dig investera smartare',
    subtitle:
      'Bemästra grunderna i investeringar med omfattande guider och en finansiell nyckeltalsordbok. Bygg den kunskap du behöver för att fatta välgrundade investeringsbeslut.',
    featuredGuides: 'Utvalda lärandeguider',
    metricsDictionary: 'Finansiell nyckeltalsordbok',
    metricsDescription:
      'Lär dig om viktiga finansiella nyckeltal som används i investeringsanalys. Klicka på vilket nyckeltal som helst för att se detaljerad information.',
    searchMetrics: 'Sök nyckeltal efter namn eller beskrivning...',
    showingMetrics: 'Visar {count} av {total} nyckeltal',
    noMetricsFound: 'Inga nyckeltal hittades som matchar dina sökkriterier.',
    all: 'Alla',
    backToLearn: 'Tillbaka till Lär dig',
    interpretation: 'Tolkning:',
    goodRange: 'Bra intervall:',
    example: 'Exempel:',
    clickToExpand: 'Klicka för att expandera',
    clickToCollapse: 'Klicka för att dölja',
    articles: {
      portfolioBuildingFundamentals: {
        title: 'Grundläggande portföljbyggande',
        description:
          'Bemästra grunderna i att bygga en väl diversifierad investeringsportfölj som matchar din risktolerans och mål.',
      },
    },
    guides: {
      dividendAnalysis: {
        title: 'Snabbstartsguide för att analysera utdelningsföretag',
        description:
          'En omfattande steg-för-steg-guide för att analysera utdelningsföretag, som täcker allt från företagstypidentifiering till viktiga finansiella nyckeltal.',
        step1: {
          title:
            'Gå in på Yahoo Finance, Seeking Alpha eller valfri nätmäklare och mata in ticker-symbol',
          content:
            'Kolla vilken typ av företag det är; om det är REIT, BDC eller annat.',
        },
        step2: {
          title:
            'Kolla på share price-historik för att se vilken inställning man kan gå in med',
          content:
            'Avgör om andra investerare är optimistiska eller pessimistiska – varför, i sådana fall?',
        },
        step3: {
          title:
            'Kolla på företagets hemsida och leta efter "Investor Presentation"',
          content:
            'Under investor relations. De är dock skrivna av företaget själva, men ger en bra inblick.',
        },
        step4: {
          title: 'Kolla utdelningshistoriken (dividend distribution history)',
          content:
            'En röd flagg är om de kapar/reducerar utdelningen (helst på Seeking Alpha). Historiken är ingen garanti åt något håll, men bra fingervisare (se "The Ultimate Dividend Playbook" av Josh Peters). "The safest dividend is the one that\'s just been raised" (förutom royalty trusts).',
        },
        step5: {
          title:
            'Total return calculator (aktievärde + återinvesterade utdelningar)',
          content: 'Dividendchannel.com. Customstockalerts.com',
          website1: 'Dividendchannel.com',
          website2: 'Customstockalerts.com',
        },
        step6: {
          title:
            'Kolla payout ratio (en av de viktigare) – sv: utdelningsandel',
          content:
            'Hur stor andel som betalas ut av intäkterna. Seeking Alpha räknar ut detta automatiskt. Consumer staples: <50% är hälsosamt, men >80% är risky. BDC och REIT måste dock paya ut >90% enligt lag.',
        },
        step7: {
          title:
            'REITs – book value är inte oviktigt, men "Funds from Operations" är viktigare (se income statement)',
          content:
            'Den bör öka år från år. Se annars "Earnings from Continuing Operations".',
        },
        step8: {
          title: 'Viktiga metrics för olika typer av bolag',
          regularStocks: {
            title: '"Vanliga" aktier (tillväxtaktier med utdelning)',
            metrics: {
              peRatio: 'P/E ratio',
              freeCashFlowToEquity: 'Free cash flow to equity',
              dividendCoverageRatio: 'Dividend coverage ratio',
            },
          },
          reits: {
            title: 'REIT:s',
            metrics: {
              fundsFromOperations:
                'Funds from Operation - book value är inte oviktigt, men FFO är viktigare (se income statement). Den bör öka år från år. Se annars "Earnings from Continuing Operations".',
              debt: 'Debt/skuld – REITS är känsligare vid hög ränta',
              interestCoverageRatio: 'Interest coverage ratio',
            },
          },
          bdcs: {
            title: 'BDC:s',
            metrics: {
              nav: 'NAV (Net Asset Value) aka Book Value – finns i balansräkningen (Seeking Alpha)',
              netInterestIncome: 'Net interest income',
              weightedAveragePortfolioYield: 'Weighted average portfolio yield',
            },
          },
        },
        step9: {
          title:
            'Man kan också ta in åsikter från andra (ex. hemsidan Tipranks)',
        },
        step10: {
          title: 'Kolla deras (företagets) portfölj, särskilt för BDCs',
          content: 'Diversifiering är särskilt viktigt för BDC.',
        },
        step11: {
          title:
            'Kolla insider ownership percentage – hur säkra de är på sitt företag?',
          content: 'Ibland svårt att hitta, men finns hemsidan Fintel.',
        },
        step12: {
          title: 'Kolla trender och nyheter i branschen där de är aktiva.',
        },
      },
    },
    metrics: {
      categories: {
        valuationRatios: 'Värderingskvoter',
        dividendAnalysis: 'Utdelningsanalys',
        profitabilityMargins: 'Lönsamhetsmarginaler',
        liquidityRatios: 'Likviditetskvoter',
        leverageRatios: 'Belåningskvoter',
        efficiencyRatios: 'Effektivitetskvoter',
        perShareMetrics: 'Per-aktie nyckeltal',
      },
      peRatio: {
        name: 'Pris/vinstkvot (P/E)',
        category: 'Värderingskvoter',
        formula: 'Marknadspris per aktie / Vinst per aktie',
        description:
          'Mäter hur mycket investerare är villiga att betala för varje dollar i vinst.',
        interpretation:
          'Lägre P/E kan indikera undervärdering, men överväg branschgenomsnitt och tillväxtutsikter.',
        goodRange: 'Varierar per bransch, typiskt 15-25 för mogna företag',
        example: 'Om en aktie handlas till $50 och har EPS på $2, P/E = 25',
      },
      pbRatio: {
        name: 'Pris/bokfört värde (P/B)',
        category: 'Värderingskvoter',
        formula: 'Marknadspris per aktie / Bokfört värde per aktie',
        description:
          'Jämför marknadsvärde med bokfört värde, vilket indikerar om en aktie är över- eller undervärderad.',
        interpretation:
          'P/B < 1 kan indikera undervärdering, men överväg tillgångskvalitet och bransch.',
        goodRange: 'Generellt 1-3, varierar per bransch',
        example:
          'Aktie till $30 med bokfört värde på $20 per aktie = P/B på 1,5',
      },
      psRatio: {
        name: 'Pris/omsättningskvot (P/S)',
        category: 'Värderingskvoter',
        formula: 'Marknadspris per aktie / Intäkter per aktie',
        description:
          'Mäter hur mycket investerare betalar för varje dollar i företagsförsäljning.',
        interpretation:
          'Lägre P/S kan indikera undervärdering, särskilt för tillväxtföretag.',
        goodRange: 'Typiskt 1-5, varierar betydligt per bransch',
        example: 'Aktie till $100 med $20 intäkter per aktie = P/S på 5',
      },
      evEbitda: {
        name: 'Enterprise Value till EBITDA (EV/EBITDA)',
        category: 'Värderingskvoter',
        formula: 'Enterprise Value / EBITDA',
        description:
          'Mäter företagsvärdering i förhållande till dess resultat före räntor, skatter, avskrivningar och amorteringar.',
        interpretation:
          'Lägre kvoter kan indikera bättre värde, men överväg branschnormer.',
        goodRange: 'Generellt 8-15, varierar per bransch',
        example:
          'Företag med EV på $1 miljard och EBITDA på $100 miljoner = EV/EBITDA på 10',
      },
      ddm: {
        name: 'Dividend Discount Model (DDM)',
        category: 'Värderingskvoter',
        formula: 'Egenvärde = D × (1 + g) / (r - g)',
        description:
          'Beräknar egenvärdet av en aktie baserat på förväntade framtida utdelningar. D är den förväntade utdelningen nästa år, g är utdelnings tillväxttakten och r är den erforderliga avkastningskravet.',
        interpretation:
          'Om egenvärde > nuvarande pris kan aktien vara undervärderad. Om egenvärde < nuvarande pris kan den vara övervärderad. Obs: r måste vara större än g.',
        goodRange: 'Jämför egenvärde med nuvarande marknadspris',
        example:
          'Aktie med $2 förväntad utdelning, 5% tillväxttakt, 10% erforderlig avkastning = $2 × 1,05 / (0,10 - 0,05) = $42 egenvärde',
      },
      chowderRule: {
        name: 'Chowder-regeln',
        category: 'Utdelningsanalys',
        formula:
          'Chowder-poäng = Utdelningsavkastning (%) + Utdelnings CAGR (%)',
        description:
          'Utvärderar utdelningsaktier genom att kombinera nuvarande utdelningsavkastning med historisk utdelnings tillväxttakt (5-års CAGR). Ger ett enda nyckeltal för att bedöma utdelningsattraktivitet.',
        interpretation:
          'Poäng ≥15 är utmärkt, 12-15 är bra, 8-12 är acceptabelt, <8 är dåligt. Högre poäng indikerar aktier med stark utdelningsavkastning och konsekvent tillväxt.',
        goodRange: 'Generellt 12-15 eller högre för kvalitetsutdelningsaktier',
        example:
          'Aktie med 3% utdelningsavkastning och 10% utdelnings CAGR = Chowder-poäng på 13 (Bra)',
      },
      grossMargin: {
        name: 'Bruttomarginal',
        category: 'Lönsamhetsmarginaler',
        formula: '(Intäkter - Kostnad för sålda varor) / Intäkter × 100',
        description:
          'Visar procentandelen av intäkter som återstår efter direkta kostnader för att producera varor/tjänster.',
        interpretation:
          'Högre marginaler indikerar bättre prissättningskraft och operativ effektivitet.',
        goodRange: 'Varierar per bransch, generellt 20-60%',
        example:
          'Företag med $1 miljon intäkter och $600K KGS = 40% bruttomarginal',
      },
      operatingMargin: {
        name: 'Rörelsemarginal',
        category: 'Lönsamhetsmarginaler',
        formula: 'Rörelseresultat / Intäkter × 100',
        description:
          'Mäter effektiviteten i kärnverksamheten före räntor och skatter.',
        interpretation:
          'Högre marginaler indikerar bättre operativ effektivitet och kostnadskontroll.',
        goodRange: 'Generellt 10-20%, varierar per bransch',
        example:
          'Företag med $1 miljon intäkter och $150K rörelseresultat = 15% rörelsemarginal',
      },
      netMargin: {
        name: 'Nettomarginal',
        category: 'Lönsamhetsmarginaler',
        formula: 'Nettoresultat / Intäkter × 100',
        description:
          'Visar procentandelen av intäkter som blir vinst efter alla kostnader.',
        interpretation:
          'Högre nettomarginaler indikerar bättre total lönsamhet och effektivitet.',
        goodRange: 'Generellt 5-15%, varierar per bransch',
        example:
          'Företag med $1 miljon intäkter och $80K nettoresultat = 8% nettomarginal',
      },
      currentRatio: {
        name: 'Omsättningskvot',
        category: 'Likviditetskvoter',
        formula: 'Omsättningstillgångar / Kortfristiga skulder',
        description:
          'Mäter förmågan att betala kortfristiga förpliktelser med kortfristiga tillgångar.',
        interpretation:
          'Kvot > 1 indikerar förmåga att täcka kortfristiga skulder, men för hög kan indikera ineffektiv användning av tillgångar.',
        goodRange: 'Generellt 1,5-3,0',
        example:
          'Företag med $500K omsättningstillgångar och $200K kortfristiga skulder = 2,5 omsättningskvot',
      },
      quickRatio: {
        name: 'Snabbkvot',
        category: 'Likviditetskvoter',
        formula: '(Omsättningstillgångar - Lager) / Kortfristiga skulder',
        description:
          'Mer konservativt mått på likviditet, exkluderar lager som kan vara svårt att omvandla till kontanter.',
        interpretation:
          'Högre kvoter indikerar bättre kortfristig likviditet utan att förlita sig på lagersäljning.',
        goodRange: 'Generellt 1,0-2,0',
        example:
          'Företag med $400K snabba tillgångar och $200K kortfristiga skulder = 2,0 snabbkvot',
      },
      debtToEquity: {
        name: 'Skuldsättningsgrad',
        category: 'Belåningskvoter',
        formula: 'Total skuld / Totalt eget kapital',
        description:
          'Mäter den relativa andelen skuldfinansiering och eget kapital.',
        interpretation:
          'Högre kvoter indikerar mer skuldfinansiering, vilket ökar risken men kan förstärka avkastningen.',
        goodRange: 'Generellt 0,3-1,0, varierar per bransch',
        example:
          'Företag med $300K skuld och $500K eget kapital = 0,6 skuldsättningsgrad',
      },
      roe: {
        name: 'Avkastning på eget kapital (ROE)',
        category: 'Effektivitetskvoter',
        formula: 'Nettoresultat / Eget kapital × 100',
        description:
          'Mäter hur effektivt ett företag använder eget kapital för att generera vinster.',
        interpretation:
          'Högre ROE indikerar mer effektiv användning av aktieägarkapital.',
        goodRange: 'Generellt 10-20%, varierar per bransch',
        example:
          'Företag med $100K nettoresultat och $500K eget kapital = 20% ROE',
      },
      roa: {
        name: 'Avkastning på tillgångar (ROA)',
        category: 'Effektivitetskvoter',
        formula: 'Nettoresultat / Totala tillgångar × 100',
        description:
          'Mäter hur effektivt ett företag använder sina tillgångar för att generera vinst.',
        interpretation:
          'Högre ROA indikerar bättre tillgångsutnyttjande och operativ effektivitet.',
        goodRange: 'Generellt 5-15%, varierar per bransch',
        example:
          'Företag med $100K nettoresultat och $1 miljon tillgångar = 10% ROA',
      },
      eps: {
        name: 'Vinst per aktie (EPS)',
        category: 'Per-aktie nyckeltal',
        formula: 'Nettoresultat / Antal utestående aktier',
        description:
          'Visar den del av företagets vinst som allokeras till varje utestående aktie.',
        interpretation:
          'Högre EPS indikerar generellt bättre lönsamhet per aktie.',
        goodRange: 'Varierar efter företagsstorlek och bransch',
        example:
          'Företag med $1 miljon nettoresultat och 100K aktier = $10 EPS',
      },
    },
  },
  calculators: {
    title: 'Kalkylatorer',
    compoundInterest: 'Ränta på ränta',
    savingsGoal: 'Sparmål',
    retirement4Percent: 'Pension (4%-regeln)',
    retirementDividend: 'Pension (utdelning)',
    swipeToExplore: 'Svep för att utforska kalkylatorer',
    overviewTitle: 'Investeringskalkylatorer',
    overviewDescription:
      'Välj bland en omfattande uppsättning finansiella kalkylatorer för att hjälpa dig planera och optimera din sparstrategi.',
    bestFor: 'Bäst för',
    compoundInterestTitle: '📈 Ränta på ränta-kalkylator',
    compoundInterestDescription:
      'Beräkna hur dina investeringar kommer att växa över tid med ränta på ränta och regelbundna månadsbidrag. Perfekt för långsiktig investeringsplanering.',
    compoundInterestBestFor:
      'Långsiktiga investeringar, pensionsplanering, förståelse för sammansatt tillväxt',
    savingsGoalTitle: '🎯 Sparmålskalkylator',
    savingsGoalDescription:
      'Bestäm hur lång tid det tar att nå dina finansiella mål med regelbundna månadsbidrag. Sätt realistiska tidslinjer för dina mål.',
    savingsGoalBestFor:
      'Kortsiktiga mål, semesterplanering, byggande av nödfond',
    retirement4PercentTitle: '🏖️ Pension (4%-regeln)',
    retirement4PercentDescription:
      'Uppskatta dina pensionsbesparingar och månadsinkomst med den beprövade 4%-uttagsregeln. Planera för en ekonomiskt säker pension.',
    retirement4PercentBestFor:
      'Pensionsplanering, FIRE-rörelsen, traditionella pensionsstrategier',
    retirementDividendTitle: '💰 Pension (Utdelning)',
    retirementDividendDescription:
      'Beräkna portföljstorleken som behövs för utdelningsinkomstpension. Fokusera på utdelningsaktier för passiv inkomst.',
    retirementDividendBestFor:
      'Utdelningsinvesteringar, passiva inkomststrategier, inkomstfokuserad pension',
    proTipTitle: '💡 Proffstips',
    proTipText:
      'Börja med Ränta på ränta-kalkylatorn för att förstå kraften i långsiktig investering, använd sedan Sparmålskalkylatorn för att sätta specifika mål. För pensionsplanering, jämför både 4%-regeln och utdelningsstrategier för att hitta vad som fungerar bäst för din situation.',
  },
  calculator: {
    backToCalculators: 'Tillbaka till Kalkylatorer',
    formulaUsed: 'Formel som används',
    routes: {
      compoundInterest: {
        title: 'Ränta på ränta',
        description:
          'Beräkna hur din investering kommer att växa över tid med ränta på ränta och regelbundna månadsbidrag.',
      },
      savingsGoal: {
        title: 'Sparmålskalkylator',
        description:
          'Bestäm hur lång tid det tar att nå dina finansiella mål med regelbundna månadsbidrag.',
      },
      retirement4Percent: {
        title: 'Pension (4%-regeln)',
        description:
          'Uppskatta dina pensionsbesparingar och månadsinkomst med den beprövade 4%-uttagsregeln.',
      },
      retirementDividend: {
        title: 'Pension (Utdelning)',
        description:
          'Beräkna portföljstorleken som behövs för utdelningsinkomstpension. Fokusera på utdelningsaktier för passiv inkomst.',
      },
    },
    investmentParameters: 'Investeringsparametrar',
    investmentResults: 'Investeringsresultat',
    goalParameters: 'Målparametrar',
    goalTimeline: 'Måltidslinje',
    initialInvestment: 'Initial investering:',
    totalContributions: 'Totala bidrag:',
    totalInvested: 'Totalt investerat:',
    investmentGains: 'Investeringsvinster:',
    finalValue: 'Slutvärde:',
    goalAmount: 'Målbelopp:',
    currentSavings: 'Nuvarande besparingar:',
    amountNeeded: 'Belopp som behövs:',
    timeToGoal: 'Tid till mål:',
    monthlyContribution: 'Månadsbidrag:',
    initialInvestmentLabel: 'Initial investering ($)',
    investmentPeriod: 'Investeringsperiod (år)',
    monthlyContributionLabel: 'Månadsbidrag ($)',
    expectedReturn: 'Förväntad avkastning per år (%)',
    expectedReturnNote:
      'Detta är den förväntade årliga avkastningen på dina investeringar. Historiskt sett har breda marknadsindexfonder vuxit med i genomsnitt 7-10% per år.',
    expectedReturnNote2:
      'Obs: Detta är ett historiskt genomsnitt och är ingen garanti. Den faktiska tillväxten i din portfölj kommer att bero på prestandan hos dina specifika investeringar och marknadsförhållanden.',
    expectedReturnNoteSavings:
      'Detta är den förväntade årliga avkastningen på dina investeringar. Historiskt sett har breda marknadsindexfonder vuxit med i genomsnitt 7-10% per år, medan mer konservativa investeringar som obligationer ger 3-5%.',
    expectedReturnNoteSavings2:
      'Obs: Detta är ett historiskt genomsnitt och är ingen garanti. Faktiska avkastningar kommer att variera beroende på dina investeringsval och marknadsförhållanden.',
    goalAmountLabel: 'Målbelopp ($)',
    currentSavingsLabel: 'Nuvarande besparingar ($)',
    timePeriodYears: 'Tidsperiod (år)',
    learnMore: 'Läs mer',
    formulaWhere:
      'Där: FV = Framtida värde, PV = Nuvärde, r = Månadsränta, n = Antal månader, PMT = Månadsbetalning',
    formulaWhereSavings:
      'Där: PMT = Månadsbetalning, FV = Framtida värde (Mål), PV = Nuvärde (Nuvarande besparingar), r = Månadsränta, n = Antal månader',
    formulaGeneral: 'Allmänt (r ≠ 0):',
    formulaSpecial: 'Specialfall (r = 0):',
    retirementPlan: 'Pensionsplan',
    currentAge: 'Nuvarande ålder',
    retirementAge: 'Pensionsålder',
    expectedPortfolioGrowth: 'Förväntad portfölj tillväxt per år (%)',
    yearsToRetirement: 'År till pension:',
    fundAtRetirement: 'Fond vid pension:',
    startingGrowthValue: 'Startvärde för tillväxt:',
    contributionsValue: 'Bidragsvärde:',
    annualIncome: 'Årlig inkomst:',
    monthlyIncome: 'Månadsinkomst:',
    dividendPlan: 'Utdelningsplan',
    amountYouPlanToInvest:
      'Belopp du planerar att investera varje månad under ackumuleringsfasen.',
    capitalAppreciationNote:
      'Kapitalvärdering är endast aktiekurs tillväxt (exklusive utdelningar). Detta undviker dubbelräkning eftersom utdelnings tillväxt redan återspeglas i kursvärdering. Din totala avkastning = Utdelningsavkastning + Kapitalvärdering.',
    totalAnnualReturnUsed: 'Total årlig avkastning använd (återinvestering):',
    growthRateUsed: 'Tillväxttakt använd (ingen återinvestering):',
    reinvestDividendsLabel:
      'Återinvestera utdelningar under ackumuleringsfasen',
    reinvestDividendsNote:
      'Om markerad kommer utdelningar som tjänas innan år T återinvesteras för att växa din portfölj. Om avmarkerad sammansätts endast kurs tillväxt.',
    inflationNote:
      'Inflation ökar din framtida levnadskostnad. Denna takt justerar din önskade inkomst för att behålla dess köpkraft i år T.',
    totalNeeded: 'Totalt behövs:',
    portfolioNeeded: 'Portfölj behövs:',
    futureAnnualIncome: 'Framtida årlig inkomst:',
    growthFromPrincipal: 'Tillväxt från kapital:',
    atRetirement: 'Vid pension',
    retirementProjection: 'Pensionsprognos',
    startingWith: 'Startar med {amount} kommer att växa till {growth}',
    monthlyContributionsWillAdd:
      'Månadsbidrag på {amount} kommer att lägga till {total}',
    totalAtAge: 'Totalt vid ålder {age}: {amount}',
    canSafelyWithdraw: 'Du kan säkert ta ut {monthly}/månad ({annual}/år)',
    the4PercentRule: '4%-regeln',
    fourPercentRuleDescription:
      'Baserat på historiska data har uttag av 4% årligen från din portfölj hög sannolikhet att räcka i 30+ år i pension.',
    fourPercentRuleNote:
      'Detta förutsätter en balanserad portfölj och justering för inflation varje år.',
    recommendedVideos: 'Rekommenderade videor',
    startingPrincipalNeededToday: 'Startkapital som behövs idag',
    portfolioTargetAtYear: 'Portföljmål vid år {year}',
    dividendYield: 'Utdelningsavkastning',
    yearsUntilIncome: 'År tills inkomst',
    dividendProjection: 'Utdelningsprognos',
    forImmediateIncome:
      'För omedelbar inkomst: Du behöver en portfölj på {amount} idag för att generera {monthly} per månad',
    annualIncomeTarget: 'Årlig inkomstmål: {amount}',
    usesSimpleFormula:
      'Detta använder den enkla formeln (inga tillväxtantaganden)',
    targetAnnualIncomeWillBe:
      'Ditt mål för årlig inkomst kommer att vara {amount} efter {inflation}% årlig inflation.',
    toReachGoal:
      'För att nå ditt {goal} mål behöver du ett initialt kapital på {principal}.',
    monthlyInvestmentsProjected:
      'Dina månadsinvesteringar på {monthly} beräknas växa till {total}.',
    initialPrincipalProjected:
      'Ditt initiala kapital beräknas växa till {growth}.',
    contributionsSufficient: '$0 (Bidrag tillräckliga)',
    futureIncomeInflationAdjusted: 'Framtida inkomst (inflation justerad)',
    futureIncomeFormula: 'Framtida inkomst = Årlig inkomst × (1 + Inflation)^T',
    portfolioGoal: 'Portföljmål',
    portfolioGoalFormula:
      'Portföljmål = Framtida inkomst / Utdelningsavkastning',
    futureValueOfMonthlyInvestments: 'Framtida värde av månadsinvesteringar',
    fvContributionsFormula: 'FV Bidrag = Månads × [((1+r)^n - 1) / r]',
    fvContributionsWhere: 'Där r = månadsränta, n = antal månader',
    startingPrincipalNeededFormula: 'Startkapital behövs',
    principalFormula: 'Kapital = (Portföljmål − FV Bidrag) / (1 + ränta)^T',
    growthRateIs: 'Tillväxttakten {rate} är {type}.',
    dividendYieldPlusPriceGrowthFormula: 'Utdelningsavkastning + Kurs tillväxt',
    priceGrowthOnlyFormula: 'Endast kurs tillväxt',
    allRatesConstant:
      'Obs: Alla räntor antas vara konstanta. Dessa är uppskattningar endast för planeringsändamål.',
  },
  analysis: {
    title: 'Investeringsanalys',
    backToAnalysis: 'Tillbaka till Analys',
    ddm: 'DDM-analys',
    chowder: 'Chowder-regeln',
    swipeToBrowse: 'Svep för att bläddra bland analyser',
    routes: {
      ddm: {
        title: 'DDM-analys',
        description:
          'Analysera utdelningsaktier med hjälp av utdelningsrabattmodellen för att bestämma rättvist värde.',
      },
      chowder: {
        title: 'Chowder-regeln',
        description:
          'Screena utdelningsaktier med hjälp av Chowder-regeln för att identifiera kvalitetsutdelnings tillväxtföretag.',
      },
    },
    overviewTitle: 'Investeringsanalysverktyg',
    overviewDescription:
      'Avancerade analysverktyg för att hjälpa dig utvärdera investeringsmöjligheter och fatta välgrundade beslut.',
    bestFor: 'Bäst för',
    ddmTitle: '📊 DDM-analys',
    ddmDescription:
      'Dividend Discount Model-analys för att utvärdera aktier baserat på deras utdelningsbetalningar och tillväxtpotential.',
    ddmBestFor:
      'Utdelningsaktieanalys, värdeinvesteringar, långsiktig inkomstutvärdering',
    chowderTitle: '🥣 Chowder-regeln',
    chowderDescription:
      'Chowder-regeln kombinerar utdelningsavkastning och utdelnings tillväxttakt för att identifiera kvalitetsutdelningsaktier.',
    chowderBestFor:
      'Utdelnings tillväxtaktier, kvalitetsscreening, utdelningshållbarhetsanalys',
    proTipTitle: '💡 Proffstips',
    proTipText:
      'Använd DDM-analysen för att beräkna rättvärde för utdelningsaktier, applicera sedan Chowder-regeln för att screena efter kvalitetsutdelnings tillväxtföretag. Dessa verktyg fungerar bäst tillsammans för omfattande utdelningsaktieutvärdering.',
  },
  ddm: {
    about: 'Om DDM-analys',
    formulaTitle: 'Utdelningsrabattmodellformel:',
    formula: 'V = D × (1 + g) / (r - g)',
    formulaV: 'V = Egenvärde',
    formulaD: 'D = Förväntad utdelning nästa år',
    formulaG: 'g = Utdelnings tillväxttakt (%)',
    formulaR: 'r = Erforderlig avkastningsränta (%)',
    formulaNote: 'Obs: r måste vara större än g',
    interpretation: 'Tolkning:',
    interpretation1:
      'Om egenvärde > nuvarande pris: Aktien är undervärderad (potentiell köp)',
    interpretation2:
      'Om egenvärde < nuvarande pris: Aktien är övervärderad (potentiell sälj)',
    interpretation3:
      'Om egenvärde ≈ nuvarande pris: Aktien är rättvist värderad',
    interpretation4:
      'Modellen antar konstant utdelnings tillväxt, vilket kanske inte gäller för alla företag',
    searchPlaceholder: 'Ange aktiesymbol (t.ex. AAPL, MSFT)',
    searchButton: 'Sök',
    loadingData: 'Laddar företagsdata...',
    coldStartMessage:
      'Backend-servern vaknar från viloläge. Detta kan ta några extra sekunder...',
    expectedDividend: 'Förväntad utdelning ($)',
    growthRate: 'Tillväxttakt (%)',
    discountRate: 'Rabattränta (%)',
    currentPrice: 'Nuvarande pris:',
    intrinsicValue: 'Egenvärde:',
    isUndervalued: 'Undervärderad',
    isOvervalued: 'Övervärderad',
    isFairlyValued: 'Rättvist värderad',
    saveAnalysis: 'Spara analys',
    saveSuccess: 'Analys sparad framgångsrikt!',
    saveError: 'Misslyckades med att spara analys',
    rateLimitError:
      'Hastighetsbegränsning överskriden. Vänta ett ögonblick innan du försöker igen.',
    signInToSave: 'Logga in för att spara din analys',
    noData: 'Ingen data tillgänglig. Vänligen sök efter ett företag först.',
    invalidCalculation: 'Ogiltig beräkning. Vänligen kontrollera dina indata.',
    requiredReturnGreater:
      'Erforderlig avkastning måste vara större än tillväxttakt',
    expectedDividendGreater: 'Förväntad utdelning måste vara större än 0',
    analyzeStock: 'Analysera en aktie',
    ddmAnalysisResults: 'DDM-analysresultat',
    ddmParameters: 'DDM-parametrar',
    stockDataFor: 'Aktiedata för {symbol}',
    dividendPaymentsPerYear: 'Utdelningar per år:',
  },
  chowder: {
    about: 'Om Chowder-regeln',
    description:
      'Chowder-regeln är en utdelnings tillväxtinvesteringsstrategi som hjälper till att identifiera kvalitetsutdelnings tillväxtaktier. Den kombinerar nuvarande avkastning och utdelnings tillväxttakt för att skapa ett "Chowder-nummer".',
    formulaTitle: 'Chowder-nummerformel:',
    formula:
      'Chowder-nummer = Nuvarande avkastning (%) + Utdelnings tillväxttakt (%)',
    interpretation: 'Tolkning:',
    interpretation1: 'Chowder-nummer ≥ 12: Stark utdelnings tillväxtkandidat',
    interpretation2: 'Chowder-nummer 8-11: Bra utdelnings tillväxtkandidat',
    interpretation3: 'Chowder-nummer < 8: Kan behöva förbättras',
    searchPlaceholder: 'Ange aktiesymbol (t.ex. AAPL, MSFT)',
    searchButton: 'Sök',
    loadingData: 'Laddar företagsdata...',
    coldStartMessage:
      'Backend-servern vaknar från viloläge. Detta kan ta några extra sekunder...',
    currentYield: 'Nuvarande avkastning (%)',
    dividendGrowthRate: 'Utdelnings tillväxttakt (%)',
    chowderNumber: 'Chowder-nummer:',
    currentPrice: 'Nuvarande pris:',
    annualDividend: 'Årlig utdelning:',
    saveAnalysis: 'Spara analys',
    saveSuccess: 'Analys sparad framgångsrikt!',
    saveError: 'Misslyckades med att spara analys',
    rateLimitError:
      'Hastighetsbegränsning överskriden. Vänta ett ögonblick innan du försöker igen.',
    signInToSave: 'Logga in för att spara din analys',
    noData: 'Ingen data tillgänglig. Vänligen sök efter ett företag först.',
    breakdown: 'Uppdelning:',
    chowderScoreFor: 'Chowder-nummer för {symbol}',
    yearsOfData: 'År av data:',
  },
  saved: {
    title: 'Sparade analyser',
    ddm: 'DDM',
    chowder: 'Chowder-regeln',
    swipeToView: 'Svep för att visa sparade verktyg',
    loading: 'Laddar...',
    noSavedAnalyses: 'Inga sparade analyser hittades.',
  },
  companies: {
    searchPlaceholder:
      'Ange aktiesymbol eller företagsnamn (t.ex. AAPL, Apple, MSFT)',
    searchButton: 'Sök',
    loading: 'Laddar företagsdata...',
    coldStartMessage:
      'Backend-servern vaknar från viloläge. Detta kan ta några extra sekunder...',
    searchForCompany: 'Sök efter ett företag',
    searchDescription:
      'Ange en aktiesymbol eller företagsnamn ovan för att visa detaljerad finansiell data och nyckeltal.',
    error: 'Fel',
    high: 'Hög',
    low: 'Låg',
    open: 'Öppning',
    previousClose: 'Tidigare stängning',
    valuationRatios: 'Värderingskvoter',
    profitabilityMargins: 'Lönsamhetsmarginaler',
    perShareMetrics: 'Per aktie-nyckeltal',
    liquidityRatios: 'Likviditetskvoter',
    leverageRatios: 'Belåningskvoter',
    efficiencyRatios: 'Effektivitetskvoter',
    priceToEarnings: 'Pris-till-vinst (P/E)',
    priceToBook: 'Pris-till-bokfört värde (P/B)',
    priceToSales: 'Pris-till-försäljning (P/S)',
    priceToFreeCashFlow: 'Pris-till-fritt kassaflöde',
    priceToTangibleBookValue: 'Pris-till-materiellt bokfört värde',
    grossMargin: 'Bruttomarginal',
    operatingMargin: 'Rörelsemarginal',
    netMargin: 'Nettomarginal',
    pretaxMargin: 'Före skatt-marginal',
    freeCashFlowMargin: 'Fritt kassaflödesmarginal',
    earningsPerShare: 'Vinst per aktie',
    ebitPerShare: 'EBIT per aktie',
    salesPerShare: 'Försäljning per aktie',
    currentRatio: 'Omsättningskvot',
    quickRatio: 'Snabbkvot',
    cashRatio: 'Kassakvot',
    totalDebtToEquity: 'Total skuld till eget kapital',
    totalDebtToTotalAsset: 'Total skuld till totala tillgångar',
    totalDebtToTotalCapital: 'Total skuld till totalt kapital',
    longtermDebtToTotalAsset: 'Långfristig skuld till totala tillgångar',
    longtermDebtToTotalCapital: 'Långfristig skuld till totalt kapital',
    longtermDebtToTotalEquity: 'Långfristig skuld till eget kapital',
    netDebtToTotalCapital: 'Nettoskuld till totalt kapital',
    netDebtToTotalEquity: 'Nettoskuld till eget kapital',
    returnOnAssets: 'Avkastning på tillgångar',
    returnOnEquity: 'Avkastning på eget kapital',
    returnOnCapital: 'Avkastning på kapital',
    assetTurnover: 'Tillgångsomsättning',
    inventoryTurnover: 'Lageromsättning',
    receivablesTurnover: 'Kundfordringars omsättning',
  },
  settings: {
    title: 'Inställningar',
    theme: 'Tema',
    themeDescription: '{mode} läge',
    light: 'Ljust',
    dark: 'Mörkt',
    switchToLight: 'Växla till ljust läge',
    switchToDark: 'Växla till mörkt läge',
    currency: 'Kalkylatorvaluta',
    currencyDescription: '{name}',
    currencyNames: {
      USD: 'US Dollar ($)',
      EUR: 'Euro (€)',
      SEK: 'Svensk Krona (kr)',
      PLN: 'Polsk Zloty (zł)',
      DKK: 'Dansk Krona (kr)',
      NOK: 'Norsk Krona (kr)',
      CNY: 'Kinesisk Yuan (¥)',
      JPY: 'Japansk Yen (¥)',
    },
    language: 'Språk',
    languageDescription: '{name}',
    english: 'Engelska',
    swedish: 'Svenska',
  },
  footer: {
    importantDisclaimers: 'Viktiga ansvarsfriskrivningar',
    educationalOnly: 'Endast utbildning:',
    educationalOnlyText:
      'Denna webbplats tillhandahåller endast utbildningsinnehåll. Inget utgör investerings- eller finansiell rådgivning.',
    investmentRisks: 'Investeringsrisker:',
    investmentRisksText:
      'Alla investeringar bär risk för förlust. Tidigare resultat garanterar inte framtida resultat.',
    noLiability: 'Inget ansvar:',
    noLiabilityText:
      'Denna webbplats är inte ansvarig för eventuella förluster från beslut fattade baserat på denna information.',
    additionalInformation: 'Ytterligare information',
    dataAccuracy: 'Data noggrannhet:',
    dataAccuracyText:
      'Informationen kanske inte är korrekt eller aktuell. Konsultera kvalificerade yrkesmän innan du investerar.',
    noProfessionalRelationship: 'Inget professionellt förhållande:',
    noProfessionalRelationshipText:
      'Användning av denna webbplats skapar inget rådgivare-kundförhållande.',
    copyright: '© 2025 InvestEd. Alla rättigheter förbehållna.',
    educationalPurposes: 'Endast i utbildningssyfte.',
  },
  header: {
    searchPlaceholder: 'Sök företag...',
    switchToLight: 'Växla till ljust läge',
    switchToDark: 'Växla till mörkt läge',
    openMenu: 'Öppna meny',
    closeMenu: 'Stäng meny',
  },
  retirement: {
    desiredMonthlyIncome: 'Önskad månadsinkomst ($)',
    monthlyInvestment: 'Månadsinvestering ($)',
    dividendYield: 'Utdelningsavkastning (%)',
    capitalAppreciation: 'Kapitalvärdering (%)',
    yearsUntilIncome: 'År tills inkomst behövs (T)',
    expectedInflation: 'Förväntad årlig inflationsränta (%)',
    adjustForInflation: 'Justera för inflation',
    investmentParameters: 'Investeringsparametrar',
    results: 'Resultat',
    totalNeeded: 'Totalt behövs:',
    monthlyContribution: 'Månadsbidrag:',
    yearsToGoal: 'År till mål:',
    formulaTitle: 'Utdelningsinkomstformler',
  },
  adjustPlan: {
    title: 'Justera din plan',
    currentPlan: 'Nuvarande plan:',
    alternativePlan: 'Alternativ plan:',
    ifYouExtend:
      'Om du förlänger din tidslinje till {years} år {months} månader:',
    monthlyPayment: 'Månadsbetalning:',
  },
}
