package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DdmDataView {
    private String symbol;
    private Double currentPrice;
    private Double totalDividend;
    private Integer dividendCount;
}
