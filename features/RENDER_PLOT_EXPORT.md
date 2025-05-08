# RENDER_PLOT_EXPORT

## Purpose
Add programmatic and CLI support for rendering generated plots to SVG and PNG formats, include comprehensive unit and integration tests for image output, and update documentation with clear rendering examples.

## Specification

### Source Changes
1. In src/lib/main.js:
   - Import ChartJSNodeCanvas from chartjs-node-canvas and Chart from chart.js
   - Export an async function renderPlot(data, options) accepting:
       - data: object with timestamps array and series array of expression/value objects
       - options: object with properties format (svg or png), width, height, backgroundColor
   - Instantiate ChartJSNodeCanvas using width, height, and backgroundColor
   - Build a Chart.js configuration for a line chart mapping timestamps to labels and series values to datasets
   - Render output based on options.format:
       - Return a string starting with <svg for svg
       - Return a Buffer whose first bytes match the PNG file signature for png
   - In main(): extend CLI parsing to support flags:
       - --format <svg|png>
       - --width <number>
       - --height <number>
       - --background <color>
   - When --format is provided:
       - Read JSON input from stdin
       - Invoke renderPlot with parsed data and options
       - Write SVG string or PNG buffer to stdout and exit with code 0
   - Preserve existing flow-sync behavior when format is not provided

### Test Changes
1. In tests/unit/plot-generation.test.js:
   - Add unit test for renderPlot with minimal series data and format svg, assert returned string begins with <svg
   - Add unit test for renderPlot with minimal series data and format png, assert returned Buffer begins with the PNG signature bytes
   - Mock ChartJSNodeCanvas to verify width, height, and backgroundColor are applied correctly
2. In tests/unit/main.test.js:
   - Add integration test invoking main with flags --flow-sync, --start, --end, --step, --format svg, --width, --height, piping sample JSON input; assert stdout begins with <svg and exit code 0
   - Repeat for --format png, assert output buffer signature and exit code 0

### Documentation Changes
1. In USAGE.md:
   - Document CLI flags --format <svg|png>, --width <number>, --height <number>, --background <color>
   - Provide CLI examples for svg and png output with expected output beginnings
2. In README.md:
   - Add section Rendering Charts to SVG and PNG:
       - Show programmatic API example calling renderPlot and handling its return value
       - Show matching CLI usage example from USAGE.md

### Dependencies
- Add chart.js and chartjs-node-canvas to dependencies in package.json

### Backward Compatibility
Default JSON output for flow-sync remains unchanged when --format is not specified

### Alignment with Mission
Enables direct export of formula visualizations to standard image formats, reinforcing the library as the go-to CLI tool for formula visualizations