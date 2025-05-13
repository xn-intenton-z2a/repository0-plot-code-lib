# Usage

This tool generates plots based on mathematical expressions over a numeric range and provides `/plot` and `/stats` endpoints for summary statistics.

## Flags

--help: Show this help message and usage examples.

--version: Show the installed CLI version.

--mission: Show the project mission statement.

--serve <port>: Start an HTTP server exposing the `/plot` and `/stats` endpoints.

## CLI Subcommands

### `plot`

Generate a plot image (SVG or PNG) using QuickChart API.

**Flags**:
```
--expression <function>           Mathematical expression in y=… form (e.g., "y=sin(x)")
--range <axis>=<min>:<max>       Axis range for expression mode (e.g., "x=0:10")
--dataFile <path>                JSON, CSV, or YAML data file path
--format <svg|png>               Output image format (default: svg)
--width <number>                 Image width in pixels (default: 500)
--height <number>                Image height in pixels (default: 300)
--samples <number>               Sample count for expression mode (default: 100)
--derivative <true|false>        Overlay first derivative curve
--overlayTrendline <true|false>  Overlay regression trendline
--palette <colors>               Comma-separated CSS colors for series
--encoding <base64>              Base64-encode output and wrap in JSON
--output <path>                  Destination file path (stdout if omitted)
```

**Example**:
```sh
repository0-plot-code-lib plot \
  --expression "y=x" \
  --range "x=0:10" \
  --format svg \
  --width 800 \
  --height 400 \
  --derivative true \
  --overlayTrendline true \
  --palette "red,green,blue" \
  --encoding base64 \
  --output plot.svg
```

### `stats`

Compute summary statistics for an expression or data file.

```sh
repository0-plot-code-lib stats --expression "y=x" --range "x=0:2"
```

Stats subcommand with histogram and trendline (JSON output):
```sh
repository0-plot-code-lib stats \
  --expression "y=x" \
  --range "x=0:10" \
  --histogram true \
  --bins 5 \
  --trendline-stats true
```

Stats subcommand (plain text output):
```sh
repository0-plot-code-lib stats --expression "y=x" --range "x=0:2" --format text
```

Stats subcommand from data file to output file:
```sh
repository0-plot-code-lib stats --dataFile data.json --format json --output stats.json
```

## `/stats` Endpoint

Compute summary statistics for a data series derived from an expression or imported data file.

**GET** `/stats`

**Query parameters**:
- `expression` (required unless `dataFile` provided): Function expression in `y=…` form.
- `range` (required with `expression`): Axis range in `axis=min:max` format.
- `dataFile` (required unless `expression` provided): Path to a JSON, CSV, or YAML file containing `[{x,y}, …]`.
- `samples` (optional): Number of sample points for expression mode (default `100`).
- `json` (optional): `true|false` (default `true`).
- `histogram` (optional): `true|false` to include histogram counts (default `false`).
- `bins` (optional): Number of bins for histogram (default `10`).
- `trendlineStats` (optional): `true|false` to include regression parameters (default `false`).

**Response formats**:
- JSON (`application/json`) when `json=true`:
  ```json
  {
    "min": 0,
    "max": 5,
    "mean": 2.5,
    "median": 2.5,
    "stddev": 1.29,
    "histogram": [
      {"binStart":0,"binEnd":2,"count":3},
      ...
    ],
    "slope":1,
    "intercept":0,
    "r2":1
  }
  ```
- Plain text (`text/plain`) when `json=false`:
  ```text
  min: 0.00
  max: 5.00
  mean: 2.50
  median: 2.50
  stddev: 1.29
  slope: 1.00
  intercept: 0.00
  histogram 0.00-1.00: 2
  ...
  ```

**Examples**:
```sh
curl "http://localhost:3000/stats?expression=y%3Dx&range=x%3D0:5&json=false"
```

## `/plot` Endpoint

Generate a plot image (SVG or PNG).

**GET** `/plot`

**Query parameters**:
- `expression` (required unless `dataFile` provided): Function expression in `y=…` form.
- `range` (required with `expression`): Axis range in `axis=min:max` format.
- `dataFile` (required unless `expression` provided): Path to a JSON, CSV, or YAML file.
- `format` (optional): `svg|png` (default `svg`).
- `width` (optional): Image width (default `500`).
- `height` (optional): Image height (default `300`).
- `samples` (optional): Sample count (default `100`).
- `derivative` (optional): `true|false` to overlay derivative.
- `overlayTrendline` (optional): `true|false` to overlay regression.
- `palette` (optional): Comma-separated colors.
- `encoding` (optional): `base64` to wrap output in JSON.

**Response**:
- Raw SVG (`image/svg+xml`) or PNG (`image/png`) when no encoding.
- JSON (`application/json`) with `{ data: <base64>, type: <format> }` when `encoding=base64`.

**Examples**:
```sh
curl "http://localhost:3000/plot?expression=y%3Dx&range=x%3D0:5&format=svg"
```
```sh
curl "http://localhost:3000/plot?expression=y%3Dx&range=x%3D0:5&format=png&encoding=base64"
```