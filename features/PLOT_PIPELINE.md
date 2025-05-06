# Overview

Enhance the renderPlot pipeline to fully implement SVG and PNG output and add comprehensive unit and integration tests. Update documentation with usage examples demonstrating both CLI and programmatic rendering workflows.

# Source File Updates

1. Implement renderPlot function:
   - Accept data array and options { width, height, format, labels }.
   - Validate that format is either svg or png; throw an error for unsupported formats.
   - Instantiate ChartJSNodeCanvas with the given width and height (fallback to defaults 800x600).
   - Construct a ChartJS configuration with type 'line', supplying data.x and data.y arrays.
   - Apply labels for x and y axes if provided in options.labels.
   - Call chartJSNodeCanvas.renderToBuffer for png or renderToBuffer with { format: 'svg' } and convert buffer to string for svg.
   - Return a Buffer for png and a string starting with <svg for svg.
2. Update CLI handling in main:
   - Replace stub error for --plot-format with a call to renderPlot and write output:
     • For svg: if --output is provided, write string to file; else write to stdout.
     • For png: write Buffer to file or stdout with appropriate binary encoding.
   - Ensure exit code 0 on successful rendering and 1 on errors.

# Tests

1. Unit tests for renderPlot:
   - Stub ChartJSNodeCanvas.prototype.renderToBuffer to return a Buffer containing PNG magic number for png and a Buffer of an SVG string for svg.
   - Assert renderPlot returns Buffer whose first bytes match PNG magic number when format=png.
   - Assert renderPlot returns a string starting with <svg when format=svg.
   - Test that calling renderPlot with unsupported format throws an error.
2. Integration tests for CLI plot output:
   - Mock fs.writeFileSync and process.stdout.write to capture outputs.
   - Run main with --plot-format svg without --output and assert process.stdout.write is called with SVG string.
   - Run main with --plot-format png and --output file.png and assert fs.writeFileSync is called with a Buffer containing the PNG magic number.
   - Verify exit codes 0 on success.

# Documentation

1. Update USAGE.md with examples for generating plot.svg and plot.png using --plot-format, --width, --height, --label-x, and --label-y options. Show sample SVG snippet and note PNG magic number prefix.
2. Update README.md under Features and CLI Usage to include new plot examples and a programmatic example calling renderPlot for both svg and png formats, demonstrating width, height and labels configuration.