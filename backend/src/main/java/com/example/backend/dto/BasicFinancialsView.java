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
    
    @PositiveOrZero(message = "Market cap must be positive or zero")
    private Double marketCap;
    
    @PositiveOrZero(message = "Dividend yield must be positive or zero")
    private Double dividendYield;
    
    @PositiveOrZero(message = "Dividend per share must be positive or zero")
    private Double dividendPerShare;
}
