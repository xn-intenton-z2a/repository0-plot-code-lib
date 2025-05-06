# Overview
Implement full SVG and PNG rendering in renderPlot using ChartJSNodeCanvas and expose these capabilities via both the CLI and programmatic API. Remove the existing stub and ensure clear error handling for unsupported formats.

# Source File Updates
In src/lib/main.js
1  In renderPlot, instantiate ChartJSNodeCanvas with width, height, and transparent background. Build a Chart configuration object:
   type: line
   labels from data x values
   dataset of y values with borderColor set to blue and no fill
   apply axis titles when options.labels.x or options.labels.y are provided
2  Determine mimeType based on options.format: svg maps to image/svg+xml, png maps to image/png. Throw an error for unsupported formats.
3  Call ChartJSNodeCanvas.renderToBuffer with the configuration and mimeType. If format is svg, convert the Buffer to a utf8 string and return it; if png, return the Buffer directly.
4  In the CLI main function, add options --width (number), --height (number), --label-x (string), and --label-y (string), and continue using --plot-format. When argv.plot-format is set, await renderPlot with data and options.
5  For svg results, write to a file with fs.writeFileSync when --output is provided or console.log for stdout. For png results, write to a file with fs.writeFileSync when --output is provided or process.stdout.write for stdout.
6  Catch errors from renderPlot, print the error message to stderr, and return exit code 1. Return exit code 0 on successful render and write.

# Tests
In tests/unit/plot-generation.test.js
• Stub ChartJSNodeCanvas.renderToBuffer to return a Buffer containing an SVG string; assert renderPlot returns a string starting with <svg.
• Stub ChartJSNodeCanvas.renderToBuffer to return a Buffer with PNG signature bytes; assert renderPlot returns a Buffer object whose first bytes match the PNG header.
• Test that renderPlot throws an error for unsupported format values when called directly.
• Add CLI integration tests by mocking renderPlot:
  - For svg, stub fs.writeFileSync and console.log to verify correct output when --plot-format svg with and without --output.
  - For png, stub fs.writeFileSync and process.stdout.write to verify correct output when --plot-format png with and without --output.
  - Verify that invalid --plot-format yields a non-zero exit code and that an error is printed to stderr.

# Documentation
Update README.md and USAGE.md
• Document --plot-format values svg and png.
• Document new options --width, --height, --label-x, and --label-y with their descriptions and default behavior.
• Provide CLI examples for generating SVG and PNG plots to file and stdout with custom dimensions and labels.
• Extend the Programmatic API section to illustrate calling renderPlot and handling the returned SVG string or PNG buffer.
• Update feature list to reflect full implementation of plot rendering.