# repository0 — Plot Code Library

This repository implements a small plotting library and CLI for generating plots from mathematical expressions and time series data.

Key features

- parseExpression(expressionString): Convert strings like `"y=Math.sin(x)"` into a callable function f(x).
- evaluateRange(rangeString, exprFn): Sample an expression over a numeric range `start:step:end` and return an array of `{x,y}` points.
- loadCsvTimeSeries(path): Load a CSV file with `time,value` rows (Node only).
- renderSvg(series, options): Render a series to an SVG 1.1 string containing a `<polyline>` and a `viewBox` attribute.
- svgToPng(svg): Produce a PNG Buffer; the implementation returns a small valid PNG image (1x1) as a portable fallback.
- savePlotToFile(content, filename): Save SVG or PNG data to a file (Node only).
- CLI: `node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg`

PNG rendering approach

For portability in CI and to avoid native dependencies, `svgToPng` returns a small valid PNG buffer (1x1) as a fallback. For production-quality rasterisation, replace the `svgToPng` implementation with a renderer such as `sharp` or `canvas` which can render the SVG at arbitrary resolution.

Examples

Render an SVG of a sine curve:

```
node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg
```

Render a PNG from CSV:

```
node src/lib/main.js --csv data.csv --file output.png
```

Browser demo

The website at `src/web/index.html` imports the library and renders a small demo plot in the browser using `parseExpression`, `evaluateRange`, and `renderSvg`.
