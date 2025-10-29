package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SavedDdmAnalysisRequestDto {
    
    @NotBlank(message = "Symbol is required")
    private String symbol;
    
    @NotNull(message = "Expected dividend is required")
    @Positive(message = "Expected dividend must be positive")
    private Double expectedDividend;
    
    @NotNull(message = "Growth rate is required")
    @Positive(message = "Growth rate must be positive")
    private Double growthRate;
    
    @NotNull(message = "Discount rate is required")
    @Positive(message = "Discount rate must be positive")
    private Double discountRate;
    
    private Double totalDividend;
    private Double currentPrice;
    
    @NotNull(message = "Intrinsic value is required")
    private Double intrinsicValue;
    
    @NotNull(message = "Undervalued status is required")
    private Boolean isUndervalued;
}

