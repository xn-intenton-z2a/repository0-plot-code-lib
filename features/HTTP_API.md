# Overview

Add HTTP API endpoints leveraging an Express server to serve time series data and plots on demand. This feature allows integration with other applications and remote clients without invoking the CLI directly.

# Dependencies

- express: to create HTTP server and parse JSON bodies

# Implementation

1. Extend src/lib/main.js to accept a new CLI flag --serve <port>. When provided, skip CLI generation flow and start the HTTP server instead.
2. Import express and configure middleware:
   - Use express.json() to parse incoming request bodies as JSON.
3. Define routes:
   
   POST /api/series
   - Expects a JSON body with fields: expression, range, points (optional), format (json or csv).
   - Validate inputs using existing Zod optionsSchema (allow only json and csv here).
   - Invoke generateSeries and serializer logic to build the response.
   - Respond with Content-Type application/json for json format or text/csv for csv format. Return status 200 on success.
   - On validation or generation error, respond status 400 with a JSON body { error: <message> }.

   POST /api/plot
   - Expects a JSON body with fields: expression, range, points (optional), format (svg or png).
   - Validate inputs and ensure format is svg or png.
   - Invoke existing plot generation logic (Chart.js and Node canvas) to produce an image buffer or string.
   - Respond with Content-Type image/svg+xml for svg or image/png for png. Return status 200 on success.
   - On error, respond status 400 with JSON { error: <message> }.

   GET /api/health
   - Returns status 200 with JSON { status: "ok" } to confirm server is running.
4. Start listening on the provided port and log a message indicating HTTP API is available.

# CLI Integration

- Add new flag --serve <port> (alias -S) in minimist configuration and Zod schema as optional number.
- If serve flag is present, main should return early after starting server.
- Example: node src/lib/main.js --serve 3000 to start the API on port 3000.

# Tests

- Add unit or integration tests for HTTP endpoints using a lightweight HTTP client.
  - Test POST /api/series returns valid JSON or CSV for a simple expression.
  - Test POST /api/plot returns an SVG string beginning with <svg and a PNG buffer starting with PNG signature bytes.
  - Test error responses when missing or invalid fields.
  - Test GET /api/health returns status 200 and correct JSON.

# Documentation

- Update USAGE.md to include examples for HTTP API:
  - curl -X POST localhost:3000/api/series -d '{"expression":"y=x","range":{"x":[0,1]}}'
  - curl -X POST localhost:3000/api/plot -d '{"expression":"y=sin(x)","range":{"x":[0,6.28]},"format":"svg"}'
- Update README.md feature list to reference HTTP API endpoints.