# Overview
Implement the previously stubbed renderPlot function using ChartJSNodeCanvas to produce SVG and PNG outputs and integrate it fully into the CLI. Ensure that users can generate image files or write directly to stdout for both formats, with configurable dimensions and axis labels.

# Source File Updates
1. In renderPlot(data, options) replace the stub with a real implementation:
   - Destructure width (default 800), height (default 600), format ('svg' or 'png'), and labels (default { x: 'x', y: 'y' }) from options.
   - Instantiate ChartJSNodeCanvas with { width, height, chartCallback }.
   - Build a Chart.js configuration with type 'line', datasets containing the data series, and axis labels from options.labels.
   - If format is 'svg', call chartCanvas.renderToBuffer({ width, height, format: 'svg' }) and convert the Buffer to UTF-8 string before returning.
   - If format is 'png', call chartCanvas.renderToBuffer({ width, height, format: 'png' }) and return the Buffer.
   - Throw an error for unsupported format values.
2. In the main CLI entrypoint:
   - Detect the --plot-format flag and await renderPlot(data, { format: plotFormat, width: argv.width, height: argv.height, labels: { x: argv['label-x'], y: argv['label-y'] } }).
   - If --output is provided, write the returned Buffer or string to the given filename with fs.writeFileSync or fs.writeFileSync with utf-8 for SVG.
   - If no --output, write binary Buffers to process.stdout.write or console.log the SVG string.
   - Add CLI options --width, --height, --label-x, --label-y with appropriate types and defaults.

# Tests
1. Unit tests for renderPlot:
   - Stub ChartJSNodeCanvas.prototype.renderToBuffer to return a Buffer for 'png' and a Buffer containing an SVG string for 'svg'.
   - Verify renderPlot returns a Buffer for PNG and a string starting with '<svg' for SVG.
   - Verify error is thrown for an unsupported format.
2. Integration tests for the CLI:
   - Mock fs.writeFileSync and process.stdout.write to capture outputs when using --plot-format png and --plot-format svg with and without --output.
   - Verify that a PNG buffer is written with the correct PNG magic number and that an SVG string containing axis labels appears in the output.

# Documentation
1. Update USAGE.md:
   - Add examples showing --plot-format png and --plot-format svg with --width, --height, --label-x, --label-y and either --output or piping to stdout.
   - Show sample SVG snippet and note PNG magic number verification.
2. Update README.md under Features and CLI Usage to include new options --width, --height, --label-x, --label-y, and illustrate programmatic use of renderPlot returning PNG buffer or SVG string.