# Overview

Extend the CLI tool into a long running HTTP server providing programmatic access to time series data generation and plot rendering via HTTP endpoints.

# API Endpoints

## GET /data

Accepts query parameters expression, range, points, dataFormat. Validate inputs with Zod schemas. Generate a time series as in the CLI and:
- If dataFormat=json, respond with application/json and send the full array.
- If dataFormat=ndjson, respond with application/x-ndjson and stream one JSON object per line using Node streams without buffering the entire payload.

## POST /data

Accept a JSON body with expression, range, points, dataFormat. Behave identically to GET /data with validation and response streaming.

## GET /plot

Accept query parameters expression, range, points, format, width, height, margin. Validate inputs. Generate the series and:
- If format=svg, stream an SVG response with content-type image/svg+xml using pipeline or res.write to send chunks.
- If format=png, generate SVG then pipe through sharp().png() to produce a PNG stream with content-type image/png.

## POST /plot

Accept a JSON body with the same parameters and produce the same streaming response behavior as GET /plot.

# CLI Interface

Add the following flags to main CLI:

--serve       Start the HTTP server instead of one-off data or plot generation.
--host        Hostname for the server to bind. Defaults to localhost.
--port        Port for the server to listen on. Defaults to 3000.

When --serve is provided, initialize an Express application, mount the four endpoints, and listen on the configured host and port. Skip the one-off CLI logic.

# Server Implementation

- Use Express for request routing and the built-in JSON body parser for POST endpoints.
- Use Zod to define and enforce schemas for query parameters and JSON bodies.
- Leverage existing generate data and renderPlot functions; for large payloads use streaming and backpressure-aware pipelines (stream.pipeline or res.write).
- Handle errors by returning HTTP 400 for validation failures and HTTP 500 for unexpected errors in JSON or text format.
- Log incoming requests and error details at info level.
- Gracefully handle SIGINT and SIGTERM, closing the server and freeing resources.

# Testing

- Create unit tests using Supertest for each endpoint (GET/POST /data and GET/POST /plot), verifying status codes, content-types, and payload structures including streaming NDJSON and PNG signatures.
- Add integration tests that launch the server on an ephemeral port, perform real HTTP requests, and validate end-to-end behavior.

# Documentation Updates

- In USAGE.md, add a section "Running HTTP Server" with npm script serve and curl command examples for GET and POST on /data and /plot.
- In README.md under Examples, include HTTP service usage with sample GET and POST requests for JSON, NDJSON, SVG, and PNG responses.

# Dependencies

- Move express from devDependencies to dependencies in package.json.
- Ensure zod and sharp remain as dependencies for input validation and image conversion.