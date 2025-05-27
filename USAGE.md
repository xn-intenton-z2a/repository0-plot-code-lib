# Usage Guide for repository0-plot-code-lib

## Time Series Generation

Generate a series of (x, y) data points from a mathematical expression over a numeric range.

### Command

```
repository0-plot-code-lib [options]
```

### Options

- `--expression, -e`  (string, required)
  Formula in the form `y=<expr>` or `<expr>`, e.g. `y=sin(x)` or `sin(x)`.

- `--range, -r`       (string, required)
  Range syntax `x=<start>:<end>:<step>`, e.g. `x=0:3.14:0.1`.

- `--format, -f`      (string, optional)
  Output format: `json` (default) or `csv`.

- `--output, -o`      (string, optional)
  Path to write the output. If omitted, prints to stdout.

- `--help, -h`        (boolean)
  Show help information and exit.

- `--version, -v`     (boolean)
  Show the package version and exit.

### Examples

1. JSON to stdout (default):

   ```bash
   repository0-plot-code-lib -e "y=x" -r "x=0:2:1"
   ```

2. CSV to stdout:

   ```bash
   repository0-plot-code-lib -e "y=x" -r "x=0:2:1" -f csv
   ```

3. Write JSON to file:

   ```bash
   repository0-plot-code-lib -e "2*x+1" -r "x=0:3:1" -o data.json
   ```

4. Write CSV to file:

   ```bash
   repository0-plot-code-lib -e "y=sin(x)" -r "x=0:6.28:3.14" -f csv -o series.csv
   ```

5. Display help or version:

   ```bash
   repository0-plot-code-lib --help
   repository0-plot-code-lib --version
   ```
