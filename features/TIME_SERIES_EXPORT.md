# Overview

Extend the existing time series generation command to support both JSON and CSV export formats via a single CLI entrypoint. Users can generate a numeric series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - --expression, -e : Formula in form y=<expression> or <expression>.
  - --range, -r      : Numeric range in form x=<start>:<end>:<step>.
- Optional flags:
  - --format, -f     : Output format, json (default) or csv.
  - --output, -o     : Path to write output; prints to stdout if omitted.
  - --help, -h       : Display usage information and exit code 0.
  - --version, -v    : Display the package version and exit code 0.

Validation errors exit with code 1 and print a descriptive message to stderr.

# Implementation

- Add dependencies: yargs for CLI parsing and mathjs for expression parsing.
- In src/lib/main.js:
  1. Use yargs to configure flags: expression, range, format, output, help, and version.
  2. Export a programmatic function `main({ expression, range, format, output })` that:
     - Strips optional `y=` prefix and compiles the expression via mathjs.
     - Parses and validates the range string, enforcing `step > 0` and `start <= end`.
     - Generates an inclusive series of `{ x, y }` points.
     - Serializes the series to JSON or CSV based on the `format` flag.
     - Writes to the specified file or stdout.
  3. The CLI entrypoint invokes `main()`, catches exceptions, prints errors, and uses process.exit codes.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:

- Default JSON output to stdout and file writing.
- CSV output to stdout and file writing.
- Error on unsupported format values.
- Error on invalid expression or range.
- Help and version flag behavior.

# Documentation

- Update USAGE.md under **Time Series Generation** to document `--format` and provide examples for JSON and CSV.
- Update README.md under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version commands.