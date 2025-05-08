# RENDER_PLOT_EXPORT

## Purpose
Enable full SVG and PNG export capabilities and optimize rendering performance for large datasets in renderPlot, ensuring efficient memory usage and streaming support.

## Specification

### Source Changes
1. Add new dependencies in package.json:
   - chart.js
   - chartjs-node-canvas
2. In src/lib/main.js:
   - Import ChartJSNodeCanvas from chartjs-node-canvas and Chart from chart.js.
   - Extend function renderPlot(seriesData, options) to accept:
     - batchSize: maximum number of data points per batch (default 5000)
     - maxPoints: threshold to trigger batch rendering (default 5000)
   - If total data points in any series exceed maxPoints:
     - Divide seriesData into batches of batchSize points.
     - For each batch, update Chart configuration and render incrementally using streaming API to conserve memory.
   - Maintain existing behavior for smaller datasets without batching.
   - Preserve options: width, height, format (svg or png).
3. Update CLI in main():
   - Add new flags --batch-size and --max-points to minimist.
   - Pass batchSize and maxPoints from CLI to renderPlot.
   - Default to legacy JSON output when --format=json.

### Test Changes
1. In tests/unit/plot-generation.test.js:
   - Add unit tests for batch rendering path:
     - Generate seriesData with points exceeding maxPoints; spy on ChartJSNodeCanvas to verify multiple render calls.
     - Verify output stream combines batches without errors and produces valid SVG or PNG.
   - Retain existing tests for small dataset rendering and CLI usage.
2. In tests/unit/main.test.js:
   - Add CLI tests for new flags: --batch-size and --max-points.

### Documentation Changes
1. USAGE.md:
   - Document new CLI flags:
     - --batch-size <number>
     - --max-points <number>
   - Show example for large dataset rendering:
     node src/lib/main.js --flow-sync --start 0 --end 10000 --step 1 x --format svg --batch-size 2000
2. README.md:
   - Update “Rendering Plots” section to highlight performance optimization for large datasets.

### Dependencies
- Add chart.js ^4.x and chartjs-node-canvas ^4.x if not present.

### Backward Compatibility
- Preserve default behavior and flags (--format=json for data only).

## Alignment with Mission
Optimizes core plotting performance for very large formula datasets, reinforcing the library as the go-to tool for formula visualization workflows.