# Overview

Extend the existing time series generation command to support both JSON and CSV export formats via a single, structured CLI entrypoint. Users will generate numeric data series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression, -e`: Formula in the form `y=<expression>` or `<expression>`.
  - `--range, -r`: Numeric range in the form `x=<start>:<end>:<step>`.
- Optional flags:
  - `--format, -f`: Output format, `json` (default) or `csv`.
  - `--output, -o`: Path to write the output; if omitted, prints to stdout.
  - `--help, -h`: Display usage information and exit code 0.
  - `--version, -v`: Display the package version and exit code 0.

On success:
- JSON mode: Pretty-printed array of `{ x: number, y: number }`.
- CSV mode: Header `x,y` followed by comma-separated rows for each point.

Validation errors:
- Invalid expression, range format, or unsupported format exit code 1 and print `Error: <message>` to stderr.

# Implementation

- Add dependencies in `package.json`: `yargs` for CLI parsing and `mathjs` for expression parsing.
- In `src/lib/main.js`:
  1. Use yargs to configure the default command with required flags (`expression`, `range`), optional flags (`format`, `output`), and built-in `.help()` and `.version()`.
  2. Export a programmatic function `main({ expression, range, format, output })` that:
     - Strips optional `y=` prefix and compiles the expression via `mathjs.compile` (throws on invalid).
     - Parses and validates the range string (`x=<start>:<end>:<step>`, enforce `step > 0` and `start ≤ end`).
     - Generates an inclusive series of `{ x, y }` points.
     - Serializes the series to JSON with `JSON.stringify(series, null, 2)` or builds CSV with header `x,y` and data rows.
     - Writes to the specified file with `fs.writeFileSync` or prints to stdout.
  3. The CLI entrypoint calls `main()`, catches exceptions to stderr, and uses `process.exit(0|1)` for success or failure.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:
- Default JSON output to stdout and JSON file output via `--output`.
- CSV output to stdout (`--format csv`) and CSV file output via `--output`.
- Error on unsupported `--format` values (exit code 1, stderr includes valid choices).
- Error on invalid expression or range (exit code 1, stderr includes `Error:`).
- Help (`--help`/`-h`) and version (`--version`/`-v`) flags exit code 0 and display expected text.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document the `--format` option and examples for JSON and CSV modes, and help/version usage.
- Update `README.md` under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version commands.