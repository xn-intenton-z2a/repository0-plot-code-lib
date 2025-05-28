# Overview

Extend the existing time series generation command to support CSV export in addition to JSON, enabling users to output tabular data directly for spreadsheets and data pipelines.

# Behavior

- Add a new flag `--format` or `-f` with values `json` (default) or `csv`.
- When `--format csv` is specified:
  - Output starts with header `x,y`.
  - Each subsequent line is a comma-separated pair of x and y values.
- Preserve existing flags:
  - `--expression, -e`: formula in form `y=<expr>` or `<expr>`.
  - `--range, -r`: numeric range in form `x=<start>:<end>:<step>`.
  - `--output, -o`: output file path; defaults to stdout.
- Invalid formats or file I/O errors exit with code 1 and descriptive message on stderr.

# Implementation

- Update yargs configuration in `src/lib/main.js` to define the `format` option with choices `json` and `csv`.
- In the time series handler:
  1. After generating the data array, check the `format` flag.
  2. For `csv`, build a string:
     - Start with `x,y` header.
     - Append one line per data point: `<x>,<y>`.
  3. For `json`, continue using `JSON.stringify(series, null, 2)`.
  4. Write the resulting string to stdout or to the file specified by `--output`.
- Add tests in `tests/unit/plot-generation.test.js` to:
  - Verify CSV output on stdout with correct header and lines.
  - Verify CSV output when writing to a file.
  - Confirm format flag default remains `json` and JSON tests still pass.

# Tests

- CSV stdout:
  - Spawn the CLI with `-e y=x -r x=0:2:1 -f csv`.
  - Expect exit code 0 and first line `x,y` followed by `0,0`,`1,1`,`2,2`.
- CSV file:
  - Spawn CLI with `-f csv -o temp.csv`.
  - Read file and assert header and rows.
- Error cases:
  - Invalid format value yields exit code 1 and stderr message.
