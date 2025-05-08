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
Reinforces high-performance, CLI-driven formula visualizations by speeding up series value computation at large scales.