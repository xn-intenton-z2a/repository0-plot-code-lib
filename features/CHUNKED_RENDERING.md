# CHUNKED_RENDERING

## Purpose
Enhance renderPlot to handle very large datasets by splitting data into manageable chunks during rendering. This reduces peak memory usage and improves performance when exporting PNG or SVG outputs.

## Specification

### Source Changes
1. In src/lib/main.js:
   - Import ChartJSNodeCanvas and Chart if not already imported.
   - Extend CLI argument parsing with:
     - --chunk-size <number>  (default 10000)
     - --chunk-overlap <number>  (default 0)
   - Implement a new function renderPlotChunked(seriesData, options):
     - Break each seriesData.values array into windowed chunks of length chunk-size, overlapping by chunk-overlap.
     - For each chunk:
       - Instantiate or reuse a ChartJSNodeCanvas instance.
       - Configure chart data with the current window of timestamps and values.
       - Render to desired format and collect Buffer or string.
       - Optionally release or reset chart instance between chunks to free memory.
     - Return an array of buffers or SVG strings, one per chunk.
   - In main():
     - Detect if format is png or svg and chunk-size > 0.
     - Invoke renderPlotChunked instead of renderPlot.
     - Log a summary JSON including totalChunks, chunkSize, and per-chunk renderTime.

### Test Changes
1. In tests/unit/plot-generation.test.js:
   - Add tests for chunked rendering:
     - Mock ChartJSNodeCanvas to capture invocation count.
     - Call main with --flow-sync data piped into renderPlot via arguments, setting --chunk-size 2.
     - Verify output report indicates correct totalChunks and each chunk processed.
     - Test that buffers returned per chunk match expected signature for PNG and start with '<svg' for SVG.

### Documentation Changes
1. In USAGE.md:
   - Document new flags:
     --chunk-size <number>    Number of points per render chunk (default 10000)
     --chunk-overlap <number> Number of overlapping points between chunks (default 0)
   - Provide an example:
     node src/lib/main.js --flow-sync --start 0 --end 1000 --step 1 x --format png --chunk-size 250
2. In README.md:
   - Add section "Chunked Rendering for Large Datasets":
     - Explain how chunking improves memory footprint.
     - Show example CLI invocation and interpret summary output.

### Dependencies
No new dependencies; use existing chartjs-node-canvas and chart.js packages.

### Backward Compatibility
Default behavior remains unchanged when --chunk-size is not provided or set to 0; renderPlot is invoked as before.

## Alignment with Mission
Delivers on the mission to be a high-performance, CLI-driven plot library by enabling efficient exports of very large formula visualizations.