package com.example.backend.service;

import com.example.backend.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Service for market data business logic and data sanitization.
 * Transforms raw Finnhub data into clean, frontend-ready views.
 */
@Service
@RequiredArgsConstructor
public class MarketDataService {
    
    private final FinnhubService finnhubService;
    private final PolygonService polygonService;
    
    /**
     * Retrieves and sanitizes quote data for frontend consumption.
     * 
     * @param symbol stock symbol
     * @return sanitized quote view
     */
    public QuoteView getQuoteSanitized(String symbol) {
        QuoteDto dto = finnhubService.getQuote(symbol);
        
        // TODO: Implement caching with TTL 15-60s for quotes
        // Consider using @Cacheable with Spring Cache + Caffeine
        
        return QuoteView.builder()
                .currentPrice(dto.getCurrentPrice())
                .high(dto.getHigh())
                .low(dto.getLow())
                .open(dto.getOpen())
                .previousClose(dto.getPreviousClose())
                .build();
    }
    
    
    
    /**
     * Retrieves and sanitizes comprehensive financials data for frontend consumption.
     * Extracts all 37+ available financial metrics from Finnhub API.
     * 
     * @param symbol stock symbol
     * @return sanitized financials view with all available metrics
     */
    public BasicFinancialsView getBasicFinancialsSanitized(String symbol) {
        BasicFinancialsDto dto = finnhubService.getBasicFinancials(symbol);
        
        // TODO: Implement caching with TTL 24h for financials
        // Consider using @Cacheable with Spring Cache + Caffeine
        
        Map<String, Object> series = dto.getSeries();
        
        // Extract all available financial metrics from the annual data
        return BasicFinancialsView.builder()
                .symbol(symbol)
                
                // Valuation Ratios
                .priceToEarningsRatio(extractLatestValueFromAnnual(series, "pe"))
                .priceToBookRatio(extractLatestValueFromAnnual(series, "pb"))
                .priceToSalesRatio(extractLatestValueFromAnnual(series, "ps"))
                .priceToFreeCashFlowRatio(extractLatestValueFromAnnual(series, "pfcf"))
                .priceToTangibleBookValueRatio(extractLatestValueFromAnnual(series, "ptbv"))
                
                // Profitability Margins
                .grossMargin(extractLatestValueFromAnnual(series, "grossMargin"))
                .operatingMargin(extractLatestValueFromAnnual(series, "operatingMargin"))
                .netMargin(extractLatestValueFromAnnual(series, "netMargin"))
                .pretaxMargin(extractLatestValueFromAnnual(series, "pretaxMargin"))
                .freeCashFlowMargin(extractLatestValueFromAnnual(series, "fcfMargin"))
                
                // Per-Share Metrics
                .earningsPerShare(extractLatestValueFromAnnual(series, "eps"))
                .ebitPerShare(extractLatestValueFromAnnual(series, "ebitPerShare"))
                .salesPerShare(extractLatestValueFromAnnual(series, "salesPerShare"))
                // TODO: These metrics may be returning total values instead of per-share values and need to be fixed
                // .tangibleBookValuePerShare(convertFromMillions(extractLatestValueFromAnnual(series, "tangibleBookValue")))
                
                // Liquidity Ratios
                .currentRatio(extractLatestValueFromAnnual(series, "currentRatio"))
                .quickRatio(extractLatestValueFromAnnual(series, "quickRatio"))
                .cashRatio(extractLatestValueFromAnnual(series, "cashRatio"))
                
                // Leverage Ratios
                .totalDebtToEquity(extractLatestValueFromAnnual(series, "totalDebtToEquity"))
                .totalDebtToTotalAsset(extractLatestValueFromAnnual(series, "totalDebtToTotalAsset"))
                .totalDebtToTotalCapital(extractLatestValueFromAnnual(series, "totalDebtToTotalCapital"))
                .longtermDebtToTotalAsset(extractLatestValueFromAnnual(series, "longtermDebtTotalAsset"))
                .longtermDebtToTotalCapital(extractLatestValueFromAnnual(series, "longtermDebtTotalCapital"))
                .longtermDebtToTotalEquity(extractLatestValueFromAnnual(series, "longtermDebtTotalEquity"))
                .netDebtToTotalCapital(extractLatestValueFromAnnual(series, "netDebtToTotalCapital"))
                .netDebtToTotalEquity(extractLatestValueFromAnnual(series, "netDebtToTotalEquity"))
                
                // Efficiency Ratios
                .returnOnAssets(extractLatestValueFromAnnual(series, "roa"))
                .returnOnEquity(extractLatestValueFromAnnual(series, "roe"))
                .returnOnInvestedCapital(extractLatestValueFromAnnual(series, "roic"))
                .returnOnTotalCapital(extractLatestValueFromAnnual(series, "rotc"))
                .inventoryTurnover(extractLatestValueFromAnnual(series, "inventoryTurnover"))
                .receivablesTurnover(extractLatestValueFromAnnual(series, "receivablesTurnover"))
                
                // Valuation Metrics (convert from millions to absolute values)
                .enterpriseValue(convertFromMillions(extractLatestValueFromAnnual(series, "ev")))
                .evToEbitda(extractLatestValueFromAnnual(series, "evEbitda"))
                .evToRevenue(extractLatestValueFromAnnual(series, "evRevenue"))
                
                // Other Metrics (convert from millions to absolute values)
                .payoutRatio(extractLatestValueFromAnnual(series, "payoutRatio"))
                // TODO: These metrics may be returning total values instead of per-share values and need to be fixed
                // .bookValuePerShare(convertFromMillions(extractLatestValueFromAnnual(series, "bookValue")))
                .sgaToSale(extractLatestValueFromAnnual(series, "sgaToSale"))
                .totalRatio(extractLatestValueFromAnnual(series, "totalRatio"))
                
                .build();
    }
    
    
    /**
     * Extracts the latest value from annual financial data.
     * The Finnhub API returns financial metrics nested under an "annual" key.
     * 
     * @param series financial data series
     * @param key metric key
     * @return latest double value or null if not found/invalid
     */
    @SuppressWarnings("unchecked")
    private Double extractLatestValueFromAnnual(Map<String, Object> series, String key) {
        if (series == null || !series.containsKey("annual")) {
            return null;
        }
        
        Object annualData = series.get("annual");
        if (!(annualData instanceof Map)) {
            return null;
        }
        
        Map<String, Object> annualMap = (Map<String, Object>) annualData;
        if (!annualMap.containsKey(key)) {
            return null;
        }
        
        Object value = annualMap.get(key);
        
        if (value instanceof java.util.List) {
            java.util.List<Map<String, Object>> list = (java.util.List<Map<String, Object>>) value;
            if (!list.isEmpty()) {
                Map<String, Object> latest = list.get(0); // First item is most recent
                Object v = latest.get("v");
                if (v instanceof Number) {
                    return ((Number) v).doubleValue();
                }
            }
        }
        
        return null;
    }
    
    /**
     * Converts values from millions to absolute values.
     * Finnhub returns certain metrics (enterprise value, book value, etc.) in millions.
     * 
     * @param valueInMillions value in millions, or null if not available
     * @return value in absolute units, or null if input was null
     */
    private Double convertFromMillions(Double valueInMillions) {
        if (valueInMillions == null) {
            return null;
        }
        return valueInMillions * 1_000_000; // Convert millions to absolute value
    }
    
    
    /**
     * Calculates Chowder Rule score for a given stock symbol.
     * Fetches current price, dividend history, adjusts for splits, and calculates the score.
     * 
     * @param symbol stock symbol
     * @return ChowderRuleResult with score, breakdown, and metadata
     */
    public ChowderResultView calculateChowderRule(String symbol) {
        // Fetch current price
        QuoteView quote = getQuoteSanitized(symbol);
        Double currentPrice = quote.getCurrentPrice();
        
        if (currentPrice == null || currentPrice <= 0) {
            return ChowderResultView.builder()
                    .chowderScore(null)
                    .dividendYield(null)
                    .dividendCAGR(null)
                    .yearsOfData(0)
                    .isValid(false)
                    .message("Unable to fetch current price for " + symbol)
                    .currentPrice(null)
                    .build();
        }
        
        // Fetch dividend history from last 6 years (to ensure we have 5-year data)
        int currentYear = java.time.LocalDate.now().getYear();
        int lastCompleteYear = currentYear - 1;
        String fromDate = (lastCompleteYear - 6) + "-01-01"; // Start from 6 years before last complete year
        
        List<DividendDto> dividends = polygonService.fetchDividendHistory(symbol, fromDate);
        List<StockSplitDto> splits = polygonService.fetchStockSplits(symbol, fromDate);
        
        if (dividends == null || dividends.isEmpty()) {
            return ChowderResultView.builder()
                    .chowderScore(null)
                    .dividendYield(null)
                    .dividendCAGR(null)
                    .yearsOfData(0)
                    .isValid(false)
                    .message("No dividend data available for " + symbol)
                    .currentPrice(currentPrice)
                    .build();
        }
        
        // Adjust dividends for stock splits
        List<DividendDto> adjustedDividends = adjustDividendsForSplits(dividends, splits);
        
        // Calculate Chowder score
        return calculateChowderScore(adjustedDividends, currentPrice);
    }
    
    /**
     * Adjusts dividends for stock splits by dividing dividends that occurred before splits
     * by the split ratio. This ensures historical dividends are on a consistent share basis.
     * 
     * @param dividends list of dividends
     * @param splits list of stock splits
     * @return adjusted dividends
     */
    private List<DividendDto> adjustDividendsForSplits(List<DividendDto> dividends, List<StockSplitDto> splits) {
        if (splits == null || splits.isEmpty()) {
            return dividends;
        }
        
        // Sort splits by execution date (ascending)
        List<StockSplitDto> sortedSplits = splits.stream()
                .sorted((a, b) -> a.getExecutionDate().compareTo(b.getExecutionDate()))
                .toList();
        
        // For each dividend, apply all splits that occurred after its ex-dividend date
        return dividends.stream()
                .map(dividend -> {
                    double factor = 1.0;
                    
                    for (StockSplitDto split : sortedSplits) {
                        // If split happened after the dividend ex-date, we need to adjust that past dividend
                        if (split.getExecutionDate().compareTo(dividend.getExDividendDate()) > 0) {
                            double splitTo = split.getSplitTo() != null ? split.getSplitTo().doubleValue() : 0;
                            double splitFrom = split.getSplitFrom() != null ? split.getSplitFrom().doubleValue() : 0;
                            
                            if (splitTo > 0 && splitFrom > 0) {
                                factor *= splitTo / splitFrom;
                            }
                        }
                    }
                    
                    if (factor == 1.0) {
                        return dividend;
                    }
                    
                    // Adjust the dividend amount
                    double adjustedAmount = dividend.getCashAmount() / factor;
                    return new DividendDto(adjustedAmount, dividend.getExDividendDate());
                })
                .toList();
    }
    
    /**
     * Calculates Chowder score from adjusted dividends.
     * Groups dividends by year, calculates TTM yield and CAGR.
     * 
     * @param dividends adjusted dividend list
     * @param currentPrice current stock price
     * @return ChowderRuleResult with calculated values
     */
    private ChowderResultView calculateChowderScore(List<DividendDto> dividends, Double currentPrice) {
        // Group dividends by calendar year
        Map<String, Double> dividendsByYear = new java.util.HashMap<>();
        
        for (DividendDto dividend : dividends) {
            if (dividend.getCashAmount() != null && dividend.getExDividendDate() != null) {
                String year = dividend.getExDividendDate().substring(0, 4);
                double amount = dividend.getCashAmount();
                dividendsByYear.put(year, dividendsByYear.getOrDefault(year, 0.0) + amount);
            }
        }
        
        int yearsOfData = dividendsByYear.size();
        
        if (yearsOfData < 2) {
            return ChowderResultView.builder()
                    .chowderScore(null)
                    .dividendYield(null)
                    .dividendCAGR(null)
                    .yearsOfData(yearsOfData)
                    .isValid(false)
                    .message("Insufficient dividend history (need at least 2 years)")
                    .currentPrice(currentPrice)
                    .build();
        }
        
        // Calculate TTM dividend yield (dividends from last 365 days)
        java.time.LocalDate oneYearAgo = java.time.LocalDate.now().minusDays(365);
        double ttmDividends = dividends.stream()
                .filter(d -> d.getExDividendDate() != null && 
                        d.getExDividendDate().compareTo(oneYearAgo.toString()) >= 0)
                .mapToDouble(d -> d.getCashAmount() != null ? d.getCashAmount() : 0.0)
                .sum();
        
        double dividendYield = (ttmDividends / currentPrice) * 100;
        
        // Calculate dividend CAGR
        int currentYearNum = java.time.LocalDate.now().getYear();
        int lastCompleteYear = currentYearNum - 1;
        String lastCompleteYearStr = String.valueOf(lastCompleteYear);
        
        double dividendCAGR = 0.0;
        int cagrYears = 0;
        String fromYear = "";
        
        // Try 5-year CAGR first
        String fiveYearsAgo = String.valueOf(lastCompleteYear - 5);
        if (dividendsByYear.containsKey(fiveYearsAgo) && dividendsByYear.containsKey(lastCompleteYearStr)) {
            double startDividend = dividendsByYear.get(fiveYearsAgo);
            double endDividend = dividendsByYear.get(lastCompleteYearStr);
            
            if (startDividend > 0 && endDividend > 0) {
                cagrYears = 5;
                fromYear = fiveYearsAgo;
                dividendCAGR = (Math.pow(endDividend / startDividend, 1.0 / 5) - 1) * 100;
            }
        }
        
        // Fall back to 3-year CAGR if 5-year isn't available
        if (cagrYears == 0) {
            String threeYearsAgo = String.valueOf(lastCompleteYear - 3);
            if (dividendsByYear.containsKey(threeYearsAgo) && dividendsByYear.containsKey(lastCompleteYearStr)) {
                double startDividend = dividendsByYear.get(threeYearsAgo);
                double endDividend = dividendsByYear.get(lastCompleteYearStr);
                
                if (startDividend > 0 && endDividend > 0) {
                    cagrYears = 3;
                    fromYear = threeYearsAgo;
                    dividendCAGR = (Math.pow(endDividend / startDividend, 1.0 / 3) - 1) * 100;
                }
            }
        }
        
        if (cagrYears == 0) {
            return ChowderResultView.builder()
                    .chowderScore(null)
                    .dividendYield(dividendYield)
                    .dividendCAGR(null)
                    .yearsOfData(yearsOfData)
                    .isValid(false)
                    .message("Unable to calculate dividend CAGR")
                    .currentPrice(currentPrice)
                    .build();
        }
        
        double chowderScore = dividendYield + dividendCAGR;
        
        String message = String.format(
                "Chowder Rule calculated using %d-year dividend CAGR (%s-%s)",
                cagrYears, fromYear, lastCompleteYearStr);
        
        return ChowderResultView.builder()
                .chowderScore(chowderScore)
                .dividendYield(dividendYield)
                .dividendCAGR(dividendCAGR)
                .yearsOfData(yearsOfData)
                .isValid(true)
                .message(message)
                .currentPrice(currentPrice)
                .build();
    }
}

