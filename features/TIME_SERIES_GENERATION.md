# Overview

Enhance the existing time series generation command to support output in both JSON and CSV formats, allowing users to export data in a widely supported tabular format.

# Behavior

- The CLI accepts a new flag `--format` or `-f` with values `json` or `csv`. Default is `json` to preserve existing behavior.
- When `--format csv` is used, the output is written as comma-separated lines. The first line is a header `x,y`, followed by one line per data point.
- The existing flags remain:
  - `--expression, -e` for the mathematical formula in terms of x (e.g. `y=sin(x)`).
  - `--range, -r` for the numeric range in `x=<start>:<end>:<step>` syntax.
  - `--output, -o` to specify output file path. When omitted, data is printed to stdout.
- Invalid format values or file write errors terminate with a non-zero exit code and an error message on stderr.

# Implementation

- Add `format` option to yargs configuration alongside expression and range.
- In the handler, after generating the series array:
  - If format is `json`, serialize using `JSON.stringify(series, null, 2)`.
  - If format is `csv`, build a string:
    1. Start with header `x,y`.
    2. For each point `{x,y}`, append a line `${x},${y}`.
- Write the result to stdout or the specified output file.
- Update tests to cover both formats and file writing behavior.

# Tests

- Add unit tests for CSV output:
  - Verify header line appears.
  - Validate correct comma separation for integer and fractional values.
  - Confirm file creation when `--output` is provided.
- Ensure JSON tests still pass.

# Documentation

- Update `USAGE.md` and `README.md` under "Time Series Generation" to:
  - Document the new `--format, -f` option.
  - Provide examples:
    - `repository0-plot-code-lib -e "y=x" -r "x=0:2:1" -f csv`
    - `repository0-plot-code-lib -e "sin(x)" -r "x=0:6.28:3.14" -f csv -o series.csv`