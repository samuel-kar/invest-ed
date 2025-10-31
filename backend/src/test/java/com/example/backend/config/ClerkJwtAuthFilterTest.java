package com.example.backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.IOException;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ClerkJwtAuthFilterTest {

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private FilterChain filterChain;

    @InjectMocks
    private ClerkJwtAuthFilter filter;

    @BeforeEach
    void setUp() {
        SecurityContextHolder.clearContext();
        // Use reflection or a test-friendly approach to set clerkJwksUrl
        // For now, we'll test behavior without actual JWKS validation
        filter = new ClerkJwtAuthFilter();
    }

    @Test
    void doFilter_NoAuthorizationHeader_ContinuesFilterChain() throws ServletException, IOException {
        when(request.getHeader("Authorization")).thenReturn(null);

        filter.doFilterInternal(request, response, filterChain);

        verify(filterChain).doFilter(request, response);
        verify(response, never()).sendError(anyInt(), anyString());
    }

    @Test
    void doFilter_InvalidAuthorizationHeader_ContinuesFilterChain() throws ServletException, IOException {
        when(request.getHeader("Authorization")).thenReturn("InvalidFormat");

        filter.doFilterInternal(request, response, filterChain);

        verify(filterChain).doFilter(request, response);
    }

    @Test
    void doFilter_MalformedToken_WithNoJwksConfigured_ContinuesFilterChain() throws ServletException, IOException {
        // With no CLERK_JWKS_URL configured, the filter skips verification and continues
        when(request.getHeader("Authorization")).thenReturn("Bearer invalid.token.here");

        filter.doFilterInternal(request, response, filterChain);

        verify(response, never()).sendError(anyInt(), anyString());
        verify(filterChain).doFilter(request, response);
    }

    @Test
    void doFilter_BearerTokenWithoutJwks_ContinuesFilterChain() throws ServletException, IOException {
        // When JWKS URL is not configured, filter should skip verification
        when(request.getHeader("Authorization")).thenReturn("Bearer some.jwt.token");

        filter.doFilterInternal(request, response, filterChain);

        // Without JWKS configured, filter logs warning and continues
        verify(filterChain).doFilter(request, response);
    }
}

