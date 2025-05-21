# Usage

## Time Series Generation

The CLI tool can generate a JSON time series of points from a mathematical expression over a specified range.

### Examples

- Generate a sine wave series and write to file:

  ```bash
  repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.283" --file output.json
  ```

- Generate an x squared series with custom steps:

  ```bash
  repository0-plot-code-lib -e "x^2" -r "x=0:2:3"
  ```

- Output to stdout (default):

  ```bash
  repository0-plot-code-lib -e "sin(x)" -r "x=0:3"
  ```