# Overview

Add native chart rendering capabilities to generate SVG or PNG images from time series data using Chart.js and a Node canvas backend. This feature transforms numerical series into visual plots directly via the CLI, allowing users to quickly produce shareable graphics without additional tooling.

# Dependencies

- chart.js: to configure and render chart types
- canvas: to provide a Node.js Canvas implementation for Chart.js

# Implementation

1. Install chart.js and canvas in package.json dependencies.
2. Extend the Zod optionsSchema to include new format values `svg` and `png`.
3. In src/lib/main.js, after generating or serializing series data, detect format values `svg` or `png`:
   - Import ChartJS and Canvas classes, register Chart.js adapters to use the Node canvas.
   - Prepare a virtual canvas of sensible default dimensions (e.g., 800×600). For SVG output, use `canvas.createCanvas(width, height, 'svg')`. For PNG output, use `canvas.createCanvas(width, height)`.
   - Configure a Chart instance with:
     * type: `line`
     * data: labels array from series axis values, dataset of series values
     * options: maintainAspectRatio false, scales linear, plugins title showing expression
   - Render the chart by calling `chart.render()` or drawing via the canvas context.
   - For SVG: retrieve `canvas.toBuffer('image/svg+xml')` and write as text. For PNG: retrieve `canvas.toBuffer('image/png')` and write as binary.
4. Write the resulting image buffer or string to the file path specified by `--output`, or to stdout (for SVG only).
5. On any rendering or write error, display a clear error and exit with code 1.

# CLI Integration

- Update `--format` allowed values to include `svg` and `png`. Examples:
  * `--format svg --output chart.svg`
  * `--format png --output chart.png`
- Maintain backwards compatibility for `json` and `csv` outputs.

# Tests

- Unit tests for generatePlot:
  * Verify that calling generatePlot with a small series produces a buffer or string that begins with `<svg` for SVG mode.
  * Verify that PNG buffer begins with the PNG file signature bytes.
  * Test that unknown or missing format in rendering block triggers a clear error.
- Integration tests:
  * CLI invocation with `--format svg` writes a valid SVG file containing expected chart tags.
  * CLI invocation with `--format png` writes a valid PNG file whose first bytes match the PNG signature.

# Documentation

- Update USAGE.md with examples of producing SVG and PNG:
  * `node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --format svg --output output.svg`
  * `node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --format png --output output.png`
- Update README.md feature list to reference the Plot Export feature.