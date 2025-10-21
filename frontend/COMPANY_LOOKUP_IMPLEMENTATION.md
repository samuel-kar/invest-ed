# Company Data Lookup - Frontend Implementation

## Overview

This document outlines the implementation of a company data lookup feature that allows users to search for stock symbols and view comprehensive financial data including quotes and fundamental metrics.

## Architecture

### Component Hierarchy

```
App
├── Header (with search bar)
├── Companies Route
│   └── CompanySearch
│       ├── Search Form
│       └── CompanyData (when data loaded)
│           ├── Quote Summary Card
│           └── Financial Metrics Sections
└── Analysis Route
    └── CompanySearch (reused component)
```

### API Integration

- **Base URL**: `http://localhost:8080/api/market`
- **Endpoints**:
  - `GET /quote/{symbol}` - Current stock quote
  - `GET /fundamentals/{symbol}` - Comprehensive financial metrics (37+ fields)

### Data Flow

1. User enters symbol in Header search bar
2. Navigation to `/companies?symbol={SYMBOL}`
3. CompanySearch component receives symbol from URL
4. React Query fetches data from backend API
5. CompanyData component displays organized metrics

## Key Features

### Search Functionality

- **Header Integration**: Search bar in header navigates to companies page
- **URL Parameters**: Symbol passed via URL search params
- **Auto-search**: Automatically searches when symbol in URL
- **Case Insensitive**: Converts input to uppercase

### Data Display

- **Quote Summary**: Current price, change, high/low/open/previous close
- **Organized Sections**: 8 collapsible sections for different metric categories
- **Smart Formatting**: Currency, percentages, ratios formatted appropriately
- **Null Handling**: Shows "N/A" for missing data

### User Experience

- **Loading States**: Spinner during data fetch
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on mobile and desktop
- **Theme Support**: Uses CSS variables for consistent theming

## Technical Implementation

### API Service Layer (`services/api.ts`)

```typescript
// TypeScript interfaces matching backend DTOs
interface Quote { ... }
interface Fundamentals { ... }

// Fetch functions with error handling
export async function fetchQuote(symbol: string): Promise<Quote>
export async function fetchFundamentals(symbol: string): Promise<Fundamentals>
export async function fetchCompanyData(symbol: string): Promise<{quote, fundamentals}>
```

### React Query Integration

- **Caching**: Automatic caching of API responses
- **Loading States**: Built-in loading and error states
- **Retry Logic**: Configurable retry behavior
- **Query Keys**: Proper cache invalidation

### Component Structure

#### CompanySearch Container
- Manages search state and form submission
- Integrates with React Query for data fetching
- Handles loading, error, and success states
- Renders CompanyData when data is available

#### CompanyData Display
- Accepts quote and fundamentals as props
- Organizes metrics into collapsible sections
- Formats values based on data type (currency, percentage, ratio)
- Uses theme-aware styling

## Financial Metrics Categories

### 1. Valuation Ratios (5 metrics)
- Price-to-Earnings (P/E)
- Price-to-Book (P/B)
- Price-to-Sales (P/S)
- Price-to-Free Cash Flow
- Price-to-Tangible Book Value

### 2. Profitability Margins (5 metrics)
- Gross Margin
- Operating Margin
- Net Margin
- Pre-tax Margin
- Free Cash Flow Margin

### 3. Per-Share Metrics (4 metrics)
- Earnings Per Share
- EBIT Per Share
- Sales Per Share
- Tangible Book Value Per Share

### 4. Liquidity Ratios (3 metrics)
- Current Ratio
- Quick Ratio
- Cash Ratio

### 5. Leverage Ratios (8 metrics)
- Total Debt to Equity
- Total Debt to Total Asset
- Total Debt to Total Capital
- Long-term Debt ratios
- Net Debt ratios

### 6. Efficiency Ratios (6 metrics)
- Return on Assets (ROA)
- Return on Equity (ROE)
- Return on Invested Capital (ROIC)
- Return on Total Capital (ROTC)
- Inventory Turnover
- Receivables Turnover

### 7. Valuation Metrics (3 metrics)
- Enterprise Value
- EV/EBITDA
- EV/Revenue

### 8. Other Metrics (4 metrics)
- Payout Ratio
- Book Value Per Share
- SG&A to Sales
- Total Ratio

## Error Handling

### API Errors
- **404 Not Found**: Invalid symbol (user-friendly message)
- **500 Server Error**: Backend issues (generic error message)
- **Network Errors**: Connection problems (retry suggestion)

### User Experience
- Clear error messages with actionable information
- Graceful fallbacks for missing data
- Loading states to indicate progress

## Future Enhancements

### Planned Features
- **Favorites**: Save frequently viewed companies
- **Comparison**: Compare multiple companies side-by-side
- **Historical Data**: View trends over time
- **Charts**: Visual representation of metrics
- **Export**: Download data as CSV/PDF

### Performance Optimizations
- **Caching**: Implement Redis for backend caching
- **Pagination**: For large datasets
- **Lazy Loading**: Load sections on demand
- **Compression**: Optimize API responses

### Additional Analysis Tools
- **Screening**: Filter companies by criteria
- **Alerts**: Price/ratio change notifications
- **Portfolio**: Track multiple positions
- **Reports**: Generate analysis reports

## Testing Strategy

### Unit Tests
- API service functions
- Component rendering
- Data formatting utilities
- Error handling logic

### Integration Tests
- Search flow end-to-end
- API integration
- Navigation between routes
- Theme switching

### User Testing
- Search usability
- Data presentation clarity
- Mobile responsiveness
- Performance benchmarks

## Dependencies

### Core Dependencies
- `@tanstack/react-query` - Data fetching and caching
- `@tanstack/react-router` - Navigation and routing
- `lucide-react` - Icons
- `react` - UI framework

### Development Dependencies
- `typescript` - Type safety
- `tailwindcss` - Styling
- `vite` - Build tool

## File Structure

```
frontend/src/
├── services/
│   └── api.ts                 # API service layer
├── components/
│   ├── CompanyData.tsx       # Data display component
│   ├── CompanySearch.tsx     # Search container
│   └── Header.tsx            # Updated with search
├── routes/
│   ├── companies.tsx         # Companies page
│   └── analysis.tsx          # Analysis page
└── COMPANY_LOOKUP_IMPLEMENTATION.md
```

## Getting Started

1. **Backend Running**: Ensure backend is running on `localhost:8080`
2. **Frontend Development**: Run `npm run dev` in frontend directory
3. **Search Companies**: Use header search bar or navigate to `/companies`
4. **View Data**: Enter stock symbol (e.g., AAPL, MSFT, TSLA)

## Troubleshooting

### Common Issues
- **CORS Errors**: Fixed - Backend now includes CORS configuration for localhost:3000
- **API Connection**: Verify backend is running on correct port (8080)
- **Data Format**: Check that backend returns expected data structure
- **Theme Issues**: Ensure CSS variables are properly defined
- **TypeScript Import Errors**: Use `import type` for type-only imports due to `verbatimModuleSyntax: true`

### Debug Tools
- React Query DevTools for data fetching
- TanStack Router DevTools for navigation
- Browser DevTools for network requests
- Console logs for error tracking
