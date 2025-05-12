# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

## Overview

**plot-code-lib** is a JavaScript library and CLI tool that transforms mathematical expressions into time series data and generates SVG or PNG plots. It provides a simple and flexible interface for visualizing functions and data series directly from the command line and via HTTP API.

## Installation

Install via npm:

```sh
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

## Usage

The core CLI flags:

- `--expression <expression>`: Mathematical expression in terms of `x` (e.g., `y=sin(x)+0.5*x`).
- `--range "<axis>=<min>:<max>"`: Numeric range for the axis (e.g., `x=0:10`).
- `--format <svg|png>`: Output image format (`svg` or `png`).
- `--output <path>`: File path to write the plot.

### Examples

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

- `examples`: Generate Markdown-formatted examples demonstrating core CLI usage:
```sh
repository0-plot-code-lib examples
```

#### Export Data

Export raw data to CSV:
```sh
repository0-plot-code-lib --expression "y=x" --range "x=0:5" --export-data data.csv
```

Export raw data to JSON explicitly:
```sh
repository0-plot-code-lib --expression "y=x" --range "x=0:5" --export-data output --export-format json
```

## HTTP Server Mode

Use the `--serve <port>` flag to start an HTTP server exposing `/plot` and `/stats` endpoints.

```sh
repository0-plot-code-lib --serve 3000
```

### CORS Support

By default, CORS is enabled on all endpoints. Every response includes the header:
```
Access-Control-Allow-Origin: *
```
To restrict allowed origins, use the `--cors-origins <origins>` flag (comma-separated list) or set the `CORS_ORIGINS` environment variable. For example:
```sh
repository0-plot-code-lib --serve 3000 --cors-origins https://example.com,https://another.com
```
Fetch example:
```js
fetch('http://localhost:3000/plot?expression=y=x&range=x=0:1&format=svg')
  .then(res => {
    console.log(res.headers.get('Access-Control-Allow-Origin')); // '*', or restricted origin
    return res.text();
  })
  .then(svg => console.log(svg));
```

### GET /plot

Generate plots via HTTP. Supports the same query parameters as the CLI:
- `expression`, `range`, `format`, `width`, `height`, `samples`, `xLog`, `yLog`, `grid`, `title`, `xLabel`, `yLabel`, `derivative`, `palette`, `colors`, `trendlineStats`, `overlayTrendline`, etc.

New optional parameter: `encoding=base64`.
- When `encoding=base64` is set, the response is `application/json`:
  ```json
  {
    "data": "<base64string>",
    "type": "svg" // or "png"
  }
  ```

Example:
```sh
curl "http://localhost:3000/plot?expression=y=x&range=x=0:5&format=png&encoding=base64"
```
Sample JSON response:
```json
{
  "data": "iVBORw0KGgoAAAANSUhEUgA...",
  "type": "png"
}
```

### GET /stats

Compute summary statistics for a data series without generating a plot.

Required parameters (one of):
- `expression` and `range` (e.g., `expression=y=sin(x)&range=x=0:10`)
- `dataFile` (path to JSON, YAML, or CSV data file)

Optional:
- `samples` (number of intervals, defaults to 100)
- `json` (`true`|`false`, defaults to `true`)

#### Plain-Text Output (`json=false`)
```sh
curl "http://localhost:3000/stats?expression=y=x^2&range=x=0:2&json=false"
```
Response (`text/plain`):
```
min: 0.00
max: 4.00
mean: 1.33
median: 1.00
stddev: 1.00
```

#### JSON Output (`json=true`)
```sh
curl "http://localhost:3000/stats?dataFile=data.csv&json=true"
```
Response (`application/json`):
```json
{
  "min": 0,
  "max": 5,
  "mean": 2.5,
  "median": 2.5,
  "stddev": 1.87
}
```

## Further Reading

For advanced flags and examples, see the [Usage guide](USAGE.md).

## License

MIT
