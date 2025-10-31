package com.example.backend.controller;

import com.example.backend.dto.QuoteView;
import com.example.backend.exception.RateLimitException;
import com.example.backend.exception.SymbolNotSupportedException;
import com.example.backend.service.MarketDataService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(MarketDataController.class)
@org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc(addFilters = false)
class MarketDataControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MarketDataService marketDataService;

    @Test
    void getQuote_ValidSymbol_Returns200() throws Exception {
        QuoteView quote = new QuoteView();
        quote.setCurrentPrice(150.0);
        when(marketDataService.getQuoteSanitized("AAPL")).thenReturn(quote);

        mockMvc.perform(get("/api/market/quote/AAPL"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.currentPrice").value(150.0));
    }

    @Test
    void getFundamentals_ValidSymbol_Returns200() throws Exception {
        when(marketDataService.getBasicFinancialsSanitized("AAPL")).thenReturn(null);

        mockMvc.perform(get("/api/market/fundamentals/AAPL"))
                .andExpect(status().isOk());
    }

    @Test
    void getChowderAnalysis_ValidSymbol_Returns200() throws Exception {
        when(marketDataService.calculateChowderRule("PG")).thenReturn(null);

        mockMvc.perform(get("/api/market/chowder/PG"))
                .andExpect(status().isOk());
    }

    @Test
    void getChowderAnalysis_SymbolNotSupported_Returns400() throws Exception {
        when(marketDataService.calculateChowderRule("INVALID")).thenThrow(new SymbolNotSupportedException("Symbol not supported"));

        mockMvc.perform(get("/api/market/chowder/INVALID"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void getChowderAnalysis_RateLimit_Returns503() throws Exception {
        when(marketDataService.calculateChowderRule("PG")).thenThrow(new RateLimitException("Rate limit exceeded"));

        mockMvc.perform(get("/api/market/chowder/PG"))
                .andExpect(status().isServiceUnavailable());
    }
}

