package com.example.backend.config;

import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.crypto.RSASSAVerifier;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.text.ParseException;
import java.util.Collections;

/**
 * JWT authentication filter that verifies Clerk JWT tokens using JWKS.
 * 
 * This filter:
 * 1. Fetches Clerk's JWKS (JSON Web Key Set) from the configured URL
 * 2. Verifies JWT signature using the matching public key
 * 3. Extracts user ID from the 'sub' claim
 * 4. Sets Spring Security context for authenticated requests
 * 
 * Security: Unlike basic token parsing, this verifies the cryptographic signature
 * to ensure the token is legitimate and hasn't been tampered with.
 */
@Component
public class ClerkJwtAuthFilter extends OncePerRequestFilter {

    @Value("${CLERK_JWKS_URL:}")
    private String clerkJwksUrl;

    private JWKSet jwkSet;
    private volatile boolean initialized = false;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            try {
                String token = authHeader.substring(7);
                
                // Initialize JWKS if not already done
                if (!initialized) {
                    initializeJwkSet();
                }

                if (jwkSet == null) {
                    logger.error("JWKS not initialized. Rejecting request to prevent authentication bypass.");
                    response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Authentication service unavailable");
                    return;
                }

                // Parse JWT
                SignedJWT signedJWT = SignedJWT.parse(token);
                
                // Get the key ID from the JWT header
                JWSHeader header = signedJWT.getHeader();
                String keyId = header.getKeyID();
                
                // Find the matching key in JWKS
                JWK jwk = jwkSet.getKeyByKeyId(keyId);
                if (jwk == null || !(jwk instanceof RSAKey)) {
                    logger.warn("No matching RSA key found for key ID: " + keyId);
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token key");
                    return;
                }
                
                RSAKey rsaKey = (RSAKey) jwk;
                
                // Verify signature
                if (!signedJWT.verify(new RSASSAVerifier(rsaKey))) {
                    logger.warn("JWT signature verification failed");
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token signature");
                    return;
                }
                
                // Verify token hasn't expired
                JWTClaimsSet claimsSet = signedJWT.getJWTClaimsSet();
                if (claimsSet.getExpirationTime() != null && 
                    claimsSet.getExpirationTime().before(new java.util.Date())) {
                    logger.warn("JWT token has expired");
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token expired");
                    return;
                }
                
                // Extract user ID from 'sub' claim
                String userId = claimsSet.getSubject();
                if (userId == null) {
                    userId = claimsSet.getStringClaim("sub");
                }

                if (userId != null) {
                    // Set authentication in Spring Security context
                    var auth = new UsernamePasswordAuthenticationToken(
                            userId,
                            null,
                            Collections.emptyList()
                    );
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }

            } catch (ParseException e) {
                logger.error("Invalid token format", e);
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token format");
                return;
            } catch (Exception e) {
                logger.error("Error processing JWT token", e);
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication failed");
                return;
            }
        }

        chain.doFilter(request, response);
    }

    private synchronized void initializeJwkSet() {
        if (initialized) {
            return;
        }
        
        try {
            if (clerkJwksUrl == null || clerkJwksUrl.isEmpty()) {
                logger.error("CLERK_JWKS_URL not configured. JWT verification cannot be initialized.");
                // Leave jwkSet as null - requests with Bearer tokens will be rejected
                initialized = true;
                return;
            }

            // Fetch JWKS from Clerk
            java.net.URI uri = new java.net.URI(clerkJwksUrl);
            jwkSet = JWKSet.load(uri.toURL());
            logger.info("Successfully loaded JWKS from: " + clerkJwksUrl);
            
        } catch (Exception e) {
            logger.error("Failed to initialize JWKS source from: " + clerkJwksUrl, e);
        } finally {
            initialized = true;
        }
    }
}

