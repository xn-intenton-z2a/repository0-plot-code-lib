# Overview

Extend the CLI and library to support multiple output formats including SVG, PNG, JSON and CSV. Provide consistent behavior in both CLI and HTTP server modes and enable users to export raw data as comma separated values for integration with external tools.

# CLI Integration

- Add flag --format <format>    : one of svg png json csv. Default svg.
- Retain existing flags --width --height --margin --x-label --y-label --title --serve --port and their defaults.
- When format is csv:
  - Generate a text output with a header row x,y and one line per data point.
  - Write the CSV string to stdout or to the file specified by --output.

# Implementation

- In src/lib/main.js:
  - Extend argsSchema to accept format as an enum of svg png json csv and validate default to svg.
  - After parsing args and generating data, branch on format:
    - svg: use existing generateSVG to produce SVG output.
    - png: convert SVG to PNG as before.
    - json: serialize data object { xValues yValues } to JSON.
    - csv: implement a new function generateCSV(data) that returns a string starting with header x,y then each x,y pair on its own line.
  - For serve mode, set Content-Type text/csv when format=csv and send the CSV string.
  - Ensure exit codes and error messages remain consistent across formats.

# HTTP API

- Support format=csv in addition to svg png json:
  - GET /plot accepts format csv.
  - Respond with Content-Type text/csv and the CSV data.
  - Validate query parameters and return error JSON if invalid.

# Tests

- Update parseArgs tests to cover csv as a valid format and default behavior.
- Add unit tests for generateCSV:
  - Verify header row and correct comma separation for a sample data set.
  - Test error handling for empty or mismatched data.
- Extend HTTP API tests with supertest:
  - GET /plot?expression=x&range=x=0:2&format=csv returns status 200 text/csv and expected CSV body.
  - Test invalid format values report 400 with error JSON.

# Documentation

- Update README.md and USAGE.md to include csv as an output format:
  npx repository0-plot-code-lib --expression sin(x) --range x=0:3:1 --format csv --output data.csv

- Provide CURL example for HTTP API:
  curl http://localhost:3000/plot?expression=x&range=x=0:5&format=csv > data.csv
