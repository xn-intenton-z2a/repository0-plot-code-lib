# Overview

Enable both the command-line interface and HTTP API to parse mathematical expressions in x, sample over a numeric range, generate time-series data, support raw data export in CSV, JSON, and YAML formats, and render plots in SVG or PNG.

# CLI Options

- --expression, -e    : A mathematical formula in terms of x, e.g. sin(x) or x^2+1
- --range, -r         : One or two comma-separated axis ranges using colon syntax, e.g. x=0:10,y=-1:1
- --samples, -n       : Number of sample points to generate, integer ≥2, default 100
- --export, -x        : Export format for raw data, either csv, json, or yaml
- --format, -f        : Output image format, either svg or png, default svg
- --output, -o, --file: Path to write the output file or - for stdout. Defaults to plot.svg, plot.png, data.csv, data.json, or data.yaml based on format
- --serve, -S         : Start HTTP server instead of running CLI logic
- --port, -p          : Port number for HTTP server, default 3000
- --help, -h          : Show help and exit

# HTTP API Endpoints

GET /plot
Query parameters:
  expression: required, string formula in x
  range: required, numeric range for x and optional y
  samples: optional, integer ≥2, default 100
  format: optional, svg or png, default svg
  export: optional, csv, json, or yaml

Responses:
  image/svg+xml when format=svg and no export
  image/png when format=png and no export
  text/csv when export=csv
  application/json when export=json
  application/x-yaml when export=yaml
  400 on validation errors with a JSON error message

GET /health
Returns 200 and JSON { status: "ok" }

# Implementation

1. Extend Zod schema for CLI and HTTP validation: exportFormat enum includes csv, json, yaml
2. Update CLI parser to recognize yaml export flag and default output filename data.yaml
3. Use js-yaml to serialize time-series points for yaml export
4. Reuse parseRanges, expression compilation, sampling, and rendering logic for both CLI and HTTP
5. In HTTP mode, validate query parameters with the same Zod schema, set appropriate response headers, and send data or images
6. Handle errors centrally: on CLI, exit nonzero with message; on HTTP, respond with status 4xx/5xx and JSON error
7. Gracefully shut down server on SIGINT and SIGTERM

# Testing and Documentation

- Add CLI unit tests for yaml export to file and stdout and for default data.yaml filename
- Add HTTP tests for GET /plot?export=yaml to return valid YAML and correct status codes
- Update README.md and USAGE.md with YAML export examples under CLI and HTTP sections