# repo — Plotting library demo

A small JavaScript library and CLI for generating simple plots from mathematical expressions and time series data. Produces SVG output and (optionally) PNG output when the optional native dependency `sharp` is installed.

Features
- parseExpression(expr) → function(x) — parse a JS expression using Math (e.g. `y=Math.sin(x)`).
- parseRange(rangeStr) → {start,step,end} — parse `start:step:end` ranges (whitespace allowed).
- evaluateRange(fn, start, step, end) → [{x,y}] — evaluate a function across a numeric range (inclusive end).
- loadCSV(path) → Promise<[ {time, value} ]> — load a CSV with header `time,value` (Node only).
- renderSVG(series, options) → string — render a series to SVG 1.1 containing a `<polyline>` and `viewBox`.
- renderPNG(series, options) → Promise<Buffer> — convert SVG→PNG using `sharp` (optional).
- savePlotToFile(path, series, options) → Promise<void> — save `.svg` or `.png` inferred from extension (Node only).

CLI

Examples:

- Generate an SVG from an expression:

```
node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file out.svg
```

- Generate a PNG from a CSV (requires `sharp`):

```
node src/lib/main.js --csv data.csv --file out.png
```

- Show help:

```
node src/lib/main.js --help
```

Notes on PNG rendering

This project uses `sharp` (libvips) to convert SVG to PNG when `renderPNG`/`savePlotToFile` are used with a `.png` output. `sharp` is optional and requires native dependencies (libvips) on CI and developer machines. Tests that depend on `sharp` will skip gracefully when it is not installed.

Tests

- Unit tests verify core library functionality (expression parsing, range evaluation, CSV loading, SVG rendering). When `sharp` is available, unit tests also assert PNG output begins with the PNG magic bytes (\x89PNG...).
- Behaviour tests run a headless browser against the demo page; the demo example `y=Math.sin(x)` over `-3.14:0.01:3.14` is expected to render `629 points` and an SVG `<polyline>` element.

Browser demo

Open `src/web/index.html` in a browser (or run `npm run build:web && npx serve docs`) to view a small demo page that uses the library directly via `src/web/lib.js`.

Security

Expressions are evaluated using a Function wrapper with `Math` and `x` in scope. The parser forbids access to globals and prototype chains (common dangerous tokens are rejected) — however expressions are executed as JavaScript and must be considered trusted input in production.

License

MIT
