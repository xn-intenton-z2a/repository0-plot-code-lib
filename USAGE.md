# repository0-plot-code-lib

> Be the jq of formula visualizations: a lightweight library and CLI for time series data and plotting.

## Installation

### Global Install
```bash
npm install -g @xn-intenton-z2a/repository0-plot-code-lib
```

### Local Development
```bash
git clone https://github.com/xn-intenton-z2a/repository0-plot-code-lib.git
cd repository0-plot-code-lib
npm install
npm link
```

---

## CLI Quickstart

Two modes: **timeseries** (default) and **plot**.

### Common Flags

- `--expression <expr>` (required): mathematical expression in `x`.
- `--range <start:end>` or `<start:end:step>` (required): numeric range for `x`.
- `--points <number>` (optional, default `100`): number of points (ignored when step is specified).
- `--derivative` (optional, default `false`): compute the derivative of the expression instead of the original expression.
- `--output-file <path>` (optional): write output to a file instead of stdout.
- Format flags (timeseries): `--format csv|json|ndjson`, default `csv`.
- Plot flags (plot): `--plot-format svg|png`, default `svg`.
- Size flags (plot): `--width <px>`, `--height <px>`.
- `--title <text>` (plot): optional title for SVG.

### Timeseries (Default)
Generates data in CSV, JSON, or NDJSON format.

```bash
repository0-plot-code-lib \
  --expression "sin(x)" \
  --range "0:6.283" \
  [--points 50] \
  [--format csv|json|ndjson] \
  [--derivative] \
  [--output-file data.txt]
```

**Examples**

CSV (default):
```bash
repository0-plot-code-lib --expression "x" --range "0:2" --points 3
```
```
x,y
0,0
1,1
2,2
```

JSON:
```bash
repository0-plot-code-lib --expression "x" --range "0:2" --points 3 --format json
```

NDJSON:
```bash
repository0-plot-code-lib --expression "x" --range "0:2" --points 3 --format ndjson
```

Derivative CSV:
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
Generates SVG or PNG plots.

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
  [--output-file plot.svg|plot.png]
```

**Examples**

SVG to stdout:
```bash
repository0-plot-code-lib plot --expression "x^2" --range "0:5" --plot-format svg --width 400 --height 300 --title "Square"
```

Derivative SVG:
```bash
repository0-plot-code-lib plot --expression "x^2" --range "0:5" --points 6 --plot-format svg --derivative
```

PNG to file:
```bash
repository0-plot-code-lib plot --expression "sin(x)" --range "0:6.283" --plot-format png --output-file out.png
```

---

## HTTP Server

Start an HTTP server with Express on port 3000 (default) or custom port.

```bash
# Default port 3000
repository0-plot-code-lib --serve

# Custom port 4000
HTTP_PORT=4000 repository0-plot-code-lib --serve
```

### Endpoints

All query endpoints accept an optional `derivative` parameter (`true|false`).

#### GET /ndjson
- Query: `expression`, `range`, `points`, `derivative`
- Returns: NDJSON (`application/x-ndjson`)

```bash
curl -s "http://localhost:3000/ndjson?expression=x&range=0:2&points=3&derivative=true"
```

#### GET /stream
- Query: `expression`, `range`, `points`, `derivative`
- Returns: Server-Sent Events (`text/event-stream`)

```bash
curl -N "http://localhost:3000/stream?expression=x&range=0:2&points=3&derivative=true"
```

#### GET /json
- Query: `expression`, `range`, `points`, `derivative`
- Returns: JSON array (`application/json`)

```bash
curl -s "http://localhost:3000/json?expression=x&range=0:2&points=3&derivative=true"
```

#### GET /csv
- Query: `expression`, `range`, `points`, `derivative`
- Returns: CSV text (`text/csv`)

```bash
curl -s "http://localhost:3000/csv?expression=x&range=0:2&points=3&derivative=true"
```

#### POST /plot
- Body (JSON or form): `expression`, `range`, `points`, `derivative`, `plotFormat` (svg|png), `width`, `height`, `title`
- Returns: HTML page with inline SVG or base64 PNG

```bash
curl -s -X POST http://localhost:3000/plot \
  -H "Content-Type: application/json" \
  -d '{"expression":"x","range":"0:2","points":3,"derivative":true,"plotFormat":"svg","width":200,"height":100}'
```

---

## Programmatic API

```js
import { getTimeSeries, generateSVG, generatePNG, serializeNDJSON } from '@xn-intenton-z2a/repository0-plot-code-lib';
(async () => {
  // simple series
  const data = await getTimeSeries('x*2','0:10',{points:5});
  console.log(serializeNDJSON(data));

  // derivative series
  const deriv = await getTimeSeries('x^2','0:5',{points:6,derivative:true});
  console.log(JSON.stringify(deriv, null, 2));

  // SVG
  console.log(generateSVG(data,800,600,'My Plot'));

  // PNG
  const png = await generatePNG(data,800,600,'My Plot');
  console.log(png.slice(0,4)); // PNG signature
})();
```

For more details, see [CONTRIBUTING.md](CONTRIBUTING.md) and the full documentation in this repository.
