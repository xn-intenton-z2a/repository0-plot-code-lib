# Overview

Provide a RESTful HTTP interface to existing time series generation and plot rendering logic. This feature enables users to start an Express server that accepts requests to generate data and render SVG or PNG plots directly over HTTP with proper validation and streaming.

# API Endpoints

## GET /plot

- Accept query parameters:
  • expression: string (required), e.g., y=sin(x)
  • range: string (required), start:end with numeric values and start < end
  • points: integer (optional), ≥ 2, defaults to 100
  • format: string (optional), svg or png, defaults to svg
  • width: integer (optional), defaults to 800
  • height: integer (optional), defaults to 600
  • margin: integer (optional), defaults to 40

- Validate inputs using Zod schemas. On validation error, respond with 400 and JSON { error: message }.
- On success, generate data and:
  • If format is svg: stream the SVG output via renderPlotStream and send with Content-Type image/svg+xml.
  • If format is png: pipe the SVG stream into sharp().png() and stream with Content-Type image/png.

## POST /plot

- Accept JSON body with the same fields as GET.
- Behavior identical to GET /plot.

# Implementation

1. In parseArgs, add flags:
   • --serve: start HTTP server mode
   • --host: host address (default 0.0.0.0)
   • --port: port number (default 3000)
2. When --serve is provided, initialize an Express app:
   • Import express and zod.
   • Define a Zod schema for request parameters.
   • Register GET and POST /plot routes with request parsing, validation, and error handling middleware.
   • In handlers, call existing data generation code and use renderPlotStream to produce SVG chunks.
   • For PNG responses, pipe SVG stream into sharp().png().
   • Handle backpressure and send appropriate Content-Type headers.
3. Log server start: "HTTP server listening on http://host:port".
4. Gracefully handle SIGINT and SIGTERM to close the server.

# Tests

Create tests/unit/http-api-plot.test.js using Vitest and Supertest:

• Valid requests:
  - GET /plot?expression=y=x&range=0:2&format=svg: expect status 200, Content-Type image/svg+xml, body starts with <svg.
  - GET /plot?expression=y=x&range=0:2&format=png: expect status 200, Content-Type image/png, body begins with PNG signature bytes.
  - POST /plot with JSON body for svg and png: same assertions.

• Invalid requests:
  - Missing expression or range: expect 400 and JSON { error: <message> }.
  - Bad range format: expect 400 with validation error.

# Documentation Updates

- USAGE.md:
  • Add section "Running HTTP Server" describing --serve, --host, --port flags.
  • Provide example curl commands for GET and POST /plot and notes on response headers.

- README.md:
  • Under "HTTP API", add subsections showing curl examples for SVG and PNG endpoints and expected status codes and headers.
