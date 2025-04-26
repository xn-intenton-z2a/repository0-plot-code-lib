# Overview
Implement the end-to-end plotting workflow in src/lib/main.js with expression parsing, time series generation, data I/O, and plot rendering. Support both CLI invocation and HTTP API, driven by environment variables and command flags. Include unit tests and update documentation accordingly.

# Environment Configuration
On startup, load .env via dotenv.config. Use zod to parse and validate environment variables: PLOT_WIDTH, PLOT_HEIGHT, PLOT_BACKGROUND, PLOT_COLOR. Merge environment defaults with CLI flags, allowing flags to override.

# CLI Interface and Validation
Define CLI flags in main.js using zod:
- --expression (string) required unless --input-file provided
- --range (string syntax x=min:max[:step]) required unless --input-file provided
- --input-file (path) optional, supports CSV or JSON input
- --input-format (csv|json) default csv
- --export-data-format (csv|json) optional, when set skips plotting and writes data
- --export-file (path) default stdout
- --format (svg|png) default svg
- --output-file (path) default stdout
- --serve (port) optional, when provided starts HTTP API
Validate flag combinations and emit clear error messages with nonzero exit codes on invalid use.

# Expression Parsing and Time Series Generation
Import mathjs to parse and compile the expression into a function f(x). Parse range into numeric start, end, step; validate start ≤ end and step > 0. Generate x values, compute y = f(x), filter out non-finite results, and represent the series as an array of { x, y } objects.

# Data Import and Export
If --input-file is provided, read asynchronously; for CSV use a streaming parser with header detection and zod validation; for JSON parse an array of { x, y } records and validate with zod. When --export-data-format is specified, serialize series as CSV or JSON and write to --export-file or stdout, then exit without plotting.

# Plot Rendering
Embed an EJS template for SVG generation with axes and data paths. If format is png, convert the generated SVG to PNG using sharp. Apply width, height, background, and color from merged settings. Write the resulting image to --output-file or stdout.

# HTTP API
When --serve is used, start an Express server in main.js listening on the provided port. Define POST /plot to accept a JSON body matching the CLI options. Validate the payload with zod. Respond with serialized data or image output based on payload, using appropriate content types and HTTP status codes for errors.

# Testing
Update tests/unit/main.test.js to cover CLI flag parsing, dotenv loading, and error conditions. Add tests/unit/cli.test.js for expression and range parsing, data import/export, and plot invocation. Add tests/unit/export.test.js for CSV and JSON serialization. Add tests/unit/server.test.js to cover HTTP API endpoints and validation errors.

# Documentation
Update README.md and docs/USAGE.md to document the new CLI flags, environment variables, serve mode, data export options, and HTTP API usage with examples. Ensure quick-start and API reference sections reflect implemented behavior.