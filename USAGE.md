# Usage

## Project Overview

`repository0-plot-code-lib` is a CLI and library that parses mathematical expressions, generates time-series data, and renders SVG/PNG plots or exports raw data. It also supports running as an HTTP server exposing REST endpoints.

## Installation

Requires Node.js >=20.0.0

```bash
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

## CLI Usage

Generate an image plot (SVG/PNG):
```bash
npx repository0-plot-code-lib --expression "sin(x)" --range "0:6.28" --format svg --output plot.svg
# alias for output: --file
npx repository0-plot-code-lib -e "sin(x)" -r "0:6.28" -f png -o plot.png
# specify explicit y-range
npx repository0-plot-code-lib -e "x^2" -r "x=0:10,y=0:100" -f svg -o test.svg
# custom samples count
npx repository0-plot-code-lib -e "sin(x)" -r "0:6.28" -n 50 -f svg -o sample.svg
# default output filename (plot.svg) when --output is omitted
npx repository0-plot-code-lib -e "x" -r "0:1"
# default output filename (plot.png) when --format png and --output is omitted
npx repository0-plot-code-lib -e "x" -r "0:1" -f png
```

Export sampled time series (CSV/JSON):
```bash
npx repository0-plot-code-lib --expression "sin(x)" --range "0:6.28" --export csv --output data.csv
npx repository0-plot-code-lib -e "x^2" -r "0:1" -x json -o series.json
# Range prefix example:
npx repository0-plot-code-lib -e "sin(x)" -r "x=0:6.28" -x csv -o data.csv
# Stdout export examples:
npx repository0-plot-code-lib --expression "sin(x)" --range "0:6.28" --export csv --output -
npx repository0-plot-code-lib -e "x^2" -r "0:1" -x json -o -
# custom samples count for export
npx repository0-plot-code-lib -e "x" -r "0:1" -x csv -n 20 -o out.csv
npx repository0-plot-code-lib -e "x" -r "0:1" -x json -n 20 -o out.json
# default output filename (data.csv) when --export csv and --output is omitted
npx repository0-plot-code-lib -e "x" -r "0:1" -x csv
# default output filename (data.json) when --export json and --output is omitted
npx repository0-plot-code-lib -e "x" -r "0:1" -x json
```

Use `-` as the `<file>` to stream results to stdout instead of writing to a file.

## HTTP Server Mode

You can run the tool as an HTTP server exposing REST endpoints for dynamic plotting and data export.

Start the server:
```bash
# start HTTP server on default port 3000
npx repository0-plot-code-lib --serve
# or specify port 3000 explicitly
npx repository0-plot-code-lib --serve --port 3000
# shorthand flags
npx repository0-plot-code-lib -S -p 3000
```

### GET /health

Check server health:
```bash
curl http://localhost:3000/health
```
Response:
```json
{ "status": "ok" }
``` 
Status code: `200`

### GET /plot

Generate a plot image or export data via HTTP:

#### Query Parameters
- `expression` (required): A mathematical formula in x (e.g., `x^2`)
- `range` (required): Numeric range for x and optional y (e.g., `0:10` or `x=0:10,y=-1:1`)
- `samples` (optional): Number of sample points (integer ≥2, default: 100)
- `format` (optional): `svg` or `png` (default: `svg`)
- `export` (optional): `csv`, `json`  

#### Examples
SVG plot:
```bash
curl "http://localhost:3000/plot?expression=x^2&range=0:10&format=svg" -o plot.svg
```
PNG plot:
```bash
curl "http://localhost:3000/plot?expression=sin(x)&range=0:6.28&format=png" -o plot.png
```
CSV export:
```bash
curl "http://localhost:3000/plot?expression=x&range=0:1&export=csv" -o data.csv
```
JSON export:
```bash
curl "http://localhost:3000/plot?expression=x&range=0:1&export=json" -o data.json
```

#### Responses
- `image/svg+xml` when `format=svg` and no `export`
- `image/png` when `format=png` and no `export`
- `text/csv` when `export=csv`
- `application/json` when `export=json`
- `400` on validation errors, with response body:

```json
{ "error": "<message>" }
```

## Options

- `--expression, -e <expr>`: A mathematical expression in x (e.g., "sin(x)")
- `--range, -r <start:end>` or `x=<start:end>[,y=<start:end>]`: Numeric range for x and optional y (e.g., "0:6.28" or "x=0:10,y=0:100")
- `--format, -f <svg|png>`: Output image format (default: svg)
- `--samples, -n <number>`: Number of sample points (integer ≥2, default: 100)
- `--export, -x <csv|json>`: Export sampled time series format (default: none)
- `--output, -o, --file <file>`: Output file path. Defaults to 'plot.svg' for plots (or 'plot.png' if format is png), and to 'data.csv' or 'data.json' for CSV/JSON exports when omitted.
- `--serve, -S`: Start HTTP server mode
- `--port, -p <number>`: Port number for HTTP server (default: 3000)
- `--help, -h`: Show help

## API Usage

```js
import { main } from "@xn-intenton-z2a/repository0-plot-code-lib";

main([
  "--expression", "sin(x)",
  "--range", "0:6.28",
  "--samples", "50",
  "--export", "csv",
  "--output", "data.csv"
]);
```