# Overview

Extend the existing time series CLI command to support both JSON and CSV export formats through a single, structured interface. Users can generate numeric series from a mathematical expression and a range, then choose their preferred output format and target (stdout or file).

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression, -e` : Formula in the form `y=<expression>` or `<expression>`.
  - `--range, -r`      : Numeric range in the form `x=<start>:<end>:<step>`.
- Optional flags:
  - `--format, -f`     : Output format: `json` (default) or `csv`.
  - `--output, -o`     : File path to write output; if omitted, prints to stdout.
  - `--help, -h`       : Show usage information and exit 0.
  - `--version, -v`    : Show package version and exit 0.

Validation errors (invalid expression, range, or unsupported format) terminate with exit code 1 and print a descriptive `Error: <message>` to stderr.

# Implementation

- Add dependencies in `package.json`: `yargs` (v17+) for CLI parsing and `mathjs` (v11+) for expression compilation.
- In `src/lib/main.js`:
  1. Use `yargs` to configure required options (`expression`, `range`), optional flags (`format`, `output`), and built-in help/version.
  2. Export a programmatic `main({ expression, range, format, output })` that:
     - Strips optional `y=` prefix and compiles the expression via `mathjs.compile`.
     - Parses and validates the range string (`x=<start>:<end>:<step>`, enforce `step>0` and `start<=end`).
     - Generates an inclusive series of `{ x, y }` points.
     - Serializes the series to JSON or CSV:
       - JSON: `JSON.stringify(series, null, 2)`.
       - CSV: header `x,y` plus rows `${x},${y}` per point.
     - Writes output to the specified file with `fs.writeFileSync` or logs to stdout.
  3. CLI entrypoint invokes `main()`, catches errors to `stderr`, and sets `process.exit` codes accordingly.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:
- Default JSON output to stdout and file via `--output`.
- CSV output to stdout (`--format csv`) and file via `--output`.
- Error on unsupported formats (exit 1, yargs `Choices:` message).
- Error on invalid expression and invalid range (exit 1, descriptive message).
- Help and version flags: exit code 0 and expected usage/version text.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document `--format` and examples for JSON and CSV.
- Update `README.md` under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version commands.
