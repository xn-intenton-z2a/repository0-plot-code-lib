# Overview

Extend the CLI tool to launch a persistent HTTP Express server exposing endpoints for raw data and plot generation.  Users can start the service with a simple flag, query time series data or render plots via HTTP, and receive responses in JSON, NDJSON, SVG, or PNG formats.

# CLI Interface

--serve       Launch the HTTP service instead of single-shot CLI mode.
--port        Port number on which to listen.  Defaults to 3000 if omitted.
--host        Hostname or IP address to bind.  Defaults to 0.0.0.0.
--help, -h    Display usage help and exit.

# Server Initialization

1. Extend parseArgs to support --serve, --port, and --host.
2. In main(), detect serve mode: if opts.serve is true, skip single-run logic and start an Express application.
3. Create an Express app with JSON and URL-encoded middleware, and configure a shutdown handler for graceful exit.

# HTTP Endpoints

Define four routes using a shared Zod schema for validation:

GET /data
  - Query parameters: expression (required), range (required), points (optional >=2), format (optional: json|ndjson).
  - Returns application/json for default or application/x-ndjson when format=ndjson.  Stream each point for NDJSON.

POST /data
  - Body JSON: { expression, range, points?, format? }.
  - Same behavior and response types as GET /data.

GET /plot
  - Query parameters: expression, range, points?, format (optional: svg|png), width?, height?, margin?.
  - Returns image/svg+xml for SVG or image/png for PNG.  Use renderPlot and Sharp for conversion.

POST /plot
  - Body JSON: { expression, range, points?, format?, width?, height?, margin? }.
  - Same behavior and response types as GET /plot.

# Request Validation and Error Handling

- Use Zod to define and parse schemas for expression, range, points, format, width, height, margin.
- On validation failure, respond 400 with JSON { error: <message> }.
- On runtime errors (evaluation, plotting), respond 500 with JSON { error: "Internal server error" } and log details.
- For streaming endpoints, handle backpressure, send each data point with res.write and end with res.end.

# Tests

Unit Tests (tests/unit/http-data.test.js, tests/unit/http-plot.test.js):
- Use Supertest against the Express app instance.
- Verify status codes, Content-Type headers, response bodies for valid and invalid requests.
- Test JSON and NDJSON /data endpoints for correct format.
- Test /plot endpoints return valid SVG string starting with <svg and PNG buffer with signature bytes.

Integration Tests (tests/integration/http-server-data.test.js, tests/integration/http-server-plot.test.js):
- Start the server on a random port before tests and close after.
- Perform real HTTP requests and assert streaming behavior and content correctness.

# Documentation Updates

- USAGE.md: Add section "Running the HTTP Service" with example commands using --serve and --port, sample curl invocations for /data and /plot with JSON, NDJSON, SVG, and PNG.
- README.md: Under Examples, show how to start the service and perform HTTP requests, including response snippets.
- CONTRIBUTING.md: Document that adding new HTTP routes should update both tests and docs.
