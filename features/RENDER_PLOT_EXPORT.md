# RENDER_PLOT_EXPORT

## Purpose
Enable exporting charts to SVG and PNG formats via CLI and library, turning JSON data streams into visual outputs.

## Source Changes
1. In src/lib/main.js:
   - Import ChartJSNodeCanvas from 'chartjs-node-canvas' and Chart and registerables from 'chart.js'.
   - Register Chart.register(...registerables).
   - Implement async function renderPlot(seriesData, options):
     - seriesData: { timestamps: number[], series: { expression: string, values: number[] }[] }.
     - options: { format: 'svg' | 'png', width: number, height: number, backgroundColor?: string }.
     - Instantiate ChartJSNodeCanvas with width, height, backgroundColor.
     - Build a line chart configuration combining timestamps and series values.
     - Render to SVG string or PNG buffer and return.
   - Extend CLI flags parsed by minimist:
     - --format <svg|png> (default none)
     - --width <number> (default 800)
     - --height <number> (default 600)
     - --background <string> (default 'white')
   - In main():
     - When --format is provided, read JSON from stdin if flow-sync not set, parse seriesData, call renderPlot, write SVG string or PNG buffer to stdout, and exit.

## Test Changes
1. In tests/unit/plot-generation.test.js:
   - Add unit tests for renderPlot:
     - Call renderPlot with small synthetic seriesData and format 'svg'; assert result is a string starting with '<svg'.
     - Call renderPlot with same data and format 'png'; assert result is a Buffer starting with PNG signature bytes (0x89, 0x50, 0x4E, 0x47).
     - Spy on ChartJSNodeCanvas constructor to verify width, height, and backgroundColor are passed correctly.
2. In tests/unit/main.test.js:
   - Add integration tests for CLI rendering:
     - Prepare a temporary JSON file with sample seriesData.
     - Spawn main with --format svg --width 100 --height 50, piping the JSON to stdin; capture stdout and assert it begins with '<svg'.
     - Repeat with format 'png' and assert the output buffer starts with PNG signature.

## Documentation Changes
1. In USAGE.md:
   - Document new flags:
     --format <svg|png>    Select output format (svg or png)
     --width <number>      Canvas width in pixels (default 800)
     --height <number>     Canvas height in pixels (default 600)
     --background <color>  Canvas background color (default 'white')
   - Provide CLI examples showing both SVG and PNG outputs.
2. In README.md:
   - Add section "Rendering Charts":
     - Explain programmatic renderPlot usage with code snippet.
     - Provide CLI examples for exporting plots to SVG and PNG.

## Dependencies
- Add or verify dependencies in package.json:
  "chart.js": "^4.x",
  "chartjs-node-canvas": "^4.x"

## Backward Compatibility
Default behavior remains unchanged when --format is not provided; JSON flow-sync output is preserved.

## Alignment with Mission
Completes the core visualization pipeline by enabling direct export of high-quality formula-driven charts, reinforcing the tool as the go-to CLI library for formula visualizations.