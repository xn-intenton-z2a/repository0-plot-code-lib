# Overview

Provide an end-to-end plotting feature that supports both command-line and HTTP contexts. Users can render function expressions or import data files as SVG or PNG images and retrieve results via a CLI command or a REST endpoint.

# CLI Plot Subcommand

Add a new plot subcommand to the CLI entrypoint. Invocation:

 repository0-plot-code-lib plot [--flags]

Required flags:
- --expression <expression>   Function expression in the form y=…
- --range <axis=min:max>      Numeric axis range for expression mode
- --format <svg|png>          Output image format

Optional flags:
- --dataFile <path>           Read raw points from JSON, CSV, or YAML file
- --output <path>             Write image to file; defaults to stdout
- --width <pixels>            Image width in pixels; default 800
- --height <pixels>           Image height in pixels; default 600
- --samples <number>          Number of sample points; default 100
- --xLog, --yLog              Use logarithmic scale on respective axis
- --grid                      Include grid lines on the plot
- --title <text>, --xLabel <text>, --yLabel <text>  Chart and axis labels
- --derivative                Overlay the first derivative curve
- --overlayTrendline          Overlay a regression trendline
- --palette <name>, --colors <CSV>  Color scheme settings
- --exportData <path>         Export raw data points to CSV, JSON, or YAML
- --exportFormat <csv|json|yaml>  Format for export when extension is missing
- --encoding <base64>         Return a JSON object with base64-encoded image

Behavior:
1. Parse and validate flags; on error, print message to stderr and exit code 1
2. Load data points from expression via generateData or from dataFile via filesystem
3. Call generatePlot(points, options) to produce SVG output; if format is png, convert via sharp
4. If exportData is set, write raw points to given path in specified format
5. If encoding=base64, wrap output in JSON {data,type} and write to stdout
6. Otherwise write raw SVG or PNG bytes to stdout or output path
7. Exit with code 0 on success

# HTTP Plot Endpoint

Expose GET /plot when server is started with --serve <port>

Query parameters mirror CLI flags:
- expression (required unless dataFile provided)
- range (required with expression)
- dataFile
- format (required)
- width, height, samples, xLog, yLog, grid
- title, xLabel, yLabel, derivative, overlayTrendline, palette, colors
- exportData, exportFormat, encoding

Behavior:
1. Validate request parameters using zod; on validation error return HTTP 400 JSON with error messages
2. Load data points from expression or dataFile
3. Generate plot via generatePlot; convert svg to png when needed
4. Always set Access-Control-Allow-Origin header for CORS support
5. If encoding=base64, respond with application/json containing {data,type}
6. Otherwise respond with raw image bytes or SVG text with the correct content-type
7. Return HTTP 200 on success, or 400 with JSON error on failure

# Implementation

Implement runPlotCli(argv) and extend main() in src/lib/main.js to dispatch on the plot subcommand. In createServer, add GET /plot route with zod schema for parameter validation. Use existing utilities parseArgs, parseRange, generateData, and integrate sharp for PNG conversion and ejs templates for SVG.

# Testing

Add unit tests in tests/unit/plot-endpoint.test.js and tests/unit/plot-cli.test.js:
- CLI invocation success and flag validation error cases
- HTTP /plot returning SVG and PNG with correct content-type
- Base64 encoding mode returns JSON with data and type
- Data file input for JSON, CSV, YAML inputs
- Validation errors yield HTTP 400 with JSON error
- CORS header present on all responses

# Documentation

Update USAGE.md and README.md to document the plot CLI subcommand flags, examples for expression and dataFile modes, HTTP /plot endpoint parameters, raw and base64 modes, sample curl commands, and CORS support.