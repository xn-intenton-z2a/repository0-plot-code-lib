# HTTP Plot Endpoint

## Overview
Add an HTTP `/plot` endpoint to the existing CLI server to generate and serve SVG and PNG plots directly via HTTP. Support raw binary responses and base64-encoded JSON responses for easy embedding.

## HTTP API Endpoint
- **GET** `/plot`

### Query Parameters
- `expression` (required): Function expression in `y=…` form.
- `range` (required): Axis range in `axis=min:max` format.
- `format` (required): `svg` or `png`.
- `encoding` (optional): `base64`. When present, respond with JSON instead of raw image bytes.
- `width` (optional): Integer pixel width of the plot.
- `height` (optional): Integer pixel height of the plot.
- `samples` (optional): Number of sample points (default 100).
- Additional styling flags: `xLog`, `yLog`, `grid`, `title`, `xLabel`, `yLabel`, `derivative`, `palette`, `colors`, `trendlineStats`, `overlayTrendline`.

### Behavior
1. Validate request query with Zod schema, return 400 on validation errors.
2. Generate data series via `parseRange` and `generateData`.
3. Invoke new `generatePlot(dataPoints, options)` utility to render an SVG string or a PNG buffer.
4. Set CORS header `Access-Control-Allow-Origin: *` on all responses.
5. If `encoding=base64`:
   - Respond `application/json` with body:
     ```json
     {
       "data": "<base64-encoded-image>",
       "type": "svg"|"png"
     }
     ```
6. Otherwise:
   - For `svg`: set `Content-Type: image/svg+xml` and send the SVG text.
   - For `png`: set `Content-Type: image/png` and send the PNG binary buffer.
7. Handle errors (missing params, invalid format, plot generation failures) with HTTP 400 and JSON error messages.

## Implementation
- In `src/lib/main.js`, extend `createServer(app)` to add an Express handler for `/plot` following the behavior above.
- Implement `generatePlot(points, options)` in the same file or a new helper:
  - Render SVG via template strings or EJS.
  - Convert SVG to PNG via `sharp` when `format=png`.
- Reuse existing utilities (`parseArgs`, `parseRange`, `generateData`).
- Add or update dependencies if needed (e.g., ensure `sharp` is present).

## Testing
- Add unit tests in `tests/unit/plot-endpoint.test.js`:
  - Test GET `/plot` for both formats (`svg`, `png`) without encoding and verify content type and response body length.
  - Test GET `/plot?encoding=base64` returns correct JSON structure with valid base64 data and type.
  - Test missing or invalid parameters return 400 with JSON error field.

## Documentation
- Update `USAGE.md` and `README.md`:
  - Document the new `/plot` endpoint, its parameters, and response formats.
  - Include `curl` examples for raw SVG, raw PNG, and base64-encoded JSON.
  - Show sample responses for each mode.
