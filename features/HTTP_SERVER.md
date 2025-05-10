# Summary

Add a serve subcommand that starts an HTTP server exposing plotting and statistics functionality via HTTP endpoints. This allows remote workflows to generate data and charts or compute statistics without invoking the CLI directly.

# Behavior

When the first argument is "serve" the tool starts an Express HTTP server. It listens on a configurable port. The server exposes two GET endpoints:

- /plot
  - Accepts query parameters: expression, xmin, xmax, samples, data, type, width, height, outputFormat. expression and data follow the same semantics as the CLI.
  - If outputFormat is "json" (default) returns application/json with an array of { x, y } points. If outputFormat is "ascii" returns text/plain with an ASCII art chart.

- /stats
  - Accepts query parameters: expression, xmin, xmax, samples, data.
  - Returns application/json with descriptive statistics: min, max, mean, median, standard deviation for x and y.

# CLI Flags

--port <number>    Port for the HTTP server (default 3000)
--help             Show help for the serve command and exit

# Implementation Details

- In src/lib/main.js update main() to recognize "serve" and dispatch to runServer(args).
- Implement parseServerOptions(args) to extract --port and --help flags.
- Use express from dependencies to create an application.
- Define GET /plot and GET /stats handlers that parse req.query, reuse generateExpressionData and loadDataFromFile (or generateExpressionData exclusively for expression mode), call computeStatistics for stats, and send responses with appropriate content type and status codes.
- Support aborting requests on invalid parameters by sending status 400 with an error message.
- Listen on opts.port and log a startup message including the URL.

# Testing

- Add a new test file tests/unit/http-api.test.js using vitest and supertest.
- Test that GET /plot?expression=x&samples=3 returns JSON array of length 3 with expected x and y values.
- Test GET /plot with outputFormat=ascii returns text containing ASCII markers.
- Test GET /stats?expression=x^2 returns JSON with correct statistics.
- Test error cases: missing required parameters yields 400 response.

# Documentation

- Update README.md by adding a "HTTP Server Subcommand" section under Available Commands.
- Include examples:
  repository0-plot-code-lib serve --port 3000
  curl "http://localhost:3000/plot?expression=x^2&xmin=0&xmax=2&samples=3"
  curl "http://localhost:3000/stats?expression=x"
- Describe query parameters and response formats.
