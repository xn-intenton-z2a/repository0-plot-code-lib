# PLOT_ENGINE Feature Specification

## Overview
This updated PLOT_ENGINE feature now combines the core plotting capabilities with file export functionality. It evaluates mathematical expressions and generates clear, colorized ASCII plots, and seamlessly integrates a file export utility. This consolidation enhances usability by streamlining CLI operations and library functions, aligning with our mission to be the go-to plot library for formula visualisations.

## Implementation Details
### CLI Integration
- Extend the main CLI handler in `src/lib/main.js` to support the `--plot` flag along with optional parameters: `--interval`, `--step`, `--color`, and now `--export`.
- When the `--export` flag is provided (with an optional file path argument), compute the ASCII plot and write the output to the specified file, defaulting to a predefined filename if none is given.
- Ensure that the exporting process is optional, and the standard console output is maintained if file I/O encounters errors.

### Function Evaluation and ASCII Plot Generation
- Use mathjs to parse and evaluate the mathematical expression over computed x-values. 
- Calculate corresponding y-values, scale data appropriately, and generate an ASCII plot.
- Implement enhanced error handling and input validation to provide clear error messages for invalid expressions or parameter formats.
- Add support for the `--color` flag to output colorized ASCII plots using ANSI escape sequences, conditionally enabled based on terminal capabilities.

### File Export Logic
- Integrate Node’s built-in `fs` module to write the generated ASCII plot to a file when the `--export` flag is active. 
- Handle file I/O errors gracefully, reverting output to the console if write operations fail.
- Expose an export function (e.g., `exportPlot`) that can be invoked separately within the library for programmatic file exports.

## Testing and Documentation
### Testing
- Develop unit tests to validate plot generation with various flags: plain plotting, colorized plotting, and file export.
- Simulate CLI commands with different combinations of flags (`--plot`, `--export`, `--color`, etc.) to ensure correct output and error reporting.
- Mock file system operations to verify that export functionality writes the expected plot data without performing actual disk writes during tests.

### Documentation
- Update the README.md, CONTRIBUTING.md, and DOCUMENTATION.md files to reflect the updated PLOT_ENGINE capabilities, including usage examples for file export functionality.
- Provide detailed examples for both CLI and library usage:
  - CLI: `node src/lib/main.js --plot "sin(x)" --color --export output.txt`
  - Library: importing the `exportPlot` function to generate and save a plot from within a script.

This consolidated feature enhances the repository by merging plotting and export functionalities into a single, efficient module, reducing redundancy and simplifying maintenance.
