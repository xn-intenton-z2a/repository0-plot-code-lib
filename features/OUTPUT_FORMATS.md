# Overview
Extend the CLI tool and add an HTTP server mode to support multiple output formats: svg, png, json, and csv. Provide a consistent interface across both CLI and HTTP modes, enabling users to export vector or raster images, raw data, or tabular outputs for integration with external workflows.

# CLI Integration
- Add flag --format <format> with allowed values svg, png, json, csv. Default svg.
- Retain existing flags --expression, --range, --input, --input-format, --output, and deprecate --png by mapping it to --format png.
- After parsing args, load or generate data, then branch on format:
  - svg: generate vector via generateSVG(data, options) and output XML.
  - png: invoke convertSVGtoPNG on the generated SVG and output binary.
  - json: serialize { xValues, yValues } to application/json.
  - csv: implement a generateCSV(data) helper to produce text/csv with header x,y and rows.
- Write output to stdout or to the file specified by --output, honoring absolute or relative paths.

# HTTP API
- Introduce flags --serve to enable server mode and --port <number> to specify listening port (default 3000).
- When --serve is true, spin up an Express app and register a GET /plot endpoint.
- Accept query parameters: expression, range, input, inputFormat, format, output omitted.
- Validate required parameters and return 400 with a JSON error on invalid input or missing fields.
- On success, generate the requested format and set Content-Type accordingly: image/svg+xml, image/png, application/json, or text/csv.
- Respond with data in the response body without writing to disk.

# Implementation
- Update parseArgs in src/lib/main.js to include format (enum), serve (boolean), and port (number); deprecate png alias.
- After data is loaded, pass options.width, height, margin from optional flags if provided.
- Abstract common generation logic into a helper function to reuse between CLI and HTTP.
- Use sharp for PNG conversion and Express for server.

# Tests
- Extend parseArgs tests to cover --format, --serve, --port, and deprecation of --png.
- Add unit tests for json and csv outputs in tests/unit/plot-generation.test.js:
  - Verify JSON payload structure and error on empty data.
  - Verify CSV header and rows.
- Use supertest to test HTTP API in a new tests/unit/http-api.test.js:
  - GET /plot?expression=x&range=x=0:2&format=csv returns 200 text/csv and correct CSV.
  - Test format=json returns application/json with correct body.
  - Test format=png and format=svg return correct content types and response bodies.
  - Test error responses for missing expression or bad range.

# Documentation
- Update README.md and USAGE.md to document --format, --serve, --port and HTTP examples:
    curl "http://localhost:3000/plot?expression=x&range=x=0:5:1&format=csv" > data.csv
    npx repository0-plot-code-lib --serve --port 4000
    npx repository0-plot-code-lib --expression "sin(x)" --range "x=0:3" --format png --output out.png
