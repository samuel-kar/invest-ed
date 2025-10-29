package com.example.backend.repository;

import com.example.backend.model.ChowderAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChowderAnalysisRepository extends JpaRepository<ChowderAnalysis, Long> {
    
    List<ChowderAnalysis> findByUserIdOrderByCreatedAtDesc(String userId);
    
    boolean existsByIdAndUserId(Long id, String userId);
}

