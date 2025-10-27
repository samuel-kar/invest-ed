package com.example.backend.service;

import com.example.backend.dto.DividendDto;
import com.example.backend.dto.DividendHistoryDto;
import com.example.backend.dto.StockSplitDto;
import com.example.backend.dto.StockSplitsDto;
import com.example.backend.exception.RateLimitException;
import com.example.backend.exception.SymbolNotSupportedException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.function.Consumer;

/**
 * Service for interacting with Polygon API.
 * Handles dividend history and stock splits data fetching.
 */
@Service
public class PolygonService {
    
    private final RestTemplate restTemplate;
    private final String apiKey;
    
    public PolygonService(@Qualifier("polygonRestTemplate") RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
        this.apiKey = System.getenv("POLYGON_API_KEY");
        
        if (apiKey == null || apiKey.trim().isEmpty()) {
            throw new IllegalStateException("POLYGON_API_KEY environment variable is required");
        }
    }
    
    /**
     * Builds URI with Polygon API key appended.
     * 
     * @param path API endpoint path
     * @param customizer additional query parameters
     * @return complete URI with authentication
     */
    private URI buildUri(String path, Consumer<UriComponentsBuilder> customizer) {
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(path)
                .queryParam("apiKey", apiKey);
        
        if (customizer != null) {
            customizer.accept(builder);
        }
        
        return builder.build(true).toUri();
    }
    
    /**
     * Fetches dividend history for a symbol from the last 6 years.
     * Returns dividends sorted by ex-dividend date (descending).
     * 
     * @param symbol stock symbol
     * @return list of dividends
     * @throws RateLimitException if rate limit exceeded
     * @throws SymbolNotSupportedException if symbol not supported
     */
    public List<DividendDto> fetchDividendHistory(String symbol, String fromDate) {
        String path = "/v3/reference/dividends";
        
        URI uri = buildUri(path, b -> b
                .queryParam("ticker", symbol)
                .queryParam("ex_dividend_date.gte", fromDate)
                .queryParam("limit", 1000));
        
        try {
            DividendHistoryDto response = restTemplate.getForObject(uri, DividendHistoryDto.class);
            
            if (response == null || response.getResults() == null) {
                return List.of();
            }
            
            return response.getResults();
        } catch (HttpClientErrorException.TooManyRequests e) {
            throw new RateLimitException("Polygon API rate limit exceeded", e);
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.BAD_REQUEST || 
                e.getStatusCode() == HttpStatus.NOT_FOUND) {
                throw new SymbolNotSupportedException(symbol, e);
            }
            throw new RuntimeException("Unexpected error calling Polygon API", e);
        }
    }
    
    /**
     * Fetches stock splits history for a symbol from a given date.
     * 
     * @param symbol stock symbol
     * @param fromDate start date (ISO format: YYYY-MM-DD)
     * @return list of stock splits
     * @throws RateLimitException if rate limit exceeded
     * @throws SymbolNotSupportedException if symbol not supported
     */
    public List<StockSplitDto> fetchStockSplits(String symbol, String fromDate) {
        String path = "/v3/reference/splits";
        
        URI uri = buildUri(path, b -> b
                .queryParam("ticker", symbol)
                .queryParam("execution_date.gte", fromDate)
                .queryParam("limit", 100));
        
        try {
            StockSplitsDto response = restTemplate.getForObject(uri, StockSplitsDto.class);
            
            if (response == null || response.getResults() == null) {
                return List.of();
            }
            
            return response.getResults();
        } catch (HttpClientErrorException.TooManyRequests e) {
            throw new RateLimitException("Polygon API rate limit exceeded", e);
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.BAD_REQUEST || 
                e.getStatusCode() == HttpStatus.NOT_FOUND) {
                throw new SymbolNotSupportedException(symbol, e);
            }
            throw new RuntimeException("Unexpected error calling Polygon API", e);
        }
    }
}

