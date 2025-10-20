package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

/**
 * Raw Finnhub API basic financials response DTO.
 * Maps directly to Finnhub's JSON response format for financial metrics.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BasicFinancialsDto {
    
    @JsonProperty("symbol")
    private String symbol;
    
    @JsonProperty("metricType")
    private String metricType;
    
    @JsonProperty("series")
    private Map<String, Object> series;  // financial metrics as key-value pairs
}
