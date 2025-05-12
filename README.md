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
- `--range \"<axis>=<min>:<max>\"`: Numeric range for the axis (e.g., `x=0:10`).
- `--format <svg|png>`: Output image format (`svg` or `png`).
- `--output <path>`: File path to write the plot.
- `--derivative <true|false>`: Overlay the first derivative curve alongside the original plot.
- `--trendline-stats <true|false>`: Compute and print regression statistics (slope, intercept, r2) without generating a plot.
- `--overlay-trendline <true|false>`: Overlay a regression trendline on the plot.
- `--export-data <path>`: Export the raw x,y data to a file (CSV, JSON, YAML).
- `--export-format <csv|json|yaml>`: Override the export format when the file extension is missing or ambiguous.
- `--serve <port>`: Start an HTTP server on the specified port exposing the `/plot` endpoint.
- `--mission`: Show the project mission statement.
- `examples`: Run the automated examples subcommand to print Markdown-formatted usage examples.

For advanced styling options (title, labels, grid, colors, etc.), see the [Usage guide](USAGE.md).

## HTTP Server Mode

Use the `--serve <port>` flag to start an HTTP server on the specified port:

```sh
repository0-plot-code-lib --serve 3000
```

Once running, the server exposes the following endpoints:

### GET `/plot`

- **Query parameters** (all in backticks):
  - `expression` (required): Function expression in `x`, e.g., `y=sin(x)`.
  - `range` (required): `axis=min:max` format, e.g., `x=0:6.28`.
  - `format` (required): `svg` or `png`.
  - Optional: `width`, `height`, `samples`, `xLog`, `yLog`, `grid`, `title`, `xLabel`, `yLabel`, `derivative`, `palette`, `colors`, `trendlineStats`, `overlayTrendline`.

The response content type is:
- `image/svg+xml` for SVG when `format=svg` (binary or UTF-8 text).
- `image/png` for PNG when `format=png`.

#### Base64 Encoding

- Add `encoding=base64` to the query string to receive a JSON response instead of raw image bytes.
- When used, the endpoint returns `application/json` with the structure:
  ```json
  {
    "data": "<base64string>",
    "type": "svg" | "png"
  }
  ```

Sample request using `curl`:
```sh
curl "http://localhost:3000/plot?expression=y%3Dx&range=x%3D0:5&format=svg&encoding=base64"
```
Sample JSON response:
```json
{
  "data": "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIC8+",
  "type": "svg"
}
```

### CORS Support

CORS is enabled by default. All responses include the header:
```
Access-Control-Allow-Origin: *
```

To restrict allowed origins, use:
- The `--cors-origins` CLI flag with a comma-separated list of origins.
- The `CORS_ORIGINS` environment variable.

Example using `fetch` in the browser:
```js
fetch('http://localhost:3000/plot?expression=y=x&range=x=0:5&format=svg')
  .then(res => {
    console.log(res.headers.get('Access-Control-Allow-Origin')); // '*'
    return res.text();
  })
  .then(svg => console.log(svg));
```

#### Stats Endpoint (`/stats`)

Compute and return summary statistics for a data series.

- **GET** `/stats`
- **Query parameters** (all in backticks):
  - Required: `expression` **or** `dataFile` (path to JSON/YAML/CSV data file).
  - Required when using `expression`: `range` in `axis=min:max` format.
  - Optional: `samples` (default `100`), `json` (`true`|`false`, default `true`).

The response format depends on `json`:
- `json=false`: `text/plain`, each statistic on its own line:
  ```text
  min: 0.00
  max: 5.00
  mean: 2.50
  median: 2.50
  stddev: 1.87
  ```
- `json=true` (default): `application/json`:
  ```json
  {
    "min": 0,
    "max": 5,
    "mean": 2.5,
    "median": 2.5,
    "stddev": 1.87
  }
  ```

Sample `curl` for plain-text stats:
```sh
curl "http://localhost:3000/stats?expression=y%3Dx&range=x%3D0:5&json=false"
```

Sample `curl` for JSON stats:
```sh
curl "http://localhost:3000/stats?expression=y%3Dx&range=x%3D0:5"
```

## CLI --mission Example

Print the project mission statement:
```sh
repository0-plot-code-lib --mission
```

## Examples

Generate an SVG:
```sh
repository0-plot-code-lib --expression "y=sin(x)+0.5*x" --range "x=0:10" --format svg --output plot.svg
```

Generate a PNG:
```sh
repository0-plot-code-lib --expression "y=x" --range "x=0:5" --format png --output plot.png
```

## Further Reading

For advanced flags, HTTP server details, styling options, and programmatic API, see the [Usage guide](USAGE.md).

## License

MIT
