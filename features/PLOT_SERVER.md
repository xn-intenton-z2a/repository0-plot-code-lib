# Overview
Add an HTTP API mode for dynamic chart generation via REST endpoints. Users can start a local web server that accepts plot requests over HTTP for integration with dashboards and automation workflows.

# CLI Interface
Introduce new flags for server mode:

  --serve
    Launch the HTTP server instead of running a single plot command or batch mode.

  --port <number>
    Specify the listening port. Can also be set via the PORT environment variable. Default is 3000.

Examples:
  repository0-plot-code-lib --serve
  PORT=4000 repository0-plot-code-lib --serve --port 5000

# API Endpoints

POST /plot
  Request Body (application/json):
    expression or dataFile    A formula string (e.g. y=sin(x)) or an absolute path to a JSON or CSV file on the server
    format                   svg or png (default svg)
    width                    Optional canvas width (default 600)
    height                   Optional canvas height (default 400)
    title                    Optional plot title
    xLabel                   Optional X axis label
    yLabel                   Optional Y axis label
  Response:
    200 OK with image payload
      Content-Type: image/svg+xml or image/png
      Body: Raw image data
    400 Bad Request for validation errors with JSON { error: string }
    500 Internal Server Error for processing failures with JSON { error: string }

GET /health
  Response:
    200 OK application/json
      { status: 'ok', uptime: number }

# Implementation

- Detect the --serve flag in src/lib/main.js and invoke an Express application instead of CLI logic.
- Use express.json() middleware to parse JSON request bodies. Reject unsupported content types with 415.
- Validate request payloads using Zod schemas matching existing plot task definitions, extended to include width and height.
- For each valid /plot request, call the programmatic renderPlot function from PLOT_RENDERER to generate a Buffer or SVG string.
- Stream the result back with the correct Content-Type header and auto-detect response encoding for binary (png) or utf-8 (svg).
- Implement /health to return server status and process uptime.
- Handle file I/O and rendering errors by sending structured JSON errors with appropriate HTTP status codes.

# Testing

- Add unit tests in tests/unit/server.test.js using supertest:
  - Verify GET /health returns 200 with JSON status and uptime fields.
  - POST /plot with valid formula returns an SVG buffer and Content-Type image/svg+xml.
  - POST /plot with valid CSV or JSON dataFile returns a buffer with expected PNG signature when format=png.
  - Invalid payloads (missing expression and dataFile, unsupported format) return 400 with descriptive error JSON.
  - Simulate internal render errors and verify 500 responses.
- Mock fs.promises and renderPlot to isolate HTTP logic.

# Documentation Updates

- Update README.md to add a new “HTTP API Server” section describing --serve and --port flags.
- Document /plot and /health endpoints with request and response examples.
- Update USAGE.md to reference HTTP server mode under CLI usage and link to examples in README.
