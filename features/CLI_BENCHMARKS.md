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

In README.md under Examples add a subsection Benchmarking Performance with a command invocation and representative timing table.