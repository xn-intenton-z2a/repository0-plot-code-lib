# Usage

## Project Overview

`repository0-plot-code-lib` is a CLI and library that parses mathematical expressions, generates time-series data, and renders SVG/PNG plots.

## Installation

Requires Node.js >=20.0.0

```bash
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

## CLI Usage

```bash
npx repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.28" --file output.svg
```

Options:

- --expression, -e <expr>: A mathematical expression in x (e.g., "sin(x)")
- --range, -r <range>: Numeric range for x (e.g., "x=0:6.28")
- --format, -f <svg|png>: Output format (default: svg)
- --output, -o <file>: Output file path (default: plot.svg)
- --help, -h: Show help

## API Usage

```js
import { main } from "@xn-intenton-z2a/repository0-plot-code-lib";

main([
  "--expression", "sin(x)",
  "--range", "x=0:6.28",
  "--format", "svg",
  "--output", "plot.svg"
]);
```

## Examples and Expected Output

Generate a PNG plot of sin(x) over [0, 2π]:

```bash
npx repository0-plot-code-lib -e "sin(x)" -r "x=0:6.28" -f png -o sin.png
```

This will produce `sin.png` in the current directory.

Inline SVG Preview:

![Sample Plot](https://via.placeholder.com/400x200.svg?text=Sample+Plot)
