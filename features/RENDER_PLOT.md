# RENDER_PLOT

# Overview
Enhance the existing plotting library and CLI to produce high-fidelity SVG and PNG charts using ChartJSNodeCanvas. Maintain backward-compatible API semantics, support JSON input, and integrate a new `plot` subcommand that reads data, renders charts, and writes output files or streams.

# Implementation Details

## Dependencies
Add the following to package.json dependencies:
- chart.js
- chartjs-node-canvas

## Library Changes in src/lib/main.js
1. Import:
   import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
   import { Chart } from 'chart.js';
2. Implement async function renderPlot(data, options):
   - Accept a Chart.js config or build one from data.labels, data.series, options.type.
   - Read options.format (svg or png), options.size (width, height), and backgroundColour.
   - Instantiate ChartJSNodeCanvas with width, height, backgroundColour.
   - Call renderToBuffer to generate Buffer:
     - For SVG: renderToBuffer(config, 'svg'), convert to string before returning or writing.
     - For PNG: renderToBuffer(config).
   - If options.output is provided, write result to file with fs.promises.writeFile; otherwise return result (string for SVG, Buffer for PNG).

## CLI Integration
Extend main(args) in src/lib/main.js to detect `plot` command:
- Flags:
  --input <jsonFile>    Path to JSON data input
  --format <svg|png>    Output format (default svg)
  --type <line|bar>     Chart type
  --size <WxH>          Width and height in pixels
  --background <hex>    Canvas background colour
  --output <path>       File path for output (default stdout)
- Parse flags, load JSON input, call renderPlot, and write to stdout or file.
- Exit with code 0 on success, non-zero on invalid args or render failures.

# Documentation Updates
Update README.md:
- Document renderPlot API signature with parameters and return values.
- Add CLI usage examples:
  repository0-plot-code-lib plot --input data.json --format png --type bar --size 800x600 --output chart.png
- Note added dependencies on chart.js and chartjs-node-canvas.

# Testing
Modify or add tests under tests/unit:
- tests/unit/plot-rendering.test.js:
  - Mock ChartJSNodeCanvas to verify instantiation with correct width, height, backgroundColour.
  - Test renderPlot returns a string starting with `<svg` when format is svg.
  - Test renderPlot returns a Buffer with PNG signature when format is png.
- tests/unit/plot-cli.test.js:
  - Invoke main with plot flags and a temporary JSON file.
  - Verify output file is created with expected content via fs.promises.readFile.
  - Simulate errors in writeFile to confirm error reporting and exit codes.
