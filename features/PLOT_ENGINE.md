# Overview
Implement the plot command and HTTP /plot endpoint using the QuickChart API to render PNG and SVG outputs. Support both computed expression mode and dataFile mode, optional derivative and regression overlays, custom sizing and color palettes, and optional base64 encoding for HTTP responses.

# CLI Plot Subcommand
Add a new command "plot" in src/lib/main.js that dispatches to runPlotCli
Flags:
- --expression <function>    mathematical expression in form y=... for computed mode
- --range <axis>=min:max     axis range for computed mode
- --data-file <path>         optional JSON, CSV, or YAML file of points
- --format <png|svg>         required output image format
- --output <path>            required file to write the image
- --width <number>           optional width in pixels (default 500)
- --height <number>          optional height in pixels (default 300)
- --samples <number>         optional sample count (default 100)
- --derivative <true|false>  optional overlay of first derivative curve
- --overlay-trendline <true|false> optional regression trendline overlay
- --palette <colors>         optional comma-separated list of CSS colors

Behavior:
1. Parse and validate flags with zod, exit code 1 on validation errors.
2. Load or generate data points using generateData for computed mode or file parsing for dataFile mode.
3. If derivative is true compute derivative series by finite differences.
4. If overlay-trendline is true compute regression parameters and generate trendline series.
5. Build a Chart.js configuration object including series, size, colors, overlays.
6. Call QuickChart API /chart endpoint via node-fetch or axios, sending chart configuration and format.
7. For PNG or binary SVG receive a buffer and write it to the output file.
8. Exit with code 0 on success or code 1 on error.

# HTTP Plot Endpoint
Implement GET /plot in the express server with the same behavior as the CLI:
Query parameters:
- expression, range, dataFile, format, width, height, samples, derivative, overlayTrendline, palette, encoding=base64

Behavior:
1. Validate query parameters with zod, return 400 on invalid input.
2. Generate data, derivative, and trendline as in CLI.
3. Build Chart.js configuration and request image from QuickChart API.
4. If encoding=base64 return application/json with fields data (base64 string) and type (png or svg).
5. Otherwise respond with content-type image/png or image/svg+xml and raw bytes.
6. Always include Access-Control-Allow-Origin: * header.

# Implementation
- Reuse generateData, computeRegression, and file parsing logic from stats.
- Use node-fetch to POST to https://quickchart.io/chart with JSON body containing width, height, format, chart configuration.
- Decode response and handle base64 mode as needed.
- Add runPlotCli implementation and dispatch in main.
- Extend createServer to handle /plot with full implementation.
- Add node-fetch or axios to dependencies.

# Testing
- Add unit tests for CLI in tests/unit/plot-cli.test.js verifying output files for PNG and SVG in both computed and dataFile modes.
- Add unit tests for HTTP in tests/unit/plot-http.test.js verifying status codes, content types, bytes vs base64 JSON payload, and CORS header.

# Documentation
- Update USAGE.md and README.md to document the "plot" subcommand and /plot endpoint with examples for PNG, SVG, and base64 modes.