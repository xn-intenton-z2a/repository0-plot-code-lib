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
