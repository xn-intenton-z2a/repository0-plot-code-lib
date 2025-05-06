# Overview

Fully implement plot rendering pipeline to generate SVG and PNG images from time series data via the CLI and programmatic API.

# Source File Updates

In src/lib/main.js

1. Implement renderPlot
   - Instantiate ChartJSNodeCanvas with width and height from options or defaults of 800 by 600
   - Build a line chart configuration using data points: data.x as labels and data.y as a single dataset
   - Apply axis labels when options.labels.x or options.labels.y are provided
   - If options.format is svg call renderToBuffer with mimeType image/svg+xml, convert buffer to utf8 string and return
   - If options.format is png call renderToBuffer with mimeType image/png and return the buffer
   - Throw an error for unsupported formats

2. Update main to handle plot-format
   - Add --plot-format option with choices svg and png
   - After generating data, if plot-format is provided call renderPlot with data and options including width height and labels
   - If output file path is provided write svg string using fs.writeFileSync with utf8 encoding or write png buffer
   - If no output call console.log for svg or process.stdout.write for png
   - Return exit code zero on success or non-zero on error

# Tests

In tests/unit/plot-generation.test.js

- Stub ChartJSNodeCanvas.renderToBuffer to return an svg buffer and assert renderPlot returns a string starting with <svg
- Stub renderToBuffer to return a png buffer and assert renderPlot returns a buffer with png signature
- Add CLI integration tests for plot-format svg and png by mocking renderPlot, spying on fs.writeFileSync and process.stdout.write to verify correct content and encoding
- Test unsupported plot-format yields exit code non-zero and prints error to stderr

# Documentation

Update README.md and USAGE.md

- Document --plot-format flag with valid values svg and png
- Describe width height and labels options
- Provide CLI examples for generating svg and png images to file and to stdout
- Extend programmatic API section with an example of calling renderPlot directly and handling svg string or png buffer