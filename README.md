# repo

This repository is powered by [intentiön agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot. Write a mission, and the system generates issues, writes code, runs tests, and opens pull requests.

## Plotting CLI and Library

This project includes a small plotting library and CLI that can parse mathematical expressions, evaluate them over numeric ranges, load simple CSV time/value data, render SVG plots, and produce PNG output.

Examples:

- Generate an SVG of sin(x):

```bash
node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg
```

- Generate a PNG (same data, raster image):

```bash
node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.png
```

- Load a CSV and save a plot (CSV must have header `time,value`):

```bash
node src/lib/main.js --csv data.csv --file output.svg
```

PNG rendering approach

- The library includes a minimal, dependency-free PNG encoder that creates a truecolor (RGB) PNG from raw pixel data. This keeps the demo self-contained and avoids external native dependencies.
- For the CLI PNG output, the renderer rasterises a simple visualization of the data into a small PNG and writes it as a binary file. The PNG files produced by the CLI start with the standard PNG signature (\x89PNG...).

API

- parseExpression(expr: string): (x: number) => number
- parseRange(range: string): { start, step, end }
- evaluateExpressionOverRange(fn, start, step, end): Array<{x,y}>
- parseCSV(text: string): Array<{time, value}>
- loadCSVFile(path: string): Array<{time, value}> (Node only)
- renderSVG(points, options): string
- renderPNGFromPoints(points, options): Buffer
- savePlot({ points, file }): writes .svg or .png (Node only)
- main(argv?): CLI entrypoint

See src/lib/main.js for details and exported functions.
