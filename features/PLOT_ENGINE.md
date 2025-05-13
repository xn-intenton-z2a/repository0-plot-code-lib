# Overview
Complete implementation of the plot engine including CLI plot subcommand and HTTP /plot endpoint with SVG and PNG output.

# CLI Plot Subcommand
Add flags validated by zod
- --expression <function>  Mathematical expression in y=... form
- --range <axis>=min:max  Axis range for expression mode
- --data-file <path>  Path to JSON, CSV, or YAML data file
- --format <svg|png>  Output image format
- --output <path>  Destination file path
- --width <number>  Image width in pixels (default 500)
- --height <number>  Image height in pixels (default 300)
- --samples <number>  Sample count (default 100)
- --derivative <true|false>  Overlay first derivative curve
- --overlay-trendline <true|false>  Overlay regression trendline
- --palette <colors>  Comma separated CSS colors
- --encoding <base64>  Return JSON with encoded data

Behavior
1. Parse and validate flags with zod and parseArgs
2. Load or generate data points via generateData or read from data file
3. Compute derivative and regression overlays if requested
4. Build Chart configuration for QuickChart API
5. POST chart request and receive SVG string or PNG buffer
6. Write image to output path or report error
7. Exit with code 0 on success, 1 on failure

# HTTP Plot Endpoint
Extend express server GET /plot
Add query parameters validated by zod
- expression, range, dataFile, samples, format, width, height, derivative, overlayTrendline, palette, encoding
Behavior
1. Validate and parse query parameters
2. Generate or load data and apply overlays
3. Construct QuickChart request configuration
4. Fetch SVG or PNG bytes from QuickChart API
5. If encoding is base64 respond with application/json {data,type}
6. Otherwise respond with raw bytes and content-type image/svg+xml or image/png
7. Include Access-Control-Allow-Origin header and return 200 or 400 on errors

# Testing
Add Vitest unit tests for CLI
- Generate SVG and PNG files in stubbed filesystem, verify file existence and magic bytes or SVG prefix
Add HTTP tests using supertest
- GET /plot default returns raw bytes with correct content-type
- GET /plot?encoding=base64 returns JSON with data and type fields
- Invalid parameters return 400

# Documentation
Update USAGE.md and README.md
- Document CLI plot flags and subcommand
- Add examples for both SVG and PNG output and base64 encoding
- Include sample curl commands and expected responses

# Implementation
In src/lib/main.js implement runPlotCli function and extend createServer to handle /plot endpoint; use zod for validation and node native fetch to call QuickChart API.