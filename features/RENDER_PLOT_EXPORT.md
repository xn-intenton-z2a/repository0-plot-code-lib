# RENDER_PLOT_EXPORT

## Purpose
Add the ability to export plotted series data as SVG or PNG graphics directly from the CLI or library API. This empowers users to generate visual representations of formula outputs without external tools.

## Specification

### Source Changes
- Extend main.js to parse new CLI flags --format with values svg or png and --output <file>.
- Add utility function renderPlot(seriesData, options) that:
  - Generates an SVG string representing the series as line or scatter plots.
  - When format is png, uses node canvas to render the SVG and return a PNG buffer.
- Integrate renderPlot into the flow sync path when format is provided, writing the output to stdout or to the specified file path.

### Test Changes
- In tests/unit/plot-generation.test.js:
  - Add unit tests for renderPlot:
    - Verify renderPlot returns a valid SVG string for format svg.
    - Verify renderPlot returns a Buffer or Uint8Array for format png with correct PNG header bytes.
  - Add integration tests:
    - Mock file system writes and run the CLI in flow sync mode with format svg and output test.svg, asserting the output file starts with svg tag.
    - Run the CLI with format png and output test.png, asserting the buffer begins with the PNG signature bytes.

### Documentation Changes
- Update USAGE.md to describe new flags:
  - --format svg or png to select export format
  - --output path to write rendered output to a file
- Update README.md to include an example invocation:
  node src/lib/main.js --flow-sync --start 0 --end 10 --step 1 x 2*x --format png --output plot.png

### Dependencies
- Add dependencies canvas and d3-node for SVG generation and PNG rendering.

### Backward Compatibility
- When --format is omitted, existing JSON output behavior remains unchanged.

## Alignment with Mission
Enables direct visual exports from formula evaluations, reinforcing the library goal of being the go-to plot tool for formula visualizations.