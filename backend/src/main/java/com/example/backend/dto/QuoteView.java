package com.example.backend.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Sanitized quote view DTO for frontend consumption.
 * Provides clean, validated data without Finnhub-specific field names.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuoteView {
    
    @NotNull(message = "Current price cannot be null")
    @Positive(message = "Current price must be positive")
    private Double currentPrice;
    
    @NotNull(message = "High price cannot be null")
    @Positive(message = "High price must be positive")
    private Double high;
    
    @NotNull(message = "Low price cannot be null")
    @Positive(message = "Low price must be positive")
    private Double low;
    
    @NotNull(message = "Open price cannot be null")
    @Positive(message = "Open price must be positive")
    private Double open;
    
    @NotNull(message = "Previous close cannot be null")
    @Positive(message = "Previous close must be positive")
    private Double previousClose;
}
