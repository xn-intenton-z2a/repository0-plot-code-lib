# Overview

Provide a RESTful HTTP interface to existing time series generation and plot rendering logic. This feature adds endpoints to serve plots in SVG or PNG format over HTTP, leveraging streaming to handle large payloads efficiently and ensuring proper validation and error handling.

# API Endpoints

## GET /plot and POST /plot

- Accept inputs via query parameters or JSON body:
  • expression (string, required): A formula in terms of x (e.g., y=sin(x))
  • range (string, required): Domain as start:end with numeric start < end
  • points (integer, optional): Number of samples ≥ 2 (default 100)
  • format (string, optional): One of svg or png (default svg)
  • width (integer, optional): SVG viewport width in pixels (default 800)
  • height (integer, optional): SVG viewport height in pixels (default 600)
  • margin (integer, optional): Plot margin in pixels (default 40)

- Response behavior:
  • Validate inputs using Zod schemas, returning 400 on validation errors.
  • Generate data using existing generation logic.
  • For SVG: stream the output of renderPlotStream(data, options) as text/event-stream or chunked response with Content-Type image/svg+xml.
  • For PNG: pipe the SVG stream into sharp().png() and stream resulting binary with Content-Type image/png.
  • Support HTTP backpressure to avoid buffering entire responses in memory.

# Implementation

1. Extend parseArgs to support flags --serve, --host, --port (default 0.0.0.0:3000).
2. When --serve is provided, initialize an Express server:
   - Define Zod schemas for /plot input parameters.
   - Register GET and POST /plot routes.
   - In each handler, parse and validate inputs, then call common data and plot functions.
   - For SVG, call renderPlotStream and pipe to res without full buffering.
   - For PNG, pipe renderPlotStream into sharp().png() and then to res.
   - Set appropriate Content-Type and handle errors via middleware returning JSON error responses with HTTP status codes.
3. On server start, log listening address. Handle SIGINT and SIGTERM to gracefully close the server.

# Tests

- Create tests/unit/http-api-plot.test.js using Vitest and Supertest:
  • GET /plot?expression=y=x&range=0:2&format=svg: expect 200, header Content-Type image/svg+xml, body starts with <svg.
  • GET /plot?expression=y=x&range=0:2&format=png: expect 200, header Content-Type image/png, body begins with PNG signature bytes.
  • POST /plot with JSON body for svg and png with same assertions.
  • Test invalid requests (missing expression or bad range): expect 400 with JSON { error: <message> }.
  • Simulate large points count to verify response streaming and status 200 without high memory usage.

# Documentation Updates

- In USAGE.md, add a "Running HTTP Server" section showing flags --serve, --host, --port and example curl commands for /plot.
- In README.md under "HTTP API", add subsections for /plot with example requests (curl or HTTPie) and expected response headers and body previews.