# RENDER_PLOT_EXPORT

## Purpose
Enable the CLI and programmatic API to generate line charts from numeric series using ChartJSNodeCanvas and export them as SVG or PNG images.

## Specification

### Source Changes
1. In package.json
   - Add or update dependencies:
     "chart.js": "^4.x",
     "chartjs-node-canvas": "^4.x"
2. In src/lib/main.js
   - Import rendering libraries:
     import { ChartJSNodeCanvas } from 'chartjs-node-canvas'
     import { Chart, registerables } from 'chart.js'
     Chart.register(...registerables)
   - Define async function renderPlot(seriesData, options):
     - seriesData: { timestamps: number[], series: { expression: string, values: number[] }[] }
     - options: { format: 'svg'|'png', width: number, height: number, backgroundColor?: string }
     - Instantiate ChartJSNodeCanvas with width, height, background
     - Build chart configuration:
       type: 'line'
       data.labels = seriesData.timestamps
       data.datasets = seriesData.series.map((s, i) => ({ label: s.expression, data: s.values }))
       options.plugins.legend.display true
     - Render with canvas.renderToBuffer or renderToDataURL as string
     - Return Buffer for PNG or string for SVG
   - In main():
     - Extend CLI flags via minimist:
       --format <svg|png> (default json)
       --width <number> (default 800)
       --height <number> (default 600)
       --background <string> (CSS color, default white)
     - If format is svg or png:
       - Read JSON input on stdin if no --flow-sync
       - Parse JSON into seriesData
       - Call renderPlot with options
       - Pipe output Buffer or string to stdout
       - Exit process
     - Preserve existing --flow-sync behavior when no format flag

### Test Changes
1. In tests/unit/plot-generation.test.js
   - Add unit tests for renderPlot:
     a. Call renderPlot with small synthetic seriesData and format svg; expect output string starts with '<svg'
     b. Call renderPlot with same data and format png; expect Buffer signature 0x89 0x50 0x4e 0x47
     c. Spy on ChartJSNodeCanvas constructor to verify width, height, background passed
2. In tests/unit/main.test.js
   - Add CLI integration tests:
     a. Write JSON file with timestamps and series; spawn main with --format svg and --width 100 --height 50, pipe file to stdin; capture stdout and assert SVG tag present
     b. Repeat for png and assert Buffer signature

### Documentation Changes
1. In USAGE.md
   - Document new flags:
     --format <svg|png>  Export format
     --width <number>    Chart width in pixels
     --height <number>   Chart height in pixels
     --background <color> Canvas background color
   - Provide example:
     cat data.json | node src/lib/main.js --format svg --width 1024 --height 768 > plot.svg
2. In README.md
   - Add section "Rendering Charts":
     Describe renderPlot API usage and CLI examples for SVG and PNG export

### Dependencies
- chart.js ^4.x
- chartjs-node-canvas ^4.x

### Backward Compatibility
Default behavior when --format is not provided remains unchanged: CLI prints usage or JSON for --flow-sync.

### Alignment with Mission
Completes the core visualization capability, making the library a go-to CLI tool for rendering formula-driven plots.