# Usage

This tool generates plots based on mathematical expressions over a numeric range.

## Flags

--help: Show this help message and usage examples.

--version: Show the installed CLI version.

--mission: Show the project mission statement.

--serve <port>: Start an HTTP server exposing the `/plot` endpoint.

## CLI Examples

Generate an SVG plot:
```sh
repository0-plot-code-lib --expression "y=sin(x)+0.5*x" --range "x=0:10" --format svg --output plot.svg
```

Generate a PNG plot:
```sh
repository0-plot-code-lib --expression "y=x" --range "x=0:5" --format png --output plot.png
```

Plot original and derivative curves (SVG):
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

Show version:
```sh
repository0-plot-code-lib --version
```

Show mission:
```sh
repository0-plot-code-lib --mission
```

Use `--help` to display this message and examples.

## HTTP Server Mode

Use the `--serve <port>` flag to start an HTTP server exposing a `/plot` endpoint:

```sh
repository0-plot-code-lib --serve 3000
```

Request plots via `curl`:

```sh
curl "http://localhost:3000/plot?expression=y%3Dx&range=x%3D0:6.28&format=svg"
curl "http://localhost:3000/plot?expression=y=x&range=x=0:5&format=png" --output plot.png
```

## /stats Endpoint

Compute summary statistics for a data series derived from an expression or imported data file.

**GET** `/stats`

**Query parameters**:
- `expression` (required unless `dataFile` provided): Function expression in `y=…` form.
- `range` (required with `expression`): Axis range in `axis=min:max` format.
- `dataFile` (required unless `expression` provided): Path to a JSON, CSV, or YAML file containing `[{x,y}, …]`.
- `samples` (optional): Number of sample points for expression mode (default `100`).
- `json` (optional): `true|false` (default `true`).

**Response formats**:
- JSON (`application/json`) when `json=true`:
  ```json
  {
    "min": 0,
    "max": 5,
    "mean": 2.5,
    "median": 2.5,
    "stddev": 1.87
  }
  ```
- Plain text (`text/plain`) when `json=false`:
  ```text
  min: 0.00
  max: 5.00
  mean: 2.50
  median: 2.50
  stddev: 1.87
  ```

**Examples**:
```sh
curl "http://localhost:3000/stats?expression=y%3Dx&range=x%3D0:5&json=false"
```
```sh
curl "http://localhost:3000/stats?dataFile=data.json&json=true"
```
