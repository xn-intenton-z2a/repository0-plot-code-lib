# Overview

Extend the core time series generation command to support both JSON and CSV export formats via a single, structured CLI entrypoint. Users will generate numeric data series from a mathematical expression and a numeric range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression, -e`: A formula in the form y=<expression> or <expression>.
  - `--range, -r`: A numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - `--format, -f`: Output format, `json` (default) or `csv`.
  - `--output, -o`: File path to write results; if omitted, prints to stdout.
  - `--help, -h`: Display usage information and exit code 0.
  - `--version, -v`: Display package version and exit code 0.

Validation errors terminate with code 1 and print `Error: <message>` to stderr. On success, exit code 0.

# Implementation

- Use `yargs` to configure a single command with options: `expression`, `range`, `format`, `output`, and built-in `.help()` and `.version()`.
- Export a programmatic `main({ expression, range, format, output })` function that:
  1. Strips an optional `y=` prefix and compiles the expression via `mathjs.compile`.
  2. Parses and validates the range string (`x=<start>:<end>:<step>`), enforcing step > 0 and start ≤ end.
  3. Generates an inclusive series of `{ x, y }` points.
  4. Serializes the series to JSON (pretty-printed) or CSV (header `x,y` plus rows).
  5. Writes to the specified file via `fs.writeFileSync` or to stdout via `console.log`.
- The CLI entrypoint invokes `main()`, catches exceptions to stderr, and uses process exit codes 0 or 1.

# Tests

Add or extend unit tests in `tests/unit/plot-generation.test.js` to verify:

- Default JSON output to stdout and file writing with `--output`.
- CSV output to stdout (`--format csv`) and to a file with `--output`.
- Error on unsupported format values (exit code 1, stderr includes `Unsupported format`).
- Error on invalid expression or invalid range (exit code 1, stderr includes `Error:`).
- Help (`--help`, `-h`) and version (`--version`, `-v`) flags exit code 0 and display expected usage or version text.
