# Overview

Add the ability to render time series data as SVG or PNG images using ChartJSNodeCanvas. Introduce a renderPlot function and corresponding CLI flags to output charts in the desired format directly from the library.

# Implementation

- Update package.json dependencies to include chart.js and chartjs-node-canvas.
- In src/lib/main.js:
  - Import ChartJSNodeCanvas from chartjs-node-canvas.
  - Implement an async function renderPlot(dataPoints, options) that:
    - Creates a ChartJSNodeCanvas instance with options.width and options.height.
    - Builds a Chart.js configuration object using dataPoints as labels and dataset.
    - Calls renderToBuffer on the ChartJSNodeCanvas instance to get an image buffer.
    - Writes the buffer to the file specified by options.outputFile.
  - Extend argument parsing in main() with zod to support:
    - --output-file PATH (required)
    - --format svg or png (default svg)
    - --width NUMBER (default 800)
    - --height NUMBER (default 600)
  - After generating or receiving time series data, invoke renderPlot with the parsed options.

# Testing

- Create tests/unit/plot-rendering.test.js:
  - Generate a small sample dataset.
  - Call renderPlot with format svg and png, writing to temporary files.
  - Assert that output files exist and that the first bytes of each file match the expected SVG signature or PNG header.
  - Clean up temporary files after each test.

# Documentation

- Update USAGE.md:
  - Add a new section "Rendering Plots" with example invocations:
    repository0-plot-code-lib --expression "y=2*x+1" --range x=0:10 --output-file chart.svg --format svg
    repository0-plot-code-lib --expression "y=sin(x)" --range x=0:6.28 --output-file chart.png --format png --width 1024 --height 768
- Update README.md:
  - Document the renderPlot API export and CLI flags for output-file, format, width, and height.
