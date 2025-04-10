# PLOT_ENGINE Feature Specification (Enhanced with TTL-Based Caching)

## Overview
This feature provides the core plotting capabilities including evaluation of mathematical expressions, generation of clear colorized ASCII plots, and multiple output modalities. In addition, it incorporates an integrated caching mechanism to improve performance by storing computed plot data for repeated requests. This update enhances the caching system with a configurable Time-To-Live (TTL) to automatically expire and evict stale cache entries, ensuring both performance and memory efficiency.

## CLI Integration
- **Plot Generation:** Triggered by the `--plot` flag along with various parameters like `--interval`, `--step`, and `--color`.
- **Template Support:** Additional flags such as `--save-template <name>`, `--list-templates`, and `--use-template <name>` provide users the ability to store and recall plot configurations.
- **Export Options:** Use `--export` to write the generated ASCII plot to a file, or `--json-out` to output computed plot data in JSON format.

## Plot Computation and Output Modalities
- **Expression Evaluation:** Utilizes mathjs to parse and compute data points over the given interval with a specified step size.
- **ASCII Plot Generation:** Maps computed data to generate a visually appealing ASCII plot, with optional color enhancements.
- **File and JSON Export:** Facilitates exporting of plots either to a file or as structured JSON data for further processing.

## Enhanced Caching Mechanism
- **Basic Caching:** An in-memory cache (using a JavaScript `Map`) stores computed plot data keyed by a hash of parameters such as formula, interval, step, and color.
- **TTL Configuration:** Introduces a configurable Time-To-Live (TTL) for cache entries so that each cached plot is automatically invalidated after a predetermined duration. This ensures that stale data does not persist and system memory is managed efficiently.
- **Cache Eviction Policy:** Implements automatic removal of expired entries on subsequent plot requests. An optional CLI flag (e.g., `--clear-cache`) is provided to manually flush the cache if needed.
- **Performance Benefits:** Reduces redundant computations for identical plot requests, thereby enhancing the responsiveness of the tool.

## Error Handling and Validation
- **Parameter Validation:** Ensures that all CLI inputs, including those for plot configurations and caching, are correctly formatted. Provides descriptive error messages for invalid inputs.
- **File I/O & Cache:** Handles errors related to file exports and cache operations gracefully, reverting to safe defaults when issues are encountered.

## Testing and Documentation
- **Unit and Integration Tests:** Comprehensive tests cover plot generation, template operations, export functionality, and the new caching mechanism (including TTL behavior and cache eviction).
- **Documentation Updates:** README.md and CONTRIBUTING.md are updated with usage examples and troubleshooting guidelines covering the enhanced caching feature.

## Usage Examples
- **Standard Plot Generation:**
  - Command: `node src/lib/main.js --plot "sin(x)" --interval -10,10 --step 0.5 --color`
- **Using Templates with Caching:**
  - Save a template: `node src/lib/main.js --plot "x^2" --interval -10,10 --step 0.5 --save-template quadratic`
  - Use a template: `node src/lib/main.js --use-template quadratic --json-out`
- **Cache Management:**
  - The caching layer automatically stores the plot result with a TTL (e.g., 5 minutes by default).
  - To clear the cache manually (if needed): `node src/lib/main.js --clear-cache`
