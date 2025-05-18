# Overview

Extend the CLI tool and add an HTTP server mode to support multiple output formats: SVG, PNG, JSON, and CSV. Provide consistent behavior across both modes and enable users to export raw data or images for integration with external tools or remote plotting.

# CLI Integration

- Add flag --format <format>: one of svg, png, json, csv. Default svg.
- Retain existing flags --expression, --range, --input, --input-format, --output, --serve, --port and their defaults.
- Deprecate the standalone --png flag by mapping it to --format png for backward compatibility.
- When format is:
  - svg: generate vector image via generateSVG and write XML.
  - png: convert SVG to PNG via convertSVGtoPNG and write binary.
  - json: serialize { xValues, yValues } to application/json.
  - csv: implement generateCSV(data) to output a comma-separated text with header x,y and one row per data point.
- Output is written to stdout or to the file specified by --output.

# HTTP API

- Support server mode when --serve is true (use express) and optional --port <number>.
- Implement GET /plot endpoint accepting query parameters: expression, range, input, inputFormat, format.
- Validate parameters and return 400 with error JSON on invalid input.
- On success, respond with the corresponding Content-Type: image/svg+xml, image/png, application/json, or text/csv, and send the generated output.

# Implementation

- In src/lib/main.js:
  - Extend argsSchema: add format enum ["svg","png","json","csv"], serve boolean, port number; deprecate png flag by aliasing.
  - After parsing args and loading or generating data, branch on args.format:
    - svg: use generateSVG(data, options).
    - png: call convertSVGtoPNG(svg).
    - json: JSON.stringify({ xValues, yValues }).
    - csv: call new generateCSV(data).
  - For serve mode:
    - Initialize express app, register GET /plot handler using the same parsing and generation logic.
    - Set appropriate Content-Type and body.
    - Start listening on args.port.

# Tests

- Update parseArgs tests to cover format, serve, port, and deprecation of --png.
- Add unit tests for generateCSV:
  - Verify header and rows for sample data.
  - Test error cases: empty data, mismatched lengths.
- Add unit tests for JSON output.
- Use supertest to test HTTP API:
  - GET /plot?expression=x&range=x=0:2&format=csv returns status 200 text/csv and correct body.
  - Validate format=json and format=png endpoints.
  - Test error responses for missing or invalid parameters.

# Documentation

- Update README.md and USAGE.md to document --format, --serve, --port, and HTTP API examples:
  curl http://localhost:3000/plot?expression=x&range=x=0:5:format=csv > data.csv
  npx repository0-plot-code-lib --expression "sin(x)" --range "x=0:3" --format png --output plot.png
