# Overview

Extend the CLI into a long-running HTTP server built on Express to expose both data generation and plot rendering functionality via RESTful endpoints. Ensure robust input validation with Zod, support streaming responses for large payloads, and integrate backpressure-aware pipelines for SVG→PNG conversion.

# API Endpoints

### GET /data

Accepts query parameters:
  • expression (required): formula in terms of x, e.g., y=sin(x)
  • range (required): start:end
  • points (optional): integer ≥ 2, default 100
  • dataFormat (optional): json, ndjson, csv; default json

Validates inputs with Zod. Generates time series and responds:
  • application/json: full array
  • application/x-ndjson: streams one JSON object per line
  • text/csv: streams header and CSV rows

### POST /data

Accepts JSON body with same fields as GET. Behaves identically to GET /data.

### GET /plot

Accepts query parameters:
  • expression (required), range (required), points (optional)
  • format (optional): svg or png; default svg
  • width, height, margin (optional numeric layout overrides)

Streams response with appropriate Content-Type:
  • image/svg+xml: uses res.write to send complete SVG string
  • image/png: pipes an SVG stream through sharp via pipeline for backpressure, then pipes PNG to res

### POST /plot

Accepts JSON body matching GET /plot. Streams responses identically.

# Server Implementation

1. Add CLI flags --serve, --host, --port to parseArgs.
2. When --serve is present, skip one-off logic and initialize an Express app.
3. Define request schemas using Zod for /data and /plot endpoints.
4. Reuse existing data generation and renderPlot functions; create renderPlotStream for incremental SVG streaming.
5. For PNG responses, use Node stream.pipeline to pipe SVG stream into sharp().png() and then to res.
6. Handle validation failures with HTTP 400 and internal errors with HTTP 500.
7. Log requests and errors at info level.
8. Gracefully handle SIGINT and SIGTERM to close the HTTP server.

# CLI Interface

--serve       Launch HTTP server instead of CLI mode
--host        Host to bind (default localhost)
--port        Port number (default 3000)

# Tests

- Unit tests with Supertest and Vitest:
  • Test GET and POST /data with json, ndjson, csv; assert status 200, headers, streamed payload shape.
  • Test GET and POST /plot with format=svg; assert status 200, Content-Type image/svg+xml, body starts with <svg.
  • Test GET and POST /plot with format=png; assert Content-Type image/png and first eight bytes match PNG signature.
  • Test invalid parameters return 400 with appropriate error messages.

- Integration tests:
  • Launch server on ephemeral port; exercise endpoints for large points count to verify streaming and backpressure.

# Documentation Updates

- In USAGE.md, add “Running HTTP Server” section with npm run start -- --serve flags, --host, and --port.
- Provide curl examples for GET and POST /data and /plot covering json, ndjson, csv, svg, and png responses.
- In README.md, under Examples, add “HTTP API” subsection documenting endpoints, flags, and response formats.