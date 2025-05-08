# RENDER_PLOT_EXPORT

## Purpose
Enable full SVG and PNG export capabilities for renderPlot using ChartJSNodeCanvas with streaming support for large datasets. Update the CLI to leverage the new renderPlot function, augment tests to cover SVG and PNG outputs, and refresh documentation to guide users through both programmatic and CLI-based plot exports.

## Specification

### Source Changes
1. Add new dependencies in package.json:
   - chart.js
   - chartjs-node-canvas
2. In src/lib/main.js:
   - Import ChartJSNodeCanvas from chartjs-node-canvas and Chart from chart.js.
   - Implement and export function renderPlot(seriesData, options):
     - seriesData: Object containing timestamps (array of numbers) and series (array of objects with expression and values).
     - options:
       - width: Chart width in pixels (default 800).
       - height: Chart height in pixels (default 600).
       - format: Output format, either svg or png (default svg).
     - Construct a Chart configuration with line datasets for each series, x-axis using timestamps.
     - Use ChartJSNodeCanvas to:
       - For svg: call renderToStream with mimeType 'image/svg+xml'.
       - For png: call renderToBuffer with type 'image/png' and return buffer.
   - Update main function behavior:
     - After computing timestamps and series when --flow-sync is used, call renderPlot with parsed data and options.format from CLI.
     - Pipe SVG stream or write PNG buffer to stdout instead of JSON.
     - Retain JSON output when --format=json is explicitly requested for backward compatibility.

### Test Changes
1. In tests/unit/plot-generation.test.js:
   - Add unit tests for renderPlot:
     - Invoke renderPlot with small seriesData and options.format svg; consume returned stream and assert the output string contains an opening <svg tag and closing </svg>.
     - Invoke renderPlot with options.format png; assert returned buffer begins with the PNG header bytes (89 50 4E 47).
   - Add CLI tests:
     - Execute main with --flow-sync, sample expression, and --format svg; capture mock console.log or stream and assert it starts with <svg.
     - Execute main with --flow-sync and --format png; capture stdout buffer and assert it starts with PNG signature bytes.
2. Ensure existing main.test.js remains unchanged.

### Documentation Changes
1. USAGE.md:
   - Document new --format flag values: svg, png, json (for JSON series output) and default behavior.
   - Add CLI examples:
     node src/lib/main.js --flow-sync --start 0 --end 4 --step 1 x --format svg > plot.svg
     node src/lib/main.js --flow-sync --start 0 --end 4 --step 1 x --format png > plot.png
     node src/lib/main.js --flow-sync --start 0 --end 4 --step 1 x --format json
2. README.md:
   - Add “Rendering Plots” section:
     - Show code snippet using renderPlot programmatically.
     - Show CLI invocation examples with sample output snippets.

### Dependencies
- Add chart.js ^4.x and chartjs-node-canvas ^4.x to dependencies.

### Backward Compatibility
- Preserve default output as SVG when --format is omitted.
- Support --format=json to retain existing JSON output for users relying on series data.

## Alignment with Mission
Expands the library’s core plotting capabilities, delivering first-class visual exports directly from CLI and programmatic API, reinforcing our goal to be the go-to tool for formula visualization workflows.