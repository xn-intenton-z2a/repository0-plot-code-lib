# RENDER_PLOT_EXPORT

## Purpose
Add programmatic and CLI support for rendering generated plots to SVG and PNG formats and validate the outputs with comprehensive unit and integration tests. Update documentation with clear examples for both programmatic API and CLI usage.

## Source Changes
1. In src/lib/main.js:
   - Export a new async function renderPlot(data, options) that accepts:
     * data: an object with timestamps array and series array of expression/value objects
     * options: an object with optional properties format (svg or png), width, height, backgroundColor
   - Import ChartJSNodeCanvas from chartjs-node-canvas and Chart from chart.js
   - Instantiate ChartJSNodeCanvas with provided width, height, and backgroundColor
   - Build a Chart.js configuration for a line chart mapping data.timestamps to labels and data.series to datasets
   - Render to the requested format: return a string starting with <svg when format is svg or return a Buffer with PNG signature when format is png
   - In main(): extend CLI parsing to support flags --format, --width, --height, --background; when --format is present read JSON input from stdin, invoke renderPlot with parsed data and options, write SVG string or PNG buffer to stdout, and exit with code 0

## Test Changes
1. In tests/unit/plot-generation.test.js:
   - Add unit tests for renderPlot:
     * Call renderPlot with minimal series data and format svg and assert returned string starts with <svg
     * Call renderPlot with minimal series data and format png and assert returned Buffer first four bytes match PNG signature 0x89, 0x50, 0x4E, 0x47
     * Mock ChartJSNodeCanvas to verify width, height, and backgroundColor options are passed correctly
2. In tests/unit/main.test.js:
   - Add integration tests for CLI behavior:
     * Spawn main with flags --format svg --width 100 --height 50, pipe a temporary JSON input, capture stdout and assert it begins with <svg
     * Spawn main with --format png, pipe JSON input, capture stdout buffer and assert buffer starts with PNG signature bytes
     * Verify that the process exits with code 0 on successful rendering

## Documentation Changes
1. In USAGE.md:
   - Document new CLI flags:
     --format <svg|png>       Select output format (svg or png)
     --width <number>         Canvas width in pixels (default 800)
     --height <number>        Canvas height in pixels (default 600)
     --background <color>     Canvas background color (default white)
   - Provide CLI examples for both svg and png outputs, for example:
     node src/lib/main.js --flow-sync --start 0 --end 10 --step 1 x --format svg --width 400 --height 300
2. In README.md:
   - Add section Rendering Charts to SVG and PNG:
     * Show programmatic example:
       const svg = await renderPlot(data, { format: 'svg', width: 400, height: 300 });
       console.log(svg);
     * Show matching CLI example mirroring USAGE.md:
       node src/lib/main.js --flow-sync --start 0 --end 10 --step 1 sin(x) --format png

## Dependencies
Add chart.js and chartjs-node-canvas to package.json dependencies

## Backward Compatibility
Existing JSON flow-sync behavior remains when --format is not provided

## Alignment with Mission
Enables direct export of formula visualisations to standard image formats, reinforcing the repository as the go-to CLI tool for formula visualisations