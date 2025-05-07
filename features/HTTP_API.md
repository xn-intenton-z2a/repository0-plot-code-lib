# Overview

Extend the CLI tool into a long‐running HTTP server exposing existing data generation and plot rendering logic via RESTful endpoints.  The server will reuse parseArgs, data generation, renderPlot, and streaming capabilities, handling backpressure and validation to serve clients efficiently.

# API Endpoints

## GET /data and POST /data

- Accept query parameters or JSON body with:
  expression  Required string, mathematical formula in terms of x (e.g., y=sin(x))
  range       Required string, in form start:end
  points      Optional integer ≥2, default 100
  dataFormat  Optional string, one of json, ndjson, csv, default json

- Validate inputs with Zod schemas.
- Generate time series data using existing main/data-only mode logic.
- Stream responses:
  application/json: pretty-printed JSON array
  application/x-ndjson: newline-delimited JSON objects
  text/csv: header x,y then CSV rows

## GET /plot and POST /plot

- Accept query parameters or JSON body with:
  expression  Required
  range       Required
  points      Optional
  format      Optional string, svg or png, default svg
  width       Optional integer, default 800
  height      Optional integer, default 600
  margin      Optional integer, default 40

- Validate inputs with Zod.
- Generate data as for /data.
- For SVG: use renderPlotStream to produce a Readable stream of SVG chunks.
- For PNG: pipe the SVG stream through sharp().png()
- Set appropriate Content-Type headers and stream with backpressure.

# Implementation

1. Add parseArgs support for --serve, --host, --port flags with defaults (host=0.0.0.0, port=3000).
2. When --serve is provided, initialize an Express application:
   • Define Zod schemas for /data and /plot inputs.
   • Register GET and POST routes for /data and /plot.
   • On each request, parse inputs from req.query or req.body, validate, then call common data or plot logic.
   • Stream the response according to the requested format, handling errors with middleware.
3. Implement error handling middleware returning HTTP 400 for validation errors and HTTP 500 for runtime failures with JSON error responses.
4. On SIGINT/SIGTERM, gracefully shut down the HTTP server.
5. Refactor main() to branch on --serve, leaving CLI behavior unchanged when not serving.

# Tests

- Use Vitest with Supertest in tests/unit/http-api.test.js:
  • GET /data?expression=y=x&range=0:2 for json, ndjson, and csv, asserting status 200, correct Content-Type, and body format.
  • POST /data with JSON body, same assertions.
  • GET /plot?expression=y=x&range=0:2&format=svg, assert status 200, Content-Type image/svg+xml, response starts with <svg.
  • GET /plot?expression=y=x&range=0:2&format=png, assert image/png and PNG signature.
  • Invalid inputs (missing expression, bad range) return 400 with descriptive JSON.
  • Large points count streams without buffering entire payload to memory.

# Documentation Updates

- USAGE.md: add a "Running HTTP Server" section showing --serve, --host, and --port flags and example curl commands for /data and /plot.
- README.md: under "HTTP API", add subsections for /data and /plot with example requests and expected response types.
