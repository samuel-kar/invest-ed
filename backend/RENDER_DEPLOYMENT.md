# Render.com Deployment Guide

## Overview

This guide covers deploying the InvestEd backend to Render.com with proper security configuration for production use with your Vercel frontend.

## Prerequisites

- GitHub repository with your backend code
- Render.com account (free tier available)
- Finnhub API key
- Your Vercel frontend URL: `https://invest-ed-samwise.vercel.app`

## Step-by-Step Deployment

### 1. Create Render.com Account

1. Go to [https://render.com](https://render.com)
2. Sign up with your GitHub account
3. Authorize Render to access your repositories

### 2. Create Web Service

1. **Dashboard** → Click "New +" → Select "Web Service"
2. **Connect Repository**:
   - Select your GitHub repository
   - Choose branch: `backend-api` (or your backend branch name)
   - Root Directory: `backend`

### 3. Configure Build Settings

Fill in the following configuration:

- **Name**: `invest-ed-backend`
- **Environment**: `Java`
- **Build Command**: `./mvnw clean package -DskipTests`
- **Start Command**: `java -jar target/backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod`

### 4. Set Environment Variables

In the "Environment Variables" section, add:

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `FINNHUB_API_KEY` | `your_actual_api_key` | Your Finnhub API key |
| `ALLOWED_ORIGINS` | `https://invest-ed-samwise.vercel.app,http://localhost:3000,http://127.0.0.1:3000` | CORS allowed origins |
| `SPRING_PROFILES_ACTIVE` | `prod` | Use production profile |

### 5. Plan Selection

- **Free Tier**: Available with limitations (cold starts after inactivity)
- **Paid Plans**: Better performance, no cold starts
- **Auto-deploy**: Enabled by default (deploys on every git push)

### 6. Deploy

1. Click "Create Web Service"
2. Wait for build to complete (5-10 minutes)
3. Note your service URL (e.g., `https://invest-ed-backend.onrender.com`)

## Configuration Details

### Build Process

Render will:
1. Clone your repository
2. Navigate to `backend` directory
3. Run `./mvnw clean package -DskipTests`
4. Start with `java -jar target/backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod`

### Environment Variables Explained

- **`FINNHUB_API_KEY`**: Required for API calls to Finnhub
- **`ALLOWED_ORIGINS`**: Comma-separated list of allowed frontend URLs
- **`SPRING_PROFILES_ACTIVE`**: Activates production profile with proper CORS settings

### CORS Configuration

The backend is configured to accept requests from:
- `https://invest-ed-samwise.vercel.app` (your production frontend)
- `http://localhost:3000` (local development)
- `http://127.0.0.1:3000` (alternative localhost)

## Frontend Integration

### Update Frontend API URL

In your Vercel frontend, update the API base URL to point to your Render service:

```typescript
// In your frontend API service
const API_BASE_URL = 'https://your-service-name.onrender.com/api/market'
```

### Environment-Specific URLs

- **Development**: `http://localhost:8080/api/market`
- **Production**: `https://your-service-name.onrender.com/api/market`

## Testing Your Deployment

### 1. Health Check

Visit your Render service URL to verify it's running:
- `https://your-service-name.onrender.com`

### 2. API Endpoints

Test the endpoints:
- `https://your-service-name.onrender.com/api/market/quote/AAPL`
- `https://your-service-name.onrender.com/api/market/fundamentals/AAPL`

### 3. CORS Testing

Test from your Vercel frontend to ensure CORS is working correctly.

## Automatic Deployment

### How It Works

- **Auto-deploy**: Enabled by default
- **Trigger**: Every push to your selected branch
- **Process**: Automatic build and deployment
- **Duration**: 5-10 minutes per deployment

### Manual Deployment

- Go to your service dashboard
- Click "Manual Deploy" button
- Select branch and deploy

### Disable Auto-deploy

If needed, you can disable auto-deploy:
1. Go to service settings
2. Navigate to "Build & Deploy"
3. Toggle "Auto Deploy" off

## Free Tier Limitations

### Cold Starts

- **Issue**: Service sleeps after 15 minutes of inactivity
- **Impact**: First request after sleep takes 30-60 seconds
- **Solution**: Upgrade to paid plan or implement health checks

### Resource Limits

- **CPU**: 0.1 CPU
- **Memory**: 512 MB RAM
- **Bandwidth**: 100 GB/month
- **Build Time**: 90 minutes/month

## Troubleshooting

### Common Issues

#### 1. Build Failures

**Error**: Maven build fails
**Solution**: 
- Check Java version (should be 21)
- Verify `pom.xml` dependencies
- Check build logs in Render dashboard

#### 2. CORS Errors

**Error**: "Access to fetch has been blocked by CORS policy"
**Solution**:
- Verify `ALLOWED_ORIGINS` environment variable
- Check your frontend URL is included
- Ensure no trailing slashes in URLs

#### 3. API Key Issues

**Error**: 401 Unauthorized from Finnhub
**Solution**:
- Verify `FINNHUB_API_KEY` is set correctly
- Check API key is valid and active
- Ensure no extra spaces in environment variable

#### 4. Service Not Starting

**Error**: Service fails to start
**Solution**:
- Check start command is correct
- Verify JAR file exists after build
- Check application logs in Render dashboard

### Debugging Steps

1. **Check Build Logs**: Look for Maven build errors
2. **Check Runtime Logs**: Look for application startup errors
3. **Verify Environment Variables**: Ensure all required variables are set
4. **Test Locally**: Run the same commands locally to debug

## Security Considerations

### HTTPS

- **Automatic**: Render provides HTTPS by default
- **Certificate**: Managed by Render
- **Redirect**: HTTP requests automatically redirected to HTTPS

### Environment Variables

- **Secure**: Stored securely in Render
- **Not Exposed**: Not visible in logs or code
- **Easy Updates**: Can be changed without redeployment

### CORS Security

- **Specific Origins**: Only your Vercel domain allowed
- **No Wildcards**: Prevents unauthorized access
- **Credentials**: Enabled for authenticated requests

## Monitoring and Maintenance

### Health Monitoring

- **Uptime**: Monitor service availability
- **Response Time**: Track API response times
- **Error Rates**: Monitor failed requests

### Logs

- **Access Logs**: View in Render dashboard
- **Application Logs**: Check for errors and warnings
- **Build Logs**: Review build process

### Updates

- **Automatic**: Deploy on every git push
- **Manual**: Use manual deploy for specific commits
- **Rollback**: Deploy previous version if needed

## Cost Optimization

### Free Tier Usage

- **Build Time**: Monitor monthly build time usage
- **Bandwidth**: Track data transfer
- **Uptime**: Consider paid plan for production

### Paid Plans

- **Starter**: $7/month - No cold starts
- **Standard**: $25/month - Better performance
- **Pro**: $85/month - High availability

## Support

### Render Support

- **Documentation**: [https://render.com/docs](https://render.com/docs)
- **Community**: [https://community.render.com](https://community.render.com)
- **Status**: [https://status.render.com](https://status.render.com)

### Common Commands

```bash
# Check service status
curl https://your-service-name.onrender.com

# Test API endpoint
curl https://your-service-name.onrender.com/api/market/quote/AAPL

# Check CORS headers
curl -H "Origin: https://invest-ed-samwise.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     https://your-service-name.onrender.com/api/market/quote/AAPL
```

## Next Steps

After successful deployment:

1. **Update Frontend**: Point your Vercel frontend to the Render backend URL
2. **Test Integration**: Verify end-to-end functionality
3. **Monitor Performance**: Watch for any issues
4. **Scale Up**: Consider paid plan for better performance

Your backend is now ready for production use with your Vercel frontend!
