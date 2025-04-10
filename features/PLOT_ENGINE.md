# PLOT_ENGINE Feature Specification (Consolidated with Cache Inspection)

## Overview
This feature provides the core plotting capabilities for evaluating mathematical expressions, generating clear colorized ASCII plots, and exporting data in multiple formats. In this update, we consolidate the cache inspection functionality into the plot engine, allowing users to inspect, validate, and manage the internal caching mechanism. The caching system features a configurable Time-To-Live (TTL) for automatic invalidation of stale entries, paired with an inspection mode for debugging and performance tuning.

## Implementation Details
### Plot Generation and Output
- **Expression Evaluation:** Utilizes mathjs to parse and compute data points over a given interval with a specified step size.
- **ASCII Plotting:** Maps computed data onto an ASCII grid with optional color enhancements.
- **Export Options:** Supports file export via `--export` or JSON output with `--json-out`.
- **Template Support:** Integrates template saving, listing, and recall via appropriate CLI flags.

### Integrated Caching and Inspection
- **Caching Mechanism:**
  - Implements an in-memory cache using a JavaScript `Map`, storing plot data keyed by a hash of parameters including formula, interval, step, and color.
  - Each cache entry is assigned a TTL ensuring that stale data is automatically purged.
  - A manual flush option is available through the `--clear-cache` flag.

- **Cache Inspection Functionality:**
  - A new CLI flag `--inspect-cache` triggers the cache introspection routine.
  - **Standard Mode:** Displays a list of active cache keys along with essential metadata and the remaining TTL for each entry.
  - **Interactive Mode:** By combining `--inspect-cache` with `--interactive`, users can selectively delete cache entries or flush the entire cache.
  - The inspection routines incorporate robust error handling for scenarios such as an empty cache or expired entries.

### CLI Integration
- **Enhanced Argument Parsing:**
  - Integrates existing plotting and export functionalities with additional options for cache inspection.
  - Ensures that all flags (e.g., `--plot`, `--export`, `--clear-cache`, `--inspect-cache`, `--interactive`) are translated and routed to their respective handlers.
  - Provides clear error messages for invalid or conflicting flag usage.

## Testing and Documentation
- **Unit and Integration Tests:**
  - Validate proper functioning of plot generation, caching with TTL, and cache inspection (both standard and interactive modes).
  - Include tests for edge cases such as empty cache inspection and manual cache clearance.

- **Documentation Updates:**
  - Update README.md and CONTRIBUTING.md with detailed usage examples, CLI flag descriptions, and troubleshooting guidelines for the enhanced plot engine.
  - Provide examples such as:
    - Standard Plot: `node src/lib/main.js --plot "sin(x)" --interval -10,10 --step 0.5 --color`
    - Cache Inspection: `node src/lib/main.js --inspect-cache`
    - Interactive Cache Management: `node src/lib/main.js --inspect-cache --interactive`

## Summary
By consolidating cache inspection into the core PLOT_ENGINE, this update streamlines the codebase and enhances performance monitoring. Users benefit from robust plotting capabilities combined with easy-to-use diagnostics for the caching layer, reinforcing our mission as the go-to plot library for formula visualisations.