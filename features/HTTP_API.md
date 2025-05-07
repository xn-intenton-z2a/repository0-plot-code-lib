# Overview

Extend the existing CLI into a long-running HTTP server to expose data generation and plot rendering functionality via RESTful endpoints.  This allows programmatic access without invoking the binary per request and supports streaming large responses with proper backpressure.

# API Endpoints

### GET /data

Accepts query parameters:
  • expression (required): formula in terms of x (e.g., y=sin(x))
  • range (required): start:end
  • points (optional): integer ≥2, default 100
  • dataFormat (optional): json, ndjson, csv; default json

Validates inputs using Zod.  Generates time series and responds:
  • json: application/json with full array
  • ndjson: application/x-ndjson streaming one JSON object per line
  • csv: text/csv streaming header and rows

### POST /data

Accepts JSON body with same fields as GET.  Responds identically to GET /data.

### GET /plot

Accepts query parameters:
  • expression, range, points (same as /data)
  • format (svg or png; default svg)
  • width, height, margin (optional numeric layout overrides)

Streams response with appropriate content-type:
  • svg: image/svg+xml streaming SVG via res.write
  • png: image/png streaming PNG by piping an SVG through sharp with stream.pipeline

### POST /plot

Accepts JSON body with same fields as GET /plot.  Streams responses identically.

# CLI Interface

Add flags to start the HTTP server:

--serve         Launch HTTP server instead of one-off CLI mode
--host          Hostname to bind; default localhost
--port          Port number; default 3000

When --serve is present, skip data or plot one-off logic and boot an Express application exposing the endpoints above.

# Server Implementation

Use Express for routing and built-in JSON parser.  Define request schemas with Zod for all endpoints.  Reuse existing parseArgs, data generation, and renderPlot functions where possible.  Employ Node stream.pipeline for SVG→PNG conversion to respect backpressure.  Handle validation errors with HTTP 400 and unexpected failures with HTTP 500.  Log requests and errors at info level.  Gracefully handle SIGINT and SIGTERM to shut down the HTTP server.

# Tests

Create unit and integration tests using Supertest and Vitest:
  • Unit tests for each endpoint validating status codes, headers, and payloads for json, ndjson, csv, svg, and png responses
  • Integration tests that launch the server on an ephemeral port and exercise GET and POST for /data and /plot, asserting streaming behavior and PNG magic bytes
  • Mock error conditions (invalid parameters) returning HTTP 400

# Documentation Updates

USAGE.md:
  • Add “Running HTTP Server” section showing npm run start -- --serve flags
  • Provide curl examples for GET and POST /data and /plot, highlighting JSON, NDJSON, SVG, and PNG outputs and content types

README.md:
  • Under Examples, add a subsection “HTTP API” with curl commands and brief notes on response formats
  • Document --serve, --host, and --port flags in CLI Usage section
