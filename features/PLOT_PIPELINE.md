# Overview

Add unit and integration tests for renderPlot function covering SVG and PNG output and update documentation with rendering examples.

# Tests

1. Unit tests for renderPlot
   - Stub ChartJSNodeCanvas.prototype.renderToBuffer to return a Buffer for png format and a Buffer containing an SVG string for svg format.
   - Assert renderPlot returns a string starting with <svg for svg and a Buffer whose first bytes match the PNG magic number for png.
   - Verify that calling renderPlot with an unsupported format throws an error.

2. Integration tests for CLI plot output
   - Mock fs.writeFileSync and process.stdout.write to capture outputs.
   - Run main with --plot-format svg and without --output and assert that process.stdout.write is called with the SVG string.
   - Run main with --plot-format png and --output file.png and assert that fs.writeFileSync is called with a Buffer starting with the PNG magic number.

# Documentation

1. Update USAGE.md with examples for generating plot.svg and plot.png using --plot-format, --width, --height, --label-x, and --label-y options. Include a snippet of the SVG and note the PNG magic number.

2. Update README.md under Features and CLI Usage to include the new plot examples and a programmatic example calling renderPlot for both svg and png formats.