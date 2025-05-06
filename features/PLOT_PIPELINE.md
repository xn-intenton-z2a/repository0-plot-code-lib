# Overview

Fully implement plot rendering of time series data as SVG and PNG images, exposed via the CLI and programmatic API to fulfill the mission of becoming a go-to plot library.

# Dependencies

Add chartjs-node-canvas and its peer dependency canvas to the project manifest.

# Source File Updates

In src/lib/main.js

1. Import ChartJSNodeCanvas from chartjs-node-canvas.
2. Implement a new function renderPlot that accepts the data array and an options object containing width, height, axis labels, and format.
   - Instantiate ChartJSNodeCanvas with provided width and height.
   - Configure a line chart with labeled x and y axes and a single dataset mapping data points.
   - For svg format call renderToBuffer with mimeType image svg xml and convert the buffer to a UTF-8 string.
   - For png format call renderToBuffer with mimeType image png and return the binary buffer.
3. Extend main to handle the plot-format flag:
   - After generating the time series data, if plot-format is specified, invoke renderPlot with data and options defaulting to 800 by 600.
   - Write the svg string or png buffer to the output file path or to stdout in binary mode.
   - Return exit code zero on success and nonzero on errors.

# Tests

In tests/unit/plot-generation.test.js

- Add unit tests for renderPlot:
  - Stub ChartJSNodeCanvas to simulate rendering and assert that the returned svg string starts with an svg element and png buffer begins with the PNG signature bytes.
- Add CLI integration tests:
  - Simulate the plot-format flag for svg and png formats with stubs for file writes or stdout and verify output and exit codes.
- Add error handling tests when rendering fails or an unsupported plot-format value is provided.

# Documentation

Update README.md and USAGE.md

- Document installing chartjs-node-canvas and canvas.
- Provide CLI examples generating svg and png plots to files and stdout.
- Update programmatic API section with examples showing how to invoke renderPlot directly.