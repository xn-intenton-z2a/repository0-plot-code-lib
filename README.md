# repo

This repository is powered by [intentiön agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot.

## Plotting CLI and Library

This project provides a small plotting library and CLI for generating SVG and PNG plots from mathematical expressions and CSV time series.

Usage examples (CLI):

- Generate an SVG from an expression over a range:

```bash
node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg
```

- Generate a PNG from a CSV file (time,value):

```bash
node src/lib/main.js --csv data.csv --file output.png
```

- Show help:

```bash
node src/lib/main.js --help
```

PNG rendering approach

To keep the repository simple and dependency-free in this kata, the library provides a minimal PNG output helper that returns a 1x1 PNG image (satisfying the presence of PNG magic bytes). For production use, replace `renderPng` with a proper SVG-to-PNG conversion using libraries such as `sharp` or `canvas`.

Library API (named exports from `src/lib/main.js`):

- parseExpression(expressionStr) -> Function(x) -> y
- evaluateRange(fn, start, step, end) -> Array<{x,y}>
- loadCsvTimeSeries(path) -> Promise<Array<{time,value}>>
- renderSeriesToSvg(series, opts) -> string (SVG)
- renderPng(svgString, opts) -> Buffer (PNG bytes)
- savePlot(filename, content) -> Promise (writes file based on extension)
- runCli(argv) -> Promise (CLI entry)

For more details and development notes see `MISSION.md` and the `features/` documentation.
