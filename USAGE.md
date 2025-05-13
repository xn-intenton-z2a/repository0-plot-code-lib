# Usage

This tool generates plots based on mathematical expressions over a numeric range and provides the `stats` and `plot` commands for summary statistics and chart images.

## Global Flags

- `--help`: Show this help message.
- `--version`: Show the installed CLI version.
- `--mission`: Show the project mission statement.
- `--serve <port>`: Start an HTTP server exposing the `/stats` and `/plot` endpoints.

## CLI Subcommands

### `stats`

Compute summary statistics or export raw data from an expression or data file.

**Usage**:
```sh
repository0-plot-code-lib stats [options]
```

**Options**:

- `--expression <function>`           Mathematical expression in `y=…` form (e.g., `y=sin(x)`).
- `--range <axis>=<min>:<max>`        Axis range for expression mode (e.g., `x=0:10`).
- `--dataFile <path>`                 JSON, CSV, or YAML data file path.
- `--samples <number>`                Number of samples (default: `100`).
- `--histogram <true|false>`          Include histogram bins (default: `false`).
- `--bins <number>`                   Number of bins for histogram (default: `10`).
- `--trendline-stats <true|false>`    Include linear regression statistics (default: `false`).
- `--format <json|text>`              Output format: JSON (`json`) or plain text (`text`) (default: `json`).
- `--output <path>`                   Write output to a file (stdout if omitted).
- `--export-data <path|->`            Export raw `x,y` data points to a file or stdout.
- `--export-format <csv|json|yaml>`   Format for raw data export (default inferred from extension).

**Examples**:

```sh
repository0-plot-code-lib stats --expression "y=x" --range "x=0:5" --histogram true --bins 5 --trendline-stats true
```

```sh
repository0-plot-code-lib stats --dataFile data.json --export-data - --export-format yaml
```

### `plot`

Generate a plot image (SVG or PNG) using the QuickChart API.

**Usage**:
```sh
repository0-plot-code-lib plot [options]
```

**Options**:

- `--expression <function>`           Mathematical expression in `y=…` form (e.g., `y=sin(x)`).
- `--range <axis>=<min>:<max>`        Axis range for expression mode (e.g., `x=0:10`).
- `--dataFile <path>`                 JSON, CSV, or YAML data file path.
- `--format <svg|png>`                Output image format (default: `svg`).
- `--width <number>`                  Image width in pixels (default: `500`).
- `--height <number>`                 Image height in pixels (default: `300`).
- `--samples <number>`                Number of samples (default: `100`).
- `--derivative <true|false>`         Overlay first derivative curve (default: `false`).
- `--overlayTrendline <true|false>`   Overlay regression trendline (default: `false`).
- `--palette <colors>`                Comma-separated CSS colors (e.g., `red,green`).
- `--encoding <base64>`               Base64-encode output and wrap in JSON.
- `--output <path>`                   Write output to a file (stdout if omitted).

**Examples**:

```sh
repository0-plot-code-lib plot --expression "y=sin(x)" --range "x=0:6.28" --derivative true --overlayTrendline true --palette "blue,orange" --output chart.svg
```

```sh
repository0-plot-code-lib plot --expression "y=x" --range "x=0:5" --format png --encoding base64
```

## HTTP Endpoints

Start the server:

```sh
repository0-plot-code-lib --serve 3000
```

### GET `/stats`

Compute summary statistics for a data series.

**Query parameters**:

- `expression` (required unless `dataFile` provided): Function expression in `y=…` form.
- `range` (required with `expression`): `axis=min:max` format.
- `dataFile` (required unless `expression` provided): Path to JSON, CSV, or YAML file.
- `samples` (optional): Number of sample points (default: `100`).
- `json` (optional): `true|false` (default: `true`).
- `histogram` (optional): `true|false` (default: `false`).
- `bins` (optional): Number of histogram bins (default: `10`).
- `trendlineStats` (optional): `true|false` (default: `false`).

**Response**:

- JSON (`application/json`) when `json=true`.
- Plain text (`text/plain`) when `json=false`.

### GET `/plot`

Generate a plot image.

**Query parameters**:

- `expression` (required unless `dataFile` provided).
- `range` (required with `expression`).
- `dataFile` (required unless `expression` provided).
- `format` (optional): `svg|png` (default: `svg`).
- `width` (optional): Width in pixels (default: `500`).
- `height` (optional): Height in pixels (default: `300`).
- `samples` (optional): Number of samples (default: `100`).
- `derivative` (optional): `true|false`.
- `overlayTrendline` (optional): `true|false`.
- `palette` (optional): Comma-separated colors.
- `encoding` (optional): `base64`.

**Response**:

- Raw SVG (`image/svg+xml`) or PNG (`image/png`) when no encoding.
- JSON (`application/json`) when `encoding=base64`.
