package com.example.backend.exception;

/**
 * Exception thrown when Finnhub API rate limit is exceeded.
 * Maps to HTTP 503 Service Unavailable.
 */
public class RateLimitException extends RuntimeException {
    
    public RateLimitException() {
        super("Rate limit exceeded. Please try again later.");
    }
    
    public RateLimitException(String message) {
        super(message);
    }
    
    public RateLimitException(String message, Throwable cause) {
        super(message, cause);
    }
}
