package com.example.backend.controller;

import com.example.backend.dto.BasicFinancialsView;
import com.example.backend.dto.ChowderResultView;
import com.example.backend.dto.DdmDataView;
import com.example.backend.dto.QuoteView;
import com.example.backend.exception.RateLimitException;
import com.example.backend.exception.SymbolNotSupportedException;
import com.example.backend.service.MarketDataService;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * REST controller for market data endpoints.
 * Provides access to stock quotes, historical data, and financial metrics.
 */
@RestController
@RequestMapping("/api/market")
@RequiredArgsConstructor
@Validated
public class MarketDataController {
    
    private final MarketDataService marketDataService;
    
    /**
     * Retrieves current quote for a stock symbol.
     * 
     * @param symbol stock symbol (e.g., AAPL, MSFT)
     * @return current quote data
     */
    @GetMapping("/quote/{symbol}")
    public ResponseEntity<QuoteView> getQuote(
            @PathVariable @NotBlank(message = "Symbol cannot be blank") String symbol) {
        
        QuoteView quote = marketDataService.getQuoteSanitized(symbol);
        return ResponseEntity.ok(quote);
    }
    
    
    /**
     * Retrieves basic financial metrics for a stock symbol.
     * 
     * @param symbol stock symbol (e.g., AAPL, MSFT)
     * @return basic financials data
     */
    @GetMapping("/fundamentals/{symbol}")
    public ResponseEntity<BasicFinancialsView> getFundamentals(
            @PathVariable @NotBlank(message = "Symbol cannot be blank") String symbol) {
        
        BasicFinancialsView fundamentals = marketDataService.getBasicFinancialsSanitized(symbol);
        return ResponseEntity.ok(fundamentals);
    }
    
    
    /**
     * Calculates Chowder Rule score for a stock symbol.
     * The Chowder Rule combines dividend yield and dividend growth rate (CAGR).
     * 
     * @param symbol stock symbol (e.g., PG, KO, JNJ)
     * @return Chowder Rule calculation results
     */
    @GetMapping("/chowder/{symbol}")
    public ResponseEntity<?> getChowderAnalysis(
            @PathVariable @NotBlank(message = "Symbol cannot be blank") String symbol) {
        
        try {
            System.out.println("Received request for chowder analysis: " + symbol);
            ChowderResultView result = marketDataService.calculateChowderRule(symbol);
            System.out.println("Successfully calculated chowder for: " + symbol);
            return ResponseEntity.ok(result);
        } catch (SymbolNotSupportedException e) {
            System.err.println("Error calculating chowder for " + symbol + ": " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        } catch (RateLimitException e) {
            System.err.println("Error calculating chowder for " + symbol + ": " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).build();
        } catch (Exception e) {
            System.err.println("Error calculating chowder for " + symbol + ": " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
    
    
    /**
     * Retrieves DDM data for a stock symbol.
     * Provides current price and TTM dividend data for DDM analysis.
     * 
     * @param symbol stock symbol (e.g., PG, KO, JNJ)
     * @return DDM data with price and dividend information
     */
    @GetMapping("/ddm/{symbol}")
    public ResponseEntity<?> getDdmData(
            @PathVariable @NotBlank(message = "Symbol cannot be blank") String symbol) {
        
        try {
            System.out.println("Received request for DDM data: " + symbol);
            DdmDataView result = marketDataService.getDdmData(symbol);
            System.out.println("Successfully fetched DDM data for: " + symbol);
            return ResponseEntity.ok(result);
        } catch (SymbolNotSupportedException e) {
            System.err.println("Error fetching DDM data for " + symbol + ": " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        } catch (RateLimitException e) {
            System.err.println("Error fetching DDM data for " + symbol + ": " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).build();
        } catch (Exception e) {
            System.err.println("Error fetching DDM data for " + symbol + ": " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
    
    
}
