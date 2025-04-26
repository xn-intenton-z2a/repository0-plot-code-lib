# Overview
Add HTTP content negotiation to the /plot endpoint so clients can request JSON time series, CSV data, SVG images, or PNG images via standard Accept headers. This complements explicit format flags and enables seamless integration with HTTP clients.

# HTTP Server Integration
Extend the Express server in src/lib/main.js when --serve mode is used. For POST /plot:

- Read the Accept header from the request.
- Define supported media types and their server formats:
  - application/json maps to JSON time series output
  - text/csv maps to CSV time series output
  - image/svg+xml maps to SVG plot output
  - image/png maps to PNG plot output
- Use Express res.format or a manual q-value parser following HTTP_CONTENT_NEGOTIATION guidelines.
- Merge Accept-based format selection with any explicit "format" or "export-data-format" fields in the JSON payload, giving precedence to Accept header.
- Add a Vary: Accept header to all responses.

# Content Types and Negotiation
- Implement q-value parsing for weighted preferences, defaulting to q=1.0 where not specified.
- For wildcard Accept patterns (e.g. */* or image/*), select the highest priority supported subtype.
- If no supported media type matches, respond with HTTP 406 Not Acceptable and a JSON error body describing supported types.
- For successful negotiation, set the Content-Type header to the chosen media type and send the corresponding data or image bytes.

# Error Handling
- On unsupported Accept header, return 406 with a JSON body: { error: "Unsupported media type", supported: ["application/json","text/csv","image/svg+xml","image/png"] }.
- On internal failures during rendering or serialization, return 500 with a JSON body: { error: "Internal server error", detail: <error message> }.

# Testing
- Add tests in tests/unit/server.content.test.js to cover:
  - Negotiation of each supported media type based on Accept header.
  - Weighted q-value ordering and wildcard handling.
  - 406 response when none match.
  - Presence of Vary header in responses.

# Documentation
- Update docs/USAGE.md and README.md under HTTP API to:
  - Document Accept header usage for content negotiation.
  - Show examples of curl requests with -H "Accept: application/json" or image/svg+xml.
  - Explain fallback behavior and error codes.
