# Overview

Enhance the existing CLI with a single entrypoint that generates numeric time series from a mathematical expression and range, and exports results in JSON or CSV format.  This feature provides flexible output options for downstream data processing.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression, -e`: Formula in form `y=<expression>` or `<expression>`.
  - `--range, -r`: Range in form `x=<start>:<end>:<step>` (e.g., `x=0:2:0.5`).
- Optional flags:
  - `--format, -f`: Output format, `json` (default) or `csv`.
  - `--output, -o`: File path to write results; prints to stdout if omitted.
  - `--help, -h`: Display help and exit code 0.
  - `--version, -v`: Display package version and exit code 0.

On success, series are generated and serialized as follows:

- JSON mode: Pretty-printed array of `{ x: number, y: number }`.
- CSV mode: Header `x,y` plus one comma-separated row per data point.

Validation errors (invalid expression, range syntax, unsupported format) exit with code 1 and print `Error: <message>` to stderr.

# Implementation

- Add dependencies in `package.json`: `yargs` for CLI parsing and `mathjs` for expression parsing.
- In `src/lib/main.js`:
  1. Configure `yargs` with required options `expression`, `range`, optional `format`, `output`, plus built-in `.help()` and `.version()` flags.
  2. Export a programmatic function `main({ expression, range, format, output })` that:
     - Strips optional `y=` prefix, compiles the expression with `mathjs.compile`.
     - Parses and validates the range string, enforcing `step>0` and `start<=end`.
     - Generates an inclusive series of `{ x, y }` points.
     - Serializes the data to JSON or CSV based on `format`.
     - Writes to the specified file with `fs.writeFileSync` or to stdout with `console.log`.
  3. CLI entrypoint invokes `main()`, catches exceptions, prints errors to stderr, and uses appropriate `process.exit` codes.

# Tests

Extend `tests/unit/plot-generation.test.js` to verify:

- Default JSON output to stdout and file writing via `--output`.
- CSV output to stdout (`--format csv`) and file writing via `--output`.
- Error on unsupported format (exit code 1, yargs choices message).
- Error on invalid expression and invalid range syntax (exit code 1, descriptive error).
- Help (`--help`) and version (`--version`) flags exit 0 and display expected text.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document the `--format` option and show examples for JSON and CSV modes.
- Update `README.md` under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version commands.