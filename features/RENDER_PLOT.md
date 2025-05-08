# Overview

Enhance renderPlot to leverage ChartJSNodeCanvas for reliable, high-fidelity SVG and PNG chart rendering. Maintain existing API semantics and CLI integration while replacing the custom EJS-based SVG builder and sharp conversion with ChartJSNodeCanvas for consistency and performance.

# Implementation Details

1. Dependencies
   - Add chart.js and chartjs-node-canvas to dependencies in package.json.

2. Library Changes in src/lib/main.js
   - Import ChartJSNodeCanvas from chartjs-node-canvas and Chart from chart.js.
   - Define an async function renderPlot(data, options) that:
     - Accepts a Chart.js configuration object or constructs one from data.series, data.labels, and options.type.
     - Reads options.format (svg or png), options.size.width, options.size.height, and backgroundColor.
     - Instantiates ChartJSNodeCanvas with width, height, and background colour:
       const canvas = new ChartJSNodeCanvas({ width, height, backgroundColour });
     - For SVG output, call canvas.renderToBuffer(configuration, 'svg') to obtain a Buffer containing SVG content.
       Convert buffer to UTF-8 string before returning or writing to file.
     - For PNG output, call canvas.renderToBuffer(configuration) to obtain a PNG Buffer.
     - If options.output is provided, write the result to the specified file path using fs.promises.writeFile; otherwise return the result (string for SVG, Buffer for PNG).

3. CLI Integration
   - Extend main(args) to detect "plot" command:
       repository0-plot-code-lib plot --input <jsonFile> --format svg|png --type line|bar --size WxH --output <path>
   - Parse flags for input path, format, chart type, size, and output.
   - Load JSON data, call renderPlot, and write to stdout or file as specified.
   - Provide clear error messages for invalid arguments or rendering failures, exiting with non-zero code.

4. Documentation Updates in README.md
   - Document the renderPlot API signature and options.
   - Add CLI usage examples for generating plot.svg and plot.png.
   - Note dependencies on chart.js and chartjs-node-canvas.

# Testing

- tests/unit/plot-rendering.test.js
  - Mock ChartJSNodeCanvas to verify correct instantiation parameters (width, height, backgroundColour).
  - Test renderPlot returns a string starting with '<svg' when format is svg.
  - Test renderPlot returns a Buffer whose first bytes match PNG signature when format is png.
  - Simulate writeFile errors to confirm CLI error reporting and exit codes.

- tests/unit/plot-cli.test.js (new)
  - Execute main(["plot", "--input", <data>, "--format", "png", "--size", "400x300", "--output", <path>])
  - Verify output file is created with expected content via fs.promises.readFile.
