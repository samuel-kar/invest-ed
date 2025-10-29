package com.example.backend.repository;

import com.example.backend.model.DdmAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DdmAnalysisRepository extends JpaRepository<DdmAnalysis, Long> {
    
    List<DdmAnalysis> findByUserIdOrderByCreatedAtDesc(String userId);
    
    boolean existsByIdAndUserId(Long id, String userId);
}

