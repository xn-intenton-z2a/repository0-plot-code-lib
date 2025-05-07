# Overview

Extend the library and CLI to provide a long‐running Express HTTP service exposing formula‐driven data generation and plot rendering endpoints. Users can GET or POST requests to receive JSON time series or SVG/PNG plots without using the CLI.

# HTTP Interface

GET /plot
  Query parameters:
    expression  required as y=...  
    range       required as start:end
    points      optional integer ≥ 2  
    format      optional svg or png (default svg)
  Returns:
    Content-Type image/svg+xml or image/png
    Response body: SVG markup or PNG image bytes

POST /plot
  Request body JSON:
    { expression: string, range: string, points?: number, format?: "svg"|"png" }
  Returns:
    Same image response as GET /plot

# Implementation

1. In src/lib/main.js, import express and express.json.  
2. Add new flags --serve and --port in parseArgs.  
3. If opts.serve is true, call startServer(opts) instead of CLI exit.  
4. Implement startServer(opts):
   • Create express app and use express.json() middleware
   • Mount GET and POST routes for /plot
   • In each handler:
     - Validate inputs using shared zod schema for expression, range, points, format
     - Use existing logic to compute data array
     - Call renderPlot on data to produce SVG
     - If format is png, convert with sharp to a buffer
     - Set appropriate Content-Type header and send response body
   • Listen on opts.port (default 3000) and log a startup message

# Request Validation

Use zod to define schema:
  expression: nonempty string
  range: pattern start:end with numeric start < end
  points: optional integer ≥ 2
  format: enum ["svg","png"]

On validation failure respond 400 with JSON { error: string }
On internal errors respond 500 with JSON { error: "Internal server error" }

# Behavior

• Valid requests return 200 with correct payload type
• Invalid parameters yield 400 and descriptive error
• Server continues running on errors

# Tests

Unit Tests:
  - tests/unit/http-plot.test.js
    • Test GET /plot with valid svg and png requests via supertest
    • Test POST /plot with valid body payloads
    • Test missing or invalid params return 400 and error JSON
Integration Tests:
  - tests/integration/http-server-plot.test.js
    • Start server on random port and perform real HTTP requests
    • Assert returned image signature bytes for png and <svg> start for svg
    • Shutdown server after tests

# Documentation Updates

USAGE.md:
  - Add section "Running the HTTP Plot Service" with example curl commands for GET and POST /plot
README.md:
  - Under Examples, show how to start the service with --serve and --port
  - Provide sample HTTP requests and expected responses