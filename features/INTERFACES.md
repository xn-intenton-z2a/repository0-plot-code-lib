# INTERFACES

## Purpose
Provide a unified user interface layer that combines a robust CLI powered by commander with an HTTP server, sharing core logic for time series data and plot generation. Use commander for declarative flag definitions, automatic help/version commands, and JSON output to facilitate automation.

## Behavior

### CLI via Commander
1. Replace the custom argument parser with commander-based CLI in the main entrypoint.
2. Define two subcommands: `timeseries` (alias default) and `plot`, each with declarative options:
   • `--expression <expr>` (required)
   • `--range <start:end[:step]>` (required)
   • `--points <number>` (default 100)
   • `--format <csv|json>` for timeseries (default csv)
   • `--plot-format <svg|png>` for plot (default svg)
   • `--width <number>`, `--height <number>` (defaults 800, 600)
   • `--title <string>` (optional)
   • `--output-file <path>` (optional)
3. Provide global `--help` and `--version` commands automatically.
4. Support a structured JSON output mode via a `--json-output` flag that prints parsed options as JSON.
5. On invocation without subcommand, run timeseries by default.
6. Integrate zod schemas for input validation, printing errors and exiting with appropriate codes.

### HTTP Server
1. Triggered by a `serve` command or `--serve` global flag, with optional `--port <number>`.
2. Configure Express with CORS, body parsers, and reuse zod schemas from CLI for validation.
3. Routes:
   • `GET /` serves an HTML form.
   • `POST /plot` accepts JSON or form data, returns inline SVG or base64 PNG.
   • `GET /timeseries` returns CSV or JSON dataseries.
   • `GET /plot` returns raw SVG or PNG binary.
   • `GET /stream` streams SSE events of `{ x, y }`.
4. Ensure consistent error responses and status codes share logic with CLI.

## Implementation
- In `src/lib/main.js`, import commander and define program with subcommands.
- Use `program.command(...)` for timeseries and plot behaviors calling existing `getTimeSeries`, `generateSVG`, `generatePNG`, `serializeCSV`, `serializeJSON`.
- Implement a `--json-output` option that prints the parsed options object.
- Retain `startHTTPServer` and share zod schemas for CLI and HTTP.
- Deprecate the custom parser by removing its code paths or marking as internal fallback.
- Update `bin` entry to call the commander-based `main` function.

## Testing
- Extend existing Vitest CLI tests to use commander invocation: spawn child process with `--help`, `--version`, and verify help text and version number.
- Add tests for `--json-output` producing valid JSON.
- Ensure existing CLI tests for CSV, JSON, SVG, PNG continue to pass with new CLI implementation.
- Verify HTTP tests remain unaffected.