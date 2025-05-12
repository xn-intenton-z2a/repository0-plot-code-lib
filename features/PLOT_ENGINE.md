# Overview

Provide a unified, end-to-end plotting feature that supports both command-line and HTTP contexts. Users can render function plots or data file inputs as SVG or PNG images and retrieve them via a CLI command or a REST endpoint. Supports styling options, data export, and optional base64 encoding for embedding.

# CLI Plot Command

Add a new plot subcommand to the CLI entrypoint. Invocation:

repository0-plot-code-lib plot [--flags]

Required flags:
- --expression <expression>         Mathematical expression in the form y=…
- --range <axis=min:max>            Numeric axis range
- --format <svg|png>                Output image format

Optional flags:
- --dataFile <path>                 Read points from JSON, YAML, or CSV file
- --output <path>                   Write image to file; defaults to stdout
- --width <pixels>, --height <pixels>
- --samples <number>                Number of sample points (default 100)
- --xLog, --yLog                    Use logarithmic scale on respective axis
- --grid                            Include grid lines
- --title <text>, --xLabel <text>, --yLabel <text>
- --derivative                      Overlay first derivative curve
- --overlayTrendline                Overlay regression trendline
- --palette <name>, --colors <CSV>  Color scheme settings
- --exportData <path>               Export raw data points to CSV, JSON, or YAML
- --exportFormat <csv|json|yaml>    Format for export when extension is missing

Behavior:
1. Parse and validate flags; on error, print to stderr and exit code 1.
2. Load points from expression via generateData or from dataFile via file system.
3. Call generatePlot(points, options) to produce SVG or PNG.
4. If exportData is set, write raw points to given path in specified format.
5. Write image to output or stdout.
6. Exit code 0 on success.

# HTTP Plot Endpoint

Expose GET /plot when server is started via --serve <port>.

Query parameters mirror CLI flags:
- expression (required unless dataFile provided)
- range (required with expression)
- dataFile                         Path to JSON, YAML, or CSV data file
- format (required)                svg or png
- width, height, samples, xLog, yLog, grid
- title, xLabel, yLabel
- derivative, trendlineStats, overlayTrendline
- palette, colors
- exportData, exportFormat
- encoding=base64                  Return JSON with base64 image

Behavior:
1. Validate parameters with zod; return 400 JSON on error.
2. Load points from expression or dataFile.
3. Call generatePlot to render an SVG via EJS templates or template strings.
4. If format is png, convert SVG to PNG via sharp.
5. Always set Access-Control-Allow-Origin header.
6. If encoding=base64, respond application/json with data and type fields.
7. Otherwise return raw image bytes or SVG text with correct content type.
8. On error, return HTTP 400 with JSON error message.

# Implementation

In src/lib/main.js:
- Export runPlotCli(argv) handling CLI parsing and dispatch to generatePlot or dataFile.
- Extend main() to dispatch on argv[0] === plot and invoke runPlotCli.
- In createServer, add GET /plot route using express and zod schema validation.
- Implement generatePlot(points, options) to build SVG via EJS and to call sharp for PNG conversion.
- Use fs to read dataFile in JSON, YAML, or CSV formats.
- Update dependencies to include ejs and sharp.

# Testing

Add unit tests in tests/unit/plot-endpoint.test.js:
- Success cases: raw SVG and PNG responses with correct content-type.
- Base64 encoding mode returns JSON with data and type.
- Data file input mode returns valid image responses for JSON, CSV, and YAML files.
- Validation errors yield HTTP 400 with error JSON.
- CORS header present on all responses.

Ensure existing tests for stats and CLI mission flag continue to pass.

# Documentation

Update USAGE.md and README.md:
- Document plot CLI subcommand flags and examples for expression and dataFile modes.
- Document GET /plot parameters, raw and base64 modes, and sample curl commands.
- Note CORS support for plot endpoint.
