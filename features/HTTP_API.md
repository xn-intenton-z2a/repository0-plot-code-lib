# Overview

Extend the CLI tool into a long-running HTTP server using Express and Zod to provide programmatic access to time series data generation and plot rendering. This enables clients to request JSON, NDJSON, SVG, or PNG responses over HTTP, with streaming and backpressure support for large payloads.

# Endpoints and Validation

## Common Parameters
Define Zod schemas for:
- expression: string starting with or without `y=` and containing a single variable x
- range: string in `start:end` form with numeric start < end
- points: integer ≥ 2 (default 100)
- dataFormat: enum `json` or `ndjson` (default json)
- format: enum `svg` or `png` (default svg)
- width, height, margin: optional numeric plot options (defaults width 800, height 600, margin 40)

## GET /data
- Accepts query parameters: expression, range, points, dataFormat
- Validate inputs via Zod
- Generate time series points
- If dataFormat=json respond with `application/json` and full array
- If dataFormat=ndjson respond with `application/x-ndjson` and stream one JSON object per line

## POST /data
- Same behavior as GET /data, but accepts JSON body with the same parameters

## GET /plot
- Accepts query parameters: expression, range, points, format, width, height, margin
- Validate inputs via Zod
- Generate series, call existing renderPlot
- If format=svg respond with `image/svg+xml` and stream SVG chunks
- If format=png pipe SVG into sharp to produce PNG and respond with `image/png` stream

## POST /plot
- Same behavior as GET /plot, but parameters in JSON body

# Server Behavior and Implementation

1. Add flags in `parseArgs`: `--serve`, `--host <host>`, `--port <port>` to start server instead of one-off CLI
2. When `--serve` is present, initialize an Express app:
   - Apply JSON body parser middleware
   - Mount the four endpoints above
   - Use Node streams and `res.write` or `pipeline` to send large responses with backpressure
3. Log requests and errors at INFO level, return HTTP 400 on validation errors, 500 on unexpected errors
4. On SIGINT or SIGTERM, close the HTTP server gracefully and exit process

# Tests

- **Unit Tests**
  - tests/unit/http-api-data.test.js: use Supertest to call GET and POST /data, assert status, content-type, JSON array or NDJSON streaming
  - tests/unit/http-api-plot.test.js: use Supertest to call GET and POST /plot for svg and png, assert status 200, headers, SVG starts with `<svg`, PNG signature bytes

- **Integration Test**
  - tests/integration/http-server.test.js: start server on ephemeral port, send real HTTP requests for all endpoints, verify streaming behavior, and cleanup

# Documentation Updates

- In USAGE.md add section “Running the HTTP Server” with:
  - npm script `serve` example
  - curl examples for GET /data, POST /data with both JSON and NDJSON
  - curl examples for GET /plot, POST /plot returning SVG and PNG

- In README.md under Examples, add HTTP service usage with sample commands and expected response types

# Dependencies

- Move `express` and `zod` from devDependencies to dependencies in package.json
- Ensure `sharp` remains a dependency for PNG conversion

