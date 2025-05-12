# Overview
Extend the HTTP server and CLI to support computing and returning summary statistics for a data series via both HTTP and a new CLI subcommand. Users can derive statistics from a mathematical expression over a range or from an existing data file using a unified API and CLI interface.

# HTTP API Endpoints
- GET `/stats`
  • Query parameters:
    - `expression` (required when `dataFile` is absent): function expression in form `y=…`
    - `range` (required when `expression` is provided): axis range in format `axis=min:max`
    - `dataFile` (required when `expression` is absent): file path to JSON, CSV, or YAML data
    - `samples` (optional): integer count of sample points, default `100`
    - `json` (optional): `true|false`, default `true`
  • Behavior:
    - Expression mode: parse range and generate data points via generateData
    - File mode: read and parse JSON, CSV, or YAML into `{x, y}` points
    - Compute metrics (min, max, mean, median, stddev) via computeSummaryStats
    - If `json=false`: respond `text/plain` with one `label: value` per line
    - If `json=true`: respond `application/json` with `{ min, max, mean, median, stddev }`
    - Set `Access-Control-Allow-Origin: *` for CORS support
    - On validation or processing errors: respond status `400` with JSON `{ error: message }`

# CLI Stats Subcommand
- Subcommand: `repository0-plot-code-lib stats`
  • Options:
    - `--expression <expression>`: function expression in form `y=…`
    - `--range <axis>=<min>:<max>`: numeric range for sampling when expression is provided
    - `--data-file <path>`: path to JSON, CSV, or YAML file containing `[{x,y}, …]`
    - `--samples <number>`: number of sample points for expression mode, default `100`
    - `--format <json|text>`: output format, default `json`
    - `--output <path>`: optional file path to write results; prints to stdout if omitted
  • Behavior:
    - Validate that either `expression` and `range`, or `dataFile` is provided
    - Generate or load data series and compute summary stats via computeSummaryStats
    - Format output as JSON or plain text
    - If `--output` is provided, write output to file, else print to console
    - On missing or invalid arguments: exit with non-zero status and print error to stderr

# Implementation
- In `src/lib/main.js` adjust `main` function:
  • Detect if first argument is `stats` and shift into CLI mode
  • Parse flags using `parseArgs` for the subcommand context
  • Reuse `parseRange`, `generateData`, data-file parsing, and `computeSummaryStats`
  • Serialize output based on `--format` and handle file writes when `--output` is set
  • Ensure exit code reflects success or failure

# Testing
- Add unit tests in `tests/unit/plot-generation.test.js` or a new `tests/unit/cli-stats.test.js`:
  • Verify `stats` subcommand computes correct metrics in JSON and text formats for expression and file modes
  • Test error conditions: missing required flags, invalid range, unsupported file formats
  • Mock filesystem writes when `--output` is used

# Documentation
- Update `USAGE.md` and `README.md`:
  • Document the `stats` subcommand syntax, required options, defaults, and output formats
  • Provide `shell` examples for expression mode and data-file mode in both JSON and text outputs
  • Note exit codes and error messages