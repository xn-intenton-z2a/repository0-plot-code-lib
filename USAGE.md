# Usage

## Generating Time Series Data

Use the CLI to generate a JSON array of time series data points.

```
node src/lib/main.js --expression "y=sin(x)" --range 0:6.283 --points 50
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

- `--expression` (required): A mathematical expression in terms of `x`, for example `y=sin(x)`.
- `--range` (required): A numeric range as `start:end`, with `start < end`.
- `--points` (optional): The number of samples to generate (integer ≥ 2). Defaults to 100 if omitted.

## Help and Default Invocation

When invoked without arguments or with `--help`/`-h`, the CLI prints usage information and exits without an error:

```
node src/lib/main.js

node src/lib/main.js --help
```

Outputs:

```
Usage:
  node src/lib/main.js --expression <expr> --range <start:end> [--points <n>]

Options:
  --expression   A mathematical expression in terms of x (e.g., y=sin(x)). Required.
  --range        A numeric range as start:end, with start < end. Required.
  --points       Number of samples to generate (integer ≥ 2). Defaults to 100.
  --help, -h     Display this help message.
```