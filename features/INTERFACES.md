# Purpose

Consolidate all user interfaces and data serialization into a unified interface layer that supports CSV, JSON, NDJSON, SVG, PNG, a programmatic API, a command line interface, and HTTP endpoints including streaming via Server-Sent Events.

# Behavior

## Programmatic API

1. Expose getTimeSeries(expression, range, options) returning a Promise of an array of { x, y } points.
2. Export generateSVG(data, width, height, title) producing inline SVG markup.
3. Export generatePNG(data, width, height, title) producing a Promise of a PNG Buffer via sharp.
4. Export serializeCSV(data), serializeJSON(data), and serializeNDJSON(data) for CSV, pretty JSON, and NDJSON respectively.

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

1. GET / returns an HTML form interface for plot generation.
2. GET /ndjson streams time series data in NDJSON format; query params: expression, range, points; content-type application/x-ndjson.
3. GET /stream streams each data point as Server-Sent Events; query params: expression, range, points; content-type text/event-stream; each event formatted as data: JSON followed by double newline; connection closed after streaming all points.
4. POST /plot accepts JSON or form data; validated with Zod; for svg returns an HTML page with inline SVG; for png returns an HTML page with an img tag containing a base64 PNG.
5. Enable CORS for all endpoints and support OPTIONS preflight.

# Implementation

1. In src/lib/main.js add a new GET /stream route after /ndjson. Use a Zod query schema to parse and validate expression, range, and points.  
2. On valid params, call getTimeSeries to generate data.  
3. Set response headers:
   - Content-Type: text/event-stream
   - Cache-Control: no-cache
   - Connection: keep-alive
4. Call res.flushHeaders(), then for each data point write `data: ${JSON.stringify(point)}\n\n`.  
5. After all points are written, call res.end().  
6. On validation or generation error, send a 400 JSON error response.
7. Ensure Zod schemas and error handling align with existing endpoints.

# Testing

1. Add HTTP integration tests for GET /stream.  
   - Expect 200 status and content-type text/event-stream.  
   - Read streamed lines, ensure each line starts with data: and contains valid JSON for each point.
   - Ensure sequence count matches points parameter.  
2. Validate error cases: missing expression or invalid range yields 400 and JSON error.  
3. Run npm test to confirm all new and existing tests pass.