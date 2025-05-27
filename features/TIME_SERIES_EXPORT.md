# Overview

Extend the existing time series generation CLI to support both JSON and CSV export formats via a single entrypoint. Users can generate numeric data series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression, -e`: Formula in the form `y=<expression>` or `<expression>`.
  - `--range, -r`: Numeric range in the form `x=<start>:<end>:<step>`.
- Optional flags:
  - `--format, -f`: Output format, `json` (default) or `csv`.
  - `--output, -o`: File path to write output; prints to stdout if omitted.
  - `--help, -h`: Display usage information and exit code 0.
  - `--version, -v`: Display the package version and exit code 0.

Validation errors exit code 1 with descriptive message on stderr.

# Implementation

- Configure `yargs` in `src/lib/main.js` with required options: `expression`, `range`, optional `format`, `output`, plus `.help()` and `.version()`.
- Export a programmatic function `main({ expression, range, format, output })` that:
  1. Strips optional `y=` prefix and compiles the expression via `mathjs`.
  2. Parses and validates the range string, enforcing `step > 0` and `start <= end`.
  3. Generates an inclusive series of `{ x, y }` points.
  4. Serializes the series to JSON or CSV based on `format`:
     - JSON: `JSON.stringify(series, null, 2)`.
     - CSV: Header `x,y` plus lines for each data point.
  5. Writes to the specified file via `fs.writeFileSync` or to stdout if omitted.
- CLI entrypoint invokes `main()`, handles exceptions, prints errors, and uses process.exit codes for success (0) or failure (1).

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:

- Default JSON output to stdout and file writing.
- CSV output to stdout (`--format csv`) and file writing.
- Errors on unsupported format, invalid expression, and invalid range.
- Help and version flags behavior.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document `--format` and provide examples for JSON and CSV.
- Update `README.md` under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version commands.