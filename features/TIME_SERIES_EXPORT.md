# Overview
Extend the core time series generation CLI so users can export results in JSON or CSV formats from a single command.

# Behavior

When invoked via the CLI:

- Required flags:
  - --expression, -e : Formula in the form y=<expression> or <expression>
  - --range, -r      : Range in the form x=<start>:<end>:<step>
- Optional flags:
  - --format, -f     : Output format, json (default) or csv
  - --output, -o     : File path to write results; prints to stdout if omitted
  - --help, -h       : Display usage information and exit code 0
  - --version, -v    : Display the package version and exit code 0

Validation errors (invalid expression, range format, or format) exit with code 1 and print `Error: <message>` to stderr. On success, exit code 0.

# Implementation

- Configure yargs in `src/lib/main.js` with options:
  - `--expression`, `--range` (required)
  - `--format`, `--output`, built-in `.help()` and `.version()` flags
- Export a programmatic `main({ expression, range, format, output })` function that:
  1. Strips optional `y=` prefix and compiles the expression via mathjs
  2. Parses and validates the range string; enforces `step > 0` and `start <= end`
  3. Generates an inclusive series of `{ x, y }` points
  4. Serializes data:
     - JSON: `JSON.stringify(series, null, 2)`
     - CSV: header `x,y` plus comma-separated rows
  5. Writes output to the specified file or stdout
- In CLI mode, invoke `main()`, catch errors, print to stderr and set `process.exit` codes accordingly.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:
- Default JSON stdout and JSON file output via `--output`
- CSV stdout (`--format csv`) and CSV file output via `--output`
- Error on unsupported format values (exit 1, stderr includes "Choices" or "Unsupported format")
- Error on invalid expression or range syntax (exit 1, stderr includes `Error:`)
- Help and version flags exit code 0 and show expected usage or version
