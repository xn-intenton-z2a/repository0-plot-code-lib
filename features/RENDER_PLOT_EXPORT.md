# RENDER_PLOT_EXPORT

## Purpose
Provide the ability to render charts into SVG and PNG outputs and validate output formats with comprehensive unit and integration tests. Update documentation with clear examples for both programmatic and CLI usage.

## Specification

### Source Changes
1. Update renderPlot(seriesData, options) to accept an options.format value of 'svg' or 'png'.
2. Ensure width, height, and backgroundColor options are passed into the ChartJSNodeCanvas constructor.
3. Retain existing JSON flow-sync behavior when the format option is not provided.

### Test Changes
1. In tests/unit/plot-generation.test.js:
   a. Add unit test for programmatic API:
      - Call renderPlot with minimal seriesData and format 'svg'. Assert the returned value is a string starting with <svg.
      - Call renderPlot with the same data and format 'png'. Assert the returned value is a Buffer whose first four bytes match the PNG signature (0x89, 0x50, 0x4E, 0x47).
      - Spy on ChartJSNodeCanvas to verify width, height, and backgroundColor options are applied correctly.
2. In tests/unit/main.test.js:
   a. Add integration test for CLI rendering:
      - Prepare a temporary JSON input file with timestamps and series data.
      - Spawn main with --format svg --width 100 --height 50, piping JSON input. Capture stdout and assert it begins with <svg.
      - Spawn main with --format png --width 64 --height 48, piping JSON input. Capture stdout buffer and assert it starts with PNG signature bytes.
      - Ensure the CLI exits with code 0 on successful rendering.

### Documentation Changes
1. In USAGE.md:
   - Document the following flags:
     --format <svg|png>       Select output format (svg or png)
     --width <number>         Canvas width in pixels (default 800)
     --height <number>        Canvas height in pixels (default 600)
     --background <color>     Canvas background color (default white)
   - Provide CLI usage examples:
     cat data.json | node src/lib/main.js --format svg --width 300 --height 200 > chart.svg
     cat data.json | node src/lib/main.js --format png --width 300 --height 200 > chart.png
2. In README.md:
   - Add section Rendering Charts to SVG and PNG:
     • Show programmatic example using renderPlot:
       const data = { timestamps: [0,1,2], series: [{ expression: 'x', values: [0,1,2] }] };
       const svg = await renderPlot(data, { format: 'svg', width: 400, height: 300 });
       console.log(svg);
     • Show matching CLI examples mirroring USAGE.md.

## Dependencies
No new dependencies; reuse existing chart.js and chartjs-node-canvas packages.

## Backward Compatibility
When the format option is absent, existing JSON output behavior remains unchanged.

## Alignment with Mission
Reinforces the mission to be the go-to CLI library for formula visualisations by delivering reliable chart exports and clear guidance.