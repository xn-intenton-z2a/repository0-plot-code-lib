# Overview
Enhance the existing plot engine feature by adding comprehensive integration tests for the HTTP `/plot` endpoint and updating documentation with detailed usage examples. This ensures high confidence in functionality and provides clear guidance for CLI and HTTP users.

# HTTP `/plot` Integration Tests
- Use supertest against exported `httpApp` to validate full request-response behavior.
- Cover scenarios:
  - Default SVG response: GET `/plot?expression=y%3Dx&range=x%3D0:1&format=svg`
    - Expect 200, `content-type` matching `image/svg+xml`, body containing `<svg` prefix.
  - Default PNG response: GET `/plot?expression=y%3Dx&range=x%3D0:1&format=png`
    - Expect 200, `content-type` matching `image/png`, body beginning with PNG magic bytes.
  - Base64 encoding wrapper: GET `/plot?expression=y%3Dx&range=x%3D0:1&format=svg&encoding=base64`
    - Expect 200, `application/json`, body object with `data` base64 string and `type` matching `svg`.
  - Invalid parameters: missing `expression` and `dataFile`
    - Expect 400 with JSON error message.
  - Upstream QuickChart failure simulation
    - Mock fetch to reject or return non-2xx; expect 502 and JSON error.

# Test Implementation
- In `tests/unit/plot-generation.test.js`, add new `describe` and `test` blocks for HTTP `/plot`.
- Use `vi.spyOn` or similar to mock `fetch` responses for error scenarios.
- Assert CORS header `Access-Control-Allow-Origin: *` in all responses.
- Ensure tests clean up any spies or mocks after each run.

# Documentation Updates
- USAGE.md and README.md:
  - Add example curl commands for HTTP `/plot` showing SVG, PNG, and base64-encoded responses.
  - Provide sample JSON wrapper snippet for base64 encoding.
  - Document error responses (400 validation, 502 upstream) and CORS behavior.
  - In Usage guide section under `/plot`, include at least three distinct examples:
    1. SVG output: `curl "http://localhost:3000/plot?expression=y%3Dx&range=x%3D0:5&format=svg"`
    2. PNG output: `curl "http://localhost:3000/plot?expression=y%3Dx&range=x%3D0:5&format=png"`
    3. Base64 wrapper: `curl "http://localhost:3000/plot?expression=y%3Dx&range=x%3D0:5&format=svg&encoding=base64"`
- Ensure README’s HTTP Plot Endpoint section mirrors these examples and clearly states response content types and CORS support.
