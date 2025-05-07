# Overview

Extend the CLI and library to provide a long-running Express HTTP service exposing endpoints for raw time series data and plot rendering. Support JSON, NDJSON, SVG, and PNG outputs over HTTP.

# HTTP Endpoints

GET /data
  Query parameters:
    expression  required as y=...  
    range       required as start:end  
    points      optional integer ≥ 2  
  Returns:
    Content-Type application/json
    Response body: JSON array of data points

GET /data?format=ndjson
  Same parameters as /data
  Returns:
    Content-Type application/x-ndjson
    Response body: streaming NDJSON, one point per line

GET /plot
  Query parameters:
    expression  required as y=...  
    range       required as start:end  
    points      optional integer ≥ 2  
    format      optional svg or png (default svg)  
  Returns:
    Content-Type image/svg+xml or image/png
    Response body: SVG markup or PNG image bytes

POST /data
  Request body JSON:
    { expression: string, range: string, points?: number }
  Returns same as GET /data with application/json or NDJSON if format=ndjson

POST /plot
  Request body JSON:
    { expression: string, range: string, points?: number, format?: "svg"|"png" }
  Returns same as GET /plot

# Request Validation

Use a shared zod schema for expression, range, points, and format. Reject invalid input with 400 and JSON { error: string }. On internal errors respond 500 with JSON { error: "Internal server error" }.

# Streaming Behavior

Implement /data with format=ndjson by piping each data point through res.write in a loop, ending with res.end(). Handle backpressure and streaming performance for large datasets.

# Tests

Unit Tests (tests/unit/http-data.test.js and tests/unit/http-plot.test.js):
  • Use supertest to verify status codes, headers, response bodies for valid and invalid requests
  • Test JSON and NDJSON endpoints for correct content type and data format
  • Test /plot endpoint for SVG starting with <svg and PNG signature bytes
Integration Tests (tests/integration/http-server-data.test.js and tests/integration/http-server-plot.test.js):
  • Start the server on a random port
  • Perform real HTTP requests and assert streaming behavior and response contents
  • Shutdown server after tests

# Documentation Updates

USAGE.md:
  Add section "Running the HTTP Service" with example curl commands for /data (JSON and NDJSON) and /plot (SVG and PNG).

README.md:
  Under Examples, show how to start with --serve and --port, then sample HTTP requests and expected response types and snippets.
