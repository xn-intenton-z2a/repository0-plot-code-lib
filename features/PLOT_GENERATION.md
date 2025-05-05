# Overview

Enhance both the command-line interface and HTTP API to support exporting sampled time-series data in YAML format alongside existing CSV and JSON formats. Users can request YAML output via the --export flag or HTTP query parameter, and receive application x-yaml responses.

# CLI Options

- --export, -x        : Export format for raw data, either csv, json, or yaml
- --output, -o, --file: Path to write the output file or - for stdout. Defaults to data.csv, data.json, or data.yaml based on export format

# HTTP API Endpoints

GET /plot
Query parameter:
  export: optional, csv, json, or yaml

Responses:
  application/x-yaml when export=yaml
  text/csv when export=csv
  application/json when export=json
  image/svg+xml when format=svg and no export
  image/png when format=png and no export
  400 on validation errors with JSON error message

# Implementation

1. Update Zod validation schema for CLI and HTTP to add yaml option to exportFormat enum
2. In exportTimeSeries implement YAML serialization using js-yaml when exportFormat is yaml
3. Adjust default output filename when --export yaml and --output omitted to data.yaml
4. In HTTP server handler for GET /plot detect export=yaml and set response header Content-Type to application/x-yaml, serialize points with js-yaml
5. Add js-yaml import in src/lib/main.js and reuse parseRanges and sampling logic for YAML output
6. Ensure errors during YAML serialization are caught and returned as exit errors in CLI or JSON error in HTTP

# Testing and Documentation

- Add CLI unit tests for --export yaml writing to file and stdout and default data.yaml filename
- Add HTTP tests for GET /plot?export=yaml to return valid YAML and correct headers and status codes
- Update README.md and USAGE.md to include YAML export examples under CLI and HTTP sections