# PERFORMANCE MONITOR

This feature introduces a new CLI flag `--perf` to the tool. When enabled, the tool will measure and display performance metrics such as total execution time and memory consumption during the plotting process. This provides users with insight into the efficiency of plot generation and aids in performance tuning.

# Overview

- **Objective:** Introduce performance monitoring to display execution time (and optionally memory usage) when the CLI is processing plots.
- **Benefit:** Enhances the tool by providing real-time performance feedback that can be useful for optimization, especially on large input ranges or when complex custom functions are used.
- **Usage:** When invoking the CLI, add `--perf` to the command. For example:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --perf
```

# Implementation Details

- **Source Code Changes (src/lib/main.js):**
  - Extend the argument parser to detect a new boolean flag `--perf`.
  - At the beginning of the main processing routine, record the start time (using `Date.now()` or `process.hrtime.bigint()` for high resolution).
  - At the end of plot generation (before writing output), compute the elapsed time and optionally measure memory usage from `process.memoryUsage()`.
  - Print a performance summary to the console. Ensure that the existing functionality (e.g. generating CSV, SVG, PNG, or PDF) remains intact.

# Testing Enhancements

- **Unit Tests (tests/unit/main.test.js):**
  - Add tests to simulate CLI invocations with the `--perf` flag.
  - Verify that the console output includes performance metrics (e.g., contains text such as "Execution Time:" and optionally "Memory Usage:").

# Documentation Updates

- **README.md:**
  - Update the README to document the new `--perf` CLI flag with usage examples:

    ```sh
    node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.svg --perf
    ```
  - Include a note in the documentation explaining that with `--perf`, the tool will display execution time and memory usage in the console after processing.

# Conformance with Mission and Guidelines

- This enhancement is confined to modifying existing source files, tests, and documentation. It does not introduce new files and is achievable within the repository scope.
- The feature aligns with the mission by further enhancing usability and providing immediate feedback to users of the CLI tool.