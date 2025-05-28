# Overview

Extend the core time series generation CLI to support both JSON and CSV output formats through a single, structured interface. Users will generate numeric data series from a mathematical expression and a range, select their preferred export format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression, -e`: A formula in the form y=<expression> or <expression>.
  - `--range, -r`: A numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - `--format, -f`: Output format, `json` (default) or `csv`.
  - `--output, -o`: File path to write the output; if omitted, prints to stdout.
  - `--help, -h`: Display help information and exit code 0.
  - `--version, -v`: Display package version and exit code 0.

Output:

- **JSON** mode: Pretty-printed array of { x: number, y: number }.
- **CSV** mode: First line header x,y followed by comma-separated rows for each point.

Validation errors (invalid expression, range format, unsupported format) exit with code 1 and print `Error: <message>` to stderr.

# Implementation

- Add dependencies:
  - `yargs` for structured CLI parsing.
  - `mathjs` for safe expression compilation.
- In `src/lib/main.js`:
  1. Configure yargs with required options (`expression`, `range`), optional flags (`format`, `output`), and built-in `.help()` and `.version()`.
  2. Export a programmatic `main({ expression, range, format, output })` that:
     - Strips optional `y=` prefix and compiles the expression via `mathjs.compile`.
     - Parses and validates the range string: three numeric parts, step>0, start<=end.
     - Generates an inclusive series of `{ x, y }` points.
     - Serializes series based on `format`:
       - JSON: `JSON.stringify(series, null, 2)`.
       - CSV: header `x,y` plus data lines.
     - Writes output to the specified file or prints to stdout.
  3. The CLI entrypoint invokes `main()`, catches exceptions, writes errors to stderr, and sets appropriate exit codes.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:
- Default JSON stdout and JSON file output via `--output`.
- CSV stdout with `--format csv` and CSV file output via `--output`.
- Exit code 1 on unsupported `--format`, invalid expression, and invalid range.
- Help and version flags: exit code 0 and expected usage/version text.

# Documentation

- Update `USAGE.md` under "Time Series Generation" to document the `--format` option and examples for both JSON and CSV modes.
- Update `README.md` under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version commands.