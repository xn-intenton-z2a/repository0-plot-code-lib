features/CLI_GRACEFUL_DEFAULT.md
# features/CLI_GRACEFUL_DEFAULT.md
# Overview

This feature enhances the CLI tool to provide a graceful default invocation and help interface when required parameters are missing or when users explicitly request assistance. Instead of exiting with an error on missing arguments, the CLI will display a concise usage message and exit with code 0.

# CLI Interface

--help, -h : Display usage information and exit with status code 0.  No other flags are processed when help is requested.

# Behavior

1. If the user supplies --help or -h, the CLI prints the usage help text to standard output and exits with code 0.
2. If the CLI is invoked with no arguments or with missing required flags (--expression or --range), it prints the same usage help text to standard output and exits with code 0, avoiding a non-zero error state.
3. When both --expression and --range are provided, the CLI proceeds with existing time series generation logic.

# Tests

- Create tests/unit/main-help.test.js:
  • Test that invoking main with [] arguments prints the help text and returns an empty array or does not throw.
  • Test that invoking main with ["--help"] or ["-h"] prints the help text and returns an empty array or does not throw.
  • Spy on console.log to capture help output and verify it includes the usage examples from USAGE.md.

# Documentation Updates

- In USAGE.md, add a section "Help and Default Invocation" describing the --help and default behavior with example output.
- In README.md, under Examples, show how to invoke the CLI with --help and demonstrate the printed usage message.features/CHARTJS_RENDERING.md
# features/CHARTJS_RENDERING.md
# CHARTJS_RENDERING

# Overview
Integrate ChartJSNodeCanvas into the existing renderPlot pipeline to offer advanced, themeable line chart rendering using Chart.js. This feature adds a simple switch to opt into ChartJS-based generation, supports custom configuration overrides, and cleanly falls back to the manual SVG path approach when not enabled.

# CLI Interface
Add two new optional flags to the CLI:

--chartjs          Enable Chart.js rendering via ChartJSNodeCanvas. Defaults to false.
--chart-config     Path to a JSON file with Chart.js config overrides (data and options sections).

# Implementation Details
1. Extend parseArgs in src/lib/main.js to recognize --chartjs and --chart-config flags and store them on opts.chartjs (boolean) and opts.chartConfig (string).
2. In main(), after data generation, branch on opts.chartjs:
   • Import ChartJSNodeCanvas from chartjs-node-canvas.
   • Instantiate ChartJSNodeCanvas with width and height from options or defaults.
   • If opts.chartConfig is provided, read and parse the JSON config file.
   • Construct a default Chart.js configuration object:
     - type set to line
     - data.labels as the array of x values
     - data.datasets with a single series containing y values, borderColor black, no fill
     - options.scales.x and options.scales.y with axis titles and grid display
     - options.plugins.legend enabled
   • Deep merge the parsed override config into the default config using a utility such as lodash.merge.
   • For SVG output: call renderToBuffer with type svg and the merged config, convert the buffer to string, and write or return it.
   • For PNG output: call renderToBuffer with type png, then write the returned buffer to file or stdout.
3. When opts.chartjs is false, continue to call the original renderPlot function.
4. Ensure error handling for invalid chart-config path or parse errors: print a clear error message to stderr and exit code 1.

# Behavior
- Default CLI operation remains unchanged unless --chartjs is specified.
- With --chartjs, users receive a Chart.js–styled chart that honors theme and advanced options.
- Custom overrides allow users to adjust dataset labels, colors, line tension, plugins, and other Chart.js options without changing code.
- Robust error handling ensures users receive feedback on malformed configs.

# Tests
1. Unit tests for renderPlotChartjs:
   • Simulate a small data set with opts.chartjs true and verify the returned string begins with <svg or buffer has PNG signature.
   • Test deep merge behavior by supplying a minimal override that changes line color and confirming its effect.
2. CLI integration tests:
   • Invoke CLI with --expression "y=x" --range 0:1 --points 2 --format svg --chartjs and assert stdout starts with <svg.
   • Invoke CLI with same parameters and --format png --chartjs and assert the first eight bytes match PNG signature.
   • Provide an invalid --chart-config path and verify exit code 1 and error message.

# Documentation Updates
- In USAGE.md, under Generating Plots, add a subsection Chart.js Rendering describing the --chartjs and --chart-config flags with example commands.
- In README.md under Examples, add an entry showing SVG via Chart.js and PNG via Chart.js with a custom config file.
- Mention that Chart.js rendering supports themes, legends, axis labels, and deep configuration overrides.features/RENDER_PROFILING.md
# features/RENDER_PROFILING.md
# Overview

Add detailed performance and memory usage profiling for large dataset rendering to help developers identify bottlenecks and optimize the rendering pipeline.

# CLI Interface

--profile         Optional flag to enable profiling output.
--profile-output  Optional file path to write the JSON profiling report. If omitted, profiling is printed to stdout.

# Behavior

1. Extend parseArgs to support --profile and --profile-output flags.
2. When profiling is enabled:
   • Record timestamp and memory usage before data generation.
   • After data generation, capture elapsed time and memory delta.
   • If downsampling is applied (when --max-points is used), capture a second snapshot after downsampling.
   • Before SVG rendering, record a profiling snapshot.
   • After SVG string is produced, record a snapshot for SVG generation time and memory usage.
   • If format is png, before PNG conversion record a snapshot and after conversion record a final snapshot.
   • Assemble an array of profiling stages with fields: stage, durationMs, memoryDeltaBytes, and timestamp.
   • At completion, serialize the profiling report as JSON and write to the provided profile-output path or stdout.

# Tests

Create tests/unit/profile-report.test.js:

• Invoke main with --expression "y=x" --range 0:1 --points 10 --profile and capture stdout.
  - Parse the stdout as JSON.
  - Assert the report is an array of profiling entries containing keys stage, durationMs, memoryDeltaBytes.

• Invoke main with --expression "y=x" --range 0:1 --points 10 --profile --profile-output report.json:
  - After execution assert exit code 0.
  - Assert fs.existsSync('report.json') is true.
  - Read and parse report.json as JSON and verify it matches the expected structure.

# Documentation Updates

In USAGE.md add a section "Profiling Performance" describing:

- The --profile flag and optional --profile-output.
- Example invocation:
  repository0-plot-code-lib --expression "y=sin(x)" --range 0:6.28 --points 5000 --max-points 1000 --profile

- Example profiling output:
  [
    { "stage": "data-generation", "durationMs": 12.5, "memoryDeltaBytes": 204800 },
    { "stage": "downsampling", "durationMs": 5.0, "memoryDeltaBytes": 102400 },
    { "stage": "svg-render", "durationMs": 30.2, "memoryDeltaBytes": 512000 },
    { "stage": "png-conversion", "durationMs": 45.7, "memoryDeltaBytes": 1024000 }
  ]

In README.md under "Examples" add a subsection "Profiling Rendering Pipeline" with:

repository0-plot-code-lib --expression "y=x^2" --range -5:5 --max-points 2000 --profile --profile-output pipeline.json
features/STREAMING_PERFORMANCE.md
# features/STREAMING_PERFORMANCE.md
# Overview

Enable adaptive, high-throughput streaming of large time series datasets to SVG or PNG outputs. Introduce a tunable pipeline that breaks data into chunks, applies backpressure-aware rendering, and auto-adjusts chunk sizes based on real-time profiling to optimize throughput and memory usage.

# CLI Interface

--stream-chunk-size    Optional integer defining the number of data points per streaming chunk. Defaults to 1000.
--stream-concurrency   Optional integer for pipeline concurrency level. Defaults to 1.
--auto-tune            Optional flag to enable runtime chunk-size auto-tuning based on profiling. Defaults to false.

# Behavior

1. Extend parseArgs to support --stream-chunk-size, --stream-concurrency, and --auto-tune.
2. Implement an async generator renderPlotPipeline(data, options) that:
   • Splits the data array into successive chunks of size streamChunkSize.
   • For each chunk, generates partial SVG path segments or PNG buffers.
   • Yields each rendered chunk in sequence, respecting Node stream backpressure.
3. In main():
   • When streaming flags are present and format is svg or png, call renderPlotPipeline and pipe its output stream to the filesystem or process.stdout.
   • If --auto-tune is enabled, after each chunk record duration and memory delta, then adjust streamChunkSize up or down by 10 percent if chunk processing time is below or above a 50ms threshold.
4. Ensure the entire pipeline handles error propagation, graceful shutdown on SIGINT, and does not buffer the full dataset in memory.

# Tests

Create tests/unit/streaming-performance.test.js:

• Test renderPlotPipeline with a synthetic data array of 5000 points and streamChunkSize 1000. Consume the async generator and assert it yields 5 chunks, each valid SVG fragments starting with a <path or PNG byte signature.
• Test backpressure behavior by piping the pipeline into a writable stream that deliberately slows down in its _write method; assert total memory footprint remains bounded.
• Test auto-tuning logic by mocking performance timers so that first chunk takes 30ms and second takes 70ms; verify that streamChunkSize increases then decreases accordingly.

# Documentation Updates

In USAGE.md add a section "Streaming Performance Optimization" that documents --stream-chunk-size, --stream-concurrency, and --auto-tune flags with command examples. In README.md under Examples add a subsection "Adaptive Streaming Rendering" showing an invocation that streams an SVG plot for 20000 points with auto-tuning enabled.features/CLI_BENCHMARKS.md
# features/CLI_BENCHMARKS.md
# Overview

Add performance benchmarks for large datasets to measure and compare the time taken for time series generation and plot rendering via the CLI. This helps users understand and optimize performance for their use cases.

# CLI Interface

--benchmark    Run performance benchmarks instead of generating output.
--benchmark-sizes    Comma separated list of sample counts to test. Defaults to 10000,50000,100000.

# Behavior

1. Extend parseArgs to support --benchmark and --benchmark-sizes.
2. When --benchmark is provided, parse sizes into an array of integers.
3. For each size:
   • Record start time before data generation.
   • Generate the time series data for the given size using existing logic.
   • Record elapsed time for generation.
   • Render SVG using renderPlot and record elapsed time.
   • Render PNG by piping the SVG through sharp and record elapsed time.
   • Output a line with columns: points, generation(ms), svg(ms), png(ms).
4. After processing all sizes, print a summary table and exit with code 0.

# Tests

Create tests/performance/cli-benchmark.test.js
• Use spawnSync to run the CLI with --benchmark and default sizes. Assert exit code is 0 and stdout contains a header with points and timings including 10000.
• Run the CLI with --benchmark-sizes 1000,2000. Assert stdout contains timing lines for sizes 1000 and 2000.

# Documentation Updates

In USAGE.md add a section Performance Benchmarks describing the --benchmark and --benchmark-sizes flags and showing an example command and sample output.

In README.md under Examples add a subsection Benchmarking Performance with a command invocation and representative timing table.features/LARGE_DATA_OPTIMIZATION.md
# features/LARGE_DATA_OPTIMIZATION.md
# Overview

Enhance performance and memory usage when rendering very large time series datasets by combining adaptive downsampling with a choice of decimation algorithms and streaming plot generation for both SVG and PNG outputs.

# CLI Interface

--max-points    Optional integer threshold for maximum data points to render. Defaults to 10000. Data arrays longer than this are downsampled.
--decimation-algorithm    Optional string to select the decimation algorithm. Supported values: minmax, lttb. Defaults to minmax.

# Behavior

1. Extend parseArgs to support --decimation-algorithm. Normalize to lowercase and validate against supported values.
2. After generating the full data array, if data.length exceeds maxPoints:
   • If algorithm is minmax:
     – Partition data into maxPoints segments by index.
     – In each segment, select minimum and maximum y values (with their x coordinates) to capture trend boundaries.
     – Combine up to 2 * maxPoints points, then truncate to maxPoints by evenly sampling if needed.
   • If algorithm is lttb:
     – Apply the Largest-Triangle-Three-Buckets algorithm to produce a shape-preserving downsampled series of exactly maxPoints points.
3. Replace the original data array with the downsampled array for plotting.
4. Refactor rendering to use streams:
   • Implement renderPlotStream(data, options) that returns a Readable stream emitting:
     – An SVG header chunk (including width, height, viewBox).
     – Path commands in incremental chunks rather than building one large string.
     – A closing </svg> tag.
   • In main(), for SVG format:
     – Call renderPlotStream and pipe its output to fs.WriteStream for files or process.stdout when no --output.
   • For PNG format:
     – Pipe the SVG stream into sharp().png() and then pipe the PNG stream to the output.
   • Ensure backpressure is respected to avoid unbounded memory use.

# Tests

• Create tests/unit/decimation-minmax.test.js:
  – Generate synthetic data longer than maxPoints, run the minmax path, assert output length ≤ maxPoints and trend boundaries are preserved.
• Create tests/unit/decimation-lttb.test.js:
  – Generate synthetic data longer than maxPoints, run LTTB path, assert output length equals maxPoints and overall shape matches original within tolerance.
• Create tests/unit/render-stream.test.js:
  – Mock a small data set, consume renderPlotStream as string, assert it begins with <svg, contains expected path commands, and ends with </svg>.
• Update integration tests in tests/unit/plot-integration.test.js:
  – Run CLI with --max-points and --decimation-algorithm flags for both svg and png, assert generated files exist and begin with correct signatures (<svg or PNG magic bytes).

# Documentation Updates

• In USAGE.md, add a section "Optimizing Large Dataset Rendering" describing --max-points and --decimation-algorithm flags, their defaults, and usage examples.
• In README.md under Examples, show invocations:
  repository0-plot-code-lib --expression "y=sin(x)" --range 0:6.28 --max-points 5000 --decimation-algorithm lttb --format svg --output plot.svg
  repository0-plot-code-lib --expression "y=x^2" --range -5:5 --max-points 5000 --decimation-algorithm minmax --format png --output plot.pngfeatures/PLOT_RENDERING.md
# features/PLOT_RENDERING.md
# Overview
Enhance unit and integration test coverage for renderPlot SVG and PNG output. Ensure tests validate output correctness and CLI behavior.

# Unit Tests
Create tests/unit/render-plot-svg.test.js:
 • Call renderPlot with a simple two point data set and assert the returned string starts with <svg, includes width and viewBox attributes, and contains a path element with valid d attribute.

Create tests/unit/render-plot-custom-options.test.js:
 • Call renderPlot with custom width 400, height 300, margin 20 and assert SVG header reflects width 400, height 300, viewBox 0 0 400 300, and path coordinates scaled accordingly.

Create tests/unit/render-plot-png.test.js:
 • Use renderPlot to produce an SVG string, convert to a PNG buffer via sharp, and assert the first eight bytes of the buffer match the PNG signature [137,80,78,71,13,10,26,10].

# Integration Tests
Create tests/unit/cli-plot-integration.test.js:
 • Spawn the CLI with --expression y=x --range 0:1 --format svg --output temp.svg and assert exit code 0, that temp.svg exists, and its content starts with <svg.
 • Spawn CLI with --expression y=x --range 0:1 --format png --output temp.png and assert exit code 0, that temp.png exists, and its first eight bytes match PNG signature.
 • Run CLI for SVG without --output, capture stdout and assert it starts with <svg.
 • Run CLI for PNG without --output, capture stdout as a buffer and assert first eight bytes match the PNG signature.

# Documentation Updates
In USAGE.md under Generating Plots add examples for SVG and PNG rendering to file and to stdout.
In README.md under Examples add a subsection CLI Rendering Examples showing commands and verification steps, and a Programmatic Rendering Examples snippet demonstrating import of renderPlot and PNG conversion via sharp.features/CLI_DATA_EXPORT.md
# features/CLI_DATA_EXPORT.md
# Overview

Enhance the CLI tool to support multiple data output formats for time series generation, enabling users to choose between JSON array, NDJSON, or CSV. This provides flexibility for integration with downstream pipelines and tools without adding new files.

# CLI Interface

--data-format    Specify the data output format when no plot rendering flags are provided.  Supported values: json, ndjson, csv.  Defaults to json.

# Behavior

1. Extend parseArgs to accept --data-format and normalize to lowercase, defaulting to json.
2. After computing the data array and before checking plot rendering flags:
   • If format and output flags are absent (data-only mode):
     ○ If data-format=json: print the full data array as pretty-printed JSON as before.
     ○ If data-format=ndjson: for each point in the data array, print a single JSON object per line to stdout.
     ○ If data-format=csv: print a header line `x,y`, then for each point print `x,y` values as comma-separated numbers on its own line.
     ○ Return the data array unchanged.
3. Ensure existing behavior for plot rendering remains unchanged when --format or --output are present.

# Tests

• Create tests/unit/data-export-json.test.js:
  - Invoke main with --expression, --range, and --data-format json (explicit) and capture stdout to verify JSON array output.
• Create tests/unit/data-export-ndjson.test.js:
  - Invoke main with --expression, --range, --data-format ndjson and verify stdout lines equal JSON representations of each point.
• Create tests/unit/data-export-csv.test.js:
  - Invoke main with --expression, --range, --data-format csv and verify first line is `x,y` and subsequent lines parse as numbers matching generated series.

# Documentation Updates

- In USAGE.md, update the "Generating Time Series Data" section to describe --data-format and examples for each supported format.
- In README.md under Examples, add invocations for CSV and NDJSON output and brief sample outputs.
features/TIME_SERIES_GENERATION.md
# features/TIME_SERIES_GENERATION.md
# Overview

This feature extends the CLI tool to parse a mathematical expression and generate a time series data set across a specified range. It reads the expression and range parameters from the command line, computes evenly spaced data points, and outputs the result as a JSON array of x and y coordinate pairs. This builds the core data generation capability needed for downstream plotting.

# CLI Interface

The main entry point accepts the following parameters:

--expression  A mathematical formula in terms of x, for example y=sin(x).  This parameter is required.
--range       A range specification in the form start:end, for example 0:10.  Defines the domain of x values.  This parameter is required.
--points      An optional integer to specify the number of samples to generate.  Defaults to 100 if omitted.

# Behavior

1. Validate that the expression parameter contains a single variable x.
2. Validate that the range parameter has a numeric start and end with start less than end.
3. Compute the step size as (end - start) divided by (points - 1).
4. For each index i from 0 to points-1, compute x = start + i * step and y by evaluating the expression at x.
5. Collect each coordinate as an object with numeric fields x and y.
6. Print the resulting array of data points as JSON to standard output.

# Dependencies

Add mathjs to the dependencies list to handle safe expression parsing and evaluation.

# Examples

Using the default point count:
node run start -- --expression y=sin(x) --range 0:6.28

With custom point count:
node run start -- --expression y=x^2 --range -5:5 --points 50features/HTTP_API.md
# features/HTTP_API.md
# Overview
Provide a RESTful HTTP interface to expose both time series data generation and plot rendering capabilities over HTTP. Leverage existing data generation and rendering functions to support streaming responses, unified validation using Zod, and graceful shutdown for integration into web applications and pipelines.

# API Endpoints

## GET /data

Accept query parameters:
  • expression: string (required) – mathematical formula in terms of x (for example y=sin(x))
  • range: string (required) – form start:end with numeric values and start < end
  • points: integer (optional) – number of samples to generate, minimum 2, default 100
  • dataFormat: string (optional) – json, ndjson, or csv, default json

Behavior:
  1. Validate inputs with a Zod schema. On validation error, respond 400 and JSON `{ error: message }`.
  2. Generate the data array using existing logic.
  3. Stream response according to dataFormat:
     • json: send full JSON array with Content-Type `application/json`
     • ndjson: send one JSON object per line with Content-Type `application/x-ndjson`
     • csv: send header line `x,y` then comma-separated values with Content-Type `text/csv`

## GET /plot

Accept query parameters (same as /data) plus:
  • format: string (optional) – svg or png, default svg
  • width: integer (optional) – output width in pixels, default 800
  • height: integer (optional) – output height in pixels, default 600
  • margin: integer (optional) – plot margin in pixels, default 40

Behavior:
  1. Validate inputs with Zod. On error, respond 400.
  2. Generate data array.
  3. For svg: call renderPlot to produce a full SVG string or use a streaming variant if large, then stream with Content-Type `image/svg+xml`.
  4. For png: generate SVG, pipe into `sharp().png()`, and stream with Content-Type `image/png`.

## POST /data and POST /plot

Support JSON body with the same parameters as GET endpoints. Behavior mirrors GET handlers.

# Implementation

1. Extend parseArgs in src/lib/main.js to support flags `--serve`, `--host` (default 0.0.0.0), and `--port` (default 3000). When `--serve` is present, skip CLI output logic and start the HTTP server.
2. Initialize an Express app with JSON body parsing. Define Zod schemas for query and body parameters.
3. Register routes for GET and POST on `/data` and `/plot`. In each handler, call existing data generation and rendering functions.
4. Stream responses to respect backpressure. For large CSV or ndjson, use Node streams rather than buffering full payload.
5. Handle validation errors centrally and send consistent error responses.
6. On startup, log `HTTP server listening on http://host:port`. Listen for SIGINT and SIGTERM to gracefully shut down the server.

# Tests

Create tests/unit/http-api.test.js using Vitest and Supertest:
  • GET /data default: expect status 200, `application/json`, body is an array of `{ x, y }` objects.
  • GET /data?dataFormat=ndjson: expect status 200, `application/x-ndjson`, lines equal JSON objects.
  • GET /data?dataFormat=csv: expect status 200, `text/csv`, first line `x,y`, numeric rows follow.
  • GET /plot: format svg: expect 200, `image/svg+xml`, body starts with `<svg`.
  • GET /plot?format=png: expect 200, `image/png`, body begins with PNG signature bytes.
  • POST variants for /data and /plot with JSON bodies produce identical results.
  • Missing or invalid parameters return 400 with JSON error message.

# Documentation Updates

- In USAGE.md, add sections:
  • "Running HTTP Server" describing `--serve`, `--host`, and `--port` flags with examples.
  • "Data Endpoint" with curl examples for `/data` in json, ndjson, and csv.
  • "Plot Endpoint" with curl examples for `/plot` in svg and png.
- In README.md under Examples, add an "HTTP API" subsection with sample curl commands and notes on response headers.