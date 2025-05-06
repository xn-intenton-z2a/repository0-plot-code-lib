# Overview

Fully implement the plot rendering pipeline so that users can generate SVG and PNG images from time series data via both the CLI and programmatic API. Replace the current stub with a working integration of ChartJSNodeCanvas.

# Source File Updates

In src/lib/main.js

1. Implement renderPlot:
   • Instantiate ChartJSNodeCanvas with options.width and options.height or default to 800 and 600.
   • Construct a Chart.js configuration object of type line. Use data.x values as labels and map each data point to its dataset. Apply axis labels from options.labels.x and options.labels.y if provided.
   • If options.format equals svg, call chartJSNodeCanvas.renderToBuffer({ mimeType: 'image/svg+xml' }) and return buffer.toString('utf8').
   • If options.format equals png, call chartJSNodeCanvas.renderToBuffer({ mimeType: 'image/png' }) and return the binary buffer.
   • Throw an error if format is unsupported.

2. Update main to handle --plot-format:
   • After generating data, detect argv['plot-format'].
   • Call await renderPlot(data, { width: argv.width, height: argv.height, format: argv['plot-format'], labels: argv.labels }).
   • Determine write target: if argv.output provided, use fs.writeFileSync. For svg write with utf8 encoding; for png write buffer without encoding.
   • If no output file, write to stdout: console.log for svg string; process.stdout.write for png buffer.
   • Return exit code zero on success or nonzero on errors.

# Tests

In tests/unit/plot-generation.test.js

• Add unit tests for renderPlot:
  – Stub ChartJSNodeCanvas.renderToBuffer to return a Buffer starting with <svg. Assert renderPlot returns a string beginning with <svg.
  – Stub renderToBuffer to return a Buffer whose first bytes match PNG signature. Assert renderPlot returns a Buffer with those bytes.
• Add CLI integration tests for --plot-format svg and --plot-format png:
  – Stub renderPlot to return known svg string or png buffer.
  – Spy on fs.writeFileSync and process.stdout.write to verify correct content and encoding are used.
  – Assert main returns exit code zero.
• Add test for unsupported plot-format:
  – Invoke main with --plot-format invalid. Assert exit code nonzero and error message printed.

# Documentation

Update README.md and USAGE.md

• Document the --plot-format flag with valid values svg and png, describe width, height, and labels options.
• Provide CLI examples for generating svg and png images to files and to stdout.
• Extend programmatic API section with an example of calling renderPlot directly and handling returned svg string or png buffer.
