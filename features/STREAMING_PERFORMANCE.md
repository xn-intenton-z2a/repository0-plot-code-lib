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

In USAGE.md add a section "Streaming Performance Optimization" that documents --stream-chunk-size, --stream-concurrency, and --auto-tune flags with command examples. In README.md under Examples add a subsection "Adaptive Streaming Rendering" showing an invocation that streams an SVG plot for 20000 points with auto-tuning enabled.