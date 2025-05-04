# HTTP_SERVER

## Purpose
Provide an HTTP API layer for remote clients to generate time series data and plots from mathematical expressions and numeric ranges, complementing the existing CLI interface.

## Behavior
1. Accept a new startup flag --serve or an environment variable HTTP_PORT to switch the tool into HTTP server mode.  Without these, the CLI behavior remains unchanged.
2. Expose two endpoints on the configured port:
   - GET /timeseries  
     • Query parameters: expression, range, points (optional), format (csv or json)  
     • Returns: CSV or JSON representation of [{ x, y }] points  
     • Status codes: 200 on success, 400 for missing or invalid parameters, 422 for expression evaluation errors
   - GET /plot  
     • Query parameters: expression, range, plotFormat (svg or png), width (optional), height (optional), title (optional)  
     • Returns: SVG or PNG image data  
     • Content-Type header set to image/svg+xml or image/png  
     • Status codes: 200 on success, 400 for missing or invalid parameters, 422 for evaluation or rendering errors
3. Validate and parse query string parameters using zod, then reuse existing time series generator and plot renderer modules under the hood.
4. All errors are returned as JSON objects { error: string } with appropriate HTTP status codes.

## Implementation
- In src/lib/main.js, detect the --serve flag or HTTP_PORT. If present, instantiate an Express app.  
- Define routes /timeseries and /plot. Use zod schemas to validate req.query.  
- Invoke the math parser and range computation logic to build an array of points.  
- Serialize time series responses using csv-stringify for CSV or JSON.stringify for JSON.  
- Invoke the existing plot rendering function to produce SVG or PNG binary output.  
- Set appropriate Content-Type and send the response or send error JSON with status code.
- Ensure graceful startup logs and clean shutdown on SIGINT/SIGTERM.

## Testing
- Add unit tests using supertest against an in-memory Express server:  
  • Successful GET /timeseries returns expected CSV and JSON bodies  
  • Missing expression or invalid range yields 400 with error message  
  • Invalid expression yields 422 with error message  
  • Successful GET /plot returns valid SVG XML or non-empty PNG buffer  
  • Invalid plot format yields 400
- Verify server starts and closes without hanging in default and serve modes.