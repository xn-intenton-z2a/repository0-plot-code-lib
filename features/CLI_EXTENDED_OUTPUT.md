# Overview

Enhance the CLI with yargs to support structured parsing, built-in help/version commands, and flexible output formats (JSON and CSV) for time series generation. Users can now generate numeric series from expressions and ranges with clear usage information.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression, -e` (string): formula in the form `y=<expression>` or `<expression>`.
  - `--range, -r` (string): numeric range in the form `x=<start>:<end>:<step>`.
- Optional flags:
  - `--format, -f` (string): output format, `json` (default) or `csv`.
  - `--output, -o` (string): file path to write output; prints to stdout if omitted.
  - `--help, -h`: display usage and exit code 0.
  - `--version, -v`: display package version and exit code 0.

Validation errors (invalid expression, range syntax, or write failures) exit with code 1 and print a descriptive error to stderr.

Output:
- **JSON**: pretty-printed array of objects `{ x: number, y: number }`.
- **CSV**: header `x,y` followed by comma-separated data lines.

# Implementation

- Add `yargs` and `mathjs` to `dependencies` in `package.json`.
- In `src/lib/main.js`:
  - Use `yargs` to configure required and optional flags, `.help()`, and `.version()`.
  - Strip optional `y=` prefix, compile the expression, parse and validate the range, generate the series points.
  - After series generation, serialize to JSON or CSV based on `--format` and write to stdout or the `--output` file.
  - Ensure correct exit codes for success (0) and failures (1).

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:

- Default JSON output to stdout and file writing.
- CSV output to stdout and file writing.
- Error on unsupported `--format` values.
- Error on invalid expression or range flags.
- Help and version flags: exit code 0 and expected output.

# Documentation

- Update `USAGE.md` under "Time Series Generation" to document the `--format` option, examples for JSON and CSV, and built-in help/version.
- Update `README.md` under `## Time Series Generation` with usage snippets showing JSON and CSV examples and help/version commands.