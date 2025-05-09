# Overview
Enhance the render-plot subcommand to use ChartJSNodeCanvas for full SVG and PNG output. Provide a consistent library API and CLI interface that allows users to generate charts programmatically or via the command line.

# CLI Usage
repository0-plot-code-lib render-plot --input <data.json> [--format svg|png] [--type <chartType>] [--width <px>] [--height <px>] [--background <color>] [--output <file>]

Options:
--input, -i       Path to a JSON file containing chart data and optional chart options.
--format, -f      Output format: svg (default) or png.
--type, -t        Chart type: line, bar, pie, radar, etc. (default: line).
--width           Canvas width in pixels (default: 800).
--height          Canvas height in pixels (default: 600).
--background, -b  Background color (default: transparent).
--output, -o      File path to write output; if omitted, write SVG to stdout or print PNG as Base64 string.

# Dependencies
Add to package.json dependencies:
- chart.js: for chart definitions
- chartjs-node-canvas: for headless rendering to SVG and PNG buffers

# Implementation Details
1. CLI Registration
- In src/lib/main.js, register a 'render-plot' command with yargs, defining options and handler.

2. Library API
- Export async function renderPlot(data, options) in a new module (e.g., src/lib/renderPlot.js).
- Instantiate ChartJSNodeCanvas with width, height, and background color.
- Call renderToBuffer when format is 'png' and renderToBuffer when format is 'svg', specifying MIME type 'image/svg+xml'.
- Return Buffer for PNG or string for SVG.

3. CLI Handler
- Read and parse the input JSON file via fs.promises.readFile.
- Merge CLI flags into chart data and options.
- Invoke renderPlot and obtain result.
- If output path provided, write Buffer or string to file with correct file extension; else write SVG string to stdout or console.log Base64 PNG.
- Use exit code 0 on success, 1 on input or render errors.

# Testing
1. Unit Tests
- tests/unit/render-plot.test.js: mock ChartJSNodeCanvas and its methods to return sample SVG string and PNG Buffer; verify renderPlot returns correct values.

2. CLI Tests
- tests/unit/cli-render-plot.test.js: invoke main with ['render-plot','--input',tmpJson,'--format','svg','--output',tmpFile]; assert file contents and exit code; test PNG Base64 output via stdout.

3. Integration Tests
- Run CLI end-to-end in temp directory with sample data.json; generate both SVG and PNG outputs; assert file existence and valid headers.

# Documentation Updates
- Update README.md to include render-plot command with examples for svg and png output.
- Update USAGE.md under 'render-plot' section to detail options and examples.
- Document renderPlot function signature and return types for library users.