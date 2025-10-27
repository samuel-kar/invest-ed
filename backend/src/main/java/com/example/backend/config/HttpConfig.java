package com.example.backend.config;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

/**
 * HTTP configuration for external API clients.
 * Provides configured RestTemplate beans for different external services.
 */
@Configuration
public class HttpConfig {

    /**
     * RestTemplate bean specifically configured for Finnhub API calls.
     * Includes base URL, connection timeout, and read timeout settings.
     *
     * @param builder RestTemplateBuilder for configuration
     * @return configured RestTemplate for Finnhub API
     */
    @Bean
    public RestTemplate finnhubRestTemplate(RestTemplateBuilder builder) {
        return builder
                .rootUri("https://finnhub.io/api/v1")
                .connectTimeout(Duration.ofSeconds(5))
                .readTimeout(Duration.ofSeconds(10))
                .build();
    }
    
    /**
     * RestTemplate bean specifically configured for Polygon API calls.
     * Includes base URL, connection timeout, and read timeout settings.
     *
     * @param builder RestTemplateBuilder for configuration
     * @return configured RestTemplate for Polygon API
     */
    @Bean
    public RestTemplate polygonRestTemplate(RestTemplateBuilder builder) {
        return builder
                .rootUri("https://api.polygon.io")
                .connectTimeout(Duration.ofSeconds(5))
                .readTimeout(Duration.ofSeconds(10))
                .build();
    }
}
