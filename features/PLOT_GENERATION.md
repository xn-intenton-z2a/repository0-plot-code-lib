# Overview

Enable both a command-line interface and an HTTP API to parse mathematical expressions in x, sample over a numeric range, generate time-series data, support raw data export (CSV or JSON), and render plots in SVG or PNG formats.

# CLI Options

- --expression, -e    : A mathematical formula in terms of x, e.g. sin(x) or x^2+1
- --range, -r         : One or two comma-separated axis ranges using colon syntax, e.g. x=0:10,y=-1:1
- --samples, -n       : Number of sample points to generate, integer ≥2, default 100
- --export, -x        : Export format for raw data, either csv or json
- --format, -f        : Output image format, either svg or png, default svg
- --output, -o, --file: Path to write the output file or - for stdout, default plot.svg or data.csv/data.json
- --help, -h          : Show help and exit
- --serve, -S         : Start HTTP server instead of running CLI logic
- --port, -p          : Port number for HTTP server, default 3000

# HTTP API Endpoints

GET /plot
- Query: expression (required), range (required), samples (optional), format (optional), export (optional)
- Returns image/svg+xml for svg plots, image/png for png plots, text/csv for csv export, application/json for json export

GET /health
- Returns status 200 and JSON object { status: ok }

# Implementation

1. Extend Zod schema for CLI and express request validation: expression, range, samples, format, export, output, port
2. Parse and compile expressions, reject any variable besides x
3. Sample points over xRange, evaluate expression safely, collect (x,y)
4. For CLI: branch on exportFormat to serialize CSV or JSON, or render plot via SVG string or Canvas png buffer
5. For HTTP: when serve flag is set, initialize Express server, define routes, use same sampling and rendering functions, send response with correct headers
6. Ensure consistent sample count across export and plot
7. Handle errors uniformly: on CLI exit with nonzero status and message, on HTTP respond with error status and JSON error message
8. Graceful shutdown on SIGINT and SIGTERM

# Testing and Documentation

- Unit tests for CLI parsing, help flag, export to csv and json, plot generation for svg and png, range parsing and error cases
- HTTP tests with supertest for GET /plot and GET /health including valid and invalid parameters
- Stub file writes and rendering in tests to verify correct parameters
- Update README.md and USAGE.md with combined examples for both CLI and HTTP usage