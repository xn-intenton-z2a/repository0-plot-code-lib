# Overview
Implement a complete plot rendering pipeline to produce both SVG and PNG outputs from time series data. Replace the existing stubbed renderPlot function with a ChartJSNodeCanvas integration, support single and multiple series, configurable dimensions and axis labels, and robust error handling. Ensure CLI and programmatic interfaces generate and write plots correctly.

# Source File Updates
1. In src/lib/main.js remove the stub in renderPlot and implement:
   • Initialize ChartJSNodeCanvas with provided width, height, and transparent background.  
   • Accept an array of series objects, each with name, data points, and optional color.  
   • Build a ChartJS configuration of type line with datasets for each series, axis title labels from options.labels, and distinct borderColor from a predefined palette.  
   • Choose mimeType based on options.format (image/svg+xml or image/png). Throw an error for unsupported formats.  
   • Call renderToBuffer to obtain a Buffer for PNG or await renderToBuffer then convert to utf8 string for SVG. Return the result.
2. In the main() function:
   • When --plot-format is provided, wrap generated data into a series array using repeatable --expression and --range options.  
   • Call renderPlot with data array and options including width, height, format, and labels.  
   • Write outputs: for SVG write string via fs.writeFileSync or console.log; for PNG write Buffer via fs.writeFileSync or process.stdout.write.  
   • On errors print to stderr and return exit code 1, otherwise exit 0.

# Tests
1. Unit Tests (tests/unit/plot-generation.test.js):
   • Stub ChartJSNodeCanvas.prototype.renderToBuffer and test renderPlot returns a Buffer for png and a string starting with <svg for svg.  
   • Verify configuration passed to the stub matches provided data, dimensions, labels, and format.  
   • Test error is thrown for unsupported format and missing options.
2. Integration Tests (new file tests/unit/plot-integration.test.js):
   • CLI invocation with --plot-format svg: mock fs.writeFileSync or console.log to capture output, assert output begins with <svg and contains axis titles.  
   • CLI invocation with --plot-format png: mock fs.writeFileSync or stdout.write, capture Buffer, assert first bytes match PNG magic number.  
   • Test writing to file and to stdout for both svg and png formats using realistic command-line arguments.
3. Confirm existing parse, range, time series, and JSON/NDJSON tests continue to pass without regression.

# Documentation Updates
1. USAGE.md: add CLI examples for generating svg and png plots, showing commands and sample truncated output for both file and stdout usage.  
2. README.md: update Features section to reflect full SVG/PNG support, include code snippets under Programmatic API for calling renderPlot, handling returned Buffer or string, and writing output.  
3. Include a note on error handling and supported mime types in both README.md and USAGE.md.