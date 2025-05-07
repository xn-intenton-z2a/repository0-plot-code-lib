# Overview
Extend the CLI tool into a long-running HTTP server using Express to expose data generation and plot rendering as RESTful endpoints. Validate inputs with Zod, support streaming large responses with backpressure, and reuse existing data and rendering logic.

# API Endpoints

## GET /data and POST /data
Accept parameters expression (required), range (required), points (optional), dataFormat (optional: json, ndjson, csv). Validate with Zod and respond with appropriate content type. Stream application/json, application/x-ndjson, or text/csv.

## GET /plot and POST /plot
Accept parameters expression (required), range (required), points (optional), format (optional: svg, png), width, height, margin. Validate with Zod and respond streaming image data. For SVG responses, use res.write. For PNG, pipe an SVG stream through sharp via pipeline to res with backpressure support.

# Server Implementation

1. Add CLI flags --serve, --host, --port in parseArgs.
2. When --serve is provided, initialize an Express app and register routes.
3. Define Zod schemas for /data and /plot request parameters and bodies.
4. For each route, parse and validate inputs, generate time series data with existing logic, and stream or write responses.
5. Implement renderPlotStream to emit incremental SVG chunks and pipe for PNG conversion.
6. Handle validation errors with HTTP 400 and internal errors with HTTP 500.
7. Log requests and errors to the console at info level.
8. Gracefully close the server on SIGINT and SIGTERM.

# Tests

- Use Supertest and Vitest to test GET and POST /data for json, ndjson, and csv, asserting status, headers, and streamed payload.
- Test GET and POST /plot with format svg and png, asserting Content-Type and response body starts with <svg or PNG signature.
- Test invalid input returns HTTP 400 with descriptive errors.
- Integration test to start the server on an ephemeral port and verify streaming and backpressure behavior for large points counts.

# Documentation Updates

- In USAGE.md, add a "Running HTTP Server" section describing --serve, --host, --port flags, and curl examples for /data and /plot endpoints.
- In README.md, under Examples, add an "HTTP API" subsection with sample queries and expected response types.