package com.example.backend.service;

import com.example.backend.dto.BasicFinancialsDto;
import com.example.backend.dto.QuoteDto;
import com.example.backend.exception.RateLimitException;
import com.example.backend.exception.SymbolNotSupportedException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.function.Consumer;

/**
 * Service for interacting with Finnhub API.
 * Handles all external API calls and error mapping.
 */
@Service
public class FinnhubService {
    
    private final RestTemplate restTemplate;
    private final String apiKey;
    
    public FinnhubService(@Qualifier("finnhubRestTemplate") RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
        this.apiKey = System.getenv("FINNHUB_API_KEY");
        
        if (apiKey == null || apiKey.trim().isEmpty()) {
            throw new IllegalStateException("FINNHUB_API_KEY environment variable is required");
        }
    }
    
    /**
     * Builds URI with Finnhub API token appended.
     * 
     * @param path API endpoint path
     * @param customizer additional query parameters
     * @return complete URI with authentication
     */
    private URI buildUri(String path, Consumer<UriComponentsBuilder> customizer) {
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString("https://finnhub.io/api/v1" + path)
                .queryParam("token", apiKey);
        
        if (customizer != null) {
            customizer.accept(builder);
        }
        
        return builder.build(true).toUri();
    }
    
    /**
     * Retrieves current quote for a symbol.
     * 
     * @param symbol stock symbol
     * @return quote data
     * @throws RateLimitException if rate limit exceeded
     * @throws SymbolNotSupportedException if symbol not supported
     */
    public QuoteDto getQuote(String symbol) {
        URI uri = buildUri("/quote", b -> b.queryParam("symbol", symbol));
        
        try {
            return restTemplate.getForObject(uri, QuoteDto.class);
        } catch (HttpClientErrorException.TooManyRequests e) {
            throw new RateLimitException("Finnhub API rate limit exceeded", e);
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.BAD_REQUEST || 
                e.getStatusCode() == HttpStatus.NOT_FOUND) {
                throw new SymbolNotSupportedException(symbol, e);
            }
            throw new RuntimeException("Unexpected error calling Finnhub API", e);
        }
    }
    
    
    /**
     * Retrieves basic financials for a symbol.
     * 
     * @param symbol stock symbol
     * @return financials data
     * @throws RateLimitException if rate limit exceeded
     * @throws SymbolNotSupportedException if symbol not supported
     */
    public BasicFinancialsDto getBasicFinancials(String symbol) {
        URI uri = buildUri("/stock/metric", b -> b
                .queryParam("symbol", symbol)
                .queryParam("metric", "all"));
        
        try {
            return restTemplate.getForObject(uri, BasicFinancialsDto.class);
        } catch (HttpClientErrorException.TooManyRequests e) {
            throw new RateLimitException("Finnhub API rate limit exceeded", e);
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.BAD_REQUEST || 
                e.getStatusCode() == HttpStatus.NOT_FOUND) {
                throw new SymbolNotSupportedException(symbol, e);
            }
            throw new RuntimeException("Unexpected error calling Finnhub API", e);
        }
    }
}
