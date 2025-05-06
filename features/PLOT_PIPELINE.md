# Overview
Enhance the renderPlot functionality by providing a complete implementation for SVG and PNG output, adding comprehensive unit and integration tests, and updating user documentation with concrete rendering examples.

# Source File Updates
1. Implement renderPlot in src/lib/main.js:
   - Accept data array and options object (format, width, height, labels).
   - Instantiate ChartJSNodeCanvas with provided width and height.
   - Build a line chart configuration using time series data, mapping x and y values and applying axis labels.
   - For format png, call renderToBuffer and return the resulting Buffer.
   - For format svg, call renderToBuffer with type svg or use renderToStream to obtain a string starting with <svg and return the string.
   - Throw an error for unsupported formats.
2. Update the CLI entrypoint (main function):
   - When --plot-format is provided, call renderPlot with parsed data and options.
   - If --output is specified, write the Buffer or string to the given file path using fs.writeFileSync.
   - If no --output, write svg string to process.stdout.write or pipe png Buffer to stdout and return exit code 0.
   - Catch errors from renderPlot, write error.message to stderr, and return exit code 1.

# Tests
1. Unit tests for renderPlot (tests/unit/plot-render.test.js):
   - Mock ChartJSNodeCanvas.prototype.renderToBuffer to return a Buffer beginning with PNG magic bytes when format png is requested.
   - Mock ChartJSNodeCanvas.prototype.renderToBuffer or stream output to return a string containing an <svg tag when format svg is requested.
   - Test that renderPlot resolves with a Buffer for png and a string for svg.
   - Test that renderPlot rejects with an error when requesting an unsupported format.
2. Integration tests in tests/unit/plot-generation.test.js (extend existing file):
   - Spy on process.stdout.write and fs.writeFileSync.
   - Run main with --plot-format svg without --output: assert stdout.write is called once with the svg string and exit code 0.
   - Run main with --plot-format png and --output plot.png: assert fs.writeFileSync is called with plot.png and a Buffer whose first bytes match the PNG magic number and exit code 0.
   - Simulate renderPlot throwing an error: verify main returns exit code 1 and writes the error message to stderr.

# Documentation
1. USAGE.md:
   - Add CLI example for svg rendering showing invocation with --plot-format svg and sample svg snippet beginning with <svg.
   - Add CLI example for png rendering showing redirection of binary output (> plot.png) and note that the file contains PNG data.
2. README.md:
   - Under Features, add an entry describing SVG and PNG plot rendering via --plot-format with example commands.
   - In Programmatic API, provide example code calling renderPlot with format svg and format png and handling the returned string or Buffer.
   - Link to the renderPlot API reference in the documentation section.