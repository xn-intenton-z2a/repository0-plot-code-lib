# Overview

Extend the CLI tool to offer a persistent HTTP service that receives formula parameters and returns time series data or rendered plots. This brings an HTTP API to the existing library, enabling integration with web clients, scripts, and other services without invoking the CLI directly.

# CLI Interface

--serve       Launch the HTTP server instead of one-off CLI mode
--port        Port number to listen on (default: 3000)
--host        Hostname or IP address to bind (default: 0.0.0.0)

# Server Initialization

1. In parseArgs, add support for --serve, --port, and --host flags.
2. When opts.serve is true, initialize an Express application:
   • Use express.json() and express.urlencoded middleware
   • Configure CORS if needed for browser clients
   • Attach graceful shutdown handlers on SIGINT and SIGTERM to close the server
   • Listen on opts.host and opts.port

# HTTP Endpoints

GET /data
  • Query parameters: expression (required), range (start:end), points (optional ≥2), format (json|ndjson)
  • Default response format: application/json with a JSON array of points
  • When format=ndjson, stream newline-delimited JSON, one point per line

POST /data
  • Accept JSON body: { expression, range, points?, format? }
  • Same response behavior as GET /data

GET /plot
  • Query parameters: expression, range, points?, format (svg|png), width?, height?, margin?
  • For svg: respond with Content-Type image/svg+xml and send the SVG document
  • For png: pipe the SVG through sharp and stream Content-Type image/png

POST /plot
  • Accept JSON body: { expression, range, points?, format?, width?, height?, margin? }
  • Same response behavior as GET /plot

# Request Validation and Error Handling

1. Use Zod to define schemas for expression, range, points, format, width, height, and margin.
2. On schema validation failure, respond with 400 Bad Request and JSON { error: message }.
3. On evaluation or rendering errors, catch exceptions and respond with 500 Internal Server Error and JSON { error: "Internal server error" }.
4. Ensure proper backpressure when streaming NDJSON or PNG data.

# Tests

Unit Tests (tests/unit/http-api-data.test.js, tests/unit/http-api-plot.test.js):
  • Use Supertest against the Express app instance imported from main.
  • Verify 200 responses and correct Content-Type headers for valid /data and /plot requests.
  • For ndjson: assert multiple lines and valid JSON per line.
  • For svg: assert response body starts with <svg.
  • For png: capture the stream buffer and assert the PNG signature bytes.

Integration Tests (tests/integration/http-server-data.test.js, tests/integration/http-server-plot.test.js):
  • Start the server on an ephemeral port via spawn or direct import and listen.
  • Send real HTTP requests with curl or fetch and verify streaming behavior, headers, and content.
  • Clean up server process after tests.

# Documentation Updates

- USAGE.md: Add a section "Running the HTTP Service" with example curl commands for GET and POST /data and /plot, showing JSON, NDJSON, SVG, and PNG responses.
- README.md: Under Examples, add snippets demonstrating how to start the server and call each endpoint, including sample outputs.
- CONTRIBUTING.md: Document guidelines for adding new HTTP routes and updating both tests and documentation when expanding the API.
- package.json: Ensure express and zod are listed under dependencies (they already are), and add a script "serve" to run node src/lib/main.js --serve.
