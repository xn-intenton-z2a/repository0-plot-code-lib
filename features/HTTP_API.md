# Overview

Enhance the HTTP API layer to provide robust request validation, structured error responses, and flexible JSON and image endpoints. Use Zod to define and enforce schemas for query and body parameters, ensuring invalid inputs are caught early and users receive clear error messages.

# HTTP Interface

- GET /generate
  Query parameters:
    expression  required, string in the form y=...  
    range       required, string in the form start:end  
    points      optional, integer ≥ 2  
  Returns a JSON array of { x, y } points with content-type application/json.

- GET /plot
  Query parameters:
    expression  required, as above  
    range       required, as above  
    points      optional, as above  
    format      optional, one of svg or png (default svg)  
  Returns image/svg+xml or image/png response with raw bytes.

- POST /generate
  Request body (application/json): { expression, range, points }
  Same behavior as GET /generate.

- POST /plot
  Request body (application/json): { expression, range, points, format }
  Same behavior as GET /plot.

# Request Validation

1. Define Zod schemas for common parameters: expression (nonempty string), range (pattern start:end with numeric check and start < end), points (optional integer ≥ 2), format (enum svg or png).  
2. For GET endpoints, parse req.query and validate against schema.  
3. For POST endpoints, parse req.body and validate against schema.  
4. On validation error, respond with status 400 and JSON { error: <detailed message> }.

# Behavior

1. When the server receives a valid request, extract parameters and compute the time series data as in TIME_SERIES_GENERATION.  
2. For /generate, return JSON array of points.  
3. For /plot, call renderPlot to obtain SVG. If format is png, convert using sharp.  
4. Set appropriate Content-Type header and stream the response.  
5. On internal errors during expression evaluation or rendering, respond with status 500 and JSON { error: "Internal server error" }.

# Unit Tests

- tests/unit/http-api-validation.test.js
  • Mock express request and response to test validation failures for missing or malformed parameters.  
  • Verify that valid requests produce correct JSON or image data.  

# Integration Tests

- tests/integration/http-api-endpoints.test.js
  • Start server on random port.  
  • GET /generate with valid query returns JSON array of expected length.  
  • GET /plot?format=svg returns response body starting with <svg.  
  • GET /plot?format=png returns buffer with correct PNG signature.  
  • POST endpoints behave identically to GET.  
  • Invalid requests return 400 with JSON error and do not crash the server.

# Documentation Updates

- USAGE.md: Add a section "HTTP API Reference" showing curl examples for both GET and POST usage and sample responses.  
- README.md under Examples: include HTTP usage with request bodies and expected outputs.  

# Dependencies

- zod for input validation  
- express for HTTP server  
- Already present: mathjs, sharp, fs