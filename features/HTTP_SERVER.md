# HTTP_SERVER

## Purpose
Provide an HTTP API layer plus interactive web interface for remote clients to generate time series data, image plots, real time streams, and to fill in expressions and ranges via a browser form.

## Behavior
1. When started with --serve or HTTP_PORT, initialize an Express app with EJS templating.
2. View endpoints:
   • GET /      Render an HTML page with a form allowing users to input expression, range, points, format or plot options.
   • POST /plot Process form submission for plots: accept body parameters expression, range, points (optional), plotFormat (svg or png), width (optional), height (optional), title (optional). Respond with rendered HTML showing inline SVG or embedded PNG image.
3. API endpoints (unchanged):
   • GET /timeseries  Query: expression, range, points(optional default 100), format(csv or json). Returns CSV or JSON array of { x, y } with status 200. 400 for missing/invalid parameters, 422 for expression errors.
   • GET /plot        Query: expression, range, plotFormat(svg or png), width(default 800), height(default 600), title(optional). Returns SVG or PNG image data with appropriate Content-Type. 400 or 422 on errors.
   • GET /stream      Query: expression, range, points(optional default 100). Returns SSE stream of data events and end event; errors as SSE error event then close.
   • OPTIONS handlers for /timeseries, /plot, /stream return 204 with CORS headers.
4. All endpoints include CORS headers from CORS_ORIGINS or wildcard.
5. Validate and parse inputs using zod schemas with coercion and defaults. Use parseRange and evaluateExpression for data generation.

## Implementation
- In src/lib/main.js, detect --serve or HTTP_PORT and instantiate Express.
- Configure EJS as view engine, place templates in views/ folder (views/index.ejs and views/result.ejs).
- Define routes GET / and POST /plot to render form and results.
- Reuse existing logic for timeseries, plot, and stream within API and web handlers.
- For POST /plot, on plotFormat svg render the SVG string directly in HTML; for png, generate PNG buffer and embed as base64 data URI.
- Maintain OPTIONS and CORS middleware as before.

## Testing
- Add supertest unit tests:
  • GET / returns HTML page containing form elements for expression and range.
  • POST /plot with valid parameters returns HTML page embedding correct SVG or PNG data URI.
  • Existing GET /timeseries, /plot, /stream and OPTIONS tests pass unchanged.
  • Invalid form submissions render error messages in HTML with status 400.
  • CORS headers consistent for all endpoints.
