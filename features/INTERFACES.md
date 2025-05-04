# INTERFACES

# Purpose
Consolidate all user interfaces and data serialization into a unified interface layer that supports CSV, JSON, NDJSON, SVG, and PNG formats across programmatic API, CLI, and HTTP endpoints.

# Behavior

## Programmatic API
1. Expose getTimeSeries(expression, range, options) returning Promise of array of { x, y }.
2. Export generateSVG(data, width, height, title) producing inline SVG markup.
3. Export generatePNG(data, width, height, title) producing Promise of PNG Buffer via sharp.
4. Export serializeCSV(data), serializeJSON(data), and serializeNDJSON(data) for CSV, pretty JSON, and NDJSON lines respectively.

## Command Line Interface via commander
1. Define default timeseries command and plot subcommand.
2. Global options: --expression <expr> (required), --range <start:end[:step]> (required), --points <number> (default 100), --output-file <path> (optional), --json-output flag.
3. Timeseries command: --format <csv|json|ndjson> (default csv); apply matching serializer and write to stdout or file.
4. Plot command: --plot-format <svg|png> (default svg), --width <number> (default 800), --height <number> (default 600), --title <string> (optional); render SVG or PNG and write to stdout or file.
5. Reuse Zod schemas for validating all CLI inputs and provide meaningful errors.

## HTTP Server API
1. GET / returns an HTML form interface.
2. GET /ndjson streams time series data in NDJSON format; query parameters: expression, range, points; response content-type application/x-ndjson.
3. GET /stream serves Server-Sent Events; query parameters: expression, range, points; stream each data point as SSE events.
4. POST /plot accepts JSON or form data; validated via Zod; returns inline SVG in HTML for svg or base64 PNG in an img tag for png.
5. Enable CORS, parse JSON and URL-encoded bodies.

# Implementation
1. In src/lib/main.js: integrate serializeNDJSON, update commander configuration to include ndjson format, implement GET /ndjson endpoint using Express and Zod, reuse existing getTimeSeries, serializers, generateSVG, and generatePNG functions.
2. Use res.type and res.send or res.write for streaming responses.
3. Ensure exports for all API functions reflect the unified interface.

# Testing
1. Unit tests for serializeNDJSON output and no trailing newline.
2. CLI tests for --format ndjson and --json-output behavior; for timeseries and plot commands.
3. HTTP tests for GET /ndjson status 200 and proper headers; GET /stream SSE behavior; POST /plot for svg and png responses.
