package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Polygon API stock split response DTO.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockSplitDto {
    
    @JsonProperty("execution_date")
    private String executionDate;
    
    @JsonProperty("split_to")
    private Integer splitTo;
    
    @JsonProperty("split_from")
    private Integer splitFrom;
}

