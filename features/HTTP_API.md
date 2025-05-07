# Overview

Add an HTTP API layer to the CLI tool using Express. Users can start a server to generate time series data and plots via REST endpoints, enabling integration into web services and workflows.

# HTTP Interface

- GET /generate  Query parameters: expression, range, points (optional). Returns JSON array of {x, y} data points.
- GET /plot      Query parameters: expression, range, points (optional), format (svg or png). Returns an image response with appropriate Content-Type (image/svg+xml or image/png).
- Server port   Can be specified via --port flag or PORT environment variable. Defaults to 3000.

# Behavior

1. When the CLI is invoked with --serve (and optionally --port), ignore standard output behavior and start an Express server on the specified port.
2. For GET /generate, validate expression and range parameters, compute the time series as in the generation feature, and respond with JSON.
3. For GET /plot, validate parameters, generate data, invoke renderPlot, convert to PNG if requested, and stream image bytes with correct headers.
4. On invalid input return status 400 with an error message. On internal errors return status 500.
5. Gracefully handle shutdown on SIGINT and SIGTERM.

# Unit Tests

- Create tests/unit/http-api.test.js.
- Use Node’s built-in fetch to request /generate with a known expression and range, then assert response JSON matches expected coordinates length and structure.
- Request /plot?expression=y=sin(x)&range=0:6.28&format=svg and assert body starts with <svg.
- Request /plot?expression=y=cos(x)&range=0:6.28&format=png and assert the first eight bytes match PNG signature.

# Documentation Updates

- In USAGE.md, add an HTTP API section showing how to start the server and example curl requests for both endpoints.
- In README.md under Examples, add HTTP usage examples demonstrating integration and expected responses.

# Dependencies

Add express to dependencies to run the HTTP server. No additional middleware beyond JSON parsing is required.