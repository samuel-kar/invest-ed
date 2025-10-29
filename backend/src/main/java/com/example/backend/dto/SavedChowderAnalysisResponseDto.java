package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SavedChowderAnalysisResponseDto {
    
    private Long id;
    private String symbol;
    private Double chowderScore;
    private Double dividendYield;
    private Double dividendCAGR;
    private Integer yearsOfData;
    private Double currentPrice;
    private String message;
    private LocalDateTime createdAt;
}

