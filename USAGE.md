# Usage

## TIME SERIES Generation

The `repository0-plot-code-lib` CLI generates time series data from mathematical expressions.

### Required Flags

- `--expression <string>`: Mathematical expression in terms of `x` (e.g., `sin(x)`).
- `--range <start:end[:step]>`: Range of `x` values. If `step` is omitted, defaults to evenly spaced points.

### Optional Flags

- `--points <number>`: Number of points when `step` is omitted (default: `100`).
- `--format <csv|json>`: Output format (default: `csv`).
- `--output-file <path>`: Write output to a file instead of stdout.

### Examples

Generate 5 CSV points for `y = x * 2` from 0 to 10:
```bash
repository0-plot-code-lib --expression "x*2" --range "0:10" --points 5
```

Generate JSON data with step 0.5 from -1 to 1 and write to `data.json`:
```bash
repository0-plot-code-lib --expression "sin(x)" --range "-1:1:0.5" --format json --output-file data.json
```

### Error Cases

Missing required flags will result in an error:
```bash
repository0-plot-code-lib
# Error: Missing required flag --expression
```
