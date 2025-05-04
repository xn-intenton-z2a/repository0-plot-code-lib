# HTTP_SERVER

## Purpose
Provide an HTTP API layer for remote clients to generate time series data, image plots, and real time streams from mathematical expressions and numeric ranges, complementing the existing CLI interface.

## Behavior
1. When started with --serve or HTTP_PORT initialize an Express app.
2. Expose endpoints:
   • GET /timeseries  Query parameters: expression, range, points(optional default 100), format(csv or json). Returns CSV or JSON array of { x, y } points with status 200. 400 for missing or invalid parameters, 422 for expression errors.
   • GET /plot  Query parameters: expression, range, plotFormat(svg or png), width(optional default 800), height(optional default 600), title(optional). Returns SVG or PNG image data with appropriate Content-Type. 400 for missing or invalid parameters, 422 for evaluation or rendering errors.
   • GET /stream  Query parameters: expression, range, points(optional default 100). Returns a Server-Sent Events stream with Content-Type text/event-stream. Each data event contains data: { x, y } lines, terminated by event: end. Error events have type error and include error message, then connection closes.
   • OPTIONS /timeseries, /plot, /stream  Return status 204 and required CORS headers for preflight.
3. All endpoints include CORS headers: Access-Control-Allow-Origin set from CORS_ORIGINS or *, Access-Control-Allow-Methods GET,OPTIONS, Access-Control-Allow-Headers Content-Type.
4. Validate and parse req.query parameters using zod schemas with defaults and coercion. Use parseRange and evaluateExpression to generate data points.
5. On validation or evaluation errors send JSON error responses or SSE error events with correct status codes.

## Implementation
- In src/lib/main.js detect --serve flag or HTTP_PORT and instantiate Express.
- Configure CORS middleware based on CORS_ORIGINS environment variable or allow all origins by default.
- Define OPTIONS handlers for /timeseries, /plot, /stream to send 204 and CORS headers.
- Define GET /timeseries, GET /plot and GET /stream routes.
- Use zod to parse and coerce query parameters.
- For /timeseries serialize using serializeCSV or serializeJSON.
- For /plot use generateSVG for svg format or write minimal PNG signature for png.
- For /stream set text/event-stream headers and loop through each point writing SSE messages, then send end event and close response.

## Testing
- Add supertest unit tests against the Express server for:
  • Successful GET /timeseries and GET /plot responses include correct data, Content-Type, and CORS headers.
  • Successful GET /stream streams data messages and ends with end event.
  • OPTIONS /timeseries, /plot and /stream return status 204 and include CORS headers.
  • Invalid or missing parameters return status 400 or 422 and appropriate error JSON or SSE error events.
  • CORS_ORIGINS configuration is respected in Access-Control-Allow-Origin.