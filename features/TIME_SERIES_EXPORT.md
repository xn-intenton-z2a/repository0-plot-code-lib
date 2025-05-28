# Overview

Enhance the existing time series generation command to support both JSON and CSV export formats via the same CLI entrypoint, with clear help and version flags. Users can generate numeric series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression, -e`: Formula in the form y=<expression> or <expression>
  - `--range, -r`: Numeric range in the form x=<start>:<end>:<step>
- Optional flags:
  - `--format, -f`: Output format, `json` (default) or `csv`
  - `--output, -o`: File path to write the output; prints to stdout if omitted
  - `--help, -h`: Show usage information and exit code 0
  - `--version, -v`: Show package version and exit code 0

Output details:
- **JSON**: Pretty-printed array of `{ x, y }`
- **CSV**: Header `x,y` plus comma-separated data rows

Validation errors (invalid expression, range, or format) exit with code 1 and print `Error: <message>` to stderr.

# Implementation

- Add dependencies in `package.json`: `yargs` for CLI parsing and `mathjs` for expression evaluation.
- In `src/lib/main.js` configure yargs with required options (`expression`, `range`), optional (`format`, `output`), and built-in `.help()` and `.version()`.
- Export a programmatic function `main({ expression, range, format, output })` that:
  1. Strips optional `y=` prefix and compiles the expression via `mathjs.compile` (throws on invalid).
  2. Parses and validates the range string (`step > 0`, `start <= end`).
  3. Generates an inclusive series of `{ x, y }` points.
  4. Serializes to JSON or CSV and writes to the specified file or stdout.
- CLI entrypoint calls `main()`, handles exceptions by printing `Error: <message>` and sets `process.exit(0|1)` accordingly.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:
- Default JSON stdout and JSON file output via `--output`
- CSV stdout (`--format csv`) and CSV file output via `--output`
- Error on unsupported `--format` values (exit 1, yargs choices message)
- Error on invalid expression or range (exit 1, descriptive message)
- Help (`--help`/`-h`) and version (`--version`/`-v`) flags exit 0 and display expected text.