# Overview

Extend the CLI to provide a persistent HTTP service for formula evaluation and plot rendering. Leverage Express for routing and Zod for input validation to enable programmatic access to data and image outputs without invoking the CLI directly.

# Source File Updates

- In src/lib/main.js modify parseArgs to support flags --serve, --port, and --host with defaults port 3000 and host 0.0.0.0.
- When opts.serve is true, initialize an Express application:
  • Import express and zod modules at the top of the file.
  • Use express.json() middleware for JSON bodies.
  • Define Zod schemas for query and body parameters: expression, range, points, format, width, height, margin.
  • Implement endpoints:
    – GET /data and POST /data: validate inputs, generate time series, respond with application/json or text/plain for ndjson streamed per line.
    – GET /plot and POST /plot: validate inputs, generate data and SVG via renderPlot, for png pipe through sharp; respond with image/svg+xml or image/png streams.
  • Add graceful shutdown handlers for SIGINT and SIGTERM to close the HTTP server.

# Tests

- Unit Tests in tests/unit/http-api-data.test.js:
  • Use Supertest to send GET /data and POST /data with valid parameters and assert status 200 and correct JSON array or newline-delimited JSON responses.
  • Test validation errors by sending missing or invalid parameters and assert 400 status with JSON error messages.

- Unit Tests in tests/unit/http-api-plot.test.js:
  • Use Supertest to send GET /plot and POST /plot for svg and png formats. Verify Content-Type headers (image/svg+xml or image/png) and that response bodies start with <svg or PNG signature bytes.
  • Test invalid formats or range and verify 400 responses.

- Integration Tests in tests/integration/http-server.test.js:
  • Start the server programmatically on an ephemeral port.
  • Send real HTTP requests using fetch or axios and verify streaming behavior, headers, and body signatures for ndjson, svg, and png.
  • Ensure server is closed after tests.

# Documentation Updates

- In USAGE.md add a section "Running the HTTP Service":
  • Example command: node src/lib/main.js --serve --port 4000
  • Curl examples for GET /data, POST /data, GET /plot, POST /plot demonstrating JSON, NDJSON, SVG, and PNG responses.

- In README.md under Examples, include:
  • Starting the server.
  • Sample curl commands with expected outputs.

# Dependencies Updates

- In package.json add a new npm script "serve": "node src/lib/main.js --serve".
- Ensure express and zod are listed under dependencies.