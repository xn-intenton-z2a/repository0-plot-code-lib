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
Enhances the library’s commitment to high-performance, CLI-driven formula visualizations by harnessing parallelism to handle large-scale data efficiently.