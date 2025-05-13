# Usage

This tool generates plots based on mathematical expressions over a numeric range and provides a `/plot` and `/stats` endpoint for summary statistics.

## Flags

--help: Show this help message and usage examples.

--version: Show the installed CLI version.

--mission: Show the project mission statement.

--serve <port>: Start an HTTP server exposing the `/plot` and `/stats` endpoints.

## CLI Examples

### Plot Subcommand (stub)
```
repository0-plot-code-lib plot --expression "y=x" --range "x=0:10" --format svg --output out.svg
```
**Note:** Plot functionality is currently not implemented and will return an error message.

## `stats` Subcommand

Compute summary statistics for an expression or data file.

```sh
repository0-plot-code-lib stats --expression "y=x" --range "x=0:2"
```
Stats subcommand with histogram and trendline (JSON output):
```sh
repository0-plot-code-lib stats --expression "y=x" --range "x=0:10" --histogram true --bins 5 --trendline-stats true
```
Stats subcommand (plain text output):
```sh
repository0-plot-code-lib stats --expression "y=x" --range "x=0:2" --format text
```
Stats subcommand from data file to output file:
```sh
repository0-plot-code-lib stats --data-file data.json --format json --output stats.json
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

## /plot Endpoint (stub)

Generate a plot image (SVG or PNG).

**GET** `/plot`

**Note:** Plot functionality is currently not implemented and returns HTTP 501.

Example (stub):
```sh
curl "http://localhost:3000/plot?expression=y%3Dx&range=x%3D0:5&format=svg"
```