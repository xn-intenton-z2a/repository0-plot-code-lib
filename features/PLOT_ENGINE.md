# PLOT_ENGINE Feature Specification

## Overview
This feature combines core plotting capabilities with multiple output modalities. It evaluates mathematical expressions and generates clear, colorized ASCII plots while now also offering enhanced export options. In addition to writing plots to files, the feature introduces an optional JSON output mode that enables programmatic consumption of plot data. This update furthers our mission to be the go-to plot library for formula visualisations by offering both visual and machine-readable outputs.

## Implementation Details
### CLI Integration
- Extend the main CLI handler (in `src/lib/main.js`) to support various flags:
  - `--plot`: Triggers the plot generation process.
  - `--interval`, `--step`, `--color`: Configure plot appearance.
  - `--export`: Exports the generated ASCII plot to a file (with an optional file path, defaulting if not provided).
  - **New:** `--json-out`: When provided, outputs the computed plot data in JSON format instead of (or alongside) the ASCII visualization.

### Plot Computation and Output Modalities
- **Expression Evaluation:** Use mathjs to parse the provided mathematical expression and compute data points over a specified interval and step size.
- **ASCII Plot Generation:** Scale and map the computed data to generate a clear ASCII plot with optional colorization using ANSI escape sequences.
- **File Export:** Integrate Node’s fs module to write the ASCII plot to a file when `--export` is active. If file output fails, revert to console output.
- **JSON Data Export:** When the `--json-out` flag is active, format the computed plot data (e.g., arrays of x and y values, and optionally computed scales) as a JSON object for consumption by other applications or further processing.

### Error Handling and Validation
- Validate mathematical expressions and CLI parameters, providing clear error messages for malformed input.
- Gracefully handle file I/O errors during export operations by reverting to a default behavior (e.g., console output).

## Testing and Documentation
### Unit and Integration Tests
- Develop tests simulating CLI commands with various flag combinations (such as `--plot`, `--export`, `--color`, and the new `--json-out`) to ensure correct and robust output.
- Specifically test that when `--json-out` is used, the output is valid JSON containing all necessary computed data points.

### Documentation
- Update README.md, CONTRIBUTING.md, and DOCUMENTATION.md files with clear usage examples:
  - CLI: `node src/lib/main.js --plot "sin(x)" --color --export output.txt --json-out`
  - Library import usage for programmatic access of the JSON plot data.

## Usage Example
- **Standard ASCII and JSON Output:**
  - Command: `node src/lib/main.js --plot "sin(x)" --color --json-out`
  - Expected output: The terminal displays a colorized ASCII plot and additionally returns a JSON object with the computed x and y values.

This update consolidates and extends the plotting and export functionalities of the repository, reducing redundancy while providing versatile output options for both end-users and automated systems.