package com.example.backend.service;

import com.example.backend.dto.SavedDdmAnalysisRequestDto;
import com.example.backend.dto.SavedDdmAnalysisResponseDto;
import com.example.backend.model.DdmAnalysis;
import com.example.backend.repository.DdmAnalysisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SavedDdmAnalysisService {

    private final DdmAnalysisRepository repository;

    /**
     * Saves a new DDM analysis for the authenticated user.
     */
    @Transactional
    public SavedDdmAnalysisResponseDto saveAnalysis(SavedDdmAnalysisRequestDto requestDto) {
        String userId = getCurrentUserId();
        
        DdmAnalysis analysis = new DdmAnalysis();
        analysis.setUserId(userId);
        analysis.setSymbol(requestDto.getSymbol());
        analysis.setExpectedDividend(requestDto.getExpectedDividend());
        analysis.setGrowthRate(requestDto.getGrowthRate());
        analysis.setDiscountRate(requestDto.getDiscountRate());
        analysis.setTotalDividend(requestDto.getTotalDividend());
        analysis.setCurrentPrice(requestDto.getCurrentPrice());
        analysis.setIntrinsicValue(requestDto.getIntrinsicValue());
        analysis.setIsUndervalued(requestDto.getIsUndervalued());
        
        DdmAnalysis saved = repository.save(analysis);
        return toResponseDto(saved);
    }

    /**
     * Retrieves all DDM analyses for the authenticated user.
     */
    public List<SavedDdmAnalysisResponseDto> getAllByUserId() {
        String userId = getCurrentUserId();
        return repository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());
    }

    /**
     * Updates an existing DDM analysis. Ensures user can only update their own analyses.
     */
    @Transactional
    public SavedDdmAnalysisResponseDto updateAnalysis(Long id, SavedDdmAnalysisRequestDto requestDto) {
        String userId = getCurrentUserId();
        
        DdmAnalysis analysis = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Analysis not found with id: " + id));
        
        // Security check: ensure user owns this analysis
        if (!analysis.getUserId().equals(userId)) {
            throw new AccessDeniedException("You do not have permission to update this analysis");
        }
        
        // Update fields
        analysis.setSymbol(requestDto.getSymbol());
        analysis.setExpectedDividend(requestDto.getExpectedDividend());
        analysis.setGrowthRate(requestDto.getGrowthRate());
        analysis.setDiscountRate(requestDto.getDiscountRate());
        analysis.setTotalDividend(requestDto.getTotalDividend());
        analysis.setCurrentPrice(requestDto.getCurrentPrice());
        analysis.setIntrinsicValue(requestDto.getIntrinsicValue());
        analysis.setIsUndervalued(requestDto.getIsUndervalued());
        
        DdmAnalysis updated = repository.save(analysis);
        return toResponseDto(updated);
    }

    /**
     * Deletes a DDM analysis. Ensures user can only delete their own analyses.
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

    private SavedDdmAnalysisResponseDto toResponseDto(DdmAnalysis analysis) {
        return SavedDdmAnalysisResponseDto.builder()
                .id(analysis.getId())
                .symbol(analysis.getSymbol())
                .expectedDividend(analysis.getExpectedDividend())
                .growthRate(analysis.getGrowthRate())
                .discountRate(analysis.getDiscountRate())
                .totalDividend(analysis.getTotalDividend())
                .currentPrice(analysis.getCurrentPrice())
                .intrinsicValue(analysis.getIntrinsicValue())
                .isUndervalued(analysis.getIsUndervalued())
                .createdAt(analysis.getCreatedAt())
                .build();
    }
}

