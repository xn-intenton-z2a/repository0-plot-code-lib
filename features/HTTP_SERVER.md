# Summary

Add a new serve subcommand that starts an HTTP server exposing plot data via an HTTP API using Express.

# Behavior

When the first argument is "serve" the CLI:
- Parses a --port flag or uses default port 3000.
- Starts an Express server listening on the configured port.
- Exposes a GET /plot endpoint:
  - Required query parameter: expression. If missing, respond 400 with an error message.
  - Optional query parameters: xmin (default -10), xmax (default 10), samples (default 100).
  - Parse and validate numeric parameters; on validation error respond 400.
  - Call generateExpressionData(expression, xmin, xmax, samples) to produce an array of { x, y } points.
  - Respond 200 and return application/json with the data array.
- Logs a startup message indicating the server URL.

# CLI Flags

--port <number>    Port for the HTTP server (default 3000)
--help             Show help for the serve command and exit

# Implementation Details

- In src/lib/main.js update main() to recognize the "serve" command and call runServer(args).
- Implement parseServerOptions(args) to extract --port and --help flags.
- In runServer(opts):
  - Import express from dependencies and create an app.
  - Use express.json() middleware if needed.
  - Define app.get('/plot', async (req, res) => { ... }):
    - Extract req.query.expression, xmin, xmax, samples.
    - Validate expression is provided; respond res.status(400).json({ error: 'expression query parameter is required' }).
    - Convert xmin, xmax, samples to numbers; validate samples >= 2.
    - Wrap generateExpressionData call in try/catch; on error respond 400 with error message.
    - On success send res.json(dataPoints).
  - Start app.listen on opts.port; log console.log(`HTTP server listening at http://localhost:${opts.port}`).

# Testing

- Create tests/unit/http-api.test.js using vitest and supertest:
  - Test GET /plot?expression=x&xmin=0&xmax=2&samples=3 returns 200 and JSON array of length 3 with correct x, y values.
  - Test GET /plot without expression returns 400 and JSON error payload.
  - Test invalid numeric query (samples < 2 or non-numeric) returns 400 with descriptive error.
  - Mock generateExpressionData using vi to simulate and verify error paths.

# Documentation

- Update README.md under a new "HTTP Server Subcommand" section:
  - Show how to start the server: `repository0-plot-code-lib serve --port 3000`.
  - Include curl examples:
    curl "http://localhost:3000/plot?expression=x^2&xmin=0&xmax=2&samples=5"
  - Describe query parameters and response format.
- Update USAGE.md to list the serve command and its options with brief examples.