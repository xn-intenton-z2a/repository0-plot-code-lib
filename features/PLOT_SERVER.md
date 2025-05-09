# PLOT_SERVER

## Overview

Introduce a new `serve` subcommand that launches a lightweight HTTP server for interactive chart rendering. Users can send JSON payloads or use a built-in HTML form to post data and options to the server and receive rendered SVG or PNG charts in response. This enables rapid prototyping, embedded charts in browser-based dashboards, and integration with other services via REST.

## CLI Usage

- Start the server on the default port:
  repository0-plot-code-lib serve

- Specify a custom port and optional EJS template for the HTML form:
  repository0-plot-code-lib serve --port 4000 --template ./templates/chart-form.ejs

Options:
- `--port`, `-p`: Port number to listen on (default: 3000).
- `--template`, `-t`: Path to an EJS template that renders a data-input form (default: built-in minimal form).

## Implementation Details

1. **Entry Point**: In `src/lib/main.js`, detect the first argument `serve` and shift to server mode when invoked.

2. **Dependencies**:
   - Add `express` to dependencies and reuse `ejs` and `chartjs-node-canvas` from existing features.
   - Import:
     ```js
     import express from 'express'
     import bodyParser from 'body-parser'
     import { ChartJSNodeCanvas } from 'chartjs-node-canvas'
     import path from 'path'
     ```

3. **Server Setup**:
   - Initialize an Express app, configure `bodyParser.json()` middleware for JSON requests.
   - Configure EJS as the view engine; set `views` to either the provided template directory or fallback to an internal template.

4. **Routes**:
   - **GET /**: Render an HTML form allowing users to paste JSON data and chart options. Fields: data (labels, series), format, type, size, background.
   - **POST /plot**: Accept a JSON payload with keys `data` and `options`, then:
     1. Instantiate `ChartJSNodeCanvas` with provided width, height, background.
     2. Generate a chart buffer or string via `renderToBuffer` (SVG) or `renderToBuffer` (PNG).
     3. Send the result with appropriate `Content-Type` (`image/svg+xml` or `image/png`).
   - **Error Handling**: Return HTTP 400 for invalid payloads, 500 for render errors.

5. **Startup**:
   - Listen on the configured port.
   - Log the listening URL to stdout.

## Testing

- **Unit Tests**:
  - Mock `express` and route handlers to ensure GET `/` invokes the correct render function with fallback template.
  - Mock `bodyParser` and `ChartJSNodeCanvas` to simulate rendering and verify correct status codes and headers in `/plot`.
  - Validate error responses when payload is missing required fields or rendering fails.

- **Integration Tests**:
  - Launch the server in a temporary environment on a random port.
  - Send a POST request to `/plot` with a sample JSON file and verify the response is a valid SVG string or PNG buffer.
  - Request the root path and assert the returned HTML contains form elements for JSON input.

## Documentation Updates

- **README.md**: Add a new section for the `serve` command with examples.
- **USAGE.md**: Document `serve` options, example requests, and expected responses.
- **dependencies file**: Add `express` to the `dependencies` block.
