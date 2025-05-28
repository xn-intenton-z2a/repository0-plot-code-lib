# Overview

Enhance the core time series generation command to support both JSON and CSV export formats via a single, structured CLI entrypoint. Users will generate numeric data series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI with:

- Required flags:
  - `--expression, -e`: A formula in the form `y=<expression>` or `<expression>`.
  - `--range, -r`: A numeric range in the form `x=<start>:<end>:<step>`.
- Optional flags:
  - `--format, -f`: Output format, `json` (default) or `csv`.
  - `--output, -o`: File path to write results; if omitted, prints to stdout.
  - `--help, -h`: Display usage information and exit code 0.
  - `--version, -v`: Display the package version and exit code 0.

Behavior:
- Strip optional `y=` prefix, compile with mathjs, validate the range syntax.
- Generate an inclusive series of `{ x, y }` points.
- If format is `json`, output `JSON.stringify(series, null, 2)`.
- If format is `csv`, output lines starting with `x,y` header and comma-separated rows.
- Write to the specified file or stdout.
- On any validation or write error, exit with code 1 and print a descriptive `Error: <message>`.

# Implementation

- Use yargs to define and parse flags: `expression`, `range`, `format`, `output`, plus built-in `.help()` and `.version()`.
- Export a programmatic function `main({ expression, range, format, output })` that returns the data array or throws.
- In CLI mode, call `main()`; catch and report errors, then exit appropriately.

# Tests

- Extend unit tests to cover:
  - JSON stdout and file write tests.
  - CSV stdout and file write tests.
  - Error cases for invalid format, expression, and range.
  - Help/version flags exit code 0 and expected output.

# Documentation

- Update `USAGE.md` to document the `--format` option and both JSON and CSV examples.
- Update `README.md` under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version.