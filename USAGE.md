# Usage

## Project Overview

`repository0-plot-code-lib` is a CLI and library that parses mathematical expressions, generates time-series data, and renders SVG/PNG plots or exports raw data.

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
```

Use `-` as the `<file>` to stream results to stdout instead of writing to a file.

## Options

- --expression, -e <expr>: A mathematical expression in x (e.g., "sin(x)")
- --range, -r <start:end> or x=<start:end>[,y=<start:end>]: Numeric range for x and optional y (e.g., "0:6.28" or "x=0:10,y=0:100")
- --format, -f <svg|png>: Output image format (default: svg)
- --samples, -n <number>: Number of sample points (integer ≥2, default: 100)
- --export, -x <csv|json>: Export sampled time series format (default: none)
- --output, -o, --file <file>: Output file path (default: plot.svg)
- Use `-` for `<file>` to write output to stdout
- --help, -h: Show help

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