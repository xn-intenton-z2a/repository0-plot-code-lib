# Overview
Enhance the existing HTTP server mode by adding Cross-Origin Resource Sharing (CORS) support and introducing a new `/stats` endpoint to expose summary statistics via HTTP alongside the existing `/plot` endpoint.

# Endpoints

## GET /plot
- Unchanged behavior: accepts same query parameters as programmatic API (expression, range, format, width, height, samples, xLog, yLog, grid, title, xLabel, yLabel, derivative, palette, colors).
- New optional query parameter `encoding=base64` returns a base64-encoded string of the image payload instead of binary or inline SVG.
- Response:
  - If format is `svg` and no encoding, returns `image/svg+xml` payload.
  - If format is `png` and no encoding, returns `image/png` payload.
  - If encoding=base64, returns `application/json` with `{ "data": "<base64string>", "type": "svg"|"png" }`.

## GET /stats
- Computes and returns summary statistics for a data series via HTTP.
- Query parameters:
  - `expression` or `dataFile` (one required): same as CLI stats subcommand.
  - `range` when using expression mode (axis=min:max).
  - `samples`: number of intervals (default 100).
  - `json` (`true`|`false`, optional): controls output format (default JSON).
- Response:
  - If `json=true` or default, returns `application/json`:
    ```json
    {
      "min": <number>,
      "max": <number>,
      "mean": <number>,
      "median": <number>,
      "stddev": <number>
    }
    ```
  - If `json=false`, returns `text/plain` with each statistic on its own line.

# CORS Support
- Enable CORS globally on the express app to allow cross-origin requests from any origin by default.
- Optionally restrict origins via a new `--cors-origins` CLI flag or environment variable.

# Implementation
1. **Import and Configure CORS**
   - `import cors from 'cors'` in `src/lib/main.js`.
   - In HTTP server mode section, before defining endpoints, add `app.use(cors())` and, if provided, configure allowed origins.

2. **Implement /stats Handler**
   - In `src/lib/main.js`, below the `/plot` route, add `app.get('/stats', ...)`.
   - Reuse CLI stats logic: parse `req.query`, validate with Zod schema matching CLI statsSchema, generate data via `generateData` or `parseDataFile`, compute min, max, mean, median, stddev, and send response with correct `Content-Type` based on `json` flag.

3. **Support Base64 Encoding for /plot**
   - In the `/plot` route, detect `req.query.encoding==='base64'`.
   - After `generatePlot`, encode `result.data` (SVG string or PNG buffer) to base64 and return JSON `{ data, type }` instead of binary.

# Testing
- Add `tests/unit/http-api.test.js`:
  - Verify CORS headers are present (`Access-Control-Allow-Origin: *`) on all endpoints.
  - Test `GET /plot` with and without `encoding=base64` for both svg and png.
  - Test `GET /stats` for expression mode and data-file mode, checking JSON and plain-text responses.
  - Test error cases: missing parameters, invalid range, unsupported data file, invalid samples.

# Documentation
- **USAGE.md**:
  - Under **HTTP Server Mode**, add:
    - Note about CORS support and optional origin restriction.
    - Example of `GET /plot?encoding=base64` returning JSON.
    - New **Stats Endpoint** section with curl examples:
      ```sh
      curl "http://localhost:3000/stats?expression=y=x&range=x=0:5"
      ```
- **README.md**:
  - In **HTTP Server Mode** subsection, mention `/stats` endpoint and show an example of JSON stats output.
