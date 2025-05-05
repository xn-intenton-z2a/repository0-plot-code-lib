# repository0-plot-code-lib

Be a go-to plot library with a CLI — the jq of formula visualizations.

![npm version](https://img.shields.io/npm/v/@xn-intenton-z2a/repository0-plot-code-lib)
![License](https://img.shields.io/badge/license-MIT-blue)

## Features

- Generate time series data from mathematical expressions in `x` over numeric ranges.
- Compute symbolic derivatives on the fly with `--derivative`.
- Output in CSV, JSON, or NDJSON formats.
- Create SVG or PNG plots via the `plot` subcommand.
- Run an HTTP server for data endpoints (NDJSON, JSON, CSV, SSE) and plot generation.
- Programmatic API for seamless integration in JavaScript/TypeScript projects.

## Installation

Global install:
```bash
npm install -g @xn-intenton-z2a/repository0-plot-code-lib
```

Local project install:
```bash
npm install @xn-intenton-z2a/repository0-plot-code-lib
```

## CLI Usage

### Timeseries (default)
Generate numeric series from an expression.

```bash
repository0-plot-code-lib \
  --expression "sin(x)" \
  --range "0:6.283" \
  [--points 50] \
  [--format csv|json|ndjson] \
  [--derivative] \
  [--output-file <file>]
```

- `--expression <expr>`   : Mathematical expression in `x` (required).
- `--range <start:end[:step]>`: Numeric range (required). When `step` is omitted, points are evenly spaced.
- `--points <number>`     : Number of samples (default: 100).
- `--format <csv|json|ndjson>`: Output format (default: `csv`).
- `--derivative`          : Return derivative series instead of the original function.
- `--output-file <file>`  : Write output to file instead of stdout.

**Example**
```bash
repository0-plot-code-lib --expression "x^2" --range "0:2" --points 3 --format csv --derivative
```
```
x,y
0,0
1,2
2,4
```

### Plot Subcommand
Generate a visual plot in SVG or PNG.

```bash
repository0-plot-code-lib plot \
  --expression "x^2" \
  --range "0:5" \
  [--points 20] \
  [--plot-format svg|png] \
  [--width 800] \
  [--height 600] \
  [--title "My Plot"] \
  [--derivative] \
  [--output-file <file>]
```

- `--plot-format <svg|png>`: Plot format (default: `svg`).
- `--width <px>`, `--height <px>`: Dimensions for plot (defaults: 800×600).
- `--title <text>`         : Optional title for SVG.

**Example**
```bash
repository0-plot-code-lib plot --expression "sin(x)" --range "0:6.283" --plot-format png --output-file out.png
```

## HTTP Server

Launch an HTTP server to serve data and plots.

```bash
repository0-plot-code-lib --serve
# or use custom port:
HTTP_PORT=4000 repository0-plot-code-lib --serve
```

### Endpoints
All data endpoints accept `expression`, `range`, `points`, and optional `derivative=true|false`.

- **GET /ndjson**  : NDJSON stream (`application/x-ndjson`).
- **GET /json**    : JSON array (`application/json`).
- **GET /csv**     : CSV text (`text/csv`).
- **GET /stream**  : Server-Sent Events (`text/event-stream`).
- **POST /plot**   : Generate inline SVG or base64 PNG (JSON or form body). Use `plotFormat`, `width`, `height`, and `title`.

For full details, see [Usage](USAGE.md).

## Programmatic API

Import and call functions directly:

```js
import {
  getTimeSeries,
  serializeCSV,
  serializeJSON,
  serializeNDJSON,
  generateSVG,
  generatePNG
} from '@xn-intenton-z2a/repository0-plot-code-lib';

(async () => {
  // simple series
  const data = await getTimeSeries('x*2', '0:10', { points: 5 });
  console.log(serializeNDJSON(data));

  // derivative series
  const deriv = await getTimeSeries('x^2', '0:5', { points: 6, derivative: true });
  console.log(JSON.stringify(deriv, null, 2));

  // SVG plot
  const svg = generateSVG(data, 800, 600, 'My Plot');
  console.log(svg);

  // PNG plot
  const png = await generatePNG(data, 800, 600, 'My Plot');
  console.log(png.slice(0, 4)); // PNG signature
})();
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on reporting issues, submitting pull requests, and documentation.

## License

MIT
