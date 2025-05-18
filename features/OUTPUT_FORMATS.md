# Overview

Extend the CLI and library to support multiple output formats (SVG, PNG, JSON), customizable plot appearance via new flags, and an HTTP API endpoint for on-demand plot generation. Users can tailor visualizations in both CLI and server modes.

# CLI Integration

- Add flags to parseArgs:
  - --format <format>    : one of svg, png, json. Default svg.
  - --width <number>     : output width in pixels. Default 800.
  - --height <number>    : output height in pixels. Default 600.
  - --margin <number>    : margin around plot in pixels. Default 40.
  - --x-label <string>   : label text for the x-axis.
  - --y-label <string>   : label text for the y-axis.
  - --title <string>     : title text displayed at top of SVG.
  - --serve              : if present, launch HTTP server instead of writing to stdout or file.
  - --port <number>      : port on which HTTP server listens. Default 3000.

# HTTP API

- When --serve flag is provided:
  - Start an Express server on the specified port.
  - Expose GET /plot endpoint accepting query parameters:
    - expression: mathematical expression in variable x. Required.
    - range: range for x in format x=min:max[:step]. Required.
    - format, width, height, margin, x-label, y-label, title as above.
  - Validate parameters and return:
    - Content-Type image/svg+xml for format=svg.
    - image/png for format=png.
    - application/json for format=json.
  - Respond with generated plot or data or error JSON.

# Implementation

- In src/lib/main.js:
  - Extend argsSchema with serve (boolean) and port (number).
  - After parsing args, if serve is true:
    - Import express and create an app.
    - Define GET /plot handler that:
      - Parses query parameters.
      - Reuses parseRange, parseArgs logic to build args object.
      - Calls generateData and generateSVG or conversion to PNG/JSON.
      - Sets appropriate Content-Type and sends response.
    - Start listening on the port.
  - If serve is false, preserve existing CLI behavior for writing or printing output.

# Tests

- Update existing parseArgs tests to cover serve and port flags and default values.
- Add tests using supertest to:
  - Launch the server in test mode.
  - Send requests to GET /plot with valid and invalid parameters.
  - Verify status codes, Content-Type headers, and response bodies for svg, png, json.

# Documentation

- Update README.md and USAGE.md to document the new serve mode and HTTP API usage with examples:
  npx repository0-plot-code-lib --serve --port 8080
  curl "http://localhost:8080/plot?expression=sin(x)&range=x=0:6.28:0.1&format=png" > sin.png
