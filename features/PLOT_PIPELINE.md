# Overview

Enhance the renderPlot pipeline to fully implement SVG and PNG output, add comprehensive unit and integration tests for both programmatic and CLI workflows, and update documentation with usage examples demonstrating rendering to files and stdout.

# Source File Updates

1. Implement the renderPlot function in src/lib/main.js:
   - Accept data array and options { width?: number, height?: number, format: string, labels?: { x: string, y: string } }.
   - Validate that format is either svg or png; throw an error for unsupported formats.
   - Instantiate ChartJSNodeCanvas with width and height (default to 800x600).
   - Build a Chart.js configuration for a line chart using data.x and data.y.
   - Render to buffer for png via chartJSNodeCanvas.renderToBuffer; for svg use renderToBuffer with { format: 'svg' } and convert buffer to string.
   - Return a Buffer for png and a string starting with <svg for svg.

2. Update CLI handling in main:
   - Replace the stub error for --plot-format with a call to renderPlot and handle output:
     • For svg: write string to file if --output provided, otherwise write to stdout as utf-8 text.
     • For png: write Buffer to file if --output provided, otherwise write to stdout in binary mode.
   - Ensure correct exit codes: 0 on success, 1 on errors.

# Tests

1. Unit tests for renderPlot in tests/unit/plot-generation.test.js:
   - Mock ChartJSNodeCanvas.prototype.renderToBuffer:: for format=png return a Buffer starting with PNG magic number; for svg return a Buffer containing an <svg> string.
   - Assert renderPlot returns a Buffer whose first bytes match the PNG magic number when format=png.
   - Assert renderPlot returns a string that begins with <svg when format=svg.
   - Test that renderPlot throws an error when given an unsupported format.

2. Integration tests for CLI plot output in tests/unit/plot-generation.test.js:
   - Spy on fs.writeFileSync and process.stdout.write to capture outputs.
   - Run main with --plot-format svg without --output and assert process.stdout.write is called with the SVG string.
   - Run main with --plot-format png and --output file.png and assert fs.writeFileSync is called with a Buffer containing the PNG magic number.
   - Verify that exit codes are 0 when rendering succeeds and 1 when errors occur.

# Documentation

1. Update USAGE.md:
   - Add examples for generating plot.svg and plot.png: show CLI commands with --plot-format, --width, --height, --label-x, --label-y, and sample output snippets.
   - Demonstrate writing to stdout versus writing to a file.

2. Update README.md:
   - Under Features and CLI Usage, include new plot examples illustrating both svg and png generation.
   - In Programmatic API section, show a complete example calling renderPlot with format, width, height, and labels, and handling the returned Buffer or string.

3. Ensure that documentation notes required dependencies (chartjs-node-canvas, canvas) and refers to the renderPlot API in the reference section.