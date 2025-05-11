# Overview

Add native chart rendering capabilities to generate SVG and PNG images directly from time series data via the CLI. Users can invoke plotting commands to produce ready-to-share graphics without external tooling.

# Dependencies
- chart.js for chart configuration and rendering
- canvas for Node.js Canvas implementation to back Chart.js

# Implementation
1. Add chart.js and canvas to dependencies in package.json.
2. Update Zod optionsSchema to allow new format values svg and png.
3. In src/lib/main.js, after generateSeries or before serializing, branch on format:
   1. For svg: import Chart and Canvas, use createCanvas(width, height, 'svg') to create an SVG canvas.
   2. For png: use createCanvas(width, height) to create a PNG canvas.
   3. Initialize a Chart instance of type line with axis labels from series and dataset values. Set options to maintain aspect ratio false and include chart title with the expression.
   4. Render the chart, then call canvas.toBuffer('image/svg+xml') for SVG or canvas.toBuffer('image/png') for PNG.
   5. Write the resulting buffer or string to the output path or stdout (stdout only for svg).
4. Maintain error handling: on any render or write error, display clear message and set exit code to 1.

# CLI Integration
- Extend minimist config to accept --format svg and --format png alongside existing json and csv.
- Examples:
  node src/lib/main.js --expression y=sin(x) --range x=0:6.28 --format svg --output chart.svg
  node src/lib/main.js --expression y=sin(x) --range x=0:6.28 --format png --output chart.png

# Tests
- Unit tests for plot generation:
  - Verify svg output string begins with `<svg`.
  - Verify png buffer starts with PNG signature bytes (0x89 0x50 0x4E 0x47).
  - Test error is thrown for unsupported image format.
- Integration tests:
  - CLI invocation with --format svg writes a valid .svg file with expected tags.
  - CLI invocation with --format png writes a .png file whose first bytes match the PNG signature.

# Documentation
- Update USAGE.md with examples of svg and png outputs.
- Update README.md features list to include Plot Export with svg and png flags.