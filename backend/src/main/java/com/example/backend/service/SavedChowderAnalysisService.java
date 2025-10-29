package com.example.backend.service;

import com.example.backend.dto.SavedChowderAnalysisRequestDto;
import com.example.backend.dto.SavedChowderAnalysisResponseDto;
import com.example.backend.model.ChowderAnalysis;
import com.example.backend.repository.ChowderAnalysisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SavedChowderAnalysisService {

    private final ChowderAnalysisRepository repository;

    /**
     * Saves a new Chowder analysis for the authenticated user.
     */
    @Transactional
    public SavedChowderAnalysisResponseDto saveAnalysis(SavedChowderAnalysisRequestDto requestDto) {
        String userId = getCurrentUserId();
        
        ChowderAnalysis analysis = new ChowderAnalysis();
        analysis.setUserId(userId);
        analysis.setSymbol(requestDto.getSymbol());
        analysis.setChowderScore(requestDto.getChowderScore());
        analysis.setDividendYield(requestDto.getDividendYield());
        analysis.setDividendCAGR(requestDto.getDividendCAGR());
        analysis.setYearsOfData(requestDto.getYearsOfData());
        analysis.setCurrentPrice(requestDto.getCurrentPrice());
        analysis.setMessage(requestDto.getMessage());
        
        ChowderAnalysis saved = repository.save(analysis);
        return toResponseDto(saved);
    }

    /**
     * Retrieves all Chowder analyses for the authenticated user.
     */
    public List<SavedChowderAnalysisResponseDto> getAllByUserId() {
        String userId = getCurrentUserId();
        return repository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());
    }

    /**
     * Updates an existing Chowder analysis. Ensures user can only update their own analyses.
     */
    @Transactional
    public SavedChowderAnalysisResponseDto updateAnalysis(Long id, SavedChowderAnalysisRequestDto requestDto) {
        String userId = getCurrentUserId();
        
        ChowderAnalysis analysis = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Analysis not found with id: " + id));
        
        // Security check: ensure user owns this analysis
        if (!analysis.getUserId().equals(userId)) {
            throw new AccessDeniedException("You do not have permission to update this analysis");
        }
        
        // Update fields
        analysis.setSymbol(requestDto.getSymbol());
        analysis.setChowderScore(requestDto.getChowderScore());
        analysis.setDividendYield(requestDto.getDividendYield());
        analysis.setDividendCAGR(requestDto.getDividendCAGR());
        analysis.setYearsOfData(requestDto.getYearsOfData());
        analysis.setCurrentPrice(requestDto.getCurrentPrice());
        analysis.setMessage(requestDto.getMessage());
        
        ChowderAnalysis updated = repository.save(analysis);
        return toResponseDto(updated);
    }

    /**
     * Deletes a Chowder analysis. Ensures user can only delete their own analyses.
     */
    @Transactional
    public void deleteById(Long id) {
        String userId = getCurrentUserId();
        
        if (!repository.existsByIdAndUserId(id, userId)) {
            throw new AccessDeniedException("You do not have permission to delete this analysis");
        }
        
        repository.deleteById(id);
    }

    private String getCurrentUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal == null) {
            throw new IllegalStateException("User not authenticated");
        }
        return principal.toString();
    }

    private SavedChowderAnalysisResponseDto toResponseDto(ChowderAnalysis analysis) {
        return SavedChowderAnalysisResponseDto.builder()
                .id(analysis.getId())
                .symbol(analysis.getSymbol())
                .chowderScore(analysis.getChowderScore())
                .dividendYield(analysis.getDividendYield())
                .dividendCAGR(analysis.getDividendCAGR())
                .yearsOfData(analysis.getYearsOfData())
                .currentPrice(analysis.getCurrentPrice())
                .message(analysis.getMessage())
                .createdAt(analysis.getCreatedAt())
                .build();
    }
}

