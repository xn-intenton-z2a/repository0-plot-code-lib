# Overview
Implement the Plot Command feature to fully enable the CLI “plot” subcommand and the HTTP /plot endpoint. Users will generate graphical output (SVG or PNG) from mathematical expressions or imported data, with options for styling, overlays, and encoding.

# CLI Plot Subcommand
**Flags (validated by zod)**
- --expression <function>    Mathematical expression in y=… form
- --range <axis>=min:max     Axis range for expression mode
- --data-file <path>         JSON, CSV, or YAML data file path
- --format <svg|png>         Output image format (default svg)
- --output <path>            Destination file path (stdout if omitted)
- --width <number>           Image width in pixels (default 500)
- --height <number>          Image height in pixels (default 300)
- --samples <number>         Sample count for expression mode (default 100)
- --derivative <true|false>  Overlay first derivative curve
- --overlay-trendline <true|false>  Overlay regression trendline
- --palette <colors>         Comma-separated CSS colors for series
- --encoding <base64>        Base64-encode output and print JSON

**Behavior**
1. Parse and validate flags using parseArgs and zod.
2. Load or generate data points via generateData or file reader (JSON, CSV, YAML).
3. Optionally compute derivative and regression overlays.
4. Assemble a QuickChart ChartConfiguration object with data series and style options.
5. Send a request to the QuickChart API (POST /chart or GET /chart) to render SVG or PNG.
6. If encoding is base64, wrap the response bytes in JSON {data,type} and write to stdout.
7. Otherwise write raw SVG string or binary PNG to the specified file or stdout.
8. Exit with code 0 on success, 1 on error.

# HTTP Plot Endpoint
**GET /plot**
**Query parameters (validated by zod)**
- expression, range, dataFile, format, width, height, samples, derivative, overlayTrendline, palette, encoding

**Behavior**
1. Validate and parse query parameters.
2. Generate or load data and apply derivative or trendline overlays.
3. Construct and send QuickChart request for SVG or PNG bytes.
4. If encoding=base64, respond with application/json and JSON {data,type}.
5. Otherwise respond with image/svg+xml or image/png body.
6. Always include Access-Control-Allow-Origin header.
7. Return HTTP 200 on success, 400 for validation errors, 502 on upstream failures.

# Testing
- **CLI unit tests** (Vitest): stub filesystem and mock fetch to QuickChart; verify SVG prefix or PNG magic bytes, JSON encoding, file output, error handling for invalid flags.
- **HTTP tests** (supertest): GET /plot default returns raw bytes with correct content-type; GET /plot?encoding=base64 returns JSON with data and type; invalid parameters return 400.

# Documentation
- Update USAGE.md and README.md to document CLI plot flags, subcommand syntax, and examples for SVG, PNG, and base64 output.
- Add sample curl commands and expected HTTP responses.

# Implementation
- In src/lib/main.js implement runPlotCli to handle new flags, data loading, QuickChart interaction, serialization, and exit codes.
- Extend the createServer function to replace the stub at app.get('/plot') with a fully implemented handler.
- Use native fetch or node-fetch, QuickChart API, and zod for validation.
