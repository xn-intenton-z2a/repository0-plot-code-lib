# Summary

Enhance the HTTP server subcommand by adding comprehensive integration tests for all endpoints and updating README with usage examples for the serve command.

# Behavior

- The existing serve subcommand remains unchanged: it parses --port, starts the Express server, and exposes /plot and /stats endpoints with JSON and ASCII output options.

# Testing

Add integration tests in tests/unit/http-api.test.js using vitest and supertest:

- Import createServer from src/lib/main.js and wrap it in supertest without opening a real network port.
- Test GET /plot?expression=x&xmin=0&xmax=2&samples=3 returns 200 and JSON array of 3 points with correct x and y values.
- Test GET /plot without expression returns 400 with JSON error payload.
- Test GET /plot with outputFormat=ascii returns 200 and text/plain ASCII chart containing markers and line breaks.
- Test GET /plot with invalid samples (samples<2 or non-numeric) returns 400 with descriptive error.
- Test GET /stats?expression=x^2&xmin=0&xmax=5&samples=6 returns 200 and JSON with statistics keys x_min, x_max, x_mean, x_median, x_stddev, y_min, y_max, y_mean, y_median, y_stddev.
- Test GET /stats without expression returns 400 with JSON error.
- Test GET /stats with invalid samples returns 400 with descriptive error.

# Documentation

Update README.md under a new HTTP Server Subcommand section:

- Show how to start the server:

  repository0-plot-code-lib serve --port 3000

- Provide curl examples:

  curl "http://localhost:3000/plot?expression=x^2&xmin=0&xmax=2&samples=5"
  # Returns JSON array of { x, y } points.

  curl "http://localhost:3000/plot?expression=x&samples=10&outputFormat=ascii"
  # Returns ASCII art chart as text/plain.

  curl "http://localhost:3000/stats?expression=x^2&xmin=0&xmax=5&samples=6"
  # Returns JSON statistics with keys x_min, x_max, x_mean, x_median, x_stddev, y_min, y_max, y_mean, y_median, y_stddev.

Ensure examples match actual server behavior and include expected HTTP status codes.