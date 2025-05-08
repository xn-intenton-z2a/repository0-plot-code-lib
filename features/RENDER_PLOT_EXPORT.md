# RENDER_PLOT_EXPORT

# Source Changes

1. In src/lib/main.js:
   - Import ChartJSNodeCanvas from 'chartjs-node-canvas' and register Chart.js registerables:
     ```js
     import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
     import { Chart, registerables } from 'chart.js';
     Chart.register(...registerables);
     ```
   - Implement async function `renderPlot(seriesData, options)`:
     - `seriesData`: { timestamps: number[], series: { expression: string, values: number[] }[] }
     - `options`: { format: 'svg' | 'png', width: number, height: number, backgroundColor?: string }
     - Instantiate `ChartJSNodeCanvas` with width, height, and backgroundColor.
     - Build chart configuration for a line chart with `data.labels` from timestamps and `data.datasets` mapping expressions to values.
     - Render to buffer for PNG or string for SVG and return result.
   - Extend CLI flags parsed by minimist to include:
     - `--format <svg|png>` (default none)
     - `--width <number>` (default 800)
     - `--height <number>` (default 600)
     - `--background <string>` (default 'white')
   - In `main()`, when `--format` is provided:
     - Read JSON from stdin (when `--flow-sync` is not set).
     - Parse into `seriesData` and call `renderPlot` with CLI options.
     - Write the SVG string or PNG buffer to stdout.
     - Exit process after output.

# Test Changes

1. In tests/unit/plot-generation.test.js:
   - Add unit tests for `renderPlot`:
     - Call `renderPlot` with small synthetic `seriesData` and `format: 'svg'`; assert result is a string starting with '<svg'.
     - Call `renderPlot` with same data and `format: 'png'`; assert result is a Buffer whose first four bytes match 0x89, 0x50, 0x4E, 0x47.
     - Spy on `ChartJSNodeCanvas` constructor to verify width, height, and backgroundColor are passed correctly.

2. In tests/unit/main.test.js:
   - Add integration tests for CLI:
     - Prepare a temporary JSON file with `{ timestamps: [0,1], series: [{ expression: 'x', values: [0,1] }] }`.
     - Spawn `main` with `--format svg --width 100 --height 50`, piping the JSON file to stdin; capture stdout and assert it begins with '<svg'.
     - Repeat with `--format png --width 10 --height 10`; capture stdout buffer and assert it starts with PNG signature.

# Documentation Changes

1. In USAGE.md:
   - Document new flags:
     - `--format <svg|png>`  Select output format (svg or png).
     - `--width <number>`    Canvas width in pixels (default 800).
     - `--height <number>`   Canvas height in pixels (default 600).
     - `--background <color>` Canvas background color (default 'white').
   - Provide CLI examples:
     ```bash
     cat data.json | node src/lib/main.js --format svg --width 1024 --height 768 > plot.svg
     cat data.json | node src/lib/main.js --format png > plot.png
     ```

2. In README.md:
   - Add section "Rendering Charts" explaining how to use the CLI and the `renderPlot` API:
     - Show code snippet for programmatic `renderPlot` usage in Node.js.
     - Provide CLI example for both SVG and PNG outputs.

# Dependencies

- Add or verify dependencies in package.json:
  "chart.js": "^4.x",
  "chartjs-node-canvas": "^4.x"

# Backward Compatibility

- When `--format` is not provided, existing `--flow-sync` JSON output remains unchanged.

# Alignment with Mission

Completes the core visualization capability by enabling direct export of formula-driven plots to SVG and PNG, reinforced by robust unit and integration tests and clear documentation.