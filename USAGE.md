# Usage

## Generating Time Series Data

Use the CLI to generate a JSON array of time series data points.

```
repository0-plot-code-lib --expression "y=sin(x)" --range 0:6.283 --points 50
```

This outputs something like:

```json
[
  { "x": 0, "y": 0 },
  { "x": 0.1279, "y": 0.1277 },
  ...
  { "x": 6.283, "y": 0 }
]
```

Parameters:

- `--expression` (required): A mathematical expression in terms of `x`, e.g., `y=sin(x)`.
- `--range` (required): A numeric range as `start:end`, with `start < end`.
- `--points` (optional): Number of samples to generate (integer ≥ 2). Defaults to 100.

## Help and Default Invocation

Display usage information and exit with code 0:

```
repository0-plot-code-lib
repository0-plot-code-lib --help
```

Outputs:

```
Usage:
  node src/lib/main.js --expression <expr> --range <start:end> [--points <n>] [--format <svg|png>] [--output <file>]

Options:
  --expression   A mathematical expression in terms of x (e.g., y=sin(x)). Required for data generation.
  --range        A numeric range as start:end, with start < end. Required for data generation.
  --points       Number of samples to generate (integer ≥ 2). Defaults to 100.
  --format       Output format: svg or png. Defaults to svg.
  --output       Output file path. If omitted, writes to stdout.
  --help, -h     Display this help message.
```

## Generating Plots

Use the `--format` and `--output` flags to render plots:

```
repository0-plot-code-lib --expression "y=sin(x)" --range 0:6.28 --format svg --output plot.svg
```

```
repository0-plot-code-lib --expression "y=cos(x)" --range 0:6.28 --format png --output plot.png
```

If `--output` is omitted, the plot is written to standard output.
