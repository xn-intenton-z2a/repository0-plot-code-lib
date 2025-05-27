# Overview

Enhance the core time series generation command to support flexible output formats and a structured CLI interface. Users will be able to generate a numeric series from one mathematical expression and range, choose JSON or CSV output, and access built-in help and version flags.

# Behavior

- Parses a single `--expression` (`-e`) in the form `y=<formula>` (for example, `y=sin(x)`).
- Parses a single `--range` (`-r`) in the form `x=<start>:<end>:<step>` (for example, `x=0:6.28:0.1`).
- Adds a `--format` (`-f`) flag that accepts `json` (default) or `csv`:
  - In JSON mode, outputs an array of `{ x: number, y: number }`.
  - In CSV mode, outputs a header row `x,y` followed by comma-separated data lines.
- Adds global `--help` (`-h`) to display usage and `--version` (`-v`) to display the package version.
- The `--output` (`-o`) flag writes output to a file; if omitted, writes to stdout.
- Validation errors (invalid expression, range format, write failures) exit with code 1 and print a descriptive message to stderr.

# Implementation

- Use `yargs` to configure the default command:
  - `.option('expression', ...)` with alias `-e`, string, required.
  - `.option('range', ...)` with alias `-r`, string, required.
  - `.option('format', ...)` with alias `-f`, choices `json` or `csv`, default `json`.
  - `.option('output', ...)` with alias `-o`, string, optional.
  - `.help()` and `.version()` for built-in flags.
- In the handler:
  1. Strip the `y=` prefix and compile the formula with a parsing library (for example `mathjs`).
  2. Parse the range string into numeric start, end, and step; enforce `step > 0` and `start <= end`.
  3. Generate the series points by stepping from start to end inclusive.
  4. Serialize the series:
     - For JSON mode, use `JSON.stringify(series, null, 2)`.
     - For CSV mode, build a string with a header `x,y` and one line per point.
  5. Write to the specified file with `fs.writeFileSync` or print to stdout.
- Exit code 0 on success.

# CLI Interface

    repository0-plot-code-lib -e "y=x*2" -r "x=0:5:1"
    repository0-plot-code-lib --expression "y=sin(x)" --range "x=0:3.14:1.57" --format csv --output series.csv

# Tests

- Unit tests to verify JSON output:
  - Default format produces correct array of objects.
  - File writing via `--output` writes valid JSON.
- Unit tests to verify CSV output:
  - Header `x,y` is present.
  - Correct comma-separated numeric values for integer and fractional ranges.
  - File writing via `--output` writes valid CSV.
- Tests for error conditions:
  - Invalid expression or range syntax yields exit code 1 and error message.
  - Invalid write path yields error.
- Tests for help and version flags by spawning the CLI and checking exit code 0 and expected output patterns.

# Documentation

- Update `USAGE.md` under “Time Series Generation” to:
  - Document `--format` flag with examples for JSON and CSV.
  - Show usage of `--help` and `--version`.
- Update `README.md` under `## Time Series Generation` to include brief usage snippets and note on output formats.