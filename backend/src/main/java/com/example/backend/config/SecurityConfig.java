package com.example.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;


/**
 * Security configuration for the application.
 * 
 * Production security configuration with:
 * - JWT authentication via Clerk using JWKS verification
 * - Public endpoints for market data (allows unauthenticated stock analysis)
 * - Protected endpoints for saved analyses (requires authentication)
 * - Security headers configured (HSTS, CSP, X-Frame-Options, etc.)
 * - CORS configured via environment variables
 * - Stateless session management for JWT tokens
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final ClerkJwtAuthFilter clerkJwtAuthFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, CorsConfigurationSource corsConfigurationSource) throws Exception {
        http
            // Enable CORS with custom configuration
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            
            // Configure security headers
            .headers(headers -> headers
                // Prevent clickjacking attacks
                .frameOptions(frameOptions -> frameOptions.deny())
                // Prevent MIME type sniffing
                .contentTypeOptions(contentTypeOptions -> {})
                // Enable HTTP Strict Transport Security (HSTS)
                .httpStrictTransportSecurity(hsts -> hsts
                    .maxAgeInSeconds(31536000)
                    .includeSubDomains(true)
                )
                // Content Security Policy
                .contentSecurityPolicy(csp -> csp
                    .policyDirectives("default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.finnhub.io https://*.polygon.io https://*.clerk.accounts.dev;")
                )
                // Referrer Policy
                .referrerPolicy(referrerPolicy -> referrerPolicy
                    .policy(org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN)
                )
            )
            
            // Disable CSRF for stateless JWT API (acceptable for REST APIs with JWT authentication)
            .csrf(csrf -> csrf.disable())
            
            // Stateless session management for JWT
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            // Add JWT authentication filter before other filters
            .addFilterBefore(clerkJwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            
            // Configure endpoint access
            .authorizeHttpRequests(authz -> authz
                // Public endpoints: Allow unauthenticated access to market data
                // This enables users to search and analyze stocks without logging in.
                // Note: Rate limiting should be considered in the future to prevent abuse,
                // as these endpoints call external APIs (Finnhub/Polygon) which have rate limits.
                .requestMatchers("/api/market/**").permitAll()
                
                // Allow health check endpoint (for waking up backend from standby)
                .requestMatchers("/api/health").permitAll()
                
                // Protected endpoints require authentication
                .requestMatchers("/api/saved/**").authenticated()
                
                // All other requests require authentication
                .anyRequest().authenticated()
            )
            
            // Disable basic authentication (using JWT instead)
            .httpBasic(httpBasic -> httpBasic.disable())
            
            // Disable form login (using JWT instead)
            .formLogin(formLogin -> formLogin.disable());
        
        return http.build();
    }
}
