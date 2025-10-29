package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "ddm_analysis")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DdmAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false, length = 10)
    private String symbol;

    @Column(nullable = false)
    private Double expectedDividend;

    @Column(nullable = false)
    private Double growthRate;

    @Column(nullable = false)
    private Double discountRate;

    private Double totalDividend;
    private Double currentPrice;
    
    @Column(nullable = false)
    private Double intrinsicValue;

    @Column(nullable = false)
    private Boolean isUndervalued;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}

