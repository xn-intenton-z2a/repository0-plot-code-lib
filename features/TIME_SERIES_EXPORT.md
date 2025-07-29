# Overview

Extend the existing time series generation CLI so users can export results in both JSON and CSV formats from a single, structured entrypoint. This feature enhances data interoperability by providing tabular output directly.

# Behavior

When invoked via the CLI:

- Required flags:
  • --expression, -e (string): Formula in the form y=<expression> or <expression>.
  • --range, -r (string): Numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  • --format, -f (string): Output format, json (default) or csv.
  • --output, -o (string): File path to write the output; prints to stdout if omitted.
  • --help, -h: Display usage information and exit with code 0.
  • --version, -v: Display package version and exit with code 0.

Output:
- **JSON** mode: Pretty-printed array of { x: number, y: number }.
- **CSV** mode: Header `x,y` followed by comma-separated rows for each data point.

On success, writes to the specified file or stdout and exits with code 0. Validation errors (invalid expression, range format, unsupported format, I/O failures) exit with code 1 and print a descriptive `Error: <message>` on stderr.

# Implementation

- Add `--format` (`-f`) choice in yargs configuration alongside `--expression` and `--range` flags.
- In the default command handler:
  1. Strip optional `y=` prefix and compile the expression using mathjs; on compile failure, throw `Invalid expression`.
  2. Parse `x=<start>:<end>:<step>` range, enforce numeric values, `step > 0`, and `start <= end`; on failure, throw `Invalid range`.
  3. Generate an inclusive series of points from start to end by step.
  4. After series generation:
     - If `format=json`, serialize with `JSON.stringify(series, null, 2)`.
     - If `format=csv`, build a string starting with `x,y` header and lines `${x},${y}` per point.
  5. Write to the file specified by `--output` via `fs.writeFileSync`, or `console.log` the output when `--output` is omitted.
  6. Use `process.exit(0)` on success and `process.exit(1)` on any error after printing `Error: <message>`.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:

- JSON stdout: verify default behavior for simple expressions and ranges, exit code 0, correct JSON structure.
- JSON file: verify output file is created with correct JSON content when `--output` is provided.
- CSV stdout: verify header `x,y` and data lines match series when `--format csv` is used.
- CSV file: verify file content for CSV output when `--format csv --output` is provided.
- Unsupported format: verify exit code 1 and stderr mentions valid choices or `Unsupported format`.
- Invalid expression: exit code 1 and stderr contains `Invalid expression`.
- Invalid range: exit code 1 and stderr contains `Invalid range`.
- Help/version flags: verify `--help` and `--version` exit code 0 and print usage or version text.