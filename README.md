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

CI: enabling full SVG->PNG rasterization

To run real SVG→PNG rasterization in CI you can either install `sharp` as a dev dependency (so it's available during `npm ci`) or install the system-level `libvips` package and then install `sharp`. If installing native packages is not possible, the fallback 1x1 PNG will keep tests deterministic but will not validate real rasterization.

Example (GitHub Actions) — Ubuntu runner:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '24'
      - name: Install system dependencies for libvips (optional)
        run: |
          sudo apt-get update
          sudo apt-get install -y libvips-dev build-essential
      - name: Install npm dependencies
        run: npm ci
      - name: Run unit tests
        run: npm test
```

Notes:
- Some CI environments provide prebuilt `sharp` binaries which avoid installing system packages; consult the `sharp` documentation for platform-specific guidance.
- The repository keeps a pure-JS deterministic PNG fallback so unit tests can always validate PNG signatures even if native binaries are unavailable.

Playwright behaviour test stability

Flaky behaviour tests were observed in CI (Issue #26). To reduce intermittent failures the demo page includes a lightweight click-queuing mechanism so test clicks are not lost if the demo's module script hasn't finished loading yet. Behaviour tests were updated to wait on an explicit `data-ready` attribute on the demo output (`#plot-wrapper[data-ready="true"]`) rather than relying on fragile timing assumptions.

Additionally, Playwright's configuration used by CI was updated to increase per-test timeouts, action/navigation timeouts, and to enable trace collection on the first retry to aid debugging of intermittent failures.

Tests

- Unit tests verify core library functionality (expression parsing, range evaluation, CSV loading, SVG rendering). The strengthened PNG test now validates IHDR and image data length as described above.
- Behaviour tests run a headless browser against the demo page; the demo example `y=Math.sin(x)` over `-3.14:0.01:3.14` is expected to render `629 points` and an SVG `<polyline>` element.

Browser demo

Open `src/web/index.html` in a browser (or run `npm run build:web && npx serve docs`) to view a small demo page that uses the library directly via `src/web/lib.js`.

Security

Expressions are evaluated using a Function wrapper with `Math` and `x` in scope. The parser forbids access to globals and prototype chains (common dangerous tokens are rejected) — however expressions are executed as JavaScript and must be considered trusted input in production.

License

MIT
