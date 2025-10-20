# Security Configuration

## Current Development Setup

The current security configuration allows unrestricted access to API endpoints for development and testing purposes.

## ⚠️ Production Security Checklist

Before deploying to production, you MUST implement the following security measures:

### 1. Authentication & Authorization

- [ ] Implement JWT token-based authentication
- [ ] Add role-based access control (RBAC)
- [ ] Secure user registration and login endpoints
- [ ] Implement password policies and encryption

### 2. API Security

- [ ] Add rate limiting to prevent API abuse
- [ ] Implement request validation and sanitization
- [ ] Add API key authentication for external services
- [ ] Configure CORS for specific frontend domains only

### 3. Network Security

- [ ] Enable HTTPS (TLS 1.3)
- [ ] Configure security headers (HSTS, CSP, X-Frame-Options)
- [ ] Set up firewall rules
- [ ] Use secure communication protocols

### 4. Data Protection

- [ ] Encrypt sensitive data at rest
- [ ] Secure database connections
- [ ] Implement data anonymization for logs
- [ ] Regular security audits and penetration testing

### 5. Environment Security

- [ ] Secure environment variables and secrets
- [ ] Use proper secret management (Azure Key Vault, AWS Secrets Manager)
- [ ] Regular dependency updates and vulnerability scanning
- [ ] Implement proper logging without exposing sensitive data

## Current Security Configuration

The `SecurityConfig.java` currently allows:

- ✅ Unrestricted access to `/api/market/**` endpoints (quote, fundamentals)
- ✅ Access to actuator endpoints for health checks
- ✅ Access to Swagger documentation
- ❌ No authentication required (DEVELOPMENT ONLY)
- ❌ No rate limiting
- ❌ No CORS configuration

## Available API Endpoints

- `GET /api/market/quote/{symbol}` - Current stock quote
- `GET /api/market/fundamentals/{symbol}` - Financial metrics

## Removed Endpoints

- `GET /api/market/candles/{symbol}` - Removed (requires paid Finnhub plan)

## Recommended Production Security

```java
// Example production security configuration
@Configuration
@EnableWebSecurity
public class ProductionSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/market/**").hasRole("USER")
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
            .build();
    }
}
```

## Security Testing

Before production deployment:

1. Run security scans (OWASP ZAP, Snyk)
2. Perform penetration testing
3. Test authentication and authorization flows
4. Verify HTTPS configuration
5. Test rate limiting and CORS policies

## Contact

For security concerns or questions, contact the development team.
