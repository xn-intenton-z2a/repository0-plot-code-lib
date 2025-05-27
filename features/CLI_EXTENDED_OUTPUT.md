# Overview

Enhance the CLI to support flexible output formats (JSON or CSV) and structured parsing with help/version flags using yargs. Users can generate time series data, choose output format, and access built-in usage information without manual argument handling.

# Behavior

- The CLI accepts:
  - `--expression, -e` (string, required): formula in form `y=<expr>`.
  - `--range, -r` (string, required): range syntax `x=<start>:<end>:<step>`.
  - `--format, -f` (string, optional): `json` (default) or `csv`.
  - `--output, -o` (string, optional): path to write output; defaults to stdout.
  - Global `--help, -h`: show usage and exit code 0.
  - Global `--version, -v`: show package version and exit code 0.

- Validation:
  - Enforce expressions start with `y=` and valid math syntax.
  - Enforce range format and numeric start ≤ end, step > 0.
  - On errors, exit code 1 with descriptive stderr message.

- Output:
  - JSON: array of `{ x, y }`, pretty-printed.
  - CSV: header `x,y` then lines `x,y` per point.

# Implementation

- Add `yargs` dependency and configure default command:
  - Define required options `expression`, `range`, optional `format` and `output`.
  - Enable `.help()` and `.version()`.
- In handler:
  1. Strip `y=` and parse expression via `mathjs` or `evaluate`.
  2. Parse range string into `start`, `end`, `step`.
  3. Loop to generate series with floating-point tolerance.
  4. Serialize series as JSON or CSV string.
  5. Write to `--output` file or stdout.
- Exit code 0 on success.

# Tests

- Add unit tests in `tests/unit/series-output.test.js`:
  - Verify JSON output structure, contents, file writing.
  - Verify CSV header, lines, file writing.
  - Test help/version flags via `spawnSync`, assert exit code 0 and expected output.
  - Test error conditions for invalid expression/range.

# Documentation

- Update `USAGE.md`:
  - Document `--format` and output examples for JSON and CSV.
  - Show help/version usage.
- Update `README.md`:
  - Under `## Time Series Generation`, add brief usage snippets for format and help flags.