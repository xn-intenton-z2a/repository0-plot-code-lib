# Overview

Implement an HTTP REST API mode in the CLI tool to serve time series data and plots over HTTP. Add a new serve command that launches an Express server exposing endpoints for data and plot requests, enabling integration and programmatic access.

# Source File Updates

1. In src/lib/main.js import express and add function startServer(port) that creates an Express app, applies JSON and URL-encoded middleware, and listens on the specified port.
2. Define GET /api/data endpoint:
   - Parse and validate query parameters: expression, range
   - Support optional parameters: format (json, ndjson, csv), bufferSize, csvHeader
   - Use parseExpression and parseRange to build AST and generate data. For streaming formats use serializeDataStream and pipeline to stream the response.
   - Set Content-Type header based on format: application/json, application/x-ndjson, text/csv
   - On validation or runtime errors respond with status 400 and JSON error message.
3. Define GET /api/plot endpoint:
   - Parse and validate parameters: expression, range, plotFormat (svg, png), width, height, labelX, labelY
   - Generate data and call renderPlot to produce Buffer or string, then respond with status 200 and content-type image/png or image/svg+xml.
   - On errors respond with status 400 and JSON error message.
4. Extend main(args) to include a new serve command or flag that calls startServer with an optional --port option (default 3000).
5. Update package.json to move express from devDependencies into dependencies and add any new stream utilities if required.

# Tests

1. Add tests/unit/api.test.js using supertest to start the server via startServer:
   - GET /api/data?expression=x%2B1&range=x%3D0%3A2%3A1 returns JSON array matching CLI output.
   - GET /api/data?format=ndjson streams newline delimited JSON records with correct content-type.
   - GET /api/data?format=csv&csvHeader=true returns CSV with header row and proper quoting.
   - GET /api/plot?expression=x&range=x%3D0%3A1%3A1&plotFormat=svg returns <svg starting content and status 200.
   - GET /api/plot?plotFormat=png returns PNG buffer with magic number and status 200.
   - Invalid parameters return status 400 with descriptive JSON error.
2. Mock underlying functions to isolate route logic and simulate backpressure by configuring a small highWaterMark on response streams.

# Documentation

1. Update USAGE.md to include an HTTP API mode section with example curl commands for data and plot endpoints and explanation of format, bufferSize, and csvHeader parameters.
2. Update README.md under Features to describe the HTTP API serve mode and link to the new section in USAGE.md.