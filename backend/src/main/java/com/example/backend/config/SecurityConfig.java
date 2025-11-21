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
 * ⚠️  SECURITY WARNING FOR PRODUCTION DEPLOYMENT ⚠️
 * 
 * This configuration is designed for DEVELOPMENT and TESTING purposes.
 * Before deploying to production, you MUST review and update this configuration:
 * 
 * 1. AUTHENTICATION: Add proper authentication mechanism (JWT, OAuth2, etc.)
 * 2. AUTHORIZATION: Implement role-based access control
 * 3. CORS: Configure Cross-Origin Resource Sharing for your frontend domain
 * 4. RATE LIMITING: Add rate limiting to prevent API abuse
 * 5. HTTPS: Ensure all communication uses HTTPS in production
 * 6. API KEY PROTECTION: Consider additional API key validation
 * 
 * Current configuration allows unrestricted access to /api/market/** endpoints.
 * This is acceptable for development but NOT for production!
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
            
            // Disable CSRF for API testing (⚠️ NOT recommended for production)
            .csrf(csrf -> csrf.disable())
            
            // Stateless session management for JWT
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            // Add JWT authentication filter before other filters
            .addFilterBefore(clerkJwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            
            // Configure endpoint access
            .authorizeHttpRequests(authz -> authz
                // Allow unrestricted access to market API endpoints (⚠️ DEVELOPMENT ONLY)
                .requestMatchers("/api/market/**").permitAll()
                
                // Allow health check endpoint (for waking up backend from standby)
                .requestMatchers("/api/health").permitAll()
                
                // Allow actuator endpoints for health checks (⚠️ Consider restricting in production)
                .requestMatchers("/actuator/**").permitAll()
                
                // Allow Swagger/OpenAPI documentation (⚠️ Remove in production)
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                
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
