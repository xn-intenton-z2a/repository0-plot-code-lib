# RENDER_PLOT_EXPORT

# Purpose
Add programmatic and CLI support for rendering generated plots to SVG and PNG formats, with complete unit and integration tests for image output and updated documentation providing clear examples for both API and CLI usage.

# Specification

## Source Changes
1. In src/lib/main.js:
   - Export a new async function renderPlot(data, options) accepting:
     • data: object containing timestamps array and series array of expression/value objects
     • options: object with optional properties format (svg or png), width, height, backgroundColor
   - Import ChartJSNodeCanvas from chartjs-node-canvas and Chart from chart.js
   - Instantiate ChartJSNodeCanvas with width, height, and backgroundColor
   - Build a Chart.js configuration for a line chart mapping timestamps to labels and series values to datasets
   - Render output based on format:
     • Return a string starting with <svg when format is svg
     • Return a Buffer with PNG signature when format is png
   - In main(): extend CLI parsing to support flags --format, --width, --height, --background
   - When --format is provided:
     • Read JSON input from stdin
     • Invoke renderPlot with parsed input and options
     • Write SVG string or PNG buffer to stdout
     • Exit with code 0

# Test Changes

## Unit Tests
1. In tests/unit/plot-generation.test.js:
   - Test renderPlot function:
     • Call renderPlot with minimal series data and format svg, assert returned string starts with <svg
     • Call renderPlot with minimal series data and format png, assert returned Buffer matches PNG header bytes
     • Mock ChartJSNodeCanvas to verify width, height, and backgroundColor are passed correctly

## Integration Tests
1. In tests/unit/main.test.js:
   - Spawn main() with flags --format svg --width 100 --height 50, pipe JSON input, capture stdout, assert it begins with <svg and process exits with code 0
   - Spawn main() with --format png, pipe JSON input, capture stdout buffer, assert PNG signature and exit code 0

# Documentation Changes

## USAGE.md
- Document new CLI flags --format <svg|png>, --width <number>, --height <number>, --background <color> with descriptions and examples
- Provide CLI examples for both svg and png outputs:
  node src/lib/main.js --flow-sync --start 0 --end 10 --step 1 x --format svg --width 400 --height 300

## README.md
- Add section Rendering Charts to SVG and PNG:
  • Show programmatic API example:
    const svg = await renderPlot(data, { format: svg, width: 400, height: 300 });
  • Show matching CLI example from USAGE.md

# Dependencies
- Add chart.js and chartjs-node-canvas to dependencies in package.json

# Backward Compatibility
Existing JSON flow-sync behavior remains unchanged when --format is not provided

# Alignment with Mission
Enables direct export of formula visualizations to standard image formats, reinforcing the library as the go-to CLI tool for formula visualizations