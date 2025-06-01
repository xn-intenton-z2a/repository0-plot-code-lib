# Overview

Extend the existing time series CLI to support both JSON and CSV export formats via a single structured command. Users will generate numeric data series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression, -e` (string): Formula in the form `y=<expression>` or `<expression>`.
  - `--range, -r` (string): Numeric range in the form `x=<start>:<end>:<step>`.
- Optional flags:
  - `--format, -f` (string): Output format `json` (default) or `csv`.
  - `--output, -o` (string): Path to write the output; prints to stdout if omitted.
  - `--help, -h`: Display usage information and exit code 0.
  - `--version, -v`: Display the package version and exit code 0.

### Output

- JSON mode: Pretty-printed array of `{ x: number, y: number }`.
- CSV mode: First line header `x,y`, followed by comma-separated data rows.

Validation errors (invalid expression or range syntax, unsupported format, file I/O failures) exit code 1 and print `Error: <message>` to stderr. Successful runs exit code 0.

# Implementation

- Add dependencies in `package.json`: `yargs` for CLI parsing, `mathjs` for expression evaluation.
- In `src/lib/main.js`: Configure yargs for a single command with options:
  - `expression`, `range` (required)
  - `format`, `output` (optional)
  - built-in `.help()` and `.version()` flags.
- Export a programmatic `main({ expression, range, format, output })` function that:
  1. Strips optional `y=` prefix and compiles the expression via `mathjs.compile` (throws on invalid).
  2. Parses and validates the range string (`x=<start>:<end>:<step>`, enforce `step>0` and `start<=end`).
  3. Generates an inclusive series of `{ x, y }` points.
  4. Serializes to JSON or CSV based on the `format` flag.
  5. Writes the result to the specified `output` file or prints to stdout.
- The CLI entrypoint calls `main()`, catches exceptions, prints errors to stderr, and uses process exit codes for success or failure.

# Tests

Extend `tests/unit/plot-generation.test.js` to verify:
- Default JSON stdout and JSON file output via `--output`.
- CSV stdout (`--format csv`) and CSV file output via `--output`.
- Error on unsupported format values (exit code 1, stderr contains valid choices).
- Error on invalid expression or invalid range (exit code 1, stderr contains `Error:`).
- Help and version flags exit code 0 and display expected text.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document the `--format` option and provide examples for both JSON and CSV.
- Update `README.md` under `## Time Series Generation` with usage snippets demonstrating JSON, CSV, file output, help, and version commands.