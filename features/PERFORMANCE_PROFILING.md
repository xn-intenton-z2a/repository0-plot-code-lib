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
