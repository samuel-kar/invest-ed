package com.example.backend.controller;

import com.example.backend.dto.SavedDdmAnalysisRequestDto;
import com.example.backend.dto.SavedDdmAnalysisResponseDto;
import com.example.backend.service.SavedDdmAnalysisService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing saved DDM analyses.
 * All endpoints require authentication via JWT.
 */
@RestController
@RequestMapping("/api/saved/ddm")
@RequiredArgsConstructor
public class SavedAnalysisController {

    private final SavedDdmAnalysisService service;

    /**
     * Saves a new DDM analysis for the authenticated user.
     */
    @PostMapping
    public ResponseEntity<SavedDdmAnalysisResponseDto> saveAnalysis(
            @Valid @RequestBody SavedDdmAnalysisRequestDto requestDto) {
        SavedDdmAnalysisResponseDto saved = service.saveAnalysis(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    /**
     * Retrieves all DDM analyses for the authenticated user.
     */
    @GetMapping
    public ResponseEntity<List<SavedDdmAnalysisResponseDto>> getAllAnalyses() {
        List<SavedDdmAnalysisResponseDto> analyses = service.getAllByUserId();
        return ResponseEntity.ok(analyses);
    }

    /**
     * Updates an existing DDM analysis. User can only update their own analyses.
     */
    @PutMapping("/{id}")
    public ResponseEntity<SavedDdmAnalysisResponseDto> updateAnalysis(
            @PathVariable Long id,
            @Valid @RequestBody SavedDdmAnalysisRequestDto requestDto) {
        SavedDdmAnalysisResponseDto updated = service.updateAnalysis(id, requestDto);
        return ResponseEntity.ok(updated);
    }

    /**
     * Deletes a DDM analysis. User can only delete their own analyses.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnalysis(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

