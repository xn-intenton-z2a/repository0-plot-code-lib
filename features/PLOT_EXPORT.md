# PLOT_EXPORT

This feature enables the CLI to generate graphical plots from time-series data and save them as SVG or PNG files.

## Value

- Realizes the mission of producing visual representations of mathematical expressions.
- Provides users with ready-to-use image files for reports, presentations, or further analysis.
- Extends core functionality beyond raw data generation to include end-to-end plot creation.

## Behavior

1. Dependencies
   - Add chartjs-node-canvas and chart.js for rendering charts in Node.
   - Use builtin fs/promises for file I/O.

2. CLI Arguments
   - --expression (required): Mathematical expression as before.
   - --range (required): Numeric range definition as before.
   - --plotType (optional): Type of plot, one of line or scatter. Default is line.
   - --format (optional): Output image format, svg or png. Default is svg.
   - --output (optional): File path for the generated image. Default plot.svg or plot.png based on format.

3. Plot Generation Logic
   - Validate all flags with Zod schemas.
   - Reuse TIME_SERIES_GENERATION logic to produce an array of data points.
   - Initialize ChartJSCanvas with default dimensions (800x600).
   - Configure the dataset and chart options according to plotType.
   - Render the chart to the requested format buffer.
   - Write the buffer to disk at the output path.

4. Output
   - On success, print a message with the output file path.
   - On failure, print an error and exit with non-zero code.

## Implementation Changes

- src/lib/main.js: Import chartjs-node-canvas, chart.js, fs/promises, extend main to handle new flags and plotting logic.
- tests/unit/plot-export.test.js: Add tests to verify correct flag parsing, chart buffer generation, and file writing behavior (using mocks for fs).
- README.md: Update usage examples to include plot export commands and sample image outputs.
- package.json: Add chartjs-node-canvas and chart.js to dependencies.