# Overview
Add an HTTP API server mode for dynamic on-demand plot generation. Users can launch a local web service and send plot requests over REST to integrate with dashboards, automation pipelines, or other systems.

# CLI Interface
Introduce two new flags to the CLI:

--serve
  Start the HTTP server instead of executing a one-off plot or batch command.

--port <number>
  Specify the listening port. Default 3000. Can also be set via PORT environment variable.

Examples:
repository0-plot-code-lib --serve
PORT=4000 repository0-plot-code-lib --serve --port 5000

# API Endpoints

POST /plot
  Request Body (application/json):
    expression   A formula string such as y=sin(x) (mutually exclusive with dataFile)
    dataFile     Absolute path to a server-accessible JSON or CSV data file
    format       svg or png (default svg)
    width        Optional canvas width in pixels (default 600)
    height       Optional canvas height in pixels (default 400)
    title        Optional plot title
    xLabel       Optional X axis label
    yLabel       Optional Y axis label
  Response:
    200 OK
      Content-Type: image/svg+xml for svg or image/png for png
      Body: Raw image data (SVG text or binary PNG)
    400 Bad Request
      Content-Type: application/json
      Body: { error: string }
    500 Internal Server Error
      Content-Type: application/json
      Body: { error: string }

GET /health
  Response:
    200 OK
      Content-Type: application/json
      Body: { status: 'ok', uptime: number }

# Implementation

- Detect --serve flag in src/lib/main.js and initialize an Express application in place of CLI logic.
- Use express.json() to parse JSON bodies and reject other content types with 415.
- Define a Zod schema for plot requests matching existing plotTask definitions (expressionOrDataFile union, format, width, height, title, xLabel, yLabel).
- In the /plot handler:
  - Validate the request payload with Zod. On validation failure return 400 with error details.
  - Invoke the programmatic API renderPlot or generatePlot function imported from the same module, passing the validated inputs.
  - On success, set the appropriate Content-Type header and send the raw image data (string for SVG, Buffer for PNG).
  - On errors during rendering or file I/O, catch and return 500 with error message in JSON.
- In the /health handler, return JSON with status 'ok' and process.uptime().
- Ensure the server listens on the configured port and logs a startup message.

# Testing

- Add a test file tests/unit/server.test.js using supertest:
  - Verify GET /health returns status 200 with JSON containing status 'ok' and a numeric uptime.
  - Test POST /plot with a valid expression and default options returns an SVG response and Content-Type image/svg+xml.
  - Test POST /plot with format=png returns a binary response with PNG signature and Content-Type image/png.
  - Test POST /plot with a valid JSON or CSV dataFile path returns the expected image buffer.
  - Test invalid payloads (missing both expression and dataFile, unsupported format) return 400 with descriptive error JSON.
  - Simulate internal errors by mocking renderPlot or fs.promises and verify 500 responses.

# Documentation Updates

- Update README.md to add a new "HTTP API Server" section detailing --serve and --port flags and example invocations.
- Update USAGE.md to include the server mode under CLI usage and document the /plot and /health endpoints with sample curl commands.
- Where the source stands up an HTTP endpoint, document it in the README as part of the public API.