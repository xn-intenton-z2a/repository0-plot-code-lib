# Overview

Enhance the existing CLI command to support both JSON and CSV export formats via a single entrypoint. Users can generate numeric data series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - --expression, -e : Formula in the form y=<expression> or <expression>.
  - --range, -r      : Numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - --format, -f     : Output format, json (default) or csv.
  - --output, -o     : Path to write the output; if omitted, prints to stdout.
  - --help, -h       : Display usage information and exit code 0.
  - --version, -v    : Display package version and exit code 0.

Validation errors exit code 1 with descriptive messages.

# Implementation

- Use yargs to configure flags: expression, range, format, output, help, version.
- Export a programmatic function `main({ expression, range, format, output })` that:
  1. Strips optional "y=" prefix and compiles the expression via mathjs.
  2. Parses and validates the range string; enforces step > 0 and start <= end.
  3. Generates an inclusive series of `{ x, y }` points.
  4. Serializes to JSON or CSV based on `--format`.
  5. Writes to the specified file or stdout.
- The CLI entrypoint invokes `main`, handles exceptions, prints errors to stderr, and exits with appropriate codes.

# Tests

- Extend `tests/unit/plot-generation.test.js` to cover:
  - Default JSON output to stdout and file writing.
  - CSV output to stdout and file writing.
  - Unsupported format errors.
  - Invalid expression and range errors.
  - Help and version flag behavior.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document `--format` and provide examples for JSON and CSV.
- Update `README.md` under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version commands.