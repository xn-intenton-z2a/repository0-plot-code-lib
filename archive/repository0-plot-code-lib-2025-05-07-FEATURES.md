features/OUTPUT_SERVICES.md
# features/OUTPUT_SERVICES.md
# Overview
Consolidate all data serialization modes and HTTP server endpoints into a unified OutputServices module. Provide both CLI and HTTP interfaces through shared pipeline logic for generating, serializing, and serving time series data and rendered plots.

# Source File Updates
1. Refactor serializeDataStream, benchmarkSerialize, and startServer into a single cohesive set of exported functions in src/lib/main.js:
   - Extract common pipeline logic into functions: streamData, benchmarkStream, and serveHttp.
   - streamData accepts a data iterable and options for format, bufferSize, and csvHeader and returns a Readable or writes directly to stdout.
   - benchmarkStream wraps streamData to perform warmup and measured iterations, computing duration and throughput.
   - serveHttp initializes an Express app with GET /api/data and GET /api/plot using streamData and renderPlot under shared validation and error handling.
2. Update main(args) to dispatch to OutputServices functions based on CLI flags:
   - --benchmark, --warmup, --iterations for benchmarking mode.
   - --serve and --port for HTTP server mode.
   - --format, --buffer-size, --csv-header stay for CLI serialization.
   - --plot-format, --width, --height, --label-x, --label-y for plot rendering in both CLI and HTTP contexts.
3. Ensure error messages and exit codes remain consistent across modes.

# CLI Options
- --format <json|json-stream|ndjson|csv>: choose serialization mode.
- --benchmark: enable throughput benchmarking; use --warmup and --iterations.
- --warmup <number>: records to process before timing (default 100).
- --iterations <number>: repeat measured phase for averaging (default 1).
- --serve: start HTTP server instead of exiting after CLI tasks.
- --port <number>: HTTP server port (default 3000).
- Plot options shared: --plot-format, --width, --height, --label-x, --label-y.

# HTTP Endpoints
- GET /api/data with query parameters expression, range, format, bufferSize, csvHeader, warmup, iterations, benchmark; streams data or returns JSON summary when benchmarking.
- GET /api/plot with query parameters expression, range, plotFormat, width, height, labelX, labelY; returns image/png or image/svg+xml.
- Use zod for parameter validation and return HTTP 400 with JSON error messages on invalid input.

# Tests
- Unit tests for streamData covering all formats and header behavior, including backpressure handling.
- Unit tests for benchmarkStream verifying correct record counting, timing, and summary output.
- Unit tests for serveHttp handlers validating inputs, correct use of streamData and renderPlot, correct response headers and error handling.
- Integration tests using supertest against the running Express server for both /api/data and /api/plot under different formats and flags.

# Documentation
- Update USAGE.md to describe unified OutputServices features under CLI and HTTP headings, with examples for data serialization, benchmarking, and HTTP calls.
- Update README.md Features section to reflect combined output services and list all supported modes, flags, and endpoints.