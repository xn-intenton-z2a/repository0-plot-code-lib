# INTERFACES

## Purpose
Provide a unified interface layer that consolidates a robust CLI powered by commander with an HTTP server. Both interfaces must share the same core logic for time series data generation and plotting. Enhance timeseries output to support csv, json, ndjson. Extend the HTTP server to include a Server‐Sent Events stream endpoint for real-time data streaming.

# Behavior

## CLI via Commander

1. Replace the simple argument parser in mainCLI with commander.
2. Define two subcommands:
   • timeseries (default): outputs x,y data.
   • plot: generates image plots.
3. Shared options for both subcommands:
   • --expression <expr> (required)
   • --range <start:end[:step]> (required)
   • --points <number> (default 100)
   • --output-file <path> (optional)
4. timeseries command options:
   • --format <csv|json|ndjson> (default csv)
5. plot command options:
   • --plot-format <svg|png> (default svg)
   • --width <number> (default 800)
   • --height <number> (default 600)
   • --title <string> (optional)
6. Global options:
   • --json-output flag: print the parsed options object as JSON and exit.
7. Default behavior when no subcommand is given: run timeseries.
8. Use shared Zod schemas to validate inputs for both CLI and HTTP parts, and produce meaningful error messages.

## HTTP Server

1. Triggered by a serve command or global --serve flag, with optional --port <number>.
2. Routes:
   • GET / returns an HTML form for expression, range, points, format, width, height, title.
   • POST /plot accepts JSON or form data, validates via Zod, and returns inline SVG or a base64 PNG image.
   • GET /stream serves a Server-Sent Events endpoint:
     - Accepts query parameters: expression, range, points, format ignored.
     - Sets header Content-Type to text/event-stream and disables timeouts.
     - Streams one event per data point in the form:
       data: { x: number, y: number }\n\n
## Implementation

- In src/lib/main.js:
  • Import commander and define program with subcommands timeseries and plot.
  • For each command, parse options via commander, then validate with Zod before invoking getTimeSeries, generateSVG, generatePNG, serializeCSV, serializeJSON, serializeNDJSON.
  • Implement NDJSON support by adding serializeNDJSON(data) that emits one JSON.stringify per line.
  • Add the --json-output flag at program level: if set, output the parsed options object and exit.
  • Default command when none is provided should invoke timeseries.
- In startHTTPServer:
  • Add GET /stream endpoint:
    1. Parse query parameters with formSchema.safeParse.
    2. On success, set text/event-stream header and loop over getTimeSeries points.
    3. For each point, write "data: <JSON>\n\n" to response and flush. End response after all points.
- Reuse existing CORS and body-parsing middleware.

## Testing

- Extend vitest tests to cover:
  • Commander integration: --help, --version, --json-output.
  • timeseries command with csv, json, ndjson formats, and output-file behavior.
  • plot command for svg and png formats with and without output-file.
  • HTTP GET /stream: use supertest to assert SSE response status, content type, and correct number of events.
