# repo

This repository is powered by [intenti&ouml;n agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot. Write a mission, and the system generates issues, writes code, runs tests, and opens pull requests.

## Getting Started

... (original content retained) ...

## Plot CLI and Library

This project includes a small plotting library and command-line interface for generating SVG and PNG plots from mathematical expressions or time-series CSV files.

Features:
- parseExpression(expr) — parse strings like `"y=Math.sin(x)"` into a callable function f(x)
- sampleRange(range) — parse `start:step:end` ranges and return sampled x values
- evaluateExpressionOverRange(expr, range) — return array of `{x,y}` points
- loadCSVFromString / loadCSVFromFile — load `time,value` CSV data
- renderSVG(points, options) — render an SVG string containing a `<polyline>` and `viewBox`
- svgToPng(svg) — produces a small PNG buffer (placeholder)
- savePlot(svg, filename) — save as `.svg` or `.png` (infers by extension)

CLI usage examples:

```bash
# Generate an SVG from an expression
node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file demo.svg

# Generate a PNG from a CSV file (CSV format: time,value)
node src/lib/main.js --csv data.csv --file out.png

# Show help
node src/lib/main.js --help
```

Range format: `start:step:end` (e.g. `-3.14:0.01:3.14`).

PNG rendering approach
----------------------
To keep the project lightweight and dependency-free for tests, the library writes a small valid PNG placeholder image when emitting `.png` files. The PNG files created by the library start with the standard PNG magic bytes (\x89PNG\r\n\x1A\n) so tools can recognize them.

If you need real rasterization of SVG to PNG, install `sharp` and replace `svgToPng` implementation with a `sharp(svg).png().toBuffer()` call. Example (Node):

```js
import sharp from 'sharp';
export async function svgToPng(svg) {
  return sharp(Buffer.from(svg)).png().toBuffer();
}
```

Documentation and examples
--------------------------
See `src/web/index.html` for a small demo page that imports the library and renders a sample y=Math.sin(x) plot in the browser.

License
-------
MIT
