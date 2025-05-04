# Purpose

Consolidate all user interfaces and data serialization into a unified interface layer supporting multiple data output formats, a programmatic API, a CLI using commander, and a full-featured HTTP API including JSON, CSV, NDJSON, SSE, and plot endpoints.

# Behavior

## Programmatic API

1. Expose getTimeSeries(expression, range, options) returning a Promise of an array of { x, y } points.
2. Export generateSVG(data, width, height, title) producing inline SVG markup.
3. Export generatePNG(data, width, height, title) producing a Promise of a PNG Buffer via sharp.
4. Export serializeCSV(data), serializeJSON(data), serializeNDJSON(data) for CSV, pretty JSON, and NDJSON respectively.

## Command Line Interface via commander

1. Default command timeseries with options:
   - --expression <expr> (required)
   - --range <start:end[:step]> (required)
   - --points <number> (default 100)
   - --format <csv|json|ndjson> (default csv)
   - --output-file <path> (optional)
2. Subcommand plot with options:
   - --plot-format <svg|png> (default svg)
   - --width <number> (default 800)
   - --height <number> (default 600)
   - --title <string> (optional)
   - --output-file <path> (optional)
3. Validate inputs with Zod schemas and provide clear errors.

## HTTP Server API via Express

1. GET /json
   - Query params: expression, range, points
   - Response: JSON array of { x, y } points
   - Content-Type: application/json
2. GET /csv
   - Query params: expression, range, points
   - Response: CSV text with header x,y and rows
   - Content-Type: text/csv
3. GET /ndjson
   - Query params: expression, range, points
   - Response: NDJSON, one JSON object per line
   - Content-Type: application/x-ndjson
4. GET /stream
   - Query params: expression, range, points
   - Response: Server-Sent Events streaming each point as data: <json> events
   - Headers: text/event-stream, no-cache, keep-alive
5. POST /plot
   - Accept JSON or form data: expression, range, points, plotFormat, width, height, title
   - plotFormat svg returns HTML page with inline SVG
   - plotFormat png returns HTML page with img tag embedding base64 PNG
6. Enable CORS for all endpoints and handle OPTIONS preflight.

# Implementation

1. In src/lib/main.js extend startHTTPServer to register GET /json and GET /csv routes before existing endpoints.
2. For each data endpoint use a shared Zod query schema to parse and validate expression, range, and points.
3. On valid params call getTimeSeries and serialize according to route:
   - /json use res.json(data)
   - /csv use res.type('text/csv') and send serializeCSV(data)
4. Maintain existing /ndjson, /stream, and /plot implementations without change.
5. Ensure CORS middleware applies to new routes and supports OPTIONS.

# Testing

1. Add HTTP integration tests for GET /json and GET /csv:
   - Expect 200 status; application/json for /json; text/csv for /csv.
   - Validate body is correct JSON array or CSV text matching sample input.
2. Confirm existing tests for /ndjson and /stream still pass.
3. Test error cases for missing or invalid query params on /json and /csv returning 400 JSON error.
4. Run npm test to ensure all tests pass.