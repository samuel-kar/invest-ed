package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SavedDdmAnalysisResponseDto {
    
    private Long id;
    private String symbol;
    private Double expectedDividend;
    private Double growthRate;
    private Double discountRate;
    private Double totalDividend;
    private Double currentPrice;
    private Double intrinsicValue;
    private Boolean isUndervalued;
    private LocalDateTime createdAt;
}

