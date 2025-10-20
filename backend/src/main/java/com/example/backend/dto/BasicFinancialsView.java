package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Sanitized basic financials view DTO for frontend consumption.
 * Provides clean financial metrics without Finnhub-specific structure.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BasicFinancialsView {
    
    @NotBlank(message = "Symbol cannot be blank")
    private String symbol;
    
    @PositiveOrZero(message = "PE ratio must be positive or zero")
    private Double peRatio;
    
    @PositiveOrZero(message = "PB ratio must be positive or zero")
    private Double pbRatio;
    
    @PositiveOrZero(message = "Enterprise value must be positive or zero")
    private Double marketCap; // Maps to Enterprise Value (ev) from Finnhub
    
    @PositiveOrZero(message = "Payout ratio must be positive or zero")
    private Double dividendYield; // Maps to Payout Ratio from Finnhub
    
    @PositiveOrZero(message = "Earnings per share must be positive or zero")
    private Double dividendPerShare; // Maps to Earnings Per Share (eps) from Finnhub
}
