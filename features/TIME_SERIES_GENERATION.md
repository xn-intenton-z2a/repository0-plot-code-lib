# Overview

Enhance the existing time series generation command to provide a structured, discoverable CLI with yargs, robust expression parsing, and support for both JSON and CSV output formats. Users can generate a single series or multiple labeled series with clear usage and error messages.

# Behavior

- The CLI accepts one or more `--expression` (`-e`) flags, each in the form `y=<formula>` (e.g., `y=sin(x)`).
- The CLI accepts matching `--range` (`-r`) flags, each in the form `x=<start>:<end>:<step>` (e.g., `x=0:6.28:0.1`). The count of expressions must equal the count of ranges.
- A new `--format` (`-f`) flag supports `json` (default) or `csv` output:
  - JSON: outputs an array of objects with keys `label` and `data`, where `data` is an array of `{ x: number, y: number }`.
  - CSV: outputs rows with header `label,x,y` and one line per data point per series.
- An optional `--label` (`-l`) flag lets users assign labels to each series; if omitted, the raw expression is used as its label.
- The `--output` (`-o`) flag writes to a file; if omitted, output is printed to stdout.
- Global flags `--help` (`-h`) and `--version` (`-v`) display usage information and package version, exiting with code 0.
- All validation errors (mismatched counts, invalid syntax, file I/O failures) exit with a non-zero code and an informative message on stderr.

# Implementation

- Add `yargs` as a dependency and configure commands:
  - Default command for time series generation.
  - Global help and version flags via `.help()` and `.version()`.
- Configure repeatable options: `expression`, `range`, and optional `label` as arrays.
- Parse each expression-range pair:
  1. Strip the `y=` prefix and compile the formula with `mathjs` or `evaluate`.
  2. Parse and validate the range string into numeric `start`, `end`, and `step`.
  3. Generate series points from `start` to `end` inclusive, stepping by `step`.
- After generating series:
  - If `format=json`, build an array of `{ label, data }` and serialize with `JSON.stringify(..., 2)`.
  - If `format=csv`, construct a string starting with `label,x,y` header and one comma-separated line per point.
- Write output to file or stdout using `fs.writeFileSync` or `console.log`.

# Tests

- Unit tests (Vitest) in `tests/unit/series-generation.test.js`:
  - Verify single and multiple expression-range pairs produce correct JSON and CSV outputs.
  - Test custom labels: JSON objects contain correct labels; CSV lines contain label column.
  - Validate error conditions:
    - Mismatched counts of expressions, ranges, and labels.
    - Invalid expression syntax or range format.
    - File write errors when invalid `--output` path is provided.
  - Test help and version flags by spawning the CLI with `--help` and `--version`, asserting exit code 0 and expected output.

# Documentation

- Update `USAGE.md` under “Time Series Generation”:
  - Document the `expression`, `range`, `label`, `format`, and `output` flags.
  - Provide examples for JSON and CSV, single and multiple series:
    ```sh
    repository0-plot-code-lib -e "y=x" -r "x=0:2:1" -f csv
    repository0-plot-code-lib -e "y=sin(x)" -e "y=cos(x)" \
      -r "x=0:3.14:1.57" -r "x=0:3.14:1.57" \
      -l "Sine" -l "Cosine" -f json -o output.json
    ```
- Update `README.md` under `## Time Series Generation` with a summary, usage snippets, and note on help/version flags.
