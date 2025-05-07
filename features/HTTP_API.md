# Overview
Provide a RESTful HTTP interface to expose both time series data generation and plot rendering capabilities over HTTP. Leverage existing data generation and rendering functions to support streaming responses, unified validation using Zod, and graceful shutdown for integration into web applications and pipelines.

# API Endpoints

## GET /data

Accept query parameters:
  • expression: string (required) – mathematical formula in terms of x (for example y=sin(x))
  • range: string (required) – form start:end with numeric values and start < end
  • points: integer (optional) – number of samples to generate, minimum 2, default 100
  • dataFormat: string (optional) – json, ndjson, or csv, default json

Behavior:
  1. Validate inputs with a Zod schema. On validation error, respond 400 and JSON `{ error: message }`.
  2. Generate the data array using existing logic.
  3. Stream response according to dataFormat:
     • json: send full JSON array with Content-Type `application/json`
     • ndjson: send one JSON object per line with Content-Type `application/x-ndjson`
     • csv: send header line `x,y` then comma-separated values with Content-Type `text/csv`

## GET /plot

Accept query parameters (same as /data) plus:
  • format: string (optional) – svg or png, default svg
  • width: integer (optional) – output width in pixels, default 800
  • height: integer (optional) – output height in pixels, default 600
  • margin: integer (optional) – plot margin in pixels, default 40

Behavior:
  1. Validate inputs with Zod. On error, respond 400.
  2. Generate data array.
  3. For svg: call renderPlot to produce a full SVG string or use a streaming variant if large, then stream with Content-Type `image/svg+xml`.
  4. For png: generate SVG, pipe into `sharp().png()`, and stream with Content-Type `image/png`.

## POST /data and POST /plot

Support JSON body with the same parameters as GET endpoints. Behavior mirrors GET handlers.

# Implementation

1. Extend parseArgs in src/lib/main.js to support flags `--serve`, `--host` (default 0.0.0.0), and `--port` (default 3000). When `--serve` is present, skip CLI output logic and start the HTTP server.
2. Initialize an Express app with JSON body parsing. Define Zod schemas for query and body parameters.
3. Register routes for GET and POST on `/data` and `/plot`. In each handler, call existing data generation and rendering functions.
4. Stream responses to respect backpressure. For large CSV or ndjson, use Node streams rather than buffering full payload.
5. Handle validation errors centrally and send consistent error responses.
6. On startup, log `HTTP server listening on http://host:port`. Listen for SIGINT and SIGTERM to gracefully shut down the server.

# Tests

Create tests/unit/http-api.test.js using Vitest and Supertest:
  • GET /data default: expect status 200, `application/json`, body is an array of `{ x, y }` objects.
  • GET /data?dataFormat=ndjson: expect status 200, `application/x-ndjson`, lines equal JSON objects.
  • GET /data?dataFormat=csv: expect status 200, `text/csv`, first line `x,y`, numeric rows follow.
  • GET /plot: format svg: expect 200, `image/svg+xml`, body starts with `<svg`.
  • GET /plot?format=png: expect 200, `image/png`, body begins with PNG signature bytes.
  • POST variants for /data and /plot with JSON bodies produce identical results.
  • Missing or invalid parameters return 400 with JSON error message.

# Documentation Updates

- In USAGE.md, add sections:
  • "Running HTTP Server" describing `--serve`, `--host`, and `--port` flags with examples.
  • "Data Endpoint" with curl examples for `/data` in json, ndjson, and csv.
  • "Plot Endpoint" with curl examples for `/plot` in svg and png.
- In README.md under Examples, add an "HTTP API" subsection with sample curl commands and notes on response headers.