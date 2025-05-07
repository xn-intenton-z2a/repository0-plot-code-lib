# Overview

Extend the CLI tool into a long running HTTP server using Express and Zod to provide programmatic access for generating time series data and rendering plots in JSON, NDJSON, SVG or PNG formats. Support streaming responses for large payloads.

# API Endpoints

## GET /data

- Accept query parameters expression, range, points, dataFormat
- Validate inputs with Zod schemas
- Generate a series of points from the expression and range
- Respond with application slash json and send the full array when dataFormat is json
- Respond with application slash ndjson and stream one json object per line when dataFormat is ndjson

## POST /data

- Accept a JSON body with parameters expression, range, points, dataFormat
- Same validation and response behavior as GET /data

## GET /plot

- Accept query parameters expression, range, points, format, width, height, margin
- Validate inputs
- Generate the series and call renderPlot to create SVG
- Stream SVG chunks as image slash svg plus xml when format is svg
- When format is png pipe the SVG stream into sharp to produce a png stream and send as image slash png

## POST /plot

- Accept a JSON body with the same parameters
- Same validation and response behavior as GET /plot

# Server Implementation

- Add CLI flags --serve, --host, --port to start the HTTP server instead of one off invocation
- On serve start an Express application
- Use JSON body parser middleware and mount the four endpoints
- Implement streaming and backpressure with pipeline or res write to avoid buffering large payloads
- Log requests and validation failures at info level
- Return HTTP 400 for invalid inputs and HTTP 500 for unexpected errors
- Handle SIGINT and SIGTERM to close the server gracefully

# Tests

- Unit tests using Supertest for GET and POST for both data and plot endpoints and verify status codes content types and payload structure
- Integration test that launches the server on an ephemeral port performs real HTTP calls for all endpoints verifies streaming behavior and cleans up

# Documentation Updates

- In USAGE.md add a section Running HTTP Server with examples of npm script serve and curl commands for GET and POST on data and plot
- In README.md under Examples add HTTP service usage with sample requests and expected response types

# Dependencies

- Move Express and Zod from devDependencies to dependencies in package.json
- Keep Sharp for PNG conversion