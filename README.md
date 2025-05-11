# repository0-plot-code-lib

Be a go-to plot library with a CLI, be the jq of formulae visualisations.

## Project Overview

repository0-plot-code-lib is a JavaScript library and command-line tool designed to transform mathematical expressions and value ranges into time series data for visualization. Guided by our mission to be the go-to plot library CLI, it provides robust argument parsing, range validation, and time series generation out of the box.

## Installation

Install globally via npm:

```bash
npm install -g @xn-intenton-z2a/repository0-plot-code-lib
```

This installs the `repository0-plot-code-lib` binary.

## Usage

```bash
repository0-plot-code-lib --expression "<expr>" --range "<axis=min:max[,axis2=min:max]>" [--points <number>] [--format json|csv] [--output <file>]
```

Flags:

- `--expression <expr>`: (Required) Defines the mathematical expression to evaluate, e.g., `y=sin(x)`.
- `--range <spec>`: (Required) Specifies axis ranges in the format `axis=min:max`. Multiple axes separated by commas, e.g., `x=0:6.28,y=-1:1`.
- `--points <number>`: (Optional) Number of data points per axis. Must be a positive integer. Default: `1000`.
- `--format json|csv`: (Optional) Output data format. Allowed values: `json`, `csv`. Default: `json`.
- `--output <file>`: (Optional) File to save output. Defaults to stdout if omitted.

## Examples

Generate default JSON output (1000 points) to stdout:

```bash
repository0-plot-code-lib --expression "y=sin(x)" --range "x=0:3.14"
# Expect: JSON array printed to stdout of 1000 points.
```

Generate CSV output, 500 points, and save to `data.csv`:

```bash
repository0-plot-code-lib --expression "y=cos(x)" --range "x=0:6.28" --points 500 --format csv --output data.csv
# Expect: File `data.csv` containing 500 lines of x,y values.
```

## Features

- **Argument Parsing**: Robust CLI parsing and validation ([Usage Guide](USAGE.md), [Argument Parsing Feature](features/ARGUMENT_PARSING.md))
- **Range Validation**: Enforces axis range syntax and value checks.
- **Time Series Generation**: Produces arrays of data points from mathematical expressions ([Time Series Generation Feature](features/TIME_SERIES_GENERATION.md)).
- **Programmatic API**: Import core functions (`generateSeries`, `serializeJson`, `serializeCsv`) for direct use in JavaScript code.

## Programmatic Usage

You can use this library in your JavaScript projects by importing the core functions:

```js
import { generateSeries, serializeJson, serializeCsv } from "repository0-plot-code-lib";

// Generate a small series of three points for y = x * 2 over [0,1]
const series = generateSeries("y=x*2", { x: [0, 1] }, 3);

// Output JSON
console.log(serializeJson(series));

// Or output CSV
console.log(serializeCsv(series));
```

## License

MIT
