# Overview
Extend the HTTP server and CLI to support computing and returning summary statistics for a data series via both HTTP and a fully implemented `stats` CLI subcommand. Users can derive statistics from a mathematical expression over a range or from an existing data file using a unified API and CLI interface.

# HTTP API Endpoint `/stats`
- **GET** `/stats`
  • Query parameters:
    - `expression` (required when `dataFile` is absent): function expression in form `y=…`
    - `range` (required with `expression`): axis range in format `axis=min:max`
    - `dataFile` (required when `expression` is absent): path to JSON, CSV, or YAML data
    - `samples` (optional): integer count of sample points (default `100`)
    - `json` (optional): `true|false` (default `true`)
  • Behavior:
    - Expression mode: parse range with `parseRange`, generate points with `generateData`
    - File mode: read and parse JSON, CSV, or YAML files into `{x, y}` points
    - Compute statistics via `computeSummaryStats`: `min`, `max`, `mean`, `median`, `stddev`
    - If `json=false`: respond `text/plain`, one `key: value` per line with two decimal places
    - If `json=true`: respond `application/json` with JSON object of stats
    - Always include `Access-Control-Allow-Origin: *`
    - On invalid input or processing errors: respond `400` with JSON `{ error: message }`

# CLI `stats` Subcommand
- **Usage**: `repository0-plot-code-lib stats [options]`
- **Options**:
  - `--expression <expression>`: function expression in form `y=…`
  - `--range <axis>=<min>:<max>`: numeric range for sampling when expression is provided
  - `--data-file <path>`: path to JSON, CSV, or YAML file with `[{x,y}, …]`
  - `--samples <number>`: number of sample points for expression mode (default `100`)
  - `--format <json|text>`: output format (default `json`)
  - `--output <path>`: optional file path to write results; writes to stdout if omitted
- **Behavior**:
  - Validate that either `expression` with `range`, or `dataFile` is provided. Exit with code `1` and error message on stderr if validation fails
  - Load or generate data series and compute stats via `computeSummaryStats`
  - Format output as JSON or plain text according to `--format`
  - If `--output` is specified, write formatted results to file; else print to stdout
  - Exit with code `0` on success or non-zero on failure

# Implementation
- Update `src/lib/main.js`:
  • In `main(argv)`, detect first argument `stats` and route to a new `runStatsCli(argv)` function
  • In `runStatsCli`:
    - Parse flags using `parseArgs`
    - Perform validation for required flags
    - Reuse `parseRange`, `generateData`, file parsing, and `computeSummaryStats`
    - Serialize stats based on `--format` and handle file writes when `--output` is provided
    - Write errors to stderr and set process exit code appropriately
- Ensure existing HTTP `/stats` handler remains unchanged and fully functional

# Testing
- Add unit tests in `tests/unit/cli-stats.test.js`:
  • Verify `stats` subcommand outputs correct JSON and text for expression mode
  • Verify `--data-file` mode works for JSON, CSV, and YAML inputs
  • Test `--output` writes files correctly (use temporary directories and cleanup)
  • Test error conditions: missing required flags, invalid range format, unsupported file types
- Update `tests/unit/plot-generation.test.js` if necessary to avoid conflicts

# Documentation
- Update `USAGE.md`:
  • Add section for `stats` subcommand syntax, options, defaults, and examples
- Update `README.md`:
  • Document `stats` subcommand under CLI Usage with examples for JSON and plain-text outputs
  • Ensure consistency with HTTP `/stats` documentation
- Confirm that `--help` includes `stats` usage