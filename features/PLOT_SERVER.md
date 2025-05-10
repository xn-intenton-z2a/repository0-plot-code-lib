# Overview
Add an HTTP API server mode that allows users to start a local web service for generating plots via REST endpoints. This enables integration with other tools, web dashboards, and automated workflows without invoking the CLI per request.

# CLI Interface
Introduce a new --serve option to launch the Express-based HTTP server. Support an optional --port flag or environment variable PORT to configure the listening port (default 3000).

Examples:
  repository0-plot-code-lib --serve
  PORT=4000 repository0-plot-code-lib --serve --port 5000

# API Endpoints
Define the following REST endpoints:

- POST /plot
  Accept a JSON body with the following properties:
    expression or dataFile: A string with a mathematical formula or path to a JSON/CSV file on the server
    format: svg or png (default svg)
    title (optional), xLabel (optional), yLabel (optional)
  Returns the generated plot image with proper Content-Type (image/svg+xml or image/png).

- GET /health
  Returns 200 OK with JSON { status: 'ok' } to verify server availability.

# Implementation
Use Express to create the HTTP server in src/lib/main.js when --serve is passed. Modularize the existing plot rendering logic from PLOT_RENDERER to handle in-memory generation. Detect request payload, validate with Zod, read files with fs.promises, and invoke chartjs-node-canvas. Handle errors with appropriate HTTP status codes and JSON error messages.

# Testing
Add unit tests in tests/unit/server.test.js using supertest. Verify:
- GET /health returns 200 and correct JSON.
- POST /plot with a formula returns an SVG buffer and correct Content-Type.
- POST /plot with invalid payload returns 400 and descriptive error JSON.

# Documentation Updates
Update README.md and USAGE.md to add a "HTTP API Server" section. Document the --serve and --port flags, the /plot and /health endpoints with request examples and response samples.