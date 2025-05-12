# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

## Overview

**repository0-plot-code-lib** is a JavaScript library and CLI tool that transforms mathematical expressions into time series data and generates SVG or PNG plots. It provides a simple and flexible interface for visualizing functions and data series directly from the command line.

## Installation

Install via npm:

```sh
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

## CLI Usage

The core CLI flags:

- `--expression <expression>`: Mathematical expression in terms of `x` (e.g., `y=sin(x)+0.5*x`).
- `--range "<axis>=<min>:<max>"`: Numeric range for the axis (e.g., `x=0:10`).
- `--format <svg|png>`: Output image format (`svg` or `png`).
- `--output <path>`: File path to write the plot.
- `--derivative <true|false>`: Overlay the first derivative curve alongside the original plot.
- `--trendline-stats <true|false>`: Compute and print regression statistics (slope, intercept, r2) without generating a plot.
- `--overlay-trendline <true|false>`: Overlay a regression trendline on the plot.
- `--export-data <path>`: Export the raw x,y data to a file (CSV, JSON, YAML).
- `--export-format <csv|json|yaml>`: Override the export format when the file extension is missing or ambiguous.
- `--serve <port>`: Start an HTTP server on the specified port exposing the `/plot` endpoint.
- `examples`: Run the automated examples subcommand to print Markdown-formatted usage examples.

For advanced styling options (title, labels, grid, colors, etc.), see the [Usage guide](USAGE.md).

## Examples

Generate an SVG:

```sh
repository0-plot-code-lib --expression "y=sin(x)+0.5*x" --range "x=0:10" --format svg --output plot.svg
```

Generate a PNG:

```sh
repository0-plot-code-lib --expression "y=x" --range "x=0:5" --format png --output plot.png
```

Plot original and derivative:

```sh
repository0-plot-code-lib --expression "y=x^2" --range "x=0:5" --format svg --output plot.svg --derivative true
```

Compute regression stats only:

```sh
repository0-plot-code-lib --expression "y=2*x+1" --range "x=0:2" --trendline-stats true
```

Overlay trendline on plot:

```sh
repository0-plot-code-lib --expression "y=x" --range "x=0:5" --format svg --output plot.svg --overlay-trendline true
```

Export raw data to CSV:

```sh
repository0-plot-code-lib --expression "y=x" --range "x=0:5" --export-data data.csv
```

Export raw data to JSON:

```sh
repository0-plot-code-lib --expression "y=x" --range "x=0:5" --export-data output --export-format json
```

Start HTTP server and fetch plots:

```sh
repository0-plot-code-lib --serve 3000

# In another terminal or via curl:
curl "http://localhost:3000/plot?expression=y=sin(x)&range=x=0:6.28&format=svg"
curl "http://localhost:3000/plot?expression=y=x&range=x=0:5&format=png" --output plot.png
```

## Further Reading

For advanced flags, HTTP server details, and styling options, see the [Usage guide](USAGE.md).

## License

MIT
