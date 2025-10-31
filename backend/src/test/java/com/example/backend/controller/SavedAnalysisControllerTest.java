package com.example.backend.controller;

import com.example.backend.dto.SavedDdmAnalysisRequestDto;
import com.example.backend.dto.SavedDdmAnalysisResponseDto;
import com.example.backend.service.SavedDdmAnalysisService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(SavedAnalysisController.class)
class SavedAnalysisControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SavedDdmAnalysisService service;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser
    void saveAnalysis_ValidRequest_Returns201() throws Exception {
        SavedDdmAnalysisRequestDto requestDto = new SavedDdmAnalysisRequestDto(
                "AAPL", 2.0, 5.0, 8.0, null, null, 50.0, true
        );

        SavedDdmAnalysisResponseDto responseDto = SavedDdmAnalysisResponseDto.builder()
                .id(1L)
                .symbol("AAPL")
                .expectedDividend(2.0)
                .growthRate(5.0)
                .discountRate(8.0)
                .intrinsicValue(50.0)
                .isUndervalued(true)
                .createdAt(LocalDateTime.now())
                .build();

        when(service.saveAnalysis(any(SavedDdmAnalysisRequestDto.class))).thenReturn(responseDto);

        mockMvc.perform(post("/api/saved/ddm")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDto))
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.symbol").value("AAPL"));
    }

    @Test
    @WithMockUser
    void saveAnalysis_InvalidRequest_Returns400() throws Exception {
        SavedDdmAnalysisRequestDto invalidDto = new SavedDdmAnalysisRequestDto(
                "", null, null, null, null, null, null, null
        );

        mockMvc.perform(post("/api/saved/ddm")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidDto))
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser
    void getAllAnalyses_Returns200() throws Exception {
        List<SavedDdmAnalysisResponseDto> analyses = Arrays.asList(
                SavedDdmAnalysisResponseDto.builder()
                        .id(1L)
                        .symbol("AAPL")
                        .createdAt(LocalDateTime.now())
                        .build()
        );

        when(service.getAllByUserId()).thenReturn(analyses);

        mockMvc.perform(get("/api/saved/ddm"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void getAllAnalyses_Unauthenticated_Returns401() throws Exception {
        mockMvc.perform(get("/api/saved/ddm"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser
    void updateAnalysis_ValidRequest_Returns200() throws Exception {
        SavedDdmAnalysisRequestDto requestDto = new SavedDdmAnalysisRequestDto(
                "AAPL", 2.0, 5.0, 8.0, null, null, 50.0, true
        );

        SavedDdmAnalysisResponseDto responseDto = SavedDdmAnalysisResponseDto.builder()
                .id(1L)
                .symbol("AAPL")
                .intrinsicValue(50.0)
                .build();

        when(service.updateAnalysis(eq(1L), any(SavedDdmAnalysisRequestDto.class))).thenReturn(responseDto);

        mockMvc.perform(put("/api/saved/ddm/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDto))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));
    }

    @Test
    @WithMockUser
    void deleteAnalysis_ValidId_Returns204() throws Exception {
        doNothing().when(service).deleteById(1L);

        mockMvc.perform(delete("/api/saved/ddm/1")
                        .with(csrf()))
                .andExpect(status().isNoContent());

        verify(service).deleteById(1L);
    }
}

