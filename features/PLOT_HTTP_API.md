# Purpose

Add an HTTP API server mode to allow remote plotting requests over HTTP, enabling integration into other tools and services.

# Behavior

When invoked as repository0-plot-code-lib serve [--port <port>], the CLI will start an Express server listening on the specified port (default 3000). It exposes a GET endpoint at /plot that accepts the following query parameters:
- formula: a mathematical expression to plot
- range: comma-separated minimum and maximum values for x (default -10,10)
- format: one of ascii, json, svg (default json)
- width: output width (number, default 80)
- height: output height (number, default 20)

The server validates inputs, computes N equidistant data points from range, and returns the result in the requested format with appropriate Content-Type headers. Invalid inputs produce a 400 response with an error message.

# Implementation

- In src/lib/main.js, detect when args[0] is serve and import express to create an HTTP server.
- Use zod to validate and coerce query parameters from req.query.
- Import or extract the existing plot-generation logic (using mathjs) to compute data points.
- Route GET /plot to run plot logic and send the response: ASCII as text/plain, JSON as application/json, SVG as image/svg+xml.
- Default port to 3000 and allow override via --port flag.
- Update package.json to add a dependency on mathjs.

# Testing

- Extend tests/unit/plot-generation.test.js to include new tests for the HTTP server:
  - Start the server in test mode and issue GET requests to /plot with valid and invalid parameters.
  - Use a lightweight HTTP client or supertest to verify status codes, headers, and body formats.
  - Mock mathjs evaluate calls to return predictable values for error and success cases.

# Documentation

- Update README.md to add a section "HTTP API" describing how to start the server, endpoint parameters, example requests, and sample responses for each format.
- Update USAGE.md to document the serve command, --port option, and /plot query parameters with examples.