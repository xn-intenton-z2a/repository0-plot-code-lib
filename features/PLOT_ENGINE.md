# Overview
Enhance the existing plot functionality by fully implementing the CLI plot subcommand and the HTTP /plot endpoint. Enable users to generate SVG or PNG images from mathematical expressions or data files, with optional derivative overlays, regression trendlines, custom dimensions, color palettes, and base64 encoding for HTTP responses.

# CLI Plot Subcommand
Add and validate flags:
- --expression <function>    mathematical expression in y=… form
- --range <axis>=min:max     axis range for computed mode
- --data-file <path>         JSON, CSV, or YAML file of data points
- --format <svg|png>         output image format
- --output <path>            file path to write image (required)
- --width <number>           image width in pixels (default 500)
- --height <number>          image height in pixels (default 300)
- --samples <number>         sample count for expression mode (default 100)
- --derivative <true|false>  overlay first derivative curve
- --overlay-trendline <true|false> overlay regression trendline
- --palette <colors>         comma-separated list of CSS colors

Behavior:
1. Parse and validate all flags using zod; exit code 1 on validation errors.
2. Generate data points via generateData or read from dataFile as JSON, CSV, or YAML.
3. If derivative flag is true, compute finite-difference derivative series.
4. If overlay-trendline is true, compute regression parameters and trendline points.
5. Build a Chart.js configuration object including series, overlays, dimensions, and palette.
6. Send a POST request to QuickChart API (/chart) with width, height, format, and chart config.
7. Receive image buffer or SVG string; write output to specified file; set exit code 0 on success.

# HTTP Plot Endpoint
Extend Express server at GET /plot with query parameters:
- expression, range, dataFile, format, width, height, samples, derivative, overlayTrendline, palette, encoding

Behavior:
1. Validate query parameters using zod; return 400 on invalid input.
2. Generate or load data points as in CLI.
3. Apply derivative and regression overlays if requested.
4. Construct Chart.js config and request image from QuickChart API.
5. If encoding=base64, return application/json with fields data (base64 string) and type (svg or png).
6. Otherwise set content-type to image/svg+xml or image/png and stream raw bytes.
7. Include Access-Control-Allow-Origin: * header; return 200 on success.

# Implementation
- Implement runPlotCli in src/lib/main.js, replacing existing stub.
- Update createServer in src/lib/main.js to handle GET /plot with full logic.
- Add node-fetch or axios as a dependency for HTTP requests to QuickChart.
- Use js-yaml and existing parseArgs, parseRange, generateData, computeRegression.

# Testing
- Add unit tests for CLI in tests/unit/plot-cli.test.js:
  - Verify SVG and PNG outputs in computed and file modes.
  - Test derivative and overlay-trendline flags.
- Add HTTP tests in tests/unit/plot-http.test.js using supertest:
  - GET /plot returns correct status and content-type for svg and png.
  - GET /plot?encoding=base64 returns JSON with base64 data and correct type.
  - Invalid parameters return 400.

# Documentation
- Update USAGE.md and README.md to document plot subcommand flags and /plot endpoint.
- Provide examples for computed and file modes, derivative and trendline overlays, base64 encoding.