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
public class SavedChowderAnalysisRequestDto {
    
    @NotBlank(message = "Symbol is required")
    private String symbol;
    
    @NotNull(message = "Chowder score is required")
    @Positive(message = "Chowder score must be positive")
    private Double chowderScore;
    
    private Double dividendYield;
    
    private Double dividendCAGR;
    
    private Integer yearsOfData;
    
    private Double currentPrice;
    
    private String message;
}

