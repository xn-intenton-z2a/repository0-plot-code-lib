# Overview

Enhance the existing time series generation CLI to support both JSON and CSV export formats directly from a single command. Users can generate a numeric series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - --expression, -e : Formula in form y=<expression> or <expression>.
  - --range, -r      : Numeric range in form x=<start>:<end>:<step>.
- Optional flags:
  - --format, -f     : Output format, json (default) or csv.
  - --output, -o     : Path to write the output; if omitted, prints to stdout.
  - --help, -h       : Display usage information and exit code 0.
  - --version, -v    : Display the package version and exit code 0.

Validation errors exit code 1 with a descriptive message on stderr.

# Implementation

- Add dependencies: yargs for CLI parsing and mathjs for expression parsing.
- In src/lib/main.js:
  1. Use yargs to configure flags: expression, range, format, output, help, and version.
  2. Export a programmatic `main({ expression, range, format, output })` function that:
     - Strips optional `y=` prefix and compiles the expression via mathjs.
     - Parses and validates the range string, enforcing step > 0 and start <= end.
     - Generates an inclusive series of `{ x, y }` points.
     - Serializes the series to JSON or CSV based on the `format` flag.
     - Writes to the specified file or stdout.
  3. The CLI entrypoint invokes `main()`, handles exceptions, prints errors, and exits with appropriate codes.

# Tests

Extend tests in tests/unit/plot-generation.test.js to cover:
- JSON stdout and file writing.
- CSV stdout and file writing.
- Unsupported format errors.
- Invalid expression and range errors.
- Help and version flag behavior.

# Documentation

- USAGE.md: Document `--format` option with examples for JSON and CSV output.
- README.md: Under `## Time Series Generation`, include usage snippets for JSON, CSV, file output, help, and version commands.