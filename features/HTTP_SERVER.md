# Overview

Extend the existing CLI tool to support an HTTP server mode that exposes the plotting and data export functionality over REST endpoints. Users can start the service via a --serve flag and query GET /plot and GET /health endpoints to render plots or time-series data dynamically.

# CLI Options

- --serve, -S
  Start an HTTP server instead of running CLI logic
- --port, -p <number>
  Port number on which to run the HTTP server, default 3000

# HTTP API Endpoints

GET /plot
Query parameters:
  expression: required, string formula in x
  range: required, numeric range specification for x and optional y
  samples: optional, integer ≥2, default 100
  format: optional, svg or png, default svg
  export: optional, csv or json

Responses:
  image/svg+xml when format=svg
  image/png when format=png
  text/csv when export=csv
  application/json when export=json
  400 on validation errors with a JSON error message

GET /health
Returns 200 and JSON { status: "ok" }

# Implementation

1. Update argument parser to include serve (boolean) and port (number) via Zod schema.
2. In main, if serve flag is true, initialize Express on given port.
3. Add middleware to validate query parameters with the same Zod schema used for CLI.
4. Implement GET /plot using existing parseRanges, expression compilation, sampling, and rendering logic, responding with correct headers.
5. Implement GET /health to return JSON status.
6. Handle errors centrally: respond with status 4xx/5xx and JSON { error: message }.
7. Gracefully shut down server on SIGINT and SIGTERM.

# Testing and Documentation

- Add supertest-based unit tests for GET /plot and GET /health covering valid requests, missing parameters, invalid expressions, and custom port.
- Update USAGE.md and README.md to describe HTTP usage examples and options.
- Ensure coverage includes server startup and shutdown behavior.