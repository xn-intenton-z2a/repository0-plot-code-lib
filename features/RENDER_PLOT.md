# Overview
Enhance the existing render-plot implementation to provide a dedicated render-plot CLI subcommand that accepts JSON data and produces high-quality SVG or PNG charts. Maintain backward-compatible library API and ensure users can generate charts programmatically or via the CLI with flexible options for format, dimensions, type, background, and output path.

# CLI Usage
repository0-plot-code-lib render-plot --input data.json --format png --type line --width 800 --height 600 --background white --output chart.png

Options:
--input, -i      Path to a JSON file containing chart data and configuration.
--format, -f     Output image format: svg (default) or png.
--type, -t       Chart type: line, bar, pie, radar, etc. (default: line).
--width          Width of the chart canvas in pixels (default: 800).
--height         Height of the chart canvas in pixels (default: 600).
--background, -b Background color for the chart canvas (default: transparent).
--output, -o     File path to write the rendered image. If omitted, write to stdout (SVG as string, PNG as Base64).

# Dependencies
Add the following to dependencies:
chart.js for chart definitions
chartjs-node-canvas for headless rendering to SVG and PNG buffers

# Implementation Details
1. CLI Parsing
   - Use yargs to register a "render-plot" command with options for input, format, type, width, height, background, and output.
2. Data Loading
   - Read the JSON file via fs.promises.readFile and parse it to obtain the data object and optional chart options.
3. Rendering Function
   - Export an async function renderPlot(data, options) that:
     - Instantiates ChartJSNodeCanvas with provided width, height, and background.
     - Calls renderToBuffer for png or renderToBuffer returning a string for svg output.
     - Returns the buffer or string result.
4. CLI Handler
   - Load JSON, merge CLI flags into options, call renderPlot, and handle the result:
     - If output path is provided, write buffer/string to file.
     - Otherwise, write SVG string to stdout or print PNG as Base64 via console.log.
   - Use exit codes: 0 on success, 1 on invalid input or render errors.

# Testing
1. Unit Tests
   - In tests/unit/render-plot.test.js, mock ChartJSNodeCanvas constructor and renderToBuffer to return sample SVG string and PNG buffer. Verify renderPlot returns correct type and content signature.
2. CLI Tests
   - Add tests in tests/unit/cli-render-plot.test.js that invoke main(["render-plot", "--input", tmpJson, "--format", "svg", "--output", tmpFile]) and assert file content begins with <svg and proper output for png.
3. Integration Tests
   - Run CLI in a temp directory with a sample JSON data file, generate both svg and png and assert files exist and content matches expected headers.

# Documentation Updates
- Update README.md to include a new section for the render-plot command with usage examples.
- Update USAGE.md to document render-plot options and examples under a "render-plot" section.
- Document the renderPlot function signature and return types for library consumers.