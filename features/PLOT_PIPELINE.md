# Overview
Fully implement the plot rendering pipeline so that users can generate SVG and PNG images from time series data using ChartJSNodeCanvas. Remove the stub and provide a working implementation accessible via both the CLI and the programmatic API. Ensure clear error handling for unsupported formats.

# Source File Updates
In src/lib/main.js
1  Implement renderPlot function
   - Instantiate ChartJSNodeCanvas with width, height and transparent background
   - Build a Chart configuration object: type line, labels from data x values, a dataset of y values with borderColor blue and no fill
   - Apply axis titles when options.labels.x or options.labels.y are provided
   - Determine mimeType based on options.format where svg maps to image/svg+xml and png maps to image/png
   - Call renderToBuffer with configuration and mimeType
   - If format is svg return buffer converted to utf8 string, if png return the Buffer
2  Extend CLI main implementation
   - Add options --width number, --height number, --label-x string, --label-y string alongside existing plot-format flag
   - When argv.plot-format is set, await renderPlot with data and options
   - For svg result write to fs.writeFileSync when --output is provided or console.log for stdout
   - For png result write to fs.writeFileSync when --output is provided or process.stdout.write for stdout
   - Catch errors, print message to stderr and return exit code 1
   - Return exit code 0 on successful write
3  Remove the existing stub error in renderPlot and placeholder in CLI

# Tests
In tests/unit/plot-generation.test.js
• Add unit tests for renderPlot
  - Stub ChartJSNodeCanvas.renderToBuffer to return a Buffer containing an SVG string; assert renderPlot returns a string starting with <svg
  - Stub ChartJSNodeCanvas.renderToBuffer to return a Buffer starting with PNG header bytes; assert renderPlot returns a Buffer object
  - Test that renderPlot throws an error for unsupported format values
• Add CLI integration tests
  - Mock renderPlot to return a predefined SVG string; stub fs.writeFileSync and console.log and verify correct output when --plot-format svg with and without --output
  - Mock renderPlot to return a PNG buffer; stub fs.writeFileSync and process.stdout.write and verify correct output when --plot-format png with and without --output
  - Ensure invalid --plot-format yields a non-zero exit code and an error printed to stderr

# Documentation
Update README.md and USAGE.md
• Document the --plot-format flag valid values svg and png
• Document new options --width, --height, --label-x, --label-y with descriptions and default behaviors
• Provide CLI examples for generating SVG and PNG plots to file and stdout with custom dimensions and labels
• Extend the Programmatic API section to illustrate calling renderPlot and handling the returned SVG string or PNG buffer
• Update the features list to reflect full implementation of plot rendering