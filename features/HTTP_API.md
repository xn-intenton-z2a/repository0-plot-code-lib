# Overview
Implement an HTTP REST API mode in the CLI tool that allows clients to request time series data and plots over HTTP. The new serve mode will start an Express server and expose endpoints for data generation and plot rendering, enabling integration with other applications and services.

# Source File Updates
1. In src/lib/main.js import express from the express package and add a new function startServer(port) that creates an Express app.
2. In startServer define two endpoints:
   - GET /api/data that accepts query parameters expression, range, format (json or ndjson) and returns the generated time series in the requested format.
   - GET /api/plot that accepts expression, range, plot-format (svg or png), width, height, label-x, label-y and returns the rendered plot as the appropriate content type.
3. Extend the CLI parsing in main to recognize a new subcommand or flag serve and call startServer on the specified port (default 3000).
4. Ensure that parseExpression, parseRange, generateTimeSeries and renderPlot are reused within the HTTP handlers and errors return HTTP status 400 with an error message.
5. Update package.json dependencies to move express into dependencies so the server runs in production.

# Tests
1. Add a new test file tests/unit/api.test.js using supertest to start the server via startServer and verify endpoints:
   - Request /api/data?expression=x%2B1&range=x%3D0%3A2%3A1 returns JSON array or NDJSON matching CLI output.
   - Request /api/plot?expression=x&range=x%3D0%3A1%3A1&plot-format=svg returns content starting with <svg and status 200.
   - Error cases return status 400 and error text for invalid expression or range.
2. Mock underlying functions where needed to isolate server logic.

# Documentation
1. Update USAGE.md to include a section HTTP API mode with sample curl commands for both data and plot endpoints.
2. Update README.md under Features to describe the new HTTP API serve mode and link to examples in USAGE.md.