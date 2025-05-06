# Overview
Extend the CLI tool with an HTTP server mode to serve time series data and rendered plots on demand. Provide REST endpoints for programmatic integration and support streaming large datasets and image responses.

# Source File Updates
1. In src/lib/main.js import express and serializeDataStream from data formats module.
2. Add function startServer(options) that:
   - Creates an Express app with JSON and URL-encoded body parsing.
   - Defines GET /api/data:
     * Validate query parameters with zod: expression (required), range (required), format (json, json-stream, ndjson, csv), bufferSize (number), csvHeader (boolean).
     * Parse expression and range, generate data iterator.
     * Use serializeDataStream to stream response with correct Content-Type and backpressure.
     * On validation or runtime error respond with 400 and JSON error message.
   - Defines GET /api/plot:
     * Validate query with zod: expression, range, plotFormat (svg, png), width, height, labelX, labelY.
     * Generate data and call renderPlot to get Buffer or SVG string.
     * Send response with Content-Type image/png or image/svg+xml.
     * On error respond with 400 and JSON error.
   - Listen on specified port (default 3000) and return server instance for tests.
3. Extend main(args) to handle a new command serve or --serve flag with --port option to invoke startServer and keep the process alive.

# Tests
1. Unit tests for startServer in tests/unit/api-server.test.js using vitest and zod:
   - Mock express app and spy on route handlers.
   - Validate query parameter failures yield 400 and descriptive error.
2. Integration tests in tests/unit/api.integration.test.js using supertest:
   - GET /api/data returns JSON array, NDJSON stream, CSV output with header flag, and correct Content-Type.
   - GET /api/plot returns SVG starting with <svg and PNG Buffer with PNG magic bytes.
   - Test backpressure and bufferSize by setting small highWaterMark on response.

# Documentation
1. Update USAGE.md to add an HTTP API section with example curl commands for /api/data and /api/plot demonstrating all options and output formats.
2. Update README.md under Features to describe the HTTP server mode, list endpoints, default port, query parameters, and link to usage details.

# Dependencies
1. Ensure express is listed under dependencies in package.json.
2. Add supertest to devDependencies for HTTP integration tests.