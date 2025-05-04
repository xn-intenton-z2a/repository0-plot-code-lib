# Purpose

Provide a unified interface layer that consolidates programmatic API, a robust CLI, and a full HTTP server API supporting JSON, CSV, NDJSON, SSE, and plot endpoints. Ensure consistency of data serialization, input validation, and error handling across all interfaces.

# Behavior

## Programmatic API

- Expose getTimeSeries(expression, range, options) returning Promise<Array<{ x, y }>>
- Export generateSVG(data, width, height, title) producing inline SVG markup
- Export generatePNG(data, width, height, title) producing Promise<Buffer> of PNG image
- Export serializeCSV(data), serializeJSON(data), serializeNDJSON(data)

## Command Line Interface via commander

- Default command timeseries (alias none) with options:
  - --expression <expr> (required)
  - --range <start:end[:step]> (required)
  - --points <number> (default 100)
  - --format <csv|json|ndjson> (default csv)
  - --output-file <path> (optional)
- Subcommand plot with options:
  - --expression, --range, --points
  - --plot-format <svg|png> (default svg)
  - --width <number> (default 800)
  - --height <number> (default 600)
  - --title <string> (optional)
  - --output-file <path> (optional)
- Validate all inputs with Zod and surface clear errors

## HTTP Server API via Express

### GET /json
- Query parameters: expression, range, points
- Response: JSON array of points
- Headers: Content-Type application/json

### GET /csv
- Query parameters: expression, range, points
- Response: CSV text with header x,y
- Headers: Content-Type text/csv

### GET /ndjson
- Returns NDJSON as before

### GET /stream
- Returns SSE events as before

### POST /plot
- Accepts JSON or form data: expression, range, points, plotFormat, width, height, title
- Returns HTML page with inline SVG or base64 PNG image

### GET /
- Serves HTML form for plot generation

# Implementation

1. In src/lib/main.js, extend startHTTPServer to register GET /json and GET /csv before existing endpoints.
2. Reuse the existing query Zod schema for /ndjson and /stream to parse and validate expression, range, and points.
3. In GET /json handler:
   - Parse req.query with the shared Zod schema
   - Call getTimeSeries and send res.json(data)
4. In GET /csv handler:
   - Parse req.query with shared Zod schema
   - Call getTimeSeries, serialize with serializeCSV, and send with res.type('text/csv')
5. Ensure CORS middleware applies to new routes and OPTIONS preflight still returns 204
6. Update USAGE.md to include examples for GET /json and GET /csv
7. Add tests in tests/unit/plot-generation.test.js to exercise GET /json and GET /csv, verifying status, headers, and response bodies

# Testing

1. HTTP integration tests for GET /json:
   - 200 status, application/json header, body is JSON array matching sample data
   - 400 status on missing or invalid params with JSON error
2. HTTP integration tests for GET /csv:
   - 200 status, text/csv header, body starts with x,y and correct rows
   - 400 status on missing or invalid params
3. Confirm all existing tests for ndjson, stream, and plot endpoints still pass
4. Run npm test to ensure full coverage