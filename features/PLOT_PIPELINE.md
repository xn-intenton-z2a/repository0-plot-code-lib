# Overview

Fully implement the plot rendering pipeline so that users can generate SVG and PNG images from time series data using ChartJSNodeCanvas. Remove the stub and provide a working implementation accessible via both the CLI and programmatic API.

# Source File Updates

In src/lib/main.js

1. Update renderPlot to perform actual rendering:
   - Create a ChartJSNodeCanvas instance with options { width: options.width || 800, height: options.height || 600, backgroundColour: 'transparent' }.
   - Build a Chart.js configuration object:
     - type: 'line'
     - data: { labels: data.map(p => p.x), datasets: [{ label: options.labels?.y || 'Series', data: data.map(p => p.y), fill: false, borderColor: 'blue' }] }
     - options: { scales: { x: { title: { display: Boolean(options.labels?.x), text: options.labels?.x } }, y: { title: { display: Boolean(options.labels?.y), text: options.labels?.y } } } }
   - Determine mimeType based on options.format ('image/svg+xml' or 'image/png'), throw an error if format is unsupported.
   - Call renderToBuffer(config, mimeType) and return the resulting Buffer or string (buffer.toString('utf-8') for SVG).

2. In main, replace the stubbed error for plot-format:
   - After generateTimeSeries, if argv['plot-format'] is set:
     • Call renderPlot(data, { format: argv['plot-format'], width: argv.width, height: argv.height, labels: { x: argv['labels']?.x, y: argv['labels']?.y } }).
     • Capture the result:
       - If format is svg and output path provided, write string to fs.writeFileSync with 'utf-8'; if no output, console.log the SVG string.
       - If format is png and output path provided, write buffer to fs.writeFileSync; if no output, process.stdout.write the buffer.
     • Return exit code zero on success and non-zero for errors thrown by renderPlot.

3. Extend yargs to parse optional width, height, labels.x, labels.y for plot rendering:
   - Add options: --width (number), --height (number), --label-x (string), --label-y (string).

# Tests

In tests/unit/plot-generation.test.js

- Add unit tests for renderPlot:
  • Stub ChartJSNodeCanvas.renderToBuffer to return a Buffer containing an SVG string and assert that renderPlot returns a string starting with '<svg'.
  • Stub renderToBuffer to return a Buffer whose first bytes match the PNG signature and assert renderPlot returns a Buffer.
  • Test that renderPlot throws an error for unsupported format values.

- Add CLI integration tests for plot-format:
  • Mock renderPlot to return a predefined SVG string, stub fs.writeFileSync and console.log to verify CLI writes or logs correctly when --plot-format svg is used.
  • Mock renderPlot to return a PNG buffer, stub fs.writeFileSync and process.stdout.write to verify CLI writes correctly when --plot-format png is used.
  • Test that providing an invalid --plot-format yields exit code non-zero and prints an error to stderr.

# Documentation

Update README.md and USAGE.md

- Document --plot-format flag and its valid values svg and png, plus new options --width, --height, --label-x, --label-y.
- Provide CLI examples:
  • Generating an SVG with axis labels and custom dimensions to a file and to stdout.
  • Generating a PNG image with custom dimensions.
- Extend programmatic API section with an example showing how to call renderPlot with format, width, height, and labels, and how to handle the returned SVG string or PNG buffer.