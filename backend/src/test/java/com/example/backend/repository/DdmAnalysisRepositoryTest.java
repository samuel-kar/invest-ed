package com.example.backend.repository;

import com.example.backend.model.DdmAnalysis;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@Testcontainers
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class DdmAnalysisRepositoryTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private DdmAnalysisRepository repository;

    @BeforeEach
    void setUp() {
        repository.deleteAll();
    }

    @Test
    void save_SavesEntityWithGeneratedId() {
        DdmAnalysis analysis = new DdmAnalysis();
        analysis.setUserId("user123");
        analysis.setSymbol("AAPL");
        analysis.setExpectedDividend(2.0);
        analysis.setGrowthRate(5.0);
        analysis.setDiscountRate(8.0);
        analysis.setIntrinsicValue(50.0);
        analysis.setIsUndervalued(true);

        DdmAnalysis saved = repository.save(analysis);

        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getCreatedAt()).isNotNull();
        assertThat(saved.getSymbol()).isEqualTo("AAPL");
    }

    @Test
    void findByUserIdOrderByCreatedAtDesc_ReturnsUserAnalysesOrderedByDate() {
        String userId = "user123";

        DdmAnalysis older = createAnalysis(userId, "AAPL");
        older.setCreatedAt(LocalDateTime.now().minusDays(2));
        repository.save(older);

        DdmAnalysis newer = createAnalysis(userId, "MSFT");
        newer.setCreatedAt(LocalDateTime.now());
        repository.save(newer);

        List<DdmAnalysis> result = repository.findByUserIdOrderByCreatedAtDesc(userId);

        assertThat(result).hasSize(2);
        assertThat(result.get(0).getSymbol()).isEqualTo("MSFT");
        assertThat(result.get(1).getSymbol()).isEqualTo("AAPL");
    }

    @Test
    void findByUserIdOrderByCreatedAtDesc_OnlyReturnsUserAnalyses() {
        repository.save(createAnalysis("user1", "AAPL"));
        repository.save(createAnalysis("user2", "MSFT"));
        repository.save(createAnalysis("user1", "GOOGL"));

        List<DdmAnalysis> user1Analyses = repository.findByUserIdOrderByCreatedAtDesc("user1");

        assertThat(user1Analyses).hasSize(2);
        assertThat(user1Analyses).extracting(DdmAnalysis::getSymbol)
                .containsExactlyInAnyOrder("AAPL", "GOOGL");
    }

    @Test
    void existsByIdAndUserId_OwnedAnalysis_ReturnsTrue() {
        DdmAnalysis analysis = createAnalysis("user123", "AAPL");
        DdmAnalysis saved = repository.save(analysis);

        boolean exists = repository.existsByIdAndUserId(saved.getId(), "user123");

        assertThat(exists).isTrue();
    }

    @Test
    void existsByIdAndUserId_NotOwnedAnalysis_ReturnsFalse() {
        DdmAnalysis analysis = createAnalysis("user123", "AAPL");
        DdmAnalysis saved = repository.save(analysis);

        boolean exists = repository.existsByIdAndUserId(saved.getId(), "otherUser");

        assertThat(exists).isFalse();
    }

    private DdmAnalysis createAnalysis(String userId, String symbol) {
        DdmAnalysis analysis = new DdmAnalysis();
        analysis.setUserId(userId);
        analysis.setSymbol(symbol);
        analysis.setExpectedDividend(2.0);
        analysis.setGrowthRate(5.0);
        analysis.setDiscountRate(8.0);
        analysis.setIntrinsicValue(50.0);
        analysis.setIsUndervalued(true);
        analysis.setCreatedAt(LocalDateTime.now());
        return analysis;
    }
}

