# Overview

Extend the CLI tool to launch a persistent HTTP service that exposes endpoints for generating raw time series data and rendering plots in SVG or PNG. Users can start the server with a flag, send HTTP GET or POST requests with expression and range parameters, and receive streamed responses for data or image files.

# CLI Interface

--serve       Launch the HTTP server instead of one-off CLI mode
--port        Port number to listen on (default: 3000)
--host        Hostname or IP address to bind (default: 0.0.0.0)
--help, -h    Display usage help and exit

# Server Initialization

1. Parse --serve, --port, --host flags in parseArgs
2. When opts.serve is true, initialize an Express app with JSON and URL-encoded middleware
3. Add graceful shutdown handlers on SIGINT and SIGTERM
4. Listen on the configured host and port

# HTTP Endpoints

GET /data
  • Query: expression (required), range (start:end), points (optional ≥2), format (json|ndjson)
  • Default: application/json. When format=ndjson, stream each point line-by-line

POST /data
  • Body JSON: { expression, range, points?, format? }
  • Same behavior as GET /data

GET /plot
  • Query: expression, range, points?, format (svg|png), width?, height?, margin?
  • For svg: respond with Content-Type image/svg+xml and a complete SVG document
  • For png: generate PNG via sharp stream and respond with Content-Type image/png, piping stream

POST /plot
  • Body JSON: { expression, range, points?, format?, width?, height?, margin? }
  • Same behavior as GET /plot

# Request Validation and Error Handling

Use Zod to define shared schemas for expression, range, points, format, width, height, margin
• On validation errors: respond 400 Bad Request with JSON { error: <message> }
• On evaluation or rendering errors: respond 500 Internal Server Error with JSON { error: "Internal server error" }
• Ensure proper backpressure handling when streaming JSON or image data

# Tests

Unit tests (tests/unit/http-data.test.js, tests/unit/http-plot.test.js)
  • Use Supertest against the Express app instance
  • Verify status codes, Content-Type, response formats for valid and invalid requests
  • For ndjson: assert multiple lines each as valid JSON objects
  • For SVG: assert response begins with <svg
  • For PNG: assert first eight bytes match the PNG signature

Integration tests (tests/integration/http-server-data.test.js, tests/integration/http-server-plot.test.js)
  • Start server on ephemeral port, run real HTTP requests
  • Assert streaming behavior, correct headers, and response content
  • Clean up server after tests

# Documentation Updates

- USAGE.md: Add section "Running the HTTP Service" with example curl commands for /data and /plot
- README.md: Add examples showing how to start the server and invoke endpoints, include snippets of JSON, NDJSON, SVG, and PNG responses
- CONTRIBUTING.md: Document that adding new HTTP routes requires updating both tests and documentation
