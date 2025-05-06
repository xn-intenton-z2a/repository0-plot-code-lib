# Overview
Fully implement the plot rendering pipeline so that users can generate SVG and PNG images from time series data using ChartJSNodeCanvas. Remove the stub and provide a working implementation accessible via both the CLI and the programmatic API. Ensure seamless handling of output to stdout or file targets and clear errors for unsupported formats.

# Source File Updates
In src/lib/main.js

1  Implement renderPlot function
   - Instantiate ChartJSNodeCanvas with options width, height, backgroundColour transparent
   - Build a Chart configuration object with type line, labels from data x values, dataset of y values, borderColor blue, no fill
   - Configure scale titles when options.labels.x or options.labels.y are provided
   - Determine mimeType based on options.format svg maps to image svg+xml, png maps to image png, throw error if format unsupported
   - Call renderToBuffer with config and mimeType
   - If format svg return buffer converted to utf8 string, if png return Buffer

2  Extend CLI main implementation
   - In yargs setup add options --width number, --height number, --label-x string, --label-y string
   - After generateTimeSeries, when argv plot-format is set call renderPlot with data and options object
   - Capture result promise, await renderPlot
   - For svg result as string write to fs.writeFileSync when output provided or console.log when no output
   - For png result as Buffer write to fs.writeFileSync when output provided or process.stdout.write when no output
   - Catch errors thrown by renderPlot, print error message to stderr and return non-zero exit code
   - Return exit code zero on successful write

3  Remove the existing stub error in renderPlot and the placeholder in CLI that prints unimplemented

# Tests
In tests/unit/plot-generation.test.js

- Add unit tests for renderPlot implementation
  - Stub ChartJSNodeCanvas.renderToBuffer to return a Buffer containing an SVG string and assert that renderPlot returns a string starting with <svg
  - Stub ChartJSNodeCanvas.renderToBuffer to return a Buffer starting with PNG header and assert that renderPlot returns a Buffer
  - Test renderPlot throws an error for unsupported format values

- Add CLI integration tests
  - Mock renderPlot to return predefined SVG string and stub fs.writeFileSync and console.log to verify correct output for --plot-format svg with and without --output
  - Mock renderPlot to return PNG buffer and stub fs.writeFileSync and process.stdout.write to verify correct output for --plot-format png with and without --output
  - Test that invalid --plot-format yields non-zero exit code and prints an error to stderr

# Documentation
Update README.md and USAGE.md

- Document --plot-format flag valid values svg and png
- Document new options --width, --height, --label-x, --label-y with descriptions and default behaviors
- Provide CLI examples for generating SVG and PNG to file and to stdout with custom dimensions and labels
- Extend programmatic API section to illustrate calling renderPlot and handling returned SVG string or PNG buffer