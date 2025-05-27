# Overview

Extend the existing CLI command to support both JSON and CSV export formats via a single entrypoint. Users will generate numeric data series from a mathematical expression and a range, choose their preferred output format, and direct the result to stdout or a file.

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

Validation errors exit code 1 with a descriptive `Error: <message>` on stderr.

# Implementation

- Add dependencies:
  - `yargs` for CLI parsing.
  - `mathjs` for expression parsing and evaluation.
- In `src/lib/main.js`:
  1. Configure `yargs` with required options (`expression`, `range`), optional flags (`format`, `output`), and built-in `.help()` and `.version()`.
  2. Export a programmatic function `main({ expression, range, format, output })` that:
     - Strips optional `y=` prefix and compiles the expression via `mathjs.compile`.
     - Parses and validates the range string (`x=<start>:<end>:<step>`, enforce `step>0` and `start<=end`).
     - Generates an inclusive series of `{ x, y }` points.
     - Serializes the series to JSON or CSV based on the `format` flag:
       - JSON: `JSON.stringify(series, null, 2)`.
       - CSV: header `x,y` plus comma-separated data rows.
     - Writes the result to the specified file or stdout using `fs.writeFileSync` or `console.log`.
  3. The CLI entrypoint calls `main()`, catches exceptions, prints errors to stderr, and uses `process.exit` codes for success (0) and failures (1).

# Tests

- Extend `tests/unit/plot-generation.test.js` to cover:
  - Default JSON stdout and file writing via `--output`.
  - CSV stdout (`--format csv`) and file writing via `--output`.
  - Error on unsupported format values, invalid expression, and invalid range.
  - Help and version flag behavior: exit code 0 and expected output.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document the `--format` option and examples for JSON and CSV.
- Update `README.md` under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version commands.