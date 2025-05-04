USAGE.md
# USAGE.md
# Plot-Code-Lib Usage

## Project Overview

`plot-code-lib` transforms mathematical expressions into time-series data and renders SVG/PNG plots via CLI or API.  
For detailed mission and goals, see [MISSION.md](./MISSION.md).

## Installation

Install locally:

```bash
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

Install globally:

```bash
npm install -g @xn-intenton-z2a/repository0-plot-code-lib
```

## Command-Line Usage

Run via npm scripts:

```bash
npm start -- --expression "y=sin(x)" --range "x=0:10" --output plot.svg --format svg
```

Or with npx:

```bash
npx repository0-plot-code-lib --expression "y=cos(x)" --range "x=0:10" -o plot.png --format png
```

### Options

- `--expression <expr>`  Mathematical expression to plot (e.g., `y=sin(x`).
- `--range <range>`      Value range specification (e.g., `x=0:10,y=-1:1`).
- `--output, -o <file>`  Output file path (e.g., `plot.svg`).
- `--format <svg|png>`   Output file format (`svg` or `png`).

### Examples

Generate a sine wave plot (SVG):

```bash
# Generates 'sine.svg' with y = sin(x) from x=0 to 2π
npx repository0-plot-code-lib --expression "y=sin(x)" --range "x=0:6.283" -o sine.svg --format svg
```

Generate a cosine wave plot (PNG):

```bash
# Generates 'cosine.png' with y = cos(x) from x=0 to 2π
npx repository0-plot-code-lib --expression "y=cos(x)" --range "x=0:6.283" -o cosine.png --format png
```

## Programmatic API

Import and invoke `main(args)` in your script:

```js
import { main } from "@xn-intenton-z2a/repository0-plot-code-lib";

main([
  "--expression", "y=sin(x)",
  "--range", "x=0:10",
  "-o", "plot.svg",
  "--format", "svg"
]);
```

## Testing and Contribution

Run the test suite:

```bash
npm test
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on contributing.
