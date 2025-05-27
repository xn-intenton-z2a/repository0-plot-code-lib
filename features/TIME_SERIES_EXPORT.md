# Overview

Enhance the existing time series generation command to support both JSON and CSV export formats, accessible via the same CLI entrypoint. Users can choose their preferred output format without introducing new subcommands, providing immediate flexibility for data consumption.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression`, `-e` : A formula in the form `y=<expression>` or `<expression>`.
  - `--range`, `-r`      : A numeric range string in the form `x=<start>:<end>:<step>` (e.g. `x=0:2:0.5`).
- Optional flags:
  - `--format`, `-f`     : Output format, either `json` (default) or `csv`.
  - `--output`, `-o`     : Path to write the output; if omitted, prints to stdout.
  - `--help`, `-h`       : Display usage information from yargs and exit code 0.
  - `--version`, `-v`    : Display the package version and exit code 0.

Output details:
- JSON mode: Pretty-printed array of objects `{ x: number, y: number }`.
- CSV mode: First line header `x,y` followed by comma-separated rows for each point.

Validation:
- Expression must compile via mathjs; failures exit code 1 with `Error: Invalid expression`.
- Range must begin with `x=` and split into three numeric parts; enforce `step > 0` and `start <= end` or exit code 1 with `Error: Invalid range`.
- Unsupported formats exit code 1 with `Error: Unsupported format`.

# Implementation

- Add dependencies:
  - `yargs` for CLI parsing.
  - `mathjs` for expression parsing and evaluation.
- In `src/lib/main.js`:
  1. Configure yargs for required `--expression` and `--range`, optional `--format` and `--output`, plus `.help()` and `.version()`.
  2. In handler:
     - Strip optional `y=` prefix, compile the expression with mathjs.
     - Parse and validate the range string.
     - Generate the series by stepping from start to end inclusive.
     - Serialize series based on `--format`:
       - JSON: `JSON.stringify(series, null, 2)`.
       - CSV: join lines with header `x,y` and each data row.
     - Write to file or stdout and exit code 0.
- Programmatic API: `export function main(options)` that takes the same flags object and returns the generated data array without exiting, enabling tests.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:

- Default JSON output to stdout and file writing.
- CSV output to stdout and file writing.
- Error on unsupported `--format` values (exit code 1, yargs message).
- Error on invalid expression or range syntax (exit code 1, descriptive error).
- Ensure programmatic `main()` returns data arrays and throws on invalid inputs.

# Documentation

- Update `USAGE.md` under **Time Series Generation**:
  - Document `--format` option and show both JSON and CSV examples.
  - Include `--help` and `--version` usage examples.
- Update `README.md` under `## Time Series Generation` with snippet demonstrating JSON/CSV modes and built-in flags.