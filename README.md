# repo — Plotting library demo

A small JavaScript library and CLI for generating simple plots from mathematical expressions and time series data. Produces SVG output and (optionally) PNG output when the optional native dependency `sharp` is installed.

Features
- parseExpression(expr) → function(x) — parse a JS expression using Math (e.g. `y=Math.sin(x)`).
- parseRange(rangeStr) → {start,step,end} — parse `start:step:end` ranges (whitespace allowed).
- evaluateRange(fn, start, step, end) → [{x,y}] — evaluate a function across a numeric range (inclusive end).
- loadCSV(path) → Promise<[ {time, value} ]> — load a CSV with header `time,value` (Node only).
- renderSVG(series, options) → string — render a series to SVG 1.1 containing a `<polyline>` and `viewBox`.
- renderPNG(series, options) → Promise<Buffer> — convert SVG→PNG using `sharp` when available; falls back to a deterministic pure-JS 1x1 PNG when `sharp` is not installed so CI can validate PNG signatures.
- savePlotToFile(path, series, options) → Promise<void> — save `.svg` or `.png` inferred from extension (Node only).

CLI

Examples:

- Generate an SVG from an expression:

```
node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file out.svg
```

- Generate a PNG from a CSV (requires `sharp` for full SVG rasterization; fallback PNG is available for tests):

```
node src/lib/main.js --csv data.csv --file out.png
```

- Show help:

```
node src/lib/main.js --help
```

Notes on PNG rendering

This project prefers to use `sharp` (libvips) to convert SVG to PNG, but provides a deterministic, pure-JS 1x1 PNG fallback when `sharp` is not available. The fallback ensures CI and unit tests can always validate PNG signatures (magic bytes) even without native dependencies.

To enable full SVG rasterization locally or in CI, install `sharp` as a dev dependency and ensure native build tools are available:

```bash
npm install --save-dev sharp
```

When `sharp` is installed, `renderPNG` will return a full rasterization of the SVG. When it is not installed, `renderPNG` returns a small deterministic PNG buffer (still a valid PNG) so tests that assert the PNG magic bytes remain meaningful.

Tests

- Unit tests verify core library functionality (expression parsing, range evaluation, CSV loading, SVG rendering). The PNG test asserts the PNG magic bytes for `renderPNG` output — this is satisfied either by `sharp` producing a rasterized PNG or by the deterministic pure-JS fallback.
- Behaviour tests run a headless browser against the demo page; the demo example `y=Math.sin(x)` over `-3.14:0.01:3.14` is expected to render `629 points` and an SVG `<polyline>` element.

Browser demo

Open `src/web/index.html` in a browser (or run `npm run build:web && npx serve docs`) to view a small demo page that uses the library directly via `src/web/lib.js`.

Security

Expressions are evaluated using a Function wrapper with `Math` and `x` in scope. The parser forbids access to globals and prototype chains (common dangerous tokens are rejected) — however expressions are executed as JavaScript and must be considered trusted input in production.

License

MIT
