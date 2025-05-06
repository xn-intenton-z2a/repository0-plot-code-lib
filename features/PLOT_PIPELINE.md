# Overview
Implement full plot rendering for single and multiple series in SVG and PNG formats via both CLI and programmatic API. Remove stub and provide complete ChartJSNodeCanvas integration, color palette, axis labels, and error handling.

# Source File Updates
In src/lib/main.js
1. Remove the stubbed renderPlot implementation and replace with:
   • Initialize ChartJSNodeCanvas with given width, height, and transparent background.
   • Accept an array of series objects when called programmatically: for CLI convert single series data into array.
   • Build chart configuration: type line, labels from sorted unique x values across series, datasets for each series including data mapping, label, distinct borderColor from a predefined palette, fill set to false.
   • Set axis title labels from options.labels if provided.
   • Based on options.format select mimeType image/svg+xml or image/png; throw error for unsupported formats.
   • Call renderToBuffer and return Buffer for PNG or utf8 string for SVG.
2. In main():
   • After generating data, if argv['plot-format'] is set, call renderPlot with data array wrapped as one or more series objects. Use repeatable --expression and --range for multiple series: map each expression and range to a series entry before parsing and generation.
   • Write output to file if --output provided, using fs.writeFileSync for SVG and process.stdout.write for PNG Buffer, or console.log for SVG string.
   • On error print to stderr and return exit code 1.

# Tests
In tests/unit/plot-generation.test.js
• Update existing tests to remove stub expectations and stub ChartJSNodeCanvas.renderToBuffer instead of error.
• Add test for single series: stub renderToBuffer, call renderPlot with one series data and verify buffer or string returned and configuration passed matches input.
• Add CLI integration tests for svg and png outputs: mock fs write or stdout.write and run main() with --expression and --range and --plot-format and confirm correct write behavior.

# Documentation
Update README.md and USAGE.md
• Document full support for --plot-format svg and png with repeatable --expression and --range options.
• Provide examples for single series and multiple series plots in both SVG and PNG, showing file output and stdout usage.
• Show programmatic API usage: constructing series array and calling renderPlot with labels, width, height, and format.
