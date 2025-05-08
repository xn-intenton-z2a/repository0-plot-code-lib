features/PERFORMANCE_PROFILING.md
# features/PERFORMANCE_PROFILING.md
# PERFORMANCE PROFILING

## Purpose
Provide built-in performance benchmarks and profiling capabilities to evaluate and optimize large dataset streaming and rendering workflows, measuring and reporting memory and CPU usage.

## Specification

### Source Changes
1. In src/lib/main.js:
   - Import perf_hooks.performance and inspector modules.
   - Extend the CLI to recognize new flags:
     - --benchmark: Enable benchmark mode.
     - --sample-sizes: Comma-separated list of point counts to test (default "10000,50000,100000").
     - --profile: Generate a V8 CPU profile file (benchmark.cpuprofile).
   - If --benchmark is set:
     - Parse sample sizes into Number array.
     - For each sample size:
         - Use performance.now() to record data generation time for timestamps and series values.
         - Use performance.now() to record time to call renderPlot or streaming logic with the generated data.
     - If --profile is set:
         - Start inspector profiler before generating data and stop it after rendering all sizes.
         - Write the profiling data to benchmark.cpuprofile.
     - Log a JSON object per sample size with fields sampleSize, generationTime, renderTime.
2. Maintain existing behaviors and flags when --benchmark is not provided.

### Test Changes
1. In tests/unit/plot-generation.test.js:
   - Add unit tests for benchmark mode:
     - Mock console.log and fs or inspector to verify at least one JSON report is logged when running main with --benchmark and --sample-sizes 1000.
     - Test that including --profile triggers the profiler and writes benchmark.cpuprofile (using spies).

### Documentation Changes
1. In USAGE.md:
   - Document --benchmark, --sample-sizes, and --profile flags with descriptions and CLI examples.
2. In README.md:
   - Add a section "Benchmarking and Profiling" describing how to execute benchmarks and interpret results.

### Dependencies
No new dependencies. Use Node built-in perf_hooks and inspector modules.

### Backward Compatibility
Default CLI and rendering behaviors remain unchanged when --benchmark is not used.

## Alignment with Mission
Provides actionable performance insights to users running large formula visualizations, reinforcing the library as a high-performance CLI tool.
features/PLOT_METADATA.md
# features/PLOT_METADATA.md
# PLOT_METADATA

## Purpose
Allow users to enrich exported plots with descriptive metadata, including chart titles, axis labels, and legends. This enhances interpretability of visualizations generated via CLI or programmatic API.

## Source Changes
1. In src/lib/main.js:
   - Extend CLI argument parsing to support new flags:
     - --title <string>           Chart title text
     - --x-label <string>         X-axis label text
     - --y-label <string>         Y-axis label text
     - --show-legend <boolean>    Enable or disable legend display (default true)
   - Pass parsed metadata options into renderPlot or renderPlotChunked calls via options.metadata object:
     {
       title: { text: titleValue },
       scales: { x: { title: { display: Boolean(xLabel), text: xLabel } },
                 y: { title: { display: Boolean(yLabel), text: yLabel } } },
       plugins: { legend: { display: showLegend } }
     }
   - Ensure renderPlot and chunked rendering functions merge metadata into the ChartJS configuration before instantiation.

## Test Changes
1. In tests/unit/plot-generation.test.js:
   - Add unit tests for metadata flags:
     a. Mock ChartJSNodeCanvas to capture chart configuration when main is invoked with --flow-sync and metadata flags.
        - Ensure config.options.plugins.legend.display matches --show-legend value.
        - Ensure config.options.title.text matches provided title.
        - Ensure config.options.scales.x.title.text and scales.y.title.text match provided labels.
   - Test default behavior when metadata flags are absent: title undefined, legend display true.

## Documentation Changes
1. In USAGE.md:
   - Document new metadata flags with descriptions and examples:
     node src/lib/main.js --flow-sync --start 0 --end 10 --step 1 x --format svg --title "Sine Wave" --x-label "Time (s)" --y-label "Amplitude" --show-legend false
2. In README.md:
   - Add section "Custom Plot Metadata":
     Describe how to add chart titles, axis labels, and toggle legends for both CLI and programmatic renderPlot calls.

## Dependencies
No new dependencies; leverage Chart.js built-in metadata configuration.

## Backward Compatibility
Default behavior remains unchanged when metadata flags are not provided: no title, axis labels omitted, legend displayed by default.

## Alignment with Mission
Enhances core visualization capabilities by making formula-driven plots more informative and publication-ready, supporting the mission to be the go-to CLI library for formula visualizations.features/RENDER_PLOT_EXPORT.md
# features/RENDER_PLOT_EXPORT.md
# RENDER_PLOT_EXPORT

## Purpose
Add programmatic and CLI support for rendering generated plots to SVG and PNG formats, include comprehensive unit and integration tests for image output, and update documentation with clear rendering examples.

## Specification

### Source Changes
1. In src/lib/main.js:
   - Import ChartJSNodeCanvas from chartjs-node-canvas and Chart from chart.js
   - Export an async function renderPlot(data, options) accepting:
       - data: object with timestamps array and series array of expression/value objects
       - options: object with properties format (svg or png), width, height, backgroundColor
   - Instantiate ChartJSNodeCanvas using width, height, and backgroundColor
   - Build a Chart.js configuration for a line chart mapping timestamps to labels and series values to datasets
   - Render output based on options.format:
       - Return a string starting with <svg for svg
       - Return a Buffer whose first bytes match the PNG file signature for png
   - In main(): extend CLI parsing to support flags:
       - --format <svg|png>
       - --width <number>
       - --height <number>
       - --background <color>
   - When --format is provided:
       - Read JSON input from stdin
       - Invoke renderPlot with parsed data and options
       - Write SVG string or PNG buffer to stdout and exit with code 0
   - Preserve existing flow-sync behavior when format is not provided

### Test Changes
1. In tests/unit/plot-generation.test.js:
   - Add unit test for renderPlot with minimal series data and format svg, assert returned string begins with <svg
   - Add unit test for renderPlot with minimal series data and format png, assert returned Buffer begins with the PNG signature bytes
   - Mock ChartJSNodeCanvas to verify width, height, and backgroundColor are applied correctly
2. In tests/unit/main.test.js:
   - Add integration test invoking main with flags --flow-sync, --start, --end, --step, --format svg, --width, --height, piping sample JSON input; assert stdout begins with <svg and exit code 0
   - Repeat for --format png, assert output buffer signature and exit code 0

### Documentation Changes
1. In USAGE.md:
   - Document CLI flags --format <svg|png>, --width <number>, --height <number>, --background <color>
   - Provide CLI examples for svg and png output with expected output beginnings
2. In README.md:
   - Add section Rendering Charts to SVG and PNG:
       - Show programmatic API example calling renderPlot and handling its return value
       - Show matching CLI usage example from USAGE.md

### Dependencies
- Add chart.js and chartjs-node-canvas to dependencies in package.json

### Backward Compatibility
Default JSON output for flow-sync remains unchanged when --format is not specified

### Alignment with Mission
Enables direct export of formula visualizations to standard image formats, reinforcing the library as the go-to CLI tool for formula visualizationsfeatures/DATA_DECIMATION.md
# features/DATA_DECIMATION.md
# DATA_DECIMATION

## Purpose
Improve rendering performance of large datasets by reducing the number of plotted points through Chart.js built-in data decimation, allowing faster exports while preserving visual fidelity.

## Specification

### Source Changes
1. In package.json update dependencies:
   - Add "chartjs-plugin-decimation": "^2.0.0" under dependencies.
2. In src/lib/main.js:
   - Import and register the decimation plugin:
     import { Chart, registerables } from 'chart.js';
     import decimation from 'chartjs-plugin-decimation';
     Chart.register(...registerables, decimation);
   - In the renderPlot and renderPlotChunked functions extend options to include:
     - decimationEnabled (boolean, default false)
     - decimationAlgorithm (string, default "largest_triangle_three_buckets")
     - decimationSamples (number, default 1000)
   - When decimationEnabled is true, merge into chart configuration:
     options.plugins = options.plugins || {};
     options.plugins.decimation = {
       algorithm: decimationAlgorithm,
       enabled: true,
       samples: decimationSamples
     };
   - Ensure CLI parsing adds flags:
     --decimation-enabled
     --decimation-algorithm <algorithm>
     --decimation-samples <number>
   - Pass parsed decimation options through to renderPlot or renderPlotChunked calls.

### Test Changes
1. In tests/unit/plot-generation.test.js:
   - Add a test for decimation:
     - Mock ChartJSNodeCanvas to capture the chart configuration passed.
     - Invoke renderPlot with decimationEnabled true, decimationAlgorithm "largest_triangle_three_buckets", decimationSamples 5 and a series of length > 5.
     - Assert that the configuration passed to ChartJSNodeCanvas contains options.plugins.decimation.enabled true,
       options.plugins.decimation.algorithm matches the flag,
       and the dataset length is trimmed to decimationSamples.

### Documentation Changes
1. In USAGE.md:
   - Document new CLI flags:
     --decimation-enabled       Enable Chart.js data decimation plugin (default false)
     --decimation-algorithm <algorithm>  Select decimation algorithm (default largest_triangle_three_buckets)
     --decimation-samples <number>       Number of samples to retain after decimation (default 1000)
   - Provide an example:
     node src/lib/main.js --flow-sync --start 0 --end 1000 --step 1 sin(x) --decimation-enabled --decimation-samples 200 --format svg
2. In README.md:
   - Update the "Rendering Charts" section to mention decimation for large datasets and show CLI example.

### Dependencies
- Add chartjs-plugin-decimation ^2.0.0 to package.json dependencies.

### Backward Compatibility
Defaults to decimationEnabled false so existing behavior remains unchanged when decimation flags are not provided.

### Alignment with Mission
Supports the mission of being the go-to CLI library for formula visualisations by optimizing rendering performance on large datasets and enabling efficient exports.features/PARALLEL_EVALUATION.md
# features/PARALLEL_EVALUATION.md
# PARALLEL_EVALUATION

## Purpose
Improve throughput when generating large series by distributing expression evaluation across multiple worker threads, accelerating the computation of timestamped values for heavy or complex formulae.

## Source Changes
1. In src/lib/main.js:
   - Import worker_threads and os modules:
     import { Worker } from 'worker_threads';
     import os from 'os';
   - Extend CLI argument parsing to support new flag:
     --parallel-evaluate <number>    Number of worker threads to use for expression evaluation (default = 1).
   - When --flow-sync and parallelEvaluate > 1:
     - Generate the full timestamps array as before.
     - Divide timestamps into roughly equal chunks based on parallelEvaluate.
     - For each chunk, spawn a Worker that receives:
       { chunkTimestamps, expressions }
     - In each worker, evaluate each expression for the provided timestamps, returning partial series values.
     - Main thread collects partial results from each worker, concatenates chunks in order, and assembles final timestamps and series arrays.
   - Ensure error handling: if a worker fails, terminate all workers and exit with an error code.
   - When parallelEvaluate is 1 or not provided, fall back to existing synchronous evaluation logic.

## Test Changes
1. In tests/unit/plot-generation.test.js:
   - Mock worker_threads.Worker to simulate parallel evaluation without actual threads.
   - Test that invoking main with --flow-sync --start 0 --end 4 --step 1 x --parallel-evaluate 2:
     * Spawns two worker threads.
     * Returns identical output to serial evaluation for simple expressions.
   - Verify that errors in a worker cause main to exit with non-zero code.

## Documentation Changes
1. In USAGE.md:
   - Document new CLI flag:
     --parallel-evaluate <number>    Use multiple threads to compute series values (default 1)
   - Add example:
     node src/lib/main.js --flow-sync --start 0 --end 10000 --step 1 sin(x) --parallel-evaluate 4
2. In README.md:
   - Add section "Parallel Formula Evaluation":
     Explain how distributing evaluation across threads speeds up series generation for large ranges and complex formulae.

## Dependencies
No new dependencies; use built-in Node.js worker_threads and os modules.

## Backward Compatibility
Default behavior remains unchanged when --parallel-evaluate is 1 or omitted.

## Alignment with Mission
Reinforces high-performance, CLI-driven formula visualizations by speeding up series value computation at large scales.features/PARALLEL_RENDERING.md
# features/PARALLEL_RENDERING.md
# PARALLEL_RENDERING

## Purpose
Leverage multiple worker threads to render data chunks in parallel, significantly reducing total processing time for very large datasets.

## Source Changes
1. In src/lib/main.js:
   - Import worker_threads and os modules:
     ```js
     import { Worker } from 'worker_threads';
     import os from 'os';
     ```
   - Add new CLI flag:
     - --parallel-chunks <number>    Number of worker threads to use (default = number of CPU cores).
   - Extend renderPlotChunked to accept a parallelChunks option.
   - When parallelChunks > 1 and chunkSize > 0:
     - Divide timestamp and series data into windows as before.
     - Spawn Worker instances equal to parallelChunks, distributing chunk windows round-robin.
     - Each worker renders its assigned chunks and posts back Buffer or SVG strings and render times.
     - The main thread collects results, orders them by chunk index, and concatenates outputs.
   - After rendering, record totalRenderTime using performance.now() and log a JSON summary including:
     - totalChunks
     - parallelChunks
     - chunkSize
     - totalRenderTime
     - chunkTimes (array of per-chunk render times)

## Test Changes
1. In tests/unit/plot-generation.test.js:
   - Mock worker_threads.Worker to simulate parallel processing without actual threads.
   - Write tests for main invoked with:
     --flow-sync --start 0 --end 10 --step 1 --format svg --chunk-size 5 --parallel-chunks 2
   - Verify:
     - Worker is instantiated twice.
     - Summary output JSON has parallelChunks set to 2.
     - chunkTimes array length matches totalChunks.

## Documentation Changes
1. In USAGE.md:
   - Document --parallel-chunks flag with description and default value.
   - Provide CLI example:
     ```bash
     node src/lib/main.js --flow-sync --start 0 --end 100 --step 1 --format png --chunk-size 25 --parallel-chunks 4
     ```
2. In README.md:
   - Add section "Parallel Chunk Rendering":
     Explain how using multiple threads can accelerate rendering of large datasets and show example invocation.

## Dependencies
No new dependencies; utilize built-in Node.js worker_threads and os modules.

## Backward Compatibility
If --parallel-chunks is 1 or not provided, rendering falls back to single-threaded chunked mode, preserving existing behavior.

## Alignment with Mission
Enhances the library’s commitment to high-performance, CLI-driven formula visualizations by harnessing parallelism to handle large-scale data efficiently.features/CHUNKED_RENDERING.md
# features/CHUNKED_RENDERING.md
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