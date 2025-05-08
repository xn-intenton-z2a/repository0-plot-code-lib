# RENDER_PLOT_EXPORT

## Purpose
Streamline plot rendering for large datasets by integrating ChartJSNodeCanvas with a streaming approach, while retaining existing SVG and PNG export capabilities. This enhancement ensures efficient memory usage and faster render times on large data series.

## Specification

### Source Changes
- Add new dependencies: chartjs-node-canvas and stream-transform.
- In main.js extend renderPlot(seriesData, options):
  - When options.streaming is true, create a readable stream from seriesData in configurable chunk sizes.
  - Instantiate ChartJSNodeCanvas with width, height, and chart configuration based on seriesData.
  - Pipe data chunks into ChartJSNodeCanvas update call to progressively build the chart without loading entire dataset in memory.
  - Expose new CLI flag --streaming (boolean) and --chunk-size (number) to control streaming behavior.
  - Retain existing logic for SVG and PNG generation when --streaming is omitted.

### Test Changes
- In tests/unit/plot-generation.test.js:
  - Add unit tests for streaming path:
    - Mock a large seriesData array, enable options.streaming, set chunk-size small, and validate that transform stream is invoked expected number of times.
    - Mock ChartJSNodeCanvas renderToBuffer to confirm it's called once after stream completion and returns a valid PNG buffer signature.
  - Add performance integration test:
    - Generate a large synthetic dataset, run CLI with --flow-sync, --streaming, and verify CLI completes within an acceptable time threshold (e.g., under 200ms for 10000 points).
    - Assert the output buffer begins with PNG header bytes.

### Documentation Changes
- Update USAGE.md:
  - Document --streaming flag and --chunk-size option with default 1000.
  - Provide CLI example using streaming:
    node src/lib/main.js --flow-sync --start 0 --end 10000 --step 1 x --format png --streaming --chunk-size 5000

- Update README.md to include description of streaming performance mode.

### Dependencies
- Add chartjs-node-canvas and stream-transform to dependencies.

### Backward Compatibility
- Default behavior remains unchanged when --streaming is not provided; existing SVG/PNG export continues to work via d3-node and node-canvas.

## Alignment with Mission
Enhances the library’s goal of being the go-to CLI for formula visualization by ensuring high-performance render capabilities for large-scale data without external tooling.