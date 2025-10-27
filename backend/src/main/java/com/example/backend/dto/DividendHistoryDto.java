package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Polygon API dividend history response wrapper.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DividendHistoryDto {
    
    @JsonProperty("results")
    private List<DividendDto> results;
    
    private String status;
    private Integer count;
}

