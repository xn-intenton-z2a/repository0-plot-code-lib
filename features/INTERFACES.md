# INTERFACES

## Purpose
Combine command-line and HTTP server interfaces into a unified access layer that allows users to generate time series data and visual plots via both CLI commands and web/API endpoints.

## Behavior

### CLI
1. Accept two subcommands: timeseries (default) and plot. Without a valid subcommand print usage and exit code 1.
2. Global flags:
   • --expression <expr> (required)
   • --range <start:end[:step]> (required)
3. timeseries subcommand:
   • --points <number> (default 100)
   • --format <csv|json> (default csv)
   • --output-file <path> (optional) to write output, otherwise stdout
4. plot subcommand:
   • --plot-format <svg|png> (default svg)
   • --width <number> (default 800)
   • --height <number> (default 600)
   • --title <string> (optional)
   • --output-file <path> (required for PNG, optional for SVG)
5. Validate inputs with zod or simple checks, generate data with parseRange and evaluateExpression, create SVG or PNG, write output or return buffer.
6. Exit codes: 0 on success, 1 on missing or invalid flags, 2 on evaluation errors.

### HTTP Server
1. Detect --serve flag or HTTP_PORT environment variable to start Express server.
2. Middleware:
   • CORS headers for all routes and OPTIONS support.
   • Body parsers for urlencoded and JSON payloads.
3. Routes:
   • GET /      Render HTML form for expression, range, points, plotFormat, width, height, title.
   • POST /plot Parse form or JSON body, validate with zod schema, generate SVG or PNG, return inline HTML containing SVG or an <img> with base64 PNG.
   • GET /timeseries Return CSV or JSON { x, y } list with query params expression, range, points; 400/422 on errors.
   • GET /plot Return raw SVG or PNG image data via query params; 400/422 on errors.
   • GET /stream Return SSE streaming { x, y } events until complete.
4. Consistent error handling and status codes, reuse CLI validation logic.

## Implementation
• In src/lib/main.js integrate both mainCLI and startHTTPServer functions.
• Use existing parseRange, evaluateExpression, generateSVG, serializeCSV, serializeJSON, and sharp for PNG conversion.
• Reuse zod schemas for form parameters and CLI flags where appropriate.
• Configure Express for CORS, OPTIONS, body parsing, and error handling.
• Ensure CLI and HTTP share core logic to avoid duplication.

## Testing
• CLI tests (vitest): use mainCLI with various arg sets to verify correct CSV/JSON, SVG, PNG outputs, exit codes, file writes, and error conditions.
• HTTP tests (supertest): verify GET / returns HTML form with CORS, POST /plot returns correct inline SVG/PNG, API endpoints /timeseries, /plot, /stream return expected data and error codes.