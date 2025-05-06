# Overview
Implement an HTTP REST API mode in the CLI tool to serve time series data and plots over HTTP on demand. Introduce a new subcommand or flag to launch an Express server and expose two endpoints for data and plot requests, enabling seamless integration and programmatic access.

# Source File Updates
1. In src/lib/main.js install and import express and stream/promises pipeline utilities.
   - import express from 'express'
   - import { pipeline } from 'stream/promises'
   - import { serializeDataStream } from './dataSerializer.js' or from stream utilities once data formats feature is in place.
2. Add function startServer(port) that:
   - Creates an Express app with JSON and URL-encoded middleware.
   - Defines GET /api/data:
     * Validate query parameters with zod:
       - expression: required string
       - range: required string
       - format: optional enum [json, ndjson, csv], default json
       - bufferSize: optional number, default 16384
       - csvHeader: optional boolean, default false
     * Use parseExpression and parseRange to produce AST and range parameters.
     * Generate data iterator via generateTimeSeries.
     * For json and ndjson use serializeDataStream or manual streaming with pipeline to response; for csv use serializeDataStream with csvHeader.
     * Set Content-Type: application/json, application/x-ndjson, or text/csv.
     * Handle errors by responding with status 400 and JSON { error: message }.
   - Defines GET /api/plot:
     * Validate query parameters with zod:
       - expression: required string
       - range: required string
       - plotFormat: required enum [svg, png]
       - width: optional number, default 800
       - height: optional number, default 600
       - labelX, labelY: optional strings
     * Generate time series data and use renderPlot to produce Buffer or string.
     * Set Content-Type: image/png or image/svg+xml and send result.
     * On error respond with status 400 and JSON error.
   - Listens on provided port and logs startup message.
3. Extend main(args) in CLI to recognize a serve command or --serve flag with --port option (default 3000) that calls startServer and awaits incoming requests, returning 0 on startup.

# Tests
1. Add tests/unit/api.test.js using supertest to start server via startServer:
   - GET /api/data?expression=x%2B1&range=x%3D0%3A2%3A1 returns JSON array matching CLI output and Content-Type application/json.
   - GET /api/data?format=ndjson streams newline-delimited JSON with correct header and status 200.
   - GET /api/data?format=csv&csvHeader=true returns CSV with header row, CRLF line endings, proper quoting, and status 200.
   - GET /api/plot?expression=x&range=x%3D0%3A1%3A1&plotFormat=svg returns string starting with <svg and status 200.
   - GET /api/plot?plotFormat=png returns Buffer starting with PNG magic number and status 200.
   - Invalid parameters for either endpoint return status 400 with JSON { error: message }.
2. Simulate backpressure by limiting response highWaterMark and asserting pipeline respects bufferSize.

# Documentation
1. Update USAGE.md to include HTTP API mode section with example curl commands for:
   - /api/data with different formats and options
   - /api/plot for svg and png outputs
2. Update README.md under Features to describe HTTP API serve mode and link to new USAGE.md section.

# Dependencies
1. Move express from devDependencies to dependencies in package.json.
2. Ensure any streaming utility library (if introduced for data formats) is listed as a dependency.
