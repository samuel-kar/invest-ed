package com.example.backend.service;

import com.example.backend.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Service for market data business logic and data sanitization.
 * Transforms raw Finnhub data into clean, frontend-ready views.
 */
@Service
@RequiredArgsConstructor
public class MarketDataService {
    
    private final FinnhubService finnhubService;
    
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
}

