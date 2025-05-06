# Overview
Implement an HTTP REST API mode in the CLI tool to serve time series data and plots over HTTP on demand. Provide two endpoints for data and plot requests that enable integration and programmatic access without using the CLI interface.

# Source File Updates
1. In src/lib/main.js import express, pipeline from stream/promises, and serializeDataStream from the data formats module.
   - Add function startServer(port) that:
     * Creates an Express application with JSON and URL-encoded body parsing.
     * Defines GET /api/data:
       - Validate query parameters with zod: expression (required string), range (required string), format (enum json, ndjson, csv default json), bufferSize (number default 16384), csvHeader (boolean default false).
       - Use parseExpression and parseRange to obtain AST and numeric parameters.
       - Generate data iterator via generateTimeSeries.
       - For each supported format, use serializeDataStream or manual pipeline to stream directly to the response, setting Content-Type to application/json, application/x-ndjson, or text/csv; honor bufferSize and csvHeader for CSV.
       - On validation or generation error respond with status 400 and JSON { error: message }.
     * Defines GET /api/plot:
       - Validate query parameters with zod: expression (required string), range (required string), plotFormat (enum svg, png), width (number default 800), height (number default 600), labelX (string), labelY (string).
       - Generate data and call renderPlot to produce Buffer or SVG string.
       - Set Content-Type to image/png or image/svg+xml and send the result.
       - On error respond with status 400 and JSON { error: message }.
     * Listen on the specified port, log a startup message, and return the server instance for testing.
2. Extend main(args) to recognize a serve command or --serve flag with --port option (default 3000) that invokes startServer and does not exit immediately.

# Tests
1. Create tests/unit/api.test.js using supertest:
   - Test GET /api/data?expression=x%2B1&range=x%3D0%3A2%3A1 returns a JSON array and Content-Type application/json.
   - Test /api/data?format=ndjson streams newline-delimited JSON with correct header.
   - Test /api/data?format=csv&csvHeader=true returns CSV with CRLF line endings, header row, RFC4180 quoting.
   - Test GET /api/plot with plotFormat=svg returns a string starting with <svg and status 200.
   - Test GET /api/plot with plotFormat=png returns a Buffer starting with PNG magic bytes and status 200.
   - Test invalid parameters yield status 400 and JSON { error }.
2. Simulate backpressure by configuring a PassThrough or response with small highWaterMark and assert serializeDataStream honors bufferSize.

# Documentation
1. Update USAGE.md to add an HTTP API section with example curl commands for /api/data and /api/plot endpoints demonstrating all options and formats.
2. Update README.md under Features to describe HTTP API serve mode, list endpoints, default port, and link to the usage section.

# Dependencies
1. Ensure express is listed under dependencies in package.json and remove it from devDependencies if needed.
2. Add supertest to devDependencies for HTTP endpoint tests.

