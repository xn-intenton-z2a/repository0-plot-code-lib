# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

## Overview

**repository0-plot-code-lib** is a JavaScript library and CLI tool that transforms mathematical expressions into time series data, computes summary statistics, exports raw data, and generates SVG or PNG plots using the QuickChart API. It also provides an optional HTTP server exposing `/stats` and `/plot` endpoints.

## Installation

Install via npm:

```sh
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

## Command-line Interface

The tool offers two main subcommands: `stats` and `plot`. Common global flags:

- `--serve <port>`: Start an HTTP server on the specified port.
- `--mission`: Show the project mission statement.
- `--help`: Show help message.
- `--version`: Show the installed CLI version.

### `stats`

Compute summary statistics or export raw data.

**Usage**:
```sh
repository0-plot-code-lib stats [options]
```

**Options**:

- `--expression <function>`       Mathematical expression in `y=…` form (e.g., `y=sin(x)`).
- `--range <axis>=<min>:<max>`    Axis range for expression mode (e.g., `x=0:10`).
- `--dataFile <path>`             JSON, CSV, or YAML data file path.
- `--samples <number>`            Number of samples for expression mode (default: 100).
- `--histogram <true|false>`      Include histogram bins in summary (default: false).
- `--bins <number>`               Number of histogram bins (default: 10).
- `--trendline-stats <true|false>`Include linear regression statistics (slope, intercept, r2) (default: false).
- `--format <json|text>`          Output format: JSON (`json`) or plain text (`text`) (default: json).
- `--output <path>`               Write output to a file (stdout if omitted).
- `--export-data <path|->`        Export raw `x,y` data points. Provide a file path or `-` for stdout.
- `--export-format <csv|json|yaml>` Serialization format for raw data export. Default inferred from file extension or `json`.

**Examples**:

Compute stats in JSON (default):
```sh
repository0-plot-code-lib stats --expression "y=x" --range "x=0:5" --trendline-stats true --histogram true --bins 5
```

Export raw data to CSV:
```sh
repository0-plot-code-lib stats --expression "y=x" --range "x=0:2" --export-data data.csv --export-format csv
```

Export raw data to stdout in JSON:
```sh
repository0-plot-code-lib stats --dataFile data.json --export-data - --export-format json
```

### `plot`

Generate a plot image using the QuickChart API.

**Usage**:
```sh
repository0-plot-code-lib plot [options]
```

**Options**:

- `--expression <function>`       Mathematical expression in `y=…` form (e.g., `y=sin(x)`).
- `--range <axis>=<min>:<max>`    Axis range for expression mode (e.g., `x=0:10`).
- `--dataFile <path>`             JSON, CSV, or YAML data file path.
- `--format <svg|png>`            Output image format (default: `svg`).
- `--width <number>`              Image width in pixels (default: `500`).
- `--height <number>`             Image height in pixels (default: `300`).
- `--samples <number>`            Number of samples for expression mode (default: `100`).
- `--derivative <true|false>`     Overlay first derivative curve (default: false).
- `--overlayTrendline <true|false>` Overlay linear regression trendline (default: false).
- `--palette <colors>`            Comma-separated CSS colors for series (e.g., `red,green,blue`).
- `--encoding <base64>`           Base64-encode output and wrap in JSON.
- `--output <path>`               Write output to a file (stdout if omitted).

**Examples**:

Generate an SVG plot:
```sh
repository0-plot-code-lib plot --expression "y=sin(x)" --range "x=0:6.28" --derivative true --overlayTrendline true --palette "red,green" --output plot.svg
```

Generate a PNG plot with base64 encoding:
```sh
repository0-plot-code-lib plot --expression "y=x" --range "x=0:5" --format png --encoding base64
```

## HTTP Server Mode

Start an HTTP server exposing `/stats` and `/plot` endpoints:

```sh
repository0-plot-code-lib --serve 3000
```

Once running, CORS is enabled (`Access-Control-Allow-Origin: *`).

### GET `/stats`

Compute summary statistics for a data series derived from an expression or data file.

**Query parameters**:

- `expression` (required unless `dataFile` provided): Function expression in `y=…` form.
- `range` (required with `expression`): Axis range in `axis=min:max` format.
- `dataFile` (required unless `expression` provided): Path to a JSON, CSV, or YAML file.
- `samples` (optional): Number of sample points (default: `100`).
- `json` (optional): `true|false` (default: `true`).
- `histogram` (optional): `true|false` (default: `false`).
- `bins` (optional): Number of histogram bins (default: 10).
- `trendlineStats` (optional): `true|false` to include regression parameters (default: false).

**Response**:

- JSON (`application/json`) when `json=true` (default).
- Plain text (`text/plain`) when `json=false`.

**Examples**:

```sh
curl "http://localhost:3000/stats?expression=y%3Dx&range=x%3D0:5&json=false"
```

### GET `/plot`

Generate a plot image (SVG or PNG).

**Query parameters**:

- `expression` (required unless `dataFile` provided).
- `range` (required with `expression`).
- `dataFile` (required unless `expression` provided).
- `format` (optional): `svg|png` (default: `svg`).
- `width` (optional): Image width (default: `500`).
- `height` (optional): Image height (default: `300`).
- `samples` (optional): Sample count (default: `100`).
- `derivative` (optional): `true|false`.
- `overlayTrendline` (optional): `true|false`.
- `palette` (optional): Comma-separated colors.
- `encoding` (optional): `base64`.

**Response**:

- Raw SVG (`image/svg+xml`) or PNG (`image/png`) when no `encoding`.
- JSON (`application/json`) when `encoding=base64`.

## Mission

Show mission statement:
```sh
repository0-plot-code-lib --mission
```

## License

MIT