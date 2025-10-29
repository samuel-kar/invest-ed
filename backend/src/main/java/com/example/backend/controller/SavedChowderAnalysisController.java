package com.example.backend.controller;

import com.example.backend.dto.SavedChowderAnalysisRequestDto;
import com.example.backend.dto.SavedChowderAnalysisResponseDto;
import com.example.backend.service.SavedChowderAnalysisService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing saved Chowder analyses.
 * All endpoints require authentication via JWT.
 */
@RestController
@RequestMapping("/api/saved/chowder")
@RequiredArgsConstructor
public class SavedChowderAnalysisController {

    private final SavedChowderAnalysisService service;

    /**
     * Saves a new Chowder analysis for the authenticated user.
     */
    @PostMapping
    public ResponseEntity<SavedChowderAnalysisResponseDto> saveAnalysis(
            @Valid @RequestBody SavedChowderAnalysisRequestDto requestDto) {
        SavedChowderAnalysisResponseDto saved = service.saveAnalysis(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    /**
     * Retrieves all Chowder analyses for the authenticated user.
     */
    @GetMapping
    public ResponseEntity<List<SavedChowderAnalysisResponseDto>> getAllAnalyses() {
        List<SavedChowderAnalysisResponseDto> analyses = service.getAllByUserId();
        return ResponseEntity.ok(analyses);
    }

    /**
     * Updates an existing Chowder analysis. User can only update their own analyses.
     */
    @PutMapping("/{id}")
    public ResponseEntity<SavedChowderAnalysisResponseDto> updateAnalysis(
            @PathVariable Long id,
            @Valid @RequestBody SavedChowderAnalysisRequestDto requestDto) {
        SavedChowderAnalysisResponseDto updated = service.updateAnalysis(id, requestDto);
        return ResponseEntity.ok(updated);
    }

    /**
     * Deletes a Chowder analysis. User can only delete their own analyses.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnalysis(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

