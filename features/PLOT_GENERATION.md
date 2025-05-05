# Overview

Enhance the CLI tool and HTTP server to support YAML output for sampled time-series data alongside existing CSV and JSON formats. Users can request YAML export via the --export flag or the export query parameter and receive a properly serialized application/x-yaml response.

# CLI Options

- --export, -x  : Export format for raw data. Allowed values: csv, json, yaml
- --output, -o, --file  : Path to write output file or - to write to stdout. Defaults to data.csv, data.json, or data.yaml when --export is used without an explicit path.

# HTTP API Endpoints

GET /plot
Query parameters:
  expression: required, string formula in x
  range: required, numeric range for x and optional y
  samples: optional, integer ≥2, default 100
  format: optional, svg or png, default svg
  export: optional, csv, json, or yaml

Responses:
  application/x-yaml when export=yaml
  text/csv when export=csv
  application/json when export=json
  image/svg+xml when format=svg and export omitted
  image/png when format=png and export omitted
  400 on validation errors with a JSON error message

# Implementation

1. Extend the Zod validation schema for CLI and HTTP parameters to include yaml in the exportFormat enum.
2. In exportTimeSeries implement YAML serialization using js-yaml when exportFormat is yaml. Serialize the array of points to a YAML document with appropriate indentation.
3. Adjust the default output filename logic: when --export yaml and no --output provided, default to data.yaml.
4. In the HTTP server handler for GET /plot detect export=yaml, set Content-Type to application/x-yaml, and serialize the points array using js-yaml before sending.
5. Import js-yaml in src/lib/main.js and reuse parseRanges and sampling logic to generate points for YAML export.
6. Ensure that any errors during YAML serialization are caught and returned as CLI exit errors or JSON error responses in HTTP mode.

# Testing and Documentation

- Add unit tests for CLI --export yaml writing to file and stdout with default filename data.yaml.
- Add HTTP tests for GET /plot?export=yaml covering correct YAML output, headers, status code, missing or invalid parameters.
- Update README.md and USAGE.md to include YAML export examples under CLI and HTTP sections.
