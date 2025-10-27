package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Polygon API dividend response DTO.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DividendDto {
    
    @JsonProperty("cash_amount")
    private Double cashAmount;
    
    @JsonProperty("ex_dividend_date")
    private String exDividendDate;
}

