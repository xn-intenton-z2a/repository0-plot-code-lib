# Overview

Enable an HTTP API alongside the CLI to serve plot generation and time-series export functionality. Users can send HTTP GET requests to generate SVG or PNG images or to export CSV or JSON data.

# API Endpoints

- GET /plot
  
  Query parameters:
  - expression (required): Mathematical expression in x
  - range (required): Numeric range for x, optional y (e.g., "0:6.28" or "x=0:6.28,y=-1:1")
  - samples (optional): Integer ≥2, default 100
  - format (optional): svg or png, default svg
  - export (optional): csv or json; if provided, returns raw data
  
  Responses:
  - Content-Type image/svg+xml for SVG
  - Content-Type image/png for PNG
  - Content-Type text/csv for CSV export
  - Content-Type application/json for JSON export

- GET /health
  
  Returns status 200 and JSON { status: "ok" }

# Implementation

1. Extend src/lib/main.js to detect a new CLI flag --serve or -S and optional --port (default 3000).
2. When serve mode is active, initialize an Express server instead of running the CLI logic.
3. Add request validation with Zod for query parameters: expression, range, format, export, samples.
4. On GET /plot, call existing logic: for export queries, use exportTimeSeries in memory and send content; for plots, call generatePlot but render into a buffer or string and send via res.send.
5. Set HTTP headers based on response type.
6. Implement GET /health for basic liveness.
7. Handle errors with proper HTTP status codes and JSON error messages.
8. Graceful shutdown on SIGINT and SIGTERM.

# Testing and Documentation

- Add unit tests using supertest to cover:
  • GET /health returns status 200 and correct JSON
  • GET /plot with valid params returns correct Content-Type and content for svg, png, csv, json
  • Invalid query params return 400 with descriptive error
- Update USAGE.md and README.md to include HTTP usage examples, flags for serve and port, and sample curl commands.
