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
```

Export sampled time series (CSV/JSON):
```bash
npx repository0-plot-code-lib --expression "sin(x)" --range "0:6.28" --export csv --output data.csv
npx repository0-plot-code-lib -e "x^2" -r "0:1" -x json -o series.json
```

## Options

- --expression, -e <expr>: A mathematical expression in x (e.g., "sin(x)")
- --range, -r <start:end>: Numeric range for x (e.g., "0:6.28")
- --format, -f <svg|png>: Output image format (default: svg)
- --export, -x <csv|json>: Export sampled time series format (default: csv)
- --output, -o, --file <file>: Output file path (default: plot.svg)
- --help, -h: Show help

## API Usage

```js
import { main } from "@xn-intenton-z2a/repository0-plot-code-lib";

main([
  "--expression", "sin(x)",
  "--range", "0:6.28",
  "--export", "csv",
  "--output", "data.csv"
]);
```
