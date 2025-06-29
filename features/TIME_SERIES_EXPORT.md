# Overview

Enhance the existing time series generation command to support both JSON and CSV export formats via a single, structured CLI entrypoint. Users will generate numeric data series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or to a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression, -e`: A formula in the form y=<expression> or <expression>.
  - `--range, -r`: A numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - `--format, -f`: Output format, `json` (default) or `csv`.
  - `--output, -o`: Path to write the output; if omitted, prints to stdout.
  - `--help, -h`: Display usage information and exit code 0.
  - `--version, -v`: Display the package version and exit code 0.

On successful invocation:
- `json` mode produces a pretty-printed array of `{ x: number, y: number }`.
- `csv` mode produces a header `x,y` followed by comma-separated rows for each point.

Validation errors (invalid expression syntax, range format, or unsupported format) exit with code 1 and print `Error: <message>` on stderr.

# Implementation

- Use `yargs` to configure the CLI options and built-in help/version flags.
- Add or update `src/lib/main.js`:
  1. Define `--expression` and `--range` as required options.
  2. Define `--format` with choices `json` and `csv`, defaulting to `json`.
  3. Define `--output` for file path output.
  4. Export a programmatic `main({ expression, range, format, output })` that:
     a. Strips optional `y=` prefix and compiles the expression with `mathjs.compile` (throws on invalid).
     b. Parses and validates the `x=<start>:<end>:<step>` range (throws on invalid).
     c. Generates an inclusive series of `{ x, y }` points.
     d. Serializes to JSON or CSV.
     e. Writes to `output` file or logs to stdout.
  5. In CLI entrypoint, call `main()`, catch exceptions, print errors, and set `process.exit` codes.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:

- Default JSON to stdout and file writing via `--output`.
- CSV to stdout and file writing via `--format csv` and `--output`.
- Unsupported format values exit code 1 and stderr includes `Choices:`.
- Invalid expression or range throw errors and exit code 1 with descriptive message.
- `--help` and `--version` exit code 0 and display expected usage or version text.
