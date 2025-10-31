package com.example.backend.service;

import com.example.backend.dto.SavedDdmAnalysisRequestDto;
import com.example.backend.dto.SavedDdmAnalysisResponseDto;
import com.example.backend.model.DdmAnalysis;
import com.example.backend.repository.DdmAnalysisRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SavedDdmAnalysisServiceTest {

    @Mock
    private DdmAnalysisRepository repository;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private SavedDdmAnalysisService service;

    private static final String USER_ID = "user123";

    @BeforeEach
    void setUp() {
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(USER_ID);
    }

    @Test
    void saveAnalysis_ValidRequest_SavesAndReturnsDto() {
        SavedDdmAnalysisRequestDto requestDto = new SavedDdmAnalysisRequestDto(
                "AAPL", 2.0, 5.0, 8.0, null, null, 50.0, true
        );

        DdmAnalysis savedEntity = new DdmAnalysis();
        savedEntity.setId(1L);
        savedEntity.setUserId(USER_ID);
        savedEntity.setSymbol("AAPL");
        savedEntity.setExpectedDividend(2.0);
        savedEntity.setGrowthRate(5.0);
        savedEntity.setDiscountRate(8.0);
        savedEntity.setIntrinsicValue(50.0);
        savedEntity.setIsUndervalued(true);
        savedEntity.setCreatedAt(LocalDateTime.now());

        when(repository.save(any(DdmAnalysis.class))).thenReturn(savedEntity);

        SavedDdmAnalysisResponseDto result = service.saveAnalysis(requestDto);

        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getSymbol()).isEqualTo("AAPL");
        verify(repository).save(any(DdmAnalysis.class));
    }

    @Test
    void getAllByUserId_ReturnsUserAnalyses() {
        DdmAnalysis analysis1 = new DdmAnalysis();
        analysis1.setId(1L);
        analysis1.setUserId(USER_ID);
        analysis1.setSymbol("AAPL");

        DdmAnalysis analysis2 = new DdmAnalysis();
        analysis2.setId(2L);
        analysis2.setUserId(USER_ID);
        analysis2.setSymbol("MSFT");

        when(repository.findByUserIdOrderByCreatedAtDesc(USER_ID))
                .thenReturn(Arrays.asList(analysis1, analysis2));

        List<SavedDdmAnalysisResponseDto> result = service.getAllByUserId();

        assertThat(result).hasSize(2);
        assertThat(result.get(0).getId()).isEqualTo(1L);
        assertThat(result.get(1).getId()).isEqualTo(2L);
    }

    @Test
    void updateAnalysis_UserOwnsAnalysis_UpdatesSuccessfully() {
        SavedDdmAnalysisRequestDto requestDto = new SavedDdmAnalysisRequestDto(
                "AAPL", 2.5, 6.0, 9.0, null, null, 55.0, true
        );

        DdmAnalysis existingAnalysis = new DdmAnalysis();
        existingAnalysis.setId(1L);
        existingAnalysis.setUserId(USER_ID);
        existingAnalysis.setSymbol("AAPL");

        DdmAnalysis updatedAnalysis = new DdmAnalysis();
        updatedAnalysis.setId(1L);
        updatedAnalysis.setUserId(USER_ID);
        updatedAnalysis.setSymbol("AAPL");
        updatedAnalysis.setIntrinsicValue(55.0);

        when(repository.findById(1L)).thenReturn(Optional.of(existingAnalysis));
        when(repository.save(any(DdmAnalysis.class))).thenReturn(updatedAnalysis);

        SavedDdmAnalysisResponseDto result = service.updateAnalysis(1L, requestDto);

        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getIntrinsicValue()).isEqualTo(55.0);
        verify(repository).save(any(DdmAnalysis.class));
    }

    @Test
    void updateAnalysis_UserDoesNotOwn_ThrowsAccessDeniedException() {
        SavedDdmAnalysisRequestDto requestDto = new SavedDdmAnalysisRequestDto(
                "AAPL", 2.0, 5.0, 8.0, null, null, 50.0, true
        );

        DdmAnalysis existingAnalysis = new DdmAnalysis();
        existingAnalysis.setId(1L);
        existingAnalysis.setUserId("otherUser");

        when(repository.findById(1L)).thenReturn(Optional.of(existingAnalysis));

        assertThatThrownBy(() -> service.updateAnalysis(1L, requestDto))
                .isInstanceOf(AccessDeniedException.class)
                .hasMessageContaining("permission to update");

        verify(repository, never()).save(any());
    }

    @Test
    void deleteById_UserOwnsAnalysis_DeletesSuccessfully() {
        when(repository.existsByIdAndUserId(1L, USER_ID)).thenReturn(true);
        doNothing().when(repository).deleteById(1L);

        service.deleteById(1L);

        verify(repository).deleteById(1L);
    }

    @Test
    void deleteById_UserDoesNotOwn_ThrowsAccessDeniedException() {
        when(repository.existsByIdAndUserId(1L, USER_ID)).thenReturn(false);

        assertThatThrownBy(() -> service.deleteById(1L))
                .isInstanceOf(AccessDeniedException.class)
                .hasMessageContaining("permission to delete");

        verify(repository, never()).deleteById(any());
    }
}

