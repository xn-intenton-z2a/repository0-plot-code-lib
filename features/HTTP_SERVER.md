# Overview

Extend the library and CLI to launch an HTTP server exposing a REST API and a simple web form for generating plots on demand. Support query parameters for expression, range, format (svg, png, json), and optional width, height, margin. This makes it easy to embed the plotting engine in web apps or microservices without installing a CLI.

# HTTP API Integration

- Add a new flag --serve and optional --port to enable server mode. Default port is 3000.
- When --serve is present, skip immediate data generation and route into HTTP server mode.
- Define endpoint GET /plot with query parameters: expression (required), range (required), format (svg|png|json, default svg), width, height, margin, output omitted.
- Respond with appropriate Content-Type: image/svg+xml, image/png, or application/json, and the generated payload.
- Define GET / with an HTML form allowing users to enter expression, range, format, width, height, margin, and submit to /plot. Render using EJS templates.

# Implementation

- In src/lib/main.js:
  - Extend parseArgs schema to include serve (boolean) and port (number).
  - When parsed.serve is true, import express, ejs, canvas dependencies and start an Express app on parsed.port.
  - Configure EJS as view engine; serve static assets if needed.
  - Implement GET / route rendering a basic HTML page with a form.
  - Implement GET /plot route that calls generateData, generateSVG, and optionally converts SVG to PNG via canvas package for png format or serializes JSON for json format.
  - Set appropriate response headers and status codes.
  - Gracefully handle errors by returning JSON payload with error message and HTTP 400 or 500 codes.
  - Prevent CLI output when in serve mode.

# Tests

- Add tests for parseArgs to validate --serve and --port flags.
- Add integration tests using Supertest (add to devDependencies) to verify:
  - GET / returns a 200 HTML response containing form elements.
  - GET /plot?expression=x*2&range=x=0:2:1 returns valid SVG when format=svg.
  - GET /plot?expression=x*2&range=x=0:2:1&format=json returns correct JSON payload.
  - GET /plot?expression=x*2&range=x=0:2:1&format=png returns a Buffer starting with PNG signature.

# Dependencies

- Add "express" and "ejs" to dependencies if not already present (express is present, ejs is present).
- Add "supertest" to devDependencies for HTTP endpoint testing.

# Documentation

- Update README.md and USAGE.md to document the new --serve and --port flags, the HTTP endpoints, query parameters, response content types, and an example cURL invocation.