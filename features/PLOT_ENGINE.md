# Overview
Extend the existing plot functionality by fully implementing the CLI plot subcommand and the HTTP /plot endpoint to generate SVG and PNG images from mathematical expressions or data files. Support derivative overlays, regression trendlines, custom sizing, color palettes, and optional base64 encoding for HTTP responses.

# CLI Plot Subcommand
Add a new command "plot" in src/lib/main.js with flags:
- --expression <function>    mathematical expression in form y=... for computed mode
- --range <axis>=min:max     axis range for computed mode
- --data-file <path>         JSON, CSV, or YAML file of points for file mode
- --format <png|svg>         required output image format
- --output <path>            required file to write the image
- --width <number>           optional width in pixels (default 500)
- --height <number>          optional height in pixels (default 300)
- --samples <number>         optional sample count (default 100)
- --derivative <true|false>  overlay first derivative curve
- --overlay-trendline <true|false> overlay regression trendline
- --palette <colors>         comma-separated list of CSS colors

Behavior:
1. Parse and validate flags with zod; exit code 1 on validation errors.
2. Generate or load data points using generateData or file parsing logic.
3. If derivative flag is true, compute finite-difference derivative series.
4. If overlay-trendline is true, compute regression parameters and trendline series.
5. Construct a Chart.js configuration object with series, overlays, dimensions, and color palette.
6. Send a POST to QuickChart API /chart with JSON body including width, height, format, and chart configuration.
7. Receive image buffer or text SVG; write to output path; exit code 0 on success.

# HTTP Plot Endpoint
Implement GET /plot in the express server with query parameters:
- expression, range, dataFile, format, width, height, samples, derivative, overlayTrendline, palette, encoding

Behavior:
1. Validate parameters with zod; return 400 on invalid input.
2. Generate data points, derivative, and trendline as in CLI.
3. Build Chart.js configuration and request image from QuickChart API.
4. If encoding=base64, return application/json with fields data (base64 string) and type (png or svg).
5. Otherwise set content-type image/png or image/svg+xml and respond with raw bytes.
6. Include Access-Control-Allow-Origin: * header in all responses.

# Implementation
- Implement runPlotCli in src/lib/main.js, replacing stub.
- Update main dispatch to invoke runPlotCli for "plot" command.
- Extend createServer in src/lib/main.js to handle /plot with full logic.
- Add node-fetch or axios to dependencies for HTTP requests to QuickChart.

# Testing
- Add unit tests for CLI in tests/unit/plot-cli.test.js:
  - Verify PNG and SVG files are created correctly in computed and file modes.
  - Test derivative and overlay-trendline flags.
- Add HTTP tests in tests/unit/plot-http.test.js using supertest:
  - GET /plot returns correct status, content-type, raw bytes for SVG and PNG.
  - GET /plot?encoding=base64 returns JSON with base64 data and correct type.
  - Invalid inputs return 400 and error messages.

# Documentation
- Update USAGE.md and README.md to document plot subcommand and /plot endpoint.
- Provide examples for PNG, SVG, and base64 modes for both CLI and HTTP.