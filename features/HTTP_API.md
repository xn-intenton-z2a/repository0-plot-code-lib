# Overview

Extend the CLI tool to run as a long-running HTTP server powered by Express and Zod. Provide programmatic access to time series data generation and plot rendering without invoking the CLI for each request. Enable streaming responses for large datasets and image formats.

# Server Flags

--serve      Activate HTTP server mode.  When present, the tool initializes a web server instead of running a one-off CLI action.
--port       Port on which to listen.  Defaults to 3000.
--host       Host interface to bind.  Defaults to 0.0.0.0.

# Endpoints and Behavior

1. Validation  Define Zod schemas for expression, range, points, format, width, height, and margin.
2. GET /data and POST /data  Accept parameters in query or JSON body.  Validate inputs.  Generate time series.  If client requests ndjson by passing dataFormat=ndjson respond with newline-delimited JSON; otherwise respond with application/json array.
3. GET /plot and POST /plot  Accept same parameters plus output format svg or png.  Validate inputs.  Generate series and render SVG using existing renderPlot.  For svg respond with content-type image/svg+xml and stream the SVG.  For png pipe the SVG into sharp to produce a PNG buffer and stream with content-type image/png.
4. Streaming and backpressure  Use Express response streams and pipeline to ensure memory efficiency when sending large payloads.
5. Graceful shutdown  Listen for SIGINT and SIGTERM, close server and exit cleanly.

# Tests

Unit Tests
 • tests/unit/http-api-data.test.js  Use Supertest to exercise GET and POST /data with valid and invalid inputs.  Assert HTTP status codes, content-type headers, JSON body structure, and ndjson streaming behavior.
 • tests/unit/http-api-plot.test.js  Use Supertest to exercise GET and POST /plot for svg and png.  Assert status 200, correct content-type, response bodies start with <svg or PNG signature bytes.
Integration Tests
 • tests/integration/http-server.test.js  Start server on ephemeral port.  Send real HTTP requests for /data and /plot.  Verify header values, streaming chunk structure, and binary signatures.  Ensure server shuts down after testing.

# Documentation Updates

USAGE.md  Add section Running the HTTP Service.  Show example commands to start server and sample curl invocations for GET /data, POST /data, GET /plot, POST /plot demonstrating JSON, NDJSON, SVG, and PNG.
README.md  Under Examples add HTTP Service usage.  Show npm script serve and curl examples highlighting response formats and streaming behavior.

# Dependencies Updates

package.json  Add npm script serve mapping to node src/lib/main.js --serve.  Ensure express and zod are listed under dependencies.  Remove any unused HTTP libraries.