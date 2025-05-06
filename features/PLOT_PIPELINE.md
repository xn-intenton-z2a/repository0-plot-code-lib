# Overview
Fully implement plot rendering of time series data as SVG and PNG images via both the CLI and the programmatic API to meet the mission of a go-to formula visualisation tool.

# Dependencies
Add chartjs-node-canvas and its peer dependency canvas to the project manifest to enable server-side rendering of charts.

# Source File Updates
In src/lib/main.js
1. In renderPlot, instantiate ChartJSNodeCanvas using options.width and options.height or default to 800 and 600.
2. Configure a line chart dataset mapping each data point's x and y values, and apply axis labels from options.labels if provided.
3. For svg format call renderToBuffer with mimeType image/svg+xml and return the buffer converted to a UTF-8 string.
4. For png format call renderToBuffer with mimeType image/png and return the raw binary buffer.
5. In main, detect the --plot-format flag. If present, invoke renderPlot with the generated data and write the returned svg string or png buffer to the output file path using fs.writeFileSync or to stdout in the correct encoding, then return exit code zero on success and nonzero on errors.

# Tests
In tests/unit/plot-generation.test.js
• Add unit tests for renderPlot by stubbing ChartJSNodeCanvas.renderToBuffer to return a known buffer; assert that svg output is a string starting with <svg and png output is a Buffer starting with the PNG signature bytes.
• Add CLI integration tests for --plot-format svg and --plot-format png, stubbing fs.writeFileSync and process.stdout.write to verify that the correct content is emitted and exit code is zero.
• Add tests to verify that passing an unsupported plot-format value yields a nonzero exit code and an appropriate error message.

# Documentation
Update README.md and USAGE.md
• Document the --plot-format option with valid values svg and png.
• Provide CLI examples for generating and saving svg and png plots to files and to stdout.
• Extend the programmatic API section with an example demonstrating how to call renderPlot directly and handle its returned svg string or png buffer.