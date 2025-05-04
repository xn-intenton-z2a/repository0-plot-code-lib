# HTTP_SERVER

## Purpose
Provide an HTTP API layer for remote clients to generate time series data and plots from mathematical expressions and numeric ranges, complementing the existing CLI interface, with built in support for cross origin requests for browser based clients.

## Behavior
1. Accept a new startup flag --serve or environment variable HTTP_PORT to switch the tool into HTTP server mode. Without these, the CLI behavior remains unchanged.
2. Expose three endpoints on the configured port:
   - GET /timeseries  
     • Query parameters: expression, range, points (optional), format (csv or json)  
     • Returns: CSV or JSON representation of [{ x, y }] points  
     • Status codes: 200 on success, 400 for missing or invalid parameters, 422 for expression evaluation errors
   - GET /plot  
     • Query parameters: expression, range, plotFormat (svg or png), width (optional), height (optional), title (optional)  
     • Returns: SVG or PNG image data  
     • Content-Type header set to image/svg+xml or image/png  
     • Status codes: 200 on success, 400 for missing or invalid parameters, 422 for evaluation or rendering errors
   - OPTIONS /timeseries and /plot  
     • Responds with status 204 and all required CORS headers for preflight requests
3. For all responses on these endpoints include CORS headers:
   • Access-Control-Allow-Origin set to environment variable CORS_ORIGINS if present or '*' by default
   • Access-Control-Allow-Methods set to 'GET,OPTIONS'
   • Access-Control-Allow-Headers set to 'Content-Type'
4. Validate and parse query string parameters using zod, then reuse existing time series generator and plot renderer modules.
5. All errors are returned as JSON objects { error: string } with appropriate HTTP status codes.

## Implementation
- In src/lib/main.js detect the --serve flag or HTTP_PORT. If present, instantiate an Express app.
- Configure CORS middleware based on CORS_ORIGINS environment variable or allow all origins by default.
- Define routes:
  • OPTIONS handlers for /timeseries and /plot to send 204 and CORS headers
  • GET /timeseries and GET /plot as specified under Behavior
- Use zod schemas to validate req.query, then compute time series or generate plot via existing functions.
- Serialize time series responses using csv-stringify or JSON.stringify.
- Generate SVG or PNG output using existing generateSVG or minimal PNG signature logic.
- Set Content-Type and CORS headers on every response.
- Ensure graceful startup logs and clean shutdown on SIGINT/SIGTERM.

## Testing
- Add unit tests using supertest against an in-memory Express server:
  • Successful GET /timeseries and GET /plot return correct data and include Access-Control-Allow-Origin '*' header
  • OPTIONS /timeseries and /plot return status 204 and include all required CORS headers
  • When CORS_ORIGINS is set, GET /timeseries returns Access-Control-Allow-Origin matching configured origins
  • Existing tests for missing or invalid parameters and evaluation errors continue to pass