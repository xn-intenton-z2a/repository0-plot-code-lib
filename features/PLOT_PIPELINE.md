# Overview
Implement full SVG and PNG plot rendering for time series data from the command line and programmatic API, replacing the stub in renderPlot and wiring through the main CLI entry. Add comprehensive unit and integration tests to validate output formats and behavior.

# Source File Updates
1. In src/lib/main.js implement renderPlot:
   - Accept data array and options: width (default 800), height (default 600), format (svg or png), labels with x and y axis labels.
   - Validate format value and throw error on unsupported formats.
   - Instantiate ChartJSNodeCanvas with width and height.
   - Build Chart.js configuration for a line chart using data.x and data.y and apply labels if provided.
   - For png: call renderToBuffer and return the resulting Buffer.
   - For svg: call renderToBuffer with {format:'svg'} and return buffer converted to UTF-8 string.
2. In main(args) replace the stubbed error path for --plot-format:
   - Invoke renderPlot with data and options parsed from flags (width, height, labels, format).
   - On success write Buffer or string to file if --output is provided, else write to stdout (binary for png, text for svg).
   - Use process.exit codes: return 0 on success, 1 on error.

# Tests
1. Unit tests in tests/unit/plot-generation.test.js:
   - Mock ChartJSNodeCanvas.prototype.renderToBuffer to return a Buffer starting with the PNG magic number for format png and a Buffer containing an <svg tag for format svg.
   - Test that renderPlot resolves with a Buffer whose first bytes match the PNG magic number for png and resolves with a string starting with <svg for svg.
   - Test that renderPlot rejects when given an unsupported format.
2. Integration tests in tests/unit/plot-generation.test.js:
   - Spy on fs.writeFileSync and process.stdout.write to capture output.
   - Run main with --expression, --range and --plot-format svg without --output and assert process.stdout.write is called once with the SVG string.
   - Run main with --plot-format png and --output file.png and assert fs.writeFileSync is called with a Buffer whose first bytes match the PNG magic number.
   - Verify that main returns exit code 0 on successful rendering and 1 when renderPlot throws.

# Documentation
1. Update USAGE.md:
   - Add CLI examples for generating plot.svg: repository0-plot-code-lib --expression "x^2" --range "x=0:10:1" --plot-format svg --output plot.svg
   - Add CLI examples for generating plot.png: repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.28:0.1" --plot-format png > plot.png
   - Include sample snippets of the SVG XML and a note about PNG binary output.
2. Update README.md:
   - Under Features and CLI Usage add new entries for SVG and PNG plot generation with command examples and expected behavior.
   - In Programmatic API section provide example calling renderPlot with options for format, width, height, labels and handling the returned Buffer or string.
   - Note dependencies on chartjs-node-canvas and canvas and link to renderPlot API reference.