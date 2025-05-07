# Overview

Provide a RESTful HTTP interface to expose both data generation and plot rendering capabilities over HTTP. This feature extends the existing service to support dedicated data endpoints, unified validation, and streaming responses for large payloads, enabling seamless integration into web applications and pipelines.

# API Endpoints

## GET /data

Accept query parameters
  • expression: string (required), for example y=sin(x)
  • range: string (required), in form start:end with numeric values and start < end
  • points: integer (optional), at least 2, defaults to 100
  • dataFormat: string (optional), json, ndjson or csv, defaults to json

Behavior
  1. Validate inputs using a Zod schema. On validation error, respond with status 400 and JSON { error: message }.
  2. Generate the time series data array using existing logic.
  3. Stream response according to dataFormat:
     • json: send full JSON array with Content-Type application/json
     • ndjson: send one JSON object per line with Content-Type application/x-ndjson
     • csv: send header line "x,y" then comma separated values with Content-Type text/csv

## GET /plot

Accept the same query parameters as GET /data plus
  • format: string (optional), svg or png, defaults to svg
  • width, height, margin: integers (optional), defaults 800, 600, 40

Behavior
  1. Validate inputs using Zod. On error, 400 with JSON error.
  2. Generate data and then
     • for svg: stream SVG via renderPlotStream with Content-Type image/svg+xml
     • for png: pipe SVG stream into sharp().png() and stream with Content-Type image/png

## POST /data and POST /plot

Support JSON body for the same parameters. Behavior mirrors GET endpoints.

# Implementation

1. Add flags --serve, --host default 0.0.0.0, --port default 3000 in parseArgs.
2. When --serve is active, initialize Express app:
   • Use express.json middleware and Zod schemas for GET query and POST body.
   • Register routes for GET and POST /data and /plot.
   • In handlers, call existing functions for data generation and renderPlotStream.
   • Respect backpressure when streaming large responses.
3. Start server and log "HTTP server listening on http://host:port".
4. Handle SIGINT and SIGTERM to gracefully shut down.

# Tests

Create tests/unit/http-api.test.js using Vitest and Supertest
  • GET /data default: expect status 200, application/json, body is array of points
  • GET /data ndjson: expect status 200, x-ndjson, lines equal JSON objects
  • GET /data csv: expect status 200, text/csv, first line x,y then numeric rows
  • GET /plot svg: status 200, image/svg+xml, body starts with <svg
  • GET /plot png: status 200, image/png, body begins with PNG signature bytes
  • POST /data and POST /plot variants with JSON body, same assertions
  • Missing or invalid params: expect 400 and JSON error field

# Documentation Updates

In USAGE.md add sections
  Running HTTP Server  describe --serve, --host, --port flags and examples
  Data Endpoint    show curl examples for /data in json, ndjson, csv
  Plot Endpoint    show curl examples for /plot in svg and png

In README.md under HTTP API add
  curl examples for GET and POST /data and /plot with notes on response headers