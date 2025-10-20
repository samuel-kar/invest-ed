package com.example.backend.service;

import com.example.backend.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
     * Retrieves and sanitizes basic financials data for frontend consumption.
     * 
     * @param symbol stock symbol
     * @return sanitized financials view
     */
    public BasicFinancialsView getBasicFinancialsSanitized(String symbol) {
        BasicFinancialsDto dto = finnhubService.getBasicFinancials(symbol);
        
        // TODO: Implement caching with TTL 24h for financials
        // Consider using @Cacheable with Spring Cache + Caffeine
        
        Map<String, Object> series = dto.getSeries();
        
        // Extract the most recent values from the annual data
        return BasicFinancialsView.builder()
                .symbol(symbol)
                .peRatio(extractLatestValue(series, "peBasicExclExtraTTM"))
                .pbRatio(extractLatestValue(series, "pbQuarterly"))
                .marketCap(extractLatestValue(series, "marketCapitalization"))
                .dividendYield(extractLatestValue(series, "dividendYieldIndicatedAnnual"))
                .dividendPerShare(extractLatestValue(series, "dividendPerShareAnnual"))
                .build();
    }
    
    /**
     * Safely extracts double value from series map.
     * 
     * @param series financial data series
     * @param key metric key
     * @return double value or 0.0 if not found/invalid
     */
    private Double extractDoubleValue(Map<String, Object> series, String key) {
        if (series == null || !series.containsKey(key)) {
            return 0.0;
        }
        
        Object value = series.get(key);
        if (value instanceof Number) {
            return ((Number) value).doubleValue();
        }
        
        return 0.0;
    }
    
    /**
     * Extracts the latest value from a time series array.
     * 
     * @param series financial data series
     * @param key metric key
     * @return latest double value or 0.0 if not found/invalid
     */
    @SuppressWarnings("unchecked")
    private Double extractLatestValue(Map<String, Object> series, String key) {
        if (series == null || !series.containsKey(key)) {
            return 0.0;
        }
        
        Object value = series.get(key);
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
        
        return 0.0;
    }
}
