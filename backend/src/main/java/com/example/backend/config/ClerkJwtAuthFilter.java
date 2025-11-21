package com.example.backend.config;

import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.jwk.source.RemoteJWKSet;
import com.nimbusds.jose.proc.JWSKeySelector;
import com.nimbusds.jose.proc.JWSVerificationKeySelector;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.proc.ConfigurableJWTProcessor;
import com.nimbusds.jwt.proc.DefaultJWTProcessor;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.net.URI;
import java.util.Collections;

/**
 * JWT authentication filter that verifies Clerk JWT tokens using RemoteJWKSet.
 *
 * Improvements over previous version:
 * 1. Uses RemoteJWKSet: Automatically handles caching and refreshing of Clerk's public keys.
 *    This prevents the app from breaking when Clerk rotates keys.
 * 2. Uses DefaultJWTProcessor: Standardizes the verification workflow (signature + expiration).
 * 
 * Security: Verifies the cryptographic signature to ensure the token is legitimate
 * and hasn't been tampered with. Automatically handles key rotation via JWKS caching.
 */
@Component
public class ClerkJwtAuthFilter extends OncePerRequestFilter {

    private final ConfigurableJWTProcessor<SecurityContext> jwtProcessor;

    public ClerkJwtAuthFilter(@Value("${CLERK_JWKS_URL:}") String clerkJwksUrl) {
        // Validate configuration
        if (clerkJwksUrl == null || clerkJwksUrl.isEmpty()) {
            throw new IllegalStateException("CLERK_JWKS_URL must be configured for JWT authentication");
        }

        try {
            // Initialize the RemoteJWKSet with the Clerk JWKS URL.
            // This component handles caching and refreshing keys automatically.
            URI jwksUri = URI.create(clerkJwksUrl);
            JWKSource<SecurityContext> keySource = new RemoteJWKSet<>(jwksUri.toURL());

            // Configure the Key Selector to only accept RS256 (standard for Clerk)
            JWSKeySelector<SecurityContext> keySelector =
                    new JWSVerificationKeySelector<>(JWSAlgorithm.RS256, keySource);

            // Set up the JWT Processor
            this.jwtProcessor = new DefaultJWTProcessor<>();
            this.jwtProcessor.setJWSKeySelector(keySelector);

            logger.info("Initialized Clerk JWT processor with JWKS URL: " + clerkJwksUrl);
        } catch (IllegalArgumentException | java.net.MalformedURLException e) {
            throw new IllegalStateException("Invalid CLERK_JWKS_URL format: " + clerkJwksUrl, e);
        } catch (Exception e) {
            throw new IllegalStateException("Could not initialize Clerk JWT processor", e);
        }
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain chain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            try {
                String token = authHeader.substring(7);

                // Process the token: This verifies the signature AND expiration/claims automatically.
                JWTClaimsSet claims = jwtProcessor.process(token, null);

                // Extract user ID from 'sub' claim
                String userId = claims.getSubject();
                if (userId == null) {
                    userId = claims.getStringClaim("sub");
                }

                if (userId != null) {
                    // Create Authentication token (No roles/authorities needed for now)
                    var auth = new UsernamePasswordAuthenticationToken(
                            userId,
                            null,
                            Collections.emptyList() // Empty authorities as per requirements
                    );
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }

            } catch (Exception e) {
                // Logs the specific verification error (Expired, Bad Signature, etc.)
                logger.warn("JWT Verification failed: " + e.getMessage());
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired token");
                return;
            }
        }

        chain.doFilter(request, response);
    }
}
