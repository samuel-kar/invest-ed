package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * View DTO for Chowder Rule calculation results.
 * Returned to frontend with calculated score and breakdown.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChowderResultView {
    
    private Double chowderScore;      // Main Chowder score (yield + CAGR)
    private Double dividendYield;     // Dividend yield as percentage
    private Double dividendCAGR;     // Dividend CAGR as percentage
    private Integer yearsOfData;     // Number of years of data used
    private Boolean isValid;         // Whether calculation was successful
    private String message;          // Description of calculation (e.g., "5-year CAGR from 2019-2024")
    private Double currentPrice;     // Current stock price
}

