package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Comprehensive financial metrics view DTO for frontend consumption.
 * Provides all available financial metrics from Finnhub API in a clean, structured format.
 * All fields are nullable to distinguish missing data from zero values.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BasicFinancialsView {
    
    @NotBlank(message = "Symbol cannot be blank")
    private String symbol;
    
    // Valuation Ratios
    /** Price-to-Earnings ratio */
    private Double priceToEarningsRatio;
    
    /** Price-to-Book ratio */
    private Double priceToBookRatio;
    
    /** Price-to-Sales ratio */
    private Double priceToSalesRatio;
    
    /** Price-to-Free Cash Flow ratio */
    private Double priceToFreeCashFlowRatio;
    
    /** Price-to-Tangible Book Value ratio */
    private Double priceToTangibleBookValueRatio;
    
    // Profitability Margins
    /** Gross profit margin */
    private Double grossMargin;
    
    /** Operating profit margin */
    private Double operatingMargin;
    
    /** Net profit margin */
    private Double netMargin;
    
    /** Pre-tax profit margin */
    private Double pretaxMargin;
    
    /** Free cash flow margin */
    private Double freeCashFlowMargin;
    
    // Per-Share Metrics
    /** Earnings per share */
    private Double earningsPerShare;
    
    /** EBIT per share */
    private Double ebitPerShare;
    
    /** Sales per share */
    private Double salesPerShare;
    
    // TODO: These metrics may be returning total values instead of per-share values and need to be fixed
    // /** Tangible book value per share */
    // private Double tangibleBookValuePerShare;
    
    // Liquidity Ratios
    /** Current ratio */
    private Double currentRatio;
    
    /** Quick ratio */
    private Double quickRatio;
    
    /** Cash ratio */
    private Double cashRatio;
    
    // Leverage Ratios
    /** Total debt to equity */
    private Double totalDebtToEquity;
    
    /** Total debt to total assets */
    private Double totalDebtToTotalAsset;
    
    /** Total debt to total capital */
    private Double totalDebtToTotalCapital;
    
    /** Long-term debt to total assets */
    private Double longtermDebtToTotalAsset;
    
    /** Long-term debt to total capital */
    private Double longtermDebtToTotalCapital;
    
    /** Long-term debt to total equity */
    private Double longtermDebtToTotalEquity;
    
    /** Net debt to total capital */
    private Double netDebtToTotalCapital;
    
    /** Net debt to total equity */
    private Double netDebtToTotalEquity;
    
    // Efficiency Ratios
    /** Return on assets */
    private Double returnOnAssets;
    
    /** Return on equity */
    private Double returnOnEquity;
    
    /** Return on invested capital */
    private Double returnOnInvestedCapital;
    
    /** Return on total capital */
    private Double returnOnTotalCapital;
    
    /** Inventory turnover */
    private Double inventoryTurnover;
    
    /** Receivables turnover */
    private Double receivablesTurnover;
    
    // Valuation Metrics
    /** Enterprise value */
    private Double enterpriseValue;
    
    /** Enterprise value to EBITDA */
    private Double evToEbitda;
    
    /** Enterprise value to revenue */
    private Double evToRevenue;
    
    // Other Metrics
    /** Payout ratio (percentage of earnings paid as dividends) */
    private Double payoutRatio;
    
    // TODO: These metrics may be returning total values instead of per-share values and need to be fixed
    // /** Book value per share */
    // private Double bookValuePerShare;
    
    /** Selling, general & administrative expenses to sales */
    private Double sgaToSale;
    
    /** Total ratio */
    private Double totalRatio;
}
