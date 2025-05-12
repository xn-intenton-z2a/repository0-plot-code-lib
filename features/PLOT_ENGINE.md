# Overview
Enhance and fully implement the plot subcommand and HTTP /plot endpoint to generate SVG and PNG images from mathematical expressions or input data files. Support both raw output and encoded responses, and configure CORS origins for secure embedding.

# CLI Plot Subcommand
Extend the plot subcommand to accept:
- expression: mathematical expression in form y=... (required unless dataFile provided)
- range: axis=min:max for expression mode (required when expression provided)
- format: svg or png (required)
- dataFile: path to JSON, CSV, or YAML file with data points (optional alternative to expression)
- width, height: image dimensions (default 800x600)
- samples: number of sample points for expression mode (default 100)
- xLog, yLog: flags for logarithmic scales
- grid: include grid lines
- title, xLabel, yLabel: chart annotations
- derivative: overlay first derivative curve
- overlayTrendline: overlay regression trendline on plot
- palette, colors: styling options
- exportData and exportFormat: raw data export
- encoding: base64 or url to output JSON with encoded image instead of raw bytes
- corsOrigins: comma-separated list of allowed origins for CORS when in server mode

Behavior:
1. Parse and validate flags and required options, emit error and exit code 1 on failure.
2. Load data points from expression or dataFile using generateData or file parsing.
3. Generate SVG markup via generatePlot with styling and overlays.
4. If format is png, convert SVG to PNG using sharp.
5. If exportData set, write raw points to file in specified exportFormat.
6. If encoding is provided, emit JSON object with fields data (encoded string) and type (svg or png).
7. Otherwise write binary SVG or PNG to stdout or specified output file.
8. Exit with code 0 on success.

# HTTP /plot Endpoint
Route: GET /plot

Query parameters mirror CLI flags:
expression, dataFile, range, format, width, height, samples, xLog, yLog, grid, title, xLabel, yLabel, derivative, overlayTrendline, palette, colors, encoding, corsOrigins

Behavior:
1. Determine allowed origins from corsOrigins query, CLI flag, or CORS_ORIGINS environment variable, defaulting to '*'.
2. Validate all parameters with zod, return 400 JSON on validation errors.
3. Load data points from expression or dataFile.
4. Generate SVG and convert to PNG if required.
5. Set Access-Control-Allow-Origin header to resolved origins.
6. If encoding is provided, respond with application/json containing data and type.
7. Otherwise respond with image/svg+xml or image/png bytes and 200 status.
8. Handle errors with 400 JSON responses.

# Implementation
- Update parseArgs to include --encoding and --cors-origins flags for CLI.
- Implement runPlotCli in src/lib/main.js following the CLI behavior steps.
- In setupHttp or createServer, register GET /plot handler with zod schema for query validation.
- Use generateData, parseRange, and a new generatePlot utility to produce SVG.
- Integrate sharp for SVG to PNG conversion when format is png.
- Manage CORS origins by reading CLI flag and environment variable.

# Testing
- Add unit tests for CLI plot subcommand covering SVG and PNG output, encoding modes, and error conditions.
- Add HTTP tests via supertest for GET /plot:
  • expression mode raw image and encoded JSON
  • dataFile mode raw image and encoded JSON
  • correct Content-Type headers
  • Access-Control-Allow-Origin with custom and default origins
  • error responses on missing required params or invalid values

# Documentation
- Update USAGE.md to include examples for HTTP /plot with encoding and dataFile parameters.
- Update README.md under HTTP Server Mode, adding encoding and dataFile usage and CORS configuration.