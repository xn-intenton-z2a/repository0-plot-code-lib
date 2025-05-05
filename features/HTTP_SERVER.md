# Overview

Enhance the existing HTTP server mode and CLI export to unify all data export formats (CSV, JSON, YAML) alongside plot generation. Users can run the tool in HTTP server mode or via the CLI, request image plots or raw time-series exports in any supported format.

# CLI Options

- --serve, -S
  Start HTTP server mode instead of direct CLI plotting/export
- --port, -p <number>
  Port number for HTTP server, default 3000
- --export, -x <csv|json|yaml>
  Export raw time-series data in CSV, JSON, or YAML format
- --output, -o, --file <file>
  File path for image or data output. Defaults:
  • plot.svg or plot.png for image outputs
  • data.csv, data.json, or data.yaml for data exports
- --expression, -e <expr>
  A mathematical expression in x
- --range, -r <start:end> or x=<start:end>[,y=<start:end>]
  Numeric ranges for x and optional y
- --format, -f <svg|png>
  Image output format when not using export, default svg
- --samples, -n <number>
  Number of sample points (integer ≥2, default 100)

# HTTP API Endpoints

GET /health
Returns HTTP 200 and JSON { status: "ok" }

GET /plot
Query parameters:
  expression: required, string formula in x
  range: required, numeric range spec for x and optional y
  samples: optional, integer ≥2, default 100
  format: optional, svg or png, default svg
  export: optional, csv, json, or yaml

Responses:
  image/svg+xml when format=svg and no export
  image/png when format=png and no export
  text/csv when export=csv
  application/json when export=json
  application/x-yaml when export=yaml
  400 on validation errors with JSON { error: message }

# Implementation

1. Update argument parser and Zod schema to include serve (boolean), port (number), and extend exportFormat enum to csv, json, yaml.
2. In main entry, branch on serve flag: initialize Express server on given port; else proceed CLI flow.
3. For CLI export: when exportFormat is yaml, use js-yaml to serialize points array to YAML and set output filename default to data.yaml.
4. For HTTP GET /plot: reuse parseRanges and expression compilation, sample points, then if export parameter present select serializer: CSV, JSON, or js-yaml. Set Content-Type accordingly and send body.
5. Implement GET /health to return { status: "ok" }.
6. Centralize error handling: catch and map errors to CLI exit codes or HTTP 4xx/5xx JSON responses. Handle SIGINT/SIGTERM for graceful shutdown.

# Testing and Documentation

- Add Vitest tests for CLI export yaml writing to file and stdout with default .yaml filename.
- Add Supertest tests for GET /plot?export=yaml covering correct headers, body, and error cases.
- Update README.md and USAGE.md to document YAML export examples for both CLI and HTTP modes.