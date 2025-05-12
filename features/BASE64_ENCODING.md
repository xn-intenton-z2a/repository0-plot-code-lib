# Overview
Add support for a base64 encoding option on the `/plot` HTTP endpoint so that clients can receive a JSON response containing the image as a base64 string and its type, enabling easy embedding in HTML or application code without handling raw binary.

# HTTP API Endpoint
- GET `/plot`
  • New optional query parameter: `encoding=base64`
  • When `encoding=base64` is present and true:
    - The server responds with `application/json`
    - Response body structure:
      ```json
      {
        "data": "<base64-encoded-image>",
        "type": "svg" | "png"
      }
      ```
    - If `format=svg`: encode the SVG string as UTF-8, then base64 encode.
    - If `format=png`: base64 encode the PNG buffer.
  • Existing behavior remains unchanged when `encoding` is absent or not `base64`.
  • Error handling: If `encoding` is unrecognized, return status 400 with JSON error.

# Implementation
- Modify the Express handler in `src/lib/main.js` for `/plot`:
  • Detect `req.query.encoding === 'base64'`
  • After generating `result` from `generatePlot`:
    - If `result.data` is a Buffer or string, convert to a Buffer if needed, then call `toString('base64')`.
    - Build JSON `{ data: base64String, type: result.type }` and send with `res.json(...)`.
  • Maintain CORS, status codes, and parameter validation consistency.

# Testing
- Add unit tests in `tests/unit/plot-generation.test.js`:
  • Test GET `/plot` with `encoding=base64` for both `format=svg` and `format=png`:
    - Expect `application/json` content type.
    - Expect JSON body with correct `data` base64 string and correct `type` field.
  • Test invalid `encoding` values return 400 with JSON error.

# Documentation
- Update `USAGE.md` and `README.md`:
  • Document the `encoding=base64` parameter in `/plot` endpoint description.
  • Provide `curl` examples showing JSON response with base64 data for SVG and PNG.
  • Show sample JSON response blocks.
