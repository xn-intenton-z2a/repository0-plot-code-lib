# Overview
Enhance the repository with a fully working plot command and HTTP /plot endpoint. Users can generate PNG or SVG visualizations from mathematical expressions or imported time series data.

# CLI Plot Subcommand
- Introduce a new command "plot" in src/lib/main.js. When argv[0] equals plot, dispatch to runPlotCli with remaining arguments.
- Flags:
  - expression <function>  a y equation in form y=... for computed mode
  - range <axis>=min:max    required for expression mode to define numeric domain
  - dataFile <path>         optional path to file with array of points in JSON, CSV, or YAML
  - format <svg|png>        required output image format
  - output <path>           required file to write the image
  - width <number>          optional width in pixels default 500
  - height <number>         optional height in pixels default 300
  - samples <number>        optional sample count default 100 for expression mode
  - derivative <true|false> optional overlay of first derivative curve
  - overlayTrendline <true|false> optional regression trendline overlay
  - palette <colors>        optional comma separated CSS color list for series

Behavior:
1. Parse and validate all flags. Missing or invalid parameters exit with code 1 and error message.
2. Prepare data: computed mode uses generateData; file mode loads JSON, YAML, or CSV.
3. Build chart configuration for Chart.js with specified size, data series, derivative or trendline overlays, and palette.
4. Render plot: use Chart.js with canvas and sharp for PNG, and use Chart.js SVG renderer for SVG outputs.
5. Write resulting SVG or PNG buffer to output path and exit with code 0.

# HTTP Plot Endpoint
- Mount GET /plot in the express server with query parameters matching CLI flags plus encoding=base64.
- Validate inputs via zod schema; return 400 on validation errors.

Behavior:
1. Generate data and chart configuration as in CLI.
2. Render image buffer. Without encoding, respond with image/svg+xml or image/png and raw bytes.
3. With encoding=base64, respond with application/json containing fields data (base64 string) and type (svg|png).
4. Include Access-Control-Allow-Origin: * header for CORS.

# Implementation
- In src/lib/main.js, add a runPlotCli function and dispatch in main for the "plot" command.
- Extend createServer to handle GET /plot with validation, rendering logic, and response handling.
- Use existing dependencies: chart.js, canvas, sharp, or fallback to QuickChart HTTP API if needed.
- Update package.json to include any required dependencies for rendering.

# Testing
- Add unit tests for CLI in tests/unit/plot-cli.test.js verifying correct file outputs for SVG and PNG in both computed and dataFile modes.
- Add unit tests for HTTP in tests/unit/plot-http.test.js verifying content type, response body, status codes, CORS header, and base64 encoding mode.

# Documentation
- Update USAGE.md and README.md to document the "plot" subcommand and /plot endpoint with examples for SVG, PNG, and base64 modes.
- Provide usage snippets for both computed expression mode and dataFile mode.