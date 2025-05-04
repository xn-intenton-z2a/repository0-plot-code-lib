# INTERFACES

## Purpose
Consolidate all user interfaces and data serialization into a single unified interface layer. Provide a robust command line interface powered by commander, a streaming and form-based HTTP API via Express, and a complete programmatic API for time series generation, plotting, and data serialization in CSV, JSON, and NDJSON.

## Behavior

### Programmatic API
1. Expose getTimeSeries(expression, range, options) returning Promise of array of { x, y }.
2. Export generateSVG(data, width, height, title) producing inline SVG markup.
3. Export generatePNG(data, width, height, title) producing Promise of PNG Buffer via sharp.
4. Export serializeCSV(data), serializeJSON(data), serializeNDJSON(data) for CSV, pretty JSON, and NDJSON lines respectively.

### Command Line Interface via commander
1. Use commander to define two subcommands: timeseries (default) and plot.
2. Global options:
   • --expression <expr> (required)
   • --range <start:end[:step]> (required)
   • --points <number> (default 100)
   • --output-file <path> (optional)
   • --json-output flag: print parsed options object as JSON and exit.
3. timeseries command:
   • --format <csv|json|ndjson> (default csv)
   • When invoked, getTimeSeries and then call the matching serializer.
   • Write to stdout or file if --output-file is set.
4. plot command:
   • --plot-format <svg|png> (default svg)
   • --width <number> (default 800)
   • --height <number> (default 600)
   • --title <string> (optional)
   • Render SVG or PNG and write to stdout or file if specified.
5. Default behavior when no subcommand is given is equivalent to timeseries.
6. Validate all CLI inputs using Zod schemas before execution and provide meaningful errors.

### HTTP Server API
1. Triggered by a serve command or global --serve flag with optional --port <number>.
2. Middleware: enable CORS, parse JSON and URL-encoded bodies.
3. GET / returns an HTML form for expression, range, points, format, width, height, title.
4. POST /plot accepts JSON or form data, validates via Zod. Returns inline SVG or base64 PNG in HTML.
5. GET /stream serves Server-Sent Events:
   • Query params: expression, range, points.
   • Validate with Zod.
   • Set Content-Type to text/event-stream and disable timeouts.
   • Stream each data point as an SSE event: data: { x: number, y: number }\n\n.

## Implementation
1. In src/lib/main.js:
   • Import commander and define program, subcommands, and options.
   • Create Zod schemas for CLI and HTTP parameters.
   • Add serializeNDJSON mapping each data point to JSON.stringify and joining with newline.
   • Implement global --json-output in commander action.
   • In startHTTPServer add GET /stream endpoint writing SSE events.
   • Reuse generateSVG, generatePNG, getTimeSeries, and serializers in all interfaces.
2. Ensure the exports for all functions reflect the updated API.

## Testing
1. Update unit tests to cover:
   • serializeNDJSON output lines and format.
   • Command line parsing and execution for timeseries and plot subcommands, including formats csv, json, ndjson, and --json-output behavior.
   • Handling of --output-file for all formats.
   • HTTP endpoints: GET /, POST /plot for svg and png, and GET /stream SSE behavior using supertest.
2. Maintain existing tests for parseRange, evaluateExpression, serializeCSV, serializeJSON, generateSVG, generatePNG, getTimeSeries.
