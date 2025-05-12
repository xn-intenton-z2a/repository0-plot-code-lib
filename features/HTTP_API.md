# Overview
Enhance the HTTP server mode by adding a `/stats` endpoint for summary statistics alongside the existing `/plot` endpoint. Enable CORS support, configurable origin whitelisting, and support `encoding=base64` on `/plot`.

# Endpoints

## GET /plot
- Accept all existing query parameters: `expression`, `range`, `format`, `width`, `height`, `samples`, `xLog`, `yLog`, `grid`, `title`, `xLabel`, `yLabel`, `derivative`, `palette`, `colors`, `trendlineStats`, `overlayTrendline`.
- New query parameter `encoding=base64`. When present:
  • Respond with `application/json` containing an object: `{ data: string, type: string }`.
  • `data` is the base64-encoded image (SVG or PNG) string.

## GET /stats
- Compute summary statistics (`min`, `max`, `mean`, `median`, `stddev`) for a data series defined by:
  • Query parameters `expression` and `range` (format `axis=min:max`), or
  • `dataFile` pointing to a JSON, YAML, or CSV file on disk.
- Optional `samples` (default 100) and `json` (`true|false`, default `true`).
- If `json=false`, return `text/plain` with each statistic on its own line formatted to two decimal places.
- If `json=true`, return `application/json` with the statistics object.

# Implementation
1. **Dependencies and Imports**  
   • Install and import the `cors` middleware if not already present.  
2. **CORS Configuration**  
   • In HTTP server mode, before defining routes, apply `app.use(cors(corsOptions))`.  
   • Support `--cors-origins` CLI flag and `CORS_ORIGINS` environment variable to restrict origins.  
3. **/plot Handler Enhancements**  
   • After calling `generatePlot(opts)`, detect `req.query.encoding==='base64'`.  
   • Encode the returned `result.data` (string or Buffer) to base64.  
   • Respond with JSON `{ data: <base64>, type: result.type }` and `application/json` content type.  
4. **/stats Handler**  
   • Add `app.get('/stats', async (req, res) => { ... })` after `/plot`.  
   • Parse and validate query parameters using Zod or existing `statsSchema`.  
   • For expression mode: `parseRange(range)` then `generateData(expression, rangeObj, samples)`.  
   • For dataFile mode: `parseDataFile(dataFile)` to load points.  
   • Compute statistics over the `y` values: `min`, `max`, `mean`, `median`, `stddev`.  
   • Respond with `text/plain` or `application/json` based on `json` flag.  
   • On errors, return `400` status with JSON `{ error: message }`.

# Testing
- Add new tests in `tests/unit/http-api.test.js`:
  • **CORS**: default allows all origins, and respects whitelisted origins via flag or env var.  
  • **/plot**: with `encoding=base64`, returns JSON payload and correct base64 string for both SVG and PNG.  
  • **/stats**: valid expression, range, dataFile scenarios for both JSON and plain-text responses.  
  • **Error cases**: missing required parameters, invalid range syntax, unsupported dataFile extension, invalid `json` flag causes `400`.

# Documentation
- Update `README.md` and `USAGE.md` under **HTTP Server Mode**:
  • Document the `--cors-origins` flag and `CORS_ORIGINS` environment variable.  
  • Describe `GET /plot?encoding=base64` usage and sample JSON response.  
  • Add a **Stats Endpoint** section illustrating `GET /stats` for both plain-text and JSON formats with example `curl` commands.
