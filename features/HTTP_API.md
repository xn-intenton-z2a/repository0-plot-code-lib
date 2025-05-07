# Overview

Enhance the CLI library to expose an HTTP server that mirrors the existing generate and plot commands. Users can start a long-running HTTP service to request time series data or rendered plots over RESTful endpoints, reusing the same core logic for data generation and rendering.

# HTTP Interface

GET /generate
  Query parameters: expression required as y=..., range required as start:end, points optional integer ≥ 2
  Returns: JSON array of { x, y } points with content type application/json

GET /plot
  Query parameters: expression, range, points as above; format optional svg or png (default svg)
  Returns: image/svg+xml or image/png bytes for the rendered plot

POST /generate
  Request body JSON: { expression, range, points }
  Returns: same JSON array as GET /generate

POST /plot
  Request body JSON: { expression, range, points, format }
  Returns: same image response as GET /plot

# Implementation

1. In src/lib/main.js, import express and express.json. Extend parseArgs to accept --serve and --port flags.
2. When --serve is present, after parsing, invoke startServer(opts) instead of exiting. startServer will:
   • Create an express app
   • Use express.json() to parse POST bodies
   • Mount GET and POST routes for /generate and /plot
   • For each route, validate inputs, compute data with existing logic, and send JSON or image response
   • Listen on provided port (default 3000) and log a startup message
3. Reuse the existing data generation and renderPlot functions without duplication.

# Request Validation

Use zod to define a shared schema for expression (nonempty string), range (pattern start:end with numeric start < end), points (optional integer ≥ 2), and format (enum svg or png). Apply validation on both query and JSON body inputs. On failure respond with status 400 and JSON { error: message }.

# Behavior

• Valid requests return status 200 and correct payload.  
• Invalid inputs yield status 400 with an error JSON.  
• Internal errors yield status 500 with JSON { error: "Internal server error" }.  
• The server does not exit on errors and logs them for diagnostics.

# Tests

Unit Tests:
  • Create tests/unit/http-api-server.test.js.  
  • Mock server instance to test each endpoint handler with valid and invalid inputs.  
  • Use supertest to simulate HTTP requests and assert responses and status codes.

Integration Tests:
  • Add tests/integration/http-server-endpoints.test.js.  
  • Start the server on a random port before tests and stop it after.  
  • Perform GET and POST on /generate and /plot, assert JSON length and response signatures for svg and png.

# Documentation Updates

USAGE.md: add section "Running as HTTP Service" with example commands to start the server and curl requests for each endpoint.  
README.md: under Examples, show how to launch the HTTP API and sample HTTP requests with expected outputs.

# Dependencies

Ensure express is in dependencies (already present). No new dependencies required beyond zod for validation and sharp for PNG conversion.