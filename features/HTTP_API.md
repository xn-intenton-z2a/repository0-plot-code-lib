# Overview

Extend the CLI tool into a long running HTTP server providing programmatic access to time series data generation and plot rendering.

# API Endpoints

### GET /data

Accept query parameters expression, range, points, dataFormat. Validate inputs using Zod schemas. Generate the time series and respond according to dataFormat:

• If dataFormat=json, respond with application/json and send the full array.
• If dataFormat=ndjson, respond with application/x-ndjson and stream one JSON object per line using Node streams.

### POST /data

Accept a JSON body with expression, range, points, dataFormat. Apply the same validation and response behavior as GET /data, supporting full JSON or streaming NDJSON.

### GET /plot

Accept query parameters expression, range, points, format, width, height, margin. Validate inputs. Generate the series and:

• If format=svg, stream an SVG response with content-type image/svg+xml using response.write or stream.pipeline.
• If format=png, produce an SVG then pipe through sharp to generate a PNG stream with content-type image/png.

### POST /plot

Accept a JSON body with expression, range, points, format, width, height, margin. Validate and stream responses exactly as in GET /plot.

# CLI Interface

–serve       Start the HTTP server instead of one-off data or plot generation.
–host        Hostname to bind, default localhost.
–port        Port to listen on, default 3000.

When serve mode is enabled, skip existing CLI logic and initialize an Express application hosting the four endpoints.

# Server Implementation

Use Express for routing and the built-in JSON body parser. Define and enforce request schemas with Zod. Reuse existing generate data and renderPlot functions for core logic. Employ Node stream.pipeline or res.write to stream large payloads with backpressure. Handle errors by returning HTTP 400 for validation failures and HTTP 500 for unexpected errors. Log incoming requests and errors at info level. Gracefully handle SIGINT and SIGTERM to shut down the server.

# Tests

Create unit tests with Supertest for each endpoint. Verify status codes, content types, response payloads including JSON arrays, streamed NDJSON, SVG responses, and PNG signature in binary responses. Add integration tests that launch the server on an ephemeral port to validate end-to-end behavior.

# Documentation Updates

In USAGE.md add a section "Running HTTP Server" showing npm run start -- --serve and curl examples for GET and POST on /data and /plot with expected content types. In README.md under Examples include HTTP service usage with sample curl commands and brief note on response formats.