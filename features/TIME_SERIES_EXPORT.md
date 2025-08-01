# Overview

Extend the existing time series CLI command to support both JSON and CSV export formats via a single, structured entrypoint. Users will generate numeric data series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  • --expression, -e : Formula in the form y=<expression> or <expression>.
  • --range, -r      : Numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  • --format, -f     : Output format, json (default) or csv.
  • --output, -o     : Path to write the output; if omitted, prints to stdout.
  • --help, -h       : Display usage information and exit code 0.
  • --version, -v    : Display the package version and exit code 0.

On successful invocation:

- In json mode, outputs a pretty-printed array of objects `{ x: number, y: number }`.
- In csv mode, outputs a header `x,y` followed by comma-separated rows for each data point.

Validation errors (invalid expression, invalid range, unsupported format, file write failures) exit with code 1 and print `Error: <message>` to stderr.

# Implementation

- Use yargs to configure the default command in `src/lib/main.js` with:
  • `--expression`, `--range` (required)
  • `--format`, `--output` (optional)
  • `.help()` and `.version()` for built-in flags
- Export a programmatic function `main({ expression, range, format, output })` that:
  1. Strips an optional `y=` prefix and compiles the expression via mathjs.compile (throws 'Invalid expression').
  2. Parses and validates the range string (`x=<start>:<end>:<step>`, enforce `step > 0` and `start <= end`; throws 'Invalid range').
  3. Generates an inclusive series of `{ x, y }` points.
  4. Serializes to JSON or CSV based on `format`.
  5. Writes output to the specified file via fs.writeFileSync or logs to stdout.
- The CLI entrypoint calls `main()`, catches exceptions to stderr, and uses `process.exit(0|1)` for success or failure.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:

- Default JSON output to stdout and JSON file output via `--output`.
- CSV output to stdout (`--format csv`) and CSV file output via `--output`.
- Error on unsupported `--format` values (exit code 1, stderr contains valid choices).
- Error on invalid expression or invalid range (exit code 1, stderr contains `Error: Invalid expression` or `Error: Invalid range`).
- Help (`--help`) and version (`--version`) flags exit code 0 and display expected output.