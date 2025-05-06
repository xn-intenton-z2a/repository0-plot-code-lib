# Overview
Add an HTTP server mode to the CLI tool to serve time series data and rendered plots on demand. Provide REST endpoints for data and image responses, support query parameter validation, streaming large datasets, and backpressure control.

# Source File Updates
1. In src/lib/main.js import express and serializeDataStream.
2. Add startServer(options) that:
   - Creates an Express app with JSON and URL-encoded parsers.
   - Defines GET /api/data:
     * Validate query parameters (expression, range, format, bufferSize, csvHeader) via zod.
     * Parse expression and range, generate data iterator.
     * Use serializeDataStream to stream responses with correct Content-Type and backpressure.
     * On validation or runtime error respond with HTTP 400 and JSON error message.
   - Defines GET /api/plot:
     * Validate query parameters (expression, range, plotFormat, width, height, labelX, labelY) via zod.
     * Generate data, call renderPlot to produce PNG or SVG.
     * Send image response with Content-Type image/png or image/svg+xml.
     * On error respond with HTTP 400 and JSON error.
   - Listen on configurable port (default 3000) and return server instance for tests.
3. Extend main(args) to handle a new command serve or --serve flag with --port option to invoke startServer and keep process alive instead of exiting.

# Tests
1. Unit tests in tests/unit/api-server.test.js using vitest and zod:
   - Mock express app and test that route handlers validate inputs and respond with 400 and descriptive messages on invalid queries.
   - Spy on serializeDataStream invocation and verify correct Content-Type headers for each format.
   - Spy on renderPlot to simulate PNG and SVG generation and verify binary or string responses.
2. Integration tests in tests/unit/api.integration.test.js using supertest:
   - GET /api/data returns JSON array, JSON-stream, NDJSON stream, and CSV output with header flag, with correct HTTP status and headers.
   - GET /api/plot returns valid SVG starting with <svg and PNG Buffer starting with PNG magic bytes.
   - Test backpressure by limiting response stream highWaterMark and bufferSize, ensure full data is delivered without errors.

# Documentation
1. Update USAGE.md to add an HTTP API section with example curl commands for /api/data and /api/plot, demonstrating all query parameters and output formats.
2. Update README.md under Features to describe the HTTP server mode, list endpoints, default port, required and optional query parameters, example requests, and link to USAGE.md.

# Dependencies
1. Add express to dependencies in package.json.
2. Add supertest to devDependencies for HTTP integration tests.