# Overview
Add a CLI subcommand to launch an HTTP server that exposes endpoints for plot and data generation, enabling programmatic integration without invoking the CLI directly.

# CLI Flag
- `--serve <port>`: Start the HTTP API server listening on the specified port. When this flag is present, the CLI skips file output and runs in server mode.

# Implementation Steps
1. **Extend CLI Schema**
   - In `src/lib/main.js`, update `cliSchema` to include an optional `serve` field of type string matching `/^\d+$/`, representing the port number.
2. **Parse Serve Flag**
   - Modify `parseArgs` to recognize `--serve` and convert its value to a Number.
3. **Server Entry Point**
   - In `main()`, detect `parsed.serve`. If set:
     - Import and initialize an Express app.
     - Define routes:
       - **GET /plot**: Accepts query parameters `expression`, `range`, `format` (`svg` or `png`)
       - **GET /data**: Accepts `expression`, `range`, `data-format` (`json` or `csv`)
     - Validate query parameters using Zod schema mirroring the CLI flags.
     - For `/plot`, generate data with `generateData`, then:
       - If `format=svg`, call `generateSVG` and respond with `Content-Type: image/svg+xml` and the SVG string.
       - If `format=png`, generate SVG, pipe through sharp, and respond with `Content-Type: image/png` and PNG buffer.
     - For `/data`, generate data and:
       - If `data-format=json`, serialize with `JSON.stringify` and `Content-Type: application/json`.
       - If `data-format=csv`, build a header line `x,y` and rows, respond with `Content-Type: text/csv`.
     - Start listening on the provided port and log a startup message.
4. **Reuse Core Logic**
   - Leverage existing `parseRange`, `generateData`, `generateSVG` and the Zod schemas to avoid duplication.

# Testing
- Add `tests/unit/http-api.test.js` using Supertest and Vitest:
  - Initialize the Express app without binding to a real port by exporting the app instance.
  - Test **GET /plot** with valid query params:
    - Expect 200 status, correct `Content-Type`, and SVG or PNG payload (check magic header for PNG).
  - Test **GET /data** for both JSON and CSV formats:
    - Expect 200, correct `Content-Type`, valid JSON array or CSV text with header.
  - Test missing or invalid parameters return 400 with descriptive error messages.
  - Mock internal calls if necessary to isolate routing logic.

# Documentation
- **USAGE.md**: Add instructions for starting the server and example `curl` commands:
  ```sh
  repository0-plot-code-lib --serve 3000
  curl "http://localhost:3000/plot?expression=y=sin(x)&range=x=0:6.28&format=svg"
  ```
- **README.md**: Document the `--serve` flag, supported endpoints, parameter descriptions, content types, and usage examples.