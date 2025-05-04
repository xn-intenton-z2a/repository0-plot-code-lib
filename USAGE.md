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

## Plot Generation

The `plot` subcommand generates line chart plots from mathematical expressions.

### Required Flags

- `--expression <string>`: Mathematical expression in terms of `x`.
- `--range <start:end[:step]>`: Range of `x` values.

### Plot Options

- `--points <number>`: Number of data points (default: `100`).
- `--plot-format <svg|png>`: Output format (default: `svg`).
- `--width <number>`: Plot width in pixels (default: `800`).
- `--height <number>`: Plot height in pixels (default: `600`).
- `--title <string>`: Optional chart title.
- `--output-file <path>`: File path to write the output (required for PNG).

### Examples

Generate an SVG plot of `y = sin(x)` from 0 to 2π:
```bash
repository0-plot-code-lib plot --expression "sin(x)" --range "0:6.28" --plot-format svg --width 400 --height 200 --title "Sine Wave"
```

Generate a PNG plot of `y = x` from 0 to 10:
```bash
repository0-plot-code-lib plot --expression "x" --range "0:10" --plot-format png --width 500 --height 300 --output-file out.png
```