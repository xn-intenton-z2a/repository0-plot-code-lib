# Overview
Extend the HTTP server to support a dedicated `/stats` endpoint that returns summary statistics for a data series derived from a mathematical expression or imported data file. This endpoint provides both JSON and plain-text output formats.

# HTTP API Endpoints
- GET `/stats`
  • Query parameters:
    - expression (required when dataFile is absent): function string in form `y=…`
    - range (required when expression is provided): axis in format `axis=min:max`
    - dataFile (required when expression is absent): file path to JSON, CSV, or YAML data
    - samples (optional): integer count of sample points, default `100`
    - json (optional): `true|false`, default `true`
  • Behavior:
    - Expression mode: use parseRange and generateData to produce points
    - File mode: read file (JSON, CSV, YAML), parse into an array of `{x,y}` points
    - Compute summary metrics: min, max, mean, median, stddev via helper `computeSummaryStats`
    - Response:
      - If `json=false`: respond `text/plain` with one `label: value` per line
      - If `json=true`: respond `application/json` with `{ min, max, mean, median, stddev }`
    - Error handling: return status `400` with JSON error message for missing or invalid parameters

# Implementation
- In `src/lib/main.js` alongside the `/plot` route:
  • Add `app.get('/stats', async (req, res) => { … })` handler
  • Validate and parse query parameters using zod or manual checks
  • For expression mode: call `parseRange` and `generateData`
  • For file mode: detect format by file extension, `fs.readFileSync`, parse JSON, YAML, or CSV into series
  • Implement and use helper `computeSummaryStats(points)` to calculate metrics
  • Branch on `req.query.json` to select JSON or plain-text formatter
  • Set `Content-Type` and handle errors with proper status codes

# Testing
- Add unit tests in `tests/unit/plot-generation.test.js`:
  • Expression mode returns correct JSON object of summary statistics
  • Expression mode with `json=false` returns labeled plain-text lines
  • Data-file mode with JSON, CSV, and YAML fixtures returns accurate metrics
  • Missing or invalid query parameters return status `400` with error message
  • Ensure CORS headers and status codes align with the `/plot` endpoint

# Documentation
- Update `USAGE.md` and `README.md`:
  • Document the GET `/stats` endpoint, its parameters, and response formats
  • Provide `curl` examples for JSON and plain-text responses
  • Show sample output blocks for both response types
  • Note CORS support and `Content-Type` headers