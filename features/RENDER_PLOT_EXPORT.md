# RENDER_PLOT_EXPORT

## Purpose
Add programmatic and CLI support for rendering generated plots to SVG and PNG formats, include comprehensive unit and integration tests for image output, and update documentation with clear rendering examples.

## Source Changes
1. In src/lib/main.js:
   - Export an async function renderPlot(data, options) accepting:
     - data: object with timestamps array and series array of expression/value objects
     - options: object with properties format (svg or png), width, height, backgroundColor
   - Import ChartJSNodeCanvas from chartjs-node-canvas and Chart from chart.js
   - Instantiate ChartJSNodeCanvas using width, height, and backgroundColor
   - Build a Chart.js configuration for a line chart mapping timestamps to labels and series values to datasets
   - Render output based on options.format:
     - Return a string that begins with <svg for svg
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

## Test Changes
### Unit Tests (tests/unit/plot-generation.test.js)
- Test renderPlot with minimal series data and format svg, assert returned string starts with <svg
- Test renderPlot with minimal series data and format png, assert returned Buffer begins with PNG signature bytes
- Mock ChartJSNodeCanvas to verify width, height, and backgroundColor are applied correctly

### Integration Tests (tests/unit/main.test.js)
- Invoke main() via a child process or by simulating process.argv with flags --flow-sync, --start, --end, --step, --format svg, --width, --height; pipe JSON input; assert stdout begins with <svg and exit code 0
- Repeat for --format png and assert output buffer signature and exit code 0

## Documentation Changes
1. In USAGE.md:
   - Document CLI flags --format <svg|png>, --width <number>, --height <number>, --background <color>
   - Provide examples for svg and png output:
     node src/lib/main.js --flow-sync --start 0 --end 10 --step 1 x --format svg --width 400 --height 300
     node src/lib/main.js --flow-sync --start 0 --end 10 --step 1 x --format png --width 400 --height 300
2. In README.md:
   - Add section "Rendering Charts to SVG and PNG":
     - Show programmatic API example:
       const svg = await renderPlot(data, { format: svg, width: 400, height: 300 });
     - Show matching CLI example from USAGE.md

## Dependencies
- Add chart.js and chartjs-node-canvas to dependencies in package.json

## Backward Compatibility
Default CLI and JSON flow-sync behaviors remain unchanged when --format is not provided.

## Alignment with Mission
Enable direct export of formula visualisations to standard image formats, reinforcing the library as the go-to CLI tool for formula visualisations.