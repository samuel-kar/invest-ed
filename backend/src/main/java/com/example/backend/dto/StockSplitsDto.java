package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Polygon API stock splits response wrapper.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockSplitsDto {
    
    @JsonProperty("results")
    private List<StockSplitDto> results;
    
    private String status;
    private Integer count;
}

