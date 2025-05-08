# RENDER_PLOT_EXPORT

## Purpose
Enable exporting charts to SVG and PNG formats via CLI and library, turning JSON data streams into visual outputs, and ensure reliable output through comprehensive unit and integration tests with usage examples in documentation.

## Specification

### Source Changes
1. In src/lib/main.js:
   - Ensure renderPlot(seriesData, options) supports:
     • format: 'svg' | 'png'
     • width, height, backgroundColor
   - Maintain logic to instantiate ChartJSNodeCanvas and render into SVG string or PNG buffer.
2. No additional source code changes required for rendering behavior beyond existing implementation.

### Test Changes
1. In tests/unit/plot-generation.test.js:
   - Add unit tests for renderPlot output:
     a. Call renderPlot with small synthetic seriesData and format 'svg'; assert result is a string starting with `<svg`.
     b. Call renderPlot with same data and format 'png'; assert result is a Buffer starting with PNG signature bytes (0x89, 0x50, 0x4E, 0x47).
     c. Spy on ChartJSNodeCanvas constructor to verify width, height, and backgroundColor options are passed correctly.
2. In tests/unit/main.test.js:
   - Add integration tests for CLI rendering:
     a. Prepare a temporary JSON input representing seriesData.
     b. Spawn main() with arguments `--format svg --width 100 --height 50`, piping JSON to stdin; capture stdout and assert it begins with `<svg`.
     c. Repeat with `--format png --width 64 --height 48`; capture stdout buffer and assert it starts with PNG signature bytes.
     d. Ensure CLI exits with code 0 after successful rendering.

### Documentation Changes
1. In USAGE.md:
   - Document new flags:
     --format <svg|png>    Select output format (svg or png)
     --width <number>      Canvas width in pixels (default 800)
     --height <number>     Canvas height in pixels (default 600)
     --background <color>  Canvas background color (default 'white')
   - Add CLI examples:
     ```bash
     cat data.json | node src/lib/main.js --format svg --width 300 --height 200 > chart.svg
     cat data.json | node src/lib/main.js --format png --width 300 --height 200 > chart.png
     ```
2. In README.md:
   - Add section "Rendering Charts to SVG and PNG":
     • Show programmatic example using renderPlot:
       ```js
       import { renderPlot } from "@xn-intenton-z2a/repository0-plot-code-lib";
       const data = { timestamps: [0,1,2], series: [{ expression: "x", values: [0,1,2] }] };
       const svg = await renderPlot(data, { format: "svg", width: 400, height: 300 });
       console.log(svg);
       ```
     • Show CLI usage examples mirroring USAGE.md.

### Dependencies
No new dependencies beyond chart.js and chartjs-node-canvas already in package.json.

### Backward Compatibility
When --format is not provided, default JSON flow-sync behavior remains unchanged.

## Alignment with Mission
Delivers robust rendering pipelines with reliable outputs and clear documentation, reinforcing the library’s goal as the go-to CLI tool for formula visualizations.