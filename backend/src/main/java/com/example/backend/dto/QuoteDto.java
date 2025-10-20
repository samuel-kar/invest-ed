package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Raw Finnhub API quote response DTO.
 * Maps directly to Finnhub's JSON response format.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuoteDto {
    
    @JsonProperty("c")
    private Double currentPrice;  // current price
    
    @JsonProperty("h")
    private Double high;          // high price of the day
    
    @JsonProperty("l")
    private Double low;           // low price of the day
    
    @JsonProperty("o")
    private Double open;          // open price of the day
    
    @JsonProperty("pc")
    private Double previousClose; // previous close price
}
