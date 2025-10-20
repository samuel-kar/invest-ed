package com.example.backend.exception;

/**
 * Exception thrown when a symbol is not supported by Finnhub API.
 * Maps to HTTP 400 Bad Request.
 */
public class SymbolNotSupportedException extends RuntimeException {
    
    public SymbolNotSupportedException(String symbol) {
        super("Symbol '" + symbol + "' not supported on current plan or market.");
    }
    
    public SymbolNotSupportedException(String symbol, Throwable cause) {
        super("Symbol '" + symbol + "' not supported on current plan or market.", cause);
    }
}
